import React from 'react';
import { Container } from '@/components/shared/Container';
import { Skeleton } from '@/components/ui/skeleton';

export default function Loading() {
  return (
    <div className="flex flex-col min-h-screen">
      <div className="bg-primary text-primary-foreground py-32 md:py-48 relative overflow-hidden">
        <Container className="text-center relative z-10">
          <Skeleton className="h-16 w-3/4 max-w-3xl mx-auto mb-6 rounded-xl bg-white/20" />
          <Skeleton className="h-8 w-1/2 max-w-2xl mx-auto rounded-lg bg-white/10" />
        </Container>
      </div>

      <section className="py-12 md:py-16 bg-card border-b relative -mt-10 z-30 rounded-t-[3rem] shadow-sm">
        <Container>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="text-center">
                <Skeleton className="w-12 h-12 mx-auto rounded-xl mb-4" />
                <Skeleton className="h-10 w-24 mx-auto mb-2 rounded-lg" />
                <Skeleton className="h-4 w-32 mx-auto rounded-md" />
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="py-24 md:py-36 bg-muted/30">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <Skeleton className="h-12 w-3/4 mb-6 rounded-xl" />
              <Skeleton className="h-6 w-full mb-4 rounded-md" />
              <Skeleton className="h-6 w-5/6 mb-10 rounded-md" />
              <div className="space-y-6">
                {[1, 2, 3].map((i) => (
                  <Skeleton key={i} className="h-24 w-full rounded-2xl" />
                ))}
              </div>
            </div>
            <Skeleton className="aspect-square lg:aspect-[4/3] w-full rounded-3xl" />
          </div>
        </Container>
      </section>
    </div>
  );
}
