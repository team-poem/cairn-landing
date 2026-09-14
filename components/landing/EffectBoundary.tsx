'use client';
import { Component, type ReactNode } from 'react';
// Decorative effects can fail without taking down the product content.
export class EffectBoundary extends Component<
  { children: ReactNode },
  { failed: boolean }
> {
  state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  render() {
    return this.state.failed ? null : this.props.children;
  }
}
