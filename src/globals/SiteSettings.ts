import type { GlobalConfig } from 'payload';
import { isContentManager, publicReadAccess } from '../access';

export const SiteSettings: GlobalConfig = {
  slug: 'site-settings',
  access: {
    read: publicReadAccess,
    update: isContentManager,
  },
  fields: [
    {
      name: 'organizationName',
      type: 'text',
      required: true,
      defaultValue: "Women's Synergy",
    },
    {
      name: 'logo',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'contactEmail',
      type: 'email',
    },
    {
      name: 'contactPhone',
      type: 'text',
    },
    {
      name: 'address',
      type: 'textarea',
    },
    {
      name: 'socialLinks',
      type: 'array',
      fields: [
        { name: 'platform', type: 'text' },
        { name: 'url', type: 'text' },
      ],
    },
    {
      name: 'workingHours',
      type: 'text',
      admin: {
        description: 'e.g., Mon - Fri: 9:00 AM - 5:00 PM',
      },
    },
    {
      name: 'mapEmbedUrl',
      type: 'text',
      admin: {
        description: 'Google Maps embed URL src (e.g., https://www.google.com/maps/embed?pb=...)',
      },
    },
    {
      name: 'donationUrl',
      type: 'text',
      admin: { description: 'External link for donations, if any.' },
    },
    {
      name: 'seo',
      type: 'group',
      fields: [
        { name: 'defaultTitle', type: 'text' },
        { name: 'defaultDescription', type: 'textarea' },
        { name: 'defaultImage', type: 'upload', relationTo: 'media' },
      ],
    },
  ],
};
