import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatPhoneNumber(phone?: string | null): string {
  if (!phone) return '';
  const digits = phone.replace(/\D/g, '');
  if (digits.length === 10) {
    return `+91 ${digits}`;
  }
  return phone;
}

/**
 * Resolves the URL for a Media object, preferring the Cloudinary secure URL if available,
 * and falling back to the local URL.
 */
export function getMediaUrl(media?: unknown): string {
  if (!media) return '';

  // If it's just a URL string, return it directly
  if (typeof media === 'string') return media;

  // Safe cast for checking nested properties
  const mediaObj = media as Record<string, unknown>;

  // The payload-cloudinary plugin saves metadata in a 'cloudinary' object.
  // We use type casting to access it since it might not be in the generated types yet.
  const cloudinaryData = mediaObj.cloudinary as Record<string, unknown> | undefined;
  if (cloudinaryData && typeof cloudinaryData.secure_url === 'string') {
    return cloudinaryData.secure_url;
  }

  // Fall back to the default URL
  return typeof mediaObj.url === 'string' ? mediaObj.url : '';
}
