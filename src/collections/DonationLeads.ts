import type { CollectionConfig } from 'payload';
import { isPartnershipManager, isAdmin } from '../access';

export const DonationLeads: CollectionConfig = {
  slug: 'donation-leads',
  admin: {
    group: 'Community Engagement',
    useAsTitle: 'fullName',
  },
  access: {
    read: isPartnershipManager,
    create: () => true, // Public can submit
    update: isPartnershipManager,
    delete: isAdmin,
  },
  fields: [
    { name: 'fullName', type: 'text', required: true },
    { name: 'email', type: 'email', required: true },
    { name: 'amount', type: 'number', required: true },
    {
      name: 'frequency',
      type: 'select',
      options: [
        { label: 'One-time', value: 'one_time' },
        { label: 'Monthly', value: 'monthly' },
        { label: 'Yearly', value: 'yearly' },
      ],
      required: true,
    },
    { name: 'message', type: 'textarea' },
    {
      name: 'status',
      type: 'select',
      options: [
        { label: 'New', value: 'new' },
        { label: 'Contacted', value: 'contacted' },
        { label: 'Closed', value: 'closed' },
      ],
      defaultValue: 'new',
      admin: { position: 'sidebar' },
    },
  ],
};
