---
branch: ci/hosted-runners
owner: Kangmin_Kim
started: 2026-11-24
status: active
goal: ci: 공개 저장소 필수 검사를 GitHub-hosted 러너(ubuntu-latest)에서 실행한다
base:
next:
---

## 메모
- 공개 저장소는 GitHub-hosted 러너를 무료로 쓴다. poem-public 러너는 아무도 서빙하지 않아 필수 검사가 24시간 대기 후 취소된다.
- 모든 job의 runs-on을 ubuntu-latest로 바꾼다. job name은 그대로 둬서 필수 검사 이름이 유지된다.
