# codex/landing-2.9.5 · Gyuhwan_Jeong · 2026-10-24
- claim: collab/active/codex--landing-2.9.5/claim.md

## 이벤트
- changed scripts/collab.sh 하위 스택 PR을 부모에 먼저 합칠 때 완료 claim의 신규 추가를 허용 → owner 일치·base가 현재 브랜치·status done·정상 경로를 모두 충족해야 하며 기존 claim 수정/삭제는 계속 차단
- added tests/integrated-claim.sh 실제 Git squash 통합과 허용/차단 경계 7건 검증 → tests/loop.sh에서 함께 실행할 것

## 남은 것
- PR #15의 협업 규칙 검사 통과 뒤 main 머지 가능. #16의 SEO 변경도 이미 #15에 포함됨.
