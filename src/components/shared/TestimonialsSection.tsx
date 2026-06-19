import React from 'react';
import { Container } from './Container';
import { SectionHeader } from './section-header';
import { QuoteCard } from './QuoteCard';
import { AnimatedSection } from './AnimatedSection';

interface Testimonial {
  personName: string;
  image: string;
  quote: string;
  program?: string;
}

interface TestimonialsSectionProps {
  title: string;
  description?: string;
  testimonials: Testimonial[];
}

export function TestimonialsSection({ title, description, testimonials }: TestimonialsSectionProps) {
  if (!testimonials || testimonials.length === 0) return null;

  return (
    <section className="py-24 md:py-36 bg-gradient-to-b from-muted/50 to-background border-y">
      <Container>
        <AnimatedSection direction="up">
          <SectionHeader title={title} description={description} align="center" />
        </AnimatedSection>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
          {testimonials.map((testimonial, idx) => (
            <QuoteCard 
              key={idx}
              quote={testimonial.quote}
              authorName={testimonial.personName}
              authorTitle={testimonial.program}
              image={testimonial.image}
              delay={idx * 0.15}
            />
          ))}
        </div>
      </Container>
    </section>
  );
}
