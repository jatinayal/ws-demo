'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export function FooterNewsletterForm() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setStatus('loading');

    try {
      const res = await fetch('/api/newsletter-subscribers', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, status: 'subscribed' }),
      });

      if (res.ok) {
        setStatus('success');
        setEmail('');
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  };

  return (
    <div className="mt-4">
      <form onSubmit={handleSubmit} className="flex flex-col gap-2 sm:flex-row">
        <Input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          disabled={status === 'loading' || status === 'success'}
          className="bg-background/50 h-10"
        />
        <Button
          type="submit"
          disabled={status === 'loading' || status === 'success'}
          className="h-10 shrink-0"
        >
          {status === 'loading' ? '...' : status === 'success' ? 'Subscribed!' : 'Subscribe'}
        </Button>
      </form>
      <p className="text-muted-foreground mt-4 text-sm">
        Subscribe to our newsletter to receive updates on our programs and impact.
      </p>

      {status === 'error' && (
        <p className="text-destructive mt-2 text-xs">Something went wrong. Please try again.</p>
      )}
    </div>
  );
}
