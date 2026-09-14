import { ArrowUpRight } from 'lucide-react';
import { cairnLinks } from '@/lib/cairn';
export function GetStarted() {
  return (
    <section
      className="start-section"
      id="get-started"
      aria-labelledby="start-title"
    >
      <div className="start-layout cairn-container">
        <div>
          <h2 id="start-title">Give it a task.</h2>
          <p>
            Bring Node.js 20+, Chrome, and a model.
            <br />
            The guide takes you from installation to your first replay.
          </p>
        </div>
        <div className="start-command">
          <pre aria-label="Install Cairn">
            <code>
              <span aria-hidden="true">$ </span>npm install -g cairn-engine
            </code>
          </pre>
          <div className="start-actions">
            <a
              className="cairn-button"
              href={`${cairnLinks.guide}#try-it-in-60-seconds`}
            >
              Start with the guide <ArrowUpRight size={17} />
            </a>
            <a className="cairn-link" href={cairnLinks.quickstart}>
              Example project <ArrowUpRight size={16} />
            </a>
          </div>
          <p className="start-note">
            Discovery, repair, and AI checks may call a model.
          </p>
        </div>
      </div>
    </section>
  );
}
