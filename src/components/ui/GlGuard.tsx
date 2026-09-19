import { Component, type ReactNode } from 'react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
}

/**
 * Catches WebGL/R3F failures so a failing canvas never unmounts the rest of
 * the page. Renders an elegant static fallback when 3D is unavailable.
 */
export class GlGuard extends Component<Props, State> {
  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  state: State = { hasError: false };

  componentDidCatch(error: unknown) {
    console.warn('[QUICK CRAVE] 3D canvas fallback:', error);
  }

  render() {
    if (this.state.hasError) {
      return (
        this.props.fallback ?? (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center px-6">
              <div className="text-4xl mb-3 opacity-60">🐟</div>
              <p className="text-sm text-seafoam/60">The sea looks quiet from here.</p>
              <p className="text-xs text-seafoam/40 mt-1">Enable WebGL for the full experience.</p>
            </div>
          </div>
        )
      );
    }
    return this.props.children;
  }
}