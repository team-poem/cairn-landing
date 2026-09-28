import type { Locale } from '@/lib/i18n';
import { LocaleProvider } from '@/components/landing/LocaleProvider';
import { SiteHeader } from '@/components/landing/SiteHeader';
import { SiteFooter } from '@/components/landing/SiteFooter';
import { SectionNav } from '@/components/landing/SectionNav';
import { Hero } from '@/components/landing/Hero';
import { Workflow } from '@/components/landing/Workflow';
import { GetStarted } from '@/components/landing/GetStarted';
export function LandingPage({ locale }: { locale: Locale }) {
  return (
    <LocaleProvider locale={locale}>
      <div className="cairn-site">
        <SiteHeader />
        <SectionNav />
        <main id="main">
          <Hero />
          <Workflow />
          <GetStarted />
        </main>
        <SiteFooter />
      </div>
    </LocaleProvider>
  );
}
