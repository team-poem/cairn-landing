'use client';
import { locales, localeOptions } from '@/lib/i18n';
import { useI18n } from './LocaleProvider';
export function LanguageToggle() {
  const { locale, setLocale, t } = useI18n();
  return (
    <fieldset className="cairn-language" data-locale={locale}>
      <legend className="cairn-sr-only">{t.header.language}</legend>
      {locales.map((option) => (
        <button
          key={option}
          type="button"
          className="cairn-language-option"
          onClick={() => setLocale(option)}
          aria-pressed={locale === option}
          lang={option}
        >
          <span aria-hidden="true">{localeOptions[option].short}</span>
          <span className="cairn-sr-only">{localeOptions[option].name}</span>
        </button>
      ))}
    </fieldset>
  );
}
