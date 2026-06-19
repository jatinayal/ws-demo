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
    description: data.hero?.subtitle || 'Take Action. Drive Change. Join Women\'s Synergy.',
    path: '/get-involved',
  });
}

export default async function GetInvolvedPage() {
  const data = await getGetInvolved();
  const heroImage = typeof data.hero?.backgroundImage === 'object' ? data.hero.backgroundImage?.url : null;

  return (
    <div className="flex flex-col min-h-screen bg-background">
      {/* 1. Hero */}
      <HeroSection 
        title={data.hero?.title || 'Take Action. Drive Change.'}
        subtitle={data.hero?.subtitle || 'Join Women\'s Synergy in our mission to empower women and transform communities.'}
        backgroundImage={heroImage}
      />

      {/* 2. Main Content & Forms */}
      <section className="py-20 md:py-32 relative z-20">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
            
            {/* Context/Information Side */}
            <div className="lg:col-span-5 space-y-16">
              
              <AnimatedSection direction="up">
                <h2 className="text-3xl font-bold mb-4">{data.volunteerSection?.title}</h2>
                <p className="text-muted-foreground text-lg mb-6">{data.volunteerSection?.description}</p>
                <ul className="space-y-4">
                  {data.volunteerSection?.benefits?.map((item: any, idx: number) => (
                    <li key={idx} className="flex items-start">
                      <CheckCircle className="w-6 h-6 text-primary mr-3 shrink-0 mt-0.5" />
                      <span className="font-medium text-foreground">{item.benefit}</span>
                    </li>
                  ))}
                </ul>
              </AnimatedSection>

              <AnimatedSection direction="up" delay={0.1}>
                <div className="bg-primary/5 rounded-3xl p-8 border border-primary/10">
                  <h2 className="text-2xl font-bold mb-4 flex items-center">
                    <Building2 className="w-6 h-6 mr-3 text-primary" />
                    {data.partnerSection?.title}
                  </h2>
                  <p className="text-muted-foreground mb-6">{data.partnerSection?.description}</p>
                  
                  <div className="space-y-6">
                    {data.partnerSection?.partnerTypes?.map((pt: any, idx: number) => (
                      <div key={idx}>
                        <h4 className="font-bold text-foreground">{pt.type}</h4>
                        <p className="text-sm text-muted-foreground mt-1">{pt.description}</p>
                      </div>
                    ))}
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
        <section className="py-24 bg-muted/30 border-t">
          <Container>
            <AnimatedSection direction="up" className="max-w-3xl mx-auto text-center mb-16">
              <h2 className="text-3xl font-bold mb-4">Frequently Asked Questions</h2>
              <p className="text-muted-foreground">Everything you need to know about getting involved with Women's Synergy.</p>
            </AnimatedSection>
            
            <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
              {data.faqs.map((faq: any, idx: number) => (
                <AnimatedSection key={idx} direction="up" delay={idx * 0.1}>
                  <div className="bg-card rounded-2xl p-6 border border-border/50 h-full">
                    <div className="flex items-start">
                      <HelpCircle className="w-6 h-6 text-primary mr-4 shrink-0 mt-0.5" />
                      <div>
                        <h4 className="font-bold text-lg mb-2">{faq.question}</h4>
                        <p className="text-muted-foreground">{faq.answer}</p>
                      </div>
                    </div>
                  </div>
                </AnimatedSection>
              ))}
            </div>
          </Container>
        </section>
      )}

    </div>
  );
}
