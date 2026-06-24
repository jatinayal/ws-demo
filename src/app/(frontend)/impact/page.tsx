import React from 'react';
import { getImpactPage, getPayloadClient } from '@/lib/payload';
import { Container } from '@/components/shared/Container';
import { AnimatedSection } from '@/components/shared/AnimatedSection';
import { AnimatedCounter } from '@/components/shared/AnimatedCounter';
import { SectionHeader } from '@/components/shared/section-header';
import { CTASection } from '@/components/shared/CTASection';
import { constructMetadata } from '@/lib/seo';
import Image from 'next/image';
import Link from 'next/link';
import {
  Globe,
  Users,
  Target,
  Star,
  Heart,
  Zap,
  Shield,
  TrendingUp,
  Download,
  ArrowRight,
  Activity,
} from 'lucide-react';
import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { RichText } from '@payloadcms/richtext-lexical/react';
import { ImpactStatistic, SuccessStory } from '@/payload-types';
import { getMediaUrl } from '@/lib/utils';

const iconMap: Record<string, React.ElementType> = {
  Target,
  Heart,
  Users,
  Shield,
  Globe,
  Star,
  Zap,
  TrendingUp,
};

export const metadata = constructMetadata({
  title: 'Our Impact',
  description: 'Explore the measurable outcomes of our mission to empower women globally.',
  path: '/impact',
});

export default async function ImpactPage() {
  const payload = await getPayloadClient();
  const impactData = await getImpactPage();

  const statsRes = await payload.find({
    collection: 'impact-statistics',
    limit: 10,
    sort: 'createdAt',
  });
  const globalStats = statsRes.docs;

  const heroCover =
    typeof impactData.hero?.coverImage === 'object'
      ? getMediaUrl(impactData.hero.coverImage)
      : null;
  const mapImage =
    typeof impactData.geographicReach?.mapImage === 'object'
      ? getMediaUrl(impactData.geographicReach.mapImage)
      : null;
  const reportUrl =
    typeof impactData.annualReport?.reportFile === 'object'
      ? getMediaUrl(impactData.annualReport.reportFile)
      : null;

  return (
    <div className="flex min-h-screen flex-col">
      {/* 1. Hero Section */}
      <section className="bg-primary text-primary-foreground relative overflow-hidden pt-28 pb-16 md:pt-48 md:pb-36">
        <div className="absolute inset-0 z-0 bg-[url('/noise.png')] opacity-[0.05] mix-blend-overlay" />
        {heroCover && (
          <div className="absolute inset-0 z-0 opacity-20">
            <Image src={heroCover} alt="Impact Hero" fill className="object-cover" />
            <div className="from-primary via-primary/80 absolute inset-0 bg-gradient-to-t to-transparent" />
          </div>
        )}
        <Container className="relative z-10 text-center">
          <AnimatedSection direction="up" className="mx-auto max-w-4xl">
            <h1 className="mb-4 text-3xl font-extrabold tracking-tight sm:text-4xl md:mb-6 md:text-7xl">
              {impactData.hero?.heading || 'Our Global Impact'}
            </h1>
            <p className="text-base leading-relaxed font-medium text-white/90 md:text-2xl">
              {impactData.hero?.subheading}
            </p>
          </AnimatedSection>
        </Container>
      </section>

      {/* 2. Global Statistics Bar */}
      {globalStats && globalStats.length > 0 && (
        <section className="bg-card relative z-30 -mt-6 rounded-t-[2rem] border-b py-8 shadow-[0_-10px_20px_rgba(0,0,0,0.05)] md:-mt-10 md:rounded-t-[3rem] md:py-16 md:shadow-[0_-20px_40px_rgba(0,0,0,0.1)]">
          <Container>
            <div className="grid grid-cols-2 gap-4 sm:gap-6 md:grid-cols-4 md:gap-8">
              {(globalStats as unknown as ImpactStatistic[]).map((stat, idx: number) => {
                const Icon = stat.icon ? iconMap[stat.icon] || TrendingUp : TrendingUp;
                return (
                  <AnimatedSection key={idx} direction="up" delay={idx * 0.1}>
                    <div className="group text-center">
                      <div className="bg-accent/10 text-accent mx-auto mb-2 flex h-10 w-10 items-center justify-center rounded-lg transition-transform group-hover:scale-110 md:mb-4 md:h-12 md:w-12 md:rounded-xl">
                        <Icon className="h-5 w-5 md:h-6 md:w-6" />
                      </div>
                      <div className="text-foreground mb-1 flex items-baseline justify-center text-2xl font-extrabold tracking-tighter md:mb-2 md:text-4xl">
                        {stat.prefix && (
                          <span className="mr-0.5 text-sm opacity-80 md:mr-1 md:text-xl">
                            {stat.prefix}
                          </span>
                        )}
                        <AnimatedCounter value={stat.value || 0} />
                        {stat.suffix && (
                          <span className="ml-0.5 text-sm opacity-80 md:ml-1 md:text-xl">
                            {stat.suffix}
                          </span>
                        )}
                      </div>
                      <div className="text-muted-foreground text-[10px] font-bold tracking-wide uppercase md:text-xs md:tracking-widest">
                        {stat.label}
                      </div>
                    </div>
                  </AnimatedSection>
                );
              })}
            </div>
          </Container>
        </section>
      )}

      {/* 3. Geographic Reach */}
      {impactData.geographicReach && (
        <section className="bg-muted/30 py-12 md:py-36">
          <Container>
            <div className="grid grid-cols-1 items-center gap-8 md:gap-16 lg:grid-cols-2">
              <AnimatedSection direction="right">
                <SectionHeader
                  title={impactData.geographicReach.heading}
                  description={impactData.geographicReach.description}
                />

                {impactData.geographicReach.regions &&
                  impactData.geographicReach.regions.length > 0 && (
                    <div className="mt-8 space-y-4 md:mt-10 md:space-y-6">
                      {impactData.geographicReach.regions.map(
                        (
                          region: {
                            regionName?: string | null;
                            beneficiariesCount?: number | null;
                          },
                          idx: number,
                        ) => (
                          <div
                            key={idx}
                            className="bg-card border-border/50 flex items-center justify-between rounded-xl border p-4 shadow-sm transition-shadow hover:shadow-md md:rounded-2xl md:p-6"
                          >
                            <div className="flex items-center">
                              <Globe className="text-accent mr-3 h-5 w-5 shrink-0 md:mr-4 md:h-6 md:w-6" />
                              <span className="text-base font-bold md:text-lg">
                                {region.regionName}
                              </span>
                            </div>
                            <div className="text-right">
                              <div className="text-accent text-xl font-black md:text-2xl">
                                <AnimatedCounter value={region.beneficiariesCount || 0} />+
                              </div>
                              <div className="text-muted-foreground text-[10px] font-semibold tracking-wider uppercase md:text-xs">
                                Beneficiaries
                              </div>
                            </div>
                          </div>
                        ),
                      )}
                    </div>
                  )}
              </AnimatedSection>

              <AnimatedSection direction="left" delay={0.2}>
                <div className="bg-card border-border/50 relative flex aspect-square items-center justify-center overflow-hidden rounded-2xl border p-2 shadow-md md:rounded-3xl md:p-8 md:shadow-xl lg:aspect-[4/3]">
                  {mapImage ? (
                    <Image
                      src={mapImage}
                      alt="Global Map"
                      fill
                      className="object-contain p-0 md:p-8"
                    />
                  ) : (
                    <div className="text-muted-foreground text-center">
                      <Globe className="mx-auto mb-4 h-20 w-20 opacity-20 md:h-32 md:w-32" />
                      <p className="text-sm md:text-base">Global presence mapped across regions.</p>
                    </div>
                  )}
                </div>
              </AnimatedSection>
            </div>
          </Container>
        </section>
      )}

      {/* 4. Community Transformation */}
      {impactData.communityTransformation && (
        <section className="bg-background relative py-12 md:py-36">
          <div className="bg-accent/5 pointer-events-none absolute top-1/2 left-0 -mt-40 -ml-40 h-96 w-96 rounded-full blur-3xl" />
          <Container className="relative z-10">
            <AnimatedSection direction="up" className="mx-auto mb-8 max-w-3xl text-center md:mb-16">
              <h2 className="mb-4 text-2xl font-bold tracking-tight md:mb-6 md:text-5xl">
                {impactData.communityTransformation.heading}
              </h2>
              {impactData.communityTransformation.content && (
                <div className="prose prose-base md:prose-lg dark:prose-invert text-muted-foreground mx-auto leading-relaxed">
                  <RichText data={impactData.communityTransformation.content} />
                </div>
              )}
            </AnimatedSection>

            {impactData.communityTransformation.metrics &&
              impactData.communityTransformation.metrics.length > 0 && (
                <div className="border-border bg-card grid grid-cols-2 overflow-hidden rounded-xl border-t border-l shadow-none md:rounded-2xl lg:grid-cols-3">
                  {impactData.communityTransformation.metrics.map(
                    (
                      metric: {
                        icon?: string | null;
                        value?: number | null;
                        suffix?: string | null;
                        label?: string | null;
                      },
                      idx: number,
                    ) => {
                      const Icon = metric.icon ? iconMap[metric.icon] || Activity : Activity;
                      return (
                        <AnimatedSection
                          key={idx}
                          direction="up"
                          delay={idx * 0.1}
                          className="border-border flex h-full border-r border-b"
                        >
                          <div className="flex aspect-square w-full flex-col items-center justify-center p-4 py-8 text-center md:aspect-auto md:p-10">
                            <div className="text-accent mx-auto mb-3 flex shrink-0 items-center justify-center md:mb-4">
                              <Icon className="h-6 w-6 md:h-10 md:w-10" />
                            </div>
                            <div className="text-foreground mb-1 text-2xl font-black tracking-tighter md:mb-2 md:text-5xl">
                              <AnimatedCounter value={metric.value || 0} />
                              {metric.suffix && <span>{metric.suffix}</span>}
                            </div>
                            <p className="text-muted-foreground text-xs leading-snug font-semibold sm:text-sm md:text-lg">
                              {metric.label}
                            </p>
                          </div>
                        </AnimatedSection>
                      );
                    },
                  )}
                </div>
              )}
          </Container>
        </section>
      )}

      {/* 5. Featured Success Stories */}
      {impactData.featuredSuccessStories?.stories &&
        impactData.featuredSuccessStories.stories.length > 0 && (
          <section className="bg-muted/50 border-t py-24 md:py-36">
            <Container>
              <div className="mb-12 flex flex-col justify-between md:flex-row md:items-end">
                <AnimatedSection direction="left">
                  <SectionHeader
                    title={impactData.featuredSuccessStories.heading || 'Voices of Impact'}
                    align="left"
                  />
                </AnimatedSection>
                <AnimatedSection direction="right">
                  <Link
                    href="/success-stories"
                    className="text-primary mb-4 inline-flex items-center font-bold hover:underline"
                  >
                    View All Stories <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </AnimatedSection>
              </div>

              <div className="grid grid-cols-2 gap-3 md:gap-8">
                {(impactData.featuredSuccessStories.stories as unknown as SuccessStory[]).map(
                  (story, idx: number) => {
                    if (typeof story !== 'object') return null;
                    const coverImage = getMediaUrl(story.image) || null;
                    return (
                      <AnimatedSection
                        key={story.id}
                        direction="up"
                        delay={idx * 0.1}
                        className="h-full"
                      >
                        <div className="group bg-card border-border/40 flex h-full flex-col overflow-hidden rounded-2xl border shadow-sm transition-all duration-500 hover:shadow-xl md:flex-row md:rounded-3xl">
                          <div className="relative aspect-[4/3] w-full overflow-hidden md:aspect-auto md:w-2/5">
                            {coverImage ? (
                              <Image
                                src={coverImage}
                                alt={story.personName}
                                fill
                                className="object-cover transition-transform duration-700 group-hover:scale-105"
                              />
                            ) : (
                              <div className="bg-muted absolute inset-0 flex items-center justify-center" />
                            )}
                          </div>
                          <div className="flex flex-1 flex-col justify-between p-3 sm:p-4 md:p-8">
                            <div className="mb-2 md:mb-4">
                              <QuoteIcon className="text-primary/20 mb-1 h-5 w-5 md:mb-2 md:h-8 md:w-8" />
                              <p className="text-foreground/80 line-clamp-3 text-[11px] leading-relaxed font-medium italic md:line-clamp-none md:text-lg">
                                &quot;{story.quote}&quot;
                              </p>
                            </div>
                            <div>
                              <h4 className="line-clamp-1 text-sm font-bold md:text-xl">
                                {story.personName}
                              </h4>
                              {story.beneficiaryDetails?.occupation && (
                                <p className="text-primary line-clamp-1 text-[10px] font-semibold md:text-sm">
                                  {story.beneficiaryDetails.occupation}
                                </p>
                              )}
                            </div>
                            <div className="mt-2 md:mt-6">
                              <Link
                                href={`/success-stories/${story.slug}`}
                                className="text-foreground hover:text-primary flex items-center text-[10px] font-bold transition-colors md:text-sm"
                              >
                                Read Full Story{' '}
                                <ArrowRight className="ml-1 h-3 w-3 md:h-4 md:w-4" />
                              </Link>
                            </div>
                          </div>
                        </div>
                      </AnimatedSection>
                    );
                  },
                )}
              </div>
            </Container>
          </section>
        )}

      {/* 6. Annual Report */}
      {impactData.annualReport && (
        <section className="bg-background py-12 md:py-24">
          <Container>
            <AnimatedSection direction="up">
              <div className="bg-primary text-primary-foreground relative flex flex-col items-center justify-center overflow-hidden rounded-2xl p-8 text-center md:rounded-3xl md:p-16">
                <div className="absolute inset-0 bg-[url('/noise.png')] opacity-[0.05] mix-blend-overlay" />
                <div className="absolute top-0 right-0 -mt-20 -mr-20 h-64 w-64 rounded-full bg-white/10 blur-3xl" />

                <div className="relative z-10 mx-auto mb-6 max-w-2xl md:mb-8">
                  <h2 className="mb-3 text-center text-2xl font-bold md:mb-4 md:text-4xl">
                    {impactData.annualReport.heading}
                  </h2>
                  <p className="text-center text-base leading-relaxed text-white/80 md:text-lg">
                    {impactData.annualReport.description}
                  </p>
                </div>

                <div className="relative z-10 mx-auto">
                  <Link
                    href={reportUrl || '#'}
                    target={reportUrl ? '_blank' : undefined}
                    className={cn(
                      buttonVariants({
                        variant: 'secondary',
                        size: 'lg',
                        className:
                          'text-primary flex h-10 items-center rounded-full bg-white px-6 text-sm font-bold shadow-lg transition-all hover:scale-105 hover:bg-white/90 md:h-12 md:px-8 md:text-base',
                      }),
                    )}
                  >
                    <Download className="mr-2 h-4 w-4 shrink-0 md:mr-3 md:h-5 md:w-5" />{' '}
                    {impactData.annualReport.downloadLabel || 'Download Report'}
                  </Link>
                </div>
              </div>
            </AnimatedSection>
          </Container>
        </section>
      )}

      <CTASection
        title="Be Part of Our Impact"
        description="Every contribution creates a ripple effect of change. Join us in making a difference."
        buttonLabel="Support Our Mission"
        buttonUrl="/donate"
      />
    </div>
  );
}

function QuoteIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="currentColor"
      stroke="none"
    >
      <path d="M10 11h-4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v5a6 6 0 0 1-6 6H5a1 1 0 0 1 0-2h1a4 4 0 0 0 4-4zm10 0h-4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v5a6 6 0 0 1-6 6h-1a1 1 0 0 1 0-2h1a4 4 0 0 0 4-4z" />
    </svg>
  );
}
