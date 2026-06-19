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
        <section className="bg-card relative overflow-hidden border-y py-24">
          <Container className="relative z-10">
            <div className="grid grid-cols-1 gap-12 md:grid-cols-2">
              <AnimatedSection
                direction="up"
                className="bg-background border-border/40 hover:border-primary/30 group rounded-3xl border p-10 shadow-sm transition-all duration-300"
              >
                <div className="bg-primary/10 text-primary mb-6 flex h-16 w-16 items-center justify-center rounded-2xl transition-transform group-hover:scale-110">
                  <Globe size={32} />
                </div>
                <h3 className="mb-4 text-3xl font-bold">Our Vision</h3>
                <p className="text-muted-foreground text-lg leading-relaxed">
                  {aboutUs.visionMission.visionStatement}
                </p>
              </AnimatedSection>
              <AnimatedSection
                direction="up"
                delay={0.2}
                className="bg-background border-border/40 hover:border-primary/30 group rounded-3xl border p-10 shadow-sm transition-all duration-300"
              >
                <div className="bg-accent/10 text-accent mb-6 flex h-16 w-16 items-center justify-center rounded-2xl transition-transform group-hover:scale-110">
                  <Target size={32} />
                </div>
                <h3 className="mb-4 text-3xl font-bold">Our Mission</h3>
                <p className="text-muted-foreground text-lg leading-relaxed">
                  {aboutUs.visionMission.missionStatement}
                </p>
              </AnimatedSection>
            </div>
          </Container>
        </section>
      )}

      {/* 4. Core Values */}
      {aboutUs.coreValues && aboutUs.coreValues.length > 0 && (
        <section className="bg-background py-24 md:py-36">
          <Container>
            <AnimatedSection direction="up">
              <SectionHeader
                title="Our Core Values"
                description="The foundational principles that guide our decisions, programs, and community interactions."
                align="center"
              />
            </AnimatedSection>
            <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
              {aboutUs.coreValues.map(
                (
                  val: { icon?: string | null; title?: string | null; description?: string | null },
                  idx: number,
                ) => {
                  const Icon = val.icon ? iconMap[val.icon] || Star : Star;
                  return (
                    <AnimatedSection key={idx} direction="up" delay={idx * 0.1}>
                      <div className="bg-muted/30 border-border/40 hover:bg-background hover:border-primary/30 group flex h-full flex-col rounded-3xl border p-8 text-center transition-all duration-300 hover:shadow-lg">
                        <div className="bg-primary/10 text-primary mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-full transition-transform group-hover:scale-110">
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
          </Container>
        </section>
      )}

      {/* Trust Builder 1: Impact Statistics */}
      {impactStats.length > 0 && (
        <section className="bg-primary text-primary-foreground relative overflow-hidden py-24">
          <div className="absolute inset-0 bg-[url('/noise.png')] opacity-[0.03] mix-blend-overlay" />
          <Container className="relative z-10">
            <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
              {(impactStats as unknown as ImpactStatistic[]).map((stat, idx: number) => {
                const Icon = stat.icon ? iconMap[stat.icon] || Heart : Heart;
                return (
                  <AnimatedSection key={idx} direction="up" delay={idx * 0.1}>
                    <div className="group text-center">
                      <div className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-white/10 text-white transition-transform group-hover:scale-110">
                        <Icon size={28} />
                      </div>
                      <div className="mb-3 flex items-baseline justify-center text-4xl font-extrabold tracking-tighter text-white md:text-5xl">
                        {stat.prefix && (
                          <span className="mr-1 text-2xl opacity-80">{stat.prefix}</span>
                        )}
                        <AnimatedCounter value={stat.value || 0} />
                        {stat.suffix && (
                          <span className="ml-1 text-2xl opacity-80">{stat.suffix}</span>
                        )}
                      </div>
                      <div className="text-sm font-semibold tracking-widest uppercase opacity-80">
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
        <section className="bg-background relative py-24 md:py-36">
          <Container>
            <div className="bg-card border-border/40 relative mx-auto grid max-w-6xl grid-cols-1 items-stretch overflow-hidden rounded-[3rem] border shadow-xl lg:grid-cols-5">
              <div className="relative min-h-[400px] lg:col-span-2">
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
                <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black/80 via-black/20 to-transparent p-10">
                  <div className="text-white">
                    <h3 className="text-2xl font-bold">{aboutUs.founderMessage.founderName}</h3>
                    <p className="font-medium text-white/80">
                      {aboutUs.founderMessage.founderTitle}
                    </p>
                  </div>
                </div>
              </div>
              <div className="relative flex flex-col justify-center p-10 md:p-16 lg:col-span-3">
                <Quote size={80} className="text-primary/5 absolute top-10 right-10" />
                <AnimatedSection direction="right">
                  <h2 className="mb-8 text-3xl font-bold">{aboutUs.founderMessage.heading}</h2>
                  {aboutUs.founderMessage.quote && (
                    <blockquote className="text-foreground/80 border-primary mb-8 border-l-4 py-2 pl-6 text-2xl leading-relaxed font-medium italic">
                      &quot;{aboutUs.founderMessage.quote}&quot;
                    </blockquote>
                  )}
                  <div className="prose prose-lg dark:prose-invert text-muted-foreground leading-relaxed">
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
        <section className="bg-muted/30 border-t py-24 md:py-36">
          <Container>
            <AnimatedSection direction="up">
              <SectionHeader
                title="Our Evolution"
                description="A look back at the key moments that defined our trajectory."
                align="center"
              />
            </AnimatedSection>

            <div className="mx-auto mt-16 max-w-4xl">
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
              <div className="prose prose-lg md:prose-xl dark:prose-invert text-muted-foreground mx-auto leading-relaxed">
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
