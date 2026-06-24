import type { GlobalConfig } from 'payload';
import { isContentManager, publicReadAccess } from '../access';

export const ContactPage: GlobalConfig = {
  slug: 'contact-page',
  admin: {
    group: 'Website Content',
    preview: () => `${process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000'}/contact`,
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
        { name: 'title', type: 'text', required: true, defaultValue: 'Get in Touch' },
        {
          name: 'subtitle',
          type: 'textarea',
          required: true,
          defaultValue:
            "We'd love to hear from you. Whether you have a question about our programs, want to volunteer, or are interested in partnering with us, our team is ready to answer all your questions.",
        },
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
