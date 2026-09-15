# Pages 직접 호출 승인 대기
- claim: collab/active/codex--pages-push-trigger/claim.md

## 이벤트
- changed team-poem/team-poem.github.io PR #2 머지 완료. source_sha 입력, 최신 main 비교, 잘못된 SHA 거부, 보조 cron 시각 변경 적용 → 호출 준비 완료이며 호출자 연결은 아직 아님.
- rule cairn-landing PR #6 코드의 전체 GitHub CI 통과. 전용 App 생성·설치 및 소스 변수·secret은 사용자 권한 승인 대기 → 인증 설정 전에는 머지하지 말 것.
- rule Chrome App 등록 양식은 Poem Cairn Pages Deploy, 조직 한정 설치, Actions 읽기·쓰기와 기본 Metadata 읽기만 선택됨. 아직 Create 버튼을 누르지 않았고 키도 생성하지 않음 → 사용자 승인 후 이어서 설치 대상을 team-poem.github.io 하나로 제한.

## 검증
- 원본 workflow 셸 회귀 10개와 Pages 입력 셸 4개 통과. 두 workflow actionlint 통과.
- PR #6 랜딩·협업·훅루프·새 회귀 검사 모두 통과한 코드 HEAD는 ba7bf93.
- 기존 workflow 수동 실행 34860466830 성공, 공개 SHA와 main 일치 확인. 자동 트리거 복구의 근거로 취급하지 않음.

## 남은 것
- 사용자: 새 App의 제한된 권한 승인. 인증 화면은 통과했으나 App 권한 승인을 대신하지 않음.
- 설정: App 생성, 배포 저장소 하나에 설치, PAGES_APP_CLIENT_ID 변수와 PAGES_APP_PRIVATE_KEY secret 연결.
- 리뷰: PR #6은 저장소 정책상 리뷰 1개 필요. 인증 설정 완료 후 준비 상태로 전환하고 squash 머지.
- 실제 main 검증 완료가 workflow_run을 만들고 Pages 성공 및 공개 SHA까지 이어지는지 확인해야 최종 완료.
