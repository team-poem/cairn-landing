import Image from 'next/image';
import { ArrowUpRight } from 'lucide-react';
import { Hero } from '@/components/landing/Hero';
import { Workflow } from '@/components/landing/Workflow';
import { Features } from '@/components/landing/Features';
import { GetStarted } from '@/components/landing/GetStarted';
import { cairnLinks } from '@/lib/cairn';
export default function Home() {
  return (
    <div className="cairn-site">
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <header className="cairn-header cairn-container">
        <a className="cairn-wordmark" href="#main" aria-label="Cairn home">
          <Image src="/favicon.svg" width={26} height={32} alt="" unoptimized />
          cairn
        </a>
        <a className="cairn-link" href={cairnLinks.repository}>
          GitHub <ArrowUpRight size={16} />
        </a>
      </header>
      <main id="main">
        <Hero />
        <Workflow />
        <Features />
        <GetStarted />
      </main>
      <footer className="cairn-footer cairn-container">
        <div className="footer-masthead">
          <a href="#main" aria-label="Cairn home">
            cairn<span>.</span>
          </a>
          <p>
            A browser testing engine
            <br />
            made by Poem.
          </p>
        </div>
        <nav aria-label="Footer">
          <a href="#workflow">How it works</a>
          <a href={cairnLinks.guide}>
            Documentation <ArrowUpRight size={15} />
          </a>
          <a href={cairnLinks.repository}>
            GitHub <ArrowUpRight size={15} />
          </a>
        </nav>
        <p className="footer-colophon">
          Open source. Built to run in your tools.
        </p>
      </footer>
    </div>
  );
}
