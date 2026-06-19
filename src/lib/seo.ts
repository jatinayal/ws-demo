import type { Metadata } from 'next';
import { getSiteSettings } from './payload';

interface SEOProps {
  title?: string;
  description?: string;
  image?: string;
  path?: string;
}

export const constructMetadata = async (
  options: {
    title?: string;
    description?: string;
    image?: string;
    url?: string;
    path?: string;
  } = {}
): Promise<Metadata> => {
  const siteSettings = await getSiteSettings();

  const {
    title: customTitle,
    description: customDescription,
    image: customImage,
    url,
  } = options;

  const defaultTitle = siteSettings?.seoDefaultTitle || siteSettings?.organizationName || "Women's Synergy";
  const title = customTitle ? `${customTitle} | ${defaultTitle}` : defaultTitle;
  
  const description = customDescription || siteSettings?.seoDefaultDescription || "Empowering women worldwide to achieve their full potential.";
  
  const ogImage = customImage 
    ? customImage 
    : (typeof siteSettings?.seoDefaultImage === 'object' && siteSettings?.seoDefaultImage?.url)
      ? siteSettings.seoDefaultImage.url 
      : '/logo.png';

  const res: Metadata = {
    metadataBase: new URL(process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000'),
    title,
    description,
    openGraph: {
      title,
      description,
      url: url || siteSettings?.donationUrl || 'https://womenssynergy.org',
      siteName: siteSettings?.organizationName || "Women's Synergy",
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
        },
      ],
      locale: 'en_US',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [ogImage],
    },
  };
  return res;
};
