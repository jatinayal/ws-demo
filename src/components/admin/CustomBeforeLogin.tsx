import React from 'react';
import Image from 'next/image';
import './custom-login.scss';

export function CustomBeforeLogin() {
  return (
    <div className="custom-login-wrapper">
      <div className="custom-brand-logo">
        <Image src="/logo.png" alt="Women's Synergy" width={200} height={80} priority />
      </div>
      <h1 className="custom-login-heading">Admin Portal</h1>
      <p className="custom-login-subtext">Sign in to manage the Women&apos;s Synergy platform.</p>
    </div>
  );
}
