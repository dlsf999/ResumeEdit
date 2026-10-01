import React from 'react';
import { PenTool, Loader2, Sparkles, AlertCircle, Info, RefreshCw } from 'lucide-react';

interface Step3ActionBarProps {
  onStartReview: () => void;
  isLoading: boolean;
  hasCompanyAnalysis: boolean;
  charCount: number;
  isOverLimit: boolean;
  isOverAbuseLimit: boolean;
  hasInput: boolean;
  error?: string | null;
  onRetry?: () => void;
}

const LOADING_STAGES = [
  '1단계: 문항 적합도 및 두괄식 구성 분석 중...',
  '2단계: STAR 구조 및 결과(R) 정량 수치 검증 중...',
  '3단계: AI 번역투 및 상투적 클리셰 정밀 스캔 중...',
  '4단계: 맞춤법 교정 및 글자 수 최적화 리포트 작성 중...',
];

export const Step3ActionBar: React.FC<Step3ActionBarProps> = ({
  onStartReview,
  isLoading,
  hasCompanyAnalysis,
  charCount,
  isOverLimit,
  isOverAbuseLimit,
  hasInput,
  error,
  onRetry,
}) => {
  const [stageIndex, setStageIndex] = React.useState(0);

  React.useEffect(() => {
    if (!isLoading) {
      setStageIndex(0);
      return;
    }

    const interval = setInterval(() => {
      setStageIndex((prev) => (prev < LOADING_STAGES.length - 1 ? prev + 1 : prev));
    }, 1800);

    return () => clearInterval(interval);
  }, [isLoading]);

  return (
    <div className="space-y-3">
      {/* Tip Banner if company analysis not done yet (T3-7 requirement) */}
      {!hasCompanyAnalysis && (
        <div className="bg-amber-50/80 border border-amber-200/80 text-amber-900 text-xs px-4 py-2.5 rounded-xl flex items-center justify-between gap-3 shadow-xs">
          <div className="flex items-center gap-2">
            <Info className="w-4 h-4 text-amber-600 shrink-0" />
            <span>
              💡 <strong>안내 (T3-7):</strong> 기업분석을 먼저 진행하시면 해당 기업의 인재상과 최근 이슈를 반영한 맞춤형 첨삭을 받을 수 있습니다. (기업분석 없이도 바로 첨삭 가능합니다)
            </span>
          </div>
        </div>
      )}

      {/* Error Banner with Retry Button (T3-10 requirement) */}
      {error && !isLoading && (
        <div className="bg-red-50 border border-red-200 text-red-900 text-xs p-4 rounded-xl flex items-start justify-between gap-3">
          <div className="flex items-start gap-2.5">
            <AlertCircle className="w-4 h-4 text-[#D64545] shrink-0 mt-0.5" />
            <div>
              <p className="font-bold text-slate-900">첨삭 처리 중 오류가 발생했습니다.</p>
              <p className="text-red-700 mt-0.5">{error}</p>
            </div>
          </div>
          {onRetry && (
            <button
              type="button"
              onClick={onRetry}
              className="px-3 py-1.5 bg-[#D64545] text-white font-semibold rounded-lg hover:bg-red-700 flex items-center gap-1.5 shrink-0 shadow-xs"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>재시도</span>
            </button>
          )}
        </div>
      )}

      {/* Main Execution Card */}
      <div className="bg-white rounded-2xl border border-[#E2DBD1] p-5 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="flex items-center justify-center w-6 h-6 rounded-full bg-[#1F2937] text-white text-xs font-bold">
              3
            </span>
            <h3 className="text-base font-bold text-slate-900 font-editorial">
              STEP 3. 자기소개서 첨삭 실행
            </h3>
          </div>
          <p className="text-xs text-slate-500 mt-1 pl-8">
            STAR 구조, 정량적 수치 누락, AI 상투어, 맞춤법을 전방위로 진단합니다.
          </p>
        </div>

        {/* Action Button & Abuse Protection */}
        <div className="w-full sm:w-auto flex flex-col sm:items-end gap-1.5">
          <button
            type="button"
            onClick={onStartReview}
            disabled={isLoading || isOverAbuseLimit || !hasInput}
            className={`w-full sm:w-auto px-6 py-3.5 rounded-xl font-bold text-sm flex items-center justify-center gap-2.5 transition-all shadow-md ${
              isLoading
                ? 'bg-slate-700 text-white cursor-wait'
                : isOverAbuseLimit || !hasInput
                ? 'bg-slate-200 text-slate-400 cursor-not-allowed border border-slate-300 shadow-none'
                : 'bg-[#D64545] hover:bg-[#B83232] text-white shadow-red-200 hover:shadow-red-300 active:scale-[0.99]'
            }`}
          >
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin text-white" />
                <span>정밀 첨삭 진행 중...</span>
              </>
            ) : (
              <>
                <PenTool className="w-4 h-4 -rotate-45" />
                <span>빨간펜 첨삭 시작하기</span>
              </>
            )}
          </button>

          {/* Validation helpers */}
          {!hasInput && (
            <span className="text-[11px] text-slate-400 text-center sm:text-right">
              * 기업명, 직무 및 자기소개서 본문을 입력하세요
            </span>
          )}

          {isOverAbuseLimit && (
            <span className="text-[11px] text-[#D64545] font-semibold text-center sm:text-right">
              * 본문 3,000자 초과로 버튼이 비활성화되었습니다 (T2-9)
            </span>
          )}
        </div>
      </div>

      {/* Loading Stages Visualizer */}
      {isLoading && (
        <div className="bg-[#FAF8F5] border border-[#E2DBD1] rounded-xl p-4 text-center space-y-2">
          <div className="flex items-center justify-center gap-2 text-xs font-bold text-[#D64545]">
            <Sparkles className="w-4 h-4 animate-spin" />
            <span>{LOADING_STAGES[stageIndex]}</span>
          </div>
          <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden max-w-md mx-auto">
            <div
              className="bg-[#D64545] h-full transition-all duration-700"
              style={{ width: `${((stageIndex + 1) / LOADING_STAGES.length) * 100}%` }}
            />
          </div>
          <p className="text-[11px] text-slate-500">
            인사담당자 관점에서 합격 기준을 대조 분석하고 있습니다. 잠시만 기다려주세요.
          </p>
        </div>
      )}
    </div>
  );
};
