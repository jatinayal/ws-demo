import type { GlobalConfig } from 'payload';
import { isContentManager, publicReadAccess } from '../access';

export const Homepage: GlobalConfig = {
  slug: 'homepage',
  admin: {
    group: 'Website Content',
    preview: () => `${process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000'}/`,
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
        { name: 'heading', type: 'text', required: true },
        { name: 'subheading', type: 'textarea' },
        { name: 'backgroundImage', type: 'upload', relationTo: 'media' },
        {
          name: 'callsToAction',
          type: 'array',
          maxRows: 2,
          fields: [
            { name: 'label', type: 'text' },
            { name: 'url', type: 'text' },
            { name: 'variant', type: 'select', options: ['primary', 'secondary', 'outline'] },
          ],
        },
      ],
    },
    {
      name: 'aboutSection',
      type: 'group',
      fields: [
        { name: 'heading', type: 'text' },
        { name: 'content', type: 'richText' },
        { name: 'image', type: 'upload', relationTo: 'media' },
        { name: 'ctaLabel', type: 'text' },
        { name: 'ctaUrl', type: 'text' },
      ],
    },
    {
      name: 'programsSection',
      type: 'group',
      fields: [
        { name: 'heading', type: 'text', defaultValue: 'Our Featured Programs' },
        { name: 'description', type: 'textarea' },
        {
          name: 'featuredPrograms',
          type: 'relationship',
          relationTo: 'programs',
          hasMany: true,
          maxDepth: 1,
        },
      ],
    },
    {
      name: 'impactSection',
      type: 'group',
      fields: [
        { name: 'heading', type: 'text', defaultValue: 'Our Global Impact' },
        { name: 'description', type: 'textarea' },
      ],
    },
    {
      name: 'storiesSection',
      type: 'group',
      fields: [
        { name: 'heading', type: 'text', defaultValue: 'Success Stories' },
        { name: 'description', type: 'textarea' },
        {
          name: 'featuredStories',
          type: 'relationship',
          relationTo: 'success-stories',
          hasMany: true,
          maxDepth: 1,
        },
      ],
    },
    {
      name: 'eventsSection',
      type: 'group',
      fields: [
        { name: 'heading', type: 'text', defaultValue: 'Upcoming Events' },
        { name: 'description', type: 'textarea' },
      ],
    },
    {
      name: 'partnersSection',
      type: 'group',
      fields: [
        { name: 'heading', type: 'text', defaultValue: 'Our Partners & Supporters' },
        { name: 'description', type: 'textarea' },
      ],
    },
    {
      name: 'donationCta',
      type: 'group',
      fields: [
        { name: 'heading', type: 'text', defaultValue: 'Make a Difference Today' },
        { name: 'description', type: 'textarea' },
        { name: 'buttonLabel', type: 'text', defaultValue: 'Donate Now' },
        { name: 'buttonUrl', type: 'text', defaultValue: '/donate' },
      ],
    },
  ],
};
