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
    <section className="from-primary to-primary/80 text-primary-foreground relative overflow-hidden bg-gradient-to-br px-4 py-16 md:px-0 md:py-32">
      <div className="absolute inset-0 bg-[url('/noise.png')] opacity-[0.03] mix-blend-overlay" />
      <div className="pointer-events-none absolute top-0 left-1/2 h-[800px] w-[800px] -translate-x-1/2 rounded-full bg-white/10 blur-[120px]" />

      <Container className="relative z-10 max-w-3xl text-center">
        <AnimatedSection direction="up">
          <h2 className="mb-4 text-3xl font-extrabold tracking-tight text-white md:mb-6 md:text-5xl">
            {title}
          </h2>
          <p className="mb-8 text-lg leading-relaxed font-medium text-white/90 opacity-90 md:mb-12 md:text-2xl">
            {description}
          </p>
          <Link
            href={buttonUrl}
            className={buttonVariants({
              size: 'lg',
              variant: 'secondary',
              className:
                '!text-primary hover:!text-primary h-14 rounded-full bg-white px-8 text-base shadow-xl transition-all duration-300 hover:scale-105 hover:bg-white/90 md:h-16 md:px-12 md:text-lg',
            })}
          >
            {buttonLabel}
          </Link>
        </AnimatedSection>
      </Container>
    </section>
  );
}
