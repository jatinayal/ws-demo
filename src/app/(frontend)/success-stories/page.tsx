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
import { SuccessStory } from '@/payload-types';
import { getMediaUrl } from '@/lib/utils';

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
      storyStatus: { equals: 'published' },
    },
  });

  const stories = storiesRes.docs;

  return (
    <div className="flex min-h-screen flex-col">
      <HeroSection
        title="Success Stories"
        subtitle="Meet the incredible women who are breaking barriers, leading their communities, and inspiring the next generation."
      />

      <section className="bg-background relative overflow-hidden py-24 md:py-36">
        <div className="bg-primary/5 pointer-events-none absolute top-0 right-0 -mt-40 -mr-40 h-96 w-96 rounded-full blur-3xl" />
        <Container className="relative z-10">
          {stories.length > 0 ? (
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
              {(stories as unknown as SuccessStory[]).map((story, idx: number) => {
                const coverImage = getMediaUrl(story.image) || null;
                const programName = typeof story.program === 'object' ? story.program?.title : null;

                return (
                  <AnimatedSection key={story.id} direction="up" delay={idx * 0.1}>
                    <div className="group bg-card border-border/40 relative flex h-full flex-1 flex-col overflow-hidden rounded-3xl border shadow-sm transition-all duration-500 hover:shadow-xl">
                      <div className="text-primary/10 group-hover:text-primary/20 absolute top-6 right-6 z-10 transition-colors duration-300">
                        <Quote size={48} />
                      </div>
                      <div className="relative z-20 flex flex-1 flex-col p-8">
                        <div className="mb-6 flex items-center space-x-4">
                          <div className="border-primary/20 group-hover:border-primary/50 relative h-16 w-16 overflow-hidden rounded-full border-2 transition-colors">
                            {coverImage ? (
                              <Image
                                src={coverImage}
                                alt={story.personName}
                                fill
                                className="object-cover"
                              />
                            ) : (
                              <div className="bg-muted flex h-full w-full items-center justify-center">
                                <Heart className="text-muted-foreground h-6 w-6" />
                              </div>
                            )}
                          </div>
                          <div>
                            <h3 className="text-xl font-bold tracking-tight">{story.personName}</h3>
                            {story.beneficiaryDetails?.occupation && (
                              <p className="text-primary text-sm font-semibold">
                                {story.beneficiaryDetails.occupation}
                              </p>
                            )}
                          </div>
                        </div>

                        <p className="text-muted-foreground mb-8 line-clamp-4 flex-1 text-lg leading-relaxed italic">
                          &quot;{story.quote}&quot;
                        </p>

                        {programName && (
                          <div className="mb-6">
                            <span className="bg-muted text-muted-foreground inline-block rounded-md px-3 py-1 text-xs font-semibold">
                              {programName}
                            </span>
                          </div>
                        )}

                        <div className="mt-auto">
                          <Link
                            href={`/success-stories/${story.slug}`}
                            className="text-foreground hover:text-primary group/link inline-flex items-center font-bold transition-colors"
                          >
                            Read Her Story{' '}
                            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover/link:translate-x-1" />
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
