import type { CollectionConfig } from 'payload';
import { isPartnershipManager, isAdmin } from '../access';

export const Partners: CollectionConfig = {
  slug: 'partners',
  admin: {
    group: 'Operations',
    useAsTitle: 'name',
  },
  access: {
    read: isPartnershipManager,
    create: isPartnershipManager,
    update: isPartnershipManager,
    delete: isAdmin,
  },
  fields: [
    { name: 'name', type: 'text', required: true },
    { name: 'logo', type: 'upload', relationTo: 'media', required: true },
    { name: 'websiteUrl', type: 'text' },
    {
      name: 'type',
      type: 'select',
      options: [
        { label: 'Corporate', value: 'corporate' },
        { label: 'NGO', value: 'ngo' },
        { label: 'Government', value: 'government' },
        { label: 'Other', value: 'other' },
      ],
      required: true,
    },
  ],
};
