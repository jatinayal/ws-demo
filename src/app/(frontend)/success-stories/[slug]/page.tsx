import React from 'react';
import { getPayloadClient } from '@/lib/payload';
import { notFound } from 'next/navigation';
import { Container } from '@/components/shared/Container';
import { AnimatedSection } from '@/components/shared/AnimatedSection';
import { AnimatedCounter } from '@/components/shared/AnimatedCounter';
import { constructMetadata } from '@/lib/seo';
import Image from 'next/image';
import Link from 'next/link';
import { Quote, ArrowLeft, MapPin, Briefcase, User, BookOpen } from 'lucide-react';
import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { RichText } from '@payloadcms/richtext-lexical/react';
import { SuccessStory } from '@/payload-types';

interface StoryPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateMetadata({ params }: StoryPageProps) {
  const { slug } = await params;
  const payload = await getPayloadClient();
  const stories = await payload.find({
    collection: 'success-stories',
    where: { slug: { equals: slug } },
    limit: 1,
  });

  if (!stories.docs.length) return constructMetadata();
  const story = stories.docs[0];

  return constructMetadata({
    title: `${story.personName}'s Story`,
    description: story.quote || `Read the inspiring success story of ${story.personName}.`,
    image: typeof story.image === 'object' ? story.image?.url : undefined,
    path: `/success-stories/${slug}`,
  });
}

export default async function StoryDetailPage({ params }: StoryPageProps) {
  const { slug } = await params;
  const payload = await getPayloadClient();

  const stories = await payload.find({
    collection: 'success-stories',
    where: { slug: { equals: slug }, storyStatus: { equals: 'published' } },
    limit: 1,
  });

  if (!stories.docs.length) {
    notFound();
  }

  const story = stories.docs[0];
  const coverImage = typeof story.image === 'object' ? story.image?.url : null;
  const programName = typeof story.program === 'object' ? story.program?.title : null;
  const programSlug = typeof story.program === 'object' ? story.program?.slug : null;

  return (
    <div className="bg-background flex min-h-screen flex-col">
      {/* 1. Story Header Hero */}
      <section className="bg-primary text-primary-foreground relative overflow-hidden pt-32 pb-24 md:pt-48 md:pb-48">
        <div className="absolute inset-0 z-0 bg-[url('/noise.png')] opacity-[0.05] mix-blend-overlay" />
        <Container className="relative z-20">
          <AnimatedSection direction="up" className="mx-auto max-w-4xl text-center">
            <Link
              href="/success-stories"
              className="mb-8 inline-flex items-center font-medium text-white/80 transition-colors hover:text-white"
            >
              <ArrowLeft className="mr-2 h-4 w-4" /> All Success Stories
            </Link>

            <Quote className="mx-auto mb-8 h-16 w-16 text-white/20" />

            <h1 className="mb-8 text-4xl leading-tight font-extrabold tracking-tight text-white italic md:text-5xl lg:text-6xl">
              &quot;{story.quote}&quot;
            </h1>

            <div className="flex items-center justify-center space-x-4">
              <div className="bg-accent h-1 w-12 rounded-full" />
              <p className="text-xl font-semibold text-white/90 md:text-2xl">{story.personName}</p>
              <div className="bg-accent h-1 w-12 rounded-full" />
            </div>
          </AnimatedSection>
        </Container>
      </section>

      {/* 2. Main Content & Sidebar */}
      <section className="relative z-30 -mt-20 py-20 md:py-24">
        <Container>
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
            {/* Left Sidebar - Meta info */}
            <div className="order-2 lg:order-1 lg:col-span-4">
              <AnimatedSection direction="up">
                <div className="bg-card border-border/50 sticky top-32 rounded-3xl border p-8 shadow-xl shadow-black/5">
                  <div className="ring-background relative mb-8 aspect-square w-full overflow-hidden rounded-2xl shadow-inner ring-4">
                    {coverImage ? (
                      <Image
                        src={coverImage}
                        alt={story.personName}
                        fill
                        className="object-cover"
                      />
                    ) : (
                      <div className="bg-muted flex h-full w-full items-center justify-center">
                        <User className="text-muted-foreground/30 h-16 w-16" />
                      </div>
                    )}
                  </div>

                  <h3 className="mb-6 text-2xl font-bold">{story.personName}&apos;s Details</h3>

                  <ul className="mb-8 space-y-5">
                    {story.beneficiaryDetails?.occupation && (
                      <li className="text-muted-foreground flex items-center">
                        <Briefcase className="text-primary mr-4 h-5 w-5 shrink-0" />
                        <span className="font-medium">{story.beneficiaryDetails.occupation}</span>
                      </li>
                    )}
                    {story.beneficiaryDetails?.location && (
                      <li className="text-muted-foreground flex items-center">
                        <MapPin className="text-primary mr-4 h-5 w-5 shrink-0" />
                        <span className="font-medium">{story.beneficiaryDetails.location}</span>
                      </li>
                    )}
                    {story.beneficiaryDetails?.age && (
                      <li className="text-muted-foreground flex items-center">
                        <User className="text-primary mr-4 h-5 w-5 shrink-0" />
                        <span className="font-medium">
                          {story.beneficiaryDetails.age} Years Old
                        </span>
                      </li>
                    )}
                    {programName && (
                      <li className="text-muted-foreground flex items-center">
                        <BookOpen className="text-primary mr-4 h-5 w-5 shrink-0" />
                        <span className="font-medium">Graduate of {programName}</span>
                      </li>
                    )}
                  </ul>

                  {story.impactOutcomes && story.impactOutcomes.length > 0 && (
                    <div className="border-border border-t pt-6">
                      <h4 className="text-muted-foreground mb-4 text-sm font-bold tracking-wider uppercase">
                        Key Outcomes
                      </h4>
                      <div className="space-y-4">
                        {story.impactOutcomes.map(
                          (
                            outcome: {
                              label?: string | null;
                              value?: string | null;
                              suffix?: string | null;
                            },
                            idx: number,
                          ) => (
                            <div
                              key={idx}
                              className="bg-primary/5 flex items-center justify-between rounded-xl p-4"
                            >
                              <span className="text-sm font-semibold">{outcome.label}</span>
                              <span className="text-primary flex items-baseline text-lg font-black">
                                <AnimatedCounter
                                  value={outcome.value ? parseInt(outcome.value) : 0}
                                />
                                {outcome.suffix && <span>{outcome.suffix}</span>}
                              </span>
                            </div>
                          ),
                        )}
                      </div>
                    </div>
                  )}

                  <div className="mt-8">
                    <Link
                      href={story.donationUrl || '/donate'}
                      className={cn(
                        buttonVariants({
                          variant: 'default',
                          className: 'h-12 w-full rounded-full font-bold shadow-md',
                        }),
                      )}
                    >
                      Support Women Like {story.personName.split(' ')[0]}
                    </Link>
                  </div>
                </div>
              </AnimatedSection>
            </div>

            {/* Right Content Area - Story */}
            <div className="order-1 pt-8 lg:order-2 lg:col-span-8 lg:pt-0">
              <AnimatedSection direction="up" delay={0.2}>
                <div className="prose prose-lg md:prose-xl dark:prose-invert text-muted-foreground max-w-none leading-relaxed">
                  <RichText data={story.story} />
                </div>
              </AnimatedSection>

              {/* Program Association CTA */}
              {programName && programSlug && (
                <AnimatedSection direction="up" className="mt-16">
                  <div className="bg-muted/50 border-border flex flex-col items-center justify-between gap-6 rounded-3xl border p-8 text-center sm:flex-row sm:text-left">
                    <div>
                      <h4 className="mb-1 text-lg font-bold">Inspired by this story?</h4>
                      <p className="text-muted-foreground">
                        Learn more about the program that made it possible.
                      </p>
                    </div>
                    <Link
                      href={`/programs/${programSlug}`}
                      className={cn(
                        buttonVariants({
                          variant: 'outline',
                          className: 'rounded-full whitespace-nowrap',
                        }),
                      )}
                    >
                      View {programName}
                    </Link>
                  </div>
                </AnimatedSection>
              )}
            </div>
          </div>
        </Container>
      </section>

      {/* 3. Image Gallery */}
      {story.mediaGallery && story.mediaGallery.length > 0 && (
        <section className="bg-muted/30 border-y py-24">
          <Container>
            <AnimatedSection direction="up" className="mb-12 text-center">
              <h2 className="text-3xl font-bold">
                Moments from {story.personName.split(' ')[0]}&apos;s Journey
              </h2>
            </AnimatedSection>
            <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
              {story.mediaGallery.map(
                (item: { image?: { url?: string; alt?: string } | null | string }, idx: number) => {
                  if (typeof item.image !== 'object' || !item.image?.url) return null;
                  return (
                    <AnimatedSection key={idx} direction="up" delay={idx * 0.1}>
                      <div className="group relative aspect-square overflow-hidden rounded-2xl shadow-sm">
                        <Image
                          src={item.image.url}
                          alt={item.image.alt || 'Gallery Image'}
                          fill
                          className="object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-black/0 transition-colors duration-300 group-hover:bg-black/20" />
                      </div>
                    </AnimatedSection>
                  );
                },
              )}
            </div>
          </Container>
        </section>
      )}

      {/* 4. Related Stories */}
      {story.relatedStories && story.relatedStories.length > 0 && (
        <section className="bg-background py-24">
          <Container>
            <AnimatedSection direction="up" className="mb-12">
              <h2 className="text-center text-3xl font-bold">More Inspiring Stories</h2>
            </AnimatedSection>
            <div className="mx-auto grid max-w-4xl grid-cols-1 gap-8 md:grid-cols-2">
              {story.relatedStories.map((relatedStory: SuccessStory | string, idx: number) => {
                if (typeof relatedStory !== 'object') return null;
                const rCoverImage =
                  typeof relatedStory.image === 'object' ? relatedStory.image?.url : null;
                return (
                  <AnimatedSection key={relatedStory.id} direction="up" delay={idx * 0.1}>
                    <Link
                      href={`/success-stories/${relatedStory.slug}`}
                      className="group block h-full"
                    >
                      <div className="bg-card border-border/40 flex h-full flex-col overflow-hidden rounded-3xl border shadow-sm transition-all duration-500 hover:shadow-xl md:flex-row">
                        <div className="relative aspect-square w-full overflow-hidden md:w-2/5">
                          {rCoverImage ? (
                            <Image
                              src={rCoverImage}
                              alt={relatedStory.personName}
                              fill
                              className="object-cover transition-transform duration-700 group-hover:scale-110"
                            />
                          ) : (
                            <div className="bg-muted absolute inset-0 flex items-center justify-center" />
                          )}
                        </div>
                        <div className="flex flex-1 flex-col justify-center p-6">
                          <Quote className="text-primary/20 mb-3 h-6 w-6" />
                          <h4 className="group-hover:text-primary mb-2 text-xl font-bold transition-colors">
                            {relatedStory.personName}
                          </h4>
                          <p className="text-muted-foreground line-clamp-2 text-sm leading-relaxed">
                            &quot;{relatedStory.quote}&quot;
                          </p>
                        </div>
                      </div>
                    </Link>
                  </AnimatedSection>
                );
              })}
            </div>
          </Container>
        </section>
      )}
    </div>
  );
}
