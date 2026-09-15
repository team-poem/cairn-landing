import { cairnLinks } from '@/lib/cairn';
import { dictionaries } from '@/lib/i18n';
import {
  localeUrls,
  modifiedAt,
  ogImage,
  publishedAt,
  siteDescription,
  siteName,
  siteUrl,
} from '@/lib/site';
/* schema.org JSON-LD. 검색 엔진과 AI 답변 엔진이 페이지를 "무엇" 으로 읽을지
 * 정한다. 내용은 화면에 보이는 문구(영문 사전)에서만 가져온다 — 보이지 않는
 * 내용을 구조화 데이터에만 넣으면 가이드라인 위반이다. */
const en = dictionaries.en;
const pageUrl = `${siteUrl}/`;
const ids = {
  org: `${siteUrl}/#organization`,
  site: `${siteUrl}/#website`,
  page: `${siteUrl}/#webpage`,
  app: `${siteUrl}/#software`,
  howto: `${siteUrl}/#howto`,
  logo: `${siteUrl}/#logo`,
};
const phases = ['discover', 'freeze', 'replay', 'heal'] as const;
const ports = Object.entries(en.features.ports);
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
    url: pageUrl,
    name: siteName,
    description: siteDescription,
    inLanguage: ['en', 'ko'],
    publisher: { '@id': ids.org },
  },
  {
    '@type': 'WebPage',
    '@id': ids.page,
    url: pageUrl,
    name: en.hero.name + en.hero.eyebrow,
    headline: `${en.hero.titleTop} ${en.hero.titleBottom}`,
    description: siteDescription,
    inLanguage: 'en',
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
      url: localeUrls.ko,
      inLanguage: 'ko',
    },
    speakable: {
      '@type': 'SpeakableSpecification',
      cssSelector: ['#hero-title', '.night-description'],
    },
  },
  {
    '@type': 'SoftwareApplication',
    '@id': ids.app,
    name: 'cairn-engine',
    alternateName: siteName,
    description: en.hero.description,
    url: pageUrl,
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
      ...phases.map((phase) => en.workflow.phases[phase].label),
      ...ports.map(([name, port]) => `${name} port: ${port.description}`),
    ],
    keywords: 'agentic testing, AI test automation, browser automation, self-healing tests',
  },
  {
    '@type': 'HowTo',
    '@id': ids.howto,
    name: `${en.workflow.titleTop} ${en.workflow.titleBottom}`,
    description: en.workflow.lead,
    url: `${pageUrl}#workflow`,
    inLanguage: 'en',
    tool: { '@type': 'HowToTool', name: 'cairn-engine' },
    step: phases.map((phase, index) => ({
      '@type': 'HowToStep',
      position: index + 1,
      name: en.workflow.phases[phase].label,
      text: `${en.workflow.phases[phase].subtitle} ${en.workflow.phases[phase].description}`,
      url: `${pageUrl}#workflow`,
    })),
  },
];
const json = JSON.stringify({ '@context': 'https://schema.org', '@graph': graph })
  // </script> 로 조기 종료되는 것을 막는다
  .replace(/</g, '\\u003c');
export function StructuredData() {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: json }} />;
}
