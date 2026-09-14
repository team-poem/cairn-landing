# codex/handwritten-landing · Kangmin_Kim · 2026-09-14
- claim: collab/active/codex--handwritten-landing/claim.md

## 이벤트
- added components/landing/CairnSculpture.tsx 기존 SVG 도형을 인라인으로 재사용하고 클릭 붕괴·3초 뒤 순차 복구 구현 → 모션 감소와 타이머 해제를 유지할 것.
- added lib/demo-state.ts 화면·코드·경로의 단일 실행 상태와 runId로 이전 타이머 무효화 → 동작을 추가할 때 세 뷰에 별도 타이머를 만들지 말 것.
- added components/landing/ShopDemo.tsx 요청된 임시 쇼핑 UI 구현 → 실제 사이트나 Cairn의 실제 UI로 표시하지 말고 샘플 표시를 유지할 것.
- changed components/landing/Workflow.tsx 일시정지·초기화·복구와 동기화된 코드·경로 이동 적용 → 테스트 순서는 로그인·상품 담기·장바구니 열기이며 복구는 세 번째 단계만 실행함.
- changed components/landing/Features.tsx 조각 효과를 모델·엔진·브라우저 연결도 중심 뒤로 통합 → 그림과 별개인 독립 장식으로 다시 떼어 놓지 말 것.
- added tests/demo-state.test.mjs 동기화·일시정지·탭 전환·복구·재시작 회귀 검사 → npm test와 landing CI가 호출하는 test:demo 유지.
- changed app/interactions.css 사용자 요청에 따라 탭·커서·그래프·클릭 반응 모션 추가 → prefers-reduced-motion과 배경 모션 설정을 보존할 것.

## 검증
- 타입 검사와 린트 통과.
- 최종 프로덕션 빌드 통과.
- 새 동기화 검사 5개, 기존 hooks 71·loop 30·sobaya 32개 통과(총 138개, 테스트 그룹을 분리 실행).
- 첫 화면 로컬 HTTP 200 확인.
- 브라우저 시각·클릭·실기기 GPU 검사는 수행하지 않았음.

## 남은 것
- PR #2는 PR #1 위의 draft 상태 유지. 팀 검토 후 squash merge 필요.
- 샘플 UI와 코드는 설명용 연출이며 외부 사이트에 접속하거나 실제 Cairn 엔진을 호출하지 않음.
