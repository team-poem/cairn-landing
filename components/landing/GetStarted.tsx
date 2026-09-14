'use client';
import { useState } from 'react';
import {
  AppWindow,
  ArrowUpRight,
  Cpu,
  GitPullRequestArrow,
  Monitor,
  Terminal,
} from 'lucide-react';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { cairnLinks } from '@/lib/cairn';
import { useI18n } from './LocaleProvider';
const hosts = ['cli', 'ci', 'app'] as const;
type Host = (typeof hosts)[number];
const icons = { cli: Terminal, ci: GitPullRequestArrow, app: AppWindow };
/* 명령은 README 의 예제를 줄인 것이다. 어디서 돌든 같은 파일을 재생한다. */
const commands: Record<Host, string> = {
  cli: '$ cairn replay cart.skill.json',
  ci: '- run: npm i -g cairn-engine\n- run: cairn replay cart.skill.json --heal',
  app: 'const { result } = await runScenario(scenario, { heal: true });\nif (!result.verdict.passed) process.exit(1);',
};
/* 3번 섹션은 그림 하나다: 내 도구 → Cairn → 브라우저. 도구만 바꿔 본다. */
export function GetStarted() {
  const { t } = useI18n();
  const [host, setHost] = useState<Host>('cli');
  const HostIcon = icons[host];
  return (
    <section
      className="start-section"
      id="get-started"
      aria-labelledby="fit-title"
    >
      <div className="cairn-container start-stack">
        <div className="flow-heading">
          <h2 id="fit-title">
            {t.features.titleTop}
            <br />
            {t.features.titleBottom}
          </h2>
          <p>
            {t.features.lead}{' '}
            <a className="cairn-link" href={`${cairnLinks.guide}#embed-it`}>
              {t.features.link} <ArrowUpRight size={15} />
            </a>
          </p>
        </div>
        <Tabs
          value={host}
          onValueChange={(value) => setHost(value as Host)}
          className="flow-workbench host-workbench"
        >
          <TabsList className="host-tabs" aria-label={t.engine.tabsLabel}>
            {hosts.map((key) => {
              const Icon = icons[key];
              return (
                <TabsTrigger key={key} value={key} className="host-tab">
                  <Icon size={15} />
                  {t.engine.hosts[key].tab}
                </TabsTrigger>
              );
            })}
          </TabsList>
          {/* key 로 다시 그려 선의 흐름과 결과 배지가 탭마다 처음부터 돈다 */}
          <div className="host-scene" key={host}>
            <div className="engine-network" aria-label={t.engine.caption}>
              <div className="network-node network-model">
                <HostIcon size={20} />
                <strong>{t.engine.hosts[host].node}</strong>
                <span>{t.engine.hosts[host].role}</span>
              </div>
              <div className="network-wire wire-in" aria-hidden="true">
                <i />
              </div>
              <div className="network-node network-core">
                <Cpu size={28} />
                <strong>{t.engine.core}</strong>
                <span>{t.engine.coreRole}</span>
              </div>
              <div className="network-wire wire-out" aria-hidden="true">
                <i />
              </div>
              <div className="network-node network-browser">
                <Monitor size={20} />
                <strong>{t.engine.browser}</strong>
                <span>{t.engine.browserRole}</span>
              </div>
            </div>
            <div className="host-command">
              <pre>
                <code>{commands[host]}</code>
              </pre>
              <output className="host-result">{t.engine.result}</output>
            </div>
            <p className="network-caption">
              {t.engine.caption} <span>{t.engine.illustrative}</span>
            </p>
          </div>
          <div className="flow-command engine-install">
            <span>{t.start.title}</span>
            <pre aria-label={t.start.installLabel}>
              <code>
                <span aria-hidden="true">$ </span>npm install -g cairn-engine
              </code>
            </pre>
            <div className="start-actions">
              <a className="cairn-button" href={`${cairnLinks.guide}#try-it-in-60-seconds`}>
                {t.start.primary} <ArrowUpRight size={17} />
              </a>
              <a className="cairn-link" href={cairnLinks.quickstart}>
                {t.start.secondary} <ArrowUpRight size={16} />
              </a>
              <span className="start-note">{t.start.note}</span>
            </div>
          </div>
        </Tabs>
      </div>
    </section>
  );
}
