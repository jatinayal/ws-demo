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
    <section className="bg-muted/30 overflow-hidden py-16 md:py-24">
      <Container>
        <AnimatedSection direction="up" className="mb-8 md:mb-12">
          <SectionHeader title={title} description={description} align="center" />
        </AnimatedSection>

        {/* Desktop Static Layout */}
        <div className="mt-12 hidden flex-wrap items-center justify-center gap-10 md:flex md:gap-20">
          {partners.map((partner, idx) => (
            <AnimatedSection key={partner.name} direction="up" delay={idx * 0.1}>
              <div className="relative h-20 w-36 cursor-pointer opacity-60 grayscale transition-all duration-500 hover:scale-110 hover:opacity-100 hover:grayscale-0 md:h-24 md:w-48">
                {partner.websiteUrl ? (
                  <a
                    href={partner.websiteUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="relative block h-full w-full"
                  >
                    <Image src={partner.logo} alt={partner.name} fill className="object-contain" />
                  </a>
                ) : (
                  <Image src={partner.logo} alt={partner.name} fill className="object-contain" />
                )}
              </div>
            </AnimatedSection>
          ))}
        </div>

        {/* Mobile Marquee Layout */}
        <div className="relative flex overflow-hidden md:hidden">
          <style>{`
             @keyframes marquee-partners {
               0% { transform: translateX(0%); }
               100% { transform: translateX(-50%); }
             }
             .animate-marquee-partners {
               animation: marquee-partners 20s linear infinite;
               width: max-content;
             }
           `}</style>
          <div className="animate-marquee-partners flex items-center gap-8 pb-4">
            {[...partners, ...partners].map((partner, idx) => (
              <div key={idx} className="relative h-16 w-28 shrink-0 opacity-60 grayscale">
                <Image src={partner.logo} alt={partner.name} fill className="object-contain" />
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
