import React from 'react';
import { getPayloadClient } from '@/lib/payload';
import { Container } from '@/components/shared/Container';
import { HeroSection } from '@/components/shared/HeroSection';
import { AnimatedSection } from '@/components/shared/AnimatedSection';
import { EmptyState } from '@/components/shared/EmptyState';
import { CTASection } from '@/components/shared/CTASection';
import { constructMetadata } from '@/lib/seo';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, BookOpen, Activity } from 'lucide-react';
import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Program } from '@/payload-types';

export const metadata = constructMetadata({
  title: 'Our Programs',
  description:
    'Discover how we are making a difference through education, leadership, entrepreneurship, and community building.',
  path: '/programs',
});

const categoryColors: Record<string, string> = {
  education:
    'bg-blue-100 text-blue-800 border-blue-200 dark:bg-blue-900/30 dark:text-blue-300 dark:border-blue-800',
  leadership:
    'bg-purple-100 text-purple-800 border-purple-200 dark:bg-purple-900/30 dark:text-purple-300 dark:border-purple-800',
  entrepreneurship:
    'bg-orange-100 text-orange-800 border-orange-200 dark:bg-orange-900/30 dark:text-orange-300 dark:border-orange-800',
  wellness:
    'bg-emerald-100 text-emerald-800 border-emerald-200 dark:bg-emerald-900/30 dark:text-emerald-300 dark:border-emerald-800',
  community:
    'bg-pink-100 text-pink-800 border-pink-200 dark:bg-pink-900/30 dark:text-pink-300 dark:border-pink-800',
};

const categoryLabels: Record<string, string> = {
  education: 'Education',
  leadership: 'Leadership',
  entrepreneurship: 'Entrepreneurship',
  wellness: 'Emotional Wellness',
  community: 'Community',
};

export default async function ProgramsPage() {
  const payload = await getPayloadClient();
  const programsRes = await payload.find({
    collection: 'programs',
    limit: 100,
    sort: '-createdAt',
  });

  const programs = programsRes.docs;

  return (
    <div className="flex min-h-screen flex-col">
      <HeroSection
        title="Our Featured Programs"
        subtitle="Discover how we are making a difference through education, mentorship, and community building."
      />

      <section className="bg-background relative overflow-hidden py-24 md:py-36">
        <div className="bg-primary/5 pointer-events-none absolute top-0 right-0 -mt-40 -mr-40 h-96 w-96 rounded-full blur-3xl" />
        <Container className="relative z-10">
          {programs.length > 0 ? (
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
              {(programs as unknown as Program[]).map((program, idx: number) => {
                const coverImage =
                  typeof program.coverImage === 'object' ? program.coverImage?.url : null;
                const cat = program.category || 'community';
                const catColor = categoryColors[cat] || categoryColors.community;
                const catLabel = categoryLabels[cat] || cat;

                return (
                  <AnimatedSection key={program.id} direction="up" delay={idx * 0.1}>
                    <div className="group bg-card border-border/40 flex h-full flex-1 flex-col overflow-hidden rounded-3xl border shadow-sm transition-all duration-500 hover:shadow-xl">
                      <div className="relative aspect-video overflow-hidden">
                        {coverImage ? (
                          <Image
                            src={coverImage}
                            alt={program.title}
                            fill
                            className="object-cover transition-transform duration-700 group-hover:scale-110"
                          />
                        ) : (
                          <div className="bg-muted absolute inset-0 flex items-center justify-center">
                            <BookOpen className="text-muted-foreground/30 h-12 w-12" />
                          </div>
                        )}
                        <div className="absolute top-4 right-4 z-10">
                          <span
                            className={cn(
                              'rounded-full border px-3 py-1.5 text-xs font-bold tracking-wider uppercase shadow-sm backdrop-blur-md',
                              catColor,
                            )}
                          >
                            {catLabel}
                          </span>
                        </div>
                      </div>

                      <div className="flex flex-1 flex-col p-8">
                        <h3 className="group-hover:text-primary mb-3 line-clamp-2 text-2xl font-bold tracking-tight transition-colors">
                          {program.title}
                        </h3>
                        <p className="text-muted-foreground mb-8 line-clamp-3 flex-1 leading-relaxed">
                          {program.shortDescription}
                        </p>

                        <div className="mt-auto">
                          <Link
                            href={`/programs/${program.slug}`}
                            className={cn(
                              buttonVariants({
                                variant: 'outline',
                                className:
                                  'group-hover:bg-primary group-hover:text-primary-foreground group-hover:border-primary h-12 w-full rounded-full font-semibold transition-all duration-300',
                              }),
                            )}
                          >
                            Explore Program <ArrowRight className="ml-2 h-4 w-4" />
                          </Link>
                        </div>
                      </div>
                    </div>
                  </AnimatedSection>
                );
              })}
            </div>
          ) : (
            <AnimatedSection direction="up">
              <EmptyState
                icon={Activity}
                title="No Programs Available"
                description="We are currently developing new programs. Please check back soon."
              />
            </AnimatedSection>
          )}
        </Container>
      </section>

      <CTASection
        title="Support Our Initiatives"
        description="Your contributions help us expand our reach and empower more women around the world."
        buttonLabel="Donate Now"
        buttonUrl="/donate"
      />
    </div>
  );
}
