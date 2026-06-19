import React from 'react';
import { Container } from '@/components/shared/Container';
import { Skeleton } from '@/components/ui/skeleton';

export default function Loading() {
  return (
    <div className="flex flex-col min-h-screen">
      <div className="bg-primary text-primary-foreground py-24 md:py-32 relative overflow-hidden">
        <Container className="text-center relative z-10">
          <Skeleton className="h-12 w-3/4 max-w-2xl mx-auto mb-6 rounded-xl bg-white/20" />
          <Skeleton className="h-6 w-1/2 max-w-xl mx-auto rounded-lg bg-white/10" />
        </Container>
      </div>

      <section className="py-24 md:py-36 bg-background">
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="bg-card rounded-3xl overflow-hidden border border-border/40 h-full flex flex-col">
                <Skeleton className="aspect-video w-full rounded-none" />
                <div className="p-8 flex flex-col flex-1">
                  <Skeleton className="h-8 w-3/4 mb-4 rounded-lg" />
                  <Skeleton className="h-4 w-full mb-2 rounded-md" />
                  <Skeleton className="h-4 w-5/6 mb-8 rounded-md" />
                  <Skeleton className="h-12 w-full rounded-full mt-auto" />
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>
    </div>
  );
}
