/* 공개 주소와 검색·소셜·AI 답변 엔진용 상수. 빌드 접두사(sitePath)와 달리
 * 여기 값은 어디서 빌드하든 항상 공개 주소를 가리킨다 — canonical, OG,
 * JSON-LD 는 절대 URL 이어야 한다. */
export const siteUrl = 'https://team-poem.github.io/cairn-engine';
export const siteName = 'Cairn';
export const siteTitle = 'Cairn | Find a path. Run it again.';
export const siteDescription =
  'Cairn uses AI to discover a browser task once, saves the steps as JSON, and replays them without model calls. An open source agentic testing engine by Poem.';
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
  'Playwright alternative',
  'QA automation',
  'open source testing engine',
  'Poem',
];
/* Google Search Console 소유 확인 토큰. 공개 HTML 에 나가는 값이라 비밀이 아니다 */
export const googleSiteVerification =
  'vQDnzyzaFS-A-0oxmAM_wkrKRCdFXy8AlVfTkgmtjVY';
export const publishedAt = '2026-09-14';
export const modifiedAt = '2026-09-28';
export const ogImage = { url: `${siteUrl}/og.png`, width: 1200, height: 630 };
export const localeUrls = {
  en: `${siteUrl}/`,
  ko: `${siteUrl}/ko/`,
} as const;

export const localizedSeo = {
  en: { title: siteTitle, description: siteDescription, ogLocale: 'en_US' },
  ko: {
    title: 'Cairn | AI로 경로를 찾고, 모델 호출 없이 다시 실행하세요',
    description:
      '테스트 케이스를 설명하면 Cairn이 AI로 실행 경로를 찾아 JSON으로 저장합니다. 저장한 경로는 모델 호출 없이 재실행하고, 실패한 경로는 AI로 복구하는 오픈 소스 에이전틱 테스팅 엔진입니다.',
    ogLocale: 'ko_KR',
  },
} as const;
