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
  size?: 'default' | 'compact';
}

export function HeroSection({
  title,
  subtitle,
  backgroundImage,
  primaryCta,
  secondaryCta,
  align = 'center',
  className,
  size = 'compact',
}: HeroSectionProps) {
  return (
    <section
      className={cn(
        'bg-primary/5 relative flex items-center overflow-hidden',
        size === 'default'
          ? 'min-h-[50vh] py-16 md:min-h-[70vh] md:py-36 lg:min-h-[85vh]'
          : 'min-h-[30vh] py-12 md:min-h-[40vh] md:py-24 lg:min-h-[50vh]',
        className,
      )}
      style={
        backgroundImage
          ? {
              backgroundImage: `url(${backgroundImage})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }
          : undefined
      }
    >
      {backgroundImage && <div className="absolute inset-0 z-0 bg-black/60" />}

      <Container
        className={cn('relative z-10', {
          'text-center': align === 'center',
          'text-left': align === 'left',
        })}
      >
        <motion.div
          className={cn('max-w-4xl', align === 'center' ? 'mx-auto' : '')}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          <motion.h1
            className={cn(
              'leading-tight font-extrabold tracking-tight',
              size === 'default'
                ? 'mb-4 text-4xl sm:text-5xl md:mb-6 md:text-6xl lg:text-7xl'
                : 'mb-3 text-3xl sm:text-4xl md:mb-4 md:text-5xl lg:text-6xl',
              backgroundImage ? 'text-white' : 'text-foreground',
            )}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
          >
            {title}
          </motion.h1>
          {subtitle && (
            <motion.p
              className={cn(
                'max-w-2xl font-medium',
                size === 'default'
                  ? 'mb-6 text-base sm:text-lg md:mb-10 md:text-2xl'
                  : 'mb-6 text-sm sm:text-base md:mb-8 md:text-xl',
                align === 'center' ? 'mx-auto' : '',
                backgroundImage ? 'text-white/90' : 'text-muted-foreground',
              )}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4, ease: 'easeOut' }}
            >
              {subtitle}
            </motion.p>
          )}

          {(primaryCta || secondaryCta) && (
            <motion.div
              className={cn(
                'flex flex-row flex-wrap gap-3 md:gap-4',
                align === 'center' ? 'justify-center' : 'justify-start',
              )}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6, ease: 'easeOut' }}
            >
              {primaryCta && (
                <Link
                  href={primaryCta.url}
                  className={buttonVariants({
                    size: 'lg',
                    className:
                      'hover:text-primary-foreground h-12 rounded-full px-6 text-sm shadow-lg transition-transform hover:scale-105 md:h-14 md:px-10 md:text-base',
                  })}
                >
                  {primaryCta.label}
                </Link>
              )}
              {secondaryCta && (
                <Link
                  href={secondaryCta.url}
                  className={buttonVariants({
                    variant: 'outline',
                    size: 'lg',
                    className: cn(
                      'hover:text-foreground h-12 rounded-full px-6 text-sm transition-transform hover:scale-105 md:h-14 md:px-10 md:text-base',
                      backgroundImage
                        ? 'border-white bg-transparent text-white hover:bg-white/20 hover:text-white'
                        : '',
                    ),
                  })}
                >
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
