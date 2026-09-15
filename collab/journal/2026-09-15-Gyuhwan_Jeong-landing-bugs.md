# fix/landing-bugs · Gyuhwan_Jeong · 2026-09-15
- claim: collab/active/fix--landing-bugs/claim.md

## 이벤트
- changed components/landing/Hero.tsx 돌탑(`CairnSculpture`)에 넘기던 `animated` prop 을 "Pause sky" 토글이 아니라 `!reducedMotion`(OS 설정)으로 바꿨다 → 돌탑의 무너짐·복구 인터랙션을 하늘 정지 버튼과 다시 묶지 말 것. `[data-motion='false']` CSS 가 `.stone`/`.ring` 애니메이션을 통째로 끄니 이 prop 을 재사용하면 같은 사고가 난다
- changed app/hallmark.css `.flow-section`·`.start-section` 에 `scroll-margin-top: var(--header-height)` 를 추가하고, 안쪽 padding-top 에서는 header-height 분을 뺐다(총 여백은 동일) → 새 스냅 섹션을 추가할 때 padding 만으로 헤더를 피하려 하지 말 것. 실제 스냅/앵커 정지 위치는 scroll-margin 이 정한다
- changed components/landing/LocaleProvider.tsx 언어 전환을 `document.startViewTransition`(전체 페이지 스냅샷, 히어로의 라이브 WebGL 캔버스까지 찍어서 렉·간헐적 깨짐이 있었다)에서 `.cairn-site` 래퍼 하나만 150ms opacity 크로스페이드로 바꿨다 → 언어 전환 애니메이션을 다시 만질 때 페이지 전체를 캡처하는 API 는 피할 것(WebGL 캔버스가 있는 한 계속 문제될 것)
- changed app/hallmark.css `.flow-panel[data-slot='tabs-content']` 에 min-height(모바일 900px, 60rem+ 620px)와 `align-content:start` → Workflow 탭 콘텐츠 길이가 달라도 카드가 흔들리지 않는다. 새 탭/콘텐츠를 추가하면 이 min-height 로 충분한지 확인할 것
- added components/landing/reactbits/Galaxy.tsx `interactiveFloor` prop(기본 0, 무제한) 추가 → 통합용 포인터 배선 값이다(원본 셰이더 로직은 안 건드림). 화면 하단에 다른 장면이 깔릴 때 그 구간에서 마우스 반응을 끄고 싶으면 이 prop 을 쓸 것
- changed components/landing/GalaxyBackdrop.tsx `interactiveFloor={0.58}` 전달 → `.ridge`(산)가 히어로 높이의 58% 를 차지해 42% 지점부터 시작하는 것과 맞물린 값이다. 산 높이(NightSky.module.css 의 clamp 값)를 바꾸면 이 숫자도 같이 볼 것
- rule app/hallmark.css `.pipe`(3번 섹션 좌측 파이프라인 칸)에 `min-width:0` 이 없어서 포트 설명 문장(특히 Driver, 가장 길다)이 줄바꿈 대신 그리드 칼럼 자체를 넓혔다 — 부모 `.engine-stage-panel` 은 `min-width:0` 이 있었지만 그 자식인 `.pipe` 에는 없었다 → 그리드/플렉스 아이템 안에 긴 텍스트를 넣을 때는 그 아이템 자신에 `min-width:0` 이 있는지 확인할 것. 부모에 있다고 안전하지 않다
- changed app/hallmark.css `.pipe-note`(선택한 포트 설명) min-height 3em→6em, `.engine-log`(실행 로그) min-height 7.5em→13em → 포트를 바꾸거나 재생하는 동안 오른쪽/왼쪽 패널 높이가 안 흔들린다
- changed lib/i18n.ts 한국어 문구 다수 정리 — 직역투 제거(할 일에서/부터 시작합니다→테스트 케이스 하나로 시작합니다, 된 것을 남깁니다→성공한 케이스를 남깁니다 등), Workflow 탭 라벨을 경로 분석/경로 저장/재실행/자가 치유로, 3번 섹션 제목을 "당신의 개발환경 아래에서, Cairn의 파이프라인."으로 의역, heal 부제를 질문형("버튼의 위치가 바뀌었다구요?")으로(영어도 "The button moved?"로 맞춤) → 한국어 카피를 더 고칠 때 참고. 히어로 타이틀(Find a path. / Run it again.)은 브랜드 슬로건으로 보고 한국어에서도 영어 그대로 두기로 결정됨(사용자가 직접 되돌림)
- changed components/landing/NightSky.module.css 안개 두 겹 속도 32s/50s → 21s/33s(1.5배), 앞서 96 → 40 → 21s 로 여러 차례 조정됨
- rule 안개/별 파라미터를 조정할 때 세션 스크래치의 생성 스크립트에 의존하지 말 것 — 스크립트가 실제 커밋된 PNG 와 다른 버전으로 갈라져 있어서 잘못 재생성한 사고가 있었다(즉시 git checkout 으로 복원함, PNG 자체는 안 바뀜). PNG 를 다시 굽지 않고 CSS(opacity/속도/마스크)만 조정하는 편이 안전하다

## 남은 것
- `vgpu` 의존성 여전히 미사용(package.json, 허브 파일) — 별도 chore PR 필요(앞 저널에서도 언급)
- 320/375/768px 실기기 반응형 미검증 — scroll-margin-top, min-height 값들을 좁은 화면에서 한 번 확인할 것
- 한글 웹폰트·`/ko` 라우트는 여전히 미결정
- 안개 생성 스크립트를 리포에 정식으로 넣을지 결정 필요(지금은 세션 스크래치에만 있어 재현이 안전하지 않음)
- PR 을 main 에 올림 — 검토 부탁
