import React from 'react';
import { getGetInvolved } from '@/lib/payload';
import { Container } from '@/components/shared/Container';
import { HeroSection } from '@/components/shared/HeroSection';
import { AnimatedSection } from '@/components/shared/AnimatedSection';
import { GetInvolvedWorkspace } from './GetInvolvedWorkspace';
import { GetInvolvedFAQ } from './GetInvolvedFAQ';
import { constructMetadata } from '@/lib/seo';

export async function generateMetadata() {
  const data = await getGetInvolved();
  return constructMetadata({
    title: 'Get Involved',
    description: data.hero?.subtitle || "Take Action. Drive Change. Join Women's Synergy.",
    path: '/get-involved',
  });
}

export default async function GetInvolvedPage() {
  const data = await getGetInvolved();
  const heroImage =
    (typeof data.hero?.backgroundImage === 'object' ? data.hero.backgroundImage?.url : undefined) ||
    undefined;

  return (
    <div className="bg-background flex min-h-screen flex-col">
      {/* 1. Hero */}
      <HeroSection
        title={data.hero?.title || 'Take Action. Drive Change.'}
        subtitle={
          data.hero?.subtitle ||
          "Join Women's Synergy in our mission to empower women and transform communities."
        }
        backgroundImage={heroImage}
      />

      {/* 2. Main Content & Forms */}
      <section className="relative z-20 py-20 md:py-32">
        <Container>
          <GetInvolvedWorkspace data={data} />
        </Container>
      </section>

      {/* 3. FAQs */}
      {data.faqs && data.faqs.length > 0 && (
        <section className="bg-muted/30 border-t py-24">
          <Container>
            <AnimatedSection direction="up" className="mx-auto mb-16 max-w-3xl text-center">
              <h2 className="mb-4 text-3xl font-bold">Frequently Asked Questions</h2>
              <p className="text-muted-foreground">
                Everything you need to know about getting involved with Women&apos;s Synergy.
              </p>
            </AnimatedSection>

            <GetInvolvedFAQ faqs={data.faqs} />
          </Container>
        </section>
      )}
    </div>
  );
}
