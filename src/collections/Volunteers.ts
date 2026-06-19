import type { CollectionConfig } from 'payload';
import { isVolunteerManager, isAdmin } from '../access';

export const Volunteers: CollectionConfig = {
  slug: 'volunteers',
  admin: {
    group: 'Community Engagement',
    useAsTitle: 'fullName',
    defaultColumns: ['fullName', 'email', 'status', 'createdAt'],
  },
    access: {
    read: isVolunteerManager,
    create: () => true, // Public can submit
    update: isVolunteerManager,
    delete: isAdmin,
  },
  fields: [
    { name: 'fullName', type: 'text', required: true },
    { name: 'email', type: 'email', required: true },
    { name: 'phone', type: 'text', required: true },
    { name: 'areasOfInterest', type: 'select', hasMany: true, options: [
        { label: 'Events', value: 'events' },
        { label: 'Mentorship', value: 'mentorship' },
        { label: 'Fundraising', value: 'fundraising' },
        { label: 'Admin Support', value: 'admin_support' },
        { label: 'Other', value: 'other' }
      ]
    },
    { name: 'message', type: 'textarea' },
    {
      name: 'status',
      type: 'select',
      options: [
        { label: 'Pending', value: 'pending' },
        { label: 'Contacted', value: 'contacted' },
        { label: 'Active', value: 'active' },
        { label: 'Inactive', value: 'inactive' }
      ],
      defaultValue: 'pending',
      admin: { position: 'sidebar' },
    },
  ],
};
