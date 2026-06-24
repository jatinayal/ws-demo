'use client';

import React, { useState } from 'react';
import { AnimatedSection } from '@/components/shared/AnimatedSection';
import { GetInvolvedForms } from './GetInvolvedForms';
import { CheckCircle, Building2, Heart, Users } from 'lucide-react';
import { GetInvolved } from '@/payload-types';

export function GetInvolvedWorkspace({ data }: { data: GetInvolved }) {
  const [activeTab, setActiveTab] = useState<'volunteer' | 'partner' | 'donate'>('volunteer');

  return (
    <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-20">
      {/* Context/Information Side */}
      <div className="relative hidden space-y-16 lg:col-span-5 lg:block">
        <div className="relative min-h-[400px]">
          {activeTab === 'volunteer' && (
            <AnimatedSection direction="up" key="volunteer" className="absolute inset-0">
              <h2 className="mb-4 flex items-center text-3xl font-bold">
                <Users className="text-primary mr-3 h-8 w-8" />
                {data.volunteerSection?.title}
              </h2>
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
          )}

          {activeTab === 'partner' && (
            <AnimatedSection direction="up" key="partner" delay={0.1} className="absolute inset-0">
              <div className="bg-primary/5 border-primary/10 rounded-3xl border p-8">
                <h2 className="mb-4 flex items-center text-2xl font-bold">
                  <Building2 className="text-primary mr-3 h-8 w-8" />
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
          )}

          {activeTab === 'donate' && (
            <AnimatedSection direction="up" key="donate" delay={0.1} className="absolute inset-0">
              <div className="bg-secondary/10 border-secondary/20 rounded-3xl border p-8 text-center">
                <Heart className="text-secondary mx-auto mb-4 h-12 w-12" />
                <h2 className="mb-4 text-2xl font-bold">
                  {data.donateSection?.title || 'Fund the Future'}
                </h2>
                <p className="text-muted-foreground mb-6">
                  {data.donateSection?.description ||
                    'Your financial contributions directly support education, entrepreneurship, and essential resources for women.'}
                </p>

                <div className="mt-8 grid grid-cols-2 gap-4">
                  <div className="bg-card rounded-2xl p-4 shadow-sm">
                    <div className="text-primary mb-1 text-2xl font-black">100%</div>
                    <div className="text-muted-foreground text-xs font-bold tracking-wider uppercase">
                      Transparency
                    </div>
                  </div>
                  <div className="bg-card rounded-2xl p-4 shadow-sm">
                    <div className="text-primary mb-1 text-2xl font-black">Tax</div>
                    <div className="text-muted-foreground text-xs font-bold tracking-wider uppercase">
                      Deductible
                    </div>
                  </div>
                </div>
              </div>
            </AnimatedSection>
          )}
        </div>
      </div>

      {/* Interactive Forms Side */}
      <div className="lg:col-span-7">
        <AnimatedSection direction="up" delay={0.2} className="sticky top-32 z-10">
          <GetInvolvedForms activeTab={activeTab} onTabChange={setActiveTab} />
        </AnimatedSection>
      </div>
    </div>
  );
}
