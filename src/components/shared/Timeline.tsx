'use client';
import React, { useState } from 'react';
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
  // Mobile view state and refs
  const [activeItem, setActiveItem] = useState<TimelineItem | null>(() =>
    items.length > 0 ? items[0] : null,
  );
  const scrollRef = React.useRef<HTMLDivElement>(null);
  const itemRefs = React.useRef<(HTMLDivElement | null)[]>([]);

  const handleScroll = () => {
    if (!scrollRef.current) return;
    const container = scrollRef.current;

    let closestIdx = 0;
    let minDiff = Infinity;

    itemRefs.current.forEach((el, idx) => {
      if (!el) return;
      // offsetLeft is relative to the offsetParent (which should be the container if it's positioned relative)
      // Since container is flex, let's use getBoundingClientRect
      const elRect = el.getBoundingClientRect();
      const containerRect = container.getBoundingClientRect();
      const elCenter = elRect.left - containerRect.left + elRect.width / 2;
      const diff = Math.abs(elCenter - containerRect.width / 2);

      if (diff < minDiff) {
        minDiff = diff;
        closestIdx = idx;
      }
    });

    if (items[closestIdx] && items[closestIdx] !== activeItem) {
      setActiveItem(items[closestIdx]);
    }
  };

  if (!items || items.length === 0) return null;

  return (
    <>
      {/* Desktop View */}
      <div
        className={cn(
          'before:via-border relative hidden before:absolute before:inset-0 before:mx-auto before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:to-transparent md:block',
          className,
        )}
      >
        {items.map((item, idx) => (
          <AnimatedSection key={idx} direction="up" delay={idx * 0.15}>
            <div className="group relative mb-12 block last:mb-0">
              {/* Content Card */}
              <div
                className={cn(
                  'bg-card border-border/50 group-hover:border-accent/50 w-[calc(100%-4rem)] rounded-3xl border p-6 shadow-sm transition-all duration-300 group-hover:shadow-md md:w-[calc(50%-3rem)]',
                  idx % 2 === 0 ? 'md:ml-auto' : 'md:mr-auto',
                )}
              >
                <div className="mb-3 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                  <h4 className="text-xl font-bold md:text-2xl">{item.title}</h4>
                  <span className="text-accent bg-accent/10 w-fit rounded-full px-4 py-1.5 text-sm font-bold whitespace-nowrap">
                    {item.year}
                  </span>
                </div>
                <p className="text-muted-foreground leading-relaxed">{item.description}</p>
              </div>

              {/* Desktop Dot */}
              <div className="border-background bg-accent absolute top-1/2 left-1/2 z-10 hidden h-10 w-10 shrink-0 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-4 shadow transition-transform duration-300 group-hover:scale-125 md:flex">
                <div className="h-2 w-2 rounded-full bg-white"></div>
              </div>
            </div>
          </AnimatedSection>
        ))}
      </div>

      {/* Mobile View */}
      <div className="relative flex w-full flex-col md:hidden">
        <div
          ref={scrollRef}
          onScroll={handleScroll}
          className="hide-scrollbar relative -mx-4 flex snap-x snap-mandatory items-center overflow-x-auto scroll-smooth py-8"
        >
          {/* Continuous background line */}
          <div className="bg-border absolute top-[60%] right-0 left-0 z-0 h-0.5 -translate-y-1/2" />

          {/* Spacer to allow first item to snap to center */}
          <div className="w-[calc(50vw-4rem)] shrink-0" />

          {items.map((item, idx) => {
            const isActive = activeItem === item;
            return (
              <div
                key={idx}
                ref={(el) => {
                  itemRefs.current[idx] = el;
                }}
                className="group relative z-10 flex w-32 shrink-0 cursor-pointer snap-center flex-col items-center justify-center"
                onClick={() => {
                  itemRefs.current[idx]?.scrollIntoView({
                    behavior: 'smooth',
                    inline: 'center',
                    block: 'nearest',
                  });
                }}
              >
                <span
                  className={cn(
                    'mb-4 rounded-full px-3 py-1 text-xs font-bold transition-all duration-300',
                    isActive ? 'text-accent bg-accent/10 scale-110' : 'text-muted-foreground',
                  )}
                >
                  {item.year}
                </span>
                <div
                  className={cn(
                    'border-background h-4 w-4 rounded-full border-4 transition-all duration-300',
                    isActive
                      ? 'bg-accent scale-[1.75] shadow-md'
                      : 'bg-muted-foreground/30 group-hover:bg-muted-foreground/50',
                  )}
                ></div>
              </div>
            );
          })}

          {/* Spacer to allow last item to snap to center */}
          <div className="w-[calc(50vw-4rem)] shrink-0" />
        </div>

        {/* Mobile Detail View (Fixed Height Container to prevent layout shifts) */}
        <div className="bg-muted/20 border-border/50 relative mt-2 flex min-h-[220px] flex-col justify-center overflow-hidden rounded-2xl border p-6 transition-all duration-500 md:hidden">
          {activeItem ? (
            <div
              key={activeItem.title}
              className="animate-in fade-in slide-in-from-right-4 duration-500"
            >
              <h4 className="text-foreground mb-3 text-xl font-bold">{activeItem.title}</h4>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {activeItem.description}
              </p>
            </div>
          ) : (
            <div className="flex h-full items-center justify-center">
              <span className="text-muted-foreground text-sm italic">
                Scroll to view milestones...
              </span>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
