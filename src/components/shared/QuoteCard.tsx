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

export function QuoteCard({ quote, authorName, authorTitle, image, className, delay = 0 }: QuoteCardProps) {
  return (
    <AnimatedSection direction="up" delay={delay}>
      <Card className={cn("bg-card border border-border/40 shadow-sm hover:shadow-xl transition-all duration-500 relative pt-10 px-4 rounded-3xl h-full flex flex-col group", className)}>
        <div className="absolute top-8 right-8 text-primary/10 group-hover:text-primary/20 transition-colors duration-300">
          <Quote size={64} />
        </div>
        <CardContent className="pt-6 flex-1 flex flex-col justify-between">
          <p className="text-lg md:text-xl text-foreground/80 italic mb-10 relative z-10 leading-relaxed">&quot;{quote}&quot;</p>
          <div className="flex items-center space-x-5 mt-auto">
            {image && (
              <div className="relative w-14 h-14 rounded-full overflow-hidden border-2 border-primary/20 group-hover:border-primary/50 transition-colors duration-300">
                <Image src={image} alt={authorName} fill className="object-cover" />
              </div>
            )}
            <div>
              <div className="font-bold text-lg tracking-tight">{authorName}</div>
              {authorTitle && <div className="text-sm font-medium text-primary mt-0.5">{authorTitle}</div>}
            </div>
          </div>
        </CardContent>
      </Card>
    </AnimatedSection>
  );
}
