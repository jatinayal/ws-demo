'use client';

import React from 'react';
import { Container } from './Container';
import { cn } from '@/lib/utils';
import { buttonVariants } from '@/components/ui/button';
import Link from 'next/link';
import { motion } from 'framer-motion';

interface HeroSectionProps {
  title: string;
  subtitle?: string;
  backgroundImage?: string;
  primaryCta?: { label: string; url: string };
  secondaryCta?: { label: string; url: string };
  align?: 'left' | 'center';
  className?: string;
}

export function HeroSection({
  title,
  subtitle,
  backgroundImage,
  primaryCta,
  secondaryCta,
  align = 'center',
  className,
}: HeroSectionProps) {
  return (
    <section 
      className={cn(
        'relative bg-primary/5 py-24 md:py-36 overflow-hidden flex items-center min-h-[70vh] lg:min-h-[85vh]',
        className
      )}
      style={backgroundImage ? {
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      } : undefined}
    >
      {backgroundImage && <div className="absolute inset-0 bg-black/60 z-0" />}
      
      <Container className={cn('relative z-10', {
        'text-center': align === 'center',
        'text-left': align === 'left',
      })}>
        <motion.div 
          className={cn('max-w-4xl', align === 'center' ? 'mx-auto' : '')}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <motion.h1 
            className={cn(
              'text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight mb-6 leading-tight',
              backgroundImage ? 'text-white' : 'text-foreground'
            )}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          >
            {title}
          </motion.h1>
          {subtitle && (
            <motion.p 
              className={cn(
                'text-lg md:text-2xl mb-10 max-w-2xl font-medium',
                align === 'center' ? 'mx-auto' : '',
                backgroundImage ? 'text-white/90' : 'text-muted-foreground'
              )}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
            >
              {subtitle}
            </motion.p>
          )}
          
          {(primaryCta || secondaryCta) && (
            <motion.div 
              className={cn(
                'flex flex-col sm:flex-row gap-4',
                align === 'center' ? 'justify-center' : 'justify-start'
              )}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
            >
              {primaryCta && (
                <Link href={primaryCta.url} className={buttonVariants({ size: 'lg', className: 'text-base h-14 px-10 rounded-full shadow-lg hover:scale-105 hover:text-primary-foreground transition-transform' })}>
                  {primaryCta.label}
                </Link>
              )}
              {secondaryCta && (
                <Link href={secondaryCta.url} className={buttonVariants({ variant: 'outline', size: 'lg', className: cn('text-base h-14 px-10 rounded-full hover:scale-105 hover:text-foreground transition-transform', backgroundImage ? 'bg-transparent text-white border-white hover:bg-white/20 hover:text-white' : '') })}>
                  {secondaryCta.label}
                </Link>
              )}
            </motion.div>
          )}
        </motion.div>
      </Container>
    </section>
  );
}
