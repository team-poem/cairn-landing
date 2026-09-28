'use client';
import { createContext, useContext, useEffect } from 'react';
import {
  defaultLocale,
  dictionaries,
  isLocale,
  type Copy,
  type Locale,
} from '@/lib/i18n';
import { sitePath } from '@/lib/site-path';

const LocaleContext = createContext<{ locale: Locale; t: Copy }>({
  locale: defaultLocale,
  t: dictionaries[defaultLocale],
});
export function useI18n() {
  return useContext(LocaleContext);
}
export function LocaleProvider({
  children,
  locale,
}: {
  children: React.ReactNode;
  locale: Locale;
}) {
  useEffect(() => {
    // 기존 공유 주소 ?lang=ko도 보존한다. URL의 언어가 저장된 선호보다 우선한다.
    const url = new URL(window.location.href);
    const legacy = url.searchParams.get('lang');
    if (!isLocale(legacy)) return;
    url.searchParams.delete('lang');
    url.pathname = sitePath(legacy === 'ko' ? '/ko/' : '/');
    if (legacy !== locale) window.location.replace(url.href);
    else window.history.replaceState(window.history.state, '', url.href);
  }, [locale]);
  return (
    <LocaleContext value={{ locale, t: dictionaries[locale] }}>
      {children}
    </LocaleContext>
  );
}
