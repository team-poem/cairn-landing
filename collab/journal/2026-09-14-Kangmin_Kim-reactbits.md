# codex/handwritten-landing · Kangmin_Kim · 2026-09-14
- claim: collab/active/codex--handwritten-landing/claim.md

## 이벤트
- changed components/landing/Hero.tsx 별 배경을 React Bits Galaxy로 교체 → 기존 Hero 모션 토글과 정지 SVG 대체 배경을 유지할 것.
- added components/landing/AeroBackdrop.tsx 엔진 소개에 Aero Shards 배경과 모션 버튼 추가 → WebGPU 미지원·실패 시 본문과 기본 배경을 보존할 것.
- dep package.json ogl 1.0.11·vgpu 0.3.1 추가 → 잠금 파일로 설치하고 장식 효과의 지연 로딩을 유지할 것.
- rule public/licenses/react-bits-LICENSE.md 공식 원본의 MIT + Commons Clause 고지 포함 → 소스 재사용 시 전체 라이선스를 유지할 것.
- changed components/landing/reactbits 원본 셰이더를 유지하며 React ref 갱신을 layout effect로 이동하고 공개 GPU 타입 사용 → 원본 업데이트 시 통합 수정과 모션·실패 처리를 확인할 것.

## 검증
- npm run typecheck, npm run lint, npm run build 통과.
- npm test: hooks 71개, loop 30개, sobaya 32개 통과(총 133개).
- 로컬 서버 HTTP 200 확인. 브라우저 렌더링·GPU 실기기 검증은 수행하지 않음.

## 남은 것
- GitHub PR #2는 #1 위의 draft 유지. 팀 검토 후 squash merge 필요.
- Aero Shards의 지원 범위는 WebGPU 사용 가능 브라우저이며 그 외에는 정적 배경을 제공함.
