import type { CollectionConfig } from 'payload';
import { isContentManager, isAdmin, publicReadAccess } from '../access';

export const ImpactStatistics: CollectionConfig = {
  slug: 'impact-statistics',
  admin: {
    group: 'Operations',
    useAsTitle: 'label',
  },
    access: {
    read: publicReadAccess,
    create: isContentManager,
    update: isContentManager,
    delete: isAdmin,
  },
  fields: [
    { name: 'label', type: 'text', required: true },
    { name: 'value', type: 'number', required: true },
    { name: 'prefix', type: 'text' },
    { name: 'suffix', type: 'text' },
    { name: 'icon', type: 'text', admin: { description: 'Lucide icon name (e.g. Users, Heart)' } },
  ],
};
