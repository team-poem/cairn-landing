#!/bin/sh
# 하위 스택 PR을 먼저 squash한 뒤 부모 PR을 main에 올리는 회귀.
set -eu
SRC="$(cd "$(dirname "$0")/.." && pwd -P)"
TEMP="$(mktemp -d)"
trap 'rm -rf "$TEMP"' EXIT
cd "$TEMP"
git init -q -b main
git config user.name fixture
git config user.email fixture@example.test
git config collab.me solp
cp -R "$SRC/harness" "$SRC/scripts" .
mkdir -p collab/active/feat--existing collab/journal
claim() {
  printf -- '---\nbranch: %s\nowner: %s\nstatus: %s\ngoal: fixture\nbase: %s\n---\n' "$1" "$2" "$3" "$4" > "$5"
}
claim feat/existing solp done feat/parent collab/active/feat--existing/claim.md
git add . && git commit -qm seed
git switch -qc feat/parent
mkdir -p collab/active/feat--parent
claim feat/parent solp done '' collab/active/feat--parent/claim.md
printf '# fixture\n\n## 이벤트\n- done fixture 통합\n\n## 남은 것\n- 없음\n' > collab/journal/2026-10-24-solp-parent.md
git add . && git commit -qm parent
git switch -qc feat/child
mkdir -p collab/active/feat--child
child() { claim feat/child "$2" "$1" "$3" collab/active/feat--child/claim.md; git add .; git commit -qm child; }
child done solp feat/parent
git switch -q feat/parent
git merge -q --squash feat/child >/dev/null && git commit -qm integrate
run_check() { CLAUDE_PROJECT_DIR="$TEMP" GITHUB_HEAD_REF=feat/parent sh scripts/collab.sh check --base main > "$TEMP/check.log" 2>&1; }
reject() {
  if run_check; then echo "FAIL: $1"; exit 1; fi
  grep -q '다른 브랜치의 claim' "$TEMP/check.log"
  echo "ok   $1"
}
run_check || { cat "$TEMP/check.log"; exit 1; }
echo 'ok   완료된 같은 소유자의 하위 claim 추가는 통합 허용'
child active solp feat/parent
reject '진행 중인 하위 claim은 계속 차단'
child done amazon feat/parent
reject '다른 소유자 claim은 계속 차단'
child done solp feat/unrelated
reject '다른 base의 claim은 계속 차단'
child done solp feat/parent
claim feat/wrong-name solp done feat/parent collab/active/feat--child/claim.md
git add . && git commit -qm malformed
reject '디렉터리와 branch가 다른 claim은 계속 차단'
child done solp feat/parent
printf '\nchanged\n' >> collab/active/feat--existing/claim.md
git add . && git commit -qm modify-existing
reject 'main에 있던 다른 claim 수정은 계속 차단'
git rm -q collab/active/feat--existing/claim.md && git commit -qm delete-existing
reject 'main에 있던 다른 claim 삭제는 계속 차단'
echo '스택 claim 통합 회귀 7건 통과'
