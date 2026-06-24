'use client';

import React, { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';
import { AnimatedSection } from '@/components/shared/AnimatedSection';

export function GetInvolvedFAQ({
  faqs,
}: {
  faqs: { question?: string | null; answer?: string | null }[];
}) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="mx-auto max-w-3xl space-y-4">
      {faqs.map((faq: { question?: string | null; answer?: string | null }, idx: number) => {
        const isOpen = openIndex === idx;

        return (
          <AnimatedSection key={idx} direction="up" delay={idx * 0.05}>
            <div
              className={`bg-card overflow-hidden rounded-2xl border transition-all duration-300 ${
                isOpen
                  ? 'border-primary/50 shadow-md'
                  : 'border-border/50 hover:border-primary/30 shadow-sm'
              }`}
            >
              <button
                onClick={() => toggleAccordion(idx)}
                className="focus-visible:ring-primary flex w-full items-center justify-between px-6 py-5 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
                aria-expanded={isOpen}
                aria-controls={`faq-answer-${idx}`}
                id={`faq-question-${idx}`}
              >
                <div className="flex items-center">
                  <HelpCircle
                    className={`mr-4 h-5 w-5 shrink-0 transition-colors duration-300 ${isOpen ? 'text-primary' : 'text-muted-foreground'}`}
                  />
                  <h4 className="pr-4 text-lg font-bold">{faq.question}</h4>
                </div>
                <ChevronDown
                  className={`text-muted-foreground h-5 w-5 shrink-0 transition-transform duration-300 ${isOpen ? 'text-primary rotate-180' : 'rotate-0'}`}
                />
              </button>

              <div
                id={`faq-answer-${idx}`}
                role="region"
                aria-labelledby={`faq-question-${idx}`}
                className={`grid transition-all duration-300 ease-in-out ${
                  isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
                }`}
              >
                <div className="overflow-hidden">
                  <div className="text-muted-foreground ml-9 px-6 pt-0 pb-6 leading-relaxed">
                    {faq.answer}
                  </div>
                </div>
              </div>
            </div>
          </AnimatedSection>
        );
      })}
    </div>
  );
}
