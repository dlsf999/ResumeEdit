import React from 'react';
import { FormData, QuestionType } from '../types/index.ts';
import { SAMPLE_PRESETS, QUESTION_TYPE_DESCRIPTIONS } from '../data/mockData.ts';
import { BookOpen, Copy, Trash2, HelpCircle, AlertCircle, Sparkles, Check } from 'lucide-react';

interface Step1FormProps {
  formData: FormData;
  onChange: (field: keyof FormData, value: any) => void;
  onLoadPreset: (presetId: string) => void;
}

const QUESTION_TYPES: QuestionType[] = [
  '지원동기',
  '직무역량 / 전문성',
  '성공 / 성취 경험 (STAR)',
  '실패 / 극복 / 위기 경험',
  '갈등 해결 / 협업 / 팀워크',
  '입사 후 포부 / 커리어 플랜',
  '성장 과정 / 가치관',
];

const PRESET_LIMITS = [500, 700, 800, 1000, 1500];

export const Step1Form: React.FC<Step1FormProps> = ({
  formData,
  onChange,
  onLoadPreset,
}) => {
  const [copied, setCopied] = React.useState(false);

  // Exact real-time character calculation in code
  const countWithSpaces = formData.coverLetterText.length;
  const countWithoutSpaces = formData.coverLetterText.replace(/\s/g, '').length;
  const currentCount = formData.includeSpaces ? countWithSpaces : countWithoutSpaces;

  const isOverLimit = formData.maxChars > 0 && currentCount > formData.maxChars;
  const isOverAbuseLimit = countWithSpaces > 3000;
  const charDifference = currentCount - formData.maxChars;

  const handleCopy = async () => {
    if (!formData.coverLetterText) return;
    await navigator.clipboard.writeText(formData.coverLetterText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleClear = () => {
    if (confirm('자기소개서 본문을 지우시겠습니까?')) {
      onChange('coverLetterText', '');
    }
  };

  return (
    <section className="bg-white rounded-2xl border border-[#E2DBD1] shadow-xs overflow-hidden">
      {/* Step Header */}
      <div className="bg-[#FAF8F5] border-b border-[#E2DBD1] px-5 py-3.5 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <span className="flex items-center justify-center w-6 h-6 rounded-full bg-[#1F2937] text-white text-xs font-bold">
            1
          </span>
          <h2 className="text-base font-bold text-slate-900 font-editorial">
            STEP 1. 지원 정보 & 자기소개서 입력
          </h2>
          <span className="text-xs text-slate-500 hidden md:inline">
            첨삭받을 문항과 본문을 기입하세요.
          </span>
        </div>

        {/* Quick Sample Presets */}
        <div className="flex items-center gap-1.5 flex-wrap">
          <span className="text-[11px] font-medium text-slate-500 flex items-center gap-1">
            <Sparkles className="w-3 h-3 text-amber-500" />
            테스트 샘플:
          </span>
          {SAMPLE_PRESETS.map((preset) => (
            <button
              key={preset.id}
              type="button"
              onClick={() => onLoadPreset(preset.id)}
              className="text-xs bg-white hover:bg-slate-50 hover:border-slate-300 text-slate-700 px-2 py-1 rounded-md border border-[#E2DBD1] transition-colors"
              title={`${preset.description} (${preset.badge})`}
            >
              {preset.label.split(' ')[0]}
              <span className="text-[10px] text-[#D64545] font-semibold ml-1">
                {preset.badge.replace(' 테스트', '')}
              </span>
            </button>
          ))}
        </div>
      </div>

      <div className="p-5 sm:p-6 space-y-5">
        {/* Row 1: Company Name & Job Title */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5 flex items-center gap-1">
              <span>기업명</span>
              <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={formData.companyName}
              onChange={(e) => onChange('companyName', e.target.value)}
              placeholder="예: 삼성전자, 네이버, 현대자동차, 국민은행"
              className="w-full px-3.5 py-2 text-sm bg-slate-50/50 border border-slate-300 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-[#D64545]/20 focus:border-[#D64545] transition-all"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5 flex items-center gap-1">
              <span>지원 직무</span>
              <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={formData.jobTitle}
              onChange={(e) => onChange('jobTitle', e.target.value)}
              placeholder="예: 백엔드 개발자, 서비스 기획, 마케팅, 재무"
              className="w-full px-3.5 py-2 text-sm bg-slate-50/50 border border-slate-300 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-[#D64545]/20 focus:border-[#D64545] transition-all"
            />
          </div>
        </div>

        {/* Row 2: Question Type (7 Choices) */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="text-xs font-bold text-slate-700 flex items-center gap-1">
              <span>문항 종류 (7개 핵심 유형)</span>
              <span className="text-red-500">*</span>
            </label>
            <span className="text-[11px] text-slate-500">
              유형별 특화된 평가 기준이 적용됩니다
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-1.5">
            {QUESTION_TYPES.map((type) => {
              const isSelected = formData.questionType === type;
              return (
                <button
                  key={type}
                  type="button"
                  onClick={() => onChange('questionType', type)}
                  className={`text-xs px-2.5 py-2 rounded-lg border font-medium text-center transition-all ${
                    isSelected
                      ? 'bg-slate-900 text-white border-slate-900 shadow-xs'
                      : 'bg-white text-slate-700 border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                  }`}
                >
                  {type}
                </button>
              );
            })}
          </div>

          {/* Question Type Guide Banner */}
          <div className="mt-2 text-xs bg-[#FAF8F5] border border-[#E2DBD1] px-3 py-1.5 rounded-lg text-slate-600 flex items-center gap-1.5">
            <HelpCircle className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            <span>
              <strong>{formData.questionType} 팁:</strong>{' '}
              {QUESTION_TYPE_DESCRIPTIONS[formData.questionType]}
            </span>
          </div>
        </div>

        {/* Row 3: Question Text */}
        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1.5 flex items-center gap-1">
            <span>문항 원문</span>
            <span className="text-slate-400 font-normal">(채용 공고에 적힌 질문)</span>
          </label>
          <input
            type="text"
            value={formData.questionText}
            onChange={(e) => onChange('questionText', e.target.value)}
            placeholder="예: 지원 직무와 관련된 본인의 노력과 역량을 나타낼 수 있는 대표적인 경험을 기술해 주십시오."
            className="w-full px-3.5 py-2 text-sm bg-slate-50/50 border border-slate-300 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-[#D64545]/20 focus:border-[#D64545] transition-all"
          />
        </div>

        {/* Row 4: Character Limit & Space Inclusion Option */}
        <div className="bg-[#FAF8F5] p-3.5 rounded-xl border border-[#E2DBD1] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-xs font-bold text-slate-700">글자 수 제한:</span>
            <div className="flex items-center gap-1">
              <input
                type="number"
                min="100"
                max="3000"
                step="50"
                value={formData.maxChars}
                onChange={(e) => onChange('maxChars', Number(e.target.value) || 0)}
                className="w-20 px-2 py-1 text-xs text-center font-mono font-semibold bg-white border border-slate-300 rounded-md focus:outline-hidden focus:border-[#D64545]"
              />
              <span className="text-xs text-slate-600">자</span>
            </div>

            {/* Quick Limit Buttons */}
            <div className="flex items-center gap-1 ml-2">
              {PRESET_LIMITS.map((limit) => (
                <button
                  key={limit}
                  type="button"
                  onClick={() => onChange('maxChars', limit)}
                  className={`text-[11px] px-2 py-0.5 rounded-md border font-mono ${
                    formData.maxChars === limit
                      ? 'bg-slate-800 text-white border-slate-800'
                      : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  {limit}자
                </button>
              ))}
            </div>
          </div>

          {/* Space Toggle: Radio Buttons */}
          <div className="flex items-center gap-3 text-xs">
            <span className="font-bold text-slate-700">계산 기준:</span>
            <label className="flex items-center gap-1.5 cursor-pointer">
              <input
                type="radio"
                name="includeSpaces"
                checked={formData.includeSpaces === true}
                onChange={() => onChange('includeSpaces', true)}
                className="text-[#D64545] focus:ring-[#D64545]"
              />
              <span className="text-slate-700 font-medium">공백 포함</span>
            </label>

            <label className="flex items-center gap-1.5 cursor-pointer">
              <input
                type="radio"
                name="includeSpaces"
                checked={formData.includeSpaces === false}
                onChange={() => onChange('includeSpaces', false)}
                className="text-[#D64545] focus:ring-[#D64545]"
              />
              <span className="text-slate-700 font-medium">공백 제외</span>
            </label>
          </div>
        </div>

        {/* Row 5: Cover Letter Textarea & Real-Time Character Counter */}
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label className="text-xs font-bold text-slate-700 flex items-center gap-1">
              <span>자기소개서 본문</span>
              <span className="text-red-500">*</span>
            </label>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleCopy}
                disabled={!formData.coverLetterText}
                className="text-xs text-slate-500 hover:text-slate-800 flex items-center gap-1 px-2 py-1 rounded-md hover:bg-slate-100 disabled:opacity-40 transition-colors"
                title="본문 복사"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? '복사됨' : '복사'}</span>
              </button>
              <button
                type="button"
                onClick={handleClear}
                disabled={!formData.coverLetterText}
                className="text-xs text-slate-500 hover:text-red-600 flex items-center gap-1 px-2 py-1 rounded-md hover:bg-red-50 disabled:opacity-40 transition-colors"
                title="본문 지우기"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>지우기</span>
              </button>
            </div>
          </div>

          <div className="relative rounded-xl border border-slate-300 focus-within:border-[#D64545] focus-within:ring-2 focus-within:ring-[#D64545]/20 bg-[#FFFDFB] transition-all">
            <textarea
              rows={11}
              value={formData.coverLetterText}
              onChange={(e) => onChange('coverLetterText', e.target.value)}
              placeholder="자기소개서 작성 내용을 여기에 입력하세요.&#10;&#10;예시:&#10;[소제목을 작성하면 두괄식 구성에 효과적입니다]&#10;어떤 상황에서 어떤 문제가 발생했는지(Situation, Task), 본인이 직접 취한 행동(Action)과 최종 결과 및 정량적 성과(Result)를 솔직하고 구체적으로 적어주세요."
              className="w-full p-4 text-sm font-sans text-slate-800 placeholder-slate-400 bg-transparent resize-y outline-hidden leading-relaxed"
            />

            {/* Real-time character count footer */}
            <div className="border-t border-[#EAE3D9] bg-[#FAF8F5]/80 px-4 py-2.5 rounded-b-xl flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div className="flex items-center gap-3 text-xs">
                <span className="text-slate-500">
                  공백 포함: <strong className="text-slate-700 font-mono">{countWithSpaces.toLocaleString()}</strong>자
                </span>
                <span className="text-slate-300">|</span>
                <span className="text-slate-500">
                  공백 제외: <strong className="text-slate-700 font-mono">{countWithoutSpaces.toLocaleString()}</strong>자
                </span>
              </div>

              {/* Over Limit / Within Limit Warning Badge (Strict T1-3 requirement: changes to red #D64545 if over limit) */}
              <div className="flex items-center gap-2">
                <span
                  className={`text-xs font-mono font-bold px-2 py-0.5 rounded-md transition-colors ${
                    isOverLimit
                      ? 'bg-red-100 text-[#D64545] border border-red-300'
                      : 'bg-slate-100 text-slate-700 border border-slate-200'
                  }`}
                >
                  기준({formData.includeSpaces ? '공백포함' : '공백제외'}): {currentCount.toLocaleString()} / {formData.maxChars.toLocaleString()}자
                </span>

                {isOverLimit && (
                  <span className="text-xs text-[#D64545] font-semibold flex items-center gap-1 animate-pulse">
                    <AlertCircle className="w-3.5 h-3.5" />
                    +{charDifference}자 초과!
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Abuse Prevention Notice (> 3,000 chars) */}
          {isOverAbuseLimit && (
            <div className="mt-2.5 bg-red-50 border border-red-200 text-xs text-[#D64545] px-3.5 py-2 rounded-lg flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0 text-[#D64545]" />
              <span>
                <strong>남용 방지 안내 (T2-9):</strong> 본문이 3,000자({countWithSpaces}자)를 초과하여 첨삭 버튼이 비활성화됩니다. 3,000자 이내로 줄여주세요.
              </span>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
