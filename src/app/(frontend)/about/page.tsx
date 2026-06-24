import { getAboutUs, getPayloadClient } from '@/lib/payload';
import { HeroSection } from '@/components/shared/HeroSection';
import { Container } from '@/components/shared/Container';
import { SectionHeader } from '@/components/shared/section-header';
import { AnimatedSection } from '@/components/shared/AnimatedSection';
import { AnimatedCounter } from '@/components/shared/AnimatedCounter';
import { TestimonialsSection } from '@/components/shared/TestimonialsSection';
import { PartnersSection } from '@/components/shared/PartnersSection';
import { CTASection } from '@/components/shared/CTASection';
import { Timeline } from '@/components/shared/Timeline';
import { ContentBlock } from '@/components/shared/ContentBlock';
import { AutoCarousel } from '@/components/shared/AutoCarousel';
import Image from 'next/image';
import { Target, Heart, Users, Shield, Globe, Star, Zap, Quote } from 'lucide-react';
import { constructMetadata } from '@/lib/seo';
import { RichText } from '@payloadcms/richtext-lexical/react';
import { Partner, SuccessStory, ImpactStatistic } from '@/payload-types';

// Icons mapping for Core Values
const iconMap: Record<string, React.ElementType> = {
  Target,
  Heart,
  Users,
  Shield,
  Globe,
  Star,
  Zap,
};

export async function generateMetadata() {
  const about = await getAboutUs();
  return constructMetadata({
    title: about.hero?.heading || 'About Us',
    description: about.hero?.subheading || 'Learn more about our organization.',
    path: '/about',
  });
}

export default async function AboutPage() {
  const payload = await getPayloadClient();
  const [aboutUs, impactStatsRes, partnersRes, storiesRes] = await Promise.all([
    getAboutUs(),
    payload.find({ collection: 'impact-statistics', limit: 4 }),
    payload.find({ collection: 'partners', limit: 10 }),
    payload.find({ collection: 'success-stories', limit: 3 }),
  ]);

  const impactStats = impactStatsRes.docs;
  const partners = partnersRes.docs;
  const stories = storiesRes.docs;

  return (
    <div className="flex min-h-screen flex-col">
      {/* 1. Hero Section */}
      <HeroSection
        title={aboutUs.hero?.heading || 'Our Journey to Empowerment'}
        subtitle={
          aboutUs.hero?.subheading ||
          "Discover the story, vision, and mission that drive Women's Synergy to create lasting change across the globe."
        }
        backgroundImage={
          typeof aboutUs.hero?.backgroundImage === 'object'
            ? aboutUs.hero.backgroundImage?.url || undefined
            : undefined
        }
      />

      {/* 2. Organization Overview */}
      {aboutUs.organizationOverview && (
        <section className="bg-background relative overflow-hidden py-24 md:py-36">
          <div className="bg-primary/5 absolute top-0 right-0 -mt-40 -mr-40 h-96 w-96 rounded-full blur-3xl" />
          <Container className="relative z-10">
            <ContentBlock
              heading={aboutUs.organizationOverview.heading}
              content={aboutUs.organizationOverview.content}
              image={
                typeof aboutUs.organizationOverview.image === 'object'
                  ? aboutUs.organizationOverview.image?.url
                  : undefined
              }
              imageAlignment="right"
            />
          </Container>
        </section>
      )}

      {/* 3. Vision & Mission */}
      {aboutUs.visionMission && (
        <section className="bg-card relative overflow-hidden border-y py-12 md:py-24">
          <Container className="relative z-10">
            <div className="grid grid-cols-2 gap-3 sm:gap-6 md:gap-12">
              <AnimatedSection
                direction="up"
                className="bg-background border-border/40 hover:border-primary/30 group flex h-full flex-col rounded-2xl border p-4 shadow-sm transition-all duration-300 sm:p-5 md:rounded-3xl md:p-10"
              >
                <div className="bg-primary/10 text-primary mx-auto mb-3 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl transition-transform group-hover:scale-110 md:mx-0 md:mb-6 md:h-16 md:w-16 md:rounded-2xl">
                  <Globe className="h-5 w-5 md:h-8 md:w-8" />
                </div>
                <h3 className="mb-2 text-center text-lg font-bold md:mb-4 md:text-left md:text-3xl">
                  Our Vision
                </h3>
                <p className="text-muted-foreground line-clamp-6 flex-1 text-center text-xs leading-relaxed md:line-clamp-none md:text-left md:text-lg">
                  {aboutUs.visionMission.visionStatement}
                </p>
              </AnimatedSection>
              <AnimatedSection
                direction="up"
                delay={0.2}
                className="bg-background border-border/40 hover:border-primary/30 group flex h-full flex-col rounded-2xl border p-4 shadow-sm transition-all duration-300 sm:p-5 md:rounded-3xl md:p-10"
              >
                <div className="bg-accent/10 text-accent mx-auto mb-3 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl transition-transform group-hover:scale-110 md:mx-0 md:mb-6 md:h-16 md:w-16 md:rounded-2xl">
                  <Target className="h-5 w-5 md:h-8 md:w-8" />
                </div>
                <h3 className="mb-2 text-center text-lg font-bold md:mb-4 md:text-left md:text-3xl">
                  Our Mission
                </h3>
                <p className="text-muted-foreground line-clamp-6 flex-1 text-center text-xs leading-relaxed md:line-clamp-none md:text-left md:text-lg">
                  {aboutUs.visionMission.missionStatement}
                </p>
              </AnimatedSection>
            </div>
          </Container>
        </section>
      )}

      {/* 4. Core Values */}
      {aboutUs.coreValues && aboutUs.coreValues.length > 0 && (
        <section className="bg-background overflow-hidden py-16 md:py-36">
          <Container>
            <AnimatedSection direction="up">
              <SectionHeader
                title="Our Core Values"
                description="The foundational principles that guide our decisions, programs, and community interactions."
                align="center"
              />
            </AnimatedSection>

            {/* Desktop Grid */}
            <div className="mt-12 hidden grid-cols-2 gap-8 md:grid lg:grid-cols-4">
              {aboutUs.coreValues.map(
                (
                  val: { icon?: string | null; title?: string | null; description?: string | null },
                  idx: number,
                ) => {
                  const Icon = val.icon ? iconMap[val.icon] || Star : Star;
                  return (
                    <AnimatedSection key={idx} direction="up" delay={idx * 0.1}>
                      <div className="bg-muted/30 border-border/40 hover:bg-background hover:border-primary/30 group flex h-full flex-col rounded-3xl border p-8 text-center transition-all duration-300 hover:shadow-lg">
                        <div className="bg-primary/10 text-primary mx-auto mb-6 flex h-14 w-14 shrink-0 items-center justify-center rounded-full transition-transform group-hover:scale-110">
                          <Icon size={28} />
                        </div>
                        <h4 className="mb-3 text-xl font-bold">{val.title}</h4>
                        <p className="text-muted-foreground flex-1 leading-relaxed">
                          {val.description}
                        </p>
                      </div>
                    </AnimatedSection>
                  );
                },
              )}
            </div>

            {/* Mobile Carousel */}
            <div className="mt-8 md:hidden">
              <AutoCarousel>
                {aboutUs.coreValues.map(
                  (
                    val: {
                      icon?: string | null;
                      title?: string | null;
                      description?: string | null;
                    },
                    idx: number,
                  ) => {
                    const Icon = val.icon ? iconMap[val.icon] || Star : Star;
                    return (
                      <div
                        key={idx}
                        className="bg-muted/30 border-border/40 flex h-[240px] w-[260px] shrink-0 snap-center flex-col rounded-2xl border p-5 text-center shadow-sm"
                      >
                        <div className="bg-primary/10 text-primary mx-auto mb-4 flex h-12 w-12 shrink-0 items-center justify-center rounded-full">
                          <Icon size={24} />
                        </div>
                        <h4 className="mb-2 line-clamp-1 text-lg font-bold">{val.title}</h4>
                        <div className="text-muted-foreground relative flex-1 overflow-hidden text-center text-sm">
                          <p className="line-clamp-4 leading-relaxed">{val.description}</p>
                        </div>
                      </div>
                    );
                  },
                )}
              </AutoCarousel>
            </div>
          </Container>
        </section>
      )}

      {/* Trust Builder 1: Impact Statistics */}
      {impactStats.length > 0 && (
        <section className="bg-primary text-primary-foreground relative overflow-hidden py-16 md:py-24">
          <div className="absolute inset-0 bg-[url('/noise.png')] opacity-[0.03] mix-blend-overlay" />
          <Container className="relative z-10">
            <div className="grid grid-cols-2 gap-6 md:grid-cols-4 md:gap-8">
              {(impactStats as unknown as ImpactStatistic[]).map((stat, idx: number) => {
                const Icon = stat.icon ? iconMap[stat.icon] || Heart : Heart;
                return (
                  <AnimatedSection key={idx} direction="up" delay={idx * 0.1}>
                    <div className="group text-center">
                      <div className="mx-auto mb-4 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/10 text-white transition-transform group-hover:scale-110 md:mb-6 md:h-14 md:w-14 md:rounded-2xl">
                        <Icon className="h-5 w-5 md:h-7 md:w-7" />
                      </div>
                      <div className="mb-2 flex items-baseline justify-center text-3xl font-extrabold tracking-tighter text-white md:mb-3 md:text-5xl">
                        {stat.prefix && (
                          <span className="mr-1 text-lg opacity-80 md:text-2xl">{stat.prefix}</span>
                        )}
                        <AnimatedCounter value={stat.value || 0} />
                        {stat.suffix && (
                          <span className="ml-1 text-lg opacity-80 md:text-2xl">{stat.suffix}</span>
                        )}
                      </div>
                      <div className="text-xs font-semibold tracking-widest uppercase opacity-80 md:text-sm">
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

      {/* 5. Leadership Philosophy / Founder Message */}
      {aboutUs.founderMessage && (
        <section className="bg-background relative py-16 md:py-36">
          <Container>
            <div className="bg-card border-border/40 relative mx-auto grid max-w-6xl grid-cols-1 items-stretch overflow-hidden rounded-3xl border shadow-xl md:rounded-[3rem] lg:grid-cols-5">
              <div className="relative min-h-[300px] md:min-h-[400px] lg:col-span-2">
                {typeof aboutUs.founderMessage.image === 'object' &&
                aboutUs.founderMessage.image?.url ? (
                  <Image
                    src={aboutUs.founderMessage.image.url}
                    alt={aboutUs.founderMessage.founderName}
                    fill
                    className="object-cover"
                  />
                ) : (
                  <div className="bg-muted absolute inset-0 flex items-center justify-center">
                    <span className="text-muted-foreground font-medium">Founder Portrait</span>
                  </div>
                )}
                <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black/80 via-black/20 to-transparent p-6 md:p-10">
                  <div className="text-white">
                    <h3 className="text-xl font-bold md:text-2xl">
                      {aboutUs.founderMessage.founderName}
                    </h3>
                    <p className="text-sm font-medium text-white/80 md:text-base">
                      {aboutUs.founderMessage.founderTitle}
                    </p>
                  </div>
                </div>
              </div>
              <div className="relative flex flex-col justify-center p-6 md:p-10 lg:col-span-3 lg:p-16">
                <Quote className="text-primary/5 absolute top-6 right-6 h-12 w-12 md:top-10 md:right-10 md:h-20 md:w-20" />
                <AnimatedSection direction="right">
                  <h2 className="mb-6 text-center text-2xl font-bold md:mb-8 md:text-left md:text-3xl">
                    {aboutUs.founderMessage.heading}
                  </h2>
                  {aboutUs.founderMessage.quote && (
                    <blockquote className="text-foreground/80 border-primary mb-6 border-l-4 py-2 pl-4 text-justify text-lg leading-relaxed font-medium italic md:mb-8 md:pl-6 md:text-left md:text-2xl">
                      &quot;{aboutUs.founderMessage.quote}&quot;
                    </blockquote>
                  )}
                  <div className="prose prose-base md:prose-lg dark:prose-invert text-muted-foreground leading-relaxed">
                    <RichText data={aboutUs.founderMessage.content} />
                  </div>
                </AnimatedSection>
              </div>
            </div>
          </Container>
        </section>
      )}

      {/* 6. Timeline / Milestones */}
      {aboutUs.timeline && aboutUs.timeline.length > 0 && (
        <section className="bg-muted/30 border-t py-16 md:py-36">
          <Container>
            <AnimatedSection direction="up">
              <SectionHeader
                title="Our Evolution"
                description="A look back at the key moments that defined our trajectory."
                align="center"
              />
            </AnimatedSection>

            <div className="mx-auto mt-8 max-w-4xl md:mt-16">
              <Timeline items={aboutUs.timeline} />
            </div>
          </Container>
        </section>
      )}

      {/* Trust Builder 2: Partners & Testimonials */}
      {partners.length > 0 && (
        <PartnersSection
          title="Empowered Together"
          description="We collaborate with global organizations that share our vision for a more equitable future."
          partners={(partners as unknown as Partner[]).map((partner) => ({
            name: partner.name,
            logo:
              typeof partner.logo === 'object'
                ? partner.logo?.url || '/placeholder.png'
                : '/placeholder.png',
            websiteUrl: partner.websiteUrl || undefined,
          }))}
        />
      )}

      {stories.length > 0 && (
        <TestimonialsSection
          title="Community Voices"
          description="Hear directly from the women who are leading change in their communities."
          testimonials={(stories as unknown as SuccessStory[]).map((story) => ({
            personName: story.personName,
            quote: story.quote,
            image:
              typeof story.image === 'object'
                ? story.image?.url || '/placeholder.png'
                : '/placeholder.png',
            program: typeof story.program === 'object' ? story.program?.title : undefined,
          }))}
        />
      )}

      {/* 7. Future Goals */}
      {aboutUs.futureGoals && (
        <section className="bg-background py-24">
          <Container className="max-w-4xl text-center">
            <AnimatedSection direction="up">
              <SectionHeader title={aboutUs.futureGoals.heading} align="center" />
              <div className="prose prose-base md:prose-xl dark:prose-invert text-muted-foreground mx-auto mt-6 text-justify leading-relaxed md:text-center">
                <RichText data={aboutUs.futureGoals.content} />
              </div>
            </AnimatedSection>
          </Container>
        </section>
      )}

      {/* 8. Call to Action */}
      <CTASection
        title="Be Part of Our Story"
        description="Whether you want to volunteer, donate, or partner with us, there's a place for you in our ecosystem."
        buttonLabel="Get Involved Today"
        buttonUrl="/get-involved"
      />
    </div>
  );
}
