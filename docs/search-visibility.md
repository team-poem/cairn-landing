# 검색·AI 답변 노출 운영

## 제공하는 주소와 데이터

- 영어: https://team-poem.github.io/cairn-engine/
- 한국어: https://team-poem.github.io/cairn-engine/ko/
- 두 언어 모두 JavaScript 실행 전 본문·제목·설명·html lang을 제공한다.
- 각 페이지는 자기 주소를 canonical로 지정하고, en/ko/x-default hreflang을 서로 연결한다.
- 헤더 언어 선택은 크롤링 가능한 실제 링크다. URL이 언어를 결정하므로 저장소·브라우저 설정에 따라 본문이 바뀌지 않는다.
- 기존 `?lang=ko`/`?lang=en`은 클라이언트에서 해당 경로로 이동하며 다른 쿼리와 해시를 보존한다. GitHub Pages의 서버 측 301은 아니다. 신규 링크는 정식 경로를 쓴다.
- JSON-LD는 Organization·WebSite·WebPage·SoftwareApplication·HowTo를 표현한다. 페이지 설명과 작업 흐름은 해당 언어 사전에서 가져온다. 평가 점수나 리뷰를 만들어 넣지 않는다.
- `llms.txt`는 보조 제품 설명이다. AI 엔진의 사용이나 인용을 보장하지 않는다. 뉴스용 Google Assistant 기능인 speakable은 넣지 않는다. HowTo는 흐름 설명용이며 Google HowTo 리치 결과 지원을 의미하지 않는다.

## 빌드와 검사

```sh
npm run typecheck
npm run lint
npm test
npm run build
python3 tests/check-static-paths.py dist/client
python3 tests/check-seo.py dist/client
NEXT_PUBLIC_BASE_PATH=/cairn-engine npm run build
SOURCE_SHA=$(git rev-parse HEAD) python3 scripts/prepare-pages.py
python3 tests/check-static-paths.py dist/pages /cairn-engine
python3 tests/check-seo.py dist/pages /cairn-engine
```

`landing-check`에서 기본·Pages 빌드 모두 검사한다. 검사 대상은 실제 HTML 본문, 언어 링크, 메타데이터, JSON-LD 의미 일치, sitemap 주소, robots 접근 정책, 이미지 파일이다. 외부 리치 결과 자격 인증이나 성능 점수 측정은 아니다.

vinext 1.0.0-beta.5에서 `trailingSlash: true`는 `/ko` 프리렌더를 조용히 누락했다. 기본 flat export(`ko.html`, `ko.rsc`)를 유지하고 `prepare-pages.py`가 한국어 HTML을 `ko/index.html`로 옮긴다. RSC 파일은 라우터용 `/ko.rsc`와 디렉터리용 `/ko/index.rsc`에 둔다. 패키지 검사에서 한국어 HTML이 빠지면 실패한다. 버전 업그레이드 시 이 우회 처리를 함께 검증한다.

## 실제 배포 후 확인

1. `source-sha.txt`가 배포 대상 커밋인지 확인한다.
2. 영문·한글 주소, sitemap.xml, llms.txt, og.png가 HTTP 200인지 확인한다. 각 페이지 원본 HTML의 언어·canonical도 확인한다.
3. robots.txt의 유효 위치는 **https://team-poem.github.io/robots.txt**다. 하위 경로 사본만으로는 적용되지 않으며 Pages 포장 스크립트가 루트로 복사한다.
4. Search Console에서 기존 사이트맵 URL(`https://team-poem.github.io/cairn-engine/sitemap.xml`)의 수집 상태를 확인한다. 새 사이트맵 URL을 만들 필요는 없다. 필요하면 같은 주소를 재제출한다.
5. URL 검사에서 영문·한글 각각 실제 URL 테스트 → 색인 생성 요청. 이후 Google 선택 canonical과 페이지 색인 상태를 확인한다. 요청 접수가 색인 완료는 아니다.
6. Schema.org Validator로 어휘·타입을 확인하고, Google Rich Results Test로 Google 지원 기능을 확인한다. SoftwareApplication에 리뷰가 없어서 리치 결과 자격이 충족되지 않아도 허위 리뷰를 추가하지 않는다.
7. Bing Webmaster Tools를 운영한다면 동일 사이트맵을 제출한다. 별도 계정 연결·소유 확인은 계정 소유자가 수행한다.
8. Search Console의 검색 노출·클릭, 실제 AI 서비스의 유입 및 인용을 관찰한다. 정적 파일 정상 응답이나 봇 User-Agent를 흉내 낸 요청은 실제 봇 수집·색인·인용의 증거가 아니다.

## 이번 확인 범위 (2026-09-28)

- 변경 전 공개 배포본: 랜딩 HTML, 도메인 루트 robots.txt, sitemap.xml, llms.txt HTTP 200. HTML에 메타데이터 및 JSON-LD가 실제 포함됨.
- 이 브랜치: EN/KO 정적 HTML과 Pages 산출물 자동 검사. 임시 Chromium에서 JavaScript 없이 본문 확인, 언어 전환 왕복, 레거시 링크의 쿼리·해시 보존, 새로고침, 저장된 언어보다 URL 우선 확인.
- Search Console 내부의 사이트맵 처리 결과·색인 상태에는 접근하지 않았다. 머지·배포 전이므로 새 `/ko/`의 운영 반영을 완료로 표시하지 않는다.

## 근거

- [Google AI 검색 최적화 안내](https://developers.google.com/search/docs/fundamentals/ai-optimization-guide): SEO 기본 원칙을 적용하며 특별한 AI schema나 llms.txt를 요구하지 않는다.
- [다국어 사이트](https://developers.google.com/search/docs/specialty/international/managing-multi-regional-sites): 언어별 주소와 명시적 언어 링크.
- [canonical](https://developers.google.com/search/docs/crawling-indexing/consolidate-duplicate-urls): 사이트맵과 canonical 신호의 일관성.
- [구조화 데이터 정책](https://developers.google.com/search/docs/appearance/structured-data/sd-policies): 실제 콘텐츠와 일치해야 하며 노출을 보장하지 않는다.
- [speakable](https://developers.google.com/search/docs/appearance/structured-data/speakable): 뉴스 음성 응답 기능.
- [HowTo 변경](https://developers.google.com/search/blog/2023/08/howto-faq-changes): Google HowTo 리치 결과 지원 종료.
