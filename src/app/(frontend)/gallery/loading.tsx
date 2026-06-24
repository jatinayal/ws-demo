import React from 'react';
import { Container } from '@/components/shared/Container';
import { Skeleton } from '@/components/ui/skeleton';

export default function Loading() {
  return (
    <div className="bg-background flex min-h-screen flex-col">
      <div className="bg-primary text-primary-foreground relative overflow-hidden py-24 md:py-32">
        <Container className="relative z-10 text-center">
          <Skeleton className="mx-auto mb-6 h-12 w-3/4 max-w-2xl rounded-xl bg-white/20" />
          <Skeleton className="mx-auto h-6 w-1/2 max-w-xl rounded-lg bg-white/10" />
        </Container>
      </div>

      <section className="bg-card relative z-20 border-b py-8">
        <Container>
          <div className="flex flex-wrap items-center justify-center gap-4">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <Skeleton key={i} className="h-10 w-24 rounded-full" />
            ))}
          </div>
        </Container>
      </section>

      <section className="py-24 md:py-36">
        <Container>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div
                key={i}
                className="bg-card border-border/40 flex h-full flex-col overflow-hidden rounded-3xl border"
              >
                <Skeleton className="aspect-[4/3] w-full rounded-none" />
                <div className="flex flex-1 flex-col p-6">
                  <Skeleton className="mb-4 h-6 w-3/4 rounded-md" />
                  <Skeleton className="mt-auto h-4 w-1/3 rounded-md" />
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>
    </div>
  );
}
