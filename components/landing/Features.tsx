import { ArrowUpRight, FileJson, ScanLine, Blocks } from 'lucide-react';
import { cairnLinks } from '@/lib/cairn';
import { AeroBackdrop } from './AeroBackdrop';
import styles from './AeroBackdrop.module.css';
export function Features() {
  return (
    <section
      className={`features wrap ${styles.section}`}
      aria-labelledby="features-title"
    >
      <AeroBackdrop />
      <div className={styles.content}>
        <div className="section-heading">
          <p className="eyebrow">02 / BUILT TO BE YOUR ENGINE</p>
          <h2 id="features-title">
            당신의 도구 안에서,
            <br />
            당신의 방식으로.
          </h2>
          <p>
            CLI로 바로 실행하거나, 엔진을 제품에 연결하세요.
            <br />
            QA 도구, CI 게이트, 모니터링에 필요한 실행 기반입니다.
          </p>
        </div>
        <div className="feature-grid">
          <article>
            <FileJson size={23} strokeWidth={1.5} />
            <h3>테스트는 읽을 수 있는 파일로</h3>
            <p>
              흐름을 평범한 JSON으로 남깁니다. 변경을 비교하고, 버전 관리하고,
              다음 실행에 그대로 사용할 수 있습니다.
            </p>
          </article>
          <article>
            <ScanLine size={23} strokeWidth={1.5} />
            <h3>결과 뒤에 실행 기록까지</h3>
            <p>
              버전이 있는 이벤트 스트림으로 실행 과정을 추적합니다. TraceSink를
              연결해 원하는 방식으로 기록을 활용하세요.
            </p>
          </article>
          <article>
            <Blocks size={23} strokeWidth={1.5} />
            <h3>모델과 드라이버는 교체 가능</h3>
            <p>
              모델과 브라우저 구현을 포트로 분리했습니다. 사용하는 환경에 맞게
              연결하고, 엔진을 직접 임베드할 수 있습니다.
            </p>
          </article>
        </div>
        <a
          className="text-link feature-link"
          href={`${cairnLinks.guide}#embed-it`}
        >
          엔진을 연결하는 방법 <ArrowUpRight size={16} />
        </a>
      </div>
    </section>
  );
}
