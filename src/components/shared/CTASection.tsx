import React from 'react';
import { Container } from './Container';
import { buttonVariants } from '@/components/ui/button';
import Link from 'next/link';
import { AnimatedSection } from './AnimatedSection';

interface CTASectionProps {
  title: string;
  description: string;
  buttonLabel: string;
  buttonUrl: string;
}

export function CTASection({ title, description, buttonLabel, buttonUrl }: CTASectionProps) {
  return (
    <section className="bg-gradient-to-br from-primary to-primary/80 text-primary-foreground py-24 md:py-32 relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('/noise.png')] opacity-[0.03] mix-blend-overlay" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-white/10 blur-[120px] rounded-full pointer-events-none" />

      <Container className="text-center max-w-3xl relative z-10">
        <AnimatedSection direction="up">
          <h2 className="text-4xl md:text-5xl font-extrabold mb-6 tracking-tight text-white">{title}</h2>
          <p className="text-xl md:text-2xl mb-12 opacity-90 text-white/90 leading-relaxed font-medium">{description}</p>
          <Link href={buttonUrl} className={buttonVariants({ size: 'lg', variant: 'secondary', className: 'bg-white !text-primary hover:bg-white/90 hover:!text-primary hover:scale-105 h-16 px-12 text-lg rounded-full shadow-xl transition-all duration-300' })}>
            {buttonLabel}
          </Link>
        </AnimatedSection>
      </Container>
    </section>
  );
}
