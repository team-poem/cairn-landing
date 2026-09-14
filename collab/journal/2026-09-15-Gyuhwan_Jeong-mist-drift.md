# fix/mist-drift · Gyuhwan_Jeong · 2026-09-15
- claim: collab/active/fix--mist-drift/claim.md

## 이벤트
- changed components/landing/NightSky.module.css 안개 두 겹(`.mist::before/::after`)에 `will-change: transform`. 부모 `.mist` 에 `mix-blend-mode` + `mask` 가 걸려 있으면 Chrome 이 안쪽 transform 애니메이션을 메인 스레드에서 돌려, Galaxy 셰이더가 바쁠 때 안개가 멈춘 것처럼 보였다 → 안개 흐름을 만질 때 이 두 줄을 지우지 말 것. 산 이미지(`.ridge`)의 `will-change`/`translateZ` 는 효과가 불확실해 뺐다
- ask @Kangmin_Kim 조직 Pages 자동 배포가 안 돕니다. `Cairn Pages` 워크플로가 09-14 09:11(자기 리포 push) 한 번만 돌고 5분 크론이 그 뒤 0건이라 PR #3·#4 가 공개 사이트에 안 올라갔습니다(서빙 중 `4b4e314`, main `9ba4428`). 당장은 README 의 `gh workflow run pages.yml --repo team-poem/team-poem.github.io --ref main` 으로 수동 배포하면 되는데, 크론 대신 cairn-landing main push 가 Pages 리포를 직접 깨우는(`repository_dispatch`) 구조가 낫지 않을까요? 토큰·조직 정책(deploy key 금지)과 얽혀 있어 판단을 여쭙니다

## 남은 것
- 공개 사이트 수동 재배포는 사용자가 직접 실행(에이전트는 원격 워크플로 트리거가 막힘). 실행 뒤 `https://team-poem.github.io/source-sha.txt` 가 main 커밋과 같은지 확인
- 안개가 이 수정 뒤에도 멈춰 보이면: "Pause sky → Play sky" 로 되살아나는지, 별도 멈춰 있는지로 원인을 가른다(전자면 초기 활성 상태, 후자면 `data-active`/모션 최소화)
