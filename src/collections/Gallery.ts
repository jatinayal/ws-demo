import type { CollectionConfig } from 'payload';
import { isContentManager, isAdmin, publicReadAccess } from '../access';

export const Gallery: CollectionConfig = {
  slug: 'gallery',
  admin: {
    group: 'Website Content',
    useAsTitle: 'title',
    defaultColumns: ['title', 'category', 'albumStatus'],
    preview: (doc) => {
      if (doc?.slug) {
        return `${process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000'}/gallery/${doc.slug}`;
      }
      return null;
    },
  },
    access: {
    read: publicReadAccess,
    create: isContentManager,
    update: isContentManager,
    delete: isAdmin,
  },
  versions: { drafts: true },
  fields: [
    { name: 'title', type: 'text', required: true },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      admin: { position: 'sidebar' },
      hooks: {
        beforeValidate: [
          ({ value, data }) => {
            if (value) return value;
            if (data?.title) {
              return data.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
            }
            return value;
          },
        ],
      },
    },
    {
      name: 'albumStatus',
      type: 'select',
      defaultValue: 'published',
      options: [
        { label: 'Published', value: 'published' },
        { label: 'Draft', value: 'draft' },
      ],
      admin: { position: 'sidebar' },
    },
    {
      name: 'category',
      type: 'select',
      required: true,
      options: [
        { label: 'Event Galleries', value: 'event' },
        { label: 'Workshop Highlights', value: 'workshop' },
        { label: 'Community Outreach', value: 'community' },
        { label: 'Women Entrepreneurs', value: 'entrepreneur' },
        { label: 'Training Programs', value: 'program' },
        { label: 'Celebrations', value: 'celebration' },
        { label: 'Impact Showcase', value: 'impact' },
      ],
      admin: { position: 'sidebar' },
    },
    { name: 'coverImage', type: 'upload', relationTo: 'media', required: true },
    { name: 'description', type: 'richText' },
    {
      name: 'images',
      type: 'array',
      fields: [
        { name: 'image', type: 'upload', relationTo: 'media', required: true },
        { name: 'caption', type: 'text' },
      ],
      required: true,
      minRows: 1,
    },
    {
      name: 'associatedEvent',
      type: 'relationship',
      relationTo: 'events',
      admin: { position: 'sidebar' },
    },
    {
      name: 'associatedProgram',
      type: 'relationship',
      relationTo: 'programs',
      admin: { position: 'sidebar' },
    },
    {
      name: 'meta',
      type: 'group',
      fields: [
        { name: 'title', type: 'text' },
        { name: 'description', type: 'textarea' },
        { name: 'image', type: 'upload', relationTo: 'media' },
      ],
      admin: { position: 'sidebar' },
    },
  ],
};
