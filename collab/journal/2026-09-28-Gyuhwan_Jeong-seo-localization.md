# codex/seo-localization · Gyuhwan_Jeong · 2026-09-28
- claim: collab/active/codex--seo-localization/claim.md

## 이벤트
- changed app/(en)/ app/(ko)/ko/ 언어별 루트 레이아웃에서 HTML lang·메타데이터·초기 본문을 생성 → 공통 화면 변경은 components/landing/LandingPage.tsx, 공통 문서는 LandingDocument.tsx, 검색 메타데이터는 lib/metadata.ts에서 수정.
- changed components/landing/LocaleProvider.tsx locale 필수 prop, URL 언어가 기준이며 localStorage 자동 전환 제거 → 한국어 링크는 /ko/ 사용, 기존 ?lang=ko는 다른 쿼리·해시를 보존해 이동.
- changed components/landing/LanguageToggle.tsx 실제 언어 주소로 이동하는 링크 → locale setter 대신 URL 탐색, aria-current 스타일 유지.
- changed components/landing/StructuredData.tsx locale별 사전·페이지 ID·설명·번역 주소를 사용하고 뉴스용 speakable 제거 → 영문·한글 본문과 JSON-LD를 함께 검증.
- changed scripts/prepare-pages.py ko.html을 ko/index.html로 포장 → vinext beta trailingSlash=true에서 한국어 export가 누락되므로 기본 export 유지. ko.rsc 원본과 디렉터리 사본 유지.
- added tests/check-seo.py 실제 export HTML의 언어·제목·canonical·hreflang·OG·JSON-LD·사이트맵·robots·언어 링크 검사 → landing-check의 기본·Pages 빌드 모두 실행.
- added docs/search-visibility.md 공개 응답 확인 결과와 Search Console 후속 절차 → HTTP 200 또는 llms.txt 존재를 실제 색인·AI 인용으로 보고하지 않음.
- reply @Kangmin_Kim 한국어 SEO 보류 항목을 사용자 요청으로 구현 → app 루트가 언어별 route group으로 이동하며 공통 화면·에셋 경로는 유지.

## 검증
- npm run typecheck, npm run lint, npm test 통과 (demo 5, hooks 71, loop 30, sobaya 32).
- 기본 및 NEXT_PUBLIC_BASE_PATH=/cairn-engine 빌드 성공, 정적 경로·SEO 검사 통과. 페이지 둘과 404 생성, 누락 0.
- python3 tests/pages-dispatch.test.py: 10개 통과.
- 임시 Chromium + Pages 정적 서버: JS 없이 EN/KO 본문, 언어 전환 왕복, legacy 쿼리·해시 유지, 새로고침, URL 언어 우선 통과. 페이지 런타임 예외·HTTP 404 없음.
- 변경 전 공개 HTML·루트 robots·sitemap·llms HTTP 200 확인. Google 소유 확인 태그 보존.

## 남은 것
- PR 리뷰·머지 및 실제 배포. 배포 후 /ko/와 source-sha.txt 확인 필요.
- Search Console 계정 내부 수집·색인 상태는 접근하지 못함. 배포 후 소유자가 기존 사이트맵의 수집 결과를 확인하고 EN/KO URL 검사·색인 요청.
- 외부 Schema.org Validator·Rich Results Test 인증, AI 인용 성과는 확인하지 않음. 구조화 데이터가 리치 결과·AI 인용을 보장하지 않음.
