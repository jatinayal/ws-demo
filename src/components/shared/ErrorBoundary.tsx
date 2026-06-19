'use client';
import React from 'react';

export class ErrorBoundary extends React.Component<
  { children: React.ReactNode; name: string },
  { hasError: boolean; error: Error | null }
> {
  constructor(props: { children: React.ReactNode; name: string }) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error(`ErrorBoundary caught in ${this.props.name}:`, error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div
          style={{
            border: '2px solid red',
            padding: '1rem',
            color: 'red',
            margin: '1rem',
            background: '#ffebee',
          }}
        >
          <strong>Error in {this.props.name}:</strong>{' '}
          {this.state.error?.message || 'Unknown error'}
        </div>
      );
    }
    return this.props.children;
  }
}
