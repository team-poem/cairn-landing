# Sobaya 연결 · 2026-10-24

## 이번 업데이트

소스 체크아웃 방식의 Sobaya를 `6caeebed048edec435dbeb235f97aa58a7fe9b76`으로 연결했다. 공유 기준은 `harness/sobaya.lock`이다. 공개된 `v1.0.0-rc.1` 설치형 런타임을 설치했다고 의미하지 않는다. 개인 체크아웃 경로는 lock에 넣지 않는다.

최신 소스는 Canon TDD 흐름이다. 제품 의도 안에서 시나리오를 문장으로 정리하고 다음 테스트 하나만 구체화하여 RED→GREEN을 확인한다. 별도 테스트 승인·고정 테스트 묶음·의무 독립 리뷰가 제거됐다. `step`과 `loop`는 한 테스트 뒤 돌아오며 에이전트가 다음 작업을 고른다. 기존 승인 상태는 자동 변환하지 않고, 필요할 때 비활성 경계에서 `migrate.sh`를 사용한다. 이전 승인 기반 표는 `harness/sobaya/RULES.md`의 과거 계약 기록이다.

이 작업에서는 기존 Sobaya 체크아웃의 미커밋 변경을 보존하고 별도 최신 소스 체크아웃을 사용했다. 앱의 기존 `.githooks`는 유지하며, 그 pre-commit이 `.git/hooks/pre-commit`의 Sobaya 앱 훅을 이어서 실행한다. 생성된 빈 `spec.md`·`failed-test.md`는 PR에 넣지 않는다. 소스에서 직접 수정·검증하는 흐름도 지원한다.

## 다른 개발 환경에서 연결

1. 별도 경로에 `team-poem/sobaya`를 클론하고 lock의 정확한 sha를 체크아웃한다. 기존 작업 중인 체크아웃을 덮어쓰지 않는다.
2. 앱 디렉터리에서 아래 명령을 실행한다. `SOBAYA_CHECKOUT`은 개인 경로로 바꾼다.

```sh
sh harness/attach-sobaya.sh update --sobaya "$SOBAYA_CHECKOUT"
sh harness/attach-sobaya.sh check --sobaya "$SOBAYA_CHECKOUT"
```

`update`는 pull을 시도한 후 해당 체크아웃의 HEAD를 기록한다. 따라서 실행 전 정확한 커밋을 확인하고, 실행 후 lock이 팀 기준과 같은지 검토한다. `sync`도 최신 pull을 시도하므로 정확한 pin 복원 명령으로 가정하지 않는다. 앱이 source workspace의 `apps/` 아래에 없으면 `--sobaya`를 명시한다.

3. 훅 실행, 앱 전체 테스트, 타입·린트·정적 빌드를 확인한다. 로컬 절대 경로를 담는 Git 훅은 각 환경에서 다시 설치한다.

최신 절차: [소바야 README](https://github.com/team-poem/sobaya/blob/6caeebed048edec435dbeb235f97aa58a7fe9b76/README.md). 설치형 런타임으로의 전환은 별도 작업이다.
