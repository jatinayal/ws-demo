import React from 'react';
import { Container } from '@/components/shared/Container';
import { Skeleton } from '@/components/ui/skeleton';

export default function Loading() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <section className="relative pt-32 pb-24 md:pt-48 md:pb-36 overflow-hidden bg-primary text-primary-foreground">
        <Container className="relative z-10">
          <div className="max-w-4xl">
            <Skeleton className="h-4 w-32 mb-8 rounded-md bg-white/20" />
            <div className="flex gap-3 mb-6">
              <Skeleton className="h-8 w-24 rounded-full bg-white/20" />
              <Skeleton className="h-8 w-24 rounded-full bg-white/20" />
            </div>
            <Skeleton className="h-16 w-3/4 mb-6 rounded-xl bg-white/20" />
            <Skeleton className="h-24 w-full mb-10 rounded-xl bg-white/10" />
            <div className="flex gap-6">
              <Skeleton className="h-12 w-48 rounded-xl bg-white/20" />
              <Skeleton className="h-12 w-48 rounded-xl bg-white/20" />
            </div>
          </div>
        </Container>
      </section>

      <section className="py-16 md:py-24 relative z-20">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
            <div className="lg:col-span-8 space-y-16">
              <div>
                <Skeleton className="h-10 w-1/3 mb-6 rounded-lg" />
                <Skeleton className="h-6 w-full mb-4 rounded-md" />
                <Skeleton className="h-6 w-full mb-4 rounded-md" />
                <Skeleton className="h-6 w-5/6 mb-4 rounded-md" />
              </div>
              <div>
                <Skeleton className="h-10 w-1/3 mb-8 rounded-lg" />
                <div className="space-y-6">
                  {[1, 2].map((i) => (
                    <Skeleton key={i} className="h-24 w-full rounded-2xl" />
                  ))}
                </div>
              </div>
            </div>

            <div className="lg:col-span-4">
              <div className="space-y-8 sticky top-32">
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
