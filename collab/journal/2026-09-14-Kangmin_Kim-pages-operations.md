# 조직 GitHub Pages 운영
- claim: collab/active/codex--github-pages/claim.md

## 이벤트
- added team-poem/team-poem.github.io 조직 Pages 저장소와 pages.yml CI → 소스는 cairn-landing main에서 관리하고, 배포는 5분 변경 감지 또는 수동 실행.
- rule GitHub 스케줄은 지연될 수 있음. 변경 없으면 빌드 생략, 수동 실행은 강제 재배포 → 즉시 반영이 필요하면 Pages 저장소 workflow_dispatch 사용.
- rule 추가 secret 없이 Pages OIDC 사용. 배포 작업에만 pages 쓰기 권한 부여 → 조직의 deploy key 금지 정책 유지.
- changed README.md 공개 주소, 배포 흐름, 수동 실행, 실패 확인 안내 → 운영 시 참조.
- changed .github/workflows/landing.yml 검증 workflow의 수동 실행 추가 → 검증만 필요할 때 실행.

## 검증
- 랜딩 빌드·타입·린트·npm test 전체 통과: 데모 5 + 훅 71 + 루프 30 + sobaya 32.
- 두 workflow actionlint 및 정적 HTML 로컬 에셋 경로 검사 통과.
- PR #2가 작업 중 머지되어 최신 main 기준의 별도 후속 PR로 분리. 앱 소스 변경 없음.

## 남은 것
- 조직 Pages 첫 자동 배포 성공(34826575092). 공개 페이지와 정적 에셋 16개 HTTP 200, 푸터 팀 링크 및 source-sha.txt 확인.
- 작업 완료. 후속 운영 문서 PR의 CI 확인 후 squash 머지.
