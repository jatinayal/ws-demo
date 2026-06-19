import React from 'react';
import { cn } from '@/lib/utils';
import { AnimatedSection } from './AnimatedSection';

export interface TimelineItem {
  year: string;
  title: string;
  description: string;
}

interface TimelineProps {
  items: TimelineItem[];
  className?: string;
}

export function Timeline({ items, className }: TimelineProps) {
  if (!items || items.length === 0) return null;

  return (
    <div className={cn("relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-border before:to-transparent", className)}>
      {items.map((item, idx) => (
        <AnimatedSection key={idx} direction="up" delay={idx * 0.15}>
          <div className="relative group mb-12 last:mb-0 flex items-center md:block">
            {/* Mobile Dot */}
            <div className="md:hidden flex items-center justify-center w-10 h-10 rounded-full border-4 border-background bg-accent shadow shrink-0 z-10 transition-transform duration-300 group-hover:scale-125 mr-6">
              <div className="w-2 h-2 rounded-full bg-white"></div>
            </div>

            {/* Content Card */}
            <div className={cn(
              "w-[calc(100%-4rem)] md:w-[calc(50%-3rem)] p-6 rounded-3xl bg-card border border-border/50 shadow-sm group-hover:border-accent/50 group-hover:shadow-md transition-all duration-300",
              idx % 2 === 0 ? "md:ml-auto" : "md:mr-auto"
            )}>
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-3 gap-2">
                <h4 className="font-bold text-xl md:text-2xl">{item.title}</h4>
                <span className="text-sm font-bold text-accent bg-accent/10 px-4 py-1.5 rounded-full w-fit whitespace-nowrap">{item.year}</span>
              </div>
              <p className="text-muted-foreground leading-relaxed">{item.description}</p>
            </div>

            {/* Desktop Dot */}
            <div className="hidden md:flex absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 items-center justify-center w-10 h-10 rounded-full border-4 border-background bg-accent shadow shrink-0 z-10 transition-transform duration-300 group-hover:scale-125">
              <div className="w-2 h-2 rounded-full bg-white"></div>
            </div>
          </div>
        </AnimatedSection>
      ))}
    </div>
  );
}
