/* eslint-disable @typescript-eslint/no-require-imports */
const fs = require('fs');
const path = require('path');

const groupings = {
  // Core Content
  'Programs.ts': 'Core Content',
  'Events.ts': 'Core Content',
  'EventRegistrations.ts': 'Core Content',
  'SuccessStories.ts': 'Core Content',
  'Gallery.ts': 'Core Content',

  // CRM & Engagement
  'Volunteers.ts': 'CRM & Engagement',
  'DonationLeads.ts': 'CRM & Engagement',
  'ContactRequests.ts': 'CRM & Engagement',
  'PartnershipRequests.ts': 'CRM & Engagement',
  'NewsletterSubscribers.ts': 'CRM & Engagement',

  // Platform Management
  'Users.ts': 'Platform Management',
  'Media.ts': 'Platform Management',
  'ImpactStatistics.ts': 'Platform Management',
  'Partners.ts': 'Platform Management',

  // Site Pages & Configuration
  'SiteSettings.ts': 'Site Configuration',
  'Homepage.ts': 'Site Pages',
  'Navigation.ts': 'Site Configuration',
  'AboutUs.ts': 'Site Pages',
  'ImpactPage.ts': 'Site Pages',
  'GetInvolved.ts': 'Site Pages',
  'ContactPage.ts': 'Site Pages',
};

const dirs = ['src/collections', 'src/globals'];

dirs.forEach((dir) => {
  const fullPath = path.join(__dirname, dir);
  if (!fs.existsSync(fullPath)) return;

  const files = fs.readdirSync(fullPath);
  files.forEach((file) => {
    if (file.endsWith('.ts') && groupings[file]) {
      const filePath = path.join(fullPath, file);
      let content = fs.readFileSync(filePath, 'utf-8');
      const group = groupings[file];

      // Check if admin block exists
      if (content.includes('admin: {')) {
        // Only inject if group is not already there
        if (!content.includes('group:')) {
          content = content.replace('admin: {', `admin: {\n    group: '${group}',`);
        }
      } else {
        // Inject admin block after slug:
        content = content.replace(
          /slug:\s*['"][^'"]+['"],/,
          `$& \n  admin: {\n    group: '${group}',\n  },`,
        );
      }

      fs.writeFileSync(filePath, content, 'utf-8');
    }
  });
});
