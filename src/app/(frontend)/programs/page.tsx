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
import { ArrowRight, BookOpen, Heart, Activity } from 'lucide-react';
import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export const metadata = constructMetadata({
  title: 'Our Programs',
  description: 'Discover how we are making a difference through education, leadership, entrepreneurship, and community building.',
  path: '/programs',
});

const categoryColors: Record<string, string> = {
  education: 'bg-blue-100 text-blue-800 border-blue-200 dark:bg-blue-900/30 dark:text-blue-300 dark:border-blue-800',
  leadership: 'bg-purple-100 text-purple-800 border-purple-200 dark:bg-purple-900/30 dark:text-purple-300 dark:border-purple-800',
  entrepreneurship: 'bg-orange-100 text-orange-800 border-orange-200 dark:bg-orange-900/30 dark:text-orange-300 dark:border-orange-800',
  wellness: 'bg-emerald-100 text-emerald-800 border-emerald-200 dark:bg-emerald-900/30 dark:text-emerald-300 dark:border-emerald-800',
  community: 'bg-pink-100 text-pink-800 border-pink-200 dark:bg-pink-900/30 dark:text-pink-300 dark:border-pink-800',
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
    <div className="flex flex-col min-h-screen">
      <HeroSection 
        title="Our Featured Programs"
        subtitle="Discover how we are making a difference through education, mentorship, and community building."
      />

      <section className="py-24 md:py-36 bg-background relative overflow-hidden">
        <div className="absolute top-0 right-0 -mr-40 -mt-40 w-96 h-96 rounded-full bg-primary/5 blur-3xl pointer-events-none" />
        <Container className="relative z-10">
          {programs.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {programs.map((program: any, idx: number) => {
                const coverImage = typeof program.coverImage === 'object' ? program.coverImage?.url : null;
                const catColor = categoryColors[program.category] || categoryColors.community;
                const catLabel = categoryLabels[program.category] || program.category;

                return (
                  <AnimatedSection key={program.id} direction="up" delay={idx * 0.1}>
                    <div className="group bg-card rounded-3xl overflow-hidden shadow-sm hover:shadow-xl border border-border/40 transition-all duration-500 h-full flex flex-col flex-1">
                      <div className="relative aspect-video overflow-hidden">
                        {coverImage ? (
                          <Image src={coverImage} alt={program.title} fill className="object-cover transition-transform duration-700 group-hover:scale-110" />
                        ) : (
                          <div className="absolute inset-0 bg-muted flex items-center justify-center">
                            <BookOpen className="w-12 h-12 text-muted-foreground/30" />
                          </div>
                        )}
                        <div className="absolute top-4 right-4 z-10">
                          <span className={cn("px-3 py-1.5 rounded-full text-xs font-bold border backdrop-blur-md shadow-sm uppercase tracking-wider", catColor)}>
                            {catLabel}
                          </span>
                        </div>
                      </div>
                      
                      <div className="p-8 flex flex-col flex-1">
                        <h3 className="text-2xl font-bold mb-3 tracking-tight group-hover:text-primary transition-colors line-clamp-2">{program.title}</h3>
                        <p className="text-muted-foreground leading-relaxed mb-8 flex-1 line-clamp-3">
                          {program.shortDescription}
                        </p>
                        
                        <div className="mt-auto">
                          <Link href={`/programs/${program.slug}`} className={cn(buttonVariants({ variant: 'outline', className: 'w-full rounded-full h-12 font-semibold group-hover:bg-primary group-hover:text-primary-foreground group-hover:border-primary transition-all duration-300' }))}>
                            Explore Program <ArrowRight className="w-4 h-4 ml-2" />
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
