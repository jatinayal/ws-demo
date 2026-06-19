import React from 'react';
import { getPayloadClient } from '@/lib/payload';
import { notFound } from 'next/navigation';
import { Container } from '@/components/shared/Container';
import { AnimatedSection } from '@/components/shared/AnimatedSection';
import { constructMetadata } from '@/lib/seo';
import Image from 'next/image';
import Link from 'next/link';
import { Calendar, MapPin, Clock, ArrowLeft, Users, Video, Link as LinkIcon, AlertCircle, HelpCircle } from 'lucide-react';
import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { RichText } from '@payloadcms/richtext-lexical/react';

// Using a server action to handle registrations
import { submitEventRegistration } from './actions';

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
    image: typeof event.coverImage === 'object' ? event.coverImage?.url : undefined,
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
  });

  if (!events.docs.length) {
    notFound();
  }

  const event = events.docs[0];
  const coverImage = typeof event.coverImage === 'object' ? event.coverImage?.url : null;
  const eventDate = new Date(event.date);
  const endDate = event.endDate ? new Date(event.endDate) : null;
  const isUpcoming = event.eventStatus === 'upcoming' || eventDate > new Date();
  
  const isRegistrationOpen = event.registrationSettings?.registrationOpen && isUpcoming;
  const hasCapacity = event.registrationSettings?.capacity;

  return (
    <div className="flex flex-col min-h-screen bg-background">
      {/* 1. Event Hero */}
      <section className="relative pt-32 pb-24 md:pt-48 md:pb-36 overflow-hidden border-b border-border/40">
        {coverImage ? (
          <div className="absolute inset-0 z-0">
            <Image src={coverImage} alt={event.title} fill className="object-cover" priority />
            <div className="absolute inset-0 bg-background/80 backdrop-blur-md" />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/90 to-background/20" />
          </div>
        ) : (
          <div className="absolute inset-0 bg-primary/5 z-0" />
        )}
        <Container className="relative z-10">
          <AnimatedSection direction="up" className="max-w-4xl">
            <Link href="/events" className="inline-flex items-center text-primary font-bold hover:underline mb-8 transition-colors">
              <ArrowLeft className="w-4 h-4 mr-2" /> Back to Events
            </Link>
            
            <div className="flex flex-wrap gap-3 mb-6">
              <span className="bg-primary/10 text-primary border border-primary/20 text-sm font-bold px-4 py-1.5 rounded-full capitalize backdrop-blur-md">
                {event.category}
              </span>
              <span className="bg-card text-foreground border border-border text-sm font-bold px-4 py-1.5 rounded-full backdrop-blur-md shadow-sm">
                {event.eventType === 'virtual' ? 'Virtual' : event.eventType === 'hybrid' ? 'Hybrid' : 'In-Person'}
              </span>
              {!isUpcoming && (
                <span className="bg-muted text-muted-foreground border border-border text-sm font-bold px-4 py-1.5 rounded-full">
                  Completed
                </span>
              )}
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-foreground mb-6 tracking-tight leading-tight">
              {event.title}
            </h1>
            
            <p className="text-xl text-muted-foreground leading-relaxed font-medium max-w-3xl mb-10">
              {event.shortDescription}
            </p>
            
            <div className="flex flex-wrap items-center gap-6 text-foreground">
              <div className="flex items-center bg-card/80 px-5 py-3 rounded-2xl backdrop-blur-md border border-border/50 shadow-sm hover:border-primary/30 transition-colors">
                <Calendar className="w-5 h-5 mr-3 text-primary" />
                <div>
                  <div className="text-sm font-bold">{eventDate.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}</div>
                  {endDate && <div className="text-xs text-muted-foreground mt-0.5">Until {endDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</div>}
                </div>
              </div>
              
              <div className="flex items-center bg-card/80 px-5 py-3 rounded-2xl backdrop-blur-md border border-border/50 shadow-sm hover:border-primary/30 transition-colors">
                <Clock className="w-5 h-5 mr-3 text-primary" />
                <div className="text-sm font-bold">{eventDate.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}</div>
              </div>

              <div className="flex items-center bg-card/80 px-5 py-3 rounded-2xl backdrop-blur-md border border-border/50 shadow-sm hover:border-primary/30 transition-colors">
                {event.eventType === 'virtual' ? <Video className="w-5 h-5 mr-3 text-primary" /> : <MapPin className="w-5 h-5 mr-3 text-primary" />}
                <div className="text-sm font-bold max-w-[200px] truncate">{event.location}</div>
              </div>
            </div>
          </AnimatedSection>
        </Container>
      </section>

      {/* 2. Main Layout */}
      <section className="py-16 md:py-24 relative z-20">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
            
            {/* Left Content Area */}
            <div className="lg:col-span-8 space-y-16">
              
              {/* Description */}
              <AnimatedSection direction="up">
                <h2 className="text-3xl font-bold mb-6">About This Event</h2>
                <div className="prose prose-lg dark:prose-invert max-w-none text-muted-foreground">
                  <RichText data={event.description} />
                </div>
              </AnimatedSection>

              {/* Schedule */}
              {event.schedule && event.schedule.length > 0 && (
                <AnimatedSection direction="up">
                  <h2 className="text-3xl font-bold mb-8">Event Schedule</h2>
                  <div className="space-y-6 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-border before:to-transparent">
                    {event.schedule.map((item: any, idx: number) => (
                      <div key={idx} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                        <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-background bg-primary text-white font-bold text-sm shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2">
                          {idx + 1}
                        </div>
                        <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] bg-card p-6 rounded-2xl border border-border/50 shadow-sm hover:shadow-md transition-shadow">
                          <div className="text-sm font-bold text-primary mb-2">{item.time}</div>
                          <h4 className="text-lg font-bold mb-2">{item.title}</h4>
                          {item.description && <p className="text-muted-foreground text-sm">{item.description}</p>}
                        </div>
                      </div>
                    ))}
                  </div>
                </AnimatedSection>
              )}

              {/* Speakers */}
              {event.speakers && event.speakers.length > 0 && (
                <AnimatedSection direction="up">
                  <h2 className="text-3xl font-bold mb-8">Speakers & Facilitators</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {event.speakers.map((speaker: any, idx: number) => {
                      const speakerImg = typeof speaker.image === 'object' ? speaker.image?.url : null;
                      return (
                        <div key={idx} className="bg-card rounded-2xl border border-border p-6 flex flex-col md:flex-row gap-6 items-center md:items-start text-center md:text-left shadow-sm">
                          <div className="relative w-24 h-24 rounded-full overflow-hidden shrink-0 ring-4 ring-primary/10">
                            {speakerImg ? (
                              <Image src={speakerImg} alt={speaker.name} fill className="object-cover" />
                            ) : (
                              <div className="w-full h-full bg-muted flex items-center justify-center">
                                <Users className="w-8 h-8 text-muted-foreground/50" />
                              </div>
                            )}
                          </div>
                          <div>
                            <h4 className="text-xl font-bold mb-1">{speaker.name}</h4>
                            <p className="text-sm font-semibold text-primary mb-3">{speaker.role}</p>
                            {speaker.bio && <p className="text-sm text-muted-foreground line-clamp-3">{speaker.bio}</p>}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </AnimatedSection>
              )}

              {/* FAQs */}
              {event.faqs && event.faqs.length > 0 && (
                <AnimatedSection direction="up">
                  <h2 className="text-3xl font-bold mb-8">Frequently Asked Questions</h2>
                  <div className="space-y-4">
                    {event.faqs.map((faq: any, idx: number) => (
                      <div key={idx} className="bg-card rounded-2xl border border-border p-6 shadow-sm">
                        <div className="flex items-start">
                          <HelpCircle className="w-6 h-6 text-primary mr-4 shrink-0 mt-0.5" />
                          <div>
                            <h4 className="text-lg font-bold mb-2">{faq.question}</h4>
                            <p className="text-muted-foreground">{faq.answer}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </AnimatedSection>
              )}

            </div>

            {/* Right Sidebar - Registration & Details */}
            <div className="lg:col-span-4">
              <AnimatedSection direction="up" className="sticky top-32 space-y-8">
                
                {/* Registration Card */}
                <div className="bg-card rounded-3xl p-8 border border-border/50 shadow-xl">
                  <h3 className="text-2xl font-bold mb-2">Registration</h3>
                  
                  {isRegistrationOpen ? (
                    <div>
                      {hasCapacity && (
                        <p className="text-sm text-muted-foreground mb-6 flex items-center">
                          <Users className="w-4 h-4 mr-2" /> Limited capacity: {hasCapacity} spots available
                        </p>
                      )}
                      
                      {event.registrationSettings?.registrationLink ? (
                        <Link 
                          href={event.registrationSettings.registrationLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={cn(buttonVariants({ variant: 'default', size: 'lg', className: 'w-full rounded-full font-bold' }))}
                        >
                          Register Externally <LinkIcon className="w-4 h-4 ml-2" />
                        </Link>
                      ) : success ? (
                        <div className="bg-green-50 dark:bg-green-950/30 p-6 rounded-2xl text-center border border-green-200 dark:border-green-900 mt-6">
                          <AlertCircle className="w-8 h-8 text-green-600 dark:text-green-500 mx-auto mb-3" />
                          <p className="font-semibold text-green-800 dark:text-green-300">Registration Successful!</p>
                          <p className="text-sm text-green-700/80 dark:text-green-400/80 mt-1">
                            Thank you for registering. We will send you an email with further details shortly.
                          </p>
                        </div>
                      ) : (
                        <form action={submitEventRegistration} className="space-y-4 mt-6">
                          {error && (
                            <div className="bg-destructive/10 text-destructive p-4 rounded-xl border border-destructive/20 text-sm mb-4 font-medium flex items-start">
                              <AlertCircle className="w-5 h-5 mr-2 shrink-0" />
                              <span>
                                {error === 'missing_fields' ? 'Please fill in all required fields.' : 
                                 error === 'invalid_event' ? 'Invalid event selected.' : 
                                 'An error occurred during registration. Please try again later.'}
                              </span>
                            </div>
                          )}
                          <input type="hidden" name="eventId" value={event.id} />
                          <div>
                            <label htmlFor="name" className="block text-sm font-medium mb-1">Full Name</label>
                            <input type="text" id="name" name="name" required className="w-full bg-background border border-border rounded-xl px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-primary" placeholder="Jane Doe" />
                          </div>
                          <div>
                            <label htmlFor="email" className="block text-sm font-medium mb-1">Email Address</label>
                            <input type="email" id="email" name="email" required className="w-full bg-background border border-border rounded-xl px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-primary" placeholder="jane@example.com" />
                          </div>
                          <div>
                            <label htmlFor="phone" className="block text-sm font-medium mb-1">Phone Number (Optional)</label>
                            <input type="tel" id="phone" name="phone" className="w-full bg-background border border-border rounded-xl px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-primary" placeholder="+1 234 567 8900" />
                          </div>
                          <button type="submit" className={cn(buttonVariants({ variant: 'default', size: 'lg', className: 'w-full rounded-full font-bold mt-2' }))}>
                            Submit Registration
                          </button>
                        </form>
                      )}
                    </div>
                  ) : (
                    <div className="bg-muted p-6 rounded-2xl text-center border border-border">
                      <AlertCircle className="w-8 h-8 text-muted-foreground mx-auto mb-3" />
                      <p className="font-semibold text-foreground">Registration Closed</p>
                      <p className="text-sm text-muted-foreground mt-1">
                        {!isUpcoming ? 'This event has already concluded.' : 'Registration is not currently open.'}
                      </p>
                    </div>
                  )}
                </div>

                {/* Location Details */}
                <div className="bg-card rounded-3xl p-8 border border-border/50 shadow-sm">
                  <h3 className="text-lg font-bold mb-4">Location Details</h3>
                  <div className="space-y-4">
                    <div className="flex">
                      <MapPin className="w-5 h-5 text-primary mr-3 shrink-0 mt-0.5" />
                      <div>
                        <p className="font-medium">{event.location}</p>
                        <p className="text-sm text-muted-foreground mt-1">{event.eventType === 'virtual' ? 'This is a fully virtual event.' : event.eventType === 'hybrid' ? 'Physical and virtual attendance supported.' : 'Physical attendance only.'}</p>
                      </div>
                    </div>
                    {event.virtualLink && (isUpcoming || event.eventStatus === 'ongoing') && (
                      <div className="flex pt-4 border-t border-border">
                        <Video className="w-5 h-5 text-primary mr-3 shrink-0 mt-0.5" />
                        <div>
                          <p className="font-medium">Virtual Link</p>
                          <p className="text-sm text-muted-foreground mt-1">Provided to registered attendees via email prior to the event.</p>
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
        <section className="py-24 bg-muted/30 border-t">
          <Container>
            <AnimatedSection direction="up" className="text-center mb-12">
              <h2 className="text-3xl font-bold">Event Highlights</h2>
            </AnimatedSection>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {event.gallery.map((item: any, idx: number) => {
                if (typeof item.image !== 'object' || !item.image?.url) return null;
                return (
                  <AnimatedSection key={idx} direction="up" delay={idx * 0.1}>
                    <div className="relative aspect-square rounded-2xl overflow-hidden shadow-sm group">
                      <Image src={item.image.url} alt="Event Gallery" fill className="object-cover transition-transform duration-700 group-hover:scale-110" />
                    </div>
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
