import React from 'react';
import { Container } from '@/components/shared/Container';
import { Skeleton } from '@/components/ui/skeleton';

export default function Loading() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <div className="bg-primary text-primary-foreground py-24 md:py-32 relative overflow-hidden">
        <Container className="text-center relative z-10">
          <Skeleton className="h-12 w-3/4 max-w-2xl mx-auto mb-6 rounded-xl bg-white/20" />
          <Skeleton className="h-6 w-1/2 max-w-xl mx-auto rounded-lg bg-white/10" />
        </Container>
      </div>

      <section className="py-8 bg-card border-b relative z-20">
        <Container>
          <div className="flex flex-wrap items-center justify-center gap-4">
            {[1, 2, 3, 4, 5].map((i) => (
              <Skeleton key={i} className="h-10 w-24 rounded-full" />
            ))}
          </div>
        </Container>
      </section>

      <section className="py-24 md:py-36">
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="bg-card rounded-3xl overflow-hidden border border-border/40 h-full flex flex-col">
                <Skeleton className="aspect-[4/3] w-full rounded-none" />
                <div className="p-6 flex flex-col flex-1">
                  <div className="space-y-3 mb-6">
                    <Skeleton className="h-4 w-3/4 rounded-md" />
                    <Skeleton className="h-4 w-1/2 rounded-md" />
                  </div>
                  <Skeleton className="h-4 w-full mb-2 rounded-md" />
                  <Skeleton className="h-4 w-full mb-2 rounded-md" />
                  <Skeleton className="h-4 w-5/6 mb-6 rounded-md" />
                  <Skeleton className="h-10 w-full rounded-md mt-auto" />
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>
    </div>
  );
}
