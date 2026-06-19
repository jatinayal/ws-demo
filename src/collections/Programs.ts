import type { CollectionConfig } from 'payload';
import { isContentManager, isAdmin, publicReadAccess } from '../access';

export const Programs: CollectionConfig = {
  slug: 'programs',
  admin: {
    group: 'Website Content',
    useAsTitle: 'title',
    defaultColumns: ['title', 'status', 'updatedAt'],
    preview: (doc) => {
      if (doc?.slug) {
        return `${process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000'}/programs/${doc.slug}`;
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
  versions: {
    drafts: true,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      admin: {
        position: 'sidebar',
      },
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
      name: 'category',
      type: 'select',
      required: true,
      options: [
        { label: 'Education', value: 'education' },
        { label: 'Leadership', value: 'leadership' },
        { label: 'Entrepreneurship', value: 'entrepreneurship' },
        { label: 'Emotional Wellness', value: 'wellness' },
        { label: 'Community', value: 'community' },
      ],
      admin: { position: 'sidebar' },
    },
    {
      name: 'programStatus',
      type: 'select',
      defaultValue: 'active',
      options: [
        { label: 'Active', value: 'active' },
        { label: 'Completed', value: 'completed' },
        { label: 'Planned', value: 'planned' },
      ],
      admin: { position: 'sidebar' },
    },
    {
      name: 'coverImage',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
    {
      name: 'shortDescription',
      type: 'textarea',
      required: true,
      maxLength: 300,
    },
    {
      name: 'content',
      type: 'richText',
      required: true,
    },
    {
      name: 'objectives',
      type: 'array',
      fields: [
        { name: 'objective', type: 'text', required: true },
      ],
    },
    {
      name: 'keyActivities',
      type: 'array',
      fields: [
        { name: 'activity', type: 'text', required: true },
        { name: 'description', type: 'textarea' },
      ],
    },
    {
      name: 'impactMetrics',
      type: 'array',
      fields: [
        { name: 'label', type: 'text', required: true },
        { name: 'value', type: 'number', required: true },
        { name: 'suffix', type: 'text' },
        { name: 'icon', type: 'select', options: ['Users', 'Target', 'Star', 'Heart', 'Globe', 'Zap', 'Shield'], defaultValue: 'Star' },
      ],
    },
    {
      name: 'beneficiaryOutcomes',
      type: 'richText',
    },
    {
      name: 'gallery',
      type: 'array',
      fields: [
        { name: 'image', type: 'upload', relationTo: 'media', required: true },
      ],
    },
    {
      name: 'relatedPrograms',
      type: 'relationship',
      relationTo: 'programs',
      hasMany: true,
      admin: { position: 'sidebar' },
    },
    {
      name: 'donationUrl',
      type: 'text',
      admin: {
        description: 'Contextual donation URL for this specific program. Overrides global donation link.',
        position: 'sidebar'
      }
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
