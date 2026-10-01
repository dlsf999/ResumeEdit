import React from 'react';
import { ReviewReport, StarStatus } from '../types/index.ts';
import {
  Award,
  AlertTriangle,
  CheckCircle2,
  HelpCircle,
  Sparkles,
  TrendingUp,
  TrendingDown,
  Copy,
  Check,
  ChevronDown,
  ChevronUp,
  FileCheck,
  Scissors,
  ArrowRight,
  ShieldAlert,
  Zap,
} from 'lucide-react';

interface Step4ReviewReportProps {
  report: ReviewReport;
  onApplyImprovedText: (text: string) => void;
}

export const Step4ReviewReport: React.FC<Step4ReviewReportProps> = ({
  report,
  onApplyImprovedText,
}) => {
  const [copied, setCopied] = React.useState(false);
  const [expandedCards, setExpandedCards] = React.useState<Record<string, boolean>>({
    card1: true,
    card2: true,
    card3: true,
    card4: true,
    card5: true,
  });

  const toggleCard = (cardKey: string) => {
    setExpandedCards((prev) => ({ ...prev, [cardKey]: !prev[cardKey] }));
  };

  const handleCopyImproved = async () => {
    if (!report.card5_polishing?.improvedFullText) return;
    await navigator.clipboard.writeText(report.card5_polishing.improvedFullText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Score comparison delta (T2-8 requirement: "이전 61점 → 72점 ▲11")
  const hasPreviousScore = report.previousScore !== undefined && report.previousScore !== null;
  const scoreDiff = hasPreviousScore ? report.totalScore - (report.previousScore || 0) : 0;

  // Star status badge helper
  const renderStarBadge = (status: StarStatus, label: string) => {
    let colorClass = 'bg-slate-100 text-slate-700 border-slate-300';
    let icon = <HelpCircle className="w-3.5 h-3.5" />;
    let text = '확인 필요';

    if (status === 'EXCELLENT') {
      colorClass = 'bg-emerald-50 text-emerald-800 border-emerald-300';
      icon = <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />;
      text = '매우 우수';
    } else if (status === 'GOOD') {
      colorClass = 'bg-sky-50 text-sky-800 border-sky-300';
      icon = <CheckCircle2 className="w-3.5 h-3.5 text-sky-600" />;
      text = '양호';
    } else if (status === 'WARN') {
      colorClass = 'bg-amber-50 text-amber-800 border-amber-300 animate-pulse';
      icon = <AlertTriangle className="w-3.5 h-3.5 text-amber-600" />;
      text = '보완 필수 ⚠️';
    } else if (status === 'MISSING') {
      colorClass = 'bg-red-50 text-red-800 border-red-300';
      icon = <AlertTriangle className="w-3.5 h-3.5 text-red-600" />;
      text = '누락됨 ❌';
    }

    return (
      <div className={`px-2.5 py-1 rounded-lg border text-xs font-semibold flex items-center gap-1.5 ${colorClass}`}>
        {icon}
        <span>{label}: {text}</span>
      </div>
    );
  };

  return (
    <section className="bg-white rounded-2xl border border-[#E2DBD1] shadow-md overflow-hidden space-y-6 p-5 sm:p-7">
      {/* Step Title & Stamp Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-5 pb-6 border-b border-[#E2DBD1]">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="flex items-center justify-center w-6 h-6 rounded-full bg-[#D64545] text-white text-xs font-bold shadow-xs">
              4
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 font-editorial">
              STEP 4. 빨간펜 첨삭 리포트
            </h2>
          </div>
          <p className="text-sm text-slate-600 max-w-xl">
            {report.headline || '인사담당자 관점에서의 항목별 정밀 진단 결과입니다.'}
          </p>
        </div>

        {/* Score Stamp Badge & Comparison Delta (T2-8) */}
        <div className="flex items-center gap-4 bg-[#FAF8F5] border border-[#E2DBD1] p-3 sm:p-4 rounded-2xl self-start md:self-auto shadow-xs">
          <div className="text-right">
            <span className="block text-[11px] font-bold tracking-wider text-slate-400 uppercase">
              종합 평가 점수
            </span>

            {/* Score Comparison Display (T2-8) */}
            {hasPreviousScore ? (
              <div className="flex items-center gap-1.5 text-xs font-semibold mt-0.5 justify-end">
                <span className="text-slate-400 line-through">이전 {report.previousScore}점</span>
                <span className="text-slate-400">→</span>
                <span className="text-slate-800 font-bold">{report.totalScore}점</span>
                <span
                  className={`inline-flex items-center text-[11px] font-bold px-1.5 py-0.5 rounded-md ${
                    scoreDiff > 0
                      ? 'bg-emerald-100 text-emerald-800'
                      : scoreDiff < 0
                      ? 'bg-red-100 text-red-800'
                      : 'bg-slate-200 text-slate-700'
                  }`}
                >
                  {scoreDiff > 0 ? (
                    <>
                      <TrendingUp className="w-3 h-3 mr-0.5" />
                      ▲{scoreDiff}점
                    </>
                  ) : scoreDiff < 0 ? (
                    <>
                      <TrendingDown className="w-3 h-3 mr-0.5" />
                      ▼{Math.abs(scoreDiff)}점
                    </>
                  ) : (
                    '변동 없음'
                  )}
                </span>
              </div>
            ) : (
              <span className="text-xs text-slate-500">100점 만점 환산</span>
            )}
          </div>

          {/* Stamp Graphic */}
          <div className="w-16 h-16 rounded-2xl border-2 border-[#D64545] text-[#D64545] bg-red-50/50 flex flex-col items-center justify-center rotate-[-4deg] shadow-inner font-mono">
            <span className="text-2xl font-black leading-none">{report.totalScore}</span>
            <span className="text-[10px] font-bold tracking-tighter uppercase font-sans">SCORE</span>
          </div>
        </div>
      </div>

      {/* Prominent Quick Clipboard Copy Banner (Top Level) */}
      {report.card5_polishing?.improvedFullText && (
        <div className="bg-gradient-to-r from-red-50/90 via-[#FAF8F5] to-emerald-50/70 border-2 border-[#D64545]/30 rounded-xl p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-xs">
          <div className="flex items-start sm:items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#D64545] text-white flex items-center justify-center shrink-0 shadow-sm">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h4 className="text-sm font-bold text-slate-900">
                  최종 수정된 자기소개서 완성본
                </h4>
                <span className="text-[11px] font-mono font-semibold px-2 py-0.5 rounded-full bg-white border border-slate-200 text-slate-700">
                  {report.card5_polishing.improvedFullText.length}자
                </span>
              </div>
              <p className="text-xs text-slate-600 mt-0.5">
                STAR 구조, 정량적 성과, AI 상투어 및 맞춤법 교정이 모두 완료된 최종 추천 완성본입니다.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0 self-end sm:self-auto">
            <button
              type="button"
              onClick={() => onApplyImprovedText(report.card5_polishing.improvedFullText)}
              className="px-3 py-2 text-xs font-semibold bg-white hover:bg-slate-50 text-slate-800 border border-slate-300 rounded-xl flex items-center gap-1.5 shadow-2xs transition-all active:scale-[0.98]"
              title="이 완성본을 본문 입력창에 교체 반영합니다"
            >
              <Zap className="w-3.5 h-3.5 text-amber-500" />
              <span>본문창에 반영</span>
            </button>

            <button
              type="button"
              onClick={handleCopyImproved}
              className={`px-4 py-2 text-xs font-bold rounded-xl flex items-center gap-2 shadow-sm transition-all active:scale-[0.98] ${
                copied
                  ? 'bg-emerald-600 text-white shadow-emerald-200'
                  : 'bg-[#D64545] hover:bg-[#B83232] text-white shadow-red-200'
              }`}
              title="최종 수정된 자기소개서 본문을 클립보드에 복사합니다"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4 text-white" />
                  <span>클립보드 복사 완료!</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4 text-white" />
                  <span>클립보드 복사</span>
                </>
              )}
            </button>
          </div>
        </div>
      )}

      {/* Core Strength One-Sentence Summary Card (핵심 강점 요약 카드) */}
      {(() => {
        const strengthText =
          report.coreStrengthSummary ||
          (report.card1_relevance?.strengths && report.card1_relevance.strengths.length > 0
            ? report.card1_relevance.strengths[0]
            : report.card1_relevance?.keyMessage || report.headline);

        if (!strengthText) return null;

        return (
          <div className="relative overflow-hidden rounded-2xl border border-emerald-200 bg-gradient-to-br from-emerald-50/90 via-white to-teal-50/60 p-5 shadow-xs">
            <div className="flex items-start gap-4">
              <div className="w-11 h-11 rounded-xl bg-emerald-600 text-white flex items-center justify-center shrink-0 shadow-md shadow-emerald-200/80">
                <Award className="w-6 h-6" />
              </div>

              <div className="flex-1 space-y-1.5">
                <div className="flex items-center justify-between flex-wrap gap-2">
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-800 bg-emerald-100/90 px-2.5 py-0.5 rounded-full border border-emerald-200/80">
                      💡 핵심 강점 한 문장 요약
                    </span>
                    <span className="text-xs text-slate-500 font-medium">
                      인사담당자가 꼽은 최고의 차별점
                    </span>
                  </div>

                  <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-md flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    서류 합격 핵심 경쟁력
                  </span>
                </div>

                {/* One-Sentence Summary Statement */}
                <p className="text-sm sm:text-base font-bold text-slate-900 leading-snug font-editorial pt-0.5">
                  “{strengthText}”
                </p>

                <p className="text-[11px] text-slate-500">
                  ※ 지원자의 자기소개서에서 면접관의 시선을 가장 강하게 사로잡는 대표적인 핵심 역량입니다.
                </p>
              </div>
            </div>
          </div>
        );
      })()}

      {/* 5 Distinct Editorial Review Cards */}
      <div className="space-y-4">
        {/* ========================================================= */}
        {/* CARD 1: 문항 적합도 및 핵심 메시지 분석 */}
        {/* ========================================================= */}
        <div className="rounded-xl border border-slate-200 bg-white shadow-xs overflow-hidden">
          <div
            onClick={() => toggleCard('card1')}
            className="px-5 py-3.5 bg-slate-50/70 border-b border-slate-200 flex items-center justify-between cursor-pointer hover:bg-slate-100/60 transition-colors"
          >
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-lg bg-blue-100 text-blue-800 flex items-center justify-center font-bold text-xs">
                1
              </div>
              <div>
                <h3 className="text-sm font-bold text-slate-900">
                  문항 적합도 및 핵심 메시지 분석
                </h3>
                <span className="text-xs text-slate-500">
                  질문 의도 부합 점수: <strong className="text-blue-700 font-mono">{report.card1_relevance.score}점</strong>
                </span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold px-2 py-0.5 rounded-md bg-blue-50 text-blue-700 border border-blue-200">
                두괄식 {report.card1_relevance.leadInFormat ? '적용됨 ✅' : '미흡 ⚠️'}
              </span>
              {expandedCards.card1 ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
            </div>
          </div>

          {expandedCards.card1 && (
            <div className="p-5 space-y-4 text-xs">
              <div className="bg-blue-50/60 border border-blue-100 p-3.5 rounded-xl">
                <span className="font-bold text-blue-900 block mb-1">
                  도출된 핵심 메시지 (Key Message)
                </span>
                <p className="text-slate-800 font-medium text-sm">
                  "{report.card1_relevance.keyMessage}"
                </p>
                <p className="text-slate-600 mt-1.5 leading-relaxed">
                  {report.card1_relevance.fitAssessment}
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="p-3 bg-emerald-50/50 border border-emerald-200/60 rounded-xl">
                  <span className="font-bold text-emerald-800 flex items-center gap-1 mb-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    잘된 점 (Strengths)
                  </span>
                  <ul className="space-y-1.5 text-slate-700 list-disc list-inside">
                    {report.card1_relevance.strengths.map((str, idx) => (
                      <li key={idx}><span>{str}</span></li>
                    ))}
                  </ul>
                </div>

                <div className="p-3 bg-amber-50/50 border border-amber-200/60 rounded-xl">
                  <span className="font-bold text-amber-800 flex items-center gap-1 mb-2">
                    <AlertTriangle className="w-3.5 h-3.5 text-amber-600" />
                    보완할 점 (Improvements)
                  </span>
                  <ul className="space-y-1.5 text-slate-700 list-disc list-inside">
                    {report.card1_relevance.improvements.map((imp, idx) => (
                      <li key={idx}><span>{imp}</span></li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* ========================================================= */}
        {/* CARD 2: STAR 구조 및 구체성 검증 (T3-2) */}
        {/* ========================================================= */}
        <div className="rounded-xl border border-slate-200 bg-white shadow-xs overflow-hidden">
          <div
            onClick={() => toggleCard('card2')}
            className="px-5 py-3.5 bg-slate-50/70 border-b border-slate-200 flex items-center justify-between cursor-pointer hover:bg-slate-100/60 transition-colors"
          >
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold text-xs">
                2
              </div>
              <div>
                <h3 className="text-sm font-bold text-slate-900">
                  STAR 구조 및 구체성 검증
                </h3>
                <span className="text-xs text-slate-500">
                  Situation · Task · Action · Result 단계별 충실도
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              {report.card2_star.result.status === 'WARN' && (
                <span className="text-xs font-bold px-2 py-0.5 rounded-md bg-amber-100 text-amber-900 border border-amber-300 animate-pulse">
                  ⚠️ Result(결과) 수치 보완 필요
                </span>
              )}
              {expandedCards.card2 ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
            </div>
          </div>

          {expandedCards.card2 && (
            <div className="p-5 space-y-4 text-xs">
              {/* STAR 4 Badges & Details */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
                {/* Situation */}
                <div className="p-3.5 rounded-xl border border-slate-200 bg-slate-50/50 space-y-2">
                  {renderStarBadge(report.card2_star.situation.status, 'S (상황)')}
                  <p className="text-slate-600 leading-relaxed">
                    {report.card2_star.situation.comment}
                  </p>
                </div>

                {/* Task */}
                <div className="p-3.5 rounded-xl border border-slate-200 bg-slate-50/50 space-y-2">
                  {renderStarBadge(report.card2_star.task.status, 'T (과제)')}
                  <p className="text-slate-600 leading-relaxed">
                    {report.card2_star.task.comment}
                  </p>
                </div>

                {/* Action */}
                <div className="p-3.5 rounded-xl border border-slate-200 bg-slate-50/50 space-y-2">
                  {renderStarBadge(report.card2_star.action.status, 'A (행동)')}
                  <p className="text-slate-600 leading-relaxed">
                    {report.card2_star.action.comment}
                  </p>
                </div>

                {/* Result */}
                <div
                  className={`p-3.5 rounded-xl border space-y-2 ${
                    report.card2_star.result.status === 'WARN'
                      ? 'border-amber-300 bg-amber-50/40'
                      : 'border-slate-200 bg-slate-50/50'
                  }`}
                >
                  {renderStarBadge(report.card2_star.result.status, 'R (결과)')}
                  <p className="text-slate-700 leading-relaxed">
                    {report.card2_star.result.comment}
                  </p>
                </div>
              </div>

              {/* STAR Comprehensive Advice */}
              <div className="bg-[#FAF8F5] border border-[#E2DBD1] p-3.5 rounded-xl flex items-start gap-2.5">
                <Award className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-slate-800 block mb-0.5">STAR 개선 총평</span>
                  <p className="text-slate-600 leading-relaxed">
                    {report.card2_star.starAdvice}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* ========================================================= */}
        {/* CARD 3: 숫자/정량적 데이터 분석 & 보완 코칭 질문 (T3-3) */}
        {/* ========================================================= */}
        <div className="rounded-xl border border-slate-200 bg-white shadow-xs overflow-hidden">
          <div
            onClick={() => toggleCard('card3')}
            className="px-5 py-3.5 bg-slate-50/70 border-b border-slate-200 flex items-center justify-between cursor-pointer hover:bg-slate-100/60 transition-colors"
          >
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-lg bg-purple-100 text-purple-800 flex items-center justify-center font-bold text-xs">
                3
              </div>
              <div>
                <h3 className="text-sm font-bold text-slate-900">
                  숫자 및 정량적 데이터 분석 & 보완 질문
                </h3>
                <span className="text-xs text-slate-500">
                  AI가 수치를 지어내지 않고, 지원자에게 수치 보완 질문을 던집니다 (T3-3)
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span
                className={`text-xs font-semibold px-2 py-0.5 rounded-md ${
                  report.card3_quantQuestions.status === 'SUFFICIENT'
                    ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                    : 'bg-amber-50 text-amber-800 border border-amber-200'
                }`}
              >
                {report.card3_quantQuestions.status === 'SUFFICIENT' ? '수치 풍부 ✅' : '수치 보완 권장 💡'}
              </span>
              {expandedCards.card3 ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
            </div>
          </div>

          {expandedCards.card3 && (
            <div className="p-5 space-y-4 text-xs">
              {/* Existing Numbers Identified */}
              <div>
                <span className="font-bold text-slate-700 block mb-1.5">
                  현재 본문에 식별된 정량 수치 ({report.card3_quantQuestions.currentNumbers.length}개):
                </span>
                {report.card3_quantQuestions.currentNumbers.length > 0 ? (
                  <div className="flex items-center gap-1.5 flex-wrap">
                    {report.card3_quantQuestions.currentNumbers.map((num, idx) => (
                      <span
                        key={idx}
                        className="px-2.5 py-1 bg-purple-50 text-purple-700 border border-purple-200 rounded-md font-mono font-semibold"
                      >
                        {num}
                      </span>
                    ))}
                  </div>
                ) : (
                  <p className="text-slate-500 italic bg-slate-50 p-2.5 rounded-lg border border-slate-200">
                    본문에 구체적인 숫자(기간, 팀원 수, 성능 수치, 비율 등)가 하나도 없습니다. 아래 질문을 참고해 숫자를 채워보세요.
                  </p>
                )}
              </div>

              {/* Probing Coaching Questions (NEVER make up fake numbers) */}
              <div className="bg-purple-50/50 border border-purple-200/70 p-4 rounded-xl space-y-2">
                <span className="font-bold text-purple-900 flex items-center gap-1.5">
                  <HelpCircle className="w-4 h-4 text-purple-600" />
                  지원자 맞춤형 정량 수치 발굴 질문 (본인의 실제 경험에서 채워넣으세요):
                </span>
                <ul className="space-y-2">
                  {report.card3_quantQuestions.coachingQuestions.map((q, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-slate-800 bg-white p-2.5 rounded-lg border border-purple-100 shadow-2xs">
                      <span className="font-bold text-purple-600 shrink-0">Q{idx + 1}.</span>
                      <span className="leading-relaxed font-medium">{q}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </div>

        {/* ========================================================= */}
        {/* CARD 4: AI 티 검증 및 클리셰(상투적 표현) 교정 (T1-6, T3-5) */}
        {/* ========================================================= */}
        <div className="rounded-xl border border-slate-200 bg-white shadow-xs overflow-hidden">
          <div
            onClick={() => toggleCard('card4')}
            className="px-5 py-3.5 bg-slate-50/70 border-b border-slate-200 flex items-center justify-between cursor-pointer hover:bg-slate-100/60 transition-colors"
          >
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-lg bg-red-100 text-[#D64545] flex items-center justify-center font-bold text-xs">
                4
              </div>
              <div>
                <h3 className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
                  <span>AI 티 검증 및 클리셰(상투적 표현) 교정</span>
                  <span className="text-xs text-[#D64545] font-semibold hidden sm:inline">
                    (빨간 물결 밑줄 교정)
                  </span>
                </h3>
                <span className="text-xs text-slate-500">
                  발견된 문제 표현: <strong className="text-[#D64545] font-mono">{report.card4_aiClicheCheck.clichesFoundCount}개</strong>
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              {report.card4_aiClicheCheck.clichesFoundCount > 0 ? (
                <span className="text-xs font-bold px-2 py-0.5 rounded-md bg-red-100 text-[#D64545] border border-red-200">
                  교정 권장 {report.card4_aiClicheCheck.clichesFoundCount}건
                </span>
              ) : (
                <span className="text-xs font-bold px-2 py-0.5 rounded-md bg-emerald-100 text-emerald-800 border border-emerald-200">
                  클리셰 없음 클린 ✅
                </span>
              )}
              {expandedCards.card4 ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
            </div>
          </div>

          {expandedCards.card4 && (
            <div className="p-5 space-y-4 text-xs">
              {report.card4_aiClicheCheck.detections.length === 0 ? (
                <div className="text-center py-6 bg-emerald-50/50 rounded-xl border border-emerald-200 text-emerald-900">
                  <CheckCircle2 className="w-7 h-7 text-emerald-600 mx-auto mb-2" />
                  <p className="font-bold text-sm">상투적인 표현이나 AI 번역투가 발견되지 않았습니다!</p>
                  <p className="text-xs text-emerald-700 mt-1">자연스럽고 지원자의 개성이 담긴 문장입니다.</p>
                </div>
              ) : (
                <div className="space-y-3.5">
                  <p className="text-slate-600 leading-relaxed">
                    서류 검토관들이 가장 기피하는 <strong>무색무취의 AI 상투어('다각도로 분석하여', '시너지 창출' 등)</strong>를 잡아내었습니다. 아래 빨간 밑줄 문장과 구체적 대안을 확인하세요.
                  </p>

                  {/* Wavy Underline Detections List (Strict T1-6 & T3-5) */}
                  {report.card4_aiClicheCheck.detections.map((item, idx) => (
                    <div
                      key={idx}
                      className="border border-red-200 bg-red-50/30 rounded-xl p-4 space-y-3 hover:border-red-300 transition-colors"
                    >
                      {/* Problem Sentence with Wavy Underline */}
                      <div>
                        <span className="text-[11px] font-bold text-[#D64545] flex items-center gap-1 mb-1">
                          <ShieldAlert className="w-3.5 h-3.5" />
                          원문 문제 문장:
                        </span>
                        <div className="p-3 bg-white border border-red-200/80 rounded-lg text-slate-900 font-medium leading-relaxed">
                          <span className="red-wavy text-slate-900">
                            "{item.originalSentence}"
                          </span>
                        </div>
                      </div>

                      {/* Issue explanation */}
                      <div className="text-red-700 pl-1 font-medium">
                        ⚠️ <strong>문제점:</strong> {item.issue}
                      </div>

                      {/* Actionable Suggestion */}
                      <div className="bg-emerald-50/80 border border-emerald-200/80 p-3 rounded-lg text-emerald-950">
                        <span className="font-bold text-emerald-800 flex items-center gap-1 mb-1">
                          <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
                          구체적 사실 중심 수정 대안 (추천):
                        </span>
                        <p className="font-medium text-slate-900 leading-relaxed">
                          "{item.suggestion}"
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>

        {/* ========================================================= */}
        {/* CARD 5: 문장 다듬기 & 맞춤법 / 글자 수 최적화 제안 (T3-4) */}
        {/* ========================================================= */}
        <div className="rounded-xl border border-slate-200 bg-white shadow-xs overflow-hidden">
          <div
            onClick={() => toggleCard('card5')}
            className="px-5 py-3.5 bg-slate-50/70 border-b border-slate-200 flex items-center justify-between cursor-pointer hover:bg-slate-100/60 transition-colors"
          >
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-lg bg-amber-100 text-amber-800 flex items-center justify-center font-bold text-xs">
                5
              </div>
              <div>
                <h3 className="text-sm font-bold text-slate-900">
                  문장 다듬기 & 맞춤법 · 글자 수 최적화 제안
                </h3>
                <span className="text-xs text-slate-500">
                  사족 문장 축약 가이드 및 최종 추천 완성본
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold px-2 py-0.5 rounded-md bg-slate-100 text-slate-700">
                수정본 바로 복사 가능
              </span>
              {expandedCards.card5 ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
            </div>
          </div>

          {expandedCards.card5 && (
            <div className="p-5 space-y-4 text-xs">
              {/* Character Count Advice (T3-4) */}
              <div className="p-3.5 bg-[#FAF8F5] border border-[#E2DBD1] rounded-xl flex items-start gap-2.5">
                <Scissors className="w-4 h-4 text-[#D64545] shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-slate-800 block mb-0.5">글자 수 및 분량 진단</span>
                  <p className="text-slate-600 leading-relaxed">
                    {report.card5_polishing.charCountAdvice}
                  </p>
                </div>
              </div>

              {/* Unnecessary Sentences to Trim */}
              {report.card5_polishing.unnecessarySentences.length > 0 && (
                <div>
                  <span className="font-bold text-slate-800 block mb-2 flex items-center gap-1.5">
                    <Scissors className="w-3.5 h-3.5 text-amber-600" />
                    글자 수 다이어트를 위해 삭제를 권장하는 사족 문장:
                  </span>
                  <div className="space-y-1.5">
                    {report.card5_polishing.unnecessarySentences.map((s, idx) => (
                      <div key={idx} className="p-2.5 bg-amber-50/60 border border-amber-200/70 rounded-lg text-slate-700">
                        • {s}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Spelling & Grammar Corrections */}
              {report.card5_polishing.spellingAndGrammar.length > 0 && (
                <div>
                  <span className="font-bold text-slate-800 block mb-2 flex items-center gap-1.5">
                    <FileCheck className="w-3.5 h-3.5 text-emerald-600" />
                    맞춤법 및 띄어쓰기 교정 ({report.card5_polishing.spellingAndGrammar.length}건):
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {report.card5_polishing.spellingAndGrammar.map((item, idx) => (
                      <div key={idx} className="p-2.5 bg-slate-50 border border-slate-200 rounded-lg flex items-center justify-between gap-2">
                        <div>
                          <span className="text-red-600 line-through mr-1.5">{item.before}</span>
                          <span className="text-slate-400">→</span>
                          <span className="text-emerald-700 font-bold ml-1.5">{item.after}</span>
                        </div>
                        <span className="text-[10px] text-slate-400">{item.reason}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Polished Full Text (With 1-click Copy & Apply) */}
              {report.card5_polishing.improvedFullText && (
                <div className="mt-4 pt-4 border-t border-slate-200 space-y-2">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-slate-900 text-sm flex items-center gap-1.5">
                        <Sparkles className="w-4 h-4 text-[#D64545]" />
                        전문가 추천 최종 교정 완성본
                      </span>
                      <span className="text-[11px] font-mono px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 border border-slate-200">
                        {report.card5_polishing.improvedFullText.length}자
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => onApplyImprovedText(report.card5_polishing.improvedFullText)}
                        className="px-3 py-1.5 text-xs font-semibold bg-slate-800 text-white rounded-lg hover:bg-slate-700 flex items-center gap-1.5 transition-colors shadow-2xs"
                        title="이 완성본을 본문 입력창에 교체 반영합니다"
                      >
                        <Zap className="w-3.5 h-3.5 text-amber-300" />
                        <span>본문창에 반영</span>
                      </button>

                      <button
                        type="button"
                        onClick={handleCopyImproved}
                        className={`px-3 py-1.5 text-xs font-bold rounded-lg flex items-center gap-1.5 transition-colors shadow-xs ${
                          copied
                            ? 'bg-emerald-600 text-white'
                            : 'bg-[#D64545] hover:bg-[#B83232] text-white shadow-red-200'
                        }`}
                        title="최종 수정된 자기소개서 본문을 클립보드에 복사합니다"
                      >
                        {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                        <span>{copied ? '복사 완료!' : '클립보드 복사'}</span>
                      </button>
                    </div>
                  </div>

                  <div className="relative group">
                    <div className="p-4 bg-[#FAF8F5] border border-[#E2DBD1] rounded-xl text-slate-800 font-sans whitespace-pre-wrap leading-relaxed max-h-72 overflow-y-auto">
                      {report.card5_polishing.improvedFullText}
                    </div>
                    {/* Quick Floating Copy Button in Text Box */}
                    <button
                      type="button"
                      onClick={handleCopyImproved}
                      className="absolute top-2.5 right-2.5 opacity-80 group-hover:opacity-100 bg-white/90 hover:bg-white text-slate-700 border border-slate-200 px-2 py-1 rounded-md text-[11px] font-medium shadow-xs flex items-center gap-1 transition-all"
                    >
                      {copied ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3 text-slate-500" />}
                      <span>{copied ? '복사됨' : '복사'}</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
