import type { CollectionConfig } from 'payload';
import { isContentManager, isAdmin, publicReadAccess } from '../access';

export const Media: CollectionConfig = {
  slug: 'media',
  access: {
    read: publicReadAccess,
    create: isContentManager,
    update: isContentManager,
    delete: isAdmin,
  },
  admin: {
    group: 'Media Library',
    useAsTitle: 'alt',
  },
  upload: {
    staticDir: 'media',
    imageSizes: [
      {
        name: 'thumbnail',
        width: 400,
        height: 300,
        position: 'centre',
      },
      {
        name: 'card',
        width: 768,
        height: 1024,
        position: 'centre',
      },
      {
        name: 'tablet',
        width: 1024,
        height: undefined,
        position: 'centre',
      },
    ],
    adminThumbnail: 'thumbnail',
    mimeTypes: ['image/*'],
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      required: true,
      admin: {
        description: 'Alternative text is required for accessibility and SEO.',
      },
    },
  ],
};
