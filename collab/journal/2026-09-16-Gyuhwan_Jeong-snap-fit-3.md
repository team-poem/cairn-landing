# feat/snap-fit · Gyuhwan_Jeong · 2026-09-16 (3)
- claim: collab/active/feat--snap-fit/claim.md

## 이벤트
- rule Google Search Console 소유 확인 토큰은 lib/site.ts `googleSiteVerification` 에 있다(공개 HTML 에 나가는 값이라 비밀이 아님). 앞 저널의 "환경 변수로 넣는다" 는 지침을 대체한다 → 다른 속성으로 다시 확인할 때만 `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` 환경 변수로 덮어쓴다

## 남은 것
- 배포 후 Search Console 에서 "확인" 버튼만 누르면 된다. 태그는 이미 head 에 들어간다
