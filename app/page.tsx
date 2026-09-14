import { LocaleProvider } from '@/components/landing/LocaleProvider';
import { SiteHeader } from '@/components/landing/SiteHeader';
import { SiteFooter } from '@/components/landing/SiteFooter';
import { SectionNav } from '@/components/landing/SectionNav';
import { Hero } from '@/components/landing/Hero';
import { Workflow } from '@/components/landing/Workflow';
import { GetStarted } from '@/components/landing/GetStarted';
export default function Home() {
  return (
    <LocaleProvider>
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
