'use client';
import { useEffect, useRef } from 'react';
import {
  ArrowRight,
  Backpack,
  Check,
  MousePointer2,
  ShoppingBag,
  UserRound,
} from 'lucide-react';
import { demoFrame, type DemoState } from '@/lib/demo-state';
import { useI18n } from './LocaleProvider';
export function ShopDemo({ state }: { state: DemoState }) {
  const { t } = useI18n();
  const frame = demoFrame(state);
  const viewport = useRef<HTMLDivElement>(null);
  /* 커서는 지금 겨누는 버튼([data-target=true])을 실제로 재서 그 위로 간다.
   * 고정 퍼센트는 화면 비율이 바뀌면 버튼과 어긋난다. state 를 두지 않고
   * CSS 변수에 바로 쓰는 이유는 렌더 뒤 측정이 리렌더를 부르지 않게 하기 위해서다. */
  useEffect(() => {
    const root = viewport.current;
    if (!root) return;
    const place = () => {
      const target = root.querySelector<HTMLElement>('[data-target="true"]');
      if (!target) return;
      const a = root.getBoundingClientRect();
      const b = target.getBoundingClientRect();
      root.style.setProperty('--cursor-x', `${b.left - a.left + b.width * 0.62}px`);
      root.style.setProperty('--cursor-y', `${b.top - a.top + b.height * 0.58}px`);
    };
    place();
    const observer = new ResizeObserver(place);
    observer.observe(root);
    return () => observer.disconnect();
  }, [frame.activeStep, frame.screen, frame.changed, state.running]);
  return (
    <div
      className="sample-app"
      data-screen={frame.screen}
      data-step={frame.activeStep}
      data-running={state.running}
      data-changed={frame.changed}
      data-complete={frame.done}
    >
      <div className="sample-caption">
        <span>{t.shop.caption}</span>
        <span>
          {frame.saved
            ? t.shop.statusSaved
            : frame.repairing
              ? t.shop.statusRepairing
              : state.running
                ? t.shop.statusRunning
                : frame.done
                  ? t.shop.statusDone
                  : t.shop.statusIdle}
        </span>
      </div>
      <div className="sample-store" aria-label={t.shop.storeLabel}>
        <div className="store-header">
          <strong>
            trail<span>supply</span>
          </strong>
          <span className="store-account">
            <UserRound size={14} />
            {frame.loggedIn ? 'Alex' : t.shop.guest}
          </span>
        </div>
        <div className="store-viewport" ref={viewport}>
          <div
            className={`store-login store-scene ${frame.screen === 'login' ? 'scene-visible' : ''}`}
            aria-hidden={frame.screen !== 'login'}
          >
            <h4>Good to see you.</h4>
            <p>Your next trip starts here.</p>
            <div className="sample-field">alex@cairn.test</div>
            <div className="sample-field">••••••••</div>
            <span
              className="store-signin sample-target"
              data-target={state.running && frame.activeStep === 0}
            >
              Log in <ArrowRight size={15} />
            </span>
          </div>
          <div
            className={`store-catalog store-scene ${frame.screen === 'catalog' ? 'scene-visible' : ''}`}
            aria-hidden={frame.screen !== 'catalog'}
          >
            <div
              className={`store-cart ${frame.changed ? 'cart-moved' : ''} ${frame.repairing ? 'cart-found' : ''} sample-target`}
              data-target={state.running && frame.activeStep === 2}
            >
              <ShoppingBag size={16} />
              <span>{frame.changed ? 'View bag' : 'Cart'}</span>
              <b>{frame.itemAdded ? '1' : '0'}</b>
            </div>
            {frame.changed && !frame.done && (
              <span className="store-old-target">{t.shop.cartNotFound}</span>
            )}
            {frame.repairing && <i className="store-scan" aria-hidden="true" />}
            <div className="store-product">
              <div className="store-product-icon">
                <Backpack size={70} strokeWidth={1} />
              </div>
              <div>
                <p className="store-category">For the everyday trail</p>
                <h4>Daypack</h4>
                <p>
                  Light on your shoulders.
                  <br />
                  Room for the essentials.
                </p>
                <span
                  className="store-add sample-target"
                  data-target={state.running && frame.activeStep === 1}
                >
                  {frame.itemAdded ? (
                    <>
                      <Check size={15} /> Added to bag
                    </>
                  ) : (
                    <>
                      Add to bag <ArrowRight size={15} />
                    </>
                  )}
                </span>
              </div>
            </div>
          </div>
          <div
            className={`store-bag store-scene ${frame.screen === 'bag' ? 'scene-visible' : ''}`}
            aria-hidden={frame.screen !== 'bag'}
          >
            <div className="store-bag-title">
              <ShoppingBag size={20} />
              <h4>{t.shop.bagTitle}</h4>
              <span>{t.shop.bagCount}</span>
            </div>
            <div className="bag-item">
              <Backpack size={49} strokeWidth={1} />
              <div>
                <strong>Daypack</strong>
                <span>{t.shop.bagVariant}</span>
              </div>
              <b>× 1</b>
            </div>
            <div className="store-done">
              <Check size={17} />
              <span>{t.shop.bagDone}</span>
            </div>
          </div>
          {!frame.done && (
            <div className="sample-cursor" aria-hidden="true">
              <MousePointer2 size={23} fill="currentColor" />
              <span>
                {frame.repairing
                  ? t.shop.cursorRepair
                  : frame.changed && frame.activeStep === 2
                    ? t.shop.cursorViewBag
                    : t.shop.cursorSteps[frame.activeStep]}
              </span>
              <i />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
