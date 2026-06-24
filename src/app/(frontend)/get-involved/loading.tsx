import React from 'react';
import { Container } from '@/components/shared/Container';
import { Skeleton } from '@/components/ui/skeleton';

export default function Loading() {
  return (
    <div className="bg-background flex min-h-screen flex-col">
      <div className="bg-primary relative overflow-hidden py-24 md:py-32">
        <Container className="text-center">
          <Skeleton className="mx-auto mb-6 h-12 w-3/4 max-w-2xl rounded-xl bg-white/20" />
          <Skeleton className="mx-auto h-6 w-1/2 max-w-xl rounded-lg bg-white/10" />
        </Container>
      </div>

      <section className="relative z-20 py-20 md:py-32">
        <Container>
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-20">
            <div className="space-y-16 lg:col-span-5">
              <div>
                <Skeleton className="mb-4 h-10 w-2/3 rounded-lg" />
                <Skeleton className="mb-6 h-20 w-full rounded-lg" />
                <div className="space-y-4">
                  <Skeleton className="h-6 w-full rounded-md" />
                  <Skeleton className="h-6 w-5/6 rounded-md" />
                  <Skeleton className="h-6 w-4/5 rounded-md" />
                </div>
              </div>
              <div className="bg-primary/5 border-primary/10 rounded-3xl border p-8">
                <Skeleton className="mb-4 h-10 w-2/3 rounded-lg" />
                <Skeleton className="mb-6 h-16 w-full rounded-lg" />
                <div className="space-y-6">
                  <Skeleton className="h-12 w-full rounded-md" />
                  <Skeleton className="h-12 w-full rounded-md" />
                  <Skeleton className="h-12 w-full rounded-md" />
                </div>
              </div>
            </div>

            <div className="lg:col-span-7">
              <Skeleton className="h-[600px] w-full rounded-3xl" />
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}
