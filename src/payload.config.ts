import { buildConfig } from 'payload';
import { postgresAdapter } from '@payloadcms/db-postgres';
import { lexicalEditor } from '@payloadcms/richtext-lexical';
import { cloudinaryStorage } from 'payload-cloudinary';
import sharp from 'sharp';

import { Users } from './collections/Users';
import { Media } from './collections/Media';
import { Programs } from './collections/Programs';
import { Events } from './collections/Events';
import { SuccessStories } from './collections/SuccessStories';
import { Gallery } from './collections/Gallery';
import { Volunteers } from './collections/Volunteers';
import { DonationLeads } from './collections/DonationLeads';
import { ContactRequests } from './collections/ContactRequests';
import { Partners } from './collections/Partners';
import { PartnershipRequests } from './collections/PartnershipRequests';
import { ImpactStatistics } from './collections/ImpactStatistics';
import { NewsletterSubscribers } from './collections/NewsletterSubscribers';
import { EventRegistrations } from './collections/EventRegistrations';

import { SiteSettings } from './globals/SiteSettings';
import { Homepage } from './globals/Homepage';
import { Navigation } from './globals/Navigation';
import { AboutUs } from './globals/AboutUs';
import { ImpactPage } from './globals/ImpactPage';
import { GetInvolved } from './globals/GetInvolved';
import { ContactPage } from './globals/ContactPage';
import { PrivacyPolicy } from './globals/PrivacyPolicy';
import { TermsOfService } from './globals/TermsOfService';

export default buildConfig({
  admin: {
    user: Users.slug,
    components: {
      providers: ['@/components/admin/NotificationProvider#NotificationProvider'],
    },

    meta: {
      titleSuffix: "- Women's Synergy",
      icons: [
        {
          rel: 'icon',
          type: 'image/png',
          url: '/logo.png',
        },
      ],
    },
  },
  editor: lexicalEditor(),
  collections: [
    Users,
    Media,
    Programs,
    Events,
    EventRegistrations,
    SuccessStories,
    Gallery,
    Volunteers,
    DonationLeads,
    ContactRequests,
    Partners,
    PartnershipRequests,
    ImpactStatistics,
    NewsletterSubscribers,
  ],
  globals: [
    SiteSettings,
    Homepage,
    Navigation,
    AboutUs,
    ImpactPage,
    GetInvolved,
    ContactPage,
    PrivacyPolicy,
    TermsOfService,
  ],
  plugins: [
    cloudinaryStorage({
      config: {
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME || '',
        api_key: process.env.CLOUDINARY_API_KEY || '',
        api_secret: process.env.CLOUDINARY_API_SECRET || '',
      },
      collections: {
        media: true,
      },
      folder: 'womens-synergy-media',
    }),
  ],
  secret: process.env.PAYLOAD_SECRET || '',
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URI || '',
    },
  }),
  sharp,
});
