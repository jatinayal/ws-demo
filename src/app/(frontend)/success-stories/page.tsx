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
import { ArrowRight, Quote, Heart } from 'lucide-react';
import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export const metadata = constructMetadata({
  title: 'Success Stories',
  description: 'Real stories from women whose lives have been transformed by our programs.',
  path: '/success-stories',
});

export default async function SuccessStoriesPage() {
  const payload = await getPayloadClient();
  const storiesRes = await payload.find({
    collection: 'success-stories',
    limit: 100,
    sort: '-createdAt',
    where: {
      storyStatus: { equals: 'published' }
    }
  });

  const stories = storiesRes.docs;

  return (
    <div className="flex flex-col min-h-screen">
      <HeroSection 
        title="Success Stories"
        subtitle="Meet the incredible women who are breaking barriers, leading their communities, and inspiring the next generation."
      />

      <section className="py-24 md:py-36 bg-background relative overflow-hidden">
        <div className="absolute top-0 right-0 -mr-40 -mt-40 w-96 h-96 rounded-full bg-primary/5 blur-3xl pointer-events-none" />
        <Container className="relative z-10">
          {stories.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {stories.map((story: any, idx: number) => {
                const coverImage = typeof story.image === 'object' ? story.image?.url : null;
                const programName = typeof story.program === 'object' ? story.program?.title : null;

                return (
                  <AnimatedSection key={story.id} direction="up" delay={idx * 0.1}>
                    <div className="group bg-card rounded-3xl overflow-hidden shadow-sm hover:shadow-xl border border-border/40 transition-all duration-500 h-full flex flex-col flex-1 relative">
                      <div className="absolute top-6 right-6 z-10 text-primary/10 group-hover:text-primary/20 transition-colors duration-300">
                        <Quote size={48} />
                      </div>
                      <div className="p-8 flex flex-col flex-1 relative z-20">
                        <div className="flex items-center space-x-4 mb-6">
                          <div className="relative w-16 h-16 rounded-full overflow-hidden border-2 border-primary/20 group-hover:border-primary/50 transition-colors">
                            {coverImage ? (
                              <Image src={coverImage} alt={story.personName} fill className="object-cover" />
                            ) : (
                              <div className="w-full h-full bg-muted flex items-center justify-center">
                                <Heart className="w-6 h-6 text-muted-foreground" />
                              </div>
                            )}
                          </div>
                          <div>
                            <h3 className="text-xl font-bold tracking-tight">{story.personName}</h3>
                            {story.beneficiaryDetails?.occupation && (
                              <p className="text-sm font-semibold text-primary">{story.beneficiaryDetails.occupation}</p>
                            )}
                          </div>
                        </div>
                        
                        <p className="text-muted-foreground text-lg italic leading-relaxed mb-8 flex-1 line-clamp-4">
                          &quot;{story.quote}&quot;
                        </p>
                        
                        {programName && (
                          <div className="mb-6">
                            <span className="inline-block px-3 py-1 bg-muted rounded-md text-xs font-semibold text-muted-foreground">
                              {programName}
                            </span>
                          </div>
                        )}
                        
                        <div className="mt-auto">
                          <Link href={`/success-stories/${story.slug}`} className="inline-flex items-center font-bold text-foreground hover:text-primary transition-colors group/link">
                            Read Her Story <ArrowRight className="w-4 h-4 ml-2 group-hover/link:translate-x-1 transition-transform" />
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
                icon={Quote}
                title="No Stories Available" 
                description="We are currently gathering incredible stories from our community. Check back soon." 
              />
            </AnimatedSection>
          )}
        </Container>
      </section>

      <CTASection 
        title="Create More Success Stories"
        description="Your support helps us reach more women and write new stories of triumph."
        buttonLabel="Donate Now"
        buttonUrl="/donate"
      />
    </div>
  );
}
