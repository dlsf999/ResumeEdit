import React from 'react';
import { PenTool, Sparkles, CheckSquare, RotateCcw, AlertTriangle, FileText } from 'lucide-react';

interface HeaderProps {
  useRealAi: boolean;
  onToggleAiMode: (mode: boolean) => void;
  onReset: () => void;
  onOpenChecklist: () => void;
  hasApiKey: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  useRealAi,
  onToggleAiMode,
  onReset,
  onOpenChecklist,
  hasApiKey,
}) => {
  return (
    <header className="relative border-b border-[#E2DBD1] bg-[#FAF8F5]/90 backdrop-blur-sm sticky top-0 z-30">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3.5 flex flex-col sm:flex-row items-center justify-between gap-3">
        {/* Brand / Logo */}
        <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-start">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-[#D64545] text-white flex items-center justify-center shadow-md shadow-red-200">
              <PenTool className="w-5 h-5 -rotate-45" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-lg sm:text-xl font-bold tracking-tight text-slate-900 font-editorial">
                  자소서 첨삭 코치
                </h1>
                <span className="text-[11px] font-medium text-[#D64545] border border-[#D64545]/40 bg-red-50/80 px-2 py-0.5 rounded-full font-sans">
                  빨간펜 에디토리얼
                </span>
              </div>
              <p className="text-xs text-slate-500 hidden sm:block">
                대기업·공기업 합격 자소서 실시간 분석 & STAR·클리셰 교정
              </p>
            </div>
          </div>

          {/* Mobile Checklist Button */}
          <button
            onClick={onOpenChecklist}
            className="sm:hidden flex items-center gap-1 text-xs text-slate-600 bg-white border border-[#E2DBD1] px-2.5 py-1.5 rounded-lg shadow-sm"
          >
            <CheckSquare className="w-3.5 h-3.5 text-[#D64545]" />
            <span>체크리스트</span>
          </button>
        </div>

        {/* Right Tools & Mode Toggle */}
        <div className="flex items-center gap-2 sm:gap-3 w-full sm:w-auto justify-end flex-wrap">
          {/* AI vs Demo Mode Switcher */}
          <div className="flex items-center bg-[#F0EBE1] p-1 rounded-xl border border-[#E2DBD1] text-xs">
            <button
              type="button"
              onClick={() => onToggleAiMode(false)}
              className={`px-3 py-1.5 rounded-lg font-medium transition-all ${
                !useRealAi
                  ? 'bg-white text-slate-900 shadow-sm border border-slate-200/60 font-semibold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              🧪 예시 데이터 모드 (Phase 1)
            </button>
            <button
              type="button"
              onClick={() => onToggleAiMode(true)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-medium transition-all ${
                useRealAi
                  ? 'bg-[#D64545] text-white shadow-sm font-semibold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>실시간 Gemini AI (Phase 2)</span>
            </button>
          </div>

          {/* Checklist modal button */}
          <button
            type="button"
            onClick={onOpenChecklist}
            className="hidden sm:flex items-center gap-1.5 text-xs text-slate-700 bg-white hover:bg-slate-50 border border-[#E2DBD1] px-3 py-2 rounded-xl shadow-xs transition-colors"
            title="PRD 개발 체크리스트 확인"
          >
            <CheckSquare className="w-3.5 h-3.5 text-[#D64545]" />
            <span>PRD 체크리스트</span>
          </button>

          {/* Reset button */}
          <button
            type="button"
            onClick={onReset}
            className="text-slate-500 hover:text-slate-800 p-2 rounded-lg hover:bg-slate-100 transition-colors"
            title="입력 내용 초기화"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {useRealAi && !hasApiKey && (
        <div className="bg-amber-50 border-t border-amber-200 px-4 py-1.5 text-center text-xs text-amber-800 flex items-center justify-center gap-1.5">
          <AlertTriangle className="w-3.5 h-3.5 text-amber-600 shrink-0" />
          <span>GEMINI_API_KEY가 감지되지 않아도 내장 고품질 예시 데이터로 100% 정상 시뮬레이션 가능합니다.</span>
        </div>
      )}
    </header>
  );
};
