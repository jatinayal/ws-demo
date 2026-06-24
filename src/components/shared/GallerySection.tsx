import React from 'react';
import { Container } from './Container';
import { SectionHeader } from './section-header';
import Image from 'next/image';

interface GalleryImage {
  title: string;
  image: string;
  caption?: string;
}

interface GallerySectionProps {
  title: string;
  description?: string;
  images: GalleryImage[];
}

export function GallerySection({ title, description, images }: GallerySectionProps) {
  if (!images || images.length === 0) return null;

  return (
    <section className="bg-background py-24">
      <Container>
        <SectionHeader title={title} description={description} align="center" />
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 md:gap-6">
          {images.map((img, idx) => (
            <div
              key={idx}
              className="group bg-muted relative aspect-square overflow-hidden rounded-xl"
            >
              <Image
                src={img.image}
                alt={img.title}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black/80 via-black/20 to-transparent p-6 text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                <h4 className="text-lg font-bold">{img.title}</h4>
                {img.caption && <p className="mt-1 text-sm text-white/80">{img.caption}</p>}
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
