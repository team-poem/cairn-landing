import { ArrowUpRight } from 'lucide-react';
import { Hero } from '@/components/landing/Hero';
import { Workflow } from '@/components/landing/Workflow';
import { Features } from '@/components/landing/Features';
import { GetStarted } from '@/components/landing/GetStarted';
import { cairnLinks } from '@/lib/cairn';
const repo = cairnLinks.repository;
export default function Home() {
  return (
    <>
      <a className="skip-link" href="#main">
        본문으로 건너뛰기
      </a>
      <header className="site-header wrap">
        <a className="wordmark" href="#main" aria-label="Cairn 홈">
          cairn<span className="brand-dot">.</span>
        </a>
        <nav aria-label="주 메뉴">
          <a href="#workflow">작동 방식</a>
          <a href={`${repo}/blob/main/docs/guide.md`}>
            문서 <ArrowUpRight size={14} />
          </a>
          <a className="nav-github" href={repo}>
            GitHub <ArrowUpRight size={14} />
          </a>
        </nav>
      </header>
      <main id="main">
        <Hero />
        <Workflow />
        <Features />
        <GetStarted />
      </main>
      <footer className="site-footer wrap">
        <a className="wordmark" href="#main">
          cairn<span className="brand-dot">.</span>
        </a>
        <span>Made by Poem.</span>
        <a href={repo}>
          오픈소스로 함께 만들어요 <ArrowUpRight size={15} />
        </a>
      </footer>
    </>
  );
}
