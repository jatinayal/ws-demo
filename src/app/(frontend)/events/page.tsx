import React from 'react';
import { getPayloadClient } from '@/lib/payload';
import { Container } from '@/components/shared/Container';
import { HeroSection } from '@/components/shared/HeroSection';
import { AnimatedSection } from '@/components/shared/AnimatedSection';
import { EmptyState } from '@/components/shared/EmptyState';
import { CTASection } from '@/components/shared/CTASection';
import { constructMetadata } from '@/lib/seo';
import Image from 'next/image';
import Link from 'next/link';
import { Calendar, MapPin, Video, ArrowRight, Clock, CalendarDays } from 'lucide-react';
import { Event as PayloadEvent } from '@/payload-types';

export const metadata = constructMetadata({
  title: 'Events & Workshops',
  description: 'Join our upcoming events, workshops, and community programs.',
  path: '/events',
});

// Using a simplified filtering approach for server-side initial render
// In a full production app, you might use URL search params to filter on the server
export default async function EventsPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>;
}) {
  const params = await searchParams;
  const categoryFilter = params.category;

  const payload = await getPayloadClient();

  const eventsRes = await payload.find({
    collection: 'events',
    limit: 100,
    sort: 'date',
    ...(categoryFilter ? { where: { category: { equals: categoryFilter } } } : {}),
  });

  const events = eventsRes.docs;

  const categories = [
    { label: 'All Events', value: '' },
    { label: 'Workshops', value: 'workshop' },
    { label: 'Conferences', value: 'conference' },
    { label: 'Community Programs', value: 'community' },
    { label: 'Webinars', value: 'webinar' },
  ];

  return (
    <div className="bg-background flex min-h-screen flex-col">
      <HeroSection
        title="Events & Workshops"
        subtitle="Connect, learn, and grow with our community. Discover upcoming workshops, conferences, and empowerment programs."
      />

      {/* Filter Bar */}
      <section className="bg-card relative z-20 border-b py-8">
        <Container>
          <div className="flex flex-wrap items-center justify-center gap-4">
            {categories.map((cat) => (
              <Link
                key={cat.value}
                href={cat.value ? `/events?category=${cat.value}` : '/events'}
                className={`rounded-full px-6 py-2 text-sm font-semibold transition-all ${
                  categoryFilter === cat.value || (!categoryFilter && cat.value === '')
                    ? 'bg-primary text-primary-foreground shadow-md'
                    : 'bg-muted text-muted-foreground hover:bg-muted/80 hover:text-foreground'
                }`}
              >
                {cat.label}
              </Link>
            ))}
          </div>
        </Container>
      </section>

      <section className="py-24 md:py-36">
        <Container>
          {events.length > 0 ? (
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
              {(events as unknown as PayloadEvent[]).map((event, idx: number) => {
                const coverImage =
                  typeof event.coverImage === 'object' ? event.coverImage?.url : null;
                const eventDate = new Date(event.date);
                const isUpcoming = event.eventStatus === 'upcoming' || eventDate > new Date();

                return (
                  <AnimatedSection key={event.id} direction="up" delay={idx * 0.1}>
                    <div className="group bg-card border-border/40 relative flex h-full flex-col overflow-hidden rounded-3xl border shadow-sm transition-all duration-300 hover:shadow-xl">
                      <div className="absolute top-4 right-4 z-10 flex flex-col gap-2">
                        {isUpcoming ? (
                          <span className="bg-primary rounded-full px-3 py-1 text-xs font-bold text-white shadow-sm">
                            Upcoming
                          </span>
                        ) : (
                          <span className="bg-muted text-muted-foreground rounded-full px-3 py-1 text-xs font-bold shadow-sm">
                            Completed
                          </span>
                        )}
                        <span className="bg-background/90 text-foreground border-border/50 rounded-full border px-3 py-1 text-xs font-bold capitalize shadow-sm backdrop-blur-sm">
                          {event.category}
                        </span>
                      </div>

                      <div className="bg-muted relative aspect-[4/3] w-full overflow-hidden">
                        {coverImage && (
                          <Image
                            src={coverImage}
                            alt={event.title}
                            fill
                            className="object-cover transition-transform duration-700 group-hover:scale-105"
                          />
                        )}
                        <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/80 via-black/40 to-transparent p-6 pt-20">
                          <h3 className="line-clamp-2 text-xl font-bold text-white md:text-2xl">
                            {event.title}
                          </h3>
                        </div>
                      </div>

                      <div className="flex flex-1 flex-col p-6">
                        <div className="mb-6 flex-1 space-y-3">
                          <div className="text-muted-foreground flex items-center text-sm font-medium">
                            <Calendar className="text-primary mr-3 h-4 w-4" />
                            {eventDate.toLocaleDateString('en-US', {
                              weekday: 'short',
                              month: 'short',
                              day: 'numeric',
                              year: 'numeric',
                            })}
                            <Clock className="text-primary mr-1 ml-3 h-4 w-4" />
                            {eventDate.toLocaleTimeString('en-US', {
                              hour: '2-digit',
                              minute: '2-digit',
                            })}
                          </div>

                          <div className="text-muted-foreground flex items-center text-sm font-medium">
                            {event.eventType === 'virtual' ? (
                              <Video className="text-primary mr-3 h-4 w-4 shrink-0" />
                            ) : (
                              <MapPin className="text-primary mr-3 h-4 w-4 shrink-0" />
                            )}
                            <span className="line-clamp-1">{event.location}</span>
                          </div>
                        </div>

                        <p className="text-muted-foreground mb-6 line-clamp-3 text-sm">
                          {event.shortDescription}
                        </p>

                        <div className="border-border mt-auto flex items-center justify-between border-t pt-4">
                          <div className="text-sm font-semibold">
                            {event.eventType === 'virtual'
                              ? 'Virtual Event'
                              : event.eventType === 'hybrid'
                                ? 'Hybrid Event'
                                : 'In-Person Event'}
                          </div>
                          <Link
                            href={`/events/${event.slug}`}
                            className="text-primary hover:text-primary/80 group/link inline-flex items-center text-sm font-bold transition-colors"
                          >
                            Details{' '}
                            <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover/link:translate-x-1" />
                          </Link>
                        </div>
                      </div>
                    </div>
                  </AnimatedSection>
                );
              })}
            </div>
          ) : (
            <AnimatedSection direction="up">
              <EmptyState
                icon={CalendarDays}
                title="No Events Found"
                description="We don't have any events matching this category right now. Check back later or explore other categories."
              />
            </AnimatedSection>
          )}
        </Container>
      </section>

      <CTASection
        title="Never Miss an Event"
        description="Subscribe to our newsletter to receive the latest updates on upcoming workshops, programs, and opportunities."
        buttonLabel="Subscribe"
        buttonUrl="#newsletter"
      />
    </div>
  );
}
