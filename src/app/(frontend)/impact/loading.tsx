import React from 'react';
import { Container } from '@/components/shared/Container';
import { Skeleton } from '@/components/ui/skeleton';

export default function Loading() {
  return (
    <div className="flex min-h-screen flex-col">
      <div className="bg-primary text-primary-foreground relative overflow-hidden py-32 md:py-48">
        <Container className="relative z-10 text-center">
          <Skeleton className="mx-auto mb-6 h-16 w-3/4 max-w-3xl rounded-xl bg-white/20" />
          <Skeleton className="mx-auto h-8 w-1/2 max-w-2xl rounded-lg bg-white/10" />
        </Container>
      </div>

      <section className="bg-card relative z-30 -mt-10 rounded-t-[3rem] border-b py-12 shadow-sm md:py-16">
        <Container>
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="text-center">
                <Skeleton className="mx-auto mb-4 h-12 w-12 rounded-xl" />
                <Skeleton className="mx-auto mb-2 h-10 w-24 rounded-lg" />
                <Skeleton className="mx-auto h-4 w-32 rounded-md" />
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="bg-muted/30 py-24 md:py-36">
        <Container>
          <div className="grid grid-cols-1 items-center gap-16 lg:grid-cols-2">
            <div>
              <Skeleton className="mb-6 h-12 w-3/4 rounded-xl" />
              <Skeleton className="mb-4 h-6 w-full rounded-md" />
              <Skeleton className="mb-10 h-6 w-5/6 rounded-md" />
              <div className="space-y-6">
                {[1, 2, 3].map((i) => (
                  <Skeleton key={i} className="h-24 w-full rounded-2xl" />
                ))}
              </div>
            </div>
            <Skeleton className="aspect-square w-full rounded-3xl lg:aspect-[4/3]" />
          </div>
        </Container>
      </section>
    </div>
  );
}
