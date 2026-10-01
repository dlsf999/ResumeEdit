import React from 'react';
import { ReviewHistoryItem } from '../types/index.ts';
import { History, TrendingUp, TrendingDown, ArrowRight, Clock, Award, X } from 'lucide-react';

interface ScoreHistoryDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  history: ReviewHistoryItem[];
  onSelectHistoryItem: (item: ReviewHistoryItem) => void;
}

export const ScoreHistoryDrawer: React.FC<ScoreHistoryDrawerProps> = ({
  isOpen,
  onClose,
  history,
  onSelectHistoryItem,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex justify-end">
      <div className="bg-white w-full max-w-md h-full shadow-2xl flex flex-col border-l border-[#E2DBD1] animate-in slide-in-from-right duration-200">
        {/* Header */}
        <div className="bg-[#FAF8F5] border-b border-[#E2DBD1] px-5 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <History className="w-5 h-5 text-[#D64545]" />
            <h2 className="text-base font-bold text-slate-900 font-editorial">
              첨삭 점수 히스토리 (재첨삭 비교)
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* List */}
        <div className="p-5 overflow-y-auto flex-1 space-y-3">
          {history.length === 0 ? (
            <div className="text-center py-12 text-slate-400 text-xs">
              <Clock className="w-8 h-8 mx-auto mb-2 opacity-40" />
              <p>아직 첨삭 기록이 없습니다.</p>
              <p className="mt-1">첨삭을 진행할 때마다 점수 변화가 기록됩니다.</p>
            </div>
          ) : (
            history.map((item, idx) => {
              const prevItem = history[idx + 1];
              const scoreDelta = prevItem ? item.score - prevItem.score : 0;
              const dateStr = new Date(item.timestamp).toLocaleTimeString('ko-KR', {
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit',
              });

              return (
                <div
                  key={item.id}
                  onClick={() => onSelectHistoryItem(item)}
                  className="p-4 rounded-xl border border-slate-200 bg-white hover:border-[#D64545]/60 hover:shadow-xs transition-all cursor-pointer space-y-2"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-slate-900">
                        {idx === 0 ? '최신 첨삭' : `${history.length - idx}회차 첨삭`}
                      </span>
                      <span className="text-[11px] text-slate-400">{dateStr}</span>
                    </div>

                    <div className="flex items-center gap-2">
                      {prevItem && scoreDelta !== 0 && (
                        <span
                          className={`text-xs font-bold flex items-center ${
                            scoreDelta > 0 ? 'text-emerald-600' : 'text-red-500'
                          }`}
                        >
                          {scoreDelta > 0 ? (
                            <TrendingUp className="w-3.5 h-3.5 mr-0.5" />
                          ) : (
                            <TrendingDown className="w-3.5 h-3.5 mr-0.5" />
                          )}
                          {scoreDelta > 0 ? `+${scoreDelta}` : scoreDelta}점
                        </span>
                      )}
                      <div className="w-8 h-8 rounded-lg bg-red-50 border border-red-200 text-[#D64545] font-mono font-bold text-sm flex items-center justify-center">
                        {item.score}
                      </div>
                    </div>
                  </div>

                  <div className="text-xs text-slate-600 flex items-center gap-2">
                    <span className="font-semibold text-slate-800">{item.companyName}</span>
                    <span>·</span>
                    <span>{item.questionType}</span>
                    <span>·</span>
                    <span className="font-mono">{item.charCount}자</span>
                  </div>

                  <p className="text-[11px] text-slate-500 line-clamp-1 italic">
                    "{item.report.headline}"
                  </p>
                </div>
              );
            })
          )}
        </div>

        {/* Footer */}
        <div className="p-4 bg-[#FAF8F5] border-t border-[#E2DBD1] text-center">
          <p className="text-[11px] text-slate-500">
            피드백을 반영해 다시 첨삭받으면 점수 상승폭을 한눈에 확인할 수 있습니다.
          </p>
        </div>
      </div>
    </div>
  );
};
