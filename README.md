# Cairn Landing

Poem의 브라우저 테스트 엔진 [Cairn](https://github.com/team-poem/cairn)을 소개하는 한국어 랜딩입니다.
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
