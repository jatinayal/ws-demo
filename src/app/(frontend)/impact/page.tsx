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
import { Globe, Users, Target, Star, Heart, Zap, Shield, TrendingUp, Download, ArrowRight, Activity } from 'lucide-react';
import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { RichText } from '@payloadcms/richtext-lexical/react';

const iconMap: Record<string, React.ElementType> = {
  Target, Heart, Users, Shield, Globe, Star, Zap, TrendingUp
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

  const heroCover = typeof impactData.hero?.coverImage === 'object' ? impactData.hero.coverImage?.url : null;
  const mapImage = typeof impactData.geographicReach?.mapImage === 'object' ? impactData.geographicReach.mapImage?.url : null;
  const reportUrl = typeof impactData.annualReport?.reportFile === 'object' ? impactData.annualReport.reportFile?.url : null;

  return (
    <div className="flex flex-col min-h-screen">
      {/* 1. Hero Section */}
      <section className="relative pt-32 pb-24 md:pt-48 md:pb-36 overflow-hidden bg-primary text-primary-foreground">
        <div className="absolute inset-0 bg-[url('/noise.png')] opacity-[0.05] mix-blend-overlay z-0" />
        {heroCover && (
          <div className="absolute inset-0 z-0 opacity-20">
            <Image src={heroCover} alt="Impact Hero" fill className="object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/80 to-transparent" />
          </div>
        )}
        <Container className="relative z-10 text-center">
          <AnimatedSection direction="up" className="max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-7xl font-extrabold mb-6 tracking-tight">{impactData.hero?.heading || 'Our Global Impact'}</h1>
            <p className="text-xl md:text-2xl text-white/90 leading-relaxed font-medium">{impactData.hero?.subheading}</p>
          </AnimatedSection>
        </Container>
      </section>

      {/* 2. Global Statistics Bar */}
      {globalStats && globalStats.length > 0 && (
        <section className="py-12 md:py-16 bg-card border-b relative -mt-10 z-30 rounded-t-[3rem] shadow-[0_-20px_40px_rgba(0,0,0,0.1)]">
          <Container>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {globalStats.map((stat: any, idx: number) => {
                const Icon = stat.icon ? iconMap[stat.icon] || TrendingUp : TrendingUp;
                return (
                  <AnimatedSection key={idx} direction="up" delay={idx * 0.1}>
                    <div className="text-center group">
                      <div className="mx-auto w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center text-accent mb-4 group-hover:scale-110 transition-transform">
                        <Icon size={24} />
                      </div>
                      <div className="text-4xl font-extrabold text-foreground mb-2 flex justify-center items-baseline tracking-tighter">
                        {stat.prefix && <span className="text-xl mr-1 opacity-80">{stat.prefix}</span>}
                        <AnimatedCounter value={stat.value} />
                        {stat.suffix && <span className="text-xl ml-1 opacity-80">{stat.suffix}</span>}
                      </div>
                      <div className="text-xs font-bold text-muted-foreground uppercase tracking-widest">{stat.label}</div>
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
        <section className="py-24 md:py-36 bg-muted/30">
          <Container>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <AnimatedSection direction="right">
                <SectionHeader title={impactData.geographicReach.heading} description={impactData.geographicReach.description} />
                
                {impactData.geographicReach.regions && impactData.geographicReach.regions.length > 0 && (
                  <div className="mt-10 space-y-6">
                    {impactData.geographicReach.regions.map((region: any, idx: number) => (
                      <div key={idx} className="flex items-center justify-between p-6 bg-card border border-border/50 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
                        <div className="flex items-center">
                          <Globe className="w-6 h-6 text-accent mr-4" />
                          <span className="font-bold text-lg">{region.regionName}</span>
                        </div>
                        <div className="text-right">
                          <div className="text-2xl font-black text-accent">
                            <AnimatedCounter value={region.beneficiariesCount} />+
                          </div>
                          <div className="text-xs text-muted-foreground font-semibold uppercase tracking-wider">Beneficiaries</div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </AnimatedSection>
              
              <AnimatedSection direction="left" delay={0.2}>
                <div className="relative aspect-square lg:aspect-[4/3] rounded-3xl overflow-hidden shadow-xl bg-card border border-border/50 flex items-center justify-center p-8">
                  {mapImage ? (
                    <Image src={mapImage} alt="Global Map" fill className="object-contain p-8" />
                  ) : (
                    <div className="text-center text-muted-foreground">
                      <Globe className="w-32 h-32 mx-auto mb-4 opacity-20" />
                      <p>Global presence mapped across regions.</p>
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
        <section className="py-24 md:py-36 bg-background relative">
          <div className="absolute top-1/2 left-0 -mt-40 -ml-40 w-96 h-96 rounded-full bg-accent/5 blur-3xl pointer-events-none" />
          <Container className="relative z-10">
            <AnimatedSection direction="up" className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight">{impactData.communityTransformation.heading}</h2>
              {impactData.communityTransformation.content && (
                <div className="prose prose-lg dark:prose-invert text-muted-foreground leading-relaxed mx-auto">
                  <RichText data={impactData.communityTransformation.content} />
                </div>
              )}
            </AnimatedSection>
            
            {impactData.communityTransformation.metrics && impactData.communityTransformation.metrics.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {impactData.communityTransformation.metrics.map((metric: any, idx: number) => {
                  const Icon = metric.icon ? iconMap[metric.icon] || Activity : Activity;
                  return (
                    <AnimatedSection key={idx} direction="up" delay={idx * 0.1}>
                      <div className="p-8 rounded-3xl bg-card border border-border/40 shadow-sm hover:shadow-xl hover:border-accent/30 transition-all duration-300 text-center group h-full">
                        <div className="w-16 h-16 bg-accent/10 rounded-2xl flex items-center justify-center text-accent mx-auto mb-6 group-hover:scale-110 group-hover:bg-accent group-hover:text-white transition-all duration-300">
                          <Icon size={32} />
                        </div>
                        <div className="text-5xl font-black mb-2 tracking-tighter group-hover:text-accent transition-colors">
                          <AnimatedCounter value={metric.value} />
                          {metric.suffix && <span>{metric.suffix}</span>}
                        </div>
                        <p className="text-muted-foreground font-semibold text-lg">{metric.label}</p>
                      </div>
                    </AnimatedSection>
                  );
                })}
              </div>
            )}
          </Container>
        </section>
      )}

      {/* 5. Featured Success Stories */}
      {impactData.featuredSuccessStories?.stories && impactData.featuredSuccessStories.stories.length > 0 && (
        <section className="py-24 md:py-36 bg-muted/50 border-t">
          <Container>
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
              <AnimatedSection direction="left">
                <SectionHeader title={impactData.featuredSuccessStories.heading || 'Voices of Impact'} align="left" />
              </AnimatedSection>
              <AnimatedSection direction="right">
                <Link href="/success-stories" className="inline-flex items-center text-primary font-bold hover:underline mb-4">
                  View All Stories <ArrowRight className="ml-2 w-4 h-4" />
                </Link>
              </AnimatedSection>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {impactData.featuredSuccessStories.stories.map((story: any, idx: number) => {
                if (typeof story !== 'object') return null;
                const coverImage = typeof story.image === 'object' ? story.image?.url : null;
                return (
                  <AnimatedSection key={story.id} direction="up" delay={idx * 0.1}>
                    <div className="group bg-card rounded-3xl overflow-hidden shadow-sm hover:shadow-xl border border-border/40 transition-all duration-500 h-full flex flex-col md:flex-row">
                      <div className="relative w-full md:w-2/5 aspect-video md:aspect-auto overflow-hidden">
                        {coverImage ? (
                          <Image src={coverImage} alt={story.personName} fill className="object-cover transition-transform duration-700 group-hover:scale-105" />
                        ) : (
                          <div className="absolute inset-0 bg-muted flex items-center justify-center" />
                        )}
                      </div>
                      <div className="p-8 flex-1 flex flex-col justify-center">
                        <div className="mb-4">
                          <QuoteIcon className="w-8 h-8 text-primary/20 mb-2" />
                          <p className="text-lg font-medium italic text-foreground/80 line-clamp-3 leading-relaxed">&quot;{story.quote}&quot;</p>
                        </div>
                        <div>
                          <h4 className="text-xl font-bold">{story.personName}</h4>
                          {story.beneficiaryDetails?.occupation && (
                            <p className="text-sm font-semibold text-primary">{story.beneficiaryDetails.occupation}</p>
                          )}
                        </div>
                        <div className="mt-6">
                          <Link href={`/success-stories/${story.slug}`} className="text-sm font-bold flex items-center text-foreground hover:text-primary transition-colors">
                            Read Full Story <ArrowRight className="w-4 h-4 ml-1" />
                          </Link>
                        </div>
                      </div>
                    </div>
                  </AnimatedSection>
                );
              })}
            </div>
          </Container>
        </section>
      )}

      {/* 6. Annual Report */}
      {impactData.annualReport && (
        <section className="py-24 bg-background">
          <Container>
            <AnimatedSection direction="up">
              <div className="bg-primary text-primary-foreground rounded-3xl p-10 md:p-16 flex flex-col md:flex-row items-center justify-between shadow-2xl relative overflow-hidden">
                <div className="absolute inset-0 bg-[url('/noise.png')] opacity-[0.05] mix-blend-overlay" />
                <div className="absolute right-0 top-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -mr-20 -mt-20" />
                
                <div className="relative z-10 md:w-2/3 mb-8 md:mb-0">
                  <h2 className="text-3xl md:text-4xl font-bold mb-4">{impactData.annualReport.heading}</h2>
                  <p className="text-white/80 text-lg leading-relaxed">{impactData.annualReport.description}</p>
                </div>
                
                <div className="relative z-10">
                  <Link 
                    href={reportUrl || '#'} 
                    target={reportUrl ? "_blank" : undefined}
                    className={cn(buttonVariants({ variant: 'secondary', size: 'lg', className: 'rounded-full h-14 px-8 font-bold text-primary bg-white hover:bg-white/90 shadow-lg hover:scale-105 transition-all flex items-center' }))}
                  >
                    <Download className="w-5 h-5 mr-3" /> {impactData.annualReport.downloadLabel || 'Download Report'}
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
