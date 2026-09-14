import type { Metadata } from 'next';
import './globals.css';
import './hallmark.css';
import './interactions.css';
export const metadata: Metadata = {
  icons: { icon: '/favicon.svg' },
  title: 'Cairn | Find a path. Run it again.',
  description:
    'Cairn uses AI to discover browser tasks, saves the steps as JSON, and replays them without model calls. An open source browser testing engine by Poem.',
};
export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
