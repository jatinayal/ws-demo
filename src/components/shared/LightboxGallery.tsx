'use client';

import React, { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { X, ChevronLeft, ChevronRight, ZoomIn, Camera } from 'lucide-react';
import { AnimatedSection } from './AnimatedSection';
import { getMediaUrl } from '@/lib/utils';

interface GalleryImage {
  url: string;
  alt: string;
  caption?: string;
  width: number;
  height: number;
}

interface LightboxGalleryProps {
  images: GalleryImage[];
}

export function LightboxGallery({ images }: LightboxGalleryProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const openLightbox = (index: number) => {
    setCurrentIndex(index);
    setIsOpen(true);
  };

  const closeLightbox = useCallback(() => {
    setIsOpen(false);
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);

  const goToPrevious = useCallback(
    (e?: React.MouseEvent) => {
      if (e) e.stopPropagation();
      setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
    },
    [images.length],
  );

  const goToNext = useCallback(
    (e?: React.MouseEvent) => {
      if (e) e.stopPropagation();
      setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
    },
    [images.length],
  );

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowLeft') goToPrevious();
      if (e.key === 'ArrowRight') goToNext();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, closeLightbox, goToPrevious, goToNext]);

  if (!images || images.length === 0) return null;

  return (
    <>
      {/* Masonry Grid Layout */}
      <div className="columns-1 gap-6 space-y-6 sm:columns-2 lg:columns-3">
        {images.map((img, idx) => (
          <AnimatedSection
            key={idx}
            direction="up"
            delay={idx * 0.05}
            className="break-inside-avoid"
          >
            <div
              className="group bg-muted relative cursor-pointer overflow-hidden rounded-2xl shadow-sm transition-all hover:shadow-xl"
              onClick={() => openLightbox(idx)}
            >
              {/* Force next/image to render at original aspect ratio within standard masonry bounds */}
              <Image
                src={getMediaUrl(img)}
                alt={img.alt}
                width={800}
                height={(800 / img.width) * img.height}
                className="h-auto w-full object-cover transition-transform duration-700 group-hover:scale-105"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              />

              <div className="absolute inset-0 flex items-center justify-center bg-black/0 opacity-0 transition-colors duration-300 group-hover:bg-black/40 group-hover:opacity-100">
                <div className="scale-50 transform rounded-full bg-white/20 p-3 text-white backdrop-blur-md transition-transform duration-300 group-hover:scale-100">
                  <ZoomIn className="h-6 w-6" />
                </div>
              </div>

              {img.caption && (
                <div className="absolute right-0 bottom-0 left-0 translate-y-full bg-gradient-to-t from-black/80 to-transparent p-4 transition-transform duration-300 group-hover:translate-y-0">
                  <p className="line-clamp-2 text-sm font-medium text-white">{img.caption}</p>
                </div>
              )}
            </div>
          </AnimatedSection>
        ))}
      </div>

      {/* Fullscreen Lightbox Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 backdrop-blur-sm"
          onClick={closeLightbox}
        >
          {/* Header Controls */}
          <div className="absolute top-0 right-0 left-0 z-10 flex items-center justify-between bg-gradient-to-b from-black/50 to-transparent p-6">
            <div className="flex items-center text-sm font-medium text-white/80">
              <Camera className="mr-2 h-4 w-4" />
              {currentIndex + 1} / {images.length}
            </div>
            <button
              onClick={(e) => {
                e.stopPropagation();
                closeLightbox();
              }}
              className="rounded-full bg-white/10 p-2 text-white/80 backdrop-blur-md transition-colors hover:bg-white/20 hover:text-white"
              aria-label="Close lightbox"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          {/* Navigation Controls */}
          {images.length > 1 && (
            <>
              <button
                onClick={goToPrevious}
                className="absolute top-1/2 left-4 z-10 -translate-y-1/2 rounded-full bg-black/20 p-3 text-white/50 backdrop-blur-md transition-all hover:bg-black/40 hover:text-white md:left-8 md:p-4"
                aria-label="Previous image"
              >
                <ChevronLeft className="h-6 w-6 md:h-8 md:w-8" />
              </button>

              <button
                onClick={goToNext}
                className="absolute top-1/2 right-4 z-10 -translate-y-1/2 rounded-full bg-black/20 p-3 text-white/50 backdrop-blur-md transition-all hover:bg-black/40 hover:text-white md:right-8 md:p-4"
                aria-label="Next image"
              >
                <ChevronRight className="h-6 w-6 md:h-8 md:w-8" />
              </button>
            </>
          )}

          {/* Main Image Container */}
          <div
            className="relative flex h-full max-h-[85vh] w-full max-w-7xl flex-col items-center justify-center p-4 md:p-12"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative h-full w-full">
              <Image
                src={images[currentIndex].url}
                alt={images[currentIndex].alt}
                fill
                className="object-contain"
                sizes="100vw"
                priority
              />
            </div>

            {/* Caption */}
            {images[currentIndex].caption && (
              <div className="absolute bottom-4 left-1/2 max-w-2xl -translate-x-1/2 rounded-2xl bg-black/60 px-6 py-3 text-center backdrop-blur-md">
                <p className="text-sm text-white md:text-base">{images[currentIndex].caption}</p>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
