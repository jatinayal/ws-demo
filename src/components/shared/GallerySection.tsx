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
    <section className="py-24 bg-background">
      <Container>
        <SectionHeader title={title} description={description} align="center" />
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
          {images.map((img, idx) => (
            <div key={idx} className="group relative aspect-square overflow-hidden rounded-xl bg-muted">
              <Image 
                src={img.image} 
                alt={img.title} 
                fill 
                className="object-cover transition-transform duration-500 group-hover:scale-110" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6 text-white">
                <h4 className="font-bold text-lg">{img.title}</h4>
                {img.caption && <p className="text-sm text-white/80 mt-1">{img.caption}</p>}
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
