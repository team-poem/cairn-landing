# codex/handwritten-landing · Kangmin_Kim · 2026-09-14 · 별빛 보강
- claim: collab/active/codex--handwritten-landing/claim.md

## 이벤트
- added public/cairn-sky.svg 원본 배너의 별 모티프를 히어로 전체로 확장했다 → 정지 SVG와 함께 유지할 것
- added components/landing/NightSky.module.css 별빛·옅은 광채를 별도 레이어로 구성했다 → 텍스트 뒤의 낮은 밝기와 하단 마스크를 유지할 것
- changed components/landing/Hero.tsx 기존 모션 토글로 별빛 배경도 제어한다 → 모션 감소 설정에서는 정지본을 사용할 것

## 검증
- 타입 검사·린트·배포 빌드·git diff --check 통과.
- npm test: hooks 71, loop 30, sobaya 32, 총 133개 통과.
- 개발 URL HTTP 200 확인. 웹페이지 브라우저 시각·상호작용 QA는 요청하지 않아 수행하지 않았다.

## 남은 것
- 기존 PR #2와 기반 PR #1의 팀 리뷰·squash 머지는 남겨둔다.
- 공개 Sites 주소에 같은 컨셉의 별빛 보강 버전을 배포한다.
