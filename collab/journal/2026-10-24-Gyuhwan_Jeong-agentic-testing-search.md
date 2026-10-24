# codex/agentic-testing-search · Gyuhwan_Jeong · 2026-10-24
- claim: collab/active/codex--agentic-testing-search/claim.md

## 이벤트
- added lib/testing-guide.ts EN/KO 에이전틱 테스팅 안내와 질문·답변의 공통 원본 → 본문·구조화 데이터를 따로 복제하지 말 것
- added components/landing/TestingGuide.tsx 공개 안내 페이지는 정적 HTML로 정의·용도·한계·공식 출처 제공 → 새 안내는 일반 읽기 흐름이며 스냅 랜딩과 분리할 것
- changed lib/metadata.ts 안내별 canonical·hreflang·OG 지원 → 다른 페이지가 홈 canonical을 상속하지 않도록 실제 산출물 검사할 것
- changed components/landing/LandingDocument.tsx 홈 StructuredData를 LandingPage로 이동 → 안내 페이지에 홈 WebPage·HowTo를 중복 삽입하지 말 것
- changed scripts/prepare-pages.py 중첩 안내 경로까지 디렉터리 index.html로 배치 → 기본·Pages 두 빌드와 tests/check-seo.py를 함께 검증할 것
- changed public/sitemap.xml 네 정규 주소와 언어별 alternate 반영 → 키워드용 중복·얇은 페이지를 추가하지 말 것
- changed docs/search-visibility.md 배포 후 색인·검색 질의 모니터링 절차 보강 → 구조화 데이터나 llms 파일 정상만으로 실제 순위·인용을 보장하지 말 것

## 남은 것
- PR #15 위의 스택 PR. #15 머지 후 main 대상으로 조정.
- 배포 뒤 운영자가 Search Console에서 새 두 안내 주소를 검사·색인 요청할 것.
- 기존 중첩 cairn-landing/ 클론은 보존함.
