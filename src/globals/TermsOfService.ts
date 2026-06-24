import type { GlobalConfig } from 'payload';
import { isContentManager, publicReadAccess } from '../access';

export const TermsOfService: GlobalConfig = {
  slug: 'terms-of-service',
  admin: {
    group: 'Legal',
    preview: () =>
      `${process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000'}/terms-of-service`,
  },
  access: {
    read: publicReadAccess,
    update: isContentManager,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      defaultValue: 'Terms of Service',
    },
    {
      name: 'lastUpdated',
      type: 'date',
      required: true,
    },
    {
      name: 'sections',
      type: 'array',
      required: true,
      minRows: 1,
      fields: [
        {
          name: 'title',
          label: 'Section Title / Policy Type',
          type: 'text',
          required: true,
        },
        {
          name: 'content',
          type: 'richText',
          required: true,
        },
      ],
    },
    {
      name: 'seo',
      type: 'group',
      fields: [
        { name: 'title', type: 'text' },
        { name: 'description', type: 'textarea' },
      ],
    },
  ],
};
