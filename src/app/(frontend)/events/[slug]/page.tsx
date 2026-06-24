import React from 'react';
import { getPayloadClient } from '@/lib/payload';
import { notFound } from 'next/navigation';
import { Container } from '@/components/shared/Container';
import { AnimatedSection } from '@/components/shared/AnimatedSection';
import { constructMetadata } from '@/lib/seo';
import Image from 'next/image';
import Link from 'next/link';
import {
  Calendar,
  MapPin,
  Clock,
  ArrowLeft,
  Users,
  Video,
  Link as LinkIcon,
  AlertCircle,
  HelpCircle,
  BookOpen,
} from 'lucide-react';
import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { RichText } from '@payloadcms/richtext-lexical/react';
import { Event, Program } from '@/payload-types';

const categoryLabels: Record<string, string> = {
  education: 'Education',
  leadership: 'Leadership',
  entrepreneurship: 'Entrepreneurship',
  wellness: 'Emotional Wellness',
  community: 'Community',
};

// Using a server action to handle registrations
import { submitEventRegistration } from './actions';
import { getMediaUrl } from '@/lib/utils';

interface EventPageProps {
  params: Promise<{
    slug: string;
  }>;
  searchParams: Promise<{
    success?: string;
    error?: string;
  }>;
}

export async function generateMetadata({ params }: EventPageProps) {
  const { slug } = await params;
  const payload = await getPayloadClient();
  const events = await payload.find({
    collection: 'events',
    where: { slug: { equals: slug } },
    limit: 1,
  });

  if (!events.docs.length) return constructMetadata();
  const event = events.docs[0];

  return constructMetadata({
    title: event.title,
    description: event.shortDescription || `Join us for ${event.title}.`,
    image: getMediaUrl(event.coverImage) || undefined,
    path: `/events/${slug}`,
  });
}

export default async function EventDetailPage({ params, searchParams }: EventPageProps) {
  const { slug } = await params;
  const { success, error } = await searchParams;
  const payload = await getPayloadClient();

  const events = await payload.find({
    collection: 'events',
    where: { slug: { equals: slug } },
    limit: 1,
    depth: 2,
  });

  if (!events.docs.length) {
    notFound();
  }

  const event = events.docs[0];
  const coverImage = getMediaUrl(event.coverImage) || null;
  const eventDate = new Date(event.date);
  const endDate = event.endDate ? new Date(event.endDate) : null;
  const isUpcoming = event.eventStatus === 'upcoming' || eventDate > new Date();

  const isRegistrationOpen = event.registrationSettings?.registrationOpen && isUpcoming;
  const hasCapacity = event.registrationSettings?.capacity;

  return (
    <div className="bg-background flex min-h-screen flex-col">
      {/* 1. Event Hero */}
      <section className="border-border/40 relative overflow-hidden border-b pt-32 pb-24 md:pt-48 md:pb-36">
        {coverImage ? (
          <div className="absolute inset-0 z-0">
            <Image src={coverImage} alt={event.title} fill className="object-cover" priority />
            <div className="bg-background/80 absolute inset-0 backdrop-blur-md" />
            <div className="from-background via-background/90 to-background/20 absolute inset-0 bg-gradient-to-t" />
          </div>
        ) : (
          <div className="bg-primary/5 absolute inset-0 z-0" />
        )}
        <Container className="relative z-10">
          <AnimatedSection direction="up" className="max-w-4xl">
            <Link
              href="/events"
              className="text-primary mb-8 inline-flex items-center font-bold transition-colors hover:underline"
            >
              <ArrowLeft className="mr-2 h-4 w-4" /> Back to Events
            </Link>

            <div className="mb-6 flex flex-wrap gap-3">
              <span className="bg-primary/10 text-primary border-primary/20 rounded-full border px-4 py-1.5 text-sm font-bold capitalize backdrop-blur-md">
                {event.category}
              </span>
              <span className="bg-card text-foreground border-border rounded-full border px-4 py-1.5 text-sm font-bold shadow-sm backdrop-blur-md">
                {event.eventType === 'virtual'
                  ? 'Virtual'
                  : event.eventType === 'hybrid'
                    ? 'Hybrid'
                    : 'In-Person'}
              </span>
              {!isUpcoming && (
                <span className="bg-muted text-muted-foreground border-border rounded-full border px-4 py-1.5 text-sm font-bold">
                  Completed
                </span>
              )}
            </div>

            <h1 className="text-foreground mb-6 text-4xl leading-tight font-black tracking-tight md:text-5xl lg:text-6xl">
              {event.title}
            </h1>

            <p className="text-muted-foreground mb-10 max-w-3xl text-xl leading-relaxed font-medium">
              {event.shortDescription}
            </p>

            <div className="text-foreground flex flex-wrap items-center gap-6">
              <div className="bg-card/80 border-border/50 hover:border-primary/30 flex items-center rounded-2xl border px-5 py-3 shadow-sm backdrop-blur-md transition-colors">
                <Calendar className="text-primary mr-3 h-5 w-5" />
                <div>
                  <div className="text-sm font-bold">
                    {eventDate.toLocaleDateString('en-US', {
                      weekday: 'long',
                      month: 'long',
                      day: 'numeric',
                      year: 'numeric',
                    })}
                  </div>
                  {endDate && (
                    <div className="text-muted-foreground mt-0.5 text-xs">
                      Until{' '}
                      {endDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                    </div>
                  )}
                </div>
              </div>

              <div className="bg-card/80 border-border/50 hover:border-primary/30 flex items-center rounded-2xl border px-5 py-3 shadow-sm backdrop-blur-md transition-colors">
                <Clock className="text-primary mr-3 h-5 w-5" />
                <div className="text-sm font-bold">
                  {eventDate.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
                </div>
              </div>

              <div className="bg-card/80 border-border/50 hover:border-primary/30 flex items-center rounded-2xl border px-5 py-3 shadow-sm backdrop-blur-md transition-colors">
                {event.eventType === 'virtual' ? (
                  <Video className="text-primary mr-3 h-5 w-5" />
                ) : (
                  <MapPin className="text-primary mr-3 h-5 w-5" />
                )}
                <div className="max-w-[200px] truncate text-sm font-bold">{event.location}</div>
              </div>
            </div>
          </AnimatedSection>
        </Container>
      </section>

      {/* 2. Main Layout */}
      <section className="relative z-20 py-16 md:py-24">
        <Container>
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
            {/* Left Content Area */}
            <div className="space-y-16 lg:col-span-8">
              {/* Description */}
              <AnimatedSection direction="up">
                <h2 className="mb-6 text-3xl font-bold">About This Event</h2>
                <div className="prose prose-lg dark:prose-invert text-muted-foreground max-w-none">
                  <RichText data={event.description} />
                </div>
              </AnimatedSection>

              {/* Schedule */}
              {event.schedule && event.schedule.length > 0 && (
                <AnimatedSection direction="up">
                  <h2 className="mb-8 text-3xl font-bold">Event Schedule</h2>
                  <div className="before:via-border relative space-y-6 before:absolute before:inset-0 before:ml-5 before:h-full before:w-0.5 before:-translate-x-px before:bg-gradient-to-b before:from-transparent before:to-transparent md:before:mx-auto md:before:translate-x-0">
                    {event.schedule.map(
                      (
                        item: {
                          time?: string | null;
                          title?: string | null;
                          description?: string | null;
                        },
                        idx: number,
                      ) => (
                        <div
                          key={idx}
                          className="group is-active relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse"
                        >
                          <div className="border-background bg-primary flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-4 text-sm font-bold text-white shadow md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2">
                            {idx + 1}
                          </div>
                          <div className="bg-card border-border/50 w-[calc(100%-4rem)] rounded-2xl border p-6 shadow-sm transition-shadow hover:shadow-md md:w-[calc(50%-2.5rem)]">
                            <div className="text-primary mb-2 text-sm font-bold">{item.time}</div>
                            <h4 className="mb-2 text-lg font-bold">{item.title}</h4>
                            {item.description && (
                              <p className="text-muted-foreground text-sm">{item.description}</p>
                            )}
                          </div>
                        </div>
                      ),
                    )}
                  </div>
                </AnimatedSection>
              )}

              {/* Speakers */}
              {event.speakers && event.speakers.length > 0 && (
                <AnimatedSection direction="up">
                  <h2 className="mb-8 text-3xl font-bold">Speakers & Facilitators</h2>
                  <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                    {event.speakers.map(
                      (
                        speaker: {
                          image?: { url?: string; alt?: string } | null | string;
                          name?: string | null;
                          role?: string | null;
                          bio?: string | null;
                        },
                        idx: number,
                      ) => {
                        const speakerImg = getMediaUrl(speaker.image) || null;
                        return (
                          <div
                            key={idx}
                            className="bg-card border-border flex flex-col items-center gap-6 rounded-2xl border p-6 text-center shadow-sm md:flex-row md:items-start md:text-left"
                          >
                            <div className="ring-primary/10 relative h-24 w-24 shrink-0 overflow-hidden rounded-full ring-4">
                              {speakerImg ? (
                                <Image
                                  src={speakerImg}
                                  alt={speaker.name || 'Speaker'}
                                  fill
                                  className="object-cover"
                                />
                              ) : (
                                <div className="bg-muted flex h-full w-full items-center justify-center">
                                  <Users className="text-muted-foreground/50 h-8 w-8" />
                                </div>
                              )}
                            </div>
                            <div>
                              <h4 className="mb-1 text-xl font-bold">{speaker.name}</h4>
                              <p className="text-primary mb-3 text-sm font-semibold">
                                {speaker.role}
                              </p>
                              {speaker.bio && (
                                <p className="text-muted-foreground line-clamp-3 text-sm">
                                  {speaker.bio}
                                </p>
                              )}
                            </div>
                          </div>
                        );
                      },
                    )}
                  </div>
                </AnimatedSection>
              )}

              {/* FAQs */}
              {event.faqs && event.faqs.length > 0 && (
                <AnimatedSection direction="up">
                  <h2 className="mb-8 text-3xl font-bold">Frequently Asked Questions</h2>
                  <div className="space-y-4">
                    {event.faqs.map(
                      (faq: { question?: string | null; answer?: string | null }, idx: number) => (
                        <div
                          key={idx}
                          className="bg-card border-border rounded-2xl border p-6 shadow-sm"
                        >
                          <div className="flex items-start">
                            <HelpCircle className="text-primary mt-0.5 mr-4 h-6 w-6 shrink-0" />
                            <div>
                              <h4 className="mb-2 text-lg font-bold">{faq.question}</h4>
                              <p className="text-muted-foreground">{faq.answer}</p>
                            </div>
                          </div>
                        </div>
                      ),
                    )}
                  </div>
                </AnimatedSection>
              )}
            </div>

            {/* Right Sidebar - Registration & Details */}
            <div className="lg:col-span-4">
              <AnimatedSection direction="up" className="sticky top-32 space-y-8">
                {/* Registration Card */}
                <div className="bg-card border-border/50 rounded-3xl border p-8 shadow-xl">
                  <h3 className="mb-2 text-2xl font-bold">Registration</h3>

                  {isRegistrationOpen ? (
                    <div>
                      {hasCapacity && (
                        <p className="text-muted-foreground mb-6 flex items-center text-sm">
                          <Users className="mr-2 h-4 w-4" /> Limited capacity: {hasCapacity} spots
                          available
                        </p>
                      )}

                      {event.registrationSettings?.registrationLink ? (
                        <Link
                          href={event.registrationSettings.registrationLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={cn(
                            buttonVariants({
                              variant: 'default',
                              size: 'lg',
                              className: 'w-full rounded-full font-bold',
                            }),
                          )}
                        >
                          Register Externally <LinkIcon className="ml-2 h-4 w-4" />
                        </Link>
                      ) : success ? (
                        <div className="mt-6 rounded-2xl border border-green-200 bg-green-50 p-6 text-center dark:border-green-900 dark:bg-green-950/30">
                          <AlertCircle className="mx-auto mb-3 h-8 w-8 text-green-600 dark:text-green-500" />
                          <p className="font-semibold text-green-800 dark:text-green-300">
                            Registration Successful!
                          </p>
                          <p className="mt-1 text-sm text-green-700/80 dark:text-green-400/80">
                            Thank you for registering. We will send you an email with further
                            details shortly.
                          </p>
                        </div>
                      ) : (
                        <form action={submitEventRegistration} className="mt-6 space-y-4">
                          {error && (
                            <div className="bg-destructive/10 text-destructive border-destructive/20 mb-4 flex items-start rounded-xl border p-4 text-sm font-medium">
                              <AlertCircle className="mr-2 h-5 w-5 shrink-0" />
                              <span>
                                {error === 'missing_fields'
                                  ? 'Please fill in all required fields.'
                                  : error === 'invalid_event'
                                    ? 'Invalid event selected.'
                                    : 'An error occurred during registration. Please try again later.'}
                              </span>
                            </div>
                          )}
                          <input type="hidden" name="eventId" value={event.id} />
                          <div>
                            <label htmlFor="name" className="mb-1 block text-sm font-medium">
                              Full Name
                            </label>
                            <input
                              type="text"
                              id="name"
                              name="name"
                              required
                              className="bg-background border-border focus:ring-primary w-full rounded-xl border px-4 py-2.5 focus:ring-2 focus:outline-none"
                              placeholder="Jane Doe"
                            />
                          </div>
                          <div>
                            <label htmlFor="email" className="mb-1 block text-sm font-medium">
                              Email Address
                            </label>
                            <input
                              type="email"
                              id="email"
                              name="email"
                              required
                              className="bg-background border-border focus:ring-primary w-full rounded-xl border px-4 py-2.5 focus:ring-2 focus:outline-none"
                              placeholder="jane@example.com"
                            />
                          </div>
                          <div>
                            <label htmlFor="phone" className="mb-1 block text-sm font-medium">
                              Phone Number (Optional)
                            </label>
                            <input
                              type="tel"
                              id="phone"
                              name="phone"
                              className="bg-background border-border focus:ring-primary w-full rounded-xl border px-4 py-2.5 focus:ring-2 focus:outline-none"
                              placeholder="+1 234 567 8900"
                            />
                          </div>
                          <button
                            type="submit"
                            className={cn(
                              buttonVariants({
                                variant: 'default',
                                size: 'lg',
                                className: 'mt-2 w-full rounded-full font-bold',
                              }),
                            )}
                          >
                            Submit Registration
                          </button>
                        </form>
                      )}
                    </div>
                  ) : (
                    <div className="bg-muted border-border rounded-2xl border p-6 text-center">
                      <AlertCircle className="text-muted-foreground mx-auto mb-3 h-8 w-8" />
                      <p className="text-foreground font-semibold">Registration Closed</p>
                      <p className="text-muted-foreground mt-1 text-sm">
                        {!isUpcoming
                          ? 'This event has already concluded.'
                          : 'Registration is not currently open.'}
                      </p>
                    </div>
                  )}
                </div>

                {/* Location Details */}
                <div className="bg-card border-border/50 rounded-3xl border p-8 shadow-sm">
                  <h3 className="mb-4 text-lg font-bold">Location Details</h3>
                  <div className="space-y-4">
                    <div className="flex">
                      <MapPin className="text-primary mt-0.5 mr-3 h-5 w-5 shrink-0" />
                      <div>
                        <p className="font-medium">{event.location}</p>
                        <p className="text-muted-foreground mt-1 text-sm">
                          {event.eventType === 'virtual'
                            ? 'This is a fully virtual event.'
                            : event.eventType === 'hybrid'
                              ? 'Physical and virtual attendance supported.'
                              : 'Physical attendance only.'}
                        </p>
                      </div>
                    </div>
                    {event.virtualLink && (isUpcoming || event.eventStatus === 'ongoing') && (
                      <div className="border-border flex border-t pt-4">
                        <Video className="text-primary mt-0.5 mr-3 h-5 w-5 shrink-0" />
                        <div>
                          <p className="font-medium">Virtual Link</p>
                          <p className="text-muted-foreground mt-1 text-sm">
                            Provided to registered attendees via email prior to the event.
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </AnimatedSection>
            </div>
          </div>
        </Container>
      </section>

      {/* 3. Event Gallery (If Past/Completed Event) */}
      {event.gallery && event.gallery.length > 0 && (
        <section className="bg-muted/30 border-t py-24">
          <Container>
            <AnimatedSection direction="up" className="mb-12 text-center">
              <h2 className="text-3xl font-bold">Event Highlights</h2>
            </AnimatedSection>
            <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
              {event.gallery.map(
                (
                  item: {
                    image?: { url?: string; alt?: string } | null | string;
                    caption?: string | null;
                  },
                  idx: number,
                ) => {
                  if (typeof item.image !== 'object' || !getMediaUrl(item.image)) return null;
                  return (
                    <AnimatedSection key={idx} direction="up" delay={idx * 0.1}>
                      <div className="group relative aspect-square overflow-hidden rounded-2xl shadow-sm">
                        <Image
                          src={getMediaUrl(item.image)}
                          alt="Event Gallery"
                          fill
                          className="object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                      </div>
                    </AnimatedSection>
                  );
                },
              )}
            </div>
          </Container>
        </section>
      )}

      {/* 4. Related Events */}
      {event.relatedEvents && event.relatedEvents.length > 0 && (
        <section className="bg-background border-t py-12 md:py-24">
          <Container>
            <AnimatedSection direction="up" className="mb-8 md:mb-12">
              <h2 className="flex items-center justify-center text-2xl font-bold md:text-3xl">
                <Calendar className="text-primary mr-2 h-5 w-5 md:mr-3 md:h-8 md:w-8" /> Related
                Events
              </h2>
            </AnimatedSection>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {event.relatedEvents.map((relatedEvent: Event | string, idx: number) => {
                if (typeof relatedEvent !== 'object') return null;
                const rCoverImage = getMediaUrl(relatedEvent.coverImage) || null;
                const rDate = new Date(relatedEvent.date);

                return (
                  <AnimatedSection key={relatedEvent.id} direction="up" delay={idx * 0.1}>
                    <Link href={`/events/${relatedEvent.slug}`} className="group block h-full">
                      <div className="bg-card border-border/40 flex h-full flex-col overflow-hidden rounded-2xl border shadow-sm transition-all duration-500 hover:shadow-xl">
                        <div className="relative aspect-video overflow-hidden">
                          {rCoverImage ? (
                            <Image
                              src={rCoverImage}
                              alt={relatedEvent.title}
                              fill
                              className="object-cover transition-transform duration-700 group-hover:scale-110"
                            />
                          ) : (
                            <div className="bg-muted absolute inset-0 flex items-center justify-center" />
                          )}
                        </div>
                        <div className="flex flex-1 flex-col p-5 sm:p-6">
                          <div className="text-muted-foreground mb-3 flex flex-wrap items-center gap-4 text-xs font-medium">
                            <span className="flex items-center">
                              <Calendar className="text-primary mr-1.5 h-3.5 w-3.5" />
                              {rDate.toLocaleDateString('en-US', {
                                month: 'short',
                                day: 'numeric',
                                year: 'numeric',
                              })}
                            </span>
                            <span className="flex items-center">
                              <MapPin className="text-primary mr-1.5 h-3.5 w-3.5" />
                              {relatedEvent.location}
                            </span>
                          </div>
                          <h4 className="group-hover:text-primary mb-3 line-clamp-2 text-lg font-bold transition-colors">
                            {relatedEvent.title}
                          </h4>
                          {relatedEvent.shortDescription && (
                            <p className="text-muted-foreground mb-4 line-clamp-2 text-sm leading-relaxed">
                              {relatedEvent.shortDescription}
                            </p>
                          )}
                          <div className="border-border/40 mt-auto flex items-center justify-between border-t pt-4">
                            <span className="text-primary flex items-center text-sm font-bold transition-transform group-hover:translate-x-1">
                              View Event <ArrowLeft className="ml-1 h-3.5 w-3.5 rotate-180" />
                            </span>
                          </div>
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

      {/* 5. Related Programs */}
      {event.relatedPrograms && event.relatedPrograms.length > 0 && (
        <section className="bg-muted/10 py-12 md:py-24">
          <Container>
            <AnimatedSection direction="up" className="mb-8 md:mb-12">
              <h2 className="flex items-center justify-center text-2xl font-bold md:text-3xl">
                <BookOpen className="text-primary mr-2 h-5 w-5 md:mr-3 md:h-8 md:w-8" /> Related
                Programs
              </h2>
            </AnimatedSection>
            <div className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 md:gap-8">
              {event.relatedPrograms.map((relatedProgram: Program | string, idx: number) => {
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
    </div>
  );
}
