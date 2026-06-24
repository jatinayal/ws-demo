import React from 'react';
import { Container } from '@/components/shared/Container';
import { Skeleton } from '@/components/ui/skeleton';

export default function Loading() {
  return (
    <div className="flex min-h-screen flex-col">
      <div className="bg-primary text-primary-foreground relative overflow-hidden py-24 md:py-32">
        <Container className="relative z-10 text-center">
          <Skeleton className="mx-auto mb-6 h-12 w-3/4 max-w-2xl rounded-xl bg-white/20" />
          <Skeleton className="mx-auto h-6 w-1/2 max-w-xl rounded-lg bg-white/10" />
        </Container>
      </div>

      <section className="bg-background py-24 md:py-36">
        <Container>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div
                key={i}
                className="bg-card border-border/40 flex h-full flex-col overflow-hidden rounded-3xl border p-8"
              >
                <div className="mb-6 flex items-center space-x-4">
                  <Skeleton className="h-16 w-16 shrink-0 rounded-full" />
                  <div className="flex-1 space-y-2">
                    <Skeleton className="h-6 w-3/4 rounded-md" />
                    <Skeleton className="h-4 w-1/2 rounded-md" />
                  </div>
                </div>
                <Skeleton className="mb-2 h-4 w-full rounded-md" />
                <Skeleton className="mb-2 h-4 w-full rounded-md" />
                <Skeleton className="mb-6 h-4 w-3/4 rounded-md" />
                <Skeleton className="mt-auto h-8 w-1/3 rounded-md" />
              </div>
            ))}
          </div>
        </Container>
      </section>
    </div>
  );
}
