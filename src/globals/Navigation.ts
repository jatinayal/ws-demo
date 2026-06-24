import type { GlobalConfig } from 'payload';
import { isContentManager, publicReadAccess } from '../access';

export const Navigation: GlobalConfig = {
  slug: 'navigation',
  admin: {
    group: 'System Settings',
  },
  access: {
    read: publicReadAccess,
    update: isContentManager,
  },
  fields: [
    {
      name: 'announcementBar',
      type: 'group',
      fields: [
        { name: 'enabled', type: 'checkbox', defaultValue: false },
        { name: 'text', type: 'text' },
        { name: 'link', type: 'text' },
      ],
    },
    {
      name: 'mainMenu',
      type: 'array',
      fields: [
        { name: 'label', type: 'text', required: true },
        { name: 'url', type: 'text', required: true },
      ],
    },
    {
      name: 'footerMenu',
      type: 'array',
      fields: [
        { name: 'label', type: 'text', required: true },
        { name: 'url', type: 'text', required: true },
      ],
    },
  ],
};
