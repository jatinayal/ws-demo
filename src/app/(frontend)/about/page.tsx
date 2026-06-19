import { getAboutUs, getPayloadClient, getSiteSettings } from '@/lib/payload';
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
import { Target, Heart, Users, Shield, Globe, Star, Zap, ArrowRight, Quote } from 'lucide-react';
import { constructMetadata } from '@/lib/seo';
import { RichText } from '@payloadcms/richtext-lexical/react';

// Icons mapping for Core Values
const iconMap: Record<string, React.ElementType> = {
  Target, Heart, Users, Shield, Globe, Star, Zap,
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
    <div className="flex flex-col min-h-screen">
      {/* 1. Hero Section */}
      <HeroSection 
        title={aboutUs.hero?.heading || "Our Journey to Empowerment"}
        subtitle={aboutUs.hero?.subheading || "Discover the story, vision, and mission that drive Women's Synergy to create lasting change across the globe."}
        backgroundImage={typeof aboutUs.hero?.backgroundImage === 'object' ? aboutUs.hero.backgroundImage?.url || undefined : undefined}
      />

      {/* 2. Organization Overview */}
      {aboutUs.organizationOverview && (
        <section className="py-24 md:py-36 bg-background relative overflow-hidden">
          <div className="absolute top-0 right-0 -mr-40 -mt-40 w-96 h-96 rounded-full bg-primary/5 blur-3xl" />
          <Container className="relative z-10">
            <ContentBlock 
              heading={aboutUs.organizationOverview.heading}
              content={aboutUs.organizationOverview.content}
              image={typeof aboutUs.organizationOverview.image === 'object' ? aboutUs.organizationOverview.image?.url : undefined}
              imageAlignment="right"
            />
          </Container>
        </section>
      )}

      {/* 3. Vision & Mission */}
      {aboutUs.visionMission && (
        <section className="py-24 bg-card border-y relative overflow-hidden">
          <Container className="relative z-10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <AnimatedSection direction="up" className="bg-background p-10 rounded-3xl shadow-sm border border-border/40 hover:border-primary/30 transition-all duration-300 group">
                <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center text-primary mb-6 group-hover:scale-110 transition-transform">
                  <Globe size={32} />
                </div>
                <h3 className="text-3xl font-bold mb-4">Our Vision</h3>
                <p className="text-lg text-muted-foreground leading-relaxed">{aboutUs.visionMission.visionStatement}</p>
              </AnimatedSection>
              <AnimatedSection direction="up" delay={0.2} className="bg-background p-10 rounded-3xl shadow-sm border border-border/40 hover:border-primary/30 transition-all duration-300 group">
                <div className="w-16 h-16 bg-accent/10 rounded-2xl flex items-center justify-center text-accent mb-6 group-hover:scale-110 transition-transform">
                  <Target size={32} />
                </div>
                <h3 className="text-3xl font-bold mb-4">Our Mission</h3>
                <p className="text-lg text-muted-foreground leading-relaxed">{aboutUs.visionMission.missionStatement}</p>
              </AnimatedSection>
            </div>
          </Container>
        </section>
      )}

      {/* 4. Core Values */}
      {aboutUs.coreValues && aboutUs.coreValues.length > 0 && (
        <section className="py-24 md:py-36 bg-background">
          <Container>
            <AnimatedSection direction="up">
              <SectionHeader title="Our Core Values" description="The foundational principles that guide our decisions, programs, and community interactions." align="center" />
            </AnimatedSection>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-12">
              {aboutUs.coreValues.map((val: any, idx: number) => {
                const Icon = val.icon ? iconMap[val.icon] || Star : Star;
                return (
                  <AnimatedSection key={idx} direction="up" delay={idx * 0.1}>
                    <div className="p-8 rounded-3xl bg-muted/30 border border-border/40 hover:bg-background hover:shadow-lg hover:border-primary/30 transition-all duration-300 h-full flex flex-col group text-center">
                      <div className="w-14 h-14 bg-primary/10 rounded-full flex items-center justify-center text-primary mx-auto mb-6 group-hover:scale-110 transition-transform">
                        <Icon size={28} />
                      </div>
                      <h4 className="text-xl font-bold mb-3">{val.title}</h4>
                      <p className="text-muted-foreground leading-relaxed flex-1">{val.description}</p>
                    </div>
                  </AnimatedSection>
                );
              })}
            </div>
          </Container>
        </section>
      )}

      {/* Trust Builder 1: Impact Statistics */}
      {impactStats.length > 0 && (
        <section className="py-24 bg-primary text-primary-foreground relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('/noise.png')] opacity-[0.03] mix-blend-overlay" />
          <Container className="relative z-10">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {impactStats.map((stat, idx) => {
                const Icon = stat.icon ? iconMap[stat.icon] || Heart : Heart;
                return (
                  <AnimatedSection key={idx} direction="up" delay={idx * 0.1}>
                    <div className="text-center group">
                      <div className="mx-auto w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center text-white mb-6 group-hover:scale-110 transition-transform">
                        <Icon size={28} />
                      </div>
                      <div className="text-4xl md:text-5xl font-extrabold text-white mb-3 flex justify-center items-baseline tracking-tighter">
                        {stat.prefix && <span className="text-2xl mr-1 opacity-80">{stat.prefix}</span>}
                        <AnimatedCounter value={stat.value} />
                        {stat.suffix && <span className="text-2xl ml-1 opacity-80">{stat.suffix}</span>}
                      </div>
                      <div className="text-sm font-semibold opacity-80 uppercase tracking-widest">{stat.label}</div>
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
        <section className="py-24 md:py-36 bg-background relative">
          <Container>
            <div className="max-w-6xl mx-auto bg-card rounded-[3rem] overflow-hidden shadow-xl border border-border/40 grid grid-cols-1 lg:grid-cols-5 items-stretch relative">
              <div className="lg:col-span-2 relative min-h-[400px]">
                {typeof aboutUs.founderMessage.image === 'object' && aboutUs.founderMessage.image?.url ? (
                  <Image src={aboutUs.founderMessage.image.url} alt={aboutUs.founderMessage.founderName} fill className="object-cover" />
                ) : (
                  <div className="absolute inset-0 bg-muted flex items-center justify-center">
                    <span className="text-muted-foreground font-medium">Founder Portrait</span>
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-10">
                  <div className="text-white">
                    <h3 className="text-2xl font-bold">{aboutUs.founderMessage.founderName}</h3>
                    <p className="text-white/80 font-medium">{aboutUs.founderMessage.founderTitle}</p>
                  </div>
                </div>
              </div>
              <div className="lg:col-span-3 p-10 md:p-16 flex flex-col justify-center relative">
                <Quote size={80} className="absolute top-10 right-10 text-primary/5" />
                <AnimatedSection direction="right">
                  <h2 className="text-3xl font-bold mb-8">{aboutUs.founderMessage.heading}</h2>
                  {aboutUs.founderMessage.quote && (
                    <blockquote className="text-2xl italic font-medium text-foreground/80 mb-8 border-l-4 border-primary pl-6 py-2 leading-relaxed">
                      "{aboutUs.founderMessage.quote}"
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
        <section className="py-24 md:py-36 bg-muted/30 border-t">
          <Container>
            <AnimatedSection direction="up">
              <SectionHeader title="Our Evolution" description="A look back at the key moments that defined our trajectory." align="center" />
            </AnimatedSection>
            
            <div className="max-w-4xl mx-auto mt-16">
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
          partners={partners.map((partner: any) => ({
            name: partner.name,
            logo: typeof partner.logo === 'object' ? partner.logo?.url || '/placeholder.png' : '/placeholder.png',
            websiteUrl: partner.websiteUrl,
          }))}
        />
      )}

      {stories.length > 0 && (
        <TestimonialsSection 
          title="Community Voices"
          description="Hear directly from the women who are leading change in their communities."
          testimonials={stories.map((story: any) => ({
            personName: story.personName,
            quote: story.quote,
            image: typeof story.image === 'object' ? story.image?.url || '/placeholder.png' : '/placeholder.png',
            program: typeof story.program === 'object' ? story.program?.title : undefined,
          }))}
        />
      )}

      {/* 7. Future Goals */}
      {aboutUs.futureGoals && (
        <section className="py-24 bg-background">
          <Container className="max-w-4xl text-center">
            <AnimatedSection direction="up">
              <SectionHeader title={aboutUs.futureGoals.heading} align="center" />
              <div className="prose prose-lg md:prose-xl dark:prose-invert text-muted-foreground leading-relaxed mx-auto">
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
