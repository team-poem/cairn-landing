# codex/handwritten-landing · Kangmin_Kim · 2026-09-14
- claim: collab/active/codex--handwritten-landing/claim.md

## 이벤트
- changed app/globals.css 손글씨·종이색·먹색·낙관색으로 전역 테마와 반응형 레이아웃을 바꿨다 → 후속 섹션도 같은 토큰과 제목 글꼴을 사용할 것
- added components/landing/Handwritten.tsx 글자별 등장과 SVG 밑줄 컴포넌트를 추가했다 → 제목 애니메이션에 재사용하고 모션 감소 설정을 유지할 것
- changed components/landing/Workflow.tsx 탐색·저장·재생·복구 탭과 유한한 설명용 실행 상태를 추가했다 → 실제 엔진 실행으로 소개하지 말 것
- added public/fonts/ Google Fonts 공식 Nanum Brush Script 부분 글꼴과 OFL을 자체 호스팅한다 → 손글씨 문구 추가 시 글꼴 문자 범위도 갱신할 것
- rule docs/content-sources.md 참고 컴포넌트·글꼴 근거와 데모 범위를 남겼다 → 실제 JSON 스키마나 엔진 성능으로 오인할 문구를 넣지 말 것

## 검증
- npm run typecheck, npm run lint, npm run build 통과.
- npm test: hooks 71, loop 30, sobaya 32, 총 133개 통과.
- git diff --check 통과. 개발 URL 정상 HTTP 200 확인.
- 브라우저 시각·상호작용 QA는 요청 범위에 없어 수행하지 않았다.
- 자동 승인 검토가 이전 bootstrap WIP를 현재 편집으로 판단해 첫 변경을 거부했다. status done, WIP-parent diff 없음, 현재 HEAD에 기반 전체 포함을 확인하고 재검토 후 승인되었다. 실제 동료 미커밋 변경은 없다.

## 남은 것
- 기반 PR #1이 미머지여서 이 PR은 codex/landing-bootstrap 위에 쌓는다. 기반 PR squash 머지 후 후속 PR의 기준과 diff를 확인할 것.
- GitHub 팀 리뷰와 머지는 남겨둔다. 기존 공개 Sites 주소에 배포하는 것은 사용자 요청 범위다.
