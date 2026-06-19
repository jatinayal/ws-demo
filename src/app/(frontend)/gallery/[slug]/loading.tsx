import React from 'react';
import { Container } from '@/components/shared/Container';
import { Skeleton } from '@/components/ui/skeleton';

export default function Loading() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <section className="pt-32 pb-16 md:pt-48 md:pb-24 bg-muted/30 border-b">
        <Container>
          <div className="max-w-4xl">
            <Skeleton className="h-4 w-32 mb-8 rounded-md" />
            <div className="flex gap-3 mb-6">
              <Skeleton className="h-8 w-24 rounded-full" />
              <Skeleton className="h-8 w-24 rounded-full" />
            </div>
            <Skeleton className="h-16 w-3/4 mb-8 rounded-xl" />
            <Skeleton className="h-24 w-full mb-10 rounded-xl" />
            
            <div className="flex gap-4 pt-8 border-t border-border">
              <Skeleton className="h-20 w-48 rounded-xl" />
            </div>
          </div>
        </Container>
      </section>

      <section className="py-16 md:py-24">
        <Container>
          <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
            {/* Generating random-looking heights for the masonry skeleton effect */}
            {[256, 384, 192, 320, 288, 256].map((h, i) => (
              <Skeleton key={i} className="w-full rounded-2xl break-inside-avoid" style={{ minHeight: `${h}px` }} />
            ))}
          </div>
        </Container>
      </section>
    </div>
  );
}
