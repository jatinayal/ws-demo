'use client';

import React, { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { X, ChevronLeft, ChevronRight, ZoomIn, Camera } from 'lucide-react';
import { cn } from '@/lib/utils';
import { AnimatedSection } from './AnimatedSection';

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
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = useCallback(() => {
    setIsOpen(false);
    document.body.style.overflow = 'auto';
  }, []);

  const goToPrevious = useCallback((e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  }, [images.length]);

  const goToNext = useCallback((e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  }, [images.length]);

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
      <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
        {images.map((img, idx) => (
          <AnimatedSection key={idx} direction="up" delay={idx * 0.05} className="break-inside-avoid">
            <div 
              className="group relative rounded-2xl overflow-hidden bg-muted cursor-pointer shadow-sm hover:shadow-xl transition-all"
              onClick={() => openLightbox(idx)}
            >
              {/* Force next/image to render at original aspect ratio within standard masonry bounds */}
              <Image 
                src={img.url} 
                alt={img.alt} 
                width={800}
                height={(800 / img.width) * img.height}
                className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              />
              
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                <div className="bg-white/20 backdrop-blur-md p-3 rounded-full text-white transform scale-50 group-hover:scale-100 transition-transform duration-300">
                  <ZoomIn className="w-6 h-6" />
                </div>
              </div>
              
              {img.caption && (
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                  <p className="text-white text-sm font-medium line-clamp-2">{img.caption}</p>
                </div>
              )}
            </div>
          </AnimatedSection>
        ))}
      </div>

      {/* Fullscreen Lightbox Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-sm flex items-center justify-center"
          onClick={closeLightbox}
        >
          {/* Header Controls */}
          <div className="absolute top-0 left-0 right-0 p-6 flex justify-between items-center z-10 bg-gradient-to-b from-black/50 to-transparent">
            <div className="text-white/80 font-medium text-sm flex items-center">
              <Camera className="w-4 h-4 mr-2" />
              {currentIndex + 1} / {images.length}
            </div>
            <button 
              onClick={(e) => { e.stopPropagation(); closeLightbox(); }}
              className="text-white/80 hover:text-white bg-white/10 hover:bg-white/20 rounded-full p-2 backdrop-blur-md transition-colors"
              aria-label="Close lightbox"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Navigation Controls */}
          {images.length > 1 && (
            <>
              <button 
                onClick={goToPrevious}
                className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 text-white/50 hover:text-white bg-black/20 hover:bg-black/40 rounded-full p-3 md:p-4 backdrop-blur-md transition-all z-10"
                aria-label="Previous image"
              >
                <ChevronLeft className="w-6 h-6 md:w-8 md:h-8" />
              </button>
              
              <button 
                onClick={goToNext}
                className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 text-white/50 hover:text-white bg-black/20 hover:bg-black/40 rounded-full p-3 md:p-4 backdrop-blur-md transition-all z-10"
                aria-label="Next image"
              >
                <ChevronRight className="w-6 h-6 md:w-8 md:h-8" />
              </button>
            </>
          )}

          {/* Main Image Container */}
          <div className="relative w-full h-full max-w-7xl max-h-[85vh] p-4 md:p-12 flex flex-col items-center justify-center" onClick={(e) => e.stopPropagation()}>
            <div className="relative w-full h-full">
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
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/60 backdrop-blur-md px-6 py-3 rounded-2xl max-w-2xl text-center">
                <p className="text-white text-sm md:text-base">{images[currentIndex].caption}</p>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
