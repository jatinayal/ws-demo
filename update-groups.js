/* eslint-disable @typescript-eslint/no-require-imports */
const fs = require('fs');
const path = require('path');

const mappings = {
  'globals/Homepage.ts': 'Website Content',
  'globals/AboutUs.ts': 'Website Content',
  'globals/ImpactPage.ts': 'Website Content',
  'globals/GetInvolved.ts': 'Website Content',
  'globals/ContactPage.ts': 'Website Content',
  'collections/Programs.ts': 'Website Content',
  'collections/Events.ts': 'Website Content',
  'collections/SuccessStories.ts': 'Website Content',
  'collections/Gallery.ts': 'Website Content',

  'collections/Volunteers.ts': 'Community Engagement',
  'collections/DonationLeads.ts': 'Community Engagement',
  'collections/ContactRequests.ts': 'Community Engagement',
  'collections/PartnershipRequests.ts': 'Community Engagement',
  'collections/EventRegistrations.ts': 'Community Engagement',
  'collections/NewsletterSubscribers.ts': 'Community Engagement',

  'collections/ImpactStatistics.ts': 'Operations',
  'collections/Partners.ts': 'Operations',

  'collections/Media.ts': 'Media Library',

  'globals/SiteSettings.ts': 'System Settings',
  'globals/Navigation.ts': 'System Settings',
  'collections/Users.ts': 'System Settings',
};

for (const [relPath, newGroup] of Object.entries(mappings)) {
  const fullPath = path.join(__dirname, 'src', relPath);
  if (fs.existsSync(fullPath)) {
    let content = fs.readFileSync(fullPath, 'utf8');

    // Specifically handle SiteSettings which has `group: 'Site Configuration'` in admin and `group: 'Site Configuration', description...` inside fields
    if (relPath === 'globals/SiteSettings.ts') {
      content = content.replace(
        /admin:\s*\{\s*group:\s*['"].*?['"]/g,
        `admin: {\n    group: '${newGroup}'`,
      );
    } else {
      content = content.replace(/group:\s*['"].*?['"]/g, `group: '${newGroup}'`);
    }
    fs.writeFileSync(fullPath, content, 'utf8');
    console.log(`Updated ${relPath} -> ${newGroup}`);
  } else {
    console.warn(`File not found: ${fullPath}`);
  }
}
