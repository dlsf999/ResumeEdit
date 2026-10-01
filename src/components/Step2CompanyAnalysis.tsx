import React from 'react';
import { CompanyAnalysis } from '../types/index.ts';
import {
  Building2,
  ChevronDown,
  ChevronUp,
  Search,
  ExternalLink,
  Info,
  Loader2,
  Award,
  TrendingUp,
  Briefcase,
  Sparkles,
} from 'lucide-react';

interface Step2CompanyAnalysisProps {
  companyName: string;
  jobTitle: string;
  analysis: CompanyAnalysis | null;
  isLoading: boolean;
  isOpen: boolean;
  onToggleOpen: () => void;
  onRunAnalysis: () => void;
  error?: string | null;
}

export const Step2CompanyAnalysis: React.FC<Step2CompanyAnalysisProps> = ({
  companyName,
  jobTitle,
  analysis,
  isLoading,
  isOpen,
  onToggleOpen,
  onRunAnalysis,
  error,
}) => {
  return (
    <section className="bg-white rounded-2xl border border-[#E2DBD1] shadow-xs overflow-hidden transition-all">
      {/* Header bar / Accordion Trigger */}
      <div
        onClick={onToggleOpen}
        className="bg-[#FAF8F5] border-b border-[#E2DBD1] px-5 py-3.5 flex items-center justify-between cursor-pointer hover:bg-[#F5F1E9] transition-colors"
      >
        <div className="flex items-center gap-2.5">
          <span className="flex items-center justify-center w-6 h-6 rounded-full bg-[#1F2937] text-white text-xs font-bold">
            2
          </span>
          <div className="flex items-center gap-2">
            <h2 className="text-base font-bold text-slate-900 font-editorial flex items-center gap-1.5">
              <span>STEP 2. 기업 및 직무 분석 리포트</span>
              <span className="text-xs font-normal text-slate-500 hidden sm:inline">
                (Google Search 연동)
              </span>
            </h2>
            {analysis && (
              <span className="text-[11px] bg-emerald-100 text-emerald-800 font-medium px-2 py-0.5 rounded-full">
                분석 완료
              </span>
            )}
          </div>
        </div>

        <div className="flex items-center gap-3">
          {!analysis && !isLoading && (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onRunAnalysis();
              }}
              disabled={!companyName.trim()}
              className="text-xs font-medium text-white bg-slate-900 hover:bg-slate-800 disabled:opacity-40 px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-colors shadow-xs"
            >
              <Search className="w-3.5 h-3.5" />
              <span>기업분석 실행</span>
            </button>
          )}

          {isOpen ? (
            <ChevronUp className="w-4 h-4 text-slate-500" />
          ) : (
            <ChevronDown className="w-4 h-4 text-slate-500" />
          )}
        </div>
      </div>

      {/* Accordion Content */}
      {isOpen && (
        <div className="p-5 sm:p-6 space-y-5">
          {/* If No Analysis Performed Yet */}
          {!analysis && !isLoading && (
            <div className="text-center py-8 px-4 bg-[#FAF8F5]/60 rounded-xl border border-dashed border-[#E2DBD1]">
              <div className="w-12 h-12 mx-auto rounded-full bg-[#EAE3D9] flex items-center justify-center text-slate-600 mb-3">
                <Building2 className="w-6 h-6 text-slate-600" />
              </div>
              <h3 className="text-sm font-bold text-slate-800 mb-1">
                {companyName.trim()
                  ? `'${companyName}' 기업분석을 시작해보세요`
                  : '기업명을 입력하고 분석을 실행하세요'}
              </h3>
              <p className="text-xs text-slate-500 max-w-md mx-auto mb-4">
                Google Search를 통해 기업의 최신 뉴스, 인재상, 직무별 핵심 역량을 수집하여 자소서의 합격 확률을 높여드립니다.
              </p>
              <button
                type="button"
                onClick={onRunAnalysis}
                disabled={!companyName.trim()}
                className="inline-flex items-center gap-2 px-4 py-2 bg-slate-900 hover:bg-slate-800 disabled:opacity-40 text-white text-xs font-semibold rounded-xl shadow-xs transition-colors"
              >
                <Search className="w-3.5 h-3.5" />
                <span>지금 {companyName || '기업'} 분석하기</span>
              </button>
            </div>
          )}

          {/* Loading Skeleton / Status */}
          {isLoading && (
            <div className="py-8 text-center space-y-3">
              <Loader2 className="w-7 h-7 text-[#D64545] animate-spin mx-auto" />
              <div className="text-sm font-bold text-slate-800">
                '{companyName}'의 최신 뉴스 및 채용 인재상을 검색하고 있습니다...
              </div>
              <p className="text-xs text-slate-500">
                Google Search Grounding을 통해 실시간 기업 정보를 수집 중입니다.
              </p>
            </div>
          )}

          {/* Error Message */}
          {error && !isLoading && (
            <div className="bg-red-50 border border-red-200 text-red-800 text-xs p-3.5 rounded-xl flex items-start gap-2.5">
              <Info className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
              <div className="flex-1">
                <p className="font-semibold">{error}</p>
                <button
                  type="button"
                  onClick={onRunAnalysis}
                  className="mt-2 text-xs font-bold text-red-700 underline hover:text-red-900"
                >
                  다시 시도하기
                </button>
              </div>
            </div>
          )}

          {/* Analysis Result (4 Key Areas from PRD) */}
          {analysis && !isLoading && (
            <div className="space-y-4">
              {/* Target Company & Job Badge */}
              <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-slate-900 px-2.5 py-1 bg-slate-100 rounded-md">
                    {analysis.companyName}
                  </span>
                  <span className="text-xs font-medium text-slate-600 px-2.5 py-1 bg-slate-50 border border-slate-200 rounded-md">
                    {analysis.jobTitle || '지원 직무'}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={onRunAnalysis}
                  className="text-[11px] text-slate-500 hover:text-slate-800 underline flex items-center gap-1"
                >
                  <Search className="w-3 h-3" />
                  <span>정보 새로고침</span>
                </button>
              </div>

              {/* 4 Key Grid Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* 1. Overview */}
                <div className="p-4 rounded-xl border border-slate-200 bg-white hover:border-slate-300 transition-colors">
                  <div className="flex items-center gap-2 text-xs font-bold text-slate-800 mb-2">
                    <div className="p-1 rounded-md bg-blue-50 text-blue-700">
                      <Building2 className="w-3.5 h-3.5" />
                    </div>
                    <span>1. 기업 개요 및 주요 사업</span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {analysis.overview}
                  </p>
                </div>

                {/* 2. Talent Persona */}
                <div className="p-4 rounded-xl border border-slate-200 bg-white hover:border-slate-300 transition-colors">
                  <div className="flex items-center gap-2 text-xs font-bold text-slate-800 mb-2">
                    <div className="p-1 rounded-md bg-emerald-50 text-emerald-700">
                      <Award className="w-3.5 h-3.5" />
                    </div>
                    <span>2. 인재상 및 핵심 가치</span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed font-medium">
                    {analysis.talentPersona}
                  </p>
                </div>

                {/* 3. Recent News & Trends */}
                <div className="p-4 rounded-xl border border-slate-200 bg-white hover:border-slate-300 transition-colors">
                  <div className="flex items-center gap-2 text-xs font-bold text-slate-800 mb-2">
                    <div className="p-1 rounded-md bg-amber-50 text-amber-700">
                      <TrendingUp className="w-3.5 h-3.5" />
                    </div>
                    <span>3. 최근 주요 이슈 및 트렌드</span>
                  </div>
                  <ul className="text-xs text-slate-600 space-y-1.5 list-disc list-inside leading-relaxed">
                    {analysis.recentNews.map((news, idx) => (
                      <li key={idx} className="marker:text-amber-500">
                        <span>{news}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* 4. Role Competencies */}
                <div className="p-4 rounded-xl border border-slate-200 bg-white hover:border-slate-300 transition-colors">
                  <div className="flex items-center gap-2 text-xs font-bold text-slate-800 mb-2">
                    <div className="p-1 rounded-md bg-purple-50 text-purple-700">
                      <Briefcase className="w-3.5 h-3.5" />
                    </div>
                    <span>4. 해당 직무 요구 핵심 역량 & 어필 포인트</span>
                  </div>
                  <ul className="text-xs text-slate-600 space-y-1.5 list-disc list-inside leading-relaxed">
                    {analysis.roleCompetencies.map((comp, idx) => (
                      <li key={idx} className="marker:text-purple-500 font-medium">
                        <span>{comp}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Sources List & Disclaimer */}
              <div className="pt-2 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                {/* Sources */}
                {analysis.sources && analysis.sources.length > 0 && (
                  <div className="flex items-center gap-1.5 flex-wrap">
                    <span className="text-[11px] font-bold text-slate-500">출처 링크:</span>
                    {analysis.sources.map((source, idx) => (
                      <a
                        key={idx}
                        href={source.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-[11px] text-blue-600 hover:text-blue-800 bg-blue-50/70 border border-blue-200/60 px-2 py-0.5 rounded-md hover:underline"
                      >
                        <span className="max-w-[140px] truncate">{source.title}</span>
                        <ExternalLink className="w-2.5 h-2.5 shrink-0" />
                      </a>
                    ))}
                  </div>
                )}

                {/* Disclaimer */}
                <span className="text-[11px] text-slate-400">
                  {analysis.disclaimer || '※ 본 정보는 Google Search 기반으로 수집된 참고용 정보입니다.'}
                </span>
              </div>
            </div>
          )}
        </div>
      )}
    </section>
  );
};
