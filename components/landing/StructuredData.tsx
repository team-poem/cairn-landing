import { cairnLinks } from '@/lib/cairn';
import { dictionaries, type Locale } from '@/lib/i18n';
import {
  localeUrls,
  modifiedAt,
  ogImage,
  publishedAt,
  localizedSeo,
  siteName,
  siteUrl,
} from '@/lib/site';
/* schema.org JSON-LD. 검색 엔진과 AI 답변 엔진이 페이지를 "무엇" 으로 읽을지
 * 이해하도록 돕는다. 설명은 해당 언어의 화면 문구에서 가져온다 — 보이지 않는
 * 내용을 구조화 데이터에만 넣으면 가이드라인 위반이다. */
export function StructuredData({ locale }: { locale: Locale }) {
  const copy = dictionaries[locale];
  const siteDescription = localizedSeo[locale].description;
  const pageUrl = localeUrls[locale];
  const ids = {
    org: `${siteUrl}/#organization`,
    site: `${siteUrl}/#website`,
    page: `${pageUrl}#webpage`,
    app: `${siteUrl}/#software`,
    howto: `${pageUrl}#howto`,
    logo: `${siteUrl}/#logo`,
  };
  const phases = ['discover', 'freeze', 'replay', 'heal'] as const;
  const ports = Object.entries(copy.features.ports);
  const graph = [
    {
      '@type': 'Organization',
      '@id': ids.org,
      name: 'Poem',
      url: cairnLinks.team,
      sameAs: [cairnLinks.team],
      logo: {
        '@type': 'ImageObject',
        '@id': ids.logo,
        url: `${siteUrl}/icon-512.png`,
        width: 512,
        height: 512,
      },
    },
    {
      '@type': 'WebSite',
      '@id': ids.site,
      url: localeUrls.en,
      name: siteName,
      description: siteDescription,
      inLanguage: ['en', 'ko'],
      publisher: { '@id': ids.org },
    },
    {
      '@type': 'WebPage',
      '@id': ids.page,
      url: pageUrl,
      name: `${copy.hero.name} ${copy.hero.eyebrow}`,
      headline: `${copy.hero.titleTop} ${copy.hero.titleBottom}`,
      description: siteDescription,
      inLanguage: locale,
      isPartOf: { '@id': ids.site },
      about: { '@id': ids.app },
      mainEntity: { '@id': ids.app },
      primaryImageOfPage: {
        '@type': 'ImageObject',
        url: ogImage.url,
        width: ogImage.width,
        height: ogImage.height,
      },
      datePublished: publishedAt,
      dateModified: modifiedAt,
      workTranslation: {
        '@type': 'WebPage',
        url: localeUrls[locale === 'en' ? 'ko' : 'en'],
        inLanguage: locale === 'en' ? 'ko' : 'en',
      },
    },
    {
      '@type': 'SoftwareApplication',
      '@id': ids.app,
      name: 'cairn-engine',
      alternateName: siteName,
      description: copy.hero.description,
      url: localeUrls.en,
      applicationCategory: 'DeveloperApplication',
      applicationSubCategory: 'Test automation',
      operatingSystem: 'macOS, Linux, Windows',
      softwareRequirements: 'Node.js',
      downloadUrl: cairnLinks.npm,
      installUrl: cairnLinks.npm,
      softwareHelp: { '@type': 'CreativeWork', url: cairnLinks.guide },
      license: 'https://opensource.org/license/mit',
      isAccessibleForFree: true,
      offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
      author: { '@id': ids.org },
      publisher: { '@id': ids.org },
      sameAs: [cairnLinks.repository, cairnLinks.npm],
      image: ogImage.url,
      featureList: [
        ...phases.map((phase) => copy.workflow.phases[phase].label),
        ...ports.map(([name, port]) => `${name} port: ${port.description}`),
      ],
      keywords:
        'agentic testing, AI test automation, browser automation, self-healing tests',
    },
    {
      '@type': 'HowTo',
      '@id': ids.howto,
      name: `${copy.workflow.titleTop} ${copy.workflow.titleBottom}`,
      description: copy.workflow.lead,
      url: `${pageUrl}#workflow`,
      inLanguage: locale,
      tool: { '@type': 'HowToTool', name: 'cairn-engine' },
      step: phases.map((phase, index) => ({
        '@type': 'HowToStep',
        position: index + 1,
        name: copy.workflow.phases[phase].label,
        text: `${copy.workflow.phases[phase].subtitle} ${copy.workflow.phases[phase].description}`,
        url: `${pageUrl}#workflow`,
      })),
    },
  ];
  const json = JSON.stringify({
    '@context': 'https://schema.org',
    '@graph': graph,
  })
    // </script> 로 조기 종료되는 것을 막는다
    .replace(/</g, '\\u003c');
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: json }}
    />
  );
}
