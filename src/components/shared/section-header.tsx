import React from 'react';
import { cn } from '@/lib/utils';

interface SectionHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  description?: string;
  align?: 'left' | 'center' | 'right';
}

export const SectionHeader = ({
  title,
  description,
  align = 'center',
  className,
  ...props
}: SectionHeaderProps) => {
  return (
    <div
      className={cn(
        'mb-12 flex flex-col space-y-4',
        {
          'text-left': align === 'left',
          'items-center text-center': align === 'center',
          'items-end text-right': align === 'right',
        },
        className,
      )}
      {...props}
    >
      <h2 className="text-foreground text-3xl font-bold md:text-4xl">{title}</h2>
      {description && <p className="text-muted-foreground max-w-2xl text-lg">{description}</p>}
    </div>
  );
};
