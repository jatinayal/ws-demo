import type { CollectionConfig } from 'payload';
import { isVolunteerManager, isAdmin } from '../access';

export const NewsletterSubscribers: CollectionConfig = {
  slug: 'newsletter-subscribers',
  admin: {
    group: 'Community Engagement',
    useAsTitle: 'email',
  },
    access: {
    read: isVolunteerManager,
    create: () => true, // Public can submit
    update: isVolunteerManager,
    delete: isAdmin,
  },
  fields: [
    { name: 'email', type: 'email', required: true, unique: true },
    {
      name: 'status',
      type: 'select',
      options: [
        { label: 'Subscribed', value: 'subscribed' },
        { label: 'Unsubscribed', value: 'unsubscribed' }
      ],
      defaultValue: 'subscribed',
    },
  ],
};
