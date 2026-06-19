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
    } catch (error) {
      setStatus('error');
    }
  };

  return (
    <section className="bg-secondary text-secondary-foreground py-24 md:py-36 relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('/noise.png')] opacity-[0.03] mix-blend-overlay" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-accent/20 blur-[150px] rounded-full pointer-events-none" />
      
      <Container className="text-center max-w-2xl relative z-10">
        <AnimatedSection direction="up">
          <h2 className="text-4xl md:text-5xl font-extrabold mb-6 tracking-tight text-white">Stay Informed</h2>
          <p className="text-xl opacity-90 mb-12 text-white/90 leading-relaxed font-medium">
            Join our newsletter to receive the latest updates on our global initiatives, upcoming events, and inspiring stories.
          </p>
          
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto">
            <input 
              type="email" 
              placeholder="Enter your email address" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 px-6 py-4 rounded-full text-foreground bg-white border-2 border-transparent focus:border-accent focus:outline-none focus:ring-4 focus:ring-accent/20 transition-all shadow-inner text-lg"
              required
              disabled={status === 'loading' || status === 'success'}
            />
            <Button 
              type="submit" 
              size="lg" 
              variant="secondary" 
              className="bg-primary text-primary-foreground hover:bg-primary/90 shrink-0 h-16 px-10 rounded-full text-lg shadow-lg hover:scale-105 transition-all duration-300"
              disabled={status === 'loading' || status === 'success'}
            >
              {status === 'loading' ? 'Subscribing...' : status === 'success' ? 'Subscribed!' : 'Subscribe'}
            </Button>
          </form>
          {status === 'error' && (
            <p className="text-sm mt-6 text-red-200 font-medium">Something went wrong. Please try again later.</p>
          )}
        </AnimatedSection>
      </Container>
    </section>
  );
}
