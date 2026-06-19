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

export const metadata = constructMetadata({
  title: 'Gallery & Media',
  description: 'Explore the visual stories of our impact, events, and community initiatives.',
  path: '/gallery',
});

export default async function GalleryPage({ searchParams }: { searchParams: Promise<{ category?: string }> }) {
  const params = await searchParams;
  const categoryFilter = params.category;
  
  const payload = await getPayloadClient();
  
  const whereClause: any = {
    albumStatus: { equals: 'published' }
  };
  
  if (categoryFilter) {
    whereClause.category = { equals: categoryFilter };
  }

  const albumsRes = await payload.find({
    collection: 'gallery',
    limit: 100,
    sort: '-createdAt',
    where: whereClause
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
    <div className="flex flex-col min-h-screen bg-background">
      <HeroSection 
        title="Visual Stories of Impact"
        subtitle="Explore our galleries to see the real-world impact, community celebrations, and the powerful women shaping the future."
      />

      {/* Filter Bar */}
      <section className="py-8 bg-card border-b relative z-20">
        <Container>
          <div className="flex flex-wrap items-center justify-center gap-4">
            {categories.map((cat) => (
              <Link 
                key={cat.value} 
                href={cat.value ? `/gallery?category=${cat.value}` : '/gallery'}
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
          {albums.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {albums.map((album: any, idx: number) => {
                const coverImage = typeof album.coverImage === 'object' ? album.coverImage?.url : null;
                const imageCount = album.images?.length || 0;

                return (
                  <AnimatedSection key={album.id} direction="up" delay={idx * 0.1}>
                    <Link href={`/gallery/${album.slug}`} className="group block h-full">
                      <div className="bg-card rounded-3xl overflow-hidden shadow-sm hover:shadow-xl border border-border/40 transition-all duration-500 h-full flex flex-col">
                        <div className="relative w-full aspect-[4/3] overflow-hidden bg-muted">
                          {coverImage ? (
                            <Image src={coverImage} alt={album.title} fill className="object-cover transition-transform duration-700 group-hover:scale-105" />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center">
                              <ImageIcon className="w-12 h-12 text-muted-foreground/30" />
                            </div>
                          )}
                          
                          <div className="absolute top-4 right-4 z-10 flex flex-col gap-2">
                            <span className="bg-background/90 backdrop-blur-sm text-foreground text-xs font-bold px-3 py-1 rounded-full shadow-sm capitalize border border-border/50">
                              {album.category}
                            </span>
                          </div>

                          <div className="absolute bottom-4 right-4 z-10">
                            <div className="bg-black/60 backdrop-blur-md text-white text-xs font-bold px-3 py-1.5 rounded-full flex items-center shadow-sm">
                              <Camera className="w-3.5 h-3.5 mr-1.5" />
                              {imageCount} {imageCount === 1 ? 'Photo' : 'Photos'}
                            </div>
                          </div>
                        </div>

                        <div className="p-6 flex flex-col flex-1">
                          <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors line-clamp-2">{album.title}</h3>
                          
                          <div className="mt-auto pt-4 flex items-center text-sm font-bold text-primary">
                            View Album <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
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
