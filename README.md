# Cairn Landing

Poem의 브라우저 테스트 엔진 [Cairn](https://github.com/team-poem/cairn)을 소개하는 영문 랜딩입니다.
협업 하네스 v0.0.8을 실제 팀 개발에 적용하는 첫 프로젝트입니다.

## 실행

Node.js 24 이상을 권장합니다. Cairn 엔진 자체의 요구 버전과 랜딩 개발 환경은 별개입니다.

```sh
npm ci
npm run dev
npm run typecheck
npm run lint
npm run build
npm start
npm test
```

`npm test`는 협업 하네스의 훅·루프·sobaya 통합 테스트입니다. 랜딩은 정적 콘텐츠로, 타입 검사와 lint 및 정적 빌드를 함께 확인합니다. lint는 직접 관리하는 앱·랜딩·공용 소스와 설정을 검사하며, 스타터에서 제공한 미사용 UI 카탈로그는 그대로 보존합니다.
`npm start`는 빌드된 `dist/client`를 로컬에서 제공합니다.

## 팀 합류

이 저장소를 클론하고 이 폴더에서 에이전트 세션을 여세요. `onboard` → `start-work` → 구현 → `handoff` 순서로 진행합니다.
처음 한 번 `sh harness/join.sh <핸들>`로 git 훅과 협업 핸들을 설정할 수 있습니다.

- 협업 규칙: [AGENTS.md](AGENTS.md)
- 첫 작업 분담과 검증 절차: [docs/collaboration-pilot.md](docs/collaboration-pilot.md)
- 문구의 출처: [docs/content-sources.md](docs/content-sources.md)
- 하네스 사용법: [docs/guide.md](docs/guide.md)

## 구성

- `app/page.tsx`: 섹션 조립, 헤더, 푸터
- `components/landing/`: Hero, Workflow, Features, GetStarted 섹션
- `app/globals.css`: 공통 스타일과 반응형 규칙
- `lib/cairn.ts`: 공식 링크
- `.openai/hosting.json`: Sites 프로젝트와 정적 산출물 설정

첫 PR은 공통 기반입니다. 리뷰 후 squash 머지하고, 팀원은 최신 main에서 각자 작업을 시작합니다.
현재 sobaya는 결합하지 않았습니다. 협업 하네스의 기본 루프부터 검증합니다.

## 조직 GitHub Pages 배포

공개 주소는 [team-poem.github.io/cairn-engine/](https://team-poem.github.io/cairn-engine/)입니다. 기존 루트 주소는 쿼리와 해시를 보존해 새 주소로 이동합니다.

소스는 이 저장소의 `main`, 배포 워크플로는 [team-poem/team-poem.github.io](https://github.com/team-poem/team-poem.github.io)의 `.github/workflows/pages.yml`에서 관리합니다. Pages Source는 GitHub Actions입니다. 검증·빌드가 실패하면 기존 사이트를 유지합니다.

Pages 빌드는 아래와 같습니다. `SOURCE_SHA`는 실제 체크아웃한 소스 커밋입니다.

```sh
NEXT_PUBLIC_BASE_PATH=/cairn-engine npm run build
SOURCE_SHA=$(git rev-parse HEAD) python3 scripts/prepare-pages.py
python3 tests/check-static-paths.py dist/pages /cairn-engine
```

`dist/pages`를 조직 Pages의 루트에 업로드합니다. 랜딩·번들·이미지·폰트는 `cairn-engine/` 아래에, 기존 주소의 이동 페이지는 루트에 위치합니다. 배포 커밋은 `/cairn-engine/source-sha.txt`에서 확인합니다. `dist/client`를 그대로 올리거나 다시 `cairn-engine/`로 감싸지 않습니다.

현재 Vinext에서는 `basePath`를 설정하면 정적 프리렌더가 루트 HTML을 누락합니다. 따라서 `assetPrefix`와 public 에셋 URL 처리를 사용합니다. 새 public 이미지의 JSX 경로는 `lib/site-path.ts`의 `sitePath()`를 사용하세요. CSS의 public URL은 Vite 설정이 처리합니다. 라이브러리를 업그레이드할 때는 루트·하위 경로 빌드 검증을 모두 유지해야 합니다.

환경 변수를 생략한 `npm run build`는 기존 루트 경로를 사용합니다. 로컬 개발과 Sites의 `dist/client` 설정은 유지합니다. 정적 배포이므로 서버 API는 제공하지 않습니다.

### 재배포 상태

수동 재배포는 아래 명령으로 실행합니다.

```sh
gh workflow run pages.yml --repo team-poem/team-poem.github.io --ref main
```

Pages 저장소의 5분 스케줄은 보조 변경 감지용이며, 실제 예약 실행이 확인되지 않아 자동 재배포를 보장하지 않습니다. [PR #6](https://github.com/team-poem/cairn-landing/pull/6)은 소스 main의 `landing-check` 성공 후 Pages를 직접 호출하고 배포 결과를 확인하도록 전환하는 별도 작업입니다.

직접 호출에는 전용 GitHub App의 배포 저장소 Actions 읽기·쓰기 권한과 소스 저장소의 `PAGES_APP_CLIENT_ID` 변수·`PAGES_APP_PRIVATE_KEY` secret이 필요합니다. App 권한 승인·설정과 PR 리뷰는 아직 완료되지 않았습니다. 개인 계정 토큰을 CI에 복사하지 않습니다.
