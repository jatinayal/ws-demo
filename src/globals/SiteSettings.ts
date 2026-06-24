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
      validate: (val: string | null | undefined) => {
        if (!val) return true;
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (emailRegex.test(val)) return true;
        return 'Please enter a valid email address';
      },
    },
    {
      name: 'contactPhone',
      type: 'text',
      validate: (val: string | null | undefined) => {
        if (!val) return true;
        const phoneRegex = /^\d{10}$/;
        if (phoneRegex.test(val)) return true;
        return 'Phone number must be exactly 10 digits';
      },
      admin: {
        description:
          'Enter exactly 10 digits. The +91 prefix is added automatically on the frontend.',
      },
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
