# feat/snap-fit · Gyuhwan_Jeong · 2026-09-16 (2)
- claim: collab/active/feat--snap-fit/claim.md

## 이벤트
- added lib/site.ts 공개 주소(`siteUrl` = https://team-poem.github.io/cairn-engine)·제목·설명·키워드·OG 이미지·언어별 URL 상수 → canonical, OG, JSON-LD 처럼 절대 주소가 필요한 곳은 여기서 가져온다. 배포 주소가 바뀌면 이 파일 한 곳과 public/robots.txt·sitemap.xml·manifest.webmanifest 의 절대 경로를 같이 바꿀 것
- added components/landing/StructuredData.tsx schema.org JSON-LD(@graph: Organization·WebSite·WebPage·SoftwareApplication·HowTo). 내용은 `dictionaries.en` 의 화면 문구에서만 만든다 → 문구 키(`hero.*`, `workflow.phases.*`, `features.ports.*`)를 지우거나 이름을 바꾸면 여기도 깨진다. 보이지 않는 내용을 구조화 데이터에만 넣지 말 것
- changed app/layout.tsx `metadata` 가 전체 SEO 세트(canonical, hreflang en/ko/x-default, robots, OG, Twitter, 아이콘 3종, manifest, appleWebApp)와 `viewport`(theme-color, color-scheme) 를 낸다. 같은 사이트 파일 href 는 `sitePath()` 로 → 정적 경로 검사가 `<link href>` 접두사를 보므로 새 아이콘·manifest 도 sitePath 로. vinext 는 `robots.nocache: false` 를 `nonocache` 로 잘못 내보내니 그 키는 쓰지 말 것
- added public/og.png(1200×630)·icon-192/512.png·apple-touch-icon.png·manifest.webmanifest·robots.txt·sitemap.xml·llms.txt → 문구·주소가 바뀌면 sitemap `lastmod` 와 llms.txt 를 갱신. OG 이미지는 헤드리스 크롬으로 HTML 을 찍어 만들었다(스크립트는 커밋 안 함)
- changed scripts/prepare-pages.py `robots.txt` 를 Pages 루트(dist/pages/robots.txt)에도 복사하고 루트 이동 페이지에 description 을 넣었다 → robots 는 도메인 루트에서만 읽히므로, 조직 Pages 루트에 다른 사이트가 생기면 이 파일의 `Allow`·`Sitemap` 줄을 합쳐야 한다
- rule 검색 확인 토큰은 `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` 환경 변수로 넣는다(없으면 태그 생략). 배포 워크플로 env 에 추가하면 된다

## 남은 것
- 배포 후 할 일: Google Search Console 에 https://team-poem.github.io/cairn-engine/ 등록, sitemap 제출, Rich Results 테스트로 SoftwareApplication·HowTo 확인. 확인 토큰이 나오면 위 env 로
- FAQPage 스키마는 화면에 FAQ 가 없어서 넣지 않았다. AEO 를 더 밀려면 눈에 보이는 FAQ 섹션이 먼저다(스냅 칸 예산과 충돌하니 푸터 위 `<details>` 정도)
- 한국어 페이지는 `?lang=ko` 로 hreflang 만 걸었다. 검색 엔진이 별도 문서로 색인하려면 `/ko/` 정적 라우트가 필요하다(이전 저널의 미결 항목과 같다)
- `vgpu` 미사용 의존성 제거는 package.json 허브 파일이라 별도 chore PR
