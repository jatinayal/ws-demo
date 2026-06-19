'use client';

import { useEffect } from 'react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '400px', padding: '24px', textAlign: 'center' }}>
      <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '8px' }}>Something went wrong!</h2>
      <p style={{ color: '#666', marginBottom: '16px' }}>We&apos;re sorry, but an unexpected error occurred.</p>
      <button
        onClick={() => reset()}
        style={{ padding: '8px 24px', backgroundColor: '#d63384', color: '#fff', border: 'none', borderRadius: '6px', cursor: 'pointer', fontSize: '0.875rem', fontWeight: 500 }}
      >
        Try again
      </button>
    </div>
  );
}

