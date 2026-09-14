# feat/i18n-korean · Gyuhwan_Jeong · 2026-09-14 (2)
- claim: collab/active/feat--i18n-korean/claim.md
- 앞 저널: 2026-09-14-Gyuhwan_Jeong-i18n-korean.md (언어 전환·사전 분리). 이 저널은 그 뒤 히어로·Workflow·3번 섹션·푸터·성능·반응형 작업.

## 이벤트
- changed app/page.tsx Features 섹션이 사라지고 GetStarted 가 3번 섹션 전체(엔진 소개 + 설치)를 맡는다. 페이지는 히어로 → Workflow → GetStarted + 푸터 세 화면 → 섹션을 더할 때 page.tsx 와 SectionNav 의 sections 배열, i18n nav 를 함께 고칠 것
- removed components/landing/Features.tsx AeroBackdrop.tsx AeroBackdrop.module.css reactbits/AeroShards.* Aero Shards(WebGPU) 배경과 그 컴포넌트를 뺐다 → `ogl` 은 Galaxy 가 쓰지만 `vgpu` 는 이제 아무도 안 쓴다. package.json 이 허브 파일이라 두었으니 의존성 정리 PR 에서 빼기
- changed app/hallmark.css 헤더가 `position: fixed`. 24px 이상 스크롤하면 `data-scrolled` 로 배경·밑선·backdrop blur → 섹션 상단 패딩에 `--header-height` 를 더해 둘 것 (60rem 아래 64px)
- rule app/hallmark.css `html { scroll-snap-type: y mandatory }`(60rem 아래 proximity)와 섹션마다 `scroll-snap-align: start; scroll-snap-stop: always`. 마지막 칸은 GetStarted + 푸터(`scroll-snap-align: end`) → 새 섹션은 스냅 목록에 넣고, 마지막 섹션에 100svh 를 주면 푸터 스냅이 사라진다
- changed components/landing/Hero.tsx 좌우 2단(왼쪽 돌무더기, 오른쪽 문구 `.night-copy`), `id="top"`, 첫 줄은 `Cairn` 툴팁(Base UI Tooltip, `.night-name`) → eyebrow 문구는 `hero.name` + `hero.eyebrow` + `hero.nameMeaning` 세 키
- changed lib/cairn-artwork.ts 능선·별·유성·점선을 뺐고 돌만 남았다. viewBox `165 105 350 425`, 클릭 영역은 interactions.css 의 % 로 재계산 → viewBox 를 바꾸면 `.sculpture-hit` 좌표도 같이
- added public/cairn-ridge.svg 히어로 바닥 전체 폭 산맥. fBm 노이즈로 생성(스크립트는 세션 스크래치, seed 고정) → 손으로 좌표를 찍지 말 것. 바꾸려면 생성 스크립트를 리포에 넣는 것부터
- added public/cairn-mist-a.png cairn-mist-b.png 산 위를 흐르는 안개 비트맵(값 노이즈, 가로 주기적). `.mist` 두 겹이 `background-repeat` 로 흘러간다 → SVG 필터 배경은 Chrome 이 GPU 타일마다 다시 래스터해 사각 띠가 생기니 비트맵을 유지할 것. Perlin+워핑·한 장 타일링(6a6eefb, 600b1f1)은 사용자 판단으로 되돌렸다
- changed components/landing/NightSky.module.css `.sky` 의 mask 를 img 로 옮겼다(스택 컨텍스트가 `.galaxy` 의 screen 블렌드를 막았다). `.galaxy` `.mist` 는 `mix-blend-mode: screen`. Galaxy 캔버스는 `.galaxyScale` 로 62.5% 해상도 → 별 밝기를 만질 때 마스크·블렌드 구조를 깨지 말 것
- changed components/landing/GalaxyBackdrop.tsx Galaxy 파라미터(밀도 3.2·광채 1.35·마우스 반발), 하늘 드리프트 48s/72s, 안개 데이터-active 로 pause 연동 → "Pause sky" 가 별·안개·흐름을 함께 멈춘다
- changed components/landing/CairnSculpture.tsx 붕괴·복구가 키프레임(`sculpture-topple` `sculpture-restack`), SVG 는 memo 로 격리(카운트다운 리렌더가 애니메이션을 재시작했다), ready 전환 2.6s → 애니메이션 길이를 바꾸면 타이머도
- added components/landing/SectionNav.tsx 왼쪽 세로 중앙 선 네비(60rem 아래 숨김). 화면 가운데 10% 띠에 걸린 섹션이 현재 → 섹션 id 는 `top` `workflow` `get-started`
- changed components/landing/Workflow.tsx 주 버튼 하나(실행/일시정지/다음 단계), "n / 4 단계" 라벨, Heal 은 실패 표시 → 탐색 광선 → `~~click("Cart")~~ click("View bag")` → `.flow-story` 의 `position: sticky` 를 뺐다(명령 블록과 겹쳤다). 단계별 높이가 안 흔들리게 각 자리에 최소 높이
- changed components/landing/ShopDemo.tsx 커서가 `[data-target]` 버튼을 재서 CSS 변수(`--cursor-x/y`)로 간다 → 고정 퍼센트로 되돌리지 말 것. 새 타깃은 `sample-target` + `data-target` 만 주면 된다
- changed components/landing/GetStarted.tsx 3번 섹션은 2번과 같은 작업대: 왼쪽 포트 탭 6개, 오른쪽 파이프라인 5단계 + 재생 + 출력, 바닥에 설치. 파이프라인 카드를 누르면 담당 포트 탭이 선택되며 튄다(Web Animations) → 포트·단계 문구는 `features.stages/ports`, 실행 문구는 `engine.*`. 클래스 `engine-ports` 는 옛 규칙과 충돌해 `engine-port-list` 로 썼다
- changed components/landing/SiteFooter.tsx 워드마크+태그라인, 제품·Poem 링크 열, 아래 줄 "Copyright © 2026 Poem. All rights reserved." + MIT 고지 → `footer.*` 키
- changed lib/cairn.ts `bench` `readme` `team` 링크 추가 → 링크는 여기서만
- changed app/layout.tsx(허브) metadata description 의 "browser testing" → "agentic testing". 다른 변경 없음
- changed lib/i18n.ts "Browser testing" → "Agentic testing"(한국어 "에이전틱 테스팅"), `nav` `engine` 블록 추가, `features.details/motion*` 등 안 쓰는 키 제거 → 사전 키를 지울 때 Workflow 에 같은 이름(`codeLabel` `illustrative`)이 있으니 블록 범위로
- changed components/landing/LocaleProvider.tsx 언어 전환은 `document.startViewTransition` + `flushSync` 크로스페이드, 같은 언어 재선택은 무시
- rule 정규식으로 CSS 를 지우지 말 것. 셀렉터 목록 마지막만 걸려 앞 셀렉터가 다음 규칙에 붙은 사고가 있었다(1b0e19a). 줄 단위·블록 단위로

## 남은 것
- `vgpu` 의존성 제거(package.json 허브) — 별도 chore PR
- 320/375/768px 실제 렌더 미검증. 브라우저 확장이 localhost 를 못 열어 스크린샷은 사용자가 찍었다. 반응형은 CSS 기준으로만 넣었다
- 한글 웹폰트 미결정(기기 글꼴 스택 `--font-ko`)
- 한국어 SEO(/ko 라우트) 미결정 — 앞 저널의 ask 그대로
- 산·안개 생성 스크립트가 세션 스크래치에만 있다. 다시 만질 일이 생기면 `scripts/` 로 옮겨 커밋할 것
