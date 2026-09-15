# feat/snap-fit · Gyuhwan_Jeong · 2026-09-16
- claim: collab/active/feat--snap-fit/claim.md

## 이벤트
- added components/landing/FitToViewport.tsx 섹션 콘텐츠 높이를 재서 `zoom` 으로 한 화면(뷰포트 − 헤더 − 섹션 패딩 − reserve)에 맞추는 래퍼. 60rem 이상에서만, 하한 0.75, `data-fit` 에 적용 배율 → 스냅 칸에 들어가야 하는 새 섹션은 이걸로 감쌀 것. 히어로는 감싸지 않는다
- changed components/landing/Workflow.tsx `.flow-command`(터미널 명령 블록)가 `.flow-story` 안, `.flow-note` 아래로 이동. 패널 전폭 3번째 칸이 아니다 → 명령 블록 위치를 잡는 CSS 는 `.flow-story .flow-command` 기준으로
- changed components/landing/GetStarted.tsx `.start-stack` 이 `FitToViewport`(reserve `.cairn-footer`) 가 됨. 60rem 이상에서 포트 탭은 2열, 설치 블록은 왼쪽 열 2행(`grid-row: 2`), `.engine-output` 44rem 폭 제한 제거, 재생 버튼 오른쪽 정렬
- changed app/hallmark.css `.flow-section` min-height `calc(100svh − header)`, `.start-section` `calc(100svh − header − 12rem)`, 패널 min-height 620 제거, `.sync-visuals` 60rem 에서 코드·경로 2열, 푸터 60rem 에서 한 줄(마스트헤드 + 링크 열 가로 배치) → 푸터에 열을 추가하면 60rem 규칙(`.footer-grid` 1fr auto auto)도 손볼 것
- changed app/interactions.css `.store-viewport` 높이 `clamp(220px, 28svh, 266px)` → 샘플 앱 장면은 220px 에서도 잘리지 않아야 한다
- rule 스냅 칸 예산은 1440×900(가용 812px) 기준. 2·3번 섹션에 세로로 큰 요소를 더하면 zoom 이 내려가 글자가 작아진다. 헤드리스 크롬으로 `data-fit` 값을 재서 0.85 아래로 안 가게 유지

## 남은 것
- 사용자 확인 대기: 로컬(127.0.0.1:4321)에서 2·3번 섹션 한 화면 맞춤과 출력 박스·버튼 정렬 확인 뒤 PR. 확인 후 claim `done`, PR 제목 = claim goal
- 이 브랜치는 fix/landing-bugs(PR #8) 위에 쌓였다. #8 머지 후 `git rebase origin/main` 하고 `--force-with-lease` 로 올린다(merge 커밋은 동료 claim 파일 때문에 pre-commit 에 막힌다)
- Safari 의 `zoom` 은 크롬과 렌더링이 조금 다를 수 있다. 사파리에서 3번 섹션 폭·스냅 위치 한 번 볼 것
- 1280×720 처럼 더 낮은 화면은 하한 0.75 에 걸려 살짝 넘칠 수 있다. 그때는 proximity 가 아니라 콘텐츠를 더 줄이는 쪽으로
