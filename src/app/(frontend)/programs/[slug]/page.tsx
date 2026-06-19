import React from 'react';
import { getPayloadClient } from '@/lib/payload';
import { notFound } from 'next/navigation';
import { Container } from '@/components/shared/Container';
import { AnimatedSection } from '@/components/shared/AnimatedSection';
import { AnimatedCounter } from '@/components/shared/AnimatedCounter';
import { CTASection } from '@/components/shared/CTASection';
import { Program } from '@/payload-types';
import { constructMetadata } from '@/lib/seo';
import Image from 'next/image';
import Link from 'next/link';
import {
  Target,
  Heart,
  Users,
  Shield,
  Globe,
  Star,
  Zap,
  CheckCircle2,
  ArrowLeft,
  BookOpen,
} from 'lucide-react';
import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { RichText } from '@payloadcms/richtext-lexical/react';
import type { SerializedEditorState } from 'lexical';

const iconMap: Record<string, React.ElementType> = {
  Target,
  Heart,
  Users,
  Shield,
  Globe,
  Star,
  Zap,
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

  const program = programs.docs[0] as unknown as Program;
  const coverImage = typeof program.coverImage === 'object' ? program.coverImage?.url : null;
  const catLabel = categoryLabels[program.category as string] || program.category;

  return (
    <div className="bg-background flex min-h-screen flex-col">
      {/* 1. Program Header Hero */}
      <section className="relative overflow-hidden pt-32 pb-24 md:pt-48 md:pb-36">
        {coverImage ? (
          <>
            <div className="absolute inset-0 z-10 bg-black/60" />
            <Image
              src={coverImage}
              alt={program.title}
              fill
              className="z-0 object-cover"
              priority
            />
          </>
        ) : (
          <div className="bg-primary/10 absolute inset-0 z-0" />
        )}

        <Container className="relative z-20">
          <AnimatedSection direction="up" className="max-w-3xl">
            <Link
              href="/programs"
              className="mb-8 inline-flex items-center font-medium text-white/80 transition-colors hover:text-white"
            >
              <ArrowLeft className="mr-2 h-4 w-4" /> Back to Programs
            </Link>
            <div className="mb-6">
              <span className="rounded-full border border-white/30 bg-white/20 px-4 py-1.5 text-sm font-bold tracking-wider text-white uppercase backdrop-blur-md">
                {catLabel}
              </span>
            </div>
            <h1 className="mb-6 text-5xl leading-tight font-extrabold tracking-tight text-white md:text-6xl">
              {program.title}
            </h1>
            <p className="text-xl leading-relaxed font-medium text-white/90 md:text-2xl">
              {program.shortDescription}
            </p>
          </AnimatedSection>
        </Container>
      </section>

      {/* 2. Impact Metrics */}
      {program.impactMetrics && program.impactMetrics.length > 0 && (
        <section className="bg-card relative z-30 -mt-10 rounded-t-[3rem] border-b py-16 shadow-[0_-20px_40px_rgba(0,0,0,0.1)] md:py-20">
          <Container>
            <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
              {program.impactMetrics.map((stat, idx: number) => {
                const Icon = stat.icon ? iconMap[stat.icon] || Heart : Heart;
                return (
                  <AnimatedSection key={idx} direction="up" delay={idx * 0.1}>
                    <div className="group text-center">
                      <div className="bg-accent/10 text-accent mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl transition-transform group-hover:scale-110">
                        <Icon size={24} />
                      </div>
                      <div className="text-foreground mb-2 flex items-baseline justify-center text-4xl font-extrabold tracking-tighter">
                        <AnimatedCounter value={stat.value || 0} />
                        {stat.suffix && (
                          <span className="ml-1 text-xl opacity-80">{stat.suffix}</span>
                        )}
                      </div>
                      <div className="text-muted-foreground text-xs font-bold tracking-widest uppercase">
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

      {/* 3. Main Content & Sidebar */}
      <section className="py-24 md:py-36">
        <Container>
          <div className="grid grid-cols-1 gap-16 lg:grid-cols-3">
            {/* Left Content Area */}
            <div className="space-y-20 lg:col-span-2">
              <AnimatedSection direction="up">
                <h2 className="mb-8 text-3xl font-bold">About the Program</h2>
                <div className="prose prose-lg md:prose-xl dark:prose-invert text-muted-foreground leading-relaxed">
                  {program.content && (
                    <RichText data={program.content as unknown as SerializedEditorState} />
                  )}
                </div>
              </AnimatedSection>

              {program.objectives && program.objectives.length > 0 && (
                <AnimatedSection direction="up">
                  <h3 className="mb-8 flex items-center text-2xl font-bold">
                    <Target className="text-primary mr-3" /> Core Objectives
                  </h3>
                  <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                    {program.objectives.map((obj: { objective?: string | null }, idx: number) => (
                      <div
                        key={idx}
                        className="bg-muted/30 border-border/50 hover:bg-card flex items-start rounded-2xl border p-6 transition-all duration-300 hover:shadow-md"
                      >
                        <CheckCircle2 className="text-primary mt-0.5 mr-4 h-6 w-6 shrink-0" />
                        <p className="text-foreground/80 leading-relaxed font-medium">
                          {obj.objective}
                        </p>
                      </div>
                    ))}
                  </div>
                </AnimatedSection>
              )}

              {program.beneficiaryOutcomes && (
                <AnimatedSection direction="up">
                  <div className="bg-accent/5 border-accent/10 rounded-3xl border p-10">
                    <h3 className="text-primary mb-6 flex items-center text-2xl font-bold">
                      <Star className="mr-3" /> Beneficiary Outcomes
                    </h3>
                    <div className="prose prose-lg dark:prose-invert text-muted-foreground leading-relaxed">
                      <RichText
                        data={program.beneficiaryOutcomes as unknown as SerializedEditorState}
                      />
                    </div>
                  </div>
                </AnimatedSection>
              )}
            </div>

            {/* Right Sidebar */}
            <div className="space-y-10">
              {program.keyActivities && program.keyActivities.length > 0 && (
                <AnimatedSection direction="left">
                  <div className="bg-card border-border/50 sticky top-32 rounded-3xl border p-8 shadow-sm">
                    <h3 className="mb-6 flex items-center text-xl font-bold">
                      <Zap className="text-secondary mr-3" /> Key Activities
                    </h3>
                    <ul className="space-y-6">
                      {program.keyActivities.map(
                        (
                          act: { activity?: string | null; description?: string | null },
                          idx: number,
                        ) => (
                          <li
                            key={idx}
                            className="before:bg-secondary relative pl-6 before:absolute before:top-2 before:left-0 before:h-2 before:w-2 before:rounded-full"
                          >
                            <h4 className="text-foreground mb-1 font-bold">{act.activity}</h4>
                            {act.description && (
                              <p className="text-muted-foreground text-sm leading-relaxed">
                                {act.description}
                              </p>
                            )}
                          </li>
                        ),
                      )}
                    </ul>
                  </div>
                </AnimatedSection>
              )}

              <AnimatedSection direction="up">
                <div className="bg-primary text-primary-foreground relative overflow-hidden rounded-3xl p-8 text-center shadow-xl">
                  <div className="absolute inset-0 bg-[url('/noise.png')] opacity-[0.05] mix-blend-overlay" />
                  <div className="relative z-10">
                    <Heart className="mx-auto mb-4 h-12 w-12 text-white/80" />
                    <h3 className="mb-4 text-2xl font-bold text-white">Support this Program</h3>
                    <p className="mb-8 leading-relaxed text-white/80">
                      Your contribution directly supports our activities and expands our reach.
                    </p>
                    <Link
                      href={program.donationUrl || '/donate'}
                      className={cn(
                        buttonVariants({
                          variant: 'secondary',
                          size: 'lg',
                          className:
                            'text-primary h-14 w-full rounded-full bg-white font-bold shadow-lg transition-all hover:scale-105 hover:bg-white/90',
                        }),
                      )}
                    >
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
        <section className="bg-muted/30 border-y py-24">
          <Container>
            <AnimatedSection direction="up" className="mb-12 text-center">
              <h2 className="text-3xl font-bold">Program Gallery</h2>
            </AnimatedSection>
            <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
              {program.gallery.map(
                (
                  item: {
                    image?: { url?: string; alt?: string } | null | string;
                    caption?: string | null;
                  },
                  idx: number,
                ) => {
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

      {/* 5. Related Programs */}
      {program.relatedPrograms && program.relatedPrograms.length > 0 && (
        <section className="bg-background py-24">
          <Container>
            <AnimatedSection direction="up" className="mb-12">
              <h2 className="flex items-center justify-center text-3xl font-bold">
                <BookOpen className="text-primary mr-3" /> Related Programs
              </h2>
            </AnimatedSection>
            <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
              {program.relatedPrograms.map((relatedProgram: Program | string, idx: number) => {
                if (typeof relatedProgram !== 'object') return null;
                const rCoverImage =
                  typeof relatedProgram.coverImage === 'object'
                    ? relatedProgram.coverImage?.url
                    : null;
                return (
                  <AnimatedSection key={relatedProgram.id} direction="up" delay={idx * 0.1}>
                    <Link href={`/programs/${relatedProgram.slug}`} className="group block h-full">
                      <div className="bg-card border-border/40 flex h-full flex-col overflow-hidden rounded-3xl border shadow-sm transition-all duration-500 hover:shadow-xl">
                        <div className="relative aspect-video overflow-hidden">
                          {rCoverImage ? (
                            <Image
                              src={rCoverImage}
                              alt={relatedProgram.title}
                              fill
                              className="object-cover transition-transform duration-700 group-hover:scale-110"
                            />
                          ) : (
                            <div className="bg-muted absolute inset-0 flex items-center justify-center" />
                          )}
                        </div>
                        <div className="p-6">
                          <span className="text-primary mb-2 block text-xs font-bold tracking-wider uppercase">
                            {relatedProgram.category
                              ? categoryLabels[
                                  relatedProgram.category as keyof typeof categoryLabels
                                ] || relatedProgram.category
                              : ''}
                          </span>
                          <h4 className="group-hover:text-primary text-xl font-bold transition-colors">
                            {relatedProgram.title}
                          </h4>
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
