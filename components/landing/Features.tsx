import { ArrowUpRight, ArrowRight } from 'lucide-react';
import { cairnLinks } from '@/lib/cairn';
import { AeroBackdrop } from './AeroBackdrop';
export function Features() {
  return (
    <section
      className="engine-section cairn-container"
      id="engine"
      aria-labelledby="features-title"
    >
      <div className="engine-intro">
        <h2 id="features-title">
          Your tools.
          <br />
          Cairn underneath.
        </h2>
        <p>
          Run Cairn from the CLI or embed it in a QA tool, a CI check, or a
          browser monitor.
        </p>
        <a className="cairn-link" href={`${cairnLinks.guide}#embed-it`}>
          Explore the engine API <ArrowUpRight size={16} />
        </a>
      </div>
      <div className="engine-art">
        <AeroBackdrop />
        <div
          className="engine-ports"
          aria-label="A model and browser connected through Cairn"
        >
          <span>Your model</span>
          <ArrowRight size={18} />
          <strong>Cairn</strong>
          <ArrowRight size={18} />
          <span>Your browser</span>
        </div>
      </div>
      <dl className="engine-details">
        <div>
          <dt>Tests you can read</dt>
          <dd>
            Keep browser flows as JSON. Review changes in a diff and version the
            files with your app.
          </dd>
        </div>
        <div>
          <dt>A record of each run</dt>
          <dd>
            Capture execution events through TraceSink. Send them to the tools
            your team already uses.
          </dd>
        </div>
        <div>
          <dt>Adapters you choose</dt>
          <dd>
            Model and browser connections use separate ports. Replace either
            without rewriting the engine.
          </dd>
        </div>
      </dl>
    </section>
  );
}
