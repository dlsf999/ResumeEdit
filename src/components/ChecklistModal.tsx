import React from 'react';
import { X, CheckCircle2, Circle, Sparkles, Shield, Rocket, CheckSquare } from 'lucide-react';

interface ChecklistModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectTestCase?: (testId: string) => void;
}

interface ChecklistItem {
  id: string;
  phase: string;
  title: string;
  standard: string;
}

const DEFAULT_CHECKLIST: ChecklistItem[] = [
  // Phase 0
  { id: 'T0-1', phase: 'Phase 0. 준비', title: 'T0-1. Google AI Studio API 키 발급', standard: 'API 키 발급 및 보안 보관' },
  { id: 'T0-2', phase: 'Phase 0. 준비', title: 'T0-2. Node.js 설치 (LTS)', standard: 'node -v 정상' },
  { id: 'T0-3', phase: 'Phase 0. 준비', title: 'T0-3. Firebase CLI 설치', standard: 'firebase --version 정상' },
  { id: 'T0-4', phase: 'Phase 0. 준비', title: 'T0-4. Firebase 프로젝트 생성', standard: '콘솔에 프로젝트 확인' },
  { id: 'T0-5', phase: 'Phase 0. 준비', title: 'T0-5. Blaze 요금제 등록 + 예산 알림 설정', standard: '예산 알림 설정 완료' },

  // Phase 1
  { id: 'T1-1', phase: 'Phase 1. 화면 만들기', title: 'T1-1. 기본 화면 뼈대 만들기', standard: 'STEP 1~4 영역이 위에서 아래로 보임' },
  { id: 'T1-2', phase: 'Phase 1. 화면 만들기', title: 'T1-2. 입력 폼 완성', standard: '기업명, 직무, 문항 7개, 글자 수 제한, 공백 선택, 본문 입력 구비' },
  { id: 'T1-3', phase: 'Phase 1. 화면 만들기', title: 'T1-3. 글자 수 실시간 계산', standard: '공백 포함/제외 동시 표시 및 초과 시 빨간색(#D64545) 변경' },
  { id: 'T1-4', phase: 'Phase 1. 화면 만들기', title: 'T1-4. 기업분석 결과 영역 (가짜 데이터)', standard: '4개 항목 + 출처 링크 + 참고용 안내 문구 + 접기/펼치기' },
  { id: 'T1-5', phase: 'Phase 1. 화면 만들기', title: 'T1-5. 첨삭 리포트 카드 5개 + 종합 점수', standard: 'PRD 6-3 구조로 카드 5개 및 종합 점수 렌더링' },
  { id: 'T1-6', phase: 'Phase 1. 화면 만들기', title: 'T1-6. AI 티 검증 카드의 빨간 밑줄 표시', standard: '문제 문장에 빨간 물결 밑줄(wavy underline) + 수정 예시' },
  { id: 'T1-7', phase: 'Phase 1. 화면 만들기', title: 'T1-7. 화면 상태 처리', standard: 'STEP 2, 4 숨김/펼침 및 로딩 상태와 오류 안내 표시' },
  { id: 'T1-8', phase: 'Phase 1. 화면 만들기', title: 'T1-8. 모바일 화면 확인', standard: '화면 폭 축소 시 1열 정렬 및 모바일 반응형 완비' },

  // Phase 2
  { id: 'T2-1', phase: 'Phase 2. AI 연결', title: 'T2-1. AI Studio에서 코드 내려받기', standard: '프로젝트 코드 구성' },
  { id: 'T2-2', phase: 'Phase 2. AI 연결', title: 'T2-2. Firebase 프로젝트 연결', standard: 'firebase.json / functions 또는 server proxy 구성' },
  { id: 'T2-3', phase: 'Phase 2. AI 연결', title: 'T2-3. API 키를 비밀 보관함에 저장', standard: '서버 환경 변수 GEMINI_API_KEY 보관' },
  { id: 'T2-4', phase: 'Phase 2. AI 연결', title: 'T2-4. 중간 서버 함수 ① 기업분석', standard: 'Google 검색 연동 결과와 출처 링크 수집' },
  { id: 'T2-5', phase: 'Phase 2. AI 연결', title: 'T2-5. 중간 서버 함수 ② 첨삭', standard: '입력값 전송 시 PRD 6-3 구조 JSON 반환' },
  { id: 'T2-6', phase: 'Phase 2. AI 연결', title: 'T2-6. 첨삭 프롬프트 적용', standard: '역할·맥락·제약 및 7개 문항별 평가 포인트 반영' },
  { id: 'T2-7', phase: 'Phase 2. AI 연결', title: 'T2-7. 화면과 중간 서버 연결', standard: '가짜 데이터 대신 실시간 AI 결과 카드 표시' },
  { id: 'T2-8', phase: 'Phase 2. AI 연결', title: 'T2-8. 재첨삭 점수 비교', standard: '이전 61점 → 72점 ▲11 비교 뱃지 표시' },
  { id: 'T2-9', phase: 'Phase 2. AI 연결', title: 'T2-9. 남용 방지 처리', standard: '본문 3,000자 초과 시 첨삭 버튼 차단' },

  // Phase 3 Tests
  { id: 'T3-1', phase: 'Phase 3. 테스트', title: 'T3-1. 문항 종류 7개 각각 샘플로 첨삭', standard: '문항별 평가 포인트가 반영된 결과 확인' },
  { id: 'T3-2', phase: 'Phase 3. 테스트', title: 'T3-2. STAR 중 결과(R)가 빠진 글', standard: 'STAR 카드에 R ⚠️ 표시 + 수치 보완 질문 확인' },
  { id: 'T3-3', phase: 'Phase 3. 테스트', title: 'T3-3. 숫자가 하나도 없는 글', standard: '수치 날조 없이 지원자에게 보완 질문 제공' },
  { id: 'T3-4', phase: 'Phase 3. 테스트', title: 'T3-4. 글자 수 제한 초과', standard: '빨간색 경고 + 줄일 문장 제안 확인' },
  { id: 'T3-5', phase: 'Phase 3. 테스트', title: 'T3-5. 상투적 표현이 많은 글', standard: 'AI 티 검증 카드에 빨간 물결 밑줄 문장 표시' },
  { id: 'T3-6', phase: 'Phase 3. 테스트', title: 'T3-6. 존재하지 않는 기업명', standard: '정보를 찾지 못했다고 친절히 안내' },
  { id: 'T3-7', phase: 'Phase 3. 테스트', title: 'T3-7. 기업분석 없이 바로 첨삭', standard: '첨삭 정상 작동 + 기업분석 유도 안내' },
  { id: 'T3-8', phase: 'Phase 3. 테스트', title: 'T3-8. 빈 칸으로 첨삭 버튼 클릭', standard: '필수 항목 입력 안내 팝업' },
  { id: 'T3-9', phase: 'Phase 3. 테스트', title: 'T3-9. 3,000자 초과 입력', standard: '첨삭 버튼 비활성화 확인' },
  { id: 'T3-10', phase: 'Phase 3. 테스트', title: 'T3-10. 인터넷 끊고 첨삭 / 에러', standard: '오류 안내 + 재시도 버튼 확인' },
  { id: 'T3-11', phase: 'Phase 3. 테스트', title: 'T3-11. 모바일에서 전체 흐름', standard: '모바일 1열 뷰 및 터치 반응 확인' },

  // Phase 4 & 5
  { id: 'T4-1', phase: 'Phase 4. 배포', title: 'T4-1. 화면 빌드 (npm run build)', standard: 'dist 디렉토리 정상 빌드 완료' },
  { id: 'T4-2', phase: 'Phase 4. 배포', title: 'T4-2. 배포 (firebase deploy)', standard: '호스팅 URL 정상 배포' },
  { id: 'T5-1', phase: 'Phase 5. 보안 점검', title: 'T5-1. 화면 코드에 API 키 노출 금지', standard: '브라우저 코드에 AIza 키 전혀 없음' },
  { id: 'T5-2', phase: 'Phase 5. 보안 점검', title: 'T5-2. F12 네트워크 탭 키 은닉', standard: '모든 AI 호출이 /api/* 프록시로 실행됨' },
  { id: 'T5-6', phase: 'Phase 5. 보안 점검', title: 'T5-6. 자소서 본문 영구 저장 금지', standard: '본문은 메모리 분석 후 즉시 반환, 미저장' },
];

export const ChecklistModal: React.FC<ChecklistModalProps> = ({
  isOpen,
  onClose,
  onSelectTestCase,
}) => {
  const [checkedMap, setCheckedMap] = React.useState<Record<string, boolean>>(() => {
    try {
      const saved = localStorage.getItem('coach_prd_checklist');
      if (saved) return JSON.parse(saved);
    } catch (e) {}
    // Default initial checked: Phase 1 & server proxy are ready
    return {
      'T1-1': true,
      'T1-2': true,
      'T1-3': true,
      'T1-4': true,
      'T1-5': true,
      'T1-6': true,
      'T1-7': true,
      'T1-8': true,
      'T2-4': true,
      'T2-5': true,
      'T2-6': true,
      'T2-7': true,
      'T2-8': true,
      'T2-9': true,
      'T5-1': true,
      'T5-2': true,
      'T5-6': true,
    };
  });

  const toggleCheck = (id: string) => {
    setCheckedMap((prev) => {
      const next = { ...prev, [id]: !prev[id] };
      localStorage.setItem('coach_prd_checklist', JSON.stringify(next));
      return next;
    });
  };

  const completedCount = Object.values(checkedMap).filter(Boolean).length;
  const totalCount = DEFAULT_CHECKLIST.length;
  const progressPercent = Math.round((completedCount / totalCount) * 100);

  if (!isOpen) return null;

  // Group by phase
  const grouped = DEFAULT_CHECKLIST.reduce<Record<string, ChecklistItem[]>>((acc, item) => {
    if (!acc[item.phase]) acc[item.phase] = [];
    acc[item.phase].push(item);
    return acc;
  }, {});

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl border border-[#E2DBD1] w-full max-w-2xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden animate-in fade-in duration-150">
        {/* Modal Header */}
        <div className="bg-[#FAF8F5] border-b border-[#E2DBD1] px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <CheckSquare className="w-5 h-5 text-[#D64545]" />
            <div>
              <h2 className="text-base font-bold text-slate-900 font-editorial">
                자소서 첨삭 코치 개발 체크리스트
              </h2>
              <p className="text-xs text-slate-500">
                PRD.md 기준 작업 진척도: <strong>{completedCount}</strong> / {totalCount} 완료 ({progressPercent}%)
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-slate-100 h-2">
          <div
            className="bg-[#D64545] h-full transition-all duration-300"
            style={{ width: `${progressPercent}%` }}
          />
        </div>

        {/* Checklist List */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1 text-xs">
          {Object.entries(grouped).map(([phase, items]) => (
            <div key={phase} className="space-y-2.5">
              <h3 className="font-bold text-slate-900 text-sm flex items-center justify-between border-b border-slate-100 pb-1.5">
                <span>{phase}</span>
                <span className="text-[11px] font-normal text-slate-400">
                  {items.filter((i) => checkedMap[i.id]).length}/{items.length} 달성
                </span>
              </h3>

              <div className="space-y-1.5">
                {items.map((item) => {
                  const isChecked = !!checkedMap[item.id];
                  return (
                    <div
                      key={item.id}
                      onClick={() => toggleCheck(item.id)}
                      className={`p-2.5 rounded-xl border flex items-start gap-3 cursor-pointer transition-all ${
                        isChecked
                          ? 'bg-emerald-50/40 border-emerald-200 text-slate-800'
                          : 'bg-white border-slate-200 hover:border-slate-300 text-slate-600'
                      }`}
                    >
                      <button
                        type="button"
                        className="mt-0.5 shrink-0"
                      >
                        {isChecked ? (
                          <CheckCircle2 className="w-4 h-4 text-emerald-600 fill-emerald-100" />
                        ) : (
                          <Circle className="w-4 h-4 text-slate-300" />
                        )}
                      </button>

                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <span className={`font-semibold ${isChecked ? 'text-slate-900 line-through text-slate-500' : 'text-slate-800'}`}>
                            {item.title}
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-500 mt-0.5">
                          기준: {item.standard}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Modal Footer */}
        <div className="bg-[#FAF8F5] border-t border-[#E2DBD1] px-6 py-3.5 flex items-center justify-between">
          <span className="text-xs text-slate-500">
            체크 상태는 브라우저에 안전하게 저장됩니다.
          </span>
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs rounded-xl transition-colors"
          >
            닫기
          </button>
        </div>
      </div>
    </div>
  );
};
