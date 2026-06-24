import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import Image from 'next/image';
import { Quote } from 'lucide-react';
import { cn } from '@/lib/utils';
import { AnimatedSection } from './AnimatedSection';

export interface QuoteCardProps {
  quote: string;
  authorName: string;
  authorTitle?: string;
  image?: string;
  className?: string;
  delay?: number;
}

export function QuoteCard({
  quote,
  authorName,
  authorTitle,
  image,
  className,
  delay = 0,
}: QuoteCardProps) {
  return (
    <AnimatedSection direction="up" delay={delay}>
      <Card
        className={cn(
          'bg-card border-border/40 group relative flex h-full flex-col rounded-2xl border px-1 pt-6 pb-2 shadow-sm transition-all duration-500 hover:shadow-xl md:rounded-3xl md:px-4 md:pt-10 md:pb-10',
          className,
        )}
      >
        <div className="text-primary/10 group-hover:text-primary/20 absolute top-4 right-4 transition-colors duration-300 md:top-8 md:right-8">
          <Quote className="h-8 w-8 md:h-16 md:w-16" />
        </div>
        <CardContent className="flex flex-1 flex-col justify-between pt-2 md:pt-6">
          <p className="text-foreground/80 relative z-10 mb-6 text-sm leading-relaxed italic md:mb-10 md:text-xl">
            &quot;{quote}&quot;
          </p>
          <div className="mt-auto flex items-center space-x-3 md:space-x-5">
            {image && (
              <div className="border-primary/20 group-hover:border-primary/50 relative h-10 w-10 overflow-hidden rounded-full border transition-colors duration-300 md:h-14 md:w-14">
                <Image src={image} alt={authorName} fill className="object-cover" />
              </div>
            )}
            <div>
              <div className="text-sm font-bold tracking-tight md:text-lg">{authorName}</div>
              {authorTitle && (
                <div className="text-primary mt-0.5 text-[11px] leading-tight font-medium md:text-sm">
                  {authorTitle}
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </AnimatedSection>
  );
}
