import type { CollectionConfig } from 'payload';
import { isContentManager, isAdmin, publicReadAccess } from '../access';

export const Events: CollectionConfig = {
  slug: 'events',
  admin: {
    group: 'Website Content',
    useAsTitle: 'title',
    defaultColumns: ['title', 'date', 'eventStatus'],
    preview: (doc) => {
      if (doc?.slug) {
        return `${process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000'}/events/${doc.slug}`;
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
              return data.title
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
      name: 'category',
      type: 'select',
      required: true,
      options: [
        { label: 'Workshop', value: 'workshop' },
        { label: 'Conference', value: 'conference' },
        { label: 'Community Program', value: 'community' },
        { label: 'Special Campaign', value: 'campaign' },
        { label: 'Webinar', value: 'webinar' },
      ],
      admin: { position: 'sidebar' },
    },
    {
      name: 'eventType',
      type: 'select',
      required: true,
      defaultValue: 'physical',
      options: [
        { label: 'Physical', value: 'physical' },
        { label: 'Virtual', value: 'virtual' },
        { label: 'Hybrid', value: 'hybrid' },
      ],
      admin: { position: 'sidebar' },
    },
    {
      name: 'eventStatus',
      type: 'select',
      options: [
        { label: 'Upcoming', value: 'upcoming' },
        { label: 'Ongoing', value: 'ongoing' },
        { label: 'Completed', value: 'completed' },
      ],
      defaultValue: 'upcoming',
      required: true,
      admin: { position: 'sidebar' },
    },
    {
      type: 'row',
      fields: [
        {
          name: 'date',
          type: 'date',
          required: true,
          admin: { date: { pickerAppearance: 'dayAndTime' } },
        },
        { name: 'endDate', type: 'date', admin: { date: { pickerAppearance: 'dayAndTime' } } },
      ],
    },
    { name: 'location', type: 'text', required: true },
    {
      name: 'virtualLink',
      type: 'text',
      admin: { condition: (data) => data.eventType === 'virtual' || data.eventType === 'hybrid' },
    },
    { name: 'coverImage', type: 'upload', relationTo: 'media', required: true },
    { name: 'shortDescription', type: 'textarea', required: true, maxLength: 300 },
    { name: 'description', type: 'richText', required: true },
    {
      name: 'schedule',
      type: 'array',
      fields: [
        {
          name: 'time',
          type: 'text',
          required: true,
          admin: { placeholder: 'e.g., 09:00 AM - 10:30 AM' },
        },
        { name: 'title', type: 'text', required: true },
        { name: 'description', type: 'textarea' },
      ],
    },
    {
      name: 'speakers',
      type: 'array',
      fields: [
        { name: 'name', type: 'text', required: true },
        { name: 'role', type: 'text', required: true },
        { name: 'image', type: 'upload', relationTo: 'media' },
        { name: 'bio', type: 'textarea' },
      ],
    },
    {
      name: 'faqs',
      type: 'array',
      fields: [
        { name: 'question', type: 'text', required: true },
        { name: 'answer', type: 'textarea', required: true },
      ],
    },
    {
      name: 'gallery',
      type: 'array',
      fields: [{ name: 'image', type: 'upload', relationTo: 'media', required: true }],
    },
    {
      name: 'relatedPrograms',
      type: 'relationship',
      relationTo: 'programs',
      hasMany: true,
      admin: { position: 'sidebar' },
    },
    {
      name: 'relatedEvents',
      type: 'relationship',
      relationTo: 'events',
      hasMany: true,
      admin: { position: 'sidebar' },
    },
    {
      name: 'registrationSettings',
      type: 'group',
      admin: { position: 'sidebar' },
      fields: [
        { name: 'registrationOpen', type: 'checkbox', defaultValue: true },
        { name: 'capacity', type: 'number' },
        {
          name: 'registrationLink',
          type: 'text',
          admin: { description: 'External link if not using native registration' },
        },
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
      admin: { position: 'sidebar' },
    },
  ],
};
