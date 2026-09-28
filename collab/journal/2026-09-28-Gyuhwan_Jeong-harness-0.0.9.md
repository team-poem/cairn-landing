# codex/harness-0.0.9 · Gyuhwan_Jeong · 2026-09-28
- claim: collab/active/codex--harness-0.0.9/claim.md

## 이벤트
- migrated harness/VERSION 0.0.8 → 0.0.9 (upstream v0.0.9, 3db86615db7d621b6148532c2cd8ea67f9d09147) → 이 PR을 가져오면 기존 .githooks 설정으로 새 훅이 동작하며 init.sh 재실행 불필요.
- changed harness/hooks/lib.sh scripts/collab.sh 내 다른 브랜치 구분·통합 커밋 처리·스택 base·supersedes·머지된 브랜치 push 감지·PR 본문 개선 적용 → 새 claim과 journal 템플릿 사용.
- changed harness/hooks/stop.sh push된 코드 변경에 대해 저널 요구 → 작업 중간 미커밋 변경만으로 인수인계를 강요하지 않음.
- changed .github/workflows/harness-check.yml chore/collab-prune 재사용, 기존 봇 이력 merge 후 일반 push 및 concurrency 직렬화 → 템플릿 기본 강제 push 대신 프로젝트의 강제 push 금지 정책 유지.
- added tests/prune-workflow.test.py 실제 workflow 셸을 로컬 보호 원격에서 두 번 실행해 PR·브랜치 재사용과 조상 관계 보존 검증 → 하네스 CI에서 함께 실행.
- rule tests/hooks.sh 실제 앱은 초기화되어 있으므로 setup 검사에는 기존 플레이스홀더 fixture 유지 → 다음 템플릿 업그레이드에서도 이 보정 보존.
- added docs/harness-upgrade.md 적용 원본·프로젝트별 보정·검증 절차 → 다음 업데이트 시 참고. harness/config.sh, 앱 계약, 기존 저널·claim, 랜딩 배포 워크플로 보존.

## 검증
- npm test 통과: demo 5, hooks 84, loop 48, sobaya 32. 초기 적용 때 setup fixture 누락으로 2개 실패했으나 기존 보정을 복원한 뒤 전체 통과.
- python3 tests/prune-workflow.test.py 통과. main push 거절 상황, 봇 브랜치 일반 push 반복, PR 하나 재사용, 앱 파일 유지 확인.
- 실제 digest에서 내 다른 브랜치를 동료·겹침 목록과 분리 확인. pr-body의 요약·검증 우선 출력 확인.
- SEO PR #11이 머지된 origin/main을 새 훅으로 git merge --no-edit: 충돌·소유권 차단 없이 성공.
- npm run typecheck, npm run lint, npm run build 및 정적 경로 검사 통과. main 통합 후 Pages 빌드·EN/KO SEO 검사와 demo·prune 회귀 검사 재검증 통과.

## 남은 것
- PR 리뷰·머지. 다른 클론은 최신 main을 가져와야 0.0.9 사용.
- 과거 prune 원격 브랜치 삭제는 하지 않음. 실제 GitHub 봇 반복 실행은 머지 후 확인; 이번에는 임시 원격과 gh 대역으로 검사.
