import { getPayload } from 'payload';
import config from '@/payload.config';
import { cache } from 'react';

// Using React Cache ensures we don't hit the DB multiple times per request for globals
export const getPayloadClient = cache(async () => {
  return await getPayload({ config });
});

export const getSiteSettings = cache(async () => {
  const payload = await getPayloadClient();
  try {
    return await payload.findGlobal({ 
      slug: 'site-settings', 
      depth: 1,
      select: {
        organizationName: true,
        logo: true,
        contactEmail: true,
        contactPhone: true,
        address: true,
        socialLinks: true,
        donationUrl: true,
        workingHours: true,
        mapEmbedUrl: true,
        seo: true,
      }
    });
  } catch (error) {
    console.warn('Fallback: site_settings table not ready yet.');
    return { organizationName: "Women's Synergy", seo: {}, socialLinks: [] } as any;
  }
});

export const getNavigation = cache(async () => {
  const payload = await getPayloadClient();
  try {
    return await payload.findGlobal({ 
      slug: 'navigation', 
      depth: 1,
      select: {
        mainMenu: true,
        footerMenu: true,
        announcementBar: true,
      }
    });
  } catch (error) {
    console.warn('Fallback: navigation table not ready yet.');
    return { mainMenu: [], footerMenu: [], announcementBar: { enabled: false } } as any;
  }
});

export const getHomepage = cache(async () => {
  const payload = await getPayloadClient();
  try {
    return await payload.findGlobal({ 
      slug: 'homepage', 
      depth: 2,
      select: {
        hero: true,
        aboutSection: true,
        impactSection: true,
        programsSection: true,
        storiesSection: true,
        eventsSection: true,
        partnersSection: true,
        donationCta: true,
      }
    });
  } catch (error) {
    console.warn('Fallback: homepage table not ready yet.');
    return {} as any;
  }
});

export const getAboutUs = cache(async () => {
  const payload = await getPayloadClient();
  try {
    return await payload.findGlobal({ slug: 'about-us', depth: 2 });
  } catch (error) {
    console.warn('Fallback: about_us table not ready yet.');
    return {} as any;
  }
});

export const getImpactPage = cache(async () => {
  const payload = await getPayloadClient();
  try {
    return await payload.findGlobal({ slug: 'impact-page', depth: 2 });
  } catch (error) {
    console.warn('Fallback: impact_page table not ready yet.');
    return {} as any;
  }
});

export const getGetInvolved = cache(async () => {
  const payload = await getPayloadClient();
  try {
    return await payload.findGlobal({ slug: 'get-involved', depth: 1 });
  } catch (error) {
    console.warn('Fallback: get_involved table not ready yet.');
    return {} as any;
  }
});

export const getContactPage = cache(async () => {
  const payload = await getPayloadClient();
  try {
    return await payload.findGlobal({ slug: 'contact-page', depth: 1 });
  } catch (error) {
    console.warn('Fallback: contact_page table not ready yet.');
    return {} as any;
  }
});
