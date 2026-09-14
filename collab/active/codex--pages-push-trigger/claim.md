---
branch: codex/pages-push-trigger
owner: Kangmin_Kim
started: 2026-09-15
status: active
goal: Cairn을 /cairn-engine 경로로 배포하고 main 자동 호출을 연결한다
next: next.config.ts lib/site-path.ts app/layout.tsx components/landing/SiteHeader.tsx components/landing/GalaxyBackdrop.tsx .github/workflows/landing.yml README.md tests/check-static-paths.py
---

## 메모
- 사용자 요청: 실행되지 않는 조직 Pages 자동 재배포 수정.
- Pages 저장소의 cron 단독 의존을 제거하고 소스 main 검증 후 배포 workflow를 직접 호출한다.
- 앱·언어·스타일 파일은 이번 작업 대상이 아니다. 동료 i18n 작업과 편집 충돌 없음.
- 받은 한국어 SEO 질문은 사용자에게 전달하며 라우트 변경은 이번 배포 수정에서 다루지 않는다.

- 사용자 요청: 공개 주소를 https://team-poem.github.io/cairn-engine/로 변경하고 진행 PR에 반영. 기존 Sites·로컬 루트 빌드는 유지하고 Pages 빌드에만 basePath 적용.
