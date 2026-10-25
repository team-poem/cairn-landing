import type { Locale } from '@/lib/i18n';
import { cairnLinks } from '@/lib/cairn';
import { sitePath } from '@/lib/site-path';
import { guideUrls, testingGuide } from '@/lib/testing-guide';
import { localeUrls, modifiedAt, siteUrl } from '@/lib/site';

export function TestingGuide({ locale }: { locale: Locale }) {
  const copy = testingGuide[locale];
  const url = guideUrls[locale];
  const localGuide = (language: Locale) =>
    sitePath(language === 'ko' ? '/ko/agentic-testing/' : '/agentic-testing/');
  const sources = [
    'https://github.com/team-poem/cairn/blob/v2.9.5/README.md',
    cairnLinks.guide,
    'https://github.com/team-poem/cairn/blob/v2.9.5/spec/core/judgment.md',
    cairnLinks.repository,
  ];
  const questions = copy.questions.map((item, index) => ({
    '@type': 'Question',
    '@id': `${url}#question-${index + 1}`,
    name: item.question,
    acceptedAnswer: { '@type': 'Answer', text: item.answer },
  }));
  const graph = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebPage',
        '@id': `${url}#webpage`,
        url,
        name: copy.heading,
        description: copy.description,
        inLanguage: locale,
        isPartOf: { '@id': `${siteUrl}/#website` },
        about: { '@id': `${siteUrl}/#software` },
        mainEntity: { '@id': `${url}#article` },
        hasPart: { '@id': `${url}#questions` },
        dateModified: modifiedAt,
      },
      {
        '@type': 'TechArticle',
        '@id': `${url}#article`,
        headline: copy.heading,
        description: copy.description,
        articleBody: [
          copy.intro,
          copy.definition,
          ...copy.steps.map(([name, text]) => `${name}: ${text}`),
          copy.fit,
          copy.controls,
        ].join('\n\n'),
        inLanguage: locale,
        datePublished: '2026-10-24',
        dateModified: modifiedAt,
        mainEntityOfPage: { '@id': `${url}#webpage` },
        author: { '@type': 'Organization', name: 'Poem', url: cairnLinks.team },
        citation: sources,
      },
      {
        '@type': 'FAQPage',
        '@id': `${url}#questions`,
        inLanguage: locale,
        mainEntity: questions,
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: 'Cairn',
            item: localeUrls[locale],
          },
          { '@type': 'ListItem', position: 2, name: copy.overview, item: url },
        ],
      },
    ],
  };
  return (
    <div className="cairn-site testing-guide">
      <header className="guide-header">
        <a
          href={sitePath(locale === 'ko' ? '/ko/' : '/')}
          aria-label={copy.home}
        >
          cairn.
        </a>
        <nav aria-label={copy.language}>
          <a
            href={localGuide('en')}
            hrefLang="en"
            lang="en"
            aria-current={locale === 'en' ? 'page' : undefined}
          >
            English
          </a>
          <a
            href={localGuide('ko')}
            hrefLang="ko"
            lang="ko"
            aria-current={locale === 'ko' ? 'page' : undefined}
          >
            한국어
          </a>
        </nav>
      </header>
      <main id="main">
        <article>
          <p className="guide-kicker">Cairn · Agentic testing</p>
          <h1>{copy.heading}</h1>
          <p className="guide-intro">{copy.intro}</p>
          <p className="guide-date">{copy.updated}</p>
          <section aria-labelledby="definition">
            <h2 id="definition">{copy.overview}</h2>
            <p>{copy.definition}</p>
          </section>
          <section aria-labelledby="flow">
            <h2 id="flow">{copy.flowTitle}</h2>
            <ol>
              {copy.steps.map(([name, text]) => (
                <li key={name}>
                  <h3>{name}</h3>
                  <p>{text}</p>
                </li>
              ))}
            </ol>
          </section>
          <section aria-labelledby="use-cases">
            <h2 id="use-cases">{copy.fitTitle}</h2>
            <p>{copy.fit}</p>
          </section>
          <section aria-labelledby="controls">
            <h2 id="controls">{copy.controlsTitle}</h2>
            <p>{copy.controls}</p>
          </section>
          <section aria-labelledby="questions">
            <h2 id="questions">{copy.faqTitle}</h2>
            {copy.questions.map((item, index) => (
              <div key={item.question} id={`question-${index + 1}`}>
                <h3>{item.question}</h3>
                <p>{item.answer}</p>
              </div>
            ))}
          </section>
          <section aria-labelledby="next">
            <h2 id="next">{copy.nextTitle}</h2>
            <ul>
              <li>
                <a href={cairnLinks.quickstart}>{copy.quickstart}</a>
              </li>
              <li>
                <a href={cairnLinks.demo}>{copy.demo}</a>
              </li>
              <li>
                <a href={sitePath(locale === 'ko' ? '/ko/' : '/')}>
                  {copy.landing}
                </a>
              </li>
            </ul>
          </section>
          <section aria-labelledby="sources">
            <h2 id="sources">{copy.sources}</h2>
            <ul>
              {sources.map((source, index) => (
                <li key={source}>
                  <a href={source}>{copy.sourceNames[index]}</a>
                </li>
              ))}
            </ul>
          </section>
        </article>
      </main>
      <footer>Copyright © 2026 Poem. · MIT</footer>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(graph).replace(/</g, '\\u003c'),
        }}
      />
    </div>
  );
}
