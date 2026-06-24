import { getHomepage, getPayloadClient } from '@/lib/payload';
import { RichText } from '@payloadcms/richtext-lexical/react';
import { HeroSection } from '@/components/shared/HeroSection';
import { Container } from '@/components/shared/Container';
import { CTASection } from '@/components/shared/CTASection';
import { PartnersSection } from '@/components/shared/PartnersSection';
import { TestimonialsSection } from '@/components/shared/TestimonialsSection';
import { NewsletterSection } from '@/components/shared/NewsletterSection';
import { AnimatedCounter } from '@/components/shared/AnimatedCounter';
import { EmptyState } from '@/components/shared/EmptyState';
import { AnimatedSection } from '@/components/shared/AnimatedSection';
import { Calendar, Users, Heart, BookOpen, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import type { Program, SuccessStory, Event, Partner, ImpactStatistic } from '@/payload-types';
import { getMediaUrl } from '@/lib/utils';

// Icons mapping for Impact Statistics
const iconMap: Record<string, React.ElementType> = {
  Users,
  Heart,
  BookOpen,
  Calendar,
};

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

export const revalidate = 0;

export default async function Home() {
  const payload = await getPayloadClient();
  const homepage = await getHomepage();

  const [impactStatsRes, partnersRes, eventsRes, storiesRes, programsRes] = await Promise.all([
    payload.find({
      collection: 'impact-statistics',
      limit: 4,
      select: { icon: true, value: true, prefix: true, suffix: true, label: true },
    }),
    payload.find({
      collection: 'partners',
      limit: 10,
      select: { name: true, logo: true, websiteUrl: true },
    }),
    payload.find({
      collection: 'events',
      where: { eventStatus: { equals: 'upcoming' } },
      limit: 3,
      sort: 'date',
      select: { id: true, date: true, title: true, location: true, eventStatus: true },
    }),
    payload.find({
      collection: 'success-stories',
      limit: 3,
      select: { personName: true, quote: true, image: true, program: true },
    }),
    payload.find({
      collection: 'programs',
      limit: 3,
      select: { title: true, coverImage: true, shortDescription: true, slug: true, category: true },
    }),
  ]);

  const impactStats = impactStatsRes.docs as ImpactStatistic[];
  const partners = partnersRes.docs as Partner[];
  const events = eventsRes.docs as Event[];

  const stories = (
    homepage.storiesSection?.featuredStories && homepage.storiesSection.featuredStories.length > 0
      ? homepage.storiesSection.featuredStories.filter(
          (s: string | SuccessStory): s is SuccessStory => typeof s === 'object' && s !== null,
        )
      : storiesRes.docs
  ) as SuccessStory[];

  const programs = (
    homepage.programsSection?.featuredPrograms &&
    homepage.programsSection.featuredPrograms.length > 0
      ? homepage.programsSection.featuredPrograms.filter(
          (p: string | Program): p is Program => typeof p === 'object' && p !== null,
        )
      : programsRes.docs
  ) as Program[];

  return (
    <div className="flex min-h-screen flex-col">
      {/* 1. Hero Section */}
      <HeroSection
        size="default"
        title={homepage.hero?.heading || 'Where Every Woman Leads'}
        subtitle={
          homepage.hero?.subheading ||
          'Empowering women worldwide to achieve their full potential through education, resources, and community.'
        }
        backgroundImage={
          typeof homepage.hero?.backgroundImage === 'object'
            ? getMediaUrl(homepage.hero.backgroundImage) || undefined
            : undefined
        }
        primaryCta={
          homepage.hero?.callsToAction?.[0]
            ? {
                label: homepage.hero.callsToAction[0].label || 'Donate Now',
                url: homepage.hero.callsToAction[0].url || '/donate',
              }
            : undefined
        }
        secondaryCta={
          homepage.hero?.callsToAction?.[1]
            ? {
                label: homepage.hero.callsToAction[1].label || 'Get Involved',
                url: homepage.hero.callsToAction[1].url || '/get-involved',
              }
            : undefined
        }
      />

      {/* 2. About Preview */}
      {homepage.aboutSection && (
        <section className="bg-background relative overflow-hidden py-16 md:py-36">
          <div className="bg-primary/5 absolute top-0 right-0 -mt-40 -mr-40 h-96 w-96 rounded-full blur-3xl" />
          <div className="bg-accent/5 absolute bottom-0 left-0 -mb-40 -ml-40 h-96 w-96 rounded-full blur-3xl" />

          <Container className="relative z-10">
            {/* Mobile Only Heading */}
            <div className="mb-6 text-center md:hidden">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                {homepage.aboutSection.heading}
              </h2>
            </div>

            <div className="flex flex-col items-center gap-8 md:grid md:grid-cols-1 md:gap-16 lg:grid-cols-2">
              <AnimatedSection direction="right" className="order-2 w-full md:order-1">
                <h2 className="mb-6 hidden text-4xl font-bold tracking-tight md:block md:text-5xl">
                  {homepage.aboutSection.heading}
                </h2>
                <div className="prose prose-base sm:prose-lg dark:prose-invert text-muted-foreground mx-auto mb-8 text-justify md:mb-10 md:text-left lg:mx-0">
                  {homepage.aboutSection.content ? (
                    <RichText data={homepage.aboutSection.content} />
                  ) : (
                    <p className="leading-relaxed">
                      Women&apos;s Synergy is a global non-profit organization dedicated to closing
                      the gender gap and providing equal opportunities for women. We believe that
                      when women are empowered, entire communities thrive.
                    </p>
                  )}
                </div>
                <div className="flex justify-center md:justify-start">
                  {homepage.aboutSection.ctaLabel && homepage.aboutSection.ctaUrl && (
                    <Link
                      href={homepage.aboutSection.ctaUrl}
                      className={buttonVariants({
                        size: 'lg',
                        className: 'h-12 rounded-full px-6 text-sm md:h-14 md:px-8 md:text-base',
                      })}
                    >
                      {homepage.aboutSection.ctaLabel} <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  )}
                </div>
              </AnimatedSection>
              <AnimatedSection direction="left" delay={0.2} className="order-1 w-full md:order-2">
                <div className="relative aspect-[4/3] overflow-hidden rounded-2xl md:rounded-3xl">
                  {typeof homepage.aboutSection.image === 'object' &&
                  getMediaUrl(homepage.aboutSection.image) ? (
                    <Image
                      src={getMediaUrl(homepage.aboutSection.image)}
                      alt="About Us"
                      fill
                      className="object-contain transition-transform duration-700"
                    />
                  ) : (
                    <div className="text-muted-foreground bg-accent/10 absolute inset-0 flex items-center justify-center">
                      Image Placeholder
                    </div>
                  )}
                </div>
              </AnimatedSection>
            </div>
          </Container>
        </section>
      )}

      {/* 3. Impact Statistics */}
      {impactStats.length > 0 && (
        <section className="bg-card relative overflow-hidden border-y py-16 md:py-24">
          <Container className="relative z-10">
            <AnimatedSection direction="up" className="mb-8 md:mb-12">
              <div className="text-center">
                <h2 className="mb-4 text-3xl font-bold tracking-tight md:mb-6 md:text-4xl lg:text-5xl">
                  {homepage.impactSection?.heading || 'Our Global Impact'}
                </h2>
                <p className="text-muted-foreground mx-auto max-w-2xl text-base md:text-xl">
                  {homepage.impactSection?.description ||
                    'Numbers that represent lives changed and futures empowered.'}
                </p>
              </div>
            </AnimatedSection>

            {/* Desktop Grid */}
            <div className="hidden grid-cols-2 gap-8 md:grid md:grid-cols-4">
              {(impactStats as unknown as ImpactStatistic[]).map((stat, idx: number) => {
                const Icon =
                  typeof stat.icon === 'string' && stat.icon ? iconMap[stat.icon] || Heart : Heart;
                return (
                  <AnimatedSection key={idx} direction="up" delay={idx * 0.1}>
                    <div className="group bg-background border-border/40 hover:border-accent/30 rounded-3xl border p-8 text-center shadow-sm transition-all duration-300 hover:shadow-md">
                      <div className="bg-accent/10 text-accent mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-2xl transition-transform group-hover:scale-110">
                        <Icon size={28} />
                      </div>
                      <div className="text-foreground mb-3 flex items-baseline justify-center text-4xl font-extrabold tracking-tighter md:text-5xl">
                        {stat.prefix && (
                          <span className="text-muted-foreground mr-1 text-2xl font-semibold">
                            {stat.prefix}
                          </span>
                        )}
                        <AnimatedCounter value={Number(stat.value) || 0} />
                        {stat.suffix && (
                          <span className="text-muted-foreground ml-1 text-2xl font-semibold">
                            {stat.suffix}
                          </span>
                        )}
                      </div>
                      <div className="text-muted-foreground text-sm font-semibold tracking-widest uppercase">
                        {stat.label}
                      </div>
                    </div>
                  </AnimatedSection>
                );
              })}
            </div>

            {/* Mobile Marquee */}
            <div className="relative flex overflow-hidden md:hidden">
              <style>{`
                 @keyframes marquee-impact {
                   0% { transform: translateX(0%); }
                   100% { transform: translateX(-50%); }
                 }
                 .animate-marquee-impact {
                   animation: marquee-impact 15s linear infinite;
                   width: max-content;
                 }
               `}</style>
              <div className="animate-marquee-impact flex gap-4 pb-4">
                {[...impactStats, ...impactStats].map((stat, idx: number) => {
                  const Icon =
                    typeof stat.icon === 'string' && stat.icon
                      ? iconMap[stat.icon] || Heart
                      : Heart;
                  return (
                    <div
                      key={idx}
                      className="bg-background border-border/40 w-48 shrink-0 rounded-2xl border p-5 text-center shadow-sm"
                    >
                      <div className="bg-accent/10 text-accent mx-auto mb-4 flex h-10 w-10 items-center justify-center rounded-xl">
                        <Icon size={20} />
                      </div>
                      <div className="text-foreground mb-2 flex items-baseline justify-center text-3xl font-extrabold tracking-tighter">
                        {stat.prefix && (
                          <span className="text-muted-foreground mr-1 text-lg font-semibold">
                            {stat.prefix}
                          </span>
                        )}
                        {stat.value}
                        {stat.suffix && (
                          <span className="text-muted-foreground ml-1 text-lg font-semibold">
                            {stat.suffix}
                          </span>
                        )}
                      </div>
                      <div className="text-muted-foreground text-xs font-semibold tracking-widest uppercase">
                        {stat.label}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </Container>
        </section>
      )}

      {/* 4. Featured Programs */}
      <section className="bg-background py-16 md:py-36">
        <Container>
          <AnimatedSection direction="up" className="mb-8 md:mb-12">
            <div className="text-center">
              <h2 className="mb-4 text-3xl font-bold tracking-tight md:mb-6 md:text-4xl lg:text-5xl">
                {homepage.programsSection?.heading || 'Our Featured Programs'}
              </h2>
              <p className="text-muted-foreground mx-auto max-w-2xl text-base md:text-xl">
                {homepage.programsSection?.description ||
                  'Discover how we are making a difference through education, mentorship, and community building.'}
              </p>
            </div>
          </AnimatedSection>

          {programs.length > 0 ? (
            <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
              {(programs as unknown as Program[]).map((program, idx: number) => {
                const coverImage = getMediaUrl(program.coverImage) || null;
                const cat = program.category || 'community';
                const catColor = categoryColors[cat] || categoryColors.community;
                const catLabel = categoryLabels[cat] || cat;

                return (
                  <AnimatedSection key={program.id || idx} direction="up" delay={idx * 0.1}>
                    <div className="group bg-card border-border/40 flex h-full flex-1 flex-col overflow-hidden rounded-2xl border shadow-sm transition-all duration-500 hover:shadow-xl md:rounded-3xl">
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
                            <BookOpen className="text-muted-foreground/30 h-10 w-10 md:h-12 md:w-12" />
                          </div>
                        )}
                        <div className="absolute top-3 right-3 z-10 md:top-4 md:right-4">
                          <span
                            className={cn(
                              'rounded-full border px-2.5 py-1 text-[10px] font-bold tracking-wider uppercase shadow-sm backdrop-blur-md md:px-3 md:py-1.5 md:text-xs',
                              catColor,
                            )}
                          >
                            {catLabel}
                          </span>
                        </div>
                      </div>

                      <div className="flex flex-1 flex-col p-5 md:p-8">
                        <h3 className="group-hover:text-primary mb-2 line-clamp-2 text-xl font-bold tracking-tight transition-colors md:mb-3 md:text-2xl">
                          {program.title}
                        </h3>
                        <p className="text-muted-foreground mb-6 line-clamp-3 flex-1 text-sm leading-relaxed md:mb-8 md:text-base">
                          {program.shortDescription}
                        </p>

                        <div className="mt-auto">
                          <Link
                            href={`/programs/${program.slug}`}
                            className={cn(
                              buttonVariants({
                                variant: 'outline',
                                className:
                                  'group-hover:bg-primary group-hover:text-primary-foreground group-hover:border-primary h-10 w-full rounded-full text-sm font-semibold transition-all duration-300 md:h-12 md:text-base',
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
            <EmptyState
              title="No programs found"
              description="We are currently updating our program list."
              icon={BookOpen}
            />
          )}
        </Container>
      </section>

      {/* 5. Success Stories */}
      {stories.length > 0 && (
        <TestimonialsSection
          title={homepage.storiesSection?.heading || 'Success Stories'}
          description={
            homepage.storiesSection?.description ||
            'Real stories from the women whose lives have been transformed by our programs.'
          }
          testimonials={stories.map((story: SuccessStory) => ({
            personName: story.personName,
            quote: story.quote,
            image:
              typeof story.image === 'object'
                ? getMediaUrl(story.image) || '/placeholder.png'
                : '/placeholder.png',
            program: typeof story.program === 'object' ? story.program?.title : undefined,
          }))}
        />
      )}

      {/* 6. Upcoming Events */}
      <section className="bg-background border-t py-16 md:py-36">
        <Container>
          <div className="mb-10 flex flex-col justify-between gap-6 md:mb-16 md:flex-row md:items-end md:gap-0">
            <AnimatedSection direction="left" className="max-w-2xl text-center md:text-left">
              <h2 className="mb-4 text-3xl font-bold tracking-tight md:mb-6 md:text-4xl lg:text-5xl">
                {homepage.eventsSection?.heading || 'Upcoming Events'}
              </h2>
              <p className="text-muted-foreground text-base leading-relaxed md:text-xl">
                {homepage.eventsSection?.description ||
                  'Join us at our upcoming events to learn, connect, and grow with our community.'}
              </p>
            </AnimatedSection>
            <AnimatedSection direction="right" delay={0.2} className="hidden md:block">
              <Link
                href="/events"
                className={buttonVariants({
                  variant: 'ghost',
                  className:
                    'text-secondary hover:text-secondary/80 hover:bg-secondary/10 h-12 rounded-full px-6',
                })}
              >
                View All Events <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </AnimatedSection>
          </div>

          {events.length > 0 ? (
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
              {(events as unknown as Event[]).map((event, idx: number) => {
                const eventDate = new Date(event.date);
                return (
                  <AnimatedSection key={idx} direction="up" delay={idx * 0.1}>
                    <Link
                      href={`/events/${event.id}`}
                      className="group bg-card border-border/40 hover:border-primary/50 relative block flex flex-row items-center gap-4 overflow-hidden rounded-2xl border p-4 shadow-sm transition-all duration-300 hover:shadow-md md:gap-6 md:rounded-3xl md:p-6 lg:flex-col lg:items-start"
                    >
                      <div className="bg-primary/5 absolute top-0 right-0 -mt-4 -mr-4 h-16 w-16 rounded-bl-full transition-transform group-hover:scale-150 md:h-24 md:w-24" />
                      <div className="bg-background relative z-10 flex h-16 w-16 min-w-[4rem] shrink-0 flex-col items-center justify-center rounded-xl border shadow-sm md:h-22 md:w-22 md:min-w-[5.5rem] md:rounded-2xl">
                        <span className="text-secondary text-[10px] font-bold tracking-wider uppercase md:text-sm">
                          {eventDate.toLocaleString('default', { month: 'short' })}
                        </span>
                        <span className="text-xl font-black md:text-3xl">
                          {eventDate.getDate()}
                        </span>
                      </div>
                      <div className="relative z-10">
                        <h3 className="group-hover:text-secondary mb-1 line-clamp-2 text-lg font-bold transition-colors md:mb-3 md:text-xl">
                          {event.title}
                        </h3>
                        <div className="text-muted-foreground flex items-center text-xs font-medium md:text-sm">
                          <Calendar className="text-secondary/70 mr-2 h-3 w-3 md:h-4 md:w-4" />{' '}
                          {event.location}
                        </div>
                      </div>
                    </Link>
                  </AnimatedSection>
                );
              })}
            </div>
          ) : (
            <EmptyState
              title="No upcoming events"
              description="Check back later for new events."
              icon={Calendar}
            />
          )}

          <Link
            href="/events"
            className={cn(
              buttonVariants({
                variant: 'outline',
                className: 'mt-8 w-full rounded-full md:hidden',
              }),
            )}
          >
            View All Events
          </Link>
        </Container>
      </section>

      {/* 7. Partner & Supporter showcase */}
      {partners.length > 0 && (
        <PartnersSection
          title={homepage.partnersSection?.heading || 'Our Partners & Supporters'}
          description={
            homepage.partnersSection?.description ||
            'We are incredibly grateful for the support of our global partners.'
          }
          partners={partners.map((partner: Partner) => ({
            name: partner.name,
            logo:
              typeof partner.logo === 'object'
                ? getMediaUrl(partner.logo) || '/placeholder.png'
                : '/placeholder.png',
            websiteUrl: partner.websiteUrl || '#',
          }))}
        />
      )}

      {/* 8. Donation CTA */}
      <CTASection
        title={homepage.donationCta?.heading || 'Make a Difference Today'}
        description={
          homepage.donationCta?.description ||
          'Your contribution helps us expand our reach and empower more women around the world.'
        }
        buttonLabel={homepage.donationCta?.buttonLabel || 'Donate Now'}
        buttonUrl={homepage.donationCta?.buttonUrl || '/donate'}
      />

      {/* 9. Newsletter Section */}
      <NewsletterSection />
    </div>
  );
}
