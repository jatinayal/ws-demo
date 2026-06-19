import React from 'react';
import { getPayloadClient } from '@/lib/payload';
import { notFound } from 'next/navigation';
import { Container } from '@/components/shared/Container';
import { AnimatedSection } from '@/components/shared/AnimatedSection';
import { LightboxGallery } from '@/components/shared/LightboxGallery';
import { CTASection } from '@/components/shared/CTASection';
import { constructMetadata } from '@/lib/seo';
import Link from 'next/link';
import { ArrowLeft, Calendar, ArrowRight, BookOpen } from 'lucide-react';
import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { RichText } from '@payloadcms/richtext-lexical/react';

interface GalleryAlbumPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateMetadata({ params }: GalleryAlbumPageProps) {
  const { slug } = await params;
  const payload = await getPayloadClient();
  const albums = await payload.find({
    collection: 'gallery',
    where: { slug: { equals: slug } },
    limit: 1,
  });

  if (!albums.docs.length) return constructMetadata();
  const album = albums.docs[0];

  return constructMetadata({
    title: `${album.title} | Gallery`,
    description: album.meta?.description || `Explore photos from ${album.title}.`,
    image: typeof album.coverImage === 'object' ? album.coverImage?.url : undefined,
    path: `/gallery/${slug}`,
  });
}

export default async function GalleryAlbumPage({ params }: GalleryAlbumPageProps) {
  const { slug } = await params;
  const payload = await getPayloadClient();
  
  const albums = await payload.find({
    collection: 'gallery',
    where: { slug: { equals: slug }, albumStatus: { equals: 'published' } },
    limit: 1,
  });

  if (!albums.docs.length) {
    notFound();
  }

  const album = albums.docs[0];
  const event = typeof album.associatedEvent === 'object' ? album.associatedEvent : null;
  const program = typeof album.associatedProgram === 'object' ? album.associatedProgram : null;

  // Format images for the LightboxGallery component
  const galleryImages = (album.images || [])
    .map((item: any) => {
      if (typeof item.image !== 'object' || !item.image?.url) return null;
      return {
        url: item.image.url,
        alt: item.image.alt || item.caption || album.title,
        caption: item.caption,
        width: item.image.width || 800,
        height: item.image.height || 600,
      };
    })
    .filter(Boolean);

  return (
    <div className="flex flex-col min-h-screen bg-background">
      {/* 1. Header Section */}
      <section className="pt-32 pb-16 md:pt-48 md:pb-24 bg-muted/30 border-b">
        <Container>
          <AnimatedSection direction="up" className="max-w-4xl">
            <Link href="/gallery" className="inline-flex items-center text-primary font-semibold hover:underline mb-8">
              <ArrowLeft className="w-4 h-4 mr-2" /> Back to Gallery
            </Link>
            
            <div className="flex flex-wrap gap-3 mb-6">
              <span className="bg-primary/10 text-primary border border-primary/20 text-sm font-bold px-4 py-1.5 rounded-full capitalize">
                {album.category}
              </span>
              <span className="bg-card text-foreground border border-border text-sm font-bold px-4 py-1.5 rounded-full">
                {galleryImages.length} {galleryImages.length === 1 ? 'Photo' : 'Photos'}
              </span>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black mb-8 tracking-tight">
              {album.title}
            </h1>
            
            {album.description && (
              <div className="prose prose-lg dark:prose-invert text-muted-foreground leading-relaxed max-w-3xl mb-10">
                <RichText data={album.description} />
              </div>
            )}
            
            {(event || program) && (
              <div className="flex flex-wrap gap-4 pt-8 border-t border-border">
                {event && (
                  <Link href={`/events/${event.slug}`} className="flex items-center bg-card border border-border/50 px-5 py-3 rounded-xl hover:shadow-md transition-all group">
                    <Calendar className="w-5 h-5 text-primary mr-3" />
                    <div>
                      <p className="text-xs text-muted-foreground font-semibold uppercase tracking-wider mb-0.5">Associated Event</p>
                      <p className="text-sm font-bold group-hover:text-primary transition-colors">{event.title}</p>
                    </div>
                  </Link>
                )}
                
                {program && (
                  <Link href={`/programs/${program.slug}`} className="flex items-center bg-card border border-border/50 px-5 py-3 rounded-xl hover:shadow-md transition-all group">
                    <BookOpen className="w-5 h-5 text-primary mr-3" />
                    <div>
                      <p className="text-xs text-muted-foreground font-semibold uppercase tracking-wider mb-0.5">Associated Program</p>
                      <p className="text-sm font-bold group-hover:text-primary transition-colors">{program.title}</p>
                    </div>
                  </Link>
                )}
              </div>
            )}
          </AnimatedSection>
        </Container>
      </section>

      {/* 2. Masonry Gallery with Lightbox */}
      <section className="py-16 md:py-24">
        <Container>
          {galleryImages.length > 0 ? (
            <LightboxGallery images={galleryImages} />
          ) : (
            <div className="text-center py-24 bg-muted/50 rounded-3xl border border-dashed border-border">
              <p className="text-muted-foreground font-semibold">No images found in this album.</p>
            </div>
          )}
        </Container>
      </section>

      {/* 3. CTA */}
      <CTASection 
        title="Be Part of the Picture"
        description="Join our upcoming events and initiatives to become part of our community's visual story."
        buttonLabel="Explore Events"
        buttonUrl="/events"
      />
    </div>
  );
}
