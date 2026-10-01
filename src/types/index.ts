export type QuestionType =
  | '지원동기'
  | '직무역량 / 전문성'
  | '성공 / 성취 경험 (STAR)'
  | '실패 / 극복 / 위기 경험'
  | '갈등 해결 / 협업 / 팀워크'
  | '입사 후 포부 / 커리어 플랜'
  | '성장 과정 / 가치관';

export interface FormData {
  companyName: string;
  jobTitle: string;
  questionType: QuestionType;
  questionText: string;
  maxChars: number;
  includeSpaces: boolean;
  coverLetterText: string;
}

export interface CompanyAnalysisSource {
  title: string;
  url: string;
}

export interface CompanyAnalysis {
  companyName: string;
  jobTitle: string;
  overview: string;
  talentPersona: string;
  recentNews: string[];
  roleCompetencies: string[];
  sources: CompanyAnalysisSource[];
  disclaimer: string;
}

export type StarStatus = 'EXCELLENT' | 'GOOD' | 'WARN' | 'MISSING';

export interface StarStepDetail {
  status: StarStatus;
  comment: string;
}

export interface ClicheDetection {
  originalSentence: string;
  issue: string;
  suggestion: string;
}

export interface SpellingCorrection {
  before: string;
  after: string;
  reason: string;
}

export interface ReviewReport {
  totalScore: number;
  previousScore?: number;
  headline: string;
  coreStrengthSummary?: string;
  card1_relevance: {
    score: number;
    fitAssessment: string;
    leadInFormat: boolean;
    keyMessage: string;
    strengths: string[];
    improvements: string[];
  };
  card2_star: {
    situation: StarStepDetail;
    task: StarStepDetail;
    action: StarStepDetail;
    result: StarStepDetail;
    starAdvice: string;
  };
  card3_quantQuestions: {
    status: 'SUFFICIENT' | 'NEEDS_QUANT' | 'NO_QUANT';
    currentNumbers: string[];
    coachingQuestions: string[];
  };
  card4_aiClicheCheck: {
    score: number;
    clichesFoundCount: number;
    detections: ClicheDetection[];
  };
  card5_polishing: {
    charCountAdvice: string;
    spellingAndGrammar: SpellingCorrection[];
    unnecessarySentences: string[];
    improvedFullText: string;
  };
}

export interface ReviewHistoryItem {
  id: string;
  timestamp: number;
  score: number;
  companyName: string;
  jobTitle: string;
  questionType: QuestionType;
  charCount: number;
  coverLetterText: string;
  report: ReviewReport;
}

export interface SamplePreset {
  id: string;
  label: string;
  description: string;
  badge: string;
  data: FormData;
  mockCompanyAnalysis: CompanyAnalysis;
  mockReviewReport: ReviewReport;
}
