---
branch: feat/snap-fit
owner: Gyuhwan_Jeong
started: 2026-09-16
status: active          # active | paused(한동안 안 함, 남이 이어받아도 됨) | done(PR 올림)
goal: 2·3번 섹션이 노트북 화면에서도 한 화면에 들어가게 해 스냅 스크롤이 어디서나 동작하게 한다
next: app/hallmark.css, app/interactions.css, components/landing/Workflow.tsx, GetStarted.tsx — 레이아웃 압축 + 실측 zoom
---

## 메모
- fix/landing-bugs(PR #8) 위에 쌓은 브랜치. #8 이 머지되면 main 에 rebase.
- 1층: 레이아웃 압축(명령 블록·설치 블록을 왼쪽 열로, 탭 축소, 데모 svh 기반). 2층: 섹션마다 콘텐츠 높이를 재서 zoom 으로 정확히 한 화면에 맞춤(하한 0.75). 히어로는 제외.
