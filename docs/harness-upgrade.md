# 협업 하네스 업데이트 기록

## 0.0.9 (2026-09-28)

- 원본: https://github.com/team-poem/poem-collaboration-harness-template/tree/v0.0.9
- 고정 커밋: `3db86615db7d621b6148532c2cd8ea67f9d09147`
- `harness/VERSION`, 변경 기록, 핵심 훅·스크립트는 릴리스 파일을 적용했다. 기존 claim·저널은 보존했다.
- 프로젝트명, `npm test` 앱 계약, `harness/config.sh`의 랜딩 전용 HOTSPOTS, `.gitignore`, Claude/Codex 훅 연결과 스킬, 랜딩 배포 워크플로는 유지했다.

### 프로젝트별 보정

1. `tests/hooks.sh`의 온보딩 fixture는 실제 프로젝트와 달리 미초기화 템플릿이어야 한다. 기존의 `AGENTS.md` 플레이스홀더 fixture 보정을 유지했다. 이를 빠뜨리면 초기화된 앱에서 setup 테스트 두 개가 실패한다.
2. 템플릿의 prune CI는 `chore/collab-prune`를 강제 push로 갱신한다. 이 프로젝트는 강제 push 금지 규칙을 유지하므로, 기존 원격 봇 브랜치가 있으면 이력을 merge한 뒤 일반 push한다. 같은 작업의 중복 실행은 job concurrency로 직렬화한다. 충돌·일반 push 실패는 작업 실패로 남기고 강제 덮어쓰지 않는다.
3. `tests/prune-workflow.test.py`는 실제 workflow 셸을 임시 로컬 원격에서 실행한다. main push가 거절된 상황에서 두 번 정리해 PR 하나·브랜치 하나를 재사용하고, 이전 봇 커밋을 조상으로 보존하는지 검사한다. 하네스 CI에서 함께 실행한다.

### 검증 명령

```sh
npm test
python3 tests/prune-workflow.test.py
npm run typecheck
npm run lint
npm run build
python3 tests/check-static-paths.py dist/client
sh scripts/collab.sh check
```

다음 업데이트에서도 템플릿을 통째로 덮어쓰거나 `init.sh`를 다시 실행하지 않는다. 위 프로젝트별 차이를 비교해 보존하고, 템플릿의 작업 claim·저널은 가져오지 않는다. `core.hooksPath=.githooks`인 기존 클론은 checkout된 새 훅을 바로 사용한다.
