import { Component, type ErrorInfo, type ReactNode } from 'react';
import { ERROR_BOUNDARY } from '@/constants';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
}

export default class ErrorBoundary extends Component<Props, State> {
  override state: State = { hasError: false };

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  override componentDidCatch(error: Error, info: ErrorInfo) {
    if (import.meta.env.DEV) {
      console.error('ErrorBoundary caught:', error, info);
    }
  }

  private handleRetry = () => {
    this.setState({ hasError: false });
  };

  override render() {
    if (this.state.hasError) {
      return (
        <div className="error-boundary" role="alert">
          <h2>{ERROR_BOUNDARY.TITLE}</h2>
          <p>{ERROR_BOUNDARY.DESCRIPTION}</p>
          <button className="btn btn--primary" onClick={this.handleRetry}>
            {ERROR_BOUNDARY.RETRY}
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}
