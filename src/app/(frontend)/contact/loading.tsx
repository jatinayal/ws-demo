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
            <div className="space-y-12 lg:col-span-5">
              <div>
                <Skeleton className="mb-8 h-10 w-2/3 rounded-lg" />
                <div className="space-y-6">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="flex items-start">
                      <Skeleton className="mr-4 h-12 w-12 shrink-0 rounded-full" />
                      <div className="w-full">
                        <Skeleton className="mb-2 h-6 w-1/3 rounded-md" />
                        <Skeleton className="h-4 w-2/3 rounded-md" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <Skeleton className="mb-6 h-8 w-1/2 rounded-lg" />
                <div className="flex flex-wrap gap-3">
                  {[1, 2, 3].map((i) => (
                    <Skeleton key={i} className="h-10 w-24 rounded-full" />
                  ))}
                </div>
              </div>

              <Skeleton className="h-[300px] w-full rounded-3xl md:h-[400px]" />
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
