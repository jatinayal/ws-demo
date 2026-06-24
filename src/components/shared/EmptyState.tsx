import React from 'react';
import { LucideIcon } from 'lucide-react';
import { buttonVariants } from '@/components/ui/button';
import Link from 'next/link';
import { cn } from '@/lib/utils';

interface EmptyStateProps {
  icon?: LucideIcon;
  title: string;
  description: string;
  actionLabel?: string;
  actionUrl?: string;
}

export function EmptyState({
  icon: Icon,
  title,
  description,
  actionLabel,
  actionUrl,
}: EmptyStateProps) {
  return (
    <div className="border-border/60 bg-muted/20 flex flex-col items-center justify-center rounded-3xl border-2 border-dashed p-16 text-center">
      {Icon && (
        <div className="bg-muted/50 mb-6 flex h-16 w-16 items-center justify-center rounded-full">
          <Icon className="text-muted-foreground h-8 w-8" />
        </div>
      )}
      <h3 className="mb-3 text-2xl font-bold tracking-tight">{title}</h3>
      <p className="text-muted-foreground mb-8 max-w-md text-lg">{description}</p>
      {actionLabel && actionUrl && (
        <Link
          href={actionUrl}
          className={cn(
            buttonVariants({
              variant: 'outline',
              size: 'lg',
              className:
                'hover:bg-primary hover:text-primary-foreground hover:border-primary rounded-full px-8 transition-colors duration-300',
            }),
          )}
        >
          {actionLabel}
        </Link>
      )}
    </div>
  );
}
