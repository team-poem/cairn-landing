'use client';
import { useState } from 'react';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { cairnLinks } from '@/lib/cairn';
import { useI18n } from './LocaleProvider';
const stages = ['context', 'plan', 'execute', 'judge', 'report'] as const;
const ports = [
  'ContextProvider',
  'Planner',
  'SkillStore',
  'Driver',
  'Critic',
  'Reporter',
] as const;
type Port = (typeof ports)[number];
/* 코드는 README 에서 가져온 사용 예제이며 실제 스키마 전체가 아니다. */
const samples = {
  skill: `{
  "name": "cart",
  "steps": [
    { "kind": "goto", "url": "https://shop.example" },
    { "kind": "type", "target": { "text": "Email" }, "text": "you@shop.example" },
    { "kind": "click", "target": { "text": "Log in", "role": "button" },
      "expect": { "requestStatus": { "urlIncludes": "/auth", "status": 200 } } },
    { "kind": "click", "target": { "text": "Add to cart" } },
    { "kind": "click", "target": { "text": "Cart", "role": "link" } }
  ],
  "assertions": [
    { "kind": "navigated", "to": "/cart" },
    { "kind": "no-failed-requests" }
  ]
}`,
  embed: `import { runScenario, loadSkillFile, saveSkillFile } from "cairn-engine";

const scenario = await loadSkillFile("cart.skill.json");
const { result, healedScenario } = await runScenario(scenario, {
  heal: true, // repair a broken step instead of going red
});

if (healedScenario) await saveSkillFile("cart.skill.json", healedScenario);
if (!result.verdict.passed) process.exit(1); // a deterministic gate for CI`,
  suite: `// cases.json
{
  "baseUrl": "https://your.app",
  "cases": [
    { "id": "login", "intent": "log in with the test account" },
    { "id": "checkout", "intent": "buy 1kg of beans",
      "expect": ["the order total shown is ₩24,000"] }
  ]
}
// $ cairn suite cases.json --skills ./skills --report suite.md`,
} as const;
export function GetStarted() {
  const { t } = useI18n();
  const [port, setPort] = useState<Port>('Driver');
  const activeStage = t.features.ports[port].stage;
  return (
    <section
      className="start-section"
      id="get-started"
      aria-labelledby="fit-title"
    >
      <div className="cairn-container start-stack">
        <div className="fit-grid">
          <div className="engine-intro">
            <h2 id="fit-title">
              {t.features.titleTop}
              <br />
              {t.features.titleBottom}
            </h2>
            <p>{t.features.lead}</p>
            <a className="cairn-link" href={`${cairnLinks.guide}#embed-it`}>
              {t.features.link} <ArrowUpRight size={16} />
            </a>
          </div>
          {/* 파이프라인 다섯 단계와 그 밑에 꽂히는 포트 여섯. 포트를 고르면
              그 포트가 어느 단계를 바꾸는지 위에서 켜진다. */}
          <div className="pipeline">
            <span className="fit-label">{t.features.pipelineLabel}</span>
            <ol className="pipeline-stages" aria-label={t.features.pipelineLabel}>
              {stages.map((stage, index) => (
                <li
                  key={stage}
                  className="pipeline-stage"
                  data-active={activeStage === stage}
                >
                  <strong>{t.features.stages[stage].name}</strong>
                  <span>{t.features.stages[stage].role}</span>
                  {index < stages.length - 1 && (
                    <ArrowRight size={14} aria-hidden="true" />
                  )}
                </li>
              ))}
            </ol>
            <span className="fit-label">{t.features.portsLabel}</span>
            <div className="pipeline-ports">
              {ports.map((name) => (
                <button
                  key={name}
                  type="button"
                  className="pipeline-port"
                  aria-pressed={port === name}
                  onClick={() => setPort(name)}
                  onPointerEnter={() => setPort(name)}
                  onFocus={() => setPort(name)}
                >
                  {name}
                </button>
              ))}
            </div>
            <p className="pipeline-note" aria-live="polite">
              <strong>{port}</strong> — {t.features.ports[port].description}
            </p>
          </div>
        </div>

        <div className="fit-grid fit-grid-lower">
          <div className="compare">
            <span className="fit-label">{t.features.compareLabel}</span>
            <table className="compare-table">
              <thead>
                <tr>
                  <th scope="col">
                    <span className="cairn-sr-only">{t.features.compareLabel}</span>
                  </th>
                  {t.features.compare.columns.map((column) => (
                    <th key={column} scope="col">
                      {column}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {t.features.compare.rows.map((row) => (
                  <tr key={row.label}>
                    <th scope="row">{row.label}</th>
                    {row.cells.map((cell, index) => (
                      <td key={index} data-cairn={index === 2}>
                        {cell}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="code-samples">
            <span className="fit-label">{t.features.codeLabel}</span>
            <Tabs defaultValue="skill" className="code-tabs">
              <TabsList className="code-tabs-list" aria-label={t.features.codeLabel}>
                {(Object.keys(samples) as (keyof typeof samples)[]).map((key) => (
                  <TabsTrigger key={key} value={key} className="code-tab">
                    {t.features.codeTabs[key]}
                  </TabsTrigger>
                ))}
              </TabsList>
              {(Object.keys(samples) as (keyof typeof samples)[]).map((key) => (
                <TabsContent key={key} value={key} className="code-panel">
                  <pre>
                    <code>{samples[key]}</code>
                  </pre>
                  <p>{t.features.codeNotes[key]}</p>
                </TabsContent>
              ))}
            </Tabs>
          </div>
        </div>

        <dl className="fit-facts">
          <div>
            <dt>{t.features.measuredLabel}</dt>
            <dd>
              {t.features.measured}{' '}
              <a className="cairn-link" href={cairnLinks.bench}>
                {t.features.measuredLink} <ArrowUpRight size={14} />
              </a>
            </dd>
          </div>
          <div>
            <dt>{t.features.modelsLabel}</dt>
            <dd>{t.features.models}</dd>
          </div>
        </dl>

        <div className="fit-builds">
          <span className="fit-label">{t.features.buildLabel}</span>
          <ul>
            {t.features.builds.map((item) => (
              <li key={item.term}>
                <strong>{item.term}</strong>
                <span>{item.description}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="start-layout">
          <div>
            <h3 id="start-title">{t.start.title}</h3>
            <p>
              {t.start.leadTop}
              <br />
              {t.start.leadBottom}
            </p>
          </div>
          <div className="start-command">
            <pre aria-label={t.start.installLabel}>
              <code>
                <span aria-hidden="true">$ </span>npm install -g cairn-engine
              </code>
            </pre>
            <div className="start-actions">
              <a
                className="cairn-button"
                href={`${cairnLinks.guide}#try-it-in-60-seconds`}
              >
                {t.start.primary} <ArrowUpRight size={17} />
              </a>
              <a className="cairn-link" href={cairnLinks.quickstart}>
                {t.start.secondary} <ArrowUpRight size={16} />
              </a>
            </div>
            <p className="start-note">{t.start.note}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
