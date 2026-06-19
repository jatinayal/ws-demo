import React from 'react';
import { getPayloadClient } from '@/lib/payload';
import { notFound } from 'next/navigation';
import { Container } from '@/components/shared/Container';
import { AnimatedSection } from '@/components/shared/AnimatedSection';
import { AnimatedCounter } from '@/components/shared/AnimatedCounter';
import { ContentBlock } from '@/components/shared/ContentBlock';
import { CTASection } from '@/components/shared/CTASection';
import { constructMetadata } from '@/lib/seo';
import Image from 'next/image';
import Link from 'next/link';
import { Target, Heart, Users, Shield, Globe, Star, Zap, CheckCircle2, ArrowLeft, BookOpen } from 'lucide-react';
import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { RichText } from '@payloadcms/richtext-lexical/react';

const iconMap: Record<string, React.ElementType> = {
  Target, Heart, Users, Shield, Globe, Star, Zap,
};

const categoryLabels: Record<string, string> = {
  education: 'Education',
  leadership: 'Leadership',
  entrepreneurship: 'Entrepreneurship',
  wellness: 'Emotional Wellness',
  community: 'Community',
};

interface ProgramPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateMetadata({ params }: ProgramPageProps) {
  const { slug } = await params;
  const payload = await getPayloadClient();
  const programs = await payload.find({
    collection: 'programs',
    where: { slug: { equals: slug } },
    limit: 1,
  });

  if (!programs.docs.length) return constructMetadata();
  const program = programs.docs[0];

  return constructMetadata({
    title: program.meta?.title || program.title,
    description: program.meta?.description || program.shortDescription,
    image: typeof program.meta?.image === 'object' ? program.meta.image?.url : undefined,
    path: `/programs/${slug}`,
  });
}

export default async function ProgramDetailPage({ params }: ProgramPageProps) {
  const { slug } = await params;
  const payload = await getPayloadClient();
  
  const programs = await payload.find({
    collection: 'programs',
    where: { slug: { equals: slug } },
    limit: 1,
  });

  if (!programs.docs.length) {
    notFound();
  }

  const program = programs.docs[0];
  const coverImage = typeof program.coverImage === 'object' ? program.coverImage?.url : null;
  const catLabel = categoryLabels[program.category as string] || program.category;

  return (
    <div className="flex flex-col min-h-screen bg-background">
      {/* 1. Program Header Hero */}
      <section className="relative pt-32 pb-24 md:pt-48 md:pb-36 overflow-hidden">
        {coverImage ? (
          <>
            <div className="absolute inset-0 bg-black/60 z-10" />
            <Image src={coverImage} alt={program.title} fill className="object-cover z-0" priority />
          </>
        ) : (
          <div className="absolute inset-0 bg-primary/10 z-0" />
        )}
        
        <Container className="relative z-20">
          <AnimatedSection direction="up" className="max-w-3xl">
            <Link href="/programs" className="inline-flex items-center text-white/80 hover:text-white mb-8 transition-colors font-medium">
              <ArrowLeft className="w-4 h-4 mr-2" /> Back to Programs
            </Link>
            <div className="mb-6">
              <span className="px-4 py-1.5 rounded-full text-sm font-bold bg-white/20 text-white backdrop-blur-md border border-white/30 uppercase tracking-wider">
                {catLabel}
              </span>
            </div>
            <h1 className="text-5xl md:text-6xl font-extrabold text-white mb-6 tracking-tight leading-tight">
              {program.title}
            </h1>
            <p className="text-xl md:text-2xl text-white/90 leading-relaxed font-medium">
              {program.shortDescription}
            </p>
          </AnimatedSection>
        </Container>
      </section>

      {/* 2. Impact Metrics */}
      {program.impactMetrics && program.impactMetrics.length > 0 && (
        <section className="py-16 md:py-20 bg-card border-b relative -mt-10 z-30 rounded-t-[3rem] shadow-[0_-20px_40px_rgba(0,0,0,0.1)]">
          <Container>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {program.impactMetrics.map((stat: any, idx: number) => {
                const Icon = stat.icon ? iconMap[stat.icon] || Heart : Heart;
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

      {/* 3. Main Content & Sidebar */}
      <section className="py-24 md:py-36">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
            
            {/* Left Content Area */}
            <div className="lg:col-span-2 space-y-20">
              <AnimatedSection direction="up">
                <h2 className="text-3xl font-bold mb-8">About the Program</h2>
                <div className="prose prose-lg md:prose-xl dark:prose-invert text-muted-foreground leading-relaxed">
                  <RichText data={program.content} />
                </div>
              </AnimatedSection>

              {program.objectives && program.objectives.length > 0 && (
                <AnimatedSection direction="up">
                  <h3 className="text-2xl font-bold mb-8 flex items-center"><Target className="text-primary mr-3" /> Core Objectives</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {program.objectives.map((obj: any, idx: number) => (
                      <div key={idx} className="flex items-start p-6 rounded-2xl bg-muted/30 border border-border/50 hover:bg-card hover:shadow-md transition-all duration-300">
                        <CheckCircle2 className="w-6 h-6 text-primary shrink-0 mr-4 mt-0.5" />
                        <p className="font-medium text-foreground/80 leading-relaxed">{obj.objective}</p>
                      </div>
                    ))}
                  </div>
                </AnimatedSection>
              )}

              {program.beneficiaryOutcomes && (
                <AnimatedSection direction="up">
                  <div className="p-10 rounded-3xl bg-accent/5 border border-accent/10">
                    <h3 className="text-2xl font-bold mb-6 text-primary flex items-center"><Star className="mr-3" /> Beneficiary Outcomes</h3>
                    <div className="prose prose-lg dark:prose-invert text-muted-foreground leading-relaxed">
                      <RichText data={program.beneficiaryOutcomes} />
                    </div>
                  </div>
                </AnimatedSection>
              )}
            </div>

            {/* Right Sidebar */}
            <div className="space-y-10">
              {program.keyActivities && program.keyActivities.length > 0 && (
                <AnimatedSection direction="left">
                  <div className="p-8 rounded-3xl bg-card border border-border/50 shadow-sm sticky top-32">
                    <h3 className="text-xl font-bold mb-6 flex items-center"><Zap className="text-secondary mr-3" /> Key Activities</h3>
                    <ul className="space-y-6">
                      {program.keyActivities.map((act: any, idx: number) => (
                        <li key={idx} className="relative pl-6 before:absolute before:left-0 before:top-2 before:w-2 before:h-2 before:bg-secondary before:rounded-full">
                          <h4 className="font-bold text-foreground mb-1">{act.activity}</h4>
                          {act.description && <p className="text-sm text-muted-foreground leading-relaxed">{act.description}</p>}
                        </li>
                      ))}
                    </ul>
                  </div>
                </AnimatedSection>
              )}

              <AnimatedSection direction="up">
                <div className="p-8 rounded-3xl bg-primary text-primary-foreground shadow-xl relative overflow-hidden text-center">
                  <div className="absolute inset-0 bg-[url('/noise.png')] opacity-[0.05] mix-blend-overlay" />
                  <div className="relative z-10">
                    <Heart className="w-12 h-12 mx-auto mb-4 text-white/80" />
                    <h3 className="text-2xl font-bold mb-4 text-white">Support this Program</h3>
                    <p className="text-white/80 mb-8 leading-relaxed">
                      Your contribution directly supports our activities and expands our reach.
                    </p>
                    <Link href={program.donationUrl || '/donate'} className={cn(buttonVariants({ variant: 'secondary', size: 'lg', className: 'w-full rounded-full h-14 font-bold bg-white text-primary hover:bg-white/90 transition-all shadow-lg hover:scale-105' }))}>
                      Donate Now
                    </Link>
                  </div>
                </div>
              </AnimatedSection>
            </div>

          </div>
        </Container>
      </section>

      {/* 4. Image Gallery */}
      {program.gallery && program.gallery.length > 0 && (
        <section className="py-24 bg-muted/30 border-y">
          <Container>
            <AnimatedSection direction="up" className="mb-12 text-center">
              <h2 className="text-3xl font-bold">Program Gallery</h2>
            </AnimatedSection>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {program.gallery.map((item: any, idx: number) => {
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

      {/* 5. Related Programs */}
      {program.relatedPrograms && program.relatedPrograms.length > 0 && (
        <section className="py-24 bg-background">
          <Container>
            <AnimatedSection direction="up" className="mb-12">
              <h2 className="text-3xl font-bold flex items-center justify-center"><BookOpen className="mr-3 text-primary" /> Related Programs</h2>
            </AnimatedSection>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {program.relatedPrograms.map((relatedProgram: any, idx: number) => {
                if (typeof relatedProgram !== 'object') return null;
                const rCoverImage = typeof relatedProgram.coverImage === 'object' ? relatedProgram.coverImage?.url : null;
                return (
                  <AnimatedSection key={relatedProgram.id} direction="up" delay={idx * 0.1}>
                    <Link href={`/programs/${relatedProgram.slug}`} className="group block h-full">
                      <div className="bg-card rounded-3xl overflow-hidden shadow-sm hover:shadow-xl border border-border/40 transition-all duration-500 h-full flex flex-col">
                        <div className="relative aspect-video overflow-hidden">
                          {rCoverImage ? (
                            <Image src={rCoverImage} alt={relatedProgram.title} fill className="object-cover transition-transform duration-700 group-hover:scale-110" />
                          ) : (
                            <div className="absolute inset-0 bg-muted flex items-center justify-center" />
                          )}
                        </div>
                        <div className="p-6">
                          <span className="text-xs font-bold text-primary uppercase tracking-wider mb-2 block">{categoryLabels[relatedProgram.category] || relatedProgram.category}</span>
                          <h4 className="text-xl font-bold group-hover:text-primary transition-colors">{relatedProgram.title}</h4>
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

      <CTASection 
        title="Join Our Mission"
        description="Empowerment starts with action. Explore how you can make an impact today."
        buttonLabel="Become a Volunteer"
        buttonUrl="/get-involved"
      />
    </div>
  );
}
