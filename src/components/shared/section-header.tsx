import React from 'react';
import { cn } from '@/lib/utils';

interface SectionHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  description?: string;
  align?: 'left' | 'center' | 'right';
}

export const SectionHeader = ({ title, description, align = 'center', className, ...props }: SectionHeaderProps) => {
  return (
    <div
      className={cn(
        'flex flex-col space-y-4 mb-12',
        {
          'text-left': align === 'left',
          'text-center items-center': align === 'center',
          'text-right items-end': align === 'right',
        },
        className
      )}
      {...props}
    >
      <h2 className="text-3xl md:text-4xl font-bold text-foreground">{title}</h2>
      {description && <p className="text-muted-foreground max-w-2xl text-lg">{description}</p>}
    </div>
  );
};
