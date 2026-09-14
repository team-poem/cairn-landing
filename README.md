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

- 공개 주소: https://team-poem.github.io/
- 소스: 이 저장소의 `main`. PR에서는 기존 `landing-check`로 검증합니다.
- 배포 설정: [team-poem/team-poem.github.io](https://github.com/team-poem/team-poem.github.io)의 `.github/workflows/pages.yml`. 배포용 저장소이며 랜딩 소스는 이 저장소에서 수정합니다.
- 자동 재배포: Pages 저장소가 5분 주기로 main 커밋과 공개 사이트의 `source-sha.txt`를 비교합니다. 변경이 있으면 정확한 커밋을 체크아웃해 타입·린트·데모 검사와 빌드를 실행하고 `dist/client`를 Pages에 배포합니다. GitHub 스케줄은 부하에 따라 지연될 수 있습니다.
- 인증: 추가 secret, 개인 토큰, deploy key 없이 GitHub Actions 기본 토큰과 Pages OIDC를 사용합니다. 조직 정책에서 deploy key 등록이 금지되어 있어 변경 감지 방식으로 구성했습니다.
- 수동 재배포: `gh workflow run pages.yml --repo team-poem/team-poem.github.io --ref main`. 변경이 없어도 다시 빌드·배포합니다.
- 배포 상태: Pages 저장소 Actions의 `Cairn Pages`와 `github-pages` 환경에서 확인합니다. 검증·빌드 실패 시 현재 사이트를 유지합니다.
- Pages 설정: 배포 저장소 Settings → Pages → GitHub Actions. 동시에 여러 배포가 덮어쓰지 않도록 워크플로 실행을 직렬화합니다.
- 기존 Sites 설정은 유지합니다. GitHub Pages는 `dist/client`만 제공하며 서버 코드나 런타임 API를 실행하지 않습니다.
