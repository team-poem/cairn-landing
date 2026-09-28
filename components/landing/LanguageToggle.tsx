'use client';
import { locales, localeOptions } from '@/lib/i18n';
import { sitePath } from '@/lib/site-path';
import { useI18n } from './LocaleProvider';
export function LanguageToggle() {
  const { locale, t } = useI18n();
  return (
    <fieldset className="cairn-language" data-locale={locale}>
      <legend className="cairn-sr-only">{t.header.language}</legend>
      {locales.map((option) => (
        <a
          key={option}
          className="cairn-language-option"
          href={sitePath(option === 'ko' ? '/ko/' : '/')}
          hrefLang={option}
          aria-current={locale === option ? 'page' : undefined}
          lang={option}
        >
          <span aria-hidden="true">{localeOptions[option].short}</span>
          <span className="cairn-sr-only">{localeOptions[option].name}</span>
        </a>
      ))}
    </fieldset>
  );
}
