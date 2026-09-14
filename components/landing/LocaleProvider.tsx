'use client';
import {
  createContext,
  useContext,
  useEffect,
  useSyncExternalStore,
} from 'react';
import {
  defaultLocale,
  dictionaries,
  isLocale,
  localeStorageKey,
  type Copy,
  type Locale,
} from '@/lib/i18n';
/* 정적 배포라 서버 스냅샷은 항상 기본 언어다. 저장된 선택과 ?lang= 은
 * 하이드레이션이 끝난 뒤 클라이언트 스냅샷으로 적용된다. */
let current: Locale | null = null;
const listeners = new Set<() => void>();
function readStoredLocale(): Locale {
  const fromQuery = new URLSearchParams(window.location.search).get('lang');
  if (isLocale(fromQuery)) return fromQuery;
  try {
    const stored = window.localStorage.getItem(localeStorageKey);
    if (isLocale(stored)) return stored;
  } catch {
    /* 저장소를 막아둔 브라우저에서는 기본 언어로 둔다. */
  }
  return defaultLocale;
}
function getSnapshot(): Locale {
  current ??= readStoredLocale();
  return current;
}
function getServerSnapshot(): Locale {
  return defaultLocale;
}
function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}
function publishLocale(next: Locale) {
  current = next;
  document.documentElement.lang = next;
  try {
    window.localStorage.setItem(localeStorageKey, next);
  } catch {
    /* 저장에 실패해도 이번 방문에는 선택이 적용된다. */
  }
  for (const listener of listeners) listener();
}
type LocaleValue = {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: Copy;
};
const LocaleContext = createContext<LocaleValue>({
  locale: defaultLocale,
  setLocale: () => {},
  t: dictionaries[defaultLocale],
});
export function useI18n() {
  return useContext(LocaleContext);
}
export function LocaleProvider({ children }: { children: React.ReactNode }) {
  const locale = useSyncExternalStore(
    subscribe,
    getSnapshot,
    getServerSnapshot,
  );
  /* 저장된 선택으로 처음 전환될 때 <html lang> 도 함께 맞춘다. */
  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);
  return (
    <LocaleContext
      value={{ locale, setLocale: publishLocale, t: dictionaries[locale] }}
    >
      {children}
    </LocaleContext>
  );
}
