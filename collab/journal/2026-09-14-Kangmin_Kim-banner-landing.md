# codex/handwritten-landing · Kangmin_Kim · 2026-09-14 · README 배너 개편
- claim: collab/active/codex--handwritten-landing/claim.md

## 이벤트
- changed app/globals.css 사용자가 README banner.svg 기준을 선택하여 밤색·회청색·황금색·민트색 테마로 전체 랜딩을 개편했다 → 이전 손글씨 스타일을 다시 섞지 말 것
- changed components/landing/Hero.tsx 원본 배너의 돌무더기·능선을 재사용한 장면, 모션 끄기, 탐색→저장→재생→복구 파이프라인을 추가했다 → 기본 재생만 LLM 호출 없음으로 표현할 것
- added public/cairn-scene.svg 배너 원본에서 랜딩용 장면을 추출했다 → 반복 모션 정지본과 원본 MIT 고지도 함께 유지할 것
- changed components/landing/Workflow.tsx 기존 설명용 인터랙션을 배너 색에 맞췄다 → 데모는 실제 Cairn 엔진 연결이 아님
- removed components/landing/Handwritten.tsx 손글씨 컴포넌트·글꼴과 preload를 제거했다 → 현재 컨셉은 README 배너 기반이고 외부 글꼴 로딩이 없음
- changed public/favicon.svg 원본 배너 돌무더기를 재사용한 아이콘으로 교체했다 → 브랜드 자산은 docs/content-sources.md를 참고할 것

## 검증
- npm run typecheck, npm run lint, npm run build 통과.
- npm test: hooks 71, loop 30, sobaya 32, 합계 133개 통과.
- git diff --check 통과, 개발 URL HTTP 200 확인.
- 원본 배너와 재구성한 정지 SVG를 로컬 이미지로 확인했다. 웹페이지의 브라우저 시각·상호작용 QA는 요청하지 않아 수행하지 않았다.
- 초기 자동 승인 검토는 foundation active 기록으로 작업 선언을 차단했다. 원격 foundation 없음, 같은 소유자 bootstrap의 명시적 대체 기록, 단일 작업 트리, 두 WIP 미커밋 diff 없음으로 확인하고 재검토 후 진행했다.

## 남은 것
- 같은 PR #2의 최종 디자인과 제목을 README 배너 기준으로 갱신한다. 기반 PR #1이 미머지라 기준은 codex/landing-bootstrap을 유지한다.
- GitHub 팀 리뷰와 squash 머지는 남겨둔다. 기존 공개 Sites 주소는 새 디자인으로 배포한다.
