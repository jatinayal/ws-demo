import React from 'react';
import { Container } from '@/components/shared/Container';
import { Skeleton } from '@/components/ui/skeleton';

export default function Loading() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <div className="bg-primary py-24 md:py-32 relative overflow-hidden">
        <Container className="text-center">
          <Skeleton className="h-12 w-3/4 max-w-2xl mx-auto mb-6 rounded-xl bg-white/20" />
          <Skeleton className="h-6 w-1/2 max-w-xl mx-auto rounded-lg bg-white/10" />
        </Container>
      </div>

      <section className="py-20 md:py-32 relative z-20">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
            <div className="lg:col-span-5 space-y-16">
              <div>
                <Skeleton className="h-10 w-2/3 mb-4 rounded-lg" />
                <Skeleton className="h-20 w-full mb-6 rounded-lg" />
                <div className="space-y-4">
                  <Skeleton className="h-6 w-full rounded-md" />
                  <Skeleton className="h-6 w-5/6 rounded-md" />
                  <Skeleton className="h-6 w-4/5 rounded-md" />
                </div>
              </div>
              <div className="bg-primary/5 rounded-3xl p-8 border border-primary/10">
                <Skeleton className="h-10 w-2/3 mb-4 rounded-lg" />
                <Skeleton className="h-16 w-full mb-6 rounded-lg" />
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
