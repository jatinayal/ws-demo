import React from 'react';
import { Container } from '@/components/shared/Container';
import { Skeleton } from '@/components/ui/skeleton';

export default function Loading() {
  return (
    <div className="bg-background flex min-h-screen flex-col">
      <section className="bg-primary text-primary-foreground relative overflow-hidden pt-32 pb-24 md:pt-48 md:pb-36">
        <Container className="relative z-10">
          <div className="max-w-4xl">
            <Skeleton className="mb-8 h-4 w-32 rounded-md bg-white/20" />
            <div className="mb-6 flex gap-3">
              <Skeleton className="h-8 w-24 rounded-full bg-white/20" />
              <Skeleton className="h-8 w-24 rounded-full bg-white/20" />
            </div>
            <Skeleton className="mb-6 h-16 w-3/4 rounded-xl bg-white/20" />
            <Skeleton className="mb-10 h-24 w-full rounded-xl bg-white/10" />
            <div className="flex gap-6">
              <Skeleton className="h-12 w-48 rounded-xl bg-white/20" />
              <Skeleton className="h-12 w-48 rounded-xl bg-white/20" />
            </div>
          </div>
        </Container>
      </section>

      <section className="relative z-20 py-16 md:py-24">
        <Container>
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="space-y-16 lg:col-span-8">
              <div>
                <Skeleton className="mb-6 h-10 w-1/3 rounded-lg" />
                <Skeleton className="mb-4 h-6 w-full rounded-md" />
                <Skeleton className="mb-4 h-6 w-full rounded-md" />
                <Skeleton className="mb-4 h-6 w-5/6 rounded-md" />
              </div>
              <div>
                <Skeleton className="mb-8 h-10 w-1/3 rounded-lg" />
                <div className="space-y-6">
                  {[1, 2].map((i) => (
                    <Skeleton key={i} className="h-24 w-full rounded-2xl" />
                  ))}
                </div>
              </div>
            </div>

            <div className="lg:col-span-4">
              <div className="sticky top-32 space-y-8">
                <Skeleton className="h-96 w-full rounded-3xl" />
                <Skeleton className="h-48 w-full rounded-3xl" />
              </div>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}
