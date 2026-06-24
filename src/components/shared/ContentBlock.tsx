import React from 'react';
import { cn } from '@/lib/utils';
import { AnimatedSection } from './AnimatedSection';
import { RichText } from '@payloadcms/richtext-lexical/react';
import type { SerializedEditorState } from 'lexical';
import Image from 'next/image';
import { LucideIcon } from 'lucide-react';

export interface ContentBlockProps {
  heading: string;
  content?: Record<string, unknown> | null;
  textContent?: string;
  image?: string;
  icon?: LucideIcon;
  imageAlt?: string;
  imageAlignment?: 'left' | 'right';
  className?: string;
}

export function ContentBlock({
  heading,
  content,
  textContent,
  image,
  icon: Icon,
  imageAlt = 'Content Image',
  imageAlignment = 'right',
  className,
}: ContentBlockProps) {
  const hasImage = !!image;

  return (
    <div
      className={cn(
        'grid grid-cols-1 items-center gap-12',
        hasImage ? 'lg:grid-cols-2 lg:gap-16' : '',
        className,
      )}
    >
      <AnimatedSection
        direction={hasImage ? (imageAlignment === 'right' ? 'right' : 'left') : 'up'}
        className={hasImage && imageAlignment === 'left' ? 'lg:order-2' : ''}
      >
        {Icon && (
          <div className="bg-primary/10 text-primary mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl transition-transform hover:scale-110 md:mx-0">
            <Icon size={32} />
          </div>
        )}
        <h2 className="mb-6 text-center text-3xl font-bold tracking-tight md:text-left md:text-4xl">
          {heading}
        </h2>
        <div className="prose prose-lg dark:prose-invert text-muted-foreground text-justify leading-relaxed md:text-left">
          {content ? (
            <RichText data={content as unknown as SerializedEditorState} />
          ) : (
            <p>{textContent}</p>
          )}
        </div>
      </AnimatedSection>

      {hasImage && (
        <AnimatedSection
          direction={imageAlignment === 'right' ? 'left' : 'right'}
          delay={0.2}
          className={imageAlignment === 'left' ? 'lg:order-1' : ''}
        >
          <div className="relative">
            <Image
              src={image}
              alt={imageAlt}
              width={1200}
              height={900}
              className="h-auto w-full transition-transform duration-700 md:hover:scale-105"
            />
          </div>
        </AnimatedSection>
      )}
    </div>
  );
}
