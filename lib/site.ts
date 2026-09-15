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
export const publishedAt = '2026-09-14';
export const modifiedAt = '2026-09-16';
export const ogImage = { url: `${siteUrl}/og.png`, width: 1200, height: 630 };
export const localeUrls = {
  en: `${siteUrl}/`,
  ko: `${siteUrl}/?lang=ko`,
} as const;
