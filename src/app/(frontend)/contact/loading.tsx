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
            <div className="lg:col-span-5 space-y-12">
              <div>
                <Skeleton className="h-10 w-2/3 mb-8 rounded-lg" />
                <div className="space-y-6">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="flex items-start">
                      <Skeleton className="h-12 w-12 rounded-full mr-4 shrink-0" />
                      <div className="w-full">
                        <Skeleton className="h-6 w-1/3 mb-2 rounded-md" />
                        <Skeleton className="h-4 w-2/3 rounded-md" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              <div>
                <Skeleton className="h-8 w-1/2 mb-6 rounded-lg" />
                <div className="flex flex-wrap gap-3">
                  {[1, 2, 3].map((i) => (
                    <Skeleton key={i} className="h-10 w-24 rounded-full" />
                  ))}
                </div>
              </div>

              <Skeleton className="h-[300px] md:h-[400px] w-full rounded-3xl" />
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
