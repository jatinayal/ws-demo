import React from 'react';
import { getPayloadClient } from '@/lib/payload';
import { Container } from '@/components/shared/Container';
import { HeroSection } from '@/components/shared/HeroSection';
import { AnimatedSection } from '@/components/shared/AnimatedSection';
import { EmptyState } from '@/components/shared/EmptyState';
import { constructMetadata } from '@/lib/seo';
import Image from 'next/image';
import Link from 'next/link';
import { ImageIcon, Camera, ArrowRight, Grid3X3 } from 'lucide-react';

import { Gallery } from '@/payload-types';

export const metadata = constructMetadata({
  title: 'Gallery & Media',
  description: 'Explore the visual stories of our impact, events, and community initiatives.',
  path: '/gallery',
});

export default async function GalleryPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>;
}) {
  const params = await searchParams;
  const categoryFilter = params.category;

  const payload = await getPayloadClient();

  const albumsRes = await payload.find({
    collection: 'gallery',
    limit: 100,
    sort: '-createdAt',
    where: {
      albumStatus: { equals: 'published' },
      ...(categoryFilter ? { category: { equals: categoryFilter } } : {}),
    },
  });

  const albums = albumsRes.docs;

  const categories = [
    { label: 'All Albums', value: '' },
    { label: 'Events', value: 'event' },
    { label: 'Workshops', value: 'workshop' },
    { label: 'Community', value: 'community' },
    { label: 'Entrepreneurs', value: 'entrepreneur' },
    { label: 'Impact', value: 'impact' },
  ];

  return (
    <div className="bg-background flex min-h-screen flex-col">
      <HeroSection
        title="Visual Stories of Impact"
        subtitle="Explore our galleries to see the real-world impact, community celebrations, and the powerful women shaping the future."
      />

      {/* Filter Bar */}
      <section className="bg-card relative z-20 border-b py-8">
        <Container>
          <div className="flex flex-wrap items-center justify-center gap-4">
            {categories.map((cat) => (
              <Link
                key={cat.value}
                href={cat.value ? `/gallery?category=${cat.value}` : '/gallery'}
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
          {albums.length > 0 ? (
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
              {(albums as unknown as Gallery[]).map((album, idx: number) => {
                const coverImage =
                  typeof album.coverImage === 'object' ? album.coverImage?.url : null;
                const imageCount = album.images?.length || 0;

                return (
                  <AnimatedSection key={album.id} direction="up" delay={idx * 0.1}>
                    <Link href={`/gallery/${album.slug}`} className="group block h-full">
                      <div className="bg-card border-border/40 flex h-full flex-col overflow-hidden rounded-3xl border shadow-sm transition-all duration-500 hover:shadow-xl">
                        <div className="bg-muted relative aspect-[4/3] w-full overflow-hidden">
                          {coverImage ? (
                            <Image
                              src={coverImage}
                              alt={album.title}
                              fill
                              className="object-cover transition-transform duration-700 group-hover:scale-105"
                            />
                          ) : (
                            <div className="flex h-full w-full items-center justify-center">
                              <ImageIcon className="text-muted-foreground/30 h-12 w-12" />
                            </div>
                          )}

                          <div className="absolute top-4 right-4 z-10 flex flex-col gap-2">
                            <span className="bg-background/90 text-foreground border-border/50 rounded-full border px-3 py-1 text-xs font-bold capitalize shadow-sm backdrop-blur-sm">
                              {album.category}
                            </span>
                          </div>

                          <div className="absolute right-4 bottom-4 z-10">
                            <div className="flex items-center rounded-full bg-black/60 px-3 py-1.5 text-xs font-bold text-white shadow-sm backdrop-blur-md">
                              <Camera className="mr-1.5 h-3.5 w-3.5" />
                              {imageCount} {imageCount === 1 ? 'Photo' : 'Photos'}
                            </div>
                          </div>
                        </div>

                        <div className="flex flex-1 flex-col p-6">
                          <h3 className="group-hover:text-primary mb-3 line-clamp-2 text-xl font-bold transition-colors">
                            {album.title}
                          </h3>

                          <div className="text-primary mt-auto flex items-center pt-4 text-sm font-bold">
                            View Album{' '}
                            <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
                          </div>
                        </div>
                      </div>
                    </Link>
                  </AnimatedSection>
                );
              })}
            </div>
          ) : (
            <AnimatedSection direction="up">
              <EmptyState
                icon={Grid3X3}
                title="No Albums Found"
                description="There are currently no gallery albums available in this category. Please check back later."
              />
            </AnimatedSection>
          )}
        </Container>
      </section>
    </div>
  );
}
