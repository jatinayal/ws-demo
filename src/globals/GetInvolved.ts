import type { GlobalConfig } from 'payload';
import { isContentManager, publicReadAccess } from '../access';

export const GetInvolved: GlobalConfig = {
  slug: 'get-involved', 
  admin: {
    group: 'Website Content',
    preview: () => `${process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000'}/get-involved`,
  },
    access: {
    read: publicReadAccess,
    update: isContentManager,
  },
  fields: [
    {
      name: 'hero',
      type: 'group',
      fields: [
        { name: 'title', type: 'text', required: true, defaultValue: 'Take Action. Drive Change.' },
        { name: 'subtitle', type: 'textarea', required: true, defaultValue: "Join Women's Synergy in our mission to empower women and transform communities. Explore how you can contribute." },
        { name: 'backgroundImage', type: 'upload', relationTo: 'media' },
      ],
    },
    {
      name: 'volunteerSection',
      type: 'group',
      fields: [
        { name: 'title', type: 'text', required: true, defaultValue: 'Volunteer With Us' },
        { name: 'description', type: 'textarea', required: true, defaultValue: 'Offer your time and expertise to support our grassroots initiatives, mentorship programs, and community events.' },
        { name: 'benefits', type: 'array', fields: [{ name: 'benefit', type: 'text' }] },
      ],
    },
    {
      name: 'partnerSection',
      type: 'group',
      fields: [
        { name: 'title', type: 'text', required: true, defaultValue: 'Become a Partner' },
        { name: 'description', type: 'textarea', required: true, defaultValue: 'Collaborate with us to amplify impact through strategic alignments, CSR programs, and shared resources.' },
        { name: 'partnerTypes', type: 'array', fields: [
          { name: 'type', type: 'text' },
          { name: 'description', type: 'textarea' }
        ]},
      ],
    },
    {
      name: 'donateSection',
      type: 'group',
      fields: [
        { name: 'title', type: 'text', required: true, defaultValue: 'Fund the Future' },
        { name: 'description', type: 'textarea', required: true, defaultValue: 'Your financial contributions directly support education, entrepreneurship, and essential resources for women.' },
      ],
    },
    {
      name: 'faqs',
      type: 'array',
      fields: [
        { name: 'question', type: 'text', required: true },
        { name: 'answer', type: 'textarea', required: true },
      ],
    },
  ],
};
