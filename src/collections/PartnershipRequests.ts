import type { CollectionConfig } from 'payload';
import { isPartnershipManager, isAdmin } from '../access';

export const PartnershipRequests: CollectionConfig = {
  slug: 'partnership-requests',
  admin: {
    group: 'Community Engagement',
    useAsTitle: 'organizationName',
    defaultColumns: ['organizationName', 'contactName', 'partnershipType', 'status', 'createdAt'],
  },
    access: {
    read: isPartnershipManager,
    create: () => true, // Public can submit
    update: isPartnershipManager,
    delete: isAdmin,
  },
  fields: [
    { name: 'organizationName', type: 'text', required: true },
    { name: 'contactName', type: 'text', required: true },
    { name: 'email', type: 'email', required: true },
    { name: 'phone', type: 'text' },
    {
      name: 'partnershipType',
      type: 'select',
      options: [
        { label: 'Corporate Partnership', value: 'corporate' },
        { label: 'NGO Collaboration', value: 'ngo' },
        { label: 'Institutional / Academic', value: 'institutional' },
        { label: 'CSR Engagement', value: 'csr' },
        { label: 'Sponsorship', value: 'sponsorship' },
        { label: 'Other', value: 'other' }
      ],
      required: true,
    },
    { name: 'proposal', type: 'textarea', required: true },
    {
      name: 'status',
      type: 'select',
      options: [
        { label: 'New Inquiry', value: 'new' },
        { label: 'In Review', value: 'review' },
        { label: 'Contacted', value: 'contacted' },
        { label: 'Partnership Established', value: 'established' },
        { label: 'Declined', value: 'declined' }
      ],
      defaultValue: 'new',
      admin: { position: 'sidebar' },
    },
  ],
};
