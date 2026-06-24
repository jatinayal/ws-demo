import React from 'react';
import { Container } from '@/components/shared/Container';
import { Skeleton } from '@/components/ui/skeleton';

export default function Loading() {
  return (
    <div className="bg-background flex min-h-screen flex-col">
      <section className="bg-muted/30 border-b pt-32 pb-16 md:pt-48 md:pb-24">
        <Container>
          <div className="max-w-4xl">
            <Skeleton className="mb-8 h-4 w-32 rounded-md" />
            <div className="mb-6 flex gap-3">
              <Skeleton className="h-8 w-24 rounded-full" />
              <Skeleton className="h-8 w-24 rounded-full" />
            </div>
            <Skeleton className="mb-8 h-16 w-3/4 rounded-xl" />
            <Skeleton className="mb-10 h-24 w-full rounded-xl" />

            <div className="border-border flex gap-4 border-t pt-8">
              <Skeleton className="h-20 w-48 rounded-xl" />
            </div>
          </div>
        </Container>
      </section>

      <section className="py-16 md:py-24">
        <Container>
          <div className="columns-1 gap-6 space-y-6 sm:columns-2 lg:columns-3">
            {/* Generating random-looking heights for the masonry skeleton effect */}
            {[256, 384, 192, 320, 288, 256].map((h, i) => (
              <Skeleton
                key={i}
                className="w-full break-inside-avoid rounded-2xl"
                style={{ minHeight: `${h}px` }}
              />
            ))}
          </div>
        </Container>
      </section>
    </div>
  );
}
