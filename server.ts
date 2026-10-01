import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { GoogleGenAI, Type } from '@google/genai';
import { createServer as createViteServer } from 'vite';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;

app.use(express.json({ limit: '10mb' }));

// Shared Gemini AI instance
const apiKey = process.env.GEMINI_API_KEY;
let ai: GoogleGenAI | null = null;

if (apiKey) {
  ai = new GoogleGenAI({
    apiKey: apiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      },
    },
  });
}

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    hasApiKey: !!apiKey,
    timestamp: new Date().toISOString(),
  });
});

// 1. Company Analysis Endpoint with Google Search Grounding
app.post('/api/analyze-company', async (req, res) => {
  try {
    const { companyName, jobTitle } = req.body;

    if (!companyName || !companyName.trim()) {
      return res.status(400).json({ error: '기업명을 입력해주세요.' });
    }

    if (!ai) {
      return res.status(503).json({
        error: 'GEMINI_API_KEY가 설정되지 않았습니다. 예시 데이터 모드로 체험하시거나 Secrets 패널에 키를 등록해주세요.',
      });
    }

    const prompt = `당신은 국내 대기업·공기업 채용 전문 분석관입니다.
다음 기업과 직무에 대한 채용 지원용 핵심 정보를 검색하여 신뢰할 수 있는 최신 사실만 제공해주세요.

기업명: ${companyName}
지원 직무: ${jobTitle || '일반 직무'}

반드시 아래 JSON 형식으로만 답변하세요 (마크다운 코드블록 안에 json으로 작성):
{
  "companyName": "${companyName}",
  "jobTitle": "${jobTitle || '일반'}",
  "overview": "기업 개요 및 핵심 사업 영역 (2~3문장 요약)",
  "talentPersona": "기업 공식 인재상 및 핵심 가치 (1~2문장 요약)",
  "recentNews": [
    "최근 1년 이내의 주요 경영 이슈, 신제품/신사업, 기술 트렌드 1",
    "최근 주요 이슈 2",
    "최근 주요 이슈 3"
  ],
  "roleCompetencies": [
    "해당 직무(${jobTitle || '지원직무'})에서 특히 요구되는 실무 핵심 역량 및 어필 포인트 1",
    "해당 직무 요구 역량 2",
    "해당 직무 요구 역량 3"
  ],
  "disclaimer": "※ 본 정보는 Google Search 기반으로 수집된 참고용 정보입니다. 자소서 작성 시 핵심 키워드를 자연스럽게 녹여내세요."
}`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: prompt,
      config: {
        tools: [{ googleSearch: {} }],
        temperature: 0.2,
      },
    });

    const responseText = response.text || '';
    
    // Extract grounding sources if available
    const sources: Array<{ title: string; url: string }> = [];
    const groundingChunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks;
    if (Array.isArray(groundingChunks)) {
      for (const chunk of groundingChunks) {
        if (chunk.web?.uri) {
          sources.push({
            title: chunk.web.title || new URL(chunk.web.uri).hostname,
            url: chunk.web.uri,
          });
        }
      }
    }

    // Parse JSON
    let parsedData: any = null;
    const jsonMatch = responseText.match(/```(?:json)?\s*([\s\S]*?)\s*```/) || [null, responseText];
    const candidateJson = jsonMatch[1] || responseText;

    try {
      parsedData = JSON.parse(candidateJson.trim());
    } catch (e) {
      // Fallback object if raw text wasn't strict JSON
      parsedData = {
        companyName,
        jobTitle: jobTitle || '일반',
        overview: responseText.slice(0, 300),
        talentPersona: '혁신과 도전 정신을 갖춘 협력형 인재',
        recentNews: ['신사업 영역 확장 및 디지털 전환 가속화'],
        roleCompetencies: ['직무 전문성 및 데이터 기반 문제해결력'],
        disclaimer: '※ 본 정보는 참고용 정보입니다.',
      };
    }

    // Deduplicate and append sources
    const uniqueSources = Array.from(
      new Map(sources.map((item) => [item.url, item])).values()
    ).slice(0, 5);

    if (uniqueSources.length > 0) {
      parsedData.sources = uniqueSources;
    } else if (!parsedData.sources || parsedData.sources.length === 0) {
      parsedData.sources = [
        { title: `${companyName} 공식 웹사이트 / 채용 정보`, url: `https://www.google.com/search?q=${encodeURIComponent(companyName + ' 채용')}` }
      ];
    }

    res.json(parsedData);
  } catch (error: any) {
    console.error('Company analysis error:', error);
    res.status(500).json({
      error: error.message || '기업 분석 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.',
    });
  }
});

// 2. Cover Letter Review Endpoint (Strict PRD Criteria)
app.post('/api/review-cover-letter', async (req, res) => {
  try {
    const {
      companyName,
      jobTitle,
      questionType,
      questionText,
      maxChars,
      includeSpaces,
      coverLetterText,
      companyAnalysis,
      previousScore,
    } = req.body;

    // Abuse prevention: 3,000 characters limit
    if (!coverLetterText || !coverLetterText.trim()) {
      return res.status(400).json({ error: '자기소개서 본문을 입력해주세요.' });
    }

    if (coverLetterText.length > 3000) {
      return res.status(400).json({
        error: '자기소개서 본문은 최대 3,000자까지만 첨삭 가능합니다. 분량을 조절해주세요.',
      });
    }

    if (!ai) {
      return res.status(503).json({
        error: 'GEMINI_API_KEY가 설정되지 않았습니다. 예시 데이터 모드로 체험하시거나 Secrets 패널에 키를 등록해주세요.',
      });
    }

    const currentLen = includeSpaces ? coverLetterText.length : coverLetterText.replace(/\s/g, '').length;
    const isOverLimit = maxChars && currentLen > maxChars;

    const systemPrompt = `당신은 10년 차 국내 유수 대기업 인사담당자이자 대한민국 최고의 자기소개서 전문 첨삭 코치입니다.
첨삭 노트(Proofreading Notebook) 콘셉트에 맞춰 엄격하고 현실적인 피드백을 제공합니다.

[첨삭 5대 핵심 기준]
1. 문항 적합도 및 핵심 메시지: 질문의 의도를 정확히 파악했는가? 두괄식 소제목과 첫 문장에서 핵심 메시지가 바로 보이는가?
2. STAR 프레임워크 검증:
   - Situation(상황), Task(과제), Action(본인 주도 행동), Result(결과)가 명확한가?
   - 특히 Result(결과) 항목: 단순한 "좋은 평가를 받았다", "성공적으로 끝났다"는 식의 주관적 기술은 반드시 WARN 또는 MISSING으로 판정하고 경고하세요.
3. 정량적 수치 보완 질문:
   - 수치가 부족할 때 AI가 거짓 수치를 날조하거나 지어내지 마십시오!
   - 지원자가 실제 경험에서 꺼내어 적을 수 있도록 "당시 프로젝트의 동시 접속자 수나 응답 시간은 몇이었나요?", "팀원은 몇 명이었나요?"와 같은 구체적 코칭 질문을 제공하세요.
4. AI 티 검증 및 클리셰 교정:
   - "다각도로 접근하여", "시너지 효과를 창출", "괄목할 만한 성과", "열정과 끈기로", "새로운 지평을 열어", "빛나는 주역이 되겠습니다" 등 AI 번역투 및 텅 빈 미사여구를 엄격히 포착하세요.
   - 포착된 문장은 원문 그대로 적고, 문제 이유와 함께 실무 중심의 자연스러운 수정 문장 대안을 제시하세요.
5. 문장 다듬기 및 글자 수 최적화:
   - 글자 수 제한(${maxChars || 800}자, ${includeSpaces ? '공백 포함' : '공백 제외'}, 현재 입력: ${currentLen}자)을 분석하여 쳐내야 할 사족 문장을 지목하고, 완성도 높은 수정 전문(improvedFullText)을 제공하세요.

[점수 책정 기준]
- 100점 만점 기준. 
- STAR의 Result가 주관적이거나 수치가 없으면 70점대 이하.
- AI 상투어가 3개 이상이면 60점대 이하.
- 글자 수 초과 시 감점.
- 매우 구체적이고 정량 지표와 진정성이 있으면 85~95점.

반드시 아래 JSON 스키마를 만족하는 유효한 JSON으로만 응답하세요:
{
  "totalScore": 75,
  "headline": "한 줄 총평 요약",
  "coreStrengthSummary": "해당 자기소개서에서 가장 돋보이는 핵심 강점 한 문장 요약 (지원자의 전문성, 문제해결 행동 등 가장 경쟁력 있는 포인트)",
  "card1_relevance": {
    "score": 80,
    "fitAssessment": "문항 의도 부합도 평가",
    "leadInFormat": true,
    "keyMessage": "도출된 핵심 메시지",
    "strengths": ["강점 1", "강점 2"],
    "improvements": ["개선점 1"]
  },
  "card2_star": {
    "situation": { "status": "GOOD", "comment": "상황 평가" },
    "task": { "status": "GOOD", "comment": "과제 평가" },
    "action": { "status": "EXCELLENT", "comment": "행동 평가" },
    "result": { "status": "WARN", "comment": "결과 평가 (수치 누락 시 경고)" },
    "starAdvice": "STAR 종합 조언"
  },
  "card3_quantQuestions": {
    "status": "NEEDS_QUANT",
    "currentNumbers": ["본문에 언급된 숫자들"],
    "coachingQuestions": ["수치 보완 질문 1", "수치 보완 질문 2", "수치 보완 질문 3"]
  },
  "card4_aiClicheCheck": {
    "score": 70,
    "clichesFoundCount": 2,
    "detections": [
      {
        "originalSentence": "본문에 있는 문제 문장",
        "issue": "문제점 및 상투어 이유",
        "suggestion": "구체적인 수정 제안 문장"
      }
    ]
  },
  "card5_polishing": {
    "charCountAdvice": "글자 수 조언",
    "spellingAndGrammar": [
      { "before": "오타/틀린표현", "after": "올바른표현", "reason": "이유" }
    ],
    "unnecessarySentences": ["삭제 권장 사족 문장 1"],
    "improvedFullText": "소제목을 포함한 완성도 높은 최종 첨삭 추천 전문"
  }
}`;

    const userPrompt = `[지원 정보]
기업명: ${companyName || '미지정'}
지원 직무: ${jobTitle || '미지정'}
문항 종류: ${questionType || '성공 / 성취 경험 (STAR)'}
문항 원문: ${questionText || '자유 문항'}
글자 수 제한: ${maxChars || 800}자 (${includeSpaces ? '공백 포함' : '공백 제외'})
현재 글자 수: ${currentLen}자 (${isOverLimit ? '제한 초과!' : '정상'})
${companyAnalysis ? `\n[사전 분석된 기업 정보]\n- 인재상: ${companyAnalysis.talentPersona || ''}\n- 최근 이슈: ${(companyAnalysis.recentNews || []).join(', ')}\n- 직무 핵심 역량: ${(companyAnalysis.roleCompetencies || []).join(', ')}` : ''}

[지원자 자기소개서 원문]
"""
${coverLetterText}
"""

위 자기소개서를 분석하여 지정된 JSON으로 답변해주세요.`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: userPrompt,
      config: {
        systemInstruction: systemPrompt,
        responseMimeType: 'application/json',
        temperature: 0.3,
      },
    });

    const responseText = response.text || '';
    const parsedReport = JSON.parse(responseText.trim());

    if (previousScore !== undefined && previousScore !== null) {
      parsedReport.previousScore = Number(previousScore);
    }

    res.json(parsedReport);
  } catch (error: any) {
    console.error('Review cover letter error:', error);
    res.status(500).json({
      error: error.message || '자기소개서 첨삭 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.',
    });
  }
});

// Configure Vite or Static File Serving
async function startServer() {
  const isProd = process.env.NODE_ENV === 'production';

  if (!isProd) {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (req, res) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Cover Letter Coach server running at http://0.0.0.0:${PORT}`);
  });
}

startServer();
