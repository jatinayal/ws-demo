import type { Payload } from 'payload';

interface SeedOptions {
  reset?: boolean;
  environment?: string;
}

export const seedData = async (payload: Payload, options: SeedOptions = {}) => {
  const { reset = false, environment = 'development' } = options;
  console.time('seedData Complete Execution');
  payload.logger.info(`Starting deterministic seed process (env: ${environment}, reset: ${reset})...`);

  // --- RESET LOGIC ---
  if (reset) {
    payload.logger.warn('Reset flag detected. Wiping existing seeded collections...');
    // We wipe collections where we can. We only wipe items we know are seeds or just wipe everything
    // WARNING: In a real app we might only delete where `isSeed` flag is true, but since we don't have that, we'll wipe all.
    // Actually, payload.delete({ collection, where: {} }) deletes everything.
    await payload.delete({ collection: 'impact-statistics', where: {} });
    await payload.delete({ collection: 'programs', where: {} });
    await payload.delete({ collection: 'events', where: {} });
    await payload.delete({ collection: 'gallery', where: {} });
    await payload.delete({ collection: 'success-stories', where: {} });
    await payload.delete({ collection: 'partners', where: {} });
    if (environment !== 'production') {
      await payload.delete({ collection: 'volunteers', where: {} });
      await payload.delete({ collection: 'donation-leads', where: {} });
      await payload.delete({ collection: 'contact-requests', where: {} });
      await payload.delete({ collection: 'partnership-requests', where: {} });
    }
  }

  // Ensure Admin User
  let adminId;
  const existingUsers = await payload.find({ collection: 'users', where: { email: { equals: 'admin@womenssynergy.org' } }, limit: 1 });
  if (existingUsers.totalDocs === 0) {
    const admin = await payload.create({
      collection: 'users',
      data: {
        email: 'admin@womenssynergy.org',
        password: 'password123',
        name: 'Super Admin',
        roles: ['super_admin'],
      },
    });
    adminId = admin.id;
    payload.logger.info('Admin user created.');
  } else {
    adminId = existingUsers.docs[0].id;
  }

  // Ensure Media placeholder
  let mediaId;
  const existingMedia = await payload.find({ collection: 'media', where: { alt: { equals: 'Dummy Cover Image' } }, limit: 1 });
  if (existingMedia.totalDocs === 0) {
    const buffer = Buffer.from('iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=', 'base64');
    const tempMedia = await payload.create({
      collection: 'media',
      data: { alt: 'Dummy Cover Image' },
      file: { data: buffer, mimetype: 'image/png', name: 'dummy-cover.png', size: buffer.length }
    });
    mediaId = tempMedia.id;
  } else {
    mediaId = existingMedia.docs[0].id;
  }

  // --- SEED GLOBALS ---
  // Site Settings
  const siteSettings = await payload.findGlobal({ slug: 'site-settings' });
  if (!siteSettings.organizationName || reset) {
    await payload.updateGlobal({
      slug: 'site-settings',
      data: {
        organizationName: "Women's Synergy",
        contactEmail: 'contact@womenssynergy.org',
        contactPhone: '+1 800 123 4567',
        address: '123 Empowerment Blvd, NGO District',
        workingHours: 'Mon - Fri: 9:00 AM - 5:00 PM (EAT)',
        mapEmbedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d127641.13459846838!2d30.0076295!3d-1.954203!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x19dca4258ed8e797%3A0xf32b36a5411d0bc8!2sKigali%2C%20Rwanda!5e0!3m2!1sen!2sus!4v1700000000000!5m2!1sen!2sus',
        socialLinks: [
          { platform: 'Twitter', url: 'https://twitter.com/womenssynergy' },
          { platform: 'LinkedIn', url: 'https://linkedin.com/company/womenssynergy' },
        ],
        donationUrl: 'https://donate.womenssynergy.org',
      },
    });
  }

  // Navigation
  const nav = await payload.findGlobal({ slug: 'navigation' });
  if (!nav.mainMenu || nav.mainMenu.length === 0 || reset) {
    await payload.updateGlobal({
      slug: 'navigation',
      data: {
        announcementBar: { enabled: true, text: 'Join us for our Annual Gala 2026!', link: '/events' },
        mainMenu: [
          { label: 'Home', url: '/' },
          { label: 'About Us', url: '/about' },
          { label: 'Programs', url: '/programs' },
          { label: 'Impact', url: '/impact' },
          { label: 'Success Stories', url: '/success-stories' },
          { label: 'Events', url: '/events' },
          { label: 'Gallery', url: '/gallery' },
          { label: 'Get Involved', url: '/get-involved' },
          { label: 'Contact', url: '/contact' },
        ],
        footerMenu: [
          { label: 'Privacy Policy', url: '/privacy' },
          { label: 'Terms of Service', url: '/terms' },
          { label: 'Contact', url: '/contact' },
        ],
      },
    });
  }

  // Homepage
  const hp = await payload.findGlobal({ slug: 'homepage' });
  if (!hp.hero?.heading || reset) {
    await payload.updateGlobal({
      slug: 'homepage',
      data: {
        hero: {
          heading: "Empowering Women, Building the Future",
          subheading: "Join us in our mission to provide education, resources, and mentorship to women around the globe.",
          callsToAction: [
            { label: 'Our Programs', url: '/programs', variant: 'primary' },
            { label: 'Donate Now', url: '/donate', variant: 'secondary' },
          ],
        },
        aboutSection: { heading: 'Who We Are', ctaLabel: 'Learn More About Us', ctaUrl: '/about' },
        programsSection: { heading: 'Our Featured Programs', description: 'Discover how we are making a difference.' },
        impactSection: { heading: 'Our Global Impact', description: 'Numbers that represent lives changed.' },
        storiesSection: { heading: 'Success Stories', description: 'Real stories from the women whose lives have been transformed.' },
        eventsSection: { heading: 'Upcoming Events', description: 'Join us at our upcoming events.' },
        partnersSection: { heading: 'Our Partners & Supporters', description: 'We are incredibly grateful for the support.' },
        donationCta: { heading: 'Make a Difference Today', description: 'Your contribution helps us expand our reach.', buttonLabel: 'Donate Now', buttonUrl: '/donate' },
      },
    });
  }

  // --- SEED COLLECTIONS (UPSERT PATTERN) ---
  const seedProgram = async (slug: string, data: any) => {
    const existing = await payload.find({ collection: 'programs', where: { slug: { equals: slug } } });
    if (existing.totalDocs === 0) {
      const res = await payload.create({ collection: 'programs', data });
      return res.id;
    }
    return existing.docs[0].id;
  };

  const p1 = await seedProgram('global-leadership-academy', {
    title: 'Global Women Leadership Academy',
    slug: 'global-leadership-academy',
    category: 'leadership',
    programStatus: 'active',
    coverImage: mediaId as any,
    shortDescription: 'An intensive 6-month leadership program.',
    objectives: [{ objective: 'Develop executive-level communication skills.' }],
    impactMetrics: [{ label: 'Graduates', value: 2500, suffix: '+', icon: 'Target' }],
  });

  const p2 = await seedProgram('tech-entrepreneurship-incubator', {
    title: 'Tech Entrepreneurship Incubator',
    slug: 'tech-entrepreneurship-incubator',
    category: 'entrepreneurship',
    programStatus: 'active',
    coverImage: mediaId as any,
    shortDescription: 'Providing funding, mentorship, and resources for tech startups.',
    objectives: [{ objective: 'Accelerate the growth of women-led startups.' }],
    impactMetrics: [{ label: 'Startups Funded', value: 120, icon: 'Zap' }],
  });

  const seedEvent = async (slug: string, data: any) => {
    const existing = await payload.find({ collection: 'events', where: { slug: { equals: slug } } });
    if (existing.totalDocs === 0) {
      const res = await payload.create({ collection: 'events', data });
      return res.id;
    }
    return existing.docs[0].id;
  };

  const nextWeek = new Date();
  nextWeek.setDate(nextWeek.getDate() + 7);
  
  const e1 = await seedEvent('women-leadership-summit-2026', {
    title: 'Women in Leadership Annual Summit 2026',
    slug: 'women-leadership-summit-2026',
    category: 'conference',
    eventType: 'hybrid',
    eventStatus: 'upcoming',
    date: nextWeek.toISOString(),
    location: 'Kigali Convention Centre & Virtual',
    coverImage: mediaId as any,
    shortDescription: 'Join thousands of women leaders.',
    relatedPrograms: [p1 as any],
    registrationSettings: { registrationOpen: true, capacity: 500 },
  });

  const seedStory = async (slug: string, data: any) => {
    const existing = await payload.find({ collection: 'success-stories', where: { slug: { equals: slug } } });
    if (existing.totalDocs === 0) {
      const res = await payload.create({ collection: 'success-stories', data });
      return res.id;
    }
    return existing.docs[0].id;
  };

  const s1 = await seedStory('aisha-rahman-leadership-journey', {
    personName: 'Aisha Rahman',
    slug: 'aisha-rahman-leadership-journey',
    storyStatus: 'published',
    program: p1 as any,
    image: mediaId as any,
    quote: "Through the Leadership Academy, I found my voice.",
    beneficiaryDetails: { age: 32, location: 'Nairobi, Kenya', occupation: 'Cooperative Director' },
  });

  // Impact Statistics
  const seedStat = async (label: string, data: any) => {
    const existing = await payload.find({ collection: 'impact-statistics', where: { label: { equals: label } } });
    if (existing.totalDocs === 0) await payload.create({ collection: 'impact-statistics', data });
  };
  await seedStat('Women Empowered', { label: 'Women Empowered', value: 10000, suffix: '+', icon: 'Users' });
  await seedStat('Active Programs', { label: 'Active Programs', value: 15, icon: 'BookOpen' });

  // Partners
  const seedPartner = async (name: string, data: any) => {
    const existing = await payload.find({ collection: 'partners', where: { name: { equals: name } } });
    if (existing.totalDocs === 0) await payload.create({ collection: 'partners', data });
  };
  await seedPartner('Global Empowerment Fund', { name: 'Global Empowerment Fund', logo: mediaId as any, type: 'ngo' });
  await seedPartner('Tech for Good Foundation', { name: 'Tech for Good Foundation', logo: mediaId as any, type: 'corporate' });

  // CRM Data (Only if development or explicitly requested)
  if (environment !== 'production' || reset) {
    const seedCRM = async (collection: string, queryField: string, value: string, data: any) => {
      const existing = await payload.find({ collection: collection as any, where: { [queryField]: { equals: value } } });
      if (existing.totalDocs === 0) await payload.create({ collection: collection as any, data });
    };

    await seedCRM('volunteers', 'email', 'elena.martinez@example.com', {
      fullName: 'Elena Martinez', email: 'elena.martinez@example.com', phone: '+1 555-0198',
      areasOfInterest: ['mentorship', 'events'], message: 'Experience in corporate training.', status: 'pending',
    });

    await seedCRM('donation-leads', 'email', 'm.chen@example.com', {
      fullName: 'Michael Chen', email: 'm.chen@example.com', amount: 5000, frequency: 'one_time',
      message: 'Tech Incubator donation.', status: 'contacted',
    });

    await seedCRM('contact-requests', 'email', 'sarah.j@example.com', {
      name: 'Sarah Jenkins', email: 'sarah.j@example.com', subject: 'Leadership Academy', inquiryType: 'program',
      message: 'Deadline request.', status: 'new',
    });

    await seedCRM('partnership-requests', 'email', 'david.wright@innovatecorp.com', {
      organizationName: 'InnovateCorp', contactName: 'David Wright', email: 'david.wright@innovatecorp.com',
      partnershipType: 'corporate', proposal: 'Hackathon sponsorship.', status: 'new',
    });
  }

  payload.logger.info('Deterministic seeding completed successfully.');
  console.timeEnd('seedData Complete Execution');
};
