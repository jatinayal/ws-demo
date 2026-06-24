import type { CollectionConfig } from 'payload';
import { isContentManager, isAdmin, publicReadAccess } from '../access';

export const SuccessStories: CollectionConfig = {
  slug: 'success-stories',
  admin: {
    group: 'Website Content',
    useAsTitle: 'personName',
    defaultColumns: ['personName', 'storyStatus', 'createdAt'],
    preview: (doc) => {
      if (doc?.slug) {
        return `${process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000'}/success-stories/${doc.slug}`;
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
    { name: 'personName', type: 'text', required: true },
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
            if (data?.personName) {
              return data.personName
                .toLowerCase()
                .replace(/[^a-z0-9]+/g, '-')
                .replace(/(^-|-$)+/g, '');
            }
            return value;
          },
        ],
      },
    },
    {
      name: 'storyStatus',
      type: 'select',
      defaultValue: 'published',
      options: [
        { label: 'Published', value: 'published' },
        { label: 'Archived', value: 'archived' },
      ],
      admin: { position: 'sidebar' },
    },
    {
      name: 'program',
      type: 'relationship',
      relationTo: 'programs',
      admin: { position: 'sidebar' },
    },
    { name: 'image', type: 'upload', relationTo: 'media', required: true },
    { name: 'quote', type: 'textarea', required: true },
    { name: 'story', type: 'richText', required: true },
    {
      name: 'beneficiaryDetails',
      type: 'group',
      fields: [
        { name: 'age', type: 'number' },
        { name: 'location', type: 'text' },
        { name: 'occupation', type: 'text' },
      ],
      admin: { position: 'sidebar' },
    },
    {
      name: 'impactOutcomes',
      type: 'array',
      fields: [
        { name: 'label', type: 'text', required: true },
        { name: 'value', type: 'text', required: true },
        { name: 'suffix', type: 'text' },
      ],
    },
    {
      name: 'mediaGallery',
      type: 'array',
      fields: [{ name: 'image', type: 'upload', relationTo: 'media', required: true }],
    },
    {
      name: 'relatedStories',
      type: 'relationship',
      relationTo: 'success-stories',
      hasMany: true,
      admin: { position: 'sidebar' },
    },
    {
      name: 'donationUrl',
      type: 'text',
      admin: {
        description: 'Contextual donation URL for this specific story.',
        position: 'sidebar',
      },
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
