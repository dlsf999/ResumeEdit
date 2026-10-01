import { CompanyAnalysis, ReviewReport, SamplePreset } from '../types/index.ts';

export const DEFAULT_MOCK_ANALYSIS: CompanyAnalysis = {
  companyName: '삼성전자',
  jobTitle: 'S/W 개발 (메모리사업부)',
  overview:
    '글로벌 메모리 반도체(DRAM, NAND Flash) 및 솔루션 분야 세계 1위 기업으로, 초격차 기술 경쟁력을 바탕으로 온디바이스 AI 및 HBM(고대역폭 메모리) 시장을 선도하고 있습니다.',
  talentPersona:
    '끝없는 열정(Passion)과 도전정신(Challenge)으로 혁신을 주도하며, 전문역량(Professionalism)을 바탕으로 동료와 협력(Collaboration)하는 글로벌 인재',
  recentNews: [
    '차세대 HBM4 및 CXL(컴퓨트 익스프레스 링크) 기반 메모리 컨트롤러 소프트웨어 생태계 본격 확장',
    'AI 데이터센터 전력 효율 극대화를 위한 초고속 저전력 고용량 솔리드스테이트드라이브(SSD) 펌웨어 혁신',
    '글로벌 R&D 거점 간 협업을 통한 소프트웨어 검증 자동화 및 인공지능 기반 수율 예측 알고리즘 고도화'
  ],
  roleCompetencies: [
    'C/C++, Python 기반 임베디드 펌웨어 및 메모리 컨트롤러 아키텍처 최적화 역량',
    'OS 커널, 가상 메모리, 멀티스레딩 동시성 제어 및 병목 현상 정량적 트러블슈팅 능력',
    '대용량 트래픽 환경에서의 성능 벤치마크 및 오류 복구(Fault Tolerance) 시스템 설계 경험'
  ],
  sources: [
    { title: '삼성전자 뉴스룸 - 차세대 메모리 솔루션 및 HBM 전략', url: 'https://news.samsung.com/kr' },
    { title: '삼성전자 채용 공식 포털 - S/W 엔지니어 직무 가이드', url: 'https://www.samsungcareers.com' }
  ],
  disclaimer: '※ 본 정보는 Google Search 기반으로 수집된 참고용 정보입니다. 자소서 작성 시 핵심 키워드와 기술 트렌드를 자연스럽게 녹여내세요.'
};

export const DEFAULT_MOCK_REPORT: ReviewReport = {
  totalScore: 72,
  previousScore: 61,
  headline: '직무 경험의 진정성은 돋보이나, STAR의 Result(정량적 성과)와 AI식 상투어 보완이 시급합니다.',
  coreStrengthSummary: '단순 코드 수정을 넘어 메모리 프로파일러를 통한 체계적 원인 규명과 캐시 아키텍처 재설계 역량이 돋보입니다.',
  card1_relevance: {
    score: 82,
    fitAssessment: '지원 직무(S/W 개발)의 기술적 맥락과 문제 해결 의지가 명확히 드러남',
    leadInFormat: true,
    keyMessage: '메모리 병목을 해결한 캐싱 알고리즘 튜닝 경험',
    strengths: [
      '소제목을 통해 어떤 기술(LRU 캐시 + 동시성 제어)을 다루었는지 즉각 파악 가능',
      '단순 코딩이 아닌 아키텍처 레벨에서의 원인 분석 접근법이 돋보임'
    ],
    improvements: [
      '문항의 전반부에서 삼성전자 메모리사업부와의 연결고리가 1문장 정도 더 보강되면 좋습니다.'
    ]
  },
  card2_star: {
    situation: {
      status: 'GOOD',
      comment: '대용량 로그 처리 중 메모리 누수 및 레이턴시 급증이 발생한 상황이 구체적으로 제시되었습니다.'
    },
    task: {
      status: 'GOOD',
      comment: '응답 지연을 방지하고 시스템 가용성을 99.9%로 유지해야 했던 명확한 과제가 정의되었습니다.'
    },
    action: {
      status: 'EXCELLENT',
      comment: '본인이 직접 메모리 프로파일러(Valgrind)를 사용해 세부 함수 단위로 병목을 분석한 행동이 매우 생생합니다.'
    },
    result: {
      status: 'WARN',
      comment: '⚠️ 결과에서 "시스템이 안정화되고 좋은 평가를 받았다"는 식의 주관적 서술에 그쳐 정량적 검증이 부족합니다.'
    },
    starAdvice:
      'Result(결과) 항목에 반드시 "응답 속도 X% 단축", "메모리 사용량 Y MB 절감"과 같은 객관적 수치를 포함해야 합격선으로 올라갑니다.'
  },
  card3_quantQuestions: {
    status: 'NEEDS_QUANT',
    currentNumbers: ['3개월간', '2명의 팀원'],
    coachingQuestions: [
      '튜닝 전후 초당 트랜잭션 수(TPS)나 평균 API 응답 지연 시간(ms)은 어떻게 변했나요?',
      '메모리 사용량이나 누수율은 이전 대비 대략 몇 %나 절감되었나요?',
      '해당 프로젝트를 통해 실제 처리한 데이터의 총 용량이나 요청 건수는 어느 정도였나요?'
    ]
  },
  card4_aiClicheCheck: {
    score: 65,
    clichesFoundCount: 2,
    detections: [
      {
        originalSentence: '팀원들과 다각도의 분석을 진행하여 시너지 효과를 창출하고 괄목할 만한 성과를 거두었습니다.',
        issue: 'AI 번역투 및 서류 검토관이 기피하는 대표적인 무색무취 상투어(시너지 효과, 괄목할 만한 성과)',
        suggestion: '팀원과 주 2회 코드 리뷰를 진행하며 메모리 할당 패턴을 표준화했고, 배포 후 3주간 무장애를 유지했습니다.'
      },
      {
        originalSentence: '끝없는 열정과 끈기로 문제의 본질을 파악하고자 밤낮없이 최선을 다했습니다.',
        issue: '추상적인 감정 호소형 표현으로, 지원자의 실질적 엔지니어링 행동이 가려짐',
        suggestion: '스택 트레이스를 역추적하여 힙 메모리 해제 누락 지점을 특정하고, RAII 패턴을 적용해 자원 누수를 원천 차단했습니다.'
      }
    ]
  },
  card5_polishing: {
    charCountAdvice: '현재 745자로 설정하신 제한(800자) 대비 93% 수준으로 안정적인 분량입니다.',
    spellingAndGrammar: [
      {
        before: '문제를 해결할수 있었습니다',
        after: '문제를 해결할 수 있었습니다',
        reason: '조사 및 의존명사 띄어쓰기 규정 준수'
      },
      {
        before: '다르므로써',
        after: '다름으로써',
        reason: '수단/방법을 나타내는 조사 표기 오류'
      }
    ],
    unnecessarySentences: [
      '이러한 경험은 저에게 커다란 성장의 밑거름이 되었다고 자부합니다. (사족이므로 삭제하여 글자 수 36자 확보 권장)'
    ],
    improvedFullText: `[캐시 교체 알고리즘 최적화로 처리 지연을 해소한 경험]

소프트웨어 시스템에서 예측 불가능한 메모리 누수는 치명적인 장애를 유발합니다. 오픈소스 대용량 로그 수집기 개발 당시, 데이터 유입량이 일시적으로 증가할 때 힙 메모리 사용량이 급증하여 서비스가 강제 종료되는 위기가 발생했습니다.

문제를 근본적으로 진단하고자 Valgrind 메모리 프로파일러를 적용했습니다. 그 결과, 빈번한 로그 버퍼 할당 및 해제 과정에서 메모리 단편화가 발생하고 있음을 확인했습니다. 저는 기존 동적 할당 방식을 사전에 고정 크기 메모리 풀(Memory Pool)을 구축하는 아키텍처로 변경했습니다. 또한 접근 빈도에 따라 LRU(Least Recently Used) 캐시 알고리즘을 도입하여 핫 데이터의 재사용률을 극대화했습니다.

그 결과 일일 5,000만 건 이상의 로그 유입 환경에서도 메모리 점유율을 45% 절감하고, 평균 지연 시간을 180ms에서 35ms로 단축했습니다. 삼성전자 메모리사업부에서도 미세한 병목도 정밀하게 추적하는 분석력으로 세계 최고의 펌웨어 품질을 완성하겠습니다.`
  }
};

export const SAMPLE_PRESETS: SamplePreset[] = [
  {
    id: 'sample-star-warn',
    label: '삼성전자 (STAR의 R 수치 누락형)',
    badge: 'T3-2/3 테스트',
    description: '행동은 훌륭하나 Result(결과)에 구체적 수치가 없어 ⚠️ 경고 및 코칭 질문이 필요한 자소서',
    data: {
      companyName: '삼성전자',
      jobTitle: 'S/W 개발 (메모리사업부)',
      questionType: '성공 / 성취 경험 (STAR)',
      questionText: '본인의 노력으로 의미 있는 성취를 거둔 경험과 이를 통해 얻은 교훈을 기술해 주십시오.',
      maxChars: 800,
      includeSpaces: true,
      coverLetterText: `[메모리 최적화를 통한 서버 안정화]
학부 캡스톤 디자인 프로젝트에서 분산 로그 수집 시스템을 개발하던 중이었습니다. 트래픽이 몰리는 특정 시간대에 시스템 메모리 사용량이 치솟아 서버가 다운되는 문제가 연이어 발생했습니다.

저는 팀 내에서 백엔드 코어 파트를 담당하여 문제 원인을 파악했습니다. 메모리 프로파일러를 가동해본 결과 캐시 해제가 제때 이루어지지 않아 메모리 누수가 발생하고 있었습니다. 저는 비효율적인 동적 할당 루틴을 메모리 풀 구조로 재설계하고, 데이터 접근 빈도를 분석하여 캐시 정책을 전면 수정했습니다. 

그 결과 시스템이 다운되지 않고 매우 안정적으로 운영되었으며 팀원들과 교수님께도 괄목할 만한 성과라는 칭찬을 들었습니다. 다각도의 노력을 통해 끈기 있게 문제를 해결하는 엔지니어의 자세를 배웠습니다.`
    },
    mockCompanyAnalysis: DEFAULT_MOCK_ANALYSIS,
    mockReviewReport: DEFAULT_MOCK_REPORT
  },
  {
    id: 'sample-cliche-heavy',
    label: '네이버 (AI식 상투어/클리셰 다수형)',
    badge: 'T3-5 테스트',
    description: '‘다각도로 접근하여’, ‘시너지 효과’, ‘새로운 지평’ 등 AI 생성 티가 심해 빨간 물결 밑줄이 필요한 자소서',
    data: {
      companyName: '네이버',
      jobTitle: '서비스 기획 (Search & AI)',
      questionType: '지원동기',
      questionText: '네이버에 지원한 동기와 본인이 해당 직무를 성공적으로 수행할 수 있는 이유를 작성해주세요.',
      maxChars: 700,
      includeSpaces: true,
      coverLetterText: `[새로운 지평을 열어가는 혁신적 기획자]
네이버는 끊임없는 혁신을 바탕으로 디지털 생태계의 선두주자로 자리매김하고 있습니다. 저는 이러한 네이버의 비전에 깊이 공감하며 시너지 효과를 창출하고자 지원하였습니다.

대학 시절 다양한 프로젝트를 수행하며 다각도의 분석을 통해 최선의 솔루션을 도출해왔습니다. 사용자들의 니즈를 면밀히 관찰하고 열정과 끈기를 다해 문제를 해결하며 괄목할 만한 성과를 거두었습니다. 급변하는 AI 트렌드 속에서 네이버의 글로벌 도약에 한 획을 긋는 혁신적인 인재가 되겠습니다.`
    },
    mockCompanyAnalysis: {
      companyName: '네이버',
      jobTitle: '서비스 기획 (Search & AI)',
      overview: '대한민국 1위 포털 및 검색 엔진으로, 생성형 AI 하이퍼클로바X를 기반으로 검색, 커머스, 콘텐츠 전 영역을 혁신하는 글로벌 테크 기업입니다.',
      talentPersona: '사용자 관점에서 집요하게 문제를 발견하고, 빠른 실행과 데이터 기반 의사결정으로 성장을 만들어가는 인재',
      recentNews: [
        'AI 검색 큐(Cue:) 모바일 고도화 및 네이버 앱 검색 결과 개인화 추천 강화',
        '생성형 AI 기술을 접목한 스마트스토어 판매자 솔루션 출시 및 커머스 거래액 증대',
        '글로벌 웹툰 및 소버린 AI 연합 구축을 통한 사우디아라비아 디지털 트윈 프로젝트 추진'
      ],
      roleCompetencies: [
        '정량적 로그 데이터(SQL, GA) 및 정성적 사용자 인터뷰 기반의 가설 검증 역량',
        '복잡한 검색 알고리즘과 LLM 기능을 직관적인 UX 플로우로 설계하는 기능 정의서(PRD) 작성력'
      ],
      sources: [
        { title: 'NAVER Corp 공식 채용 포털', url: 'https://recruit.navercorp.com' },
        { title: '네이버 다이어리 공식 블로그', url: 'https://blog.naver.com/naver_diary' }
      ],
      disclaimer: '※ 본 정보는 Google Search 기반으로 수집된 참고용 정보입니다.'
    },
    mockReviewReport: {
      totalScore: 54,
      previousScore: 48,
      headline: '내용 대부분이 AI 번역투 및 추상적인 클리셰로 채워져 있어, 지원자 본인의 고유한 경험이 보이지 않습니다.',
      coreStrengthSummary: '포털 산업의 생성형 AI 트렌드에 대한 관심과 지원 분야를 향한 강한 열정이 느껴집니다.',
      card1_relevance: {
        score: 55,
        fitAssessment: '네이버에 대한 칭찬만 나열되었을 뿐, 네이버의 구체적 서비스에 대한 본인의 식견이 부족함',
        leadInFormat: true,
        keyMessage: '구체적 근거 없는 열정 표명',
        strengths: ['글의 흐름 자체는 자연스러움'],
        improvements: ['네이버의 특정 서비스(예: 클로바X, 네이버페이, 스마트블록)를 직접 사용해본 분석 경험을 담을 것']
      },
      card2_star: {
        situation: { status: 'MISSING', comment: '어떤 프로젝트에서 어떤 상황을 겪었는지 구체적 배경이 전혀 없습니다.' },
        task: { status: 'MISSING', comment: '해결해야 할 구체적인 과제나 지표가 누락되었습니다.' },
        action: { status: 'WARN', comment: '"다각도로 분석했다", "면밀히 관찰했다"와 같은 형용사만 있을 뿐 실제 행위가 없습니다.' },
        result: { status: 'MISSING', comment: '성과가 무엇인지 객관적 확인이 불가능합니다.' },
        starAdvice: '본인이 기획에 참여했던 단 1개의 구체적 프로젝트를 정해 STAR 구조로 다시 써야 합니다.'
      },
      card3_quantQuestions: {
        status: 'NO_QUANT',
        currentNumbers: [],
        coachingQuestions: [
          '기획했던 서비스나 프로젝트의 사용자 수는 몇 명이었나요?',
          '개선 전후로 전환율(CVR)이나 이탈률 등 어떤 정량 지표가 얼마나 나아졌나요?',
          '인터뷰나 설문조사를 몇 명을 대상으로 진행했나요?'
        ]
      },
      card4_aiClicheCheck: {
        score: 40,
        clichesFoundCount: 4,
        detections: [
          {
            originalSentence: '네이버의 비전에 깊이 공감하며 시너지 효과를 창출하고자 지원하였습니다.',
            issue: '자기소개서 탈락 1순위 상투어: 근거 없는 비전 공감 및 시너지 효과',
            suggestion: '네이버 하이퍼클로바X가 적용된 생성형 검색 Cue:를 사용하며 기획자로서 느낀 UX 개선점과, 제가 진행한 대화형 인터페이스 기획 경험을 접목하고자 지원했습니다.'
          },
          {
            originalSentence: '대학 시절 다양한 프로젝트를 수행하며 다각도의 분석을 통해 최선의 솔루션을 도출해왔습니다.',
            issue: 'AI 번역투 표현(다각도의 분석, 최선의 솔루션 도출)',
            suggestion: '학내 중고거래 웹 서비스 기획 당시, 120명의 학생 설문 데이터와 거래 로그를 분석해 직거래 장소 추천 필터를 추가했습니다.'
          },
          {
            originalSentence: '열정과 끈기를 다해 문제를 해결하며 괄목할 만한 성과를 거두었습니다.',
            issue: '알맹이 없는 상투적 찬사 및 과장 표현',
            suggestion: '출시 2주 만에 누적 매칭 350건을 달성하고, 거래 성사율을 기존 28%에서 52%로 24%p 개선했습니다.'
          },
          {
            originalSentence: '네이버의 글로벌 도약에 한 획을 긋는 혁신적인 인재가 되겠습니다.',
            issue: '모호하고 거창한 진부한 클로징 문구',
            suggestion: '국내 포털 1위를 넘어 일본과 아시아 검색 시장에서도 통하는 직관적인 AI 검색 UX를 설계하는 기획자가 되겠습니다.'
          }
        ]
      },
      card5_polishing: {
        charCountAdvice: '현재 326자로 700자 제한 대비 46%에 불과합니다. 실제 기획 사례를 상세히 보강해야 합니다.',
        spellingAndGrammar: [],
        unnecessarySentences: [
          '새로운 지평을 열어가는 혁신적 기획자 (소제목이 지나치게 추상적이므로 기획한 실제 결과물 키워드로 교체 요망)'
        ],
        improvedFullText: `[120명의 사용자 로그 분석으로 거래 성사율 52%를 달성한 기획 경험]

네이버 생성형 검색 Cue:의 등장은 검색의 패러다임을 정보 탐색에서 의사결정 보조로 전환시켰습니다. 저는 대학생 전용 물품 대여 서비스 '캠퍼스셰어'를 직접 기획하며 데이터로 사용자 페인포인트를 해결하는 기쁨을 배웠습니다.

런칭 초기 검색 대비 거래 전환율이 28%에 머무는 원인을 찾고자, 120명의 설문조사와 검색 키워드 로그 1,500건을 분석했습니다. 그 결과 사용자들이 건물별 위치 정보를 몰라 거래를 포기한다는 점을 발견했습니다. 이에 '강의동 반경 100m 실시간 픽업 필터'를 기획하고 프론트엔드 개발팀과 2주 스프린트로 배포했습니다. 

그 결과 픽업 소요 시간이 평균 15분 단축되었고 거래 성사율은 52%로 향상되었습니다. 네이버 Search & AI 부서에서도 가설 설정과 로그 데이터 검증을 바탕으로 사용자의 마지막 의사결정까지 돕는 정교한 검색 인터페이스를 만들겠습니다.`
      }
    }
  },
  {
    id: 'sample-over-length',
    label: '카카오 (글자 수 제한 초과형)',
    badge: 'T3-4 테스트',
    description: '글자 수 제한(500자)을 훌륭히 초과(612자)하여 빨간색 경고 및 문장 축약 제안이 작동하는 샘플',
    data: {
      companyName: '카카오',
      jobTitle: '데이터 엔지니어',
      questionType: '직무역량 / 전문성',
      questionText: '지원 직무를 위해 어떤 준비를 해왔는지 구체적인 프로젝트와 역량 중심으로 기술하세요.',
      maxChars: 500,
      includeSpaces: true,
      coverLetterText: `[실시간 분산 스트리밍 파이프라인 구축 역량]
대용량 이커머스 트래픽 환경에서 실시간 유저 행동 로그를 분석하기 위해 Kafka와 Apache Spark 기반의 데이터 파이프라인을 직접 구축했습니다. 기존에는 배치 처리 방식으로 인해 데이터 적재까지 최대 6시간의 지연이 발생하였고, 마케팅팀에서 즉각적인 타겟 프로모션을 실행하기 어려웠습니다.

저는 이러한 지연 문제를 해소하고자 Kafka 토픽 파티셔닝 전략을 재설계하고, Spark Structured Streaming을 적용하여 마이크로 배치 주기를 5초 단위로 단축시켰습니다. 또한 데이터 유실을 방지하기 위해 Write-Ahead Log(WAL)와 정확히 한 번(Exactly-once) 시맨틱을 보장하도록 체크포인팅 저장소를 최적화했습니다. 그 결과 일일 3,000만 건의 트래픽을 지연 없이 분산 저장소에 안착시켰습니다. 이러한 경험을 카카오의 대규모 트래픽 플랫폼에 바로 기여하겠습니다.`
    },
    mockCompanyAnalysis: {
      companyName: '카카오',
      jobTitle: '데이터 엔지니어',
      overview: '카카오톡을 필두로 모빌리티, 페이, 엔터테인먼트 등 전 국민의 일상을 연결하는 종합 모바일 테크 플랫폼입니다.',
      talentPersona: '기존의 틀을 깨는 질문을 던지고, 기술로 사회를 긍정적으로 변화시키며, 팀과 투명하게 소통하는 인재',
      recentNews: [
        '카카오톡 내 실시간 오픈채팅 및 쇼핑 탭 데이터 분산 파이프라인 고도화',
        '대규모 사용자 이벤트 트래픽 대응을 위한 하이브리드 클라우드 인프라 전환'
      ],
      roleCompetencies: ['Kafka, Flink, Spark 분산 스트리밍 엔진 튜닝', '대용량 NoSQL/Parquet 저장소 최적화'],
      sources: [{ title: '카카오 테크 블로그', url: 'https://tech.kakao.com' }],
      disclaimer: '※ 본 정보는 참고용입니다.'
    },
    mockReviewReport: {
      totalScore: 84,
      previousScore: 78,
      headline: '직무 전문성과 STAR 구성이 훌륭하나, 글자 수가 500자 제한을 초과했으므로 군더더기 문장을 압축해야 합니다.',
      coreStrengthSummary: '대용량 분산 환경에서 Kafka 파티셔닝과 Spark Structured Streaming으로 6시간 지연을 5초 단위로 실시간화한 기술적 해결력이 뛰어납니다.',
      card1_relevance: {
        score: 92,
        fitAssessment: '데이터 엔지니어링 실무에 직결되는 분산 스트리밍 경험이 매우 우수하게 기술됨',
        leadInFormat: true,
        keyMessage: 'Kafka + Spark 스트리밍 파이프라인 구축 및 지연 해소',
        strengths: ['기술 스택과 해결 메커니즘이 구체적', '문제 상황과 개선 결과가 정량적임'],
        improvements: ['글자 수 제한(500자)을 112자 초과하여 제출 불가 상태이므로 문장 압축 필요']
      },
      card2_star: {
        situation: { status: 'EXCELLENT', comment: '6시간 배치 지연으로 인한 비즈니스 병목이 명확함' },
        task: { status: 'EXCELLENT', comment: '실시간 파이프라인 구축 및 무유실 보장 과제 정의 완료' },
        action: { status: 'EXCELLENT', comment: '파티셔닝 재설계, Spark Structured Streaming 및 WAL 최적화' },
        result: { status: 'EXCELLENT', comment: '일일 3,000만 건 처리 및 5초 주기 단축' },
        starAdvice: 'STAR 구조는 매우 탄탄합니다. 글자 수 다이어트만 진행하면 즉시 최종 제출본이 됩니다.'
      },
      card3_quantQuestions: {
        status: 'SUFFICIENT',
        currentNumbers: ['6시간', '5초', '3,000만 건'],
        coachingQuestions: [
          '파이프라인 구축 전후 서버 인프라 비용 절감 효과도 있었다면 한 단어로 추가할 수 있습니다.'
        ]
      },
      card4_aiClicheCheck: {
        score: 90,
        clichesFoundCount: 0,
        detections: []
      },
      card5_polishing: {
        charCountAdvice: '⚠️ 현재 612자로 제한(500자)을 112자 초과했습니다! 빨간색 표시를 해제하려면 아래 압축본을 적용하세요.',
        spellingAndGrammar: [],
        unnecessarySentences: [
          '기존에는 배치 처리 방식으로 인해 데이터 적재까지 최대 6시간의 지연이 발생하였고, 마케팅팀에서 즉각적인 타겟 프로모션을 실행하기 어려웠습니다. -> "기존 6시간 지연 배치를 실시간화하여 마케팅 적시성을 확보하고자 했습니다."로 28자 축약 가능'
        ],
        improvedFullText: `[실시간 분산 스트리밍 파이프라인 구축]
대용량 이커머스 환경에서 6시간 지연되던 배치 파이프라인을 실시간 스트리밍으로 전면 전환했습니다. Kafka 토픽 파티셔닝을 재설계하고 Spark Structured Streaming을 도입하여 배치 주기를 5초 단위로 단축시켰습니다. 또한 데이터 무유실을 위해 WAL 및 Exactly-once 체크포인팅을 최적화했습니다. 그 결과 일일 3,000만 건의 트래픽을 병목 없이 처리했습니다. 대규모 분산 환경 최적화 역량으로 카카오의 플랫폼 안정성을 높이겠습니다.`
      }
    }
  },
  {
    id: 'sample-star-excellent',
    label: '현대자동차 (STAR 완벽형 고득점)',
    badge: 'T3-1 테스트',
    description: 'STAR의 Situation, Task, Action, Result가 완벽하게 수치와 함께 구성된 모범 합격 자소서',
    data: {
      companyName: '현대자동차',
      jobTitle: '연구개발 (자율주행 제어)',
      questionType: '성공 / 성취 경험 (STAR)',
      questionText: '자신에게 주어진 일이나 과제에서 주도적으로 문제를 발견하고 해결하여 최상의 결과를 낸 경험을 기술하시오.',
      maxChars: 800,
      includeSpaces: true,
      coverLetterText: `[센서 융합 칼만 필터 개선으로 궤적 추종 오차 65% 감축]
대학 자율주행 경진대회에서 GPS 음영 구간 진입 시 차량이 경로를 이탈하는 치명적인 제어 불안정 문제가 발생했습니다. 터널 진입 직후 약 3초간 센서 노이즈가 급증하여 조향각이 요동쳤습니다.

저는 섀시 제어 팀장으로서 오차 원인을 분석하고, 단일 관성측정장치(IMU)에만 의존하던 기존 융합 알고리즘의 한계를 규명했습니다. 이를 극복하고자 휠 엔코더의 주행 속도 데이터와 확장 칼만 필터(EKF)의 공분산 행렬을 차량 슬립 각도에 따라 동적으로 가변 튜닝하는 알고리즘을 제안했습니다. 매일 4시간씩 모의 트랙에서 총 150회의 주행 테스트 데이터를 수집하여 필터 게인값을 최적화했습니다.

그 결과 GPS 신호 단절 환경에서도 경로 추종 횡방향 오차를 기존 42cm에서 15cm로 65% 대폭 감축시키며 20개 참가팀 중 종합 1위 금상을 수상했습니다. 현대자동차의 전동화 및 SDV 전환 여정에서도 신뢰성 100%의 주행 제어로 안전을 입증하겠습니다.`
    },
    mockCompanyAnalysis: {
      companyName: '현대자동차',
      jobTitle: '연구개발 (자율주행 제어)',
      overview: '글로벌 완성차 및 스마트 모빌리티 솔루션 프로바이더로서, 전동화(EV), SDV(소프트웨어 중심 자동차), 수소 생태계를 주도하고 있습니다.',
      talentPersona: '새로운 시각으로 끊임없이 도전하고(New Thinking), 고객의 안전을 최우선으로 타협하지 않는 열정(Uncompromising Passion)',
      recentNews: [
        'SDV 페이스 카 개발 가속화 및 차세대 차량용 OS 통합 제어기 양산',
        '북미 자율주행 테스트베드에서의 무인 로보택시 상용화 실증 테스트'
      ],
      roleCompetencies: ['차량 동역학 및 궤적 제어 알고리즘(EKF, MPC)', 'ISO 26262 기능안전 규격 준수'],
      sources: [{ title: '현대자동차 공식 채용 웹사이트', url: 'https://talent.hyundai.com' }],
      disclaimer: '※ 본 정보는 참고용입니다.'
    },
    mockReviewReport: {
      totalScore: 95,
      previousScore: 88,
      headline: 'STAR 4단계가 명확하고 정량적 수치(65% 감축, 150회 테스트)와 구체적 기술 용어가 어우러진 모범 자소서입니다.',
      coreStrengthSummary: '문제 상황의 근본 원인을 센서 하드웨어 한계에서 규명하고 EKF 공분산 행렬을 동적 가변화하여 궤적 오차를 65%나 개선한 정량적 성과가 매우 독보적입니다.',
      card1_relevance: {
        score: 96,
        fitAssessment: '자율주행 제어 직무에 가장 중요한 센서 퓨전과 궤적 제어 역량이 명확히 입증됨',
        leadInFormat: true,
        keyMessage: '칼만 필터 동적 튜닝으로 횡오차 65% 감축',
        strengths: [
          '첫 줄 소제목부터 수치 성과가 각인됨',
          '도전 계기-원인 분석-동적 알고리즘 설계-결과까지 논리적 비약이 없음'
        ],
        improvements: ['현대자동차의 SDV 비전과의 연결이 매끄러우며 별다른 수정이 필요 없습니다.']
      },
      card2_star: {
        situation: { status: 'EXCELLENT', comment: 'GPS 음영 터널 구간에서의 조향 요동 상황이 매우 생생함' },
        task: { status: 'EXCELLENT', comment: '경로 이탈 방지 및 센서 융합 신뢰성 확보 과제 명확' },
        action: { status: 'EXCELLENT', comment: '확장 칼만 필터(EKF) 공분산 행렬 동적 가변화 및 150회 실증 테스트' },
        result: { status: 'EXCELLENT', comment: '횡방향 오차 42cm -> 15cm 감축 (65% 개선) 및 종합 1위 수상' },
        starAdvice: 'STAR의 완벽한 롤모델입니다. 실무 면접에서도 이 경험을 1분 자기소개로 활용하세요.'
      },
      card3_quantQuestions: {
        status: 'SUFFICIENT',
        currentNumbers: ['3초', '4시간', '150회', '42cm', '15cm', '65%', '20개 팀', '1위'],
        coachingQuestions: [
          '면접관이 "공분산 행렬을 가변화할 때 계산 복잡도(CPU 점유율)는 얼마나 증가했는가?"라고 물을 수 있으니 해당 수치를 면접 대비용으로 메모해 두세요.'
        ]
      },
      card4_aiClicheCheck: {
        score: 98,
        clichesFoundCount: 0,
        detections: []
      },
      card5_polishing: {
        charCountAdvice: '현재 658자로 800자 제한 대비 82%로 여유롭고 전달력이 우수합니다.',
        spellingAndGrammar: [],
        unnecessarySentences: [],
        improvedFullText: `[센서 융합 칼만 필터 개선으로 궤적 추종 오차 65% 감축]
대학 자율주행 경진대회에서 GPS 음영 구간 진입 시 차량이 경로를 이탈하는 치명적인 제어 불안정 문제가 발생했습니다. 터널 진입 직후 약 3초간 센서 노이즈가 급증하여 조향각이 요동쳤습니다.

저는 섀시 제어 팀장으로서 오차 원인을 분석하고, 단일 관성측정장치(IMU)에만 의존하던 기존 융합 알고리즘의 한계를 규명했습니다. 이를 극복하고자 휠 엔코더의 주행 속도 데이터와 확장 칼만 필터(EKF)의 공분산 행렬을 차량 슬립 각도에 따라 동적으로 가변 튜닝하는 알고리즘을 제안했습니다. 매일 4시간씩 모의 트랙에서 총 150회의 주행 테스트 데이터를 수집하여 필터 게인값을 최적화했습니다.

그 결과 GPS 신호 단절 환경에서도 경로 추종 횡방향 오차를 기존 42cm에서 15cm로 65% 대폭 감축시키며 20개 참가팀 중 종합 1위 금상을 수상했습니다. 현대자동차의 전동화 및 SDV 전환 여정에서도 신뢰성 100%의 주행 제어로 안전을 입증하겠습니다.`
      }
    }
  }
];

export const QUESTION_TYPE_DESCRIPTIONS: Record<string, string> = {
  '지원동기': '기업의 최근 행보 및 비전과 본인의 커리어 목표를 일치시키는 것이 핵심입니다.',
  '직무역량 / 전문성': '관련 전공 지식, 프로젝트, 자격, 도구 활용 능력을 구체적 근거로 제시하세요.',
  '성공 / 성취 경험 (STAR)': 'Situation(상황)-Task(과제)-Action(본인 행동)-Result(정량 성과) 구조가 필수입니다.',
  '실패 / 극복 / 위기 경험': '실패 자체보다 원인 분석과 이를 통해 무엇을 배웠는지 성장점이 핵심입니다.',
  '갈등 해결 / 협업 / 팀워크': '상대방의 입장을 경청하고 상호 윈-윈을 이끌어낸 중재 과정을 서술하세요.',
  '입사 후 포부 / 커리어 플랜': '3년, 5년, 10년 단위의 구체적인 단계별 기여 방안을 서술하세요.',
  '성장 과정 / 가치관': '본인의 가치관 형성에 결정적 영향을 준 사건과 이를 업무에 적용하는 방식을 보여주세요.'
};
