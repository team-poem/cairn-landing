'use client';
import {
  ArrowRight,
  Backpack,
  Check,
  MousePointer2,
  ShoppingBag,
  UserRound,
} from 'lucide-react';
import { demoFrame, type DemoState } from '@/lib/demo-state';
export function ShopDemo({ state }: { state: DemoState }) {
  const frame = demoFrame(state);
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
        <span>Sample app</span>
        <span>
          {frame.saved
            ? 'Path saved'
            : frame.repairing
              ? 'Finding the new button…'
              : state.running
                ? 'Cairn is running'
                : frame.done
                  ? 'Task complete'
                  : 'Ready to run'}
        </span>
      </div>
      <div
        className="sample-store"
        aria-label="Illustrated Trail Supply shopping app"
      >
        <div className="store-header">
          <strong>
            trail<span>supply</span>
          </strong>
          <span className="store-account">
            <UserRound size={14} />
            {frame.loggedIn ? 'Alex' : 'Guest'}
          </span>
        </div>
        <div className="store-viewport">
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
              className={`store-cart ${frame.changed ? 'cart-moved' : ''} sample-target`}
              data-target={state.running && frame.activeStep === 2}
            >
              <ShoppingBag size={16} />
              <span>{frame.changed ? 'View bag' : 'Cart'}</span>
              <b>{frame.itemAdded ? '1' : '0'}</b>
            </div>
            {frame.changed && !frame.done && (
              <span className="store-old-target">Cart · not found</span>
            )}
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
              <h4>Your bag</h4>
              <span>1 item</span>
            </div>
            <div className="bag-item">
              <Backpack size={49} strokeWidth={1} />
              <div>
                <strong>Daypack</strong>
                <span>Slate / One size</span>
              </div>
              <b>× 1</b>
            </div>
            <div className="store-done">
              <Check size={17} />
              <span>Login, add, and open. All done.</span>
            </div>
          </div>
          {!frame.done && (
            <div className="sample-cursor" aria-hidden="true">
              <MousePointer2 size={23} fill="currentColor" />
              <span>
                {frame.repairing
                  ? 'Find replacement'
                  : [
                      'Log in',
                      'Add item',
                      frame.changed ? 'View bag' : 'Open cart',
                    ][frame.activeStep]}
              </span>
              <i />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
