# fix/search-verification · Gyuhwan_Jeong · 2026-09-16
- claim: collab/active/fix--search-verification/claim.md

## 이벤트
- rule Google Search Console 소유 확인 토큰은 lib/site.ts `googleSiteVerification` 에 있다(공개 HTML 에 나가는 값이라 비밀이 아님). 앞 저널(snap-fit-2)의 "환경 변수로 넣는다" 는 지침을 대체한다 → 다른 속성으로 다시 확인할 때만 `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` 환경 변수로 덮어쓴다

## 남은 것
- 머지·배포 후 Search Console 에서 "확인" 버튼만 누르면 된다. 태그는 head 에 들어간다. 그다음 Sitemaps 에 `sitemap.xml` 제출
