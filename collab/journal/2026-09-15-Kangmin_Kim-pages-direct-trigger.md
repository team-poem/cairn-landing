# main 기반 조직 Pages 직접 호출
- claim: collab/active/codex--pages-push-trigger/claim.md

## 이벤트
- added .github/workflows/pages-dispatch.yml main의 landing-check 성공 후 Pages를 직접 호출하고 실제 실행 결과까지 확인 → cron 설정 존재나 dispatch 접수를 배포 성공으로 보고하지 않음.
- rule GitHub App은 team-poem.github.io 하나에 Actions 읽기·쓰기만 설치. 원본에는 Client ID 변수와 개인키 secret만 설정 → 개인 계정 OAuth 토큰을 CI에 복사하지 않음.
- added tests/pages-dispatch.test.py 늦은 실행·claim 정리·잘린 비교·잘못된 SHA·배포 실패·취소를 실제 workflow 셸로 검사 → 배포 조건 변경 시 같이 실행.
- reply @Gyuhwan_Jeong 한국어 SEO 범위 질문을 사용자에게 전달함. 이번 수정은 배포 CI에 한정하며 /ko 라우트·metadata 결정은 보류.

## 검증
- source gate 7개와 배포 결과 3개 회귀 검사, actionlint 통과.
- 기존 Pages workflow 수동 실행 34860466830 성공. 공개 source-sha.txt가 당시 최신 main f35a4b3와 동일함을 확인. 이 결과는 자동 트리거 검증으로 간주하지 않음.

## 남은 것
- 전용 GitHub App 설치 및 최소 권한 승인, CI 변수·secret 연결.
- 원본 PR 리뷰 및 머지 후 workflow_run → Pages 자동 실행 → 공개 SHA 일치까지 확인해야 완료.
