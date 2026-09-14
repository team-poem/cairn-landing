# codex/landing-bootstrap · Kangmin_Kim · 2026-09-14
- claim: collab/active/codex--landing-bootstrap/claim.md

## 이벤트
- added components/landing/ Hero·Workflow·Features·GetStarted 섹션을 분리했다 → 후속 작업은 담당 섹션 파일에서 시작할 것
- added lib/cairn.ts 공식 링크를 모았다 → 문서·저장소 링크는 여기서 가져올 것
- dep package.json Sites 0.3.0 스타터의 Vinext·React·shadcn 구성을 도입했다 → npm ci 후 dev·typecheck·lint·build를 사용할 것
- rule app/globals.css 공통 CSS와 레이아웃·의존성·Sites 설정은 허브 파일이다 → 수정 전에 next 선언 및 digest 확인
- rule .openai/hosting.json 정적 dist/client만 배포한다 → 프로젝트 ID를 재사용하고 서버 산출물을 포함하지 말 것
- changed tests/hooks.sh setup 테스트에 미초기화 AGENTS.md fixture를 명시했다 → 실제 앱의 초기화 여부와 독립적으로 검사됨
- added docs/collaboration-pilot.md 작업 후보와 두 사람 실전 검증 순서를 남겼다 → 공통 기반 PR 머지 후 각자 별도 클론에서 claim을 선언할 것
- rule docs/content-sources.md 터미널은 사용 예제이고 기본 재생과 AI 판정을 구분한다 → 보장되지 않은 성능·비용 수치를 추가하지 말 것

## 검증
- npm run typecheck, npm run lint, npm run build 통과.
- npm test: hooks 71, loop 30, sobaya 32, 합계 133개 통과.
- state=ready, git 훅 활성화. 로컬 첫 화면 HTTP 200 확인.
- 브라우저 시각·상호작용 QA와 두 사람의 실전 협업은 아직 수행하지 않음.

## 남은 것
- 팀원 리뷰 1명과 CI 통과 후 기반 PR squash 머지. 후속 섹션 담당자는 아직 미배정.
- 공식 스타터 의존성 audit 11건(높음 8 포함) 업데이트 검토. 정적 배포가 개발·빌드 의존성 경고를 해소하지는 않음.
- 템플릿 개선 후보: main의 봇 prune을 받아올 때 타 claim 보호 훅에 막히고 pulse가 빈 충돌 목록으로 표시됨. 최신 main에서 대체 브랜치를 만들어 해결했으며 하네스 본체는 수정하지 않음.
- sobaya는 이번 저장소에 결합하지 않음. 실제 케언 엔진을 실행하는 데모도 포함하지 않음.
