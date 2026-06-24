import React from 'react';
import { Container } from './Container';

interface PageHeaderProps {
  title: string;
  description?: string;
  breadcrumbs?: { label: string; url?: string }[];
}

export function PageHeader({ title, description, breadcrumbs }: PageHeaderProps) {
  return (
    <div className="bg-muted border-border border-b py-12 md:py-16">
      <Container>
        {breadcrumbs && (
          <nav className="text-muted-foreground mb-6 flex items-center space-x-2 text-sm">
            {breadcrumbs.map((crumb, i) => (
              <React.Fragment key={i}>
                {i > 0 && <span>/</span>}
                {crumb.url ? (
                  <a href={crumb.url} className="hover:text-primary transition-colors">
                    {crumb.label}
                  </a>
                ) : (
                  <span className="text-foreground font-medium">{crumb.label}</span>
                )}
              </React.Fragment>
            ))}
          </nav>
        )}
        <h1 className="text-foreground mb-4 text-4xl font-bold md:text-5xl">{title}</h1>
        {description && <p className="text-muted-foreground max-w-3xl text-lg">{description}</p>}
      </Container>
    </div>
  );
}
