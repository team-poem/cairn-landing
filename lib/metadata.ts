import type { Metadata } from 'next';
import { sitePath } from '@/lib/site-path';
import { cairnLinks } from '@/lib/cairn';
import {
  googleSiteVerification,
  localeUrls,
  ogImage,
  localizedSeo,
  siteKeywords,
  siteName,
  siteUrl,
} from '@/lib/site';
import type { Locale } from '@/lib/i18n';
/* 검색·소셜·AI 답변 엔진용 메타데이터. 절대 주소는 lib/site.ts 의 공개 주소,
 * 같은 사이트의 파일은 배포 접두사가 붙는 sitePath 를 쓴다 (정적 경로 검사가
 * <link href> 의 접두사를 확인한다). */
export function metadataFor(locale: Locale): Metadata {
  const { title, description, ogLocale } = localizedSeo[locale];
  return {
    metadataBase: new URL(`${siteUrl}/`),
    title: { default: title, template: `%s | ${siteName}` },
    description,
    applicationName: siteName,
    keywords: siteKeywords,
    category: 'technology',
    authors: [{ name: 'Poem', url: cairnLinks.team }],
    creator: 'Poem',
    publisher: 'Poem',
    generator: 'vinext',
    referrer: 'origin-when-cross-origin',
    formatDetection: { telephone: false, email: false, address: false },
    alternates: {
      canonical: localeUrls[locale],
      languages: {
        en: localeUrls.en,
        ko: localeUrls.ko,
        'x-default': localeUrls.en,
      },
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-image-preview': 'large',
        'max-snippet': -1,
        'max-video-preview': -1,
      },
    },
    openGraph: {
      type: 'website',
      url: localeUrls[locale],
      siteName,
      title,
      description,
      locale: ogLocale,
      alternateLocale: [localizedSeo[locale === 'en' ? 'ko' : 'en'].ogLocale],
      images: [
        {
          url: ogImage.url,
          width: ogImage.width,
          height: ogImage.height,
          type: 'image/png',
          alt: 'Cairn — Find a path. Run it again. A cairn of stones under a night sky.',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [ogImage.url],
    },
    icons: {
      icon: [
        { url: sitePath('/favicon.svg'), type: 'image/svg+xml' },
        { url: sitePath('/icon-192.png'), sizes: '192x192', type: 'image/png' },
        { url: sitePath('/icon-512.png'), sizes: '512x512', type: 'image/png' },
      ],
      apple: [
        {
          url: sitePath('/apple-touch-icon.png'),
          sizes: '180x180',
          type: 'image/png',
        },
      ],
      shortcut: [sitePath('/favicon.svg')],
    },
    manifest: sitePath('/manifest.webmanifest'),
    appleWebApp: {
      capable: true,
      title: siteName,
      statusBarStyle: 'black-translucent',
    },
    verification: {
      google:
        process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION ||
        googleSiteVerification,
    },
    other: { 'msapplication-TileColor': '#0b1019' },
  };
}
