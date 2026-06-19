'use client';
import React from 'react';

export class ErrorBoundary extends React.Component<{children: React.ReactNode, name: string}, {hasError: boolean, error: any}> {
  constructor(props: any) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: any) {
    return { hasError: true, error };
  }

  componentDidCatch(error: any, errorInfo: any) {
    console.error(`ErrorBoundary caught in ${this.props.name}:`, error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ border: '2px solid red', padding: '1rem', color: 'red', margin: '1rem', background: '#ffebee' }}>
          <strong>Error in {this.props.name}:</strong> {this.state.error?.message || 'Unknown error'}
        </div>
      );
    }
    return this.props.children;
  }
}
