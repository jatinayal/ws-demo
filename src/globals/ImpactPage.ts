import type { GlobalConfig } from 'payload';
import { isContentManager, publicReadAccess } from '../access';

export const ImpactPage: GlobalConfig = {
  slug: 'impact-page',
  admin: {
    group: 'Website Content',
    preview: () => `${process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000'}/impact`,
  },
  access: {
    read: publicReadAccess,
    update: isContentManager,
  },
  fields: [
    {
      name: 'hero',
      type: 'group',
      fields: [
        { name: 'heading', type: 'text', required: true, defaultValue: 'Our Global Impact' },
        {
          name: 'subheading',
          type: 'textarea',
          required: true,
          defaultValue: 'Measurable outcomes of our mission to empower women.',
        },
        { name: 'coverImage', type: 'upload', relationTo: 'media' },
      ],
    },
    {
      name: 'annualReport',
      type: 'group',
      fields: [
        { name: 'heading', type: 'text', defaultValue: 'Latest Annual Report' },
        { name: 'description', type: 'textarea' },
        { name: 'reportFile', type: 'upload', relationTo: 'media' },
        { name: 'downloadLabel', type: 'text', defaultValue: 'Download Report' },
      ],
    },
    {
      name: 'geographicReach',
      type: 'group',
      fields: [
        { name: 'heading', type: 'text', defaultValue: 'Where We Work' },
        { name: 'description', type: 'textarea' },
        {
          name: 'regions',
          type: 'array',
          fields: [
            { name: 'regionName', type: 'text', required: true },
            { name: 'beneficiariesCount', type: 'number', required: true },
          ],
        },
        { name: 'mapImage', type: 'upload', relationTo: 'media' },
      ],
    },
    {
      name: 'communityTransformation',
      type: 'group',
      fields: [
        { name: 'heading', type: 'text', defaultValue: 'Community Transformation' },
        { name: 'content', type: 'richText' },
        {
          name: 'metrics',
          type: 'array',
          fields: [
            { name: 'label', type: 'text', required: true },
            { name: 'value', type: 'number', required: true },
            { name: 'suffix', type: 'text' },
            {
              name: 'icon',
              type: 'select',
              options: ['Users', 'Target', 'Star', 'Heart', 'Globe', 'Zap', 'Shield', 'TrendingUp'],
              defaultValue: 'TrendingUp',
            },
          ],
        },
      ],
    },
    {
      name: 'featuredSuccessStories',
      type: 'group',
      fields: [
        { name: 'heading', type: 'text', defaultValue: 'Voices of Impact' },
        { name: 'stories', type: 'relationship', relationTo: 'success-stories', hasMany: true },
      ],
    },
    {
      name: 'meta',
      type: 'group',
      fields: [
        { name: 'title', type: 'text' },
        { name: 'description', type: 'textarea' },
        { name: 'image', type: 'upload', relationTo: 'media' },
      ],
    },
  ],
};
