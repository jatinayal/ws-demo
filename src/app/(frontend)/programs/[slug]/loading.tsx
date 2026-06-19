import React from 'react';
import { Container } from '@/components/shared/Container';
import { Skeleton } from '@/components/ui/skeleton';

export default function Loading() {
  return (
    <div className="flex flex-col min-h-screen">
      <div className="relative pt-32 pb-24 md:pt-48 md:pb-36 overflow-hidden bg-muted">
        <Container className="relative z-20">
          <Skeleton className="h-4 w-32 mb-8 rounded-full" />
          <Skeleton className="h-6 w-24 mb-6 rounded-full" />
          <Skeleton className="h-16 w-3/4 max-w-2xl mb-6 rounded-xl" />
          <Skeleton className="h-8 w-1/2 max-w-xl rounded-lg" />
        </Container>
      </div>
      
      <section className="py-16 md:py-20 bg-card border-b relative -mt-10 z-30 rounded-t-[3rem] shadow-sm">
        <Container>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <Skeleton className="h-32 w-full rounded-2xl" />
            <Skeleton className="h-32 w-full rounded-2xl" />
            <Skeleton className="h-32 w-full rounded-2xl" />
            <Skeleton className="h-32 w-full rounded-2xl" />
          </div>
        </Container>
      </section>

      <section className="py-24 md:py-36">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
            <div className="lg:col-span-2 space-y-10">
              <Skeleton className="h-10 w-1/3 mb-8 rounded-lg" />
              <Skeleton className="h-6 w-full mb-4 rounded-md" />
              <Skeleton className="h-6 w-full mb-4 rounded-md" />
              <Skeleton className="h-6 w-5/6 mb-4 rounded-md" />
              <Skeleton className="h-6 w-4/5 mb-8 rounded-md" />
              <Skeleton className="h-64 w-full rounded-3xl" />
            </div>
            <div className="space-y-10">
              <Skeleton className="h-[400px] w-full rounded-3xl" />
              <Skeleton className="h-64 w-full rounded-3xl" />
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}
