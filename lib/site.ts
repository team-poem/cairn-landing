/* 공개 주소와 검색·소셜·AI 답변 엔진용 상수. 빌드 접두사(sitePath)와 달리
 * 여기 값은 어디서 빌드하든 항상 공개 주소를 가리킨다 — canonical, OG,
 * JSON-LD 는 절대 URL 이어야 한다. */
export const siteUrl = 'https://team-poem.github.io/cairn-engine';
export const siteName = 'Cairn';
export const siteTitle = 'Cairn | Open-source agentic testing for browsers';
export const siteDescription =
  'Open-source agentic testing for web apps. Cairn discovers browser tests with AI, saves JSON scenarios, and runs regression checks without model calls.';
export const siteKeywords = [
  'Cairn',
  'cairn-engine',
  'agentic testing',
  'AI test automation',
  'browser automation testing',
  'end-to-end testing',
  'E2E test replay',
  'self-healing tests',
  'deterministic replay',
  'LLM test generation',
  'Chrome DevTools automation',
  'AI browser testing',
  '에이전틱 테스팅',
  '브라우저 테스트 자동화',
  'QA automation',
  'open source testing engine',
  'Poem',
];
/* Google Search Console 소유 확인 토큰. 공개 HTML 에 나가는 값이라 비밀이 아니다 */
export const googleSiteVerification =
  'vQDnzyzaFS-A-0oxmAM_wkrKRCdFXy8AlVfTkgmtjVY';
export const publishedAt = '2026-09-14';
export const modifiedAt = '2026-10-24';
export const ogImage = { url: `${siteUrl}/og.png`, width: 1200, height: 630 };
export const localeUrls = {
  en: `${siteUrl}/`,
  ko: `${siteUrl}/ko/`,
} as const;

export const localizedSeo = {
  en: { title: siteTitle, description: siteDescription, ogLocale: 'en_US' },
  ko: {
    title: 'Cairn | 에이전틱 테스팅 · AI 브라우저 테스트 자동화',
    description:
      'Cairn은 웹 앱을 위한 오픈 소스 에이전틱 테스팅 엔진입니다. AI로 브라우저 테스트 경로를 찾아 JSON으로 저장하고, 모델 호출 없이 회귀 테스트를 재실행합니다. UI 복구는 명시적으로 허용하고 검증합니다.',
    ogLocale: 'ko_KR',
  },
} as const;
