import { MetadataRoute } from 'next';
import { getPayloadClient } from '@/lib/payload';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const payload = await getPayloadClient();
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

  // Fetch dynamic programs
  const programs = await payload.find({
    collection: 'programs',
    where: { _status: { equals: 'published' } },
  });

  const programUrls = programs.docs.map((program) => ({
    url: `${baseUrl}/programs/${program.slug}`,
    lastModified: new Date(program.updatedAt),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));

  // Fetch dynamic events
  const events = await payload.find({
    collection: 'events',
    where: { eventStatus: { equals: 'upcoming' } },
  });

  const eventUrls = events.docs.map((event) => ({
    url: `${baseUrl}/events/${event.id}`, // or slug if we add slug to events
    lastModified: new Date(event.updatedAt),
    changeFrequency: 'daily' as const,
    priority: 0.9,
  }));

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    ...programUrls,
    ...eventUrls,
  ];
}
