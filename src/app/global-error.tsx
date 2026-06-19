'use client';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="en">
      <body>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', padding: '24px', textAlign: 'center' }}>
          <h2 style={{ fontSize: '1.875rem', fontWeight: 700, marginBottom: '16px' }}>Critical System Error</h2>
          <p style={{ color: '#666', marginBottom: '32px', maxWidth: '28rem' }}>
            A critical error occurred. Our team has been notified.
          </p>
          <button
            onClick={() => reset()}
            style={{ padding: '8px 24px', backgroundColor: '#d63384', color: '#fff', border: 'none', borderRadius: '6px', cursor: 'pointer', fontSize: '0.875rem', fontWeight: 500 }}
          >
            Try again
          </button>
        </div>
      </body>
    </html>
  );
}

