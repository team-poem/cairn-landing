# codex/landing-2.9.5 · Gyuhwan_Jeong · 2026-10-24
- claim: collab/active/codex--landing-2.9.5/claim.md

## 이벤트
- added harness/sobaya.lock 소바야 소스 6caeebed048edec435dbeb235f97aa58a7fe9b76 고정 → 각 환경에서 docs/sobaya-update.md에 따라 정확한 체크아웃과 앱 훅을 연결할 것
- changed harness/sobaya/RULES.md 이전 승인 기반 계약은 과거 기록으로 표시 → 최신 Canon TDD에 별도 테스트 승인·의무 review를 요구하지 말 것
- changed lib/i18n.ts ContextProvider와 Planner의 EN/KO 설명에 앱 컨텍스트·실행 예산 반영 → 관측 증거 대체나 과금 한도로 과장하지 말 것
- changed components/landing/GetStarted.tsx npm·pnpm·Yarn 선택 시 로컬 설치와 CLI 명령 전환 → 전역 CLI 설치를 필수로 안내하지 말 것
- changed public/llms.txt 2.9.5 README 기준 컨텍스트·예산·설치 선택지 반영 → 두 기능은 2.9.4 도입이며 데모·벤치마크를 신규 2.9.5 측정으로 재표기하지 말 것

## 남은 것
- PR 검토·머지 시 이슈 #14 닫힘. 배포는 이번 작업에서 수행하지 않음.
- 기존 소바야 체크아웃의 brain/index.md 미커밋 변경과 기존 중첩 cairn-landing/ 클론은 보존함.
