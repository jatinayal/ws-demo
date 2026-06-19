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

export function EmptyState({ icon: Icon, title, description, actionLabel, actionUrl }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center p-16 text-center border-2 border-dashed border-border/60 rounded-3xl bg-muted/20">
      {Icon && (
        <div className="w-16 h-16 rounded-full bg-muted/50 flex items-center justify-center mb-6">
          <Icon className="w-8 h-8 text-muted-foreground" />
        </div>
      )}
      <h3 className="text-2xl font-bold mb-3 tracking-tight">{title}</h3>
      <p className="text-muted-foreground text-lg max-w-md mb-8">{description}</p>
      {actionLabel && actionUrl && (
        <Link href={actionUrl} className={cn(buttonVariants({ variant: 'outline', size: 'lg', className: 'rounded-full px-8 hover:bg-primary hover:text-primary-foreground hover:border-primary transition-colors duration-300' }))}>
          {actionLabel}
        </Link>
      )}
    </div>
  );
}
