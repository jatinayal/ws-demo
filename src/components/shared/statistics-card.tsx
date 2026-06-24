import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { LucideIcon } from 'lucide-react';

interface StatisticsCardProps extends React.ComponentProps<typeof Card> {
  title: string;
  value: string | number;
  description?: string;
  icon?: LucideIcon;
  trend?: {
    value: number;
    label: string;
  };
}

export const StatisticsCard = ({
  title,
  value,
  description,
  icon: Icon,
  trend,
  className,
  ...props
}: StatisticsCardProps) => {
  return (
    <Card className={cn('overflow-hidden', className)} {...props}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-muted-foreground text-sm font-medium">{title}</CardTitle>
        {Icon && <Icon className="text-primary h-4 w-4" />}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        {description && <p className="text-muted-foreground mt-1 text-xs">{description}</p>}
        {trend && (
          <div className="mt-2 flex items-center space-x-1">
            <span
              className={cn('text-xs font-medium', {
                'text-secondary': trend.value >= 0, // Deep Green for positive impact
                'text-destructive': trend.value < 0,
              })}
            >
              {trend.value > 0 ? '+' : ''}
              {trend.value}%
            </span>
            <span className="text-muted-foreground text-xs">{trend.label}</span>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
