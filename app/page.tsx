import { LocaleProvider } from '@/components/landing/LocaleProvider';
import { SiteHeader } from '@/components/landing/SiteHeader';
import { SiteFooter } from '@/components/landing/SiteFooter';
import { Hero } from '@/components/landing/Hero';
import { Workflow } from '@/components/landing/Workflow';
import { Features } from '@/components/landing/Features';
import { GetStarted } from '@/components/landing/GetStarted';
export default function Home() {
  return (
    <LocaleProvider>
      <div className="cairn-site">
        <SiteHeader />
        <main id="main">
          <Hero />
          <Workflow />
          <Features />
          <GetStarted />
        </main>
        <SiteFooter />
      </div>
    </LocaleProvider>
  );
}
