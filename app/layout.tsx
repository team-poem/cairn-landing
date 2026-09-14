import type { Metadata } from 'next';
import './globals.css';
export const metadata: Metadata = {
  icons: { icon: '/favicon.svg' },
  title: 'Cairn — 한 번 찾은 길을 테스트로',
  description:
    'AI로 브라우저 흐름을 발견하고, JSON으로 저장하고, 반복 재생하세요. Poem이 만드는 브라우저 테스트 엔진 Cairn.',
};
export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  );
}
