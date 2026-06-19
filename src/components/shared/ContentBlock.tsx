import React from 'react';
import { cn } from '@/lib/utils';
import { AnimatedSection } from './AnimatedSection';
import { RichText } from '@payloadcms/richtext-lexical/react';
import Image from 'next/image';
import { LucideIcon } from 'lucide-react';

export interface ContentBlockProps {
  heading: string;
  content?: any;
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
  imageAlt = "Content Image",
  imageAlignment = 'right',
  className
}: ContentBlockProps) {
  const hasImage = !!image;

  return (
    <div className={cn("grid grid-cols-1 gap-12 items-center", hasImage ? "lg:grid-cols-2 lg:gap-16" : "", className)}>
      <AnimatedSection direction={hasImage ? (imageAlignment === 'right' ? 'right' : 'left') : 'up'} className={hasImage && imageAlignment === 'left' ? 'lg:order-2' : ''}>
        {Icon && (
          <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center text-primary mb-6 transition-transform hover:scale-110">
            <Icon size={32} />
          </div>
        )}
        <h2 className="text-3xl md:text-4xl font-bold mb-6 tracking-tight">{heading}</h2>
        <div className="prose prose-lg dark:prose-invert text-muted-foreground leading-relaxed">
          {content ? <RichText data={content} /> : <p>{textContent}</p>}
        </div>
      </AnimatedSection>
      
      {hasImage && (
        <AnimatedSection direction={imageAlignment === 'right' ? 'left' : 'right'} delay={0.2} className={imageAlignment === 'left' ? 'lg:order-1' : ''}>
          <div className="relative aspect-[4/3] rounded-3xl overflow-hidden shadow-xl ring-1 ring-border/50">
            <Image src={image} alt={imageAlt} fill className="object-cover transition-transform duration-700 hover:scale-105" />
          </div>
        </AnimatedSection>
      )}
    </div>
  );
}
