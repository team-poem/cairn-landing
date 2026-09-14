# codex/handwritten-landing · Kangmin_Kim · 2026-09-14
- claim: collab/active/codex--handwritten-landing/claim.md

## 이벤트
- changed app/page.tsx Hallmark Narrative Workflow 구조로 영문 랜딩 재구성 → 기존 컴포넌트 구분과 문서 링크를 유지할 것.
- added app/hallmark.css tokens.css 전용 테마와 Space Grotesk·Geist 직접 제공 → 새 스타일은 명명된 토큰을 사용하고 기존 globals.css 프레임워크 지시문을 보존할 것.
- changed components/landing/Workflow.tsx 네 단계의 영어 설명과 결과 표시 재구성 → 설명용 데모이며 실제 브라우저 실행으로 표현하지 말 것.
- changed components/landing/Features.tsx 기능 카드를 엔진 연결 그림과 행 단위 설명으로 교체 → WebGPU 미지원 시에도 기능 설명과 링크는 유지할 것.
- added .hallmark/ 스킬 버전·판단 근거·소스 검토 기록 → 후속 디자인 수정 시 보존한 브랜드와 미검증 범위를 확인할 것.
- rule docs/content-sources.md GeekNews 32970을 참고해 상투어·과장을 줄인 영어 사용 → 기본 재생의 모델 호출 없음과 탐색·복구의 AI 호출 범위를 구분할 것.

## 검증
- npm run typecheck, npm run lint, npm run build 통과.
- npm test: hooks 71개, loop 30개, sobaya 32개 모두 통과(총 133개).
- 로컬 첫 화면 HTTP 200. 배포 CSS의 새 토큰 적용 순서와 글꼴 파일 포함 확인.
- 정적 토큰 대비 계산: 일반 문구 최소 6.09:1, 주 CTA 9.74:1.
- 브라우저 시각·상호작용·GPU 실기기 검증은 수행하지 않았으며 Hallmark 58/58 통과를 주장하지 않음.

## 남은 것
- GitHub PR #2는 기반 PR #1 위의 draft 유지. 팀 검토 뒤 squash merge 필요.
- 공개 사이트에서 디자인을 확인한 뒤 추가 피드백을 반영할 수 있음.
