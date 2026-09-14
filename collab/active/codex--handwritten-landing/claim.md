---
branch: codex/handwritten-landing
owner: Kangmin_Kim
started: 2026-09-14
status: active
goal: Cairn 영문 랜딩을 재구성하고 조직 GitHub Pages 자동 배포를 연결한다
next: .github/workflows/landing.yml README.md
---

## 메모
- 사용자 요청: Hand Writing Text 컨셉으로 기존 공개 랜딩을 개편한다.
- 미머지 기반 PR #1의 codex/landing-bootstrap에서 시작하는 후속 작업.
- digest에 남은 codex/landing-foundation은 bootstrap claim에 명시된 이전 작업이며 현재 동료 작업이 아니다.

- 2026-09-14 사용자 방향 변경: Cairn 엔진 README banner.svg를 기준으로 랜딩 전체를 새로 구성. 이전 손글씨 시안은 같은 PR에서 교체한다.
- 충돌 재확인: foundation은 원격에 없고 bootstrap의 완료 claim이 대체를 명시한다. 두 WIP 모두 미커밋 diff 없음. 현재 단일 작업 트리에 bootstrap 전체가 포함되어 있다.

- 사용자 요청: 기존 배너 컨셉을 유지하며 히어로 전체의 밤하늘 별빛과 반짝임을 보강한다. 공용 CSS는 수정하지 않는다.

- 사용자 요청: React Bits Galaxy와 Aero Shards를 실제 원본 컴포넌트로 적용한다. 공식 의존성 ogl·vgpu를 추가한다. 동료 미커밋 변경 없음과 foundation 대체 기록을 재확인했다.

- 사용자 요청: Hallmark 스킬을 적용해 현 컨셉을 유지하며 전면 재구성하고 GeekNews 32970 글을 참고해 영어 문구를 다듬는다. foundation이 원격에 없고 bootstrap 완료 기록이 대체를 명시함을 재확인. 단일 작업 트리이며 남의 미커밋 변경 없음.

- 사용자 요청: 엔진 조각 배경을 자연스럽게 연결하고 단계 전환 모션 복원, 클릭으로 붕괴 후 3초 뒤 자가 복구하는 돌탑, 화면·코드·경로가 동기화된 쇼핑 데모 추가. foundation이 없고 bootstrap 완료 기록이 대체함을 재확인했다.

- 실행 상태의 회귀 테스트 5개를 기본 테스트 명령과 landing CI에 연결한다. 새로운 의존성은 없다.

- 사용자 요청: 푸터 made by Poem 문구에 team-poem GitHub 링크 추가.

- 사용자 요청: team-poem.github.io 조직 Pages 생성 및 main 변경 자동 재배포 CI 구성. 원격 foundation은 없고 현재 작업과 충돌하는 동료 수정 없음.

- 2026-09-14 사용자 승인: PR #2 충돌 해결을 별도 클론에서 진행한다. PR #1 squash 이전 기반과 main의 파일 내용이 같음을 확인했으며, 현재 랜딩과 진행 중인 Pages 작업 선언을 유지하고 main을 병합한다.
