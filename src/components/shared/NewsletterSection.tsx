'use client';

import React, { useState } from 'react';
import { Container } from './Container';
import { Button } from '@/components/ui/button';
import { AnimatedSection } from './AnimatedSection';

export function NewsletterSection() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setStatus('loading');

    try {
      // Assuming a Payload CMS API endpoint for creating NewsletterSubscribers
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
    <section className="bg-secondary text-secondary-foreground relative overflow-hidden px-4 py-16 md:px-0 md:py-36">
      <div className="absolute inset-0 bg-[url('/noise.png')] opacity-[0.03] mix-blend-overlay" />
      <div className="bg-accent/20 pointer-events-none absolute top-1/2 left-1/2 h-[1000px] w-[1000px] -translate-x-1/2 -translate-y-1/2 rounded-full blur-[150px]" />

      <Container className="relative z-10 max-w-2xl text-center">
        <AnimatedSection direction="up">
          <h2 className="mb-4 text-3xl font-extrabold tracking-tight text-white md:mb-6 md:text-5xl">
            Stay Informed
          </h2>
          <p className="mb-8 text-lg leading-relaxed font-medium text-white/90 opacity-90 md:mb-12 md:text-xl">
            Join our newsletter to receive the latest updates on our global initiatives, upcoming
            events, and inspiring stories.
          </p>

          <form
            onSubmit={handleSubmit}
            className="mx-auto flex max-w-lg flex-col gap-3 sm:flex-row md:gap-4"
          >
            <input
              type="email"
              placeholder="Enter your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="text-foreground focus:border-accent focus:ring-accent/20 flex-1 rounded-full border-2 border-transparent bg-white px-5 py-3 text-base shadow-inner transition-all focus:ring-4 focus:outline-none md:px-6 md:py-4 md:text-lg"
              required
              disabled={status === 'loading' || status === 'success'}
            />
            <Button
              type="submit"
              size="lg"
              variant="secondary"
              className="bg-primary text-primary-foreground hover:bg-primary/90 h-14 shrink-0 rounded-full px-8 text-base shadow-lg transition-all duration-300 hover:scale-105 md:h-16 md:px-10 md:text-lg"
              disabled={status === 'loading' || status === 'success'}
            >
              {status === 'loading'
                ? 'Subscribing...'
                : status === 'success'
                  ? 'Subscribed!'
                  : 'Subscribe'}
            </Button>
          </form>
          {status === 'error' && (
            <p className="mt-6 text-sm font-medium text-red-200">
              Something went wrong. Please try again later.
            </p>
          )}
        </AnimatedSection>
      </Container>
    </section>
  );
}
