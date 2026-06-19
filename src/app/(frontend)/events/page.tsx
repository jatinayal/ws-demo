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

export const metadata = constructMetadata({
  title: 'Events & Workshops',
  description: 'Join our upcoming events, workshops, and community programs.',
  path: '/events',
});

// Using a simplified filtering approach for server-side initial render
// In a full production app, you might use URL search params to filter on the server
export default async function EventsPage({ searchParams }: { searchParams: Promise<{ category?: string }> }) {
  const params = await searchParams;
  const categoryFilter = params.category;
  
  const payload = await getPayloadClient();
  
  const whereClause: any = {};
  
  if (categoryFilter) {
    whereClause.category = { equals: categoryFilter };
  }

  const eventsRes = await payload.find({
    collection: 'events',
    limit: 100,
    sort: 'date',
    where: whereClause
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
    <div className="flex flex-col min-h-screen bg-background">
      <HeroSection 
        title="Events & Workshops"
        subtitle="Connect, learn, and grow with our community. Discover upcoming workshops, conferences, and empowerment programs."
      />

      {/* Filter Bar */}
      <section className="py-8 bg-card border-b relative z-20">
        <Container>
          <div className="flex flex-wrap items-center justify-center gap-4">
            {categories.map((cat) => (
              <Link 
                key={cat.value} 
                href={cat.value ? `/events?category=${cat.value}` : '/events'}
                className={`px-6 py-2 rounded-full text-sm font-semibold transition-all ${
                  (categoryFilter === cat.value) || (!categoryFilter && cat.value === '') 
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
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {events.map((event: any, idx: number) => {
                const coverImage = typeof event.coverImage === 'object' ? event.coverImage?.url : null;
                const eventDate = new Date(event.date);
                const isUpcoming = event.eventStatus === 'upcoming' || eventDate > new Date();

                return (
                  <AnimatedSection key={event.id} direction="up" delay={idx * 0.1}>
                    <div className="group bg-card rounded-3xl overflow-hidden shadow-sm hover:shadow-xl border border-border/40 transition-all duration-300 h-full flex flex-col relative">
                      
                      <div className="absolute top-4 right-4 z-10 flex flex-col gap-2">
                        {isUpcoming ? (
                          <span className="bg-primary text-white text-xs font-bold px-3 py-1 rounded-full shadow-sm">Upcoming</span>
                        ) : (
                          <span className="bg-muted text-muted-foreground text-xs font-bold px-3 py-1 rounded-full shadow-sm">Completed</span>
                        )}
                        <span className="bg-background/90 backdrop-blur-sm text-foreground text-xs font-bold px-3 py-1 rounded-full shadow-sm capitalize border border-border/50">
                          {event.category}
                        </span>
                      </div>

                      <div className="relative w-full aspect-[4/3] overflow-hidden bg-muted">
                        {coverImage && (
                          <Image src={coverImage} alt={event.title} fill className="object-cover transition-transform duration-700 group-hover:scale-105" />
                        )}
                        <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/80 via-black/40 to-transparent p-6 pt-20">
                          <h3 className="text-xl md:text-2xl font-bold text-white line-clamp-2">{event.title}</h3>
                        </div>
                      </div>

                      <div className="p-6 flex flex-col flex-1">
                        <div className="space-y-3 mb-6 flex-1">
                          <div className="flex items-center text-sm font-medium text-muted-foreground">
                            <Calendar className="w-4 h-4 mr-3 text-primary" />
                            {eventDate.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' })}
                            <Clock className="w-4 h-4 ml-3 mr-1 text-primary" />
                            {eventDate.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
                          </div>
                          
                          <div className="flex items-center text-sm font-medium text-muted-foreground">
                            {event.eventType === 'virtual' ? (
                              <Video className="w-4 h-4 mr-3 text-primary shrink-0" />
                            ) : (
                              <MapPin className="w-4 h-4 mr-3 text-primary shrink-0" />
                            )}
                            <span className="line-clamp-1">{event.location}</span>
                          </div>
                        </div>

                        <p className="text-muted-foreground text-sm line-clamp-3 mb-6">
                          {event.shortDescription}
                        </p>
                        
                        <div className="mt-auto pt-4 border-t border-border flex items-center justify-between">
                          <div className="text-sm font-semibold">
                            {event.eventType === 'virtual' ? 'Virtual Event' : event.eventType === 'hybrid' ? 'Hybrid Event' : 'In-Person Event'}
                          </div>
                          <Link href={`/events/${event.slug}`} className="inline-flex items-center text-sm font-bold text-primary hover:text-primary/80 transition-colors group/link">
                            Details <ArrowRight className="w-4 h-4 ml-1 group-hover/link:translate-x-1 transition-transform" />
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
