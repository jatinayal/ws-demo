import React from 'react';

export const Logo = () => (
  <div className="flex items-center gap-3">
    <img src="/logo.png" alt="Women's Synergy" style={{ height: '40px' }} />
    <span style={{ fontWeight: 'bold', fontSize: '1.25rem' }}>Women's Synergy</span>
  </div>
);

export const Icon = () => (
  <img src="/logo.png" alt="Women's Synergy" style={{ height: '32px', width: '32px' }} />
);
