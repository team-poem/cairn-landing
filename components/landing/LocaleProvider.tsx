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
const FADE_MS = 150;
function publishLocale(next: Locale) {
  if (next === current) return;
  const apply = () => {
    current = next;
    document.documentElement.lang = next;
    for (const listener of listeners) listener();
  };
  try {
    window.localStorage.setItem(localeStorageKey, next);
  } catch {
    /* 저장에 실패해도 이번 방문에는 선택이 적용된다. */
  }
  /* 문구 길이가 달라 레이아웃이 움직인다. 한 프레임에 툭 바뀌면 흔들리는
   * 것으로 보이므로 살짝 어둡혔다 새 문구로 밝아지게 한다.
   * document.startViewTransition 은 히어로의 라이브 WebGL 캔버스까지
   * 전체 페이지를 스냅샷으로 떠서 무거웠고(렉), 캡처 시점에 캔버스가
   * 막 지워진 프레임을 찍어 가끔 깨져 보였다. 대신 콘텐츠 래퍼 하나만
   * opacity 전환한다 — 캔버스는 그 아래서 평소처럼 계속 그려진다. */
  const wrap = document.querySelector<HTMLElement>('.cairn-site');
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (!wrap || reduced) {
    apply();
    return;
  }
  wrap.style.transition = `opacity ${FADE_MS}ms ease`;
  wrap.style.opacity = '0';
  window.setTimeout(() => {
    apply();
    requestAnimationFrame(() => {
      wrap.style.opacity = '1';
    });
  }, FADE_MS);
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
