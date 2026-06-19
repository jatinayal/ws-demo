import { getHomepage, getPayloadClient } from '@/lib/payload';
import { RichText } from '@payloadcms/richtext-lexical/react';
import { HeroSection } from '@/components/shared/HeroSection';
import { Container } from '@/components/shared/Container';
import { SectionHeader } from '@/components/shared/section-header';
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
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';

// Icons mapping for Impact Statistics
const iconMap: Record<string, React.ElementType> = {
  Users,
  Heart,
  BookOpen,
  Calendar,
};

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

export default async function Home() {
  const payload = await getPayloadClient();
  const homepage = await getHomepage();

  const [impactStatsRes, partnersRes, eventsRes, storiesRes, programsRes] = await Promise.all([
    payload.find({
      collection: 'impact-statistics',
      limit: 4,
      select: { icon: true, value: true, prefix: true, suffix: true, label: true }
    }),
    payload.find({
      collection: 'partners',
      limit: 10,
      select: { name: true, logo: true, websiteUrl: true }
    }),
    payload.find({
      collection: 'events',
      where: { eventStatus: { equals: 'upcoming' } },
      limit: 3,
      sort: 'date',
      select: { id: true, date: true, title: true, location: true, eventStatus: true }
    }),
    payload.find({
      collection: 'success-stories',
      limit: 3,
      select: { personName: true, quote: true, image: true, program: true }
    }),
    payload.find({
      collection: 'programs',
      limit: 3,
      select: { title: true, coverImage: true, shortDescription: true, slug: true, category: true }
    }),
  ]);

  const impactStats = impactStatsRes.docs;
  const partners = partnersRes.docs;
  const events = eventsRes.docs;

  const stories = homepage.storiesSection?.featuredStories && homepage.storiesSection.featuredStories.length > 0
    ? homepage.storiesSection.featuredStories.map(s => typeof s === 'object' ? s : null).filter(Boolean)
    : storiesRes.docs;

  const programs = homepage.programsSection?.featuredPrograms && homepage.programsSection.featuredPrograms.length > 0
    ? homepage.programsSection.featuredPrograms.map(p => typeof p === 'object' ? p : null).filter(Boolean)
    : programsRes.docs;

  return (
    <div className="flex flex-col min-h-screen">
      {/* 1. Hero Section */}
      <HeroSection
        title={homepage.hero?.heading || "Where Every Woman Leads"}
        subtitle={homepage.hero?.subheading || "Empowering women worldwide to achieve their full potential through education, resources, and community."}
        backgroundImage={typeof homepage.hero?.backgroundImage === 'object' ? homepage.hero.backgroundImage?.url || undefined : undefined}
        primaryCta={homepage.hero?.callsToAction?.[0] ? { label: homepage.hero.callsToAction[0].label || 'Donate Now', url: homepage.hero.callsToAction[0].url || '/donate' } : undefined}
        secondaryCta={homepage.hero?.callsToAction?.[1] ? { label: homepage.hero.callsToAction[1].label || 'Get Involved', url: homepage.hero.callsToAction[1].url || '/get-involved' } : undefined}
      />

      {/* 2. About Preview */}
      {homepage.aboutSection && (
        <section className="py-24 md:py-36 bg-background relative overflow-hidden">
          <div className="absolute top-0 right-0 -mr-40 -mt-40 w-96 h-96 rounded-full bg-primary/5 blur-3xl" />
          <div className="absolute bottom-0 left-0 -ml-40 -mb-40 w-96 h-96 rounded-full bg-accent/5 blur-3xl" />

          <Container className="relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <AnimatedSection direction="right">
                <h2 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight">{homepage.aboutSection.heading}</h2>
                <div className="prose prose-lg dark:prose-invert text-muted-foreground mb-10">
                  {homepage.aboutSection.content ? (
                    <RichText data={homepage.aboutSection.content} />
                  ) : (
                    <p className="leading-relaxed">Women's Synergy is a global non-profit organization dedicated to closing the gender gap and providing equal opportunities for women. We believe that when women are empowered, entire communities thrive.</p>
                  )}
                </div>
                {homepage.aboutSection.ctaLabel && homepage.aboutSection.ctaUrl && (
                  <Link href={homepage.aboutSection.ctaUrl} className={buttonVariants({ size: 'lg', className: 'rounded-full px-8' })}>
                    {homepage.aboutSection.ctaLabel} <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                )}
              </AnimatedSection>
              <AnimatedSection direction="left" delay={0.2}>
                <div className="relative aspect-[4/3] rounded-3xl overflow-hidden">
                  {typeof homepage.aboutSection.image === 'object' && homepage.aboutSection.image?.url ? (
                    <Image src={homepage.aboutSection.image.url} alt="About Us" fill className="object-contain transition-transform duration-700 " />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center text-muted-foreground bg-accent/10">Image Placeholder</div>
                  )}
                </div>
              </AnimatedSection>
            </div>
          </Container>
        </section>
      )}

      {/* 3. Impact Statistics */}
      {impactStats.length > 0 && (
        <section className="py-24 bg-card border-y relative overflow-hidden">
          <Container className="relative z-10">
            <AnimatedSection direction="up">
              <SectionHeader
                title={homepage.impactSection?.heading || "Our Global Impact"}
                description={homepage.impactSection?.description || "Numbers that represent lives changed and futures empowered."}
                align="center"
              />
            </AnimatedSection>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {impactStats.map((stat, idx) => {
                const Icon = stat.icon ? iconMap[stat.icon] || Heart : Heart;
                return (
                  <AnimatedSection key={idx} direction="up" delay={idx * 0.1}>
                    <div className="group text-center p-8 bg-background rounded-3xl shadow-sm border border-border/40 hover:border-accent/30 hover:shadow-md transition-all duration-300">
                      <div className="mx-auto w-14 h-14 bg-accent/10 rounded-2xl flex items-center justify-center text-accent mb-6 transition-transform group-hover:scale-110">
                        <Icon size={28} />
                      </div>
                      <div className="text-4xl md:text-5xl font-extrabold text-foreground mb-3 flex justify-center items-baseline tracking-tighter">
                        {stat.prefix && <span className="text-2xl mr-1 text-muted-foreground font-semibold">{stat.prefix}</span>}
                        <AnimatedCounter value={stat.value} />
                        {stat.suffix && <span className="text-2xl ml-1 text-muted-foreground font-semibold">{stat.suffix}</span>}
                      </div>
                      <div className="text-sm font-semibold text-muted-foreground uppercase tracking-widest">{stat.label}</div>
                    </div>
                  </AnimatedSection>
                );
              })}
            </div>
          </Container>
        </section>
      )}

      {/* 4. Featured Programs */}
      <section className="py-24 md:py-36 bg-background">
        <Container>
          <AnimatedSection direction="up">
            <SectionHeader
              title={homepage.programsSection?.heading || "Our Featured Programs"}
              description={homepage.programsSection?.description || "Discover how we are making a difference through education, mentorship, and community building."}
              align="center"
            />
          </AnimatedSection>

          {programs.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {programs.map((program: any, idx: number) => {
                const coverImage = typeof program.coverImage === 'object' ? program.coverImage?.url : null;
                const catColor = categoryColors[program.category] || categoryColors.community;
                const catLabel = categoryLabels[program.category] || program.category;

                return (
                  <AnimatedSection key={program.id || idx} direction="up" delay={idx * 0.1}>
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
            <EmptyState title="No programs found" description="We are currently updating our program list." icon={BookOpen} />
          )}
        </Container>
      </section>

      {/* 5. Success Stories */}
      {stories.length > 0 && (
        <TestimonialsSection
          title={homepage.storiesSection?.heading || "Success Stories"}
          description={homepage.storiesSection?.description || "Real stories from the women whose lives have been transformed by our programs."}
          testimonials={stories.map((story: any) => ({
            personName: story.personName,
            quote: story.quote,
            image: typeof story.image === 'object' ? story.image?.url || '/placeholder.png' : '/placeholder.png',
            program: typeof story.program === 'object' ? story.program?.title : undefined,
          }))}
        />
      )}

      {/* 6. Upcoming Events */}
      <section className="py-24 md:py-36 bg-background border-t">
        <Container>
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16">
            <AnimatedSection direction="left" className="max-w-2xl">
              <h2 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight">{homepage.eventsSection?.heading || "Upcoming Events"}</h2>
              <p className="text-xl text-muted-foreground leading-relaxed">{homepage.eventsSection?.description || "Join us at our upcoming events to learn, connect, and grow with our community."}</p>
            </AnimatedSection>
            <AnimatedSection direction="right" delay={0.2} className="hidden md:block">
              <Link href="/events" className={buttonVariants({ variant: 'ghost', className: 'text-secondary hover:text-secondary/80 hover:bg-secondary/10 rounded-full px-6' })}>
                View All Events <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </AnimatedSection>
          </div>

          {events.length > 0 ? (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {events.map((event: any, idx) => {
                const eventDate = new Date(event.date);
                return (
                  <AnimatedSection key={idx} direction="up" delay={idx * 0.1}>
                    <Link href={`/events/${event.id}`} className="group block bg-card rounded-3xl border border-border/40 hover:border-primary/50 shadow-sm hover:shadow-md transition-all duration-300 p-6 flex flex-row lg:flex-col gap-6 items-center lg:items-start relative overflow-hidden">
                      <div className="absolute top-0 right-0 w-24 h-24 bg-primary/5 rounded-bl-full -mr-4 -mt-4 transition-transform group-hover:scale-150" />
                      <div className="flex flex-col items-center justify-center bg-background rounded-2xl min-w-[5.5rem] w-22 h-22 border shadow-sm shrink-0 relative z-10">
                        <span className="text-sm font-bold text-secondary uppercase tracking-wider">{eventDate.toLocaleString('default', { month: 'short' })}</span>
                        <span className="text-3xl font-black">{eventDate.getDate()}</span>
                      </div>
                      <div className="relative z-10">
                        <h3 className="font-bold text-xl mb-3 group-hover:text-secondary transition-colors line-clamp-2">{event.title}</h3>
                        <div className="text-sm font-medium text-muted-foreground flex items-center">
                          <Calendar className="mr-2 h-4 w-4 text-secondary/70" /> {event.location}
                        </div>
                      </div>
                    </Link>
                  </AnimatedSection>
                );
              })}
            </div>
          ) : (
            <EmptyState title="No upcoming events" description="Check back later for new events." icon={Calendar} />
          )}

          <Link href="/events" className={cn(buttonVariants({ variant: 'outline', className: 'w-full mt-8 md:hidden rounded-full' }))}>
            View All Events
          </Link>
        </Container>
      </section>

      {/* 7. Partner & Supporter showcase */}
      {partners.length > 0 && (
        <PartnersSection
          title={homepage.partnersSection?.heading || "Our Partners & Supporters"}
          description={homepage.partnersSection?.description || "We are incredibly grateful for the support of our global partners."}
          partners={partners.map((partner: any) => ({
            name: partner.name,
            logo: typeof partner.logo === 'object' ? partner.logo?.url || '/placeholder.png' : '/placeholder.png',
            websiteUrl: partner.websiteUrl,
          }))}
        />
      )}

      {/* 8. Donation CTA */}
      <CTASection
        title={homepage.donationCta?.heading || "Make a Difference Today"}
        description={homepage.donationCta?.description || "Your contribution helps us expand our reach and empower more women around the world."}
        buttonLabel={homepage.donationCta?.buttonLabel || "Donate Now"}
        buttonUrl={homepage.donationCta?.buttonUrl || "/donate"}
      />

      {/* 9. Newsletter Section */}
      <NewsletterSection />
    </div>
  );
}
