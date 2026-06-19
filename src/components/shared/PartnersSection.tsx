import React from 'react';
import { Container } from './Container';
import { SectionHeader } from './section-header';
import Image from 'next/image';
import { AnimatedSection } from './AnimatedSection';

interface Partner {
  name: string;
  logo: string;
  websiteUrl?: string;
}

interface PartnersSectionProps {
  title: string;
  description?: string;
  partners: Partner[];
}

export function PartnersSection({ title, description, partners }: PartnersSectionProps) {
  if (!partners || partners.length === 0) return null;

  return (
    <section className="py-24 bg-muted/30">
      <Container>
        <AnimatedSection direction="up">
          <SectionHeader title={title} description={description} align="center" />
        </AnimatedSection>
        <div className="flex flex-wrap justify-center items-center gap-10 md:gap-20 mt-12">
          {partners.map((partner, idx) => (
            <AnimatedSection key={partner.name} direction="up" delay={idx * 0.1}>
              <div className="relative w-36 h-20 md:w-48 md:h-24 opacity-60 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-500 hover:scale-110 cursor-pointer">
                {partner.websiteUrl ? (
                  <a href={partner.websiteUrl} target="_blank" rel="noopener noreferrer" className="block w-full h-full relative">
                    <Image src={partner.logo} alt={partner.name} fill className="object-contain" />
                  </a>
                ) : (
                  <Image src={partner.logo} alt={partner.name} fill className="object-contain" />
                )}
              </div>
            </AnimatedSection>
          ))}
        </div>
      </Container>
    </section>
  );
}
