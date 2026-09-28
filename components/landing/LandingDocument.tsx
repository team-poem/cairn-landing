import type { Locale } from '@/lib/i18n';
import { StructuredData } from './StructuredData';
import '@/app/globals.css';
import '@/app/hallmark.css';
import '@/app/interactions.css';

export function LandingDocument({
  children,
  locale,
}: {
  children: React.ReactNode;
  locale: Locale;
}) {
  return (
    <html lang={locale}>
      <body>
        {children}
        <StructuredData locale={locale} />
      </body>
    </html>
  );
}
