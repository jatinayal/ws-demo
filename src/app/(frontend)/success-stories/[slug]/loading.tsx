import React from 'react';
import { Container } from '@/components/shared/Container';
import { Skeleton } from '@/components/ui/skeleton';

export default function Loading() {
  return (
    <div className="bg-background flex min-h-screen flex-col">
      <div className="bg-primary text-primary-foreground relative overflow-hidden pt-32 pb-24 md:pt-48 md:pb-48">
        <Container className="relative z-20">
          <Skeleton className="mx-auto mb-8 h-16 w-3/4 max-w-4xl rounded-xl bg-white/20" />
          <Skeleton className="mx-auto h-8 w-1/3 max-w-sm rounded-full bg-white/10" />
        </Container>
      </div>

      <section className="relative z-30 -mt-20 py-20 md:py-24">
        <Container>
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="order-2 lg:order-1 lg:col-span-4">
              <div className="bg-card border-border/50 rounded-3xl border p-8 shadow-xl">
                <Skeleton className="mb-8 aspect-square w-full rounded-2xl" />
                <Skeleton className="mb-6 h-8 w-3/4 rounded-lg" />
                <div className="mb-8 space-y-4">
                  <Skeleton className="h-6 w-full rounded-md" />
                  <Skeleton className="h-6 w-full rounded-md" />
                  <Skeleton className="h-6 w-5/6 rounded-md" />
                </div>
                <div className="border-border space-y-4 border-t pt-6">
                  <Skeleton className="h-16 w-full rounded-xl" />
                  <Skeleton className="h-16 w-full rounded-xl" />
                </div>
              </div>
            </div>

            <div className="order-1 space-y-6 pt-8 lg:order-2 lg:col-span-8 lg:pt-0">
              <Skeleton className="h-6 w-full rounded-md" />
              <Skeleton className="h-6 w-full rounded-md" />
              <Skeleton className="h-6 w-11/12 rounded-md" />
              <Skeleton className="h-6 w-full rounded-md" />
              <Skeleton className="h-6 w-4/5 rounded-md" />
              <Skeleton className="mt-8 h-64 w-full rounded-3xl" />
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}
