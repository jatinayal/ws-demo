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

export function TestimonialsSection({
  title,
  description,
  testimonials,
}: TestimonialsSectionProps) {
  if (!testimonials || testimonials.length === 0) return null;

  return (
    <section className="from-muted/50 to-background border-y bg-gradient-to-b py-16 md:py-36">
      <Container>
        <AnimatedSection direction="up" className="mb-8 md:mb-12">
          <SectionHeader title={title} description={description} align="center" />
        </AnimatedSection>
        <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-8 lg:grid-cols-3">
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
