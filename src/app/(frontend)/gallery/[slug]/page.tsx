import React from 'react';
import { getPayloadClient } from '@/lib/payload';
import { notFound } from 'next/navigation';
import { Container } from '@/components/shared/Container';
import { AnimatedSection } from '@/components/shared/AnimatedSection';
import { LightboxGallery } from '@/components/shared/LightboxGallery';
import { CTASection } from '@/components/shared/CTASection';
import { constructMetadata } from '@/lib/seo';
import Link from 'next/link';
import { ArrowLeft, Calendar, BookOpen } from 'lucide-react';
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
    .map(
      (item: {
        image?: { url?: string; alt?: string; width?: number; height?: number } | string | null;
        caption?: string | null;
      }) => {
        if (typeof item.image !== 'object' || !item.image?.url) return null;
        return {
          url: item.image.url,
          alt: item.image.alt || item.caption || album.title,
          caption: item.caption,
          width: item.image.width || 800,
          height: item.image.height || 600,
        };
      },
    )
    .filter(Boolean);

  return (
    <div className="bg-background flex min-h-screen flex-col">
      {/* 1. Header Section */}
      <section className="bg-muted/30 border-b pt-32 pb-16 md:pt-48 md:pb-24">
        <Container>
          <AnimatedSection direction="up" className="max-w-4xl">
            <Link
              href="/gallery"
              className="text-primary mb-8 inline-flex items-center font-semibold hover:underline"
            >
              <ArrowLeft className="mr-2 h-4 w-4" /> Back to Gallery
            </Link>

            <div className="mb-6 flex flex-wrap gap-3">
              <span className="bg-primary/10 text-primary border-primary/20 rounded-full border px-4 py-1.5 text-sm font-bold capitalize">
                {album.category}
              </span>
              <span className="bg-card text-foreground border-border rounded-full border px-4 py-1.5 text-sm font-bold">
                {galleryImages.length} {galleryImages.length === 1 ? 'Photo' : 'Photos'}
              </span>
            </div>

            <h1 className="mb-8 text-4xl font-black tracking-tight md:text-5xl lg:text-6xl">
              {album.title}
            </h1>

            {album.description && (
              <div className="prose prose-lg dark:prose-invert text-muted-foreground mb-10 max-w-3xl leading-relaxed">
                <RichText data={album.description} />
              </div>
            )}

            {(event || program) && (
              <div className="border-border flex flex-wrap gap-4 border-t pt-8">
                {event && (
                  <Link
                    href={`/events/${event.slug}`}
                    className="bg-card border-border/50 group flex items-center rounded-xl border px-5 py-3 transition-all hover:shadow-md"
                  >
                    <Calendar className="text-primary mr-3 h-5 w-5" />
                    <div>
                      <p className="text-muted-foreground mb-0.5 text-xs font-semibold tracking-wider uppercase">
                        Associated Event
                      </p>
                      <p className="group-hover:text-primary text-sm font-bold transition-colors">
                        {event.title}
                      </p>
                    </div>
                  </Link>
                )}

                {program && (
                  <Link
                    href={`/programs/${program.slug}`}
                    className="bg-card border-border/50 group flex items-center rounded-xl border px-5 py-3 transition-all hover:shadow-md"
                  >
                    <BookOpen className="text-primary mr-3 h-5 w-5" />
                    <div>
                      <p className="text-muted-foreground mb-0.5 text-xs font-semibold tracking-wider uppercase">
                        Associated Program
                      </p>
                      <p className="group-hover:text-primary text-sm font-bold transition-colors">
                        {program.title}
                      </p>
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
            <div className="bg-muted/50 border-border rounded-3xl border border-dashed py-24 text-center">
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
