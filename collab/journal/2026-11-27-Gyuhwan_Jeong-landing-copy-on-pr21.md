# codex/landing-link-selection-preview · Gyuhwan_Jeong · 2026-11-27
- claim: collab/active/codex--landing-link-selection-preview/claim.md

## 이벤트
- changed lib/i18n.ts 다음 단계 문구를 도착 단계 기준으로 관리한다 → 단계를 추가하면 nextDemoPhase와 양 언어 문구를 함께 갱신한다.
- changed lib/testing-guide.ts 앱 정보와 실행 예산 설명을 문단 배열로 나눈다 → 화면과 구조화 데이터에 각 문단을 반영한다.
- changed public/llms.txt 기본 재실행의 모델 호출 조건과 예시의 한계를 명시한다 → 본문과 검색 설명을 바꾸면 함께 확인한다.
- done 한영 문구와 단계 이동 수정은 PR #21에 포함한다 → 중복 스택 PR #22 대신 #21을 검토한다.

## 남은 것
- 브라우저 자동화 환경에서 로컬 랜딩 서버에 연결하지 못했다. 화면 배치와 실제 버튼 조작은 별도로 확인한다.
- 엔진 2.9.9 퀵스타트의 실제 Chrome 실행은 통과했다. 다른 엔진 기능을 모두 실행한 검증은 아니다.
