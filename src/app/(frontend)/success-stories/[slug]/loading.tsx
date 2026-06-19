import React from 'react';
import { Container } from '@/components/shared/Container';
import { Skeleton } from '@/components/ui/skeleton';

export default function Loading() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <div className="relative pt-32 pb-24 md:pt-48 md:pb-48 overflow-hidden bg-primary text-primary-foreground">
        <Container className="relative z-20">
          <Skeleton className="h-16 w-3/4 max-w-4xl mx-auto mb-8 rounded-xl bg-white/20" />
          <Skeleton className="h-8 w-1/3 max-w-sm mx-auto rounded-full bg-white/10" />
        </Container>
      </div>

      <section className="py-20 md:py-24 relative -mt-20 z-30">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
            <div className="lg:col-span-4 order-2 lg:order-1">
              <div className="bg-card rounded-3xl p-8 border border-border/50 shadow-xl">
                <Skeleton className="aspect-square w-full rounded-2xl mb-8" />
                <Skeleton className="h-8 w-3/4 mb-6 rounded-lg" />
                <div className="space-y-4 mb-8">
                  <Skeleton className="h-6 w-full rounded-md" />
                  <Skeleton className="h-6 w-full rounded-md" />
                  <Skeleton className="h-6 w-5/6 rounded-md" />
                </div>
                <div className="pt-6 border-t border-border space-y-4">
                  <Skeleton className="h-16 w-full rounded-xl" />
                  <Skeleton className="h-16 w-full rounded-xl" />
                </div>
              </div>
            </div>

            <div className="lg:col-span-8 order-1 lg:order-2 pt-8 lg:pt-0 space-y-6">
              <Skeleton className="h-6 w-full rounded-md" />
              <Skeleton className="h-6 w-full rounded-md" />
              <Skeleton className="h-6 w-11/12 rounded-md" />
              <Skeleton className="h-6 w-full rounded-md" />
              <Skeleton className="h-6 w-4/5 rounded-md" />
              <Skeleton className="h-64 w-full rounded-3xl mt-8" />
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}
