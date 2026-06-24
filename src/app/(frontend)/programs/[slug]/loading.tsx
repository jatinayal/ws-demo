import React from 'react';
import { Container } from '@/components/shared/Container';
import { Skeleton } from '@/components/ui/skeleton';

export default function Loading() {
  return (
    <div className="flex min-h-screen flex-col">
      <div className="bg-muted relative overflow-hidden pt-32 pb-24 md:pt-48 md:pb-36">
        <Container className="relative z-20">
          <Skeleton className="mb-8 h-4 w-32 rounded-full" />
          <Skeleton className="mb-6 h-6 w-24 rounded-full" />
          <Skeleton className="mb-6 h-16 w-3/4 max-w-2xl rounded-xl" />
          <Skeleton className="h-8 w-1/2 max-w-xl rounded-lg" />
        </Container>
      </div>

      <section className="bg-card relative z-30 -mt-10 rounded-t-[3rem] border-b py-16 shadow-sm md:py-20">
        <Container>
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
            <Skeleton className="h-32 w-full rounded-2xl" />
            <Skeleton className="h-32 w-full rounded-2xl" />
            <Skeleton className="h-32 w-full rounded-2xl" />
            <Skeleton className="h-32 w-full rounded-2xl" />
          </div>
        </Container>
      </section>

      <section className="py-24 md:py-36">
        <Container>
          <div className="grid grid-cols-1 gap-16 lg:grid-cols-3">
            <div className="space-y-10 lg:col-span-2">
              <Skeleton className="mb-8 h-10 w-1/3 rounded-lg" />
              <Skeleton className="mb-4 h-6 w-full rounded-md" />
              <Skeleton className="mb-4 h-6 w-full rounded-md" />
              <Skeleton className="mb-4 h-6 w-5/6 rounded-md" />
              <Skeleton className="mb-8 h-6 w-4/5 rounded-md" />
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
