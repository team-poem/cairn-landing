# codex/pages-push-trigger · Kangmin_Kim · 2026-09-15
- claim: collab/active/codex--pages-push-trigger/claim.md

## 이벤트
- done 사용자가 자동 배포용 App 연결을 명시적으로 승인했다 → 같은 범위의 승인 재요청 없이 이어서 완료.
- added GitHub App poem-cairn-pages-deploy(App ID 4943027, installation 161679741)를 team-poem/team-poem.github.io 하나에 설치했다. Actions 읽기·쓰기와 기본 Metadata 읽기만 허용 → 권한·저장소 범위를 확대하지 않음.
- added PAGES_APP_CLIENT_ID 변수를 소스 저장소에 설정했다 → 개인키 secret 연결만 남았으며 client secret은 필요하지 않음.
- rule 개인키 발급 클릭은 서버에 키를 만들었으나 Chrome ERR_BLOCKED_BY_CLIENT로 파일 수신 실패. 다운로드 이벤트 방식도 시간 초과 → 반복 발급하지 말고 사용자 직접 다운로드 뒤 승인된 소스 secret에 저장.

## 남은 것
- 사용자가 App General의 Generate a private key를 직접 눌러 Downloads에 .pem 파일 저장. 내용을 채팅에 붙여넣지 않고 gh secret set PAGES_APP_PRIVATE_KEY --repo team-poem/cairn-landing에 파일 입력으로 저장한다.
- 내려받지 못한 키는 사용되지 않는다. 정상 키 연결 뒤 불필요한 발급 키 정리가 필요하다. 브라우저 보안 경고를 우회하지 않는다.
- PR #6은 팀원 재승인이 필요하다. 인증 연결 전에는 머지하지 않는다. 연결·머지 후 workflow_run → Pages 실제 게시 성공까지 확인해야 완료다.
