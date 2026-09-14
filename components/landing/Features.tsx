import { ArrowUpRight, Cpu, Sparkles, Monitor } from 'lucide-react';
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
          className="engine-network"
          aria-label="Models connect to Cairn for discovery and repair; Cairn executes steps in your browser"
        >
          <div className="network-node network-model">
            <Sparkles size={20} />
            <strong>Model</strong>
            <span>Discover &amp; repair</span>
          </div>
          <div className="network-wire wire-in" aria-hidden="true">
            <i />
          </div>
          <a
            className="network-node network-core"
            href="#workflow"
            aria-label="See how the Cairn engine works"
          >
            <Cpu size={28} />
            <strong>Cairn</strong>
            <span>Browser test engine</span>
          </a>
          <div className="network-wire wire-out" aria-hidden="true">
            <i />
          </div>
          <div className="network-node network-browser">
            <Monitor size={20} />
            <strong>Browser</strong>
            <span>Execute steps</span>
          </div>
        </div>
        <p className="network-caption">
          Your model finds the path. Cairn runs it in your browser.
        </p>
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
