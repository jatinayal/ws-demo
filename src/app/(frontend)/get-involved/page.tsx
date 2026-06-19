import React from 'react';
import { getGetInvolved } from '@/lib/payload';
import { Container } from '@/components/shared/Container';
import { HeroSection } from '@/components/shared/HeroSection';
import { AnimatedSection } from '@/components/shared/AnimatedSection';
import { GetInvolvedForms } from './GetInvolvedForms';
import { constructMetadata } from '@/lib/seo';
import { CheckCircle, Building2, HelpCircle } from 'lucide-react';

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
    typeof data.hero?.backgroundImage === 'object' ? data.hero.backgroundImage?.url : null;

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
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-20">
            {/* Context/Information Side */}
            <div className="space-y-16 lg:col-span-5">
              <AnimatedSection direction="up">
                <h2 className="mb-4 text-3xl font-bold">{data.volunteerSection?.title}</h2>
                <p className="text-muted-foreground mb-6 text-lg">
                  {data.volunteerSection?.description}
                </p>
                <ul className="space-y-4">
                  {data.volunteerSection?.benefits?.map(
                    (item: { benefit?: string | null }, idx: number) => (
                      <li key={idx} className="flex items-start">
                        <CheckCircle className="text-primary mt-0.5 mr-3 h-6 w-6 shrink-0" />
                        <span className="text-foreground font-medium">{item.benefit}</span>
                      </li>
                    ),
                  )}
                </ul>
              </AnimatedSection>

              <AnimatedSection direction="up" delay={0.1}>
                <div className="bg-primary/5 border-primary/10 rounded-3xl border p-8">
                  <h2 className="mb-4 flex items-center text-2xl font-bold">
                    <Building2 className="text-primary mr-3 h-6 w-6" />
                    {data.partnerSection?.title}
                  </h2>
                  <p className="text-muted-foreground mb-6">{data.partnerSection?.description}</p>

                  <div className="space-y-6">
                    {data.partnerSection?.partnerTypes?.map(
                      (pt: { type?: string | null; description?: string | null }, idx: number) => (
                        <div key={idx}>
                          <h4 className="text-foreground font-bold">{pt.type}</h4>
                          <p className="text-muted-foreground mt-1 text-sm">{pt.description}</p>
                        </div>
                      ),
                    )}
                  </div>
                </div>
              </AnimatedSection>
            </div>

            {/* Interactive Forms Side */}
            <div className="lg:col-span-7">
              <AnimatedSection direction="up" delay={0.2} className="sticky top-32">
                <GetInvolvedForms />
              </AnimatedSection>
            </div>
          </div>
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

            <div className="mx-auto grid max-w-4xl grid-cols-1 gap-8 md:grid-cols-2">
              {data.faqs.map(
                (faq: { question?: string | null; answer?: string | null }, idx: number) => (
                  <AnimatedSection key={idx} direction="up" delay={idx * 0.1}>
                    <div className="bg-card border-border/50 h-full rounded-2xl border p-6">
                      <div className="flex items-start">
                        <HelpCircle className="text-primary mt-0.5 mr-4 h-6 w-6 shrink-0" />
                        <div>
                          <h4 className="mb-2 text-lg font-bold">{faq.question}</h4>
                          <p className="text-muted-foreground">{faq.answer}</p>
                        </div>
                      </div>
                    </div>
                  </AnimatedSection>
                ),
              )}
            </div>
          </Container>
        </section>
      )}
    </div>
  );
}
