import React, { useState, useEffect, useRef } from 'react';
import { Header } from './components/Header.tsx';
import { Step1Form } from './components/Step1Form.tsx';
import { Step2CompanyAnalysis } from './components/Step2CompanyAnalysis.tsx';
import { Step3ActionBar } from './components/Step3ActionBar.tsx';
import { Step4ReviewReport } from './components/Step4ReviewReport.tsx';
import { ChecklistModal } from './components/ChecklistModal.tsx';
import { ScoreHistoryDrawer } from './components/ScoreHistoryDrawer.tsx';
import { FormData, CompanyAnalysis, ReviewReport, ReviewHistoryItem } from './types/index.ts';
import {
  DEFAULT_MOCK_ANALYSIS,
  DEFAULT_MOCK_REPORT,
  SAMPLE_PRESETS,
} from './data/mockData.ts';
import { History, CheckSquare, Sparkles, BookOpen } from 'lucide-react';

export default function App() {
  // Mode: Real AI vs Demo (Fake Data)
  const [useRealAi, setUseRealAi] = useState<boolean>(true);
  const [hasApiKey, setHasApiKey] = useState<boolean>(true);

  // Form State
  const [formData, setFormData] = useState<FormData>(() => {
    // Initial default with Preset 1 (STAR R 수치 누락형) for immediate rich experience
    const initialPreset = SAMPLE_PRESETS[0];
    return { ...initialPreset.data };
  });

  // Step 2: Company Analysis State
  const [companyAnalysis, setCompanyAnalysis] = useState<CompanyAnalysis | null>(null);
  const [isCompanyLoading, setIsCompanyLoading] = useState<boolean>(false);
  const [isCompanyOpen, setIsCompanyOpen] = useState<boolean>(false);
  const [companyError, setCompanyError] = useState<string | null>(null);

  // Step 4: Review Report State
  const [reviewReport, setReviewReport] = useState<ReviewReport | null>(null);
  const [isReviewLoading, setIsReviewLoading] = useState<boolean>(false);
  const [reviewError, setReviewError] = useState<string | null>(null);

  // Score History (for Re-review comparison T2-8)
  const [history, setHistory] = useState<ReviewHistoryItem[]>(() => {
    try {
      const saved = localStorage.getItem('coach_review_history');
      if (saved) return JSON.parse(saved);
    } catch (e) {}
    return [];
  });

  // Modals
  const [isChecklistOpen, setIsChecklistOpen] = useState<boolean>(false);
  const [isHistoryOpen, setIsHistoryOpen] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const reportRef = useRef<HTMLDivElement>(null);

  // Check backend health & API key availability on mount
  useEffect(() => {
    fetch('/api/health')
      .then((res) => res.json())
      .then((data) => {
        setHasApiKey(data.hasApiKey);
        if (!data.hasApiKey) {
          // If no API key injected yet, default to Demo mode gracefully
          setUseRealAi(false);
        }
      })
      .catch(() => {
        // Fallback to Demo mode if backend isn't responding
        setUseRealAi(false);
      });
  }, []);

  // Save history to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('coach_review_history', JSON.stringify(history));
    } catch (e) {}
  }, [history]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handleFieldChange = (field: keyof FormData, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  // Load Preset (T3 Testing)
  const handleLoadPreset = (presetId: string) => {
    const preset = SAMPLE_PRESETS.find((p) => p.id === presetId);
    if (!preset) return;

    setFormData({ ...preset.data });
    setCompanyError(null);
    setReviewError(null);

    if (!useRealAi) {
      // In Demo mode, populate corresponding fake data directly
      setCompanyAnalysis(preset.mockCompanyAnalysis);
      setReviewReport(preset.mockReviewReport);
      setIsCompanyOpen(true);
    } else {
      // In AI mode, reset reports so user can test real AI execution
      setCompanyAnalysis(null);
      setReviewReport(null);
      setIsCompanyOpen(false);
    }

    showToast(`'${preset.label}' 샘플이 입력창에 로드되었습니다.`);
  };

  // Reset all
  const handleReset = () => {
    if (confirm('모든 입력 내용을 초기화하시겠습니까?')) {
      setFormData({
        companyName: '',
        jobTitle: '',
        questionType: '지원동기',
        questionText: '',
        maxChars: 800,
        includeSpaces: true,
        coverLetterText: '',
      });
      setCompanyAnalysis(null);
      setReviewReport(null);
      setCompanyError(null);
      setReviewError(null);
      setIsCompanyOpen(false);
      showToast('입력 내용이 초기화되었습니다.');
    }
  };

  // Step 2: Run Company Analysis (Google Search Grounding)
  const handleRunCompanyAnalysis = async () => {
    if (!formData.companyName.trim()) {
      alert('기업명을 입력해주세요.');
      return;
    }

    setIsCompanyLoading(true);
    setCompanyError(null);
    setIsCompanyOpen(true);

    if (!useRealAi) {
      // Phase 1 Demo mode: use mock analysis
      setTimeout(() => {
        const found = SAMPLE_PRESETS.find(
          (p) => p.data.companyName.toLowerCase() === formData.companyName.trim().toLowerCase()
        );
        const result = found ? found.mockCompanyAnalysis : {
          ...DEFAULT_MOCK_ANALYSIS,
          companyName: formData.companyName,
          jobTitle: formData.jobTitle || '일반 직무',
        };
        setCompanyAnalysis(result);
        setIsCompanyLoading(false);
        showToast(`'${formData.companyName}' 기업분석(예시 데이터) 완료`);
      }, 700);
      return;
    }

    // Phase 2: Real Gemini AI with Google Search Grounding
    try {
      const res = await fetch('/api/analyze-company', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          companyName: formData.companyName,
          jobTitle: formData.jobTitle,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || '기업분석에 실패했습니다.');
      }

      setCompanyAnalysis(data);
      showToast(`'${formData.companyName}' Google Search 기업분석 완료!`);
    } catch (err: any) {
      console.error(err);
      setCompanyError(err.message || '기업 정보를 불러오지 못했습니다.');
    } finally {
      setIsCompanyLoading(false);
    }
  };

  // Step 3: Start Cover Letter Review (Strict Criteria & 5 Cards)
  const handleStartReview = async () => {
    // Validation (T3-8)
    if (!formData.companyName.trim() || !formData.jobTitle.trim() || !formData.coverLetterText.trim()) {
      alert('기업명, 지원 직무, 자기소개서 본문을 모두 입력해주세요. (T3-8)');
      return;
    }

    // Abuse check (T2-9)
    if (formData.coverLetterText.length > 3000) {
      alert('자기소개서 본문은 3,000자 이내로 입력해주세요. (T2-9)');
      return;
    }

    setIsReviewLoading(true);
    setReviewError(null);

    const previousScore = history.length > 0 ? history[0].score : undefined;

    if (!useRealAi) {
      // Phase 1 Demo mode: Simulated analysis with rich structured mock data
      setTimeout(() => {
        // Find matching preset or use default
        const found = SAMPLE_PRESETS.find(
          (p) => p.data.companyName.toLowerCase() === formData.companyName.trim().toLowerCase()
        );
        const report = found ? { ...found.mockReviewReport } : { ...DEFAULT_MOCK_REPORT };

        if (previousScore !== undefined) {
          report.previousScore = previousScore;
        }

        setReviewReport(report);
        setIsReviewLoading(false);

        // Record history
        const newHistoryItem: ReviewHistoryItem = {
          id: String(Date.now()),
          timestamp: Date.now(),
          score: report.totalScore,
          companyName: formData.companyName,
          jobTitle: formData.jobTitle,
          questionType: formData.questionType,
          charCount: formData.coverLetterText.length,
          coverLetterText: formData.coverLetterText,
          report: report,
        };
        setHistory((prev) => [newHistoryItem, ...prev]);

        showToast('첨삭 리포트가 완성되었습니다! (예시 데이터)');
        setTimeout(() => {
          reportRef.current?.scrollIntoView({ behavior: 'smooth' });
        }, 150);
      }, 1200);
      return;
    }

    // Phase 2: Real Gemini AI Full-Stack API call
    try {
      const res = await fetch('/api/review-cover-letter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          companyName: formData.companyName,
          jobTitle: formData.jobTitle,
          questionType: formData.questionType,
          questionText: formData.questionText,
          maxChars: formData.maxChars,
          includeSpaces: formData.includeSpaces,
          coverLetterText: formData.coverLetterText,
          companyAnalysis: companyAnalysis,
          previousScore: previousScore,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || '자기소개서 첨삭 중 오류가 발생했습니다.');
      }

      setReviewReport(data);

      // Record history
      const newHistoryItem: ReviewHistoryItem = {
        id: String(Date.now()),
        timestamp: Date.now(),
        score: data.totalScore,
        companyName: formData.companyName,
        jobTitle: formData.jobTitle,
        questionType: formData.questionType,
        charCount: formData.coverLetterText.length,
        coverLetterText: formData.coverLetterText,
        report: data,
      };
      setHistory((prev) => [newHistoryItem, ...prev]);

      showToast('AI 빨간펜 첨삭 리포트가 생성되었습니다!');
      setTimeout(() => {
        reportRef.current?.scrollIntoView({ behavior: 'smooth' });
      }, 150);
    } catch (err: any) {
      console.error(err);
      setReviewError(err.message || '인터넷 연결을 확인하고 다시 시도해주세요.');
    } finally {
      setIsReviewLoading(false);
    }
  };

  // Apply improved text from Card 5 back into textarea
  const handleApplyImprovedText = (text: string) => {
    setFormData((prev) => ({ ...prev, coverLetterText: text }));
    showToast('전문가 추천 완성본이 본문 입력창에 반영되었습니다!');
    window.scrollTo({ top: 180, behavior: 'smooth' });
  };

  // Inspect past history item
  const handleSelectHistoryItem = (item: ReviewHistoryItem) => {
    setReviewReport(item.report);
    setFormData((prev) => ({
      ...prev,
      companyName: item.companyName,
      jobTitle: item.jobTitle,
      questionType: item.questionType,
      coverLetterText: item.coverLetterText,
    }));
    setIsHistoryOpen(false);
    showToast(`${item.score}점 첨삭 기록을 불러왔습니다.`);
    setTimeout(() => {
      reportRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  const countWithSpaces = formData.coverLetterText.length;
  const countWithoutSpaces = formData.coverLetterText.replace(/\s/g, '').length;
  const currentCount = formData.includeSpaces ? countWithSpaces : countWithoutSpaces;
  const isOverLimit = formData.maxChars > 0 && currentCount > formData.maxChars;
  const isOverAbuseLimit = countWithSpaces > 3000;
  const hasInput =
    formData.companyName.trim().length > 0 &&
    formData.jobTitle.trim().length > 0 &&
    formData.coverLetterText.trim().length > 0;

  return (
    <div className="min-h-screen bg-[#FAF8F5] notebook-grid flex flex-col font-sans">
      {/* Header */}
      <Header
        useRealAi={useRealAi}
        onToggleAiMode={(mode) => setUseRealAi(mode)}
        onReset={handleReset}
        onOpenChecklist={() => setIsChecklistOpen(true)}
        hasApiKey={hasApiKey}
      />

      {/* Main Container */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 py-6 sm:py-8 space-y-6 flex-1 w-full">
        {/* Editorial Sub-banner / Desk Theme */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white/70 backdrop-blur-xs p-4 rounded-2xl border border-[#E2DBD1] shadow-2xs">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-red-50 text-[#D64545] border border-red-200 flex items-center justify-center shrink-0">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs font-bold text-slate-800">
                합격 자기소개서 첨삭 데스크 (Proofreading Desk)
              </p>
              <p className="text-[11px] text-slate-500">
                1단계 정보입력 → 2단계 기업분석 → 3단계 첨삭실행 → 4단계 5대 카드 피드백
              </p>
            </div>
          </div>

          {/* History drawer button */}
          <div className="flex items-center gap-2 self-end sm:self-auto">
            <button
              type="button"
              onClick={() => setIsHistoryOpen(true)}
              className="text-xs font-semibold text-slate-700 bg-white hover:bg-slate-50 border border-[#E2DBD1] px-3 py-1.5 rounded-lg flex items-center gap-1.5 shadow-2xs transition-colors"
            >
              <History className="w-3.5 h-3.5 text-slate-500" />
              <span>점수 기록 ({history.length}회)</span>
            </button>
          </div>
        </div>

        {/* STEP 1: Input Form */}
        <Step1Form
          formData={formData}
          onChange={handleFieldChange}
          onLoadPreset={handleLoadPreset}
        />

        {/* STEP 2: Company Analysis */}
        <Step2CompanyAnalysis
          companyName={formData.companyName}
          jobTitle={formData.jobTitle}
          analysis={companyAnalysis}
          isLoading={isCompanyLoading}
          isOpen={isCompanyOpen}
          onToggleOpen={() => setIsCompanyOpen(!isCompanyOpen)}
          onRunAnalysis={handleRunCompanyAnalysis}
          error={companyError}
        />

        {/* STEP 3: Action Execution Bar */}
        <Step3ActionBar
          onStartReview={handleStartReview}
          isLoading={isReviewLoading}
          hasCompanyAnalysis={!!companyAnalysis}
          charCount={currentCount}
          isOverLimit={isOverLimit}
          isOverAbuseLimit={isOverAbuseLimit}
          hasInput={hasInput}
          error={reviewError}
          onRetry={handleStartReview}
        />

        {/* STEP 4: Review Report Cards (5 Cards) */}
        <div ref={reportRef}>
          {reviewReport && (
            <Step4ReviewReport
              report={reviewReport}
              onApplyImprovedText={handleApplyImprovedText}
            />
          )}
        </div>
      </main>

      {/* Floating Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white text-xs font-medium px-4 py-2.5 rounded-xl shadow-xl flex items-center gap-2 animate-in fade-in slide-in-from-bottom-2 duration-200">
          <Sparkles className="w-4 h-4 text-amber-400 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Checklist Modal */}
      <ChecklistModal
        isOpen={isChecklistOpen}
        onClose={() => setIsChecklistOpen(false)}
      />

      {/* Score History Drawer */}
      <ScoreHistoryDrawer
        isOpen={isHistoryOpen}
        onClose={() => setIsHistoryOpen(false)}
        history={history}
        onSelectHistoryItem={handleSelectHistoryItem}
      />

      {/* Footer */}
      <footer className="border-t border-[#E2DBD1] py-5 text-center text-xs text-slate-500 bg-[#FAF8F5]/80">
        <div className="max-w-4xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <span>자소서 첨삭 코치 · 대기업·공기업 채용 전문 빨간펜 솔루션</span>
          <span className="text-[11px] text-slate-400">
            개인정보 및 자기소개서 본문은 영구 저장되지 않으며 첨삭 완료 후 즉시 파기됩니다 (T5-6).
          </span>
        </div>
      </footer>
    </div>
  );
}
