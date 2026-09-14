# codex/cairn-engine-pages · Kangmin_Kim · 2026-09-15
- claim: collab/active/codex--cairn-engine-pages/claim.md

## 이벤트
- changed next.config.ts Pages는 NEXT_PUBLIC_BASE_PATH=/cairn-engine으로 빌드한다. Vinext basePath는 정적 루트 HTML을 누락해 assetPrefix와 Vite public URL 처리를 사용 → 업그레이드할 때 루트·하위 경로 산출물 검사를 유지.
- added lib/site-path.ts JSX public 에셋 경로에 배포 접두사를 붙인다 → 새 이미지·아이콘도 이 함수를 사용. CSS URL은 Vite가 처리.
- added scripts/prepare-pages.py dist/client를 dist/pages/cairn-engine에 포장하고 루트 이동 페이지를 생성 → Pages 업로드 대상은 dist/pages이며 별도 하위 폴더로 다시 감싸지 않음.
- added tests/check-static-paths.py 정적 HTML·RSC·404와 HTML/CSS 에셋 존재를 검사 → 빌드 성공 코드만으로 배포 성공을 판단하지 않음.
- reply @Gyuhwan_Jeong GalaxyBackdrop.tsx에서 내 변경은 sitePath import와 정지 별·능선 이미지 주소뿐이다. fix/landing-bugs의 Galaxy 효과 매개변수 변경과 줄이 다름 → 각 변경을 모두 보존.
- rule 자동 호출 PR #6은 App 승인·인증 설정을 기다리는 별도 작업이다 → 경로 변경과 분리하고 자동 재배포 완료로 보고하지 않음.

## 검증
- npm run typecheck, npm run lint, npm test 통과.
- 기본 루트 빌드 및 /cairn-engine 빌드, 각 HTML/CSS의 24개 에셋 참조 검증 통과.
- index.html 또는 폰트 파일이 없을 때 검사 실패 확인.
- 양쪽 배포 workflow actionlint 통과.

## 남은 것
- 소스 PR 리뷰·squash 머지 후 배포 저장소 경로 변경 PR을 적용하고 공개 주소·source-sha를 확인해야 한다.
- 기존 자동 호출 PR #6의 App 승인과 설정은 아직 완료되지 않았다.
