import type { CollectionConfig } from 'payload';
import { isVolunteerManager, isAdmin } from '../access';

export const EventRegistrations: CollectionConfig = {
  slug: 'event-registrations',
  admin: {
    group: 'Community Engagement',
    useAsTitle: 'name',
    defaultColumns: ['name', 'email', 'event', 'status', 'createdAt'],
  },
    access: {
    read: isVolunteerManager,
    create: () => true, // Public can submit
    update: isVolunteerManager,
    delete: isAdmin,
  },
  fields: [
    {
      name: 'event',
      type: 'relationship',
      relationTo: 'events',
      required: true,
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'name',
      type: 'text',
      required: true,
    },
    {
      name: 'email',
      type: 'email',
      required: true,
    },
    {
      name: 'phone',
      type: 'text',
    },
    {
      name: 'organization',
      type: 'text',
    },
    {
      name: 'specialRequirements',
      type: 'textarea',
      admin: {
        description: 'Dietary requirements, accessibility needs, etc.',
      },
    },
    {
      name: 'status',
      type: 'select',
      defaultValue: 'pending',
      options: [
        { label: 'Pending', value: 'pending' },
        { label: 'Approved', value: 'approved' },
        { label: 'Rejected', value: 'rejected' },
        { label: 'Attended', value: 'attended' },
        { label: 'No Show', value: 'no_show' },
      ],
      admin: {
        position: 'sidebar',
      },
    },
  ],
};
