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
import { getMediaUrl } from '@/lib/utils';

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
    image: getMediaUrl(program.meta?.image) || undefined,
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
    depth: 2,
  });

  if (!programs.docs.length) {
    notFound();
  }

  const program = programs.docs[0] as unknown as Program;
  const coverImage = getMediaUrl(program.coverImage) || null;
  const catLabel = categoryLabels[program.category as string] || program.category;

  return (
    <div className="bg-background flex min-h-screen flex-col">
      {/* 1. Program Header Hero */}
      <section className="relative overflow-hidden pt-28 pb-16 md:pt-48 md:pb-36">
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
              className="mb-4 inline-flex items-center text-sm font-medium text-white/80 transition-colors hover:text-white md:mb-8 md:text-base"
            >
              <ArrowLeft className="mr-2 h-4 w-4" /> Back to Programs
            </Link>
            <div className="mb-4 md:mb-6">
              <span className="rounded-full border border-white/30 bg-white/20 px-3 py-1 text-xs font-bold tracking-wider text-white uppercase backdrop-blur-md md:px-4 md:py-1.5 md:text-sm">
                {catLabel}
              </span>
            </div>
            <h1 className="mb-4 text-3xl leading-tight font-extrabold tracking-tight text-white sm:text-4xl md:mb-6 md:text-6xl md:leading-tight">
              {program.title}
            </h1>
            <p className="text-base leading-relaxed font-medium text-white/90 md:text-2xl md:leading-relaxed">
              {program.shortDescription}
            </p>
          </AnimatedSection>
        </Container>
      </section>

      {/* 2. Impact Metrics */}
      {program.impactMetrics && program.impactMetrics.length > 0 && (
        <section className="bg-card relative z-30 -mt-6 rounded-t-[2rem] border-b py-10 shadow-[0_-10px_20px_rgba(0,0,0,0.05)] md:-mt-10 md:rounded-t-[3rem] md:py-20 md:shadow-[0_-20px_40px_rgba(0,0,0,0.1)]">
          <Container>
            <div className="grid grid-cols-2 gap-4 sm:gap-6 md:grid-cols-4 md:gap-8">
              {program.impactMetrics.map((stat, idx: number) => {
                const Icon = stat.icon ? iconMap[stat.icon] || Heart : Heart;
                return (
                  <AnimatedSection key={idx} direction="up" delay={idx * 0.1}>
                    <div className="group text-center">
                      <div className="bg-accent/10 text-accent mx-auto mb-2 flex h-10 w-10 items-center justify-center rounded-lg transition-transform group-hover:scale-110 md:mb-4 md:h-12 md:w-12 md:rounded-xl">
                        <Icon className="h-5 w-5 md:h-6 md:w-6" />
                      </div>
                      <div className="text-foreground mb-1 flex items-baseline justify-center text-2xl font-extrabold tracking-tighter md:mb-2 md:text-4xl">
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

      {/* 3. Main Content & Sidebar */}
      <section className="py-12 md:py-36">
        <Container>
          <div className="grid grid-cols-1 gap-10 md:gap-16 lg:grid-cols-3">
            {/* Left Content Area */}
            <div className="space-y-12 md:space-y-20 lg:col-span-2">
              <AnimatedSection direction="up">
                <h2 className="mb-4 text-2xl font-bold md:mb-8 md:text-3xl">About the Program</h2>
                <div className="prose prose-base md:prose-xl dark:prose-invert text-muted-foreground text-justify leading-relaxed md:text-left">
                  {program.content && (
                    <RichText data={program.content as unknown as SerializedEditorState} />
                  )}
                </div>
              </AnimatedSection>

              {program.objectives && program.objectives.length > 0 && (
                <AnimatedSection direction="up">
                  <h3 className="mb-4 flex items-center text-xl font-bold md:mb-8 md:text-2xl">
                    <Target className="text-primary mr-2 h-5 w-5 md:mr-3 md:h-6 md:w-6" /> Core
                    Objectives
                  </h3>
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6">
                    {program.objectives.map((obj: { objective?: string | null }, idx: number) => (
                      <div
                        key={idx}
                        className="bg-muted/30 border-border/50 hover:bg-card flex items-start rounded-2xl border p-4 transition-all duration-300 hover:shadow-md md:p-6"
                      >
                        <CheckCircle2 className="text-primary mt-0.5 mr-3 h-5 w-5 shrink-0 md:mr-4 md:h-6 md:w-6" />
                        <p className="text-foreground/80 text-sm leading-relaxed font-medium md:text-base">
                          {obj.objective}
                        </p>
                      </div>
                    ))}
                  </div>
                </AnimatedSection>
              )}

              {program.beneficiaryOutcomes && (
                <AnimatedSection direction="up">
                  <div className="bg-accent/5 border-accent/10 rounded-2xl border p-6 md:rounded-3xl md:p-10">
                    <h3 className="text-primary mb-4 flex items-center text-xl font-bold md:mb-6 md:text-2xl">
                      <Star className="mr-2 h-5 w-5 md:mr-3 md:h-6 md:w-6" /> Beneficiary Outcomes
                    </h3>
                    <div className="prose prose-base md:prose-lg dark:prose-invert text-muted-foreground text-justify leading-relaxed md:text-left">
                      <RichText
                        data={program.beneficiaryOutcomes as unknown as SerializedEditorState}
                      />
                    </div>
                  </div>
                </AnimatedSection>
              )}
            </div>

            {/* Right Sidebar */}
            <div className="space-y-8 md:space-y-10">
              {program.keyActivities && program.keyActivities.length > 0 && (
                <AnimatedSection direction="left">
                  <div className="bg-card border-border/50 sticky top-24 rounded-2xl border p-6 shadow-sm md:top-32 md:rounded-3xl md:p-8">
                    <h3 className="mb-4 flex items-center text-lg font-bold md:mb-6 md:text-xl">
                      <Zap className="text-secondary mr-2 h-5 w-5 md:mr-3 md:h-6 md:w-6" /> Key
                      Activities
                    </h3>
                    <ul className="space-y-4 md:space-y-6">
                      {program.keyActivities.map(
                        (
                          act: { activity?: string | null; description?: string | null },
                          idx: number,
                        ) => (
                          <li
                            key={idx}
                            className="before:bg-secondary relative pl-5 before:absolute before:top-2 before:left-0 before:h-1.5 before:w-1.5 before:rounded-full md:pl-6 md:before:h-2 md:before:w-2"
                          >
                            <h4 className="text-foreground mb-1 text-sm font-bold md:text-base">
                              {act.activity}
                            </h4>
                            {act.description && (
                              <p className="text-muted-foreground text-justify text-xs leading-relaxed md:text-left md:text-sm">
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
                <div className="bg-primary text-primary-foreground relative overflow-hidden rounded-2xl p-6 text-center shadow-xl md:rounded-3xl md:p-8">
                  <div className="absolute inset-0 bg-[url('/noise.png')] opacity-[0.05] mix-blend-overlay" />
                  <div className="relative z-10">
                    <Heart className="mx-auto mb-3 h-10 w-10 text-white/80 md:mb-4 md:h-12 md:w-12" />
                    <h3 className="mb-3 text-xl font-bold text-white md:mb-4 md:text-2xl">
                      Support this Program
                    </h3>
                    <p className="mb-6 text-sm leading-relaxed text-white/80 md:mb-8 md:text-base">
                      Your contribution directly supports our activities and expands our reach.
                    </p>
                    <Link
                      href={program.donationUrl || '/donate'}
                      className={cn(
                        buttonVariants({
                          variant: 'secondary',
                          size: 'lg',
                          className:
                            'text-primary h-12 w-full rounded-full bg-white font-bold shadow-lg transition-all hover:scale-105 hover:bg-white/90 md:h-14',
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
        <section className="bg-muted/30 border-y py-12 md:py-24">
          <Container>
            <AnimatedSection direction="up" className="mb-8 text-center md:mb-12">
              <h2 className="text-2xl font-bold md:text-3xl">Program Gallery</h2>
            </AnimatedSection>
            <div className="grid grid-cols-2 gap-2 sm:gap-4 lg:grid-cols-4">
              {program.gallery.map(
                (
                  item: {
                    image?: { url?: string; alt?: string } | null | string;
                    caption?: string | null;
                  },
                  idx: number,
                ) => {
                  if (
                    typeof item.image !== 'object' ||
                    item.image === null ||
                    !getMediaUrl(item.image)
                  )
                    return null;
                  return (
                    <AnimatedSection key={idx} direction="up" delay={idx * 0.1}>
                      <div className="group relative aspect-square overflow-hidden rounded-2xl shadow-sm">
                        <Image
                          src={getMediaUrl(item.image)}
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
        <section className="bg-background py-12 md:py-24">
          <Container>
            <AnimatedSection direction="up" className="mb-8 md:mb-12">
              <h2 className="flex items-center justify-center text-2xl font-bold md:text-3xl">
                <BookOpen className="text-primary mr-2 h-5 w-5 md:mr-3 md:h-8 md:w-8" /> Related
                Programs
              </h2>
            </AnimatedSection>
            <div className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 md:gap-8">
              {program.relatedPrograms.map((relatedProgram: Program | string, idx: number) => {
                if (typeof relatedProgram !== 'object') return null;
                const rCoverImage = getMediaUrl(relatedProgram.coverImage) || null;
                return (
                  <AnimatedSection key={relatedProgram.id} direction="up" delay={idx * 0.1}>
                    <Link href={`/programs/${relatedProgram.slug}`} className="group block h-full">
                      <div className="bg-card border-border/40 flex h-full flex-col overflow-hidden rounded-2xl border shadow-sm transition-all duration-500 hover:shadow-xl md:rounded-3xl">
                        <div className="relative aspect-[4/3] overflow-hidden md:aspect-video">
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
                        <div className="p-3 sm:p-4 md:p-6">
                          <span className="text-primary mb-1 block text-[9px] font-bold tracking-wider uppercase sm:text-[10px] md:mb-2 md:text-xs">
                            {relatedProgram.category
                              ? categoryLabels[
                                  relatedProgram.category as keyof typeof categoryLabels
                                ] || relatedProgram.category
                              : ''}
                          </span>
                          <h4 className="group-hover:text-primary line-clamp-2 text-sm leading-snug font-bold transition-colors sm:text-base md:line-clamp-none md:text-xl">
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
