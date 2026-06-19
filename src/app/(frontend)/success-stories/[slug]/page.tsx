import React from 'react';
import { getPayloadClient } from '@/lib/payload';
import { notFound } from 'next/navigation';
import { Container } from '@/components/shared/Container';
import { AnimatedSection } from '@/components/shared/AnimatedSection';
import { AnimatedCounter } from '@/components/shared/AnimatedCounter';
import { CTASection } from '@/components/shared/CTASection';
import { constructMetadata } from '@/lib/seo';
import Image from 'next/image';
import Link from 'next/link';
import { Heart, Quote, ArrowLeft, ArrowRight, MapPin, Briefcase, User, BookOpen } from 'lucide-react';
import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { RichText } from '@payloadcms/richtext-lexical/react';

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
    <div className="flex flex-col min-h-screen bg-background">
      {/* 1. Story Header Hero */}
      <section className="relative pt-32 pb-24 md:pt-48 md:pb-48 overflow-hidden bg-primary text-primary-foreground">
        <div className="absolute inset-0 bg-[url('/noise.png')] opacity-[0.05] mix-blend-overlay z-0" />
        <Container className="relative z-20">
          <AnimatedSection direction="up" className="max-w-4xl mx-auto text-center">
            <Link href="/success-stories" className="inline-flex items-center text-white/80 hover:text-white mb-8 transition-colors font-medium">
              <ArrowLeft className="w-4 h-4 mr-2" /> All Success Stories
            </Link>
            
            <Quote className="w-16 h-16 mx-auto mb-8 text-white/20" />
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-8 tracking-tight leading-tight italic">
              &quot;{story.quote}&quot;
            </h1>
            
            <div className="flex items-center justify-center space-x-4">
              <div className="w-12 h-1 bg-accent rounded-full" />
              <p className="text-xl md:text-2xl font-semibold text-white/90">
                {story.personName}
              </p>
              <div className="w-12 h-1 bg-accent rounded-full" />
            </div>
          </AnimatedSection>
        </Container>
      </section>

      {/* 2. Main Content & Sidebar */}
      <section className="py-20 md:py-24 relative -mt-20 z-30">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
            
            {/* Left Sidebar - Meta info */}
            <div className="lg:col-span-4 order-2 lg:order-1">
              <AnimatedSection direction="up">
                <div className="bg-card rounded-3xl p-8 border border-border/50 shadow-xl shadow-black/5 sticky top-32">
                  <div className="relative aspect-square w-full rounded-2xl overflow-hidden mb-8 ring-4 ring-background shadow-inner">
                    {coverImage ? (
                      <Image src={coverImage} alt={story.personName} fill className="object-cover" />
                    ) : (
                      <div className="w-full h-full bg-muted flex items-center justify-center">
                        <User className="w-16 h-16 text-muted-foreground/30" />
                      </div>
                    )}
                  </div>

                  <h3 className="text-2xl font-bold mb-6">{story.personName}&apos;s Details</h3>
                  
                  <ul className="space-y-5 mb-8">
                    {story.beneficiaryDetails?.occupation && (
                      <li className="flex items-center text-muted-foreground">
                        <Briefcase className="w-5 h-5 mr-4 text-primary shrink-0" />
                        <span className="font-medium">{story.beneficiaryDetails.occupation}</span>
                      </li>
                    )}
                    {story.beneficiaryDetails?.location && (
                      <li className="flex items-center text-muted-foreground">
                        <MapPin className="w-5 h-5 mr-4 text-primary shrink-0" />
                        <span className="font-medium">{story.beneficiaryDetails.location}</span>
                      </li>
                    )}
                    {story.beneficiaryDetails?.age && (
                      <li className="flex items-center text-muted-foreground">
                        <User className="w-5 h-5 mr-4 text-primary shrink-0" />
                        <span className="font-medium">{story.beneficiaryDetails.age} Years Old</span>
                      </li>
                    )}
                    {programName && (
                      <li className="flex items-center text-muted-foreground">
                        <BookOpen className="w-5 h-5 mr-4 text-primary shrink-0" />
                        <span className="font-medium">Graduate of {programName}</span>
                      </li>
                    )}
                  </ul>

                  {story.impactOutcomes && story.impactOutcomes.length > 0 && (
                    <div className="pt-6 border-t border-border">
                      <h4 className="text-sm font-bold text-muted-foreground uppercase tracking-wider mb-4">Key Outcomes</h4>
                      <div className="space-y-4">
                        {story.impactOutcomes.map((outcome: any, idx: number) => (
                          <div key={idx} className="bg-primary/5 rounded-xl p-4 flex items-center justify-between">
                            <span className="font-semibold text-sm">{outcome.label}</span>
                            <span className="font-black text-primary text-lg flex items-baseline">
                              <AnimatedCounter value={parseInt(outcome.value) || 0} />
                              {outcome.suffix && <span>{outcome.suffix}</span>}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="mt-8">
                    <Link href={story.donationUrl || '/donate'} className={cn(buttonVariants({ variant: 'default', className: 'w-full rounded-full h-12 font-bold shadow-md' }))}>
                      Support Women Like {story.personName.split(' ')[0]}
                    </Link>
                  </div>
                </div>
              </AnimatedSection>
            </div>

            {/* Right Content Area - Story */}
            <div className="lg:col-span-8 order-1 lg:order-2 pt-8 lg:pt-0">
              <AnimatedSection direction="up" delay={0.2}>
                <div className="prose prose-lg md:prose-xl dark:prose-invert text-muted-foreground leading-relaxed max-w-none">
                  <RichText data={story.story} />
                </div>
              </AnimatedSection>
              
              {/* Program Association CTA */}
              {programName && programSlug && (
                <AnimatedSection direction="up" className="mt-16">
                  <div className="bg-muted/50 rounded-3xl p-8 border border-border flex flex-col sm:flex-row items-center justify-between text-center sm:text-left gap-6">
                    <div>
                      <h4 className="text-lg font-bold mb-1">Inspired by this story?</h4>
                      <p className="text-muted-foreground">Learn more about the program that made it possible.</p>
                    </div>
                    <Link href={`/programs/${programSlug}`} className={cn(buttonVariants({ variant: 'outline', className: 'rounded-full whitespace-nowrap' }))}>
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
        <section className="py-24 bg-muted/30 border-y">
          <Container>
            <AnimatedSection direction="up" className="mb-12 text-center">
              <h2 className="text-3xl font-bold">Moments from {story.personName.split(' ')[0]}&apos;s Journey</h2>
            </AnimatedSection>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {story.mediaGallery.map((item: any, idx: number) => {
                if (typeof item.image !== 'object' || !item.image?.url) return null;
                return (
                  <AnimatedSection key={idx} direction="up" delay={idx * 0.1}>
                    <div className="relative aspect-square rounded-2xl overflow-hidden shadow-sm group">
                      <Image src={item.image.url} alt={item.image.alt || 'Gallery Image'} fill className="object-cover transition-transform duration-700 group-hover:scale-110" />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
                    </div>
                  </AnimatedSection>
                );
              })}
            </div>
          </Container>
        </section>
      )}

      {/* 4. Related Stories */}
      {story.relatedStories && story.relatedStories.length > 0 && (
        <section className="py-24 bg-background">
          <Container>
            <AnimatedSection direction="up" className="mb-12">
              <h2 className="text-3xl font-bold text-center">More Inspiring Stories</h2>
            </AnimatedSection>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {story.relatedStories.map((relatedStory: any, idx: number) => {
                if (typeof relatedStory !== 'object') return null;
                const rCoverImage = typeof relatedStory.image === 'object' ? relatedStory.image?.url : null;
                return (
                  <AnimatedSection key={relatedStory.id} direction="up" delay={idx * 0.1}>
                    <Link href={`/success-stories/${relatedStory.slug}`} className="group block h-full">
                      <div className="bg-card rounded-3xl overflow-hidden shadow-sm hover:shadow-xl border border-border/40 transition-all duration-500 h-full flex flex-col md:flex-row">
                        <div className="relative w-full md:w-2/5 aspect-square overflow-hidden">
                          {rCoverImage ? (
                            <Image src={rCoverImage} alt={relatedStory.personName} fill className="object-cover transition-transform duration-700 group-hover:scale-110" />
                          ) : (
                            <div className="absolute inset-0 bg-muted flex items-center justify-center" />
                          )}
                        </div>
                        <div className="p-6 flex-1 flex flex-col justify-center">
                          <Quote className="w-6 h-6 text-primary/20 mb-3" />
                          <h4 className="text-xl font-bold group-hover:text-primary transition-colors mb-2">{relatedStory.personName}</h4>
                          <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed">&quot;{relatedStory.quote}&quot;</p>
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
