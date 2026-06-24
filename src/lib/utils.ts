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

  // If it's a string, check if it's actually a URL and not just a Payload ID.
  // Payload IDs are usually alphanumeric, while URLs start with http or /.
  if (typeof media === 'string') {
    if (media.startsWith('http') || media.startsWith('/')) {
      return media;
    }
    return ''; // It's an ID, not a URL
  }

  // Safe cast for checking nested properties
  const mediaObj = media as Record<string, unknown>;

  // Priority 1: Check native cloudinary_secure_url field
  if (typeof mediaObj.cloudinary_secure_url === 'string' && mediaObj.cloudinary_secure_url) {
    return mediaObj.cloudinary_secure_url;
  }

  // Priority 2: Check nested cloudinary object from plugin
  const cloudinaryData = mediaObj.cloudinary as Record<string, unknown> | undefined;
  if (
    cloudinaryData &&
    typeof cloudinaryData.secure_url === 'string' &&
    cloudinaryData.secure_url
  ) {
    return cloudinaryData.secure_url;
  }

  // Priority 3: Fall back to default URL only if it's NOT a local Payload URL
  if (typeof mediaObj.url === 'string' && mediaObj.url) {
    // If it's a local Payload media URL, it will be broken on Vercel's ephemeral filesystem.
    // Return empty string to force the frontend's safe fallback placeholder.
    if (mediaObj.url.startsWith('/api/media/file/')) {
      return '';
    }
    return mediaObj.url;
  }

  return '';
}
