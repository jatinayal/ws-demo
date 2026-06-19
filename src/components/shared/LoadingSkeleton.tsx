import React from 'react';
import { Skeleton } from '@/components/ui/skeleton';

export function CardSkeleton() {
  return (
    <div className="flex flex-col space-y-3">
      <Skeleton className="h-[200px] w-full rounded-xl" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-[250px]" />
        <Skeleton className="h-4 w-[200px]" />
      </div>
    </div>
  );
}

export function PageSkeleton() {
  return (
    <div className="w-full">
      <Skeleton className="h-[30vh] w-full mb-12" />
      <div className="container mx-auto px-4 space-y-8">
        <Skeleton className="h-10 w-[300px]" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <CardSkeleton />
          <CardSkeleton />
          <CardSkeleton />
        </div>
      </div>
    </div>
  );
}
