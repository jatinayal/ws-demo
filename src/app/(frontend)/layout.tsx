import type { Metadata } from 'next';
import { getNavigation, getSiteSettings } from '@/lib/payload';
import { constructMetadata } from '@/lib/seo';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { AnnouncementBar } from '@/components/layout/AnnouncementBar';
import { ErrorBoundary } from '@/components/shared/ErrorBoundary';
import React from 'react';

export async function generateMetadata(): Promise<Metadata> {
  return await constructMetadata();
}

export default async function FrontendLayout({ children }: { children: React.ReactNode }) {
  const [settings, navigation] = await Promise.all([getSiteSettings(), getNavigation()]);

  return (
    <>
      <ErrorBoundary name="AnnouncementBar">
        <AnnouncementBar
          enabled={navigation.announcementBar?.enabled}
          text={navigation.announcementBar?.text}
          link={navigation.announcementBar?.link}
        />
      </ErrorBoundary>
      <ErrorBoundary name="Header">
        <Header
          organizationName={settings.organizationName}
          mainMenu={navigation.mainMenu}
          donationUrl={settings.donationUrl}
        />
      </ErrorBoundary>
      <main className="flex flex-1 flex-col">
        <ErrorBoundary name="PageChildren">{children}</ErrorBoundary>
      </main>
      <ErrorBoundary name="Footer">
        <Footer
          organizationName={settings.organizationName}
          contactEmail={settings.contactEmail}
          contactPhone={settings.contactPhone}
          address={settings.address}
          footerMenu={navigation.footerMenu}
          socialLinks={settings.socialLinks}
        />
      </ErrorBoundary>
    </>
  );
}
