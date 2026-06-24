import { GlobalConfig } from 'payload';
import { isContentManager, publicReadAccess } from '../access';

export const AboutUs: GlobalConfig = {
  slug: 'about-us',
  admin: {
    group: 'Website Content',
    preview: () => `${process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000'}/about`,
  },
  label: 'About Us Page',
  access: {
    read: publicReadAccess,
    update: isContentManager,
  },
  fields: [
    {
      name: 'hero',
      type: 'group',
      fields: [
        { name: 'heading', type: 'text', required: true, defaultValue: 'Our Story' },
        { name: 'subheading', type: 'textarea' },
        { name: 'backgroundImage', type: 'upload', relationTo: 'media' },
      ],
    },
    {
      name: 'organizationOverview',
      type: 'group',
      fields: [
        { name: 'heading', type: 'text', required: true, defaultValue: 'Who We Are' },
        { name: 'content', type: 'richText', required: true },
        { name: 'image', type: 'upload', relationTo: 'media' },
      ],
    },
    {
      name: 'visionMission',
      type: 'group',
      fields: [
        { name: 'visionStatement', type: 'textarea', required: true },
        { name: 'missionStatement', type: 'textarea', required: true },
      ],
    },
    {
      name: 'coreValues',
      type: 'array',
      fields: [
        { name: 'title', type: 'text', required: true },
        { name: 'description', type: 'textarea', required: true },
        {
          name: 'icon',
          type: 'select',
          options: ['Heart', 'Users', 'Target', 'Star', 'Shield', 'Zap', 'Globe'],
          defaultValue: 'Star',
        },
      ],
    },
    {
      name: 'founderMessage',
      type: 'group',
      fields: [
        { name: 'heading', type: 'text', required: true, defaultValue: 'Message from the Founder' },
        { name: 'founderName', type: 'text', required: true },
        { name: 'founderTitle', type: 'text' },
        { name: 'image', type: 'upload', relationTo: 'media' },
        { name: 'quote', type: 'textarea' },
        { name: 'content', type: 'richText', required: true },
      ],
    },
    {
      name: 'timeline',
      type: 'array',
      labels: {
        singular: 'Milestone',
        plural: 'Milestones',
      },
      fields: [
        { name: 'year', type: 'text', required: true },
        { name: 'title', type: 'text', required: true },
        { name: 'description', type: 'textarea', required: true },
      ],
    },
    {
      name: 'futureGoals',
      type: 'group',
      fields: [
        { name: 'heading', type: 'text', required: true, defaultValue: 'Looking Forward' },
        { name: 'content', type: 'richText', required: true },
      ],
    },
  ],
};
