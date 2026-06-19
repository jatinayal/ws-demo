import type { CollectionConfig } from 'payload';
import { isVolunteerManager, isAdmin } from '../access';

export const ContactRequests: CollectionConfig = {
  slug: 'contact-requests',
  admin: {
    group: 'Community Engagement',
    useAsTitle: 'name',
  },
    access: {
    read: isVolunteerManager,
    create: () => true, // Public can submit
    update: isVolunteerManager,
    delete: isAdmin,
  },
  fields: [
    { name: 'name', type: 'text', required: true },
    { name: 'email', type: 'email', required: true },
    { name: 'phone', type: 'text' },
    {
      name: 'inquiryType',
      type: 'select',
      required: true,
      options: [
        { label: 'General Inquiry', value: 'general' },
        { label: 'Volunteer Interest', value: 'volunteer' },
        { label: 'Partnership Inquiry', value: 'partnership' },
        { label: 'Sponsorship Opportunity', value: 'sponsorship' },
        { label: 'Donation Question', value: 'donation' },
        { label: 'Media Inquiry', value: 'media' },
        { label: 'Program Information Request', value: 'program' },
      ],
      admin: { position: 'sidebar' },
    },
    { name: 'subject', type: 'text', required: true },
    { name: 'message', type: 'textarea', required: true },
    {
      name: 'status',
      type: 'select',
      options: [
        { label: 'New', value: 'new' },
        { label: 'Under Review', value: 'under_review' },
        { label: 'Responded', value: 'responded' },
        { label: 'Resolved', value: 'resolved' },
        { label: 'Spam/Archived', value: 'archived' }
      ],
      defaultValue: 'new',
      admin: { position: 'sidebar' },
    },
    {
      name: 'adminNotes',
      type: 'textarea',
      admin: { position: 'sidebar' },
    },
  ],
};
