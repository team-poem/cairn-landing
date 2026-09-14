# feat/i18n-korean · Gyuhwan_Jeong · 2026-09-14
- claim: collab/active/feat--i18n-korean/claim.md

## 이벤트
- added lib/i18n.ts 랜딩 문구 전체를 en·ko 사전으로 모았다 → 화면에 문구를 새로 쓸 때 JSX 에 직접 넣지 말고 두 언어를 함께 추가할 것. 타입이 `Copy = typeof en` 이라 en 에 키를 더하면 ko 가 타입 에러로 빠진 번역을 알려준다
- added components/landing/LocaleProvider.tsx 언어 상태와 `useI18n()` → 섹션 컴포넌트는 이걸로 문구를 읽을 것. 별도 컨텍스트를 만들지 말 것
- added components/landing/LanguageToggle.tsx 헤더 EN·KO 토글 → 언어 선택 UI 를 새로 만들지 말 것
- added components/landing/SiteHeader.tsx SiteFooter.tsx app/page.tsx 의 헤더·푸터를 클라이언트 컴포넌트로 분리했다 → 헤더·푸터 수정은 page.tsx 가 아니라 이 두 파일에서 할 것
- changed components/landing/ Hero·Workflow·Features·GetStarted·ShopDemo·CairnSculpture·AeroBackdrop 이 문구를 `useI18n()` 에서 읽는다. Features·GetStarted 는 이 때문에 'use client' 가 됐다 → 문구 수정은 컴포넌트가 아니라 lib/i18n.ts 에서 할 것
- changed components/landing/Workflow.tsx 단계 배열이 id·title·command 만 갖고 설명·버튼은 사전에서 온다 → 단계 문구를 고칠 때 `t.workflow.phases.<id>` 를 볼 것. CLI 명령과 Discover/Freeze/Replay/Heal 이름은 실제 명령이라 두 언어에서 같다
- rule components/landing/ShopDemo.tsx 샘플 앱의 버튼 글자와 동작 기록 코드는 두 언어에서 영어다 → `click("Log in")` 이 화면 버튼 글자를 가리키는 구조이므로 한쪽만 번역하지 말 것. 캡션·상태 문구와 경로 목록만 번역 대상
- rule lib/i18n.ts 기본 재생은 모델 호출 없음, 탐색·복구·AI 판정은 호출 가능 → 한국어 문구를 고칠 때도 이 구분을 지킬 것 (docs/content-sources.md)
- changed tokens.css `--font-ko` 한글 글꼴 스택 추가, app/hallmark.css `:lang(ko)` 에서 display·body 글꼴과 제목 자간·`word-break: keep-all` 적용 → 자체 호스팅 글꼴이 라틴 서브셋이라 한글은 기기 글꼴로 떨어진다. 한글 웹폰트를 넣게 되면 이 토큰을 바꿀 것
- rule 언어 선택은 localStorage(`cairn-locale`)와 `?lang=ko` 로 복원한다. 정적 배포라 첫 렌더는 항상 영어이고 useSyncExternalStore 로 하이드레이션 뒤 전환한다 → 라우트 분리(/ko)로 바꾸려면 이 구조를 먼저 걷어낼 것
- ask @Kangmin_Kim 한국어판 SEO 를 어디까지 볼지 정해야 합니다. 지금은 app/layout.tsx(허브 파일)를 건드리지 않아 metadata 와 프리렌더 HTML 이 영어 하나입니다. /ko 라우트로 나누면 색인은 되지만 파일 구조가 바뀝니다

## 남은 것
- 사용자 화면 확인 대기 중. 카피·토글 위치 피드백 뒤 PR 예정
- 한글 웹폰트 미결정. 서브셋해도 수백 KB라 package.json·public/fonts 추가가 필요해 별도 판단 사항
- 브라우저 실렌더 검증 미완: 320/375/768px 에서 한국어 제목 줄바꿈과 헤더의 토글+GitHub 링크가 좁은 화면에서 겹치는지 확인 필요. typecheck·lint·build·npm test 32개는 통과
- 이 머신 npm 설정에 `os=linux` 가 있어 `npm ci` 가 macOS 네이티브 바이너리를 건너뛴다. `npm ci --os=darwin --cpu=arm64` 로 우회함 (개인 환경 문제, 리포와 무관)
