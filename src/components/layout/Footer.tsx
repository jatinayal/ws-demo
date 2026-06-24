import React from 'react';
import Link from 'next/link';

import Image from 'next/image';
import { formatPhoneNumber } from '@/lib/utils';
import { FooterNewsletterForm } from './FooterNewsletterForm';

interface FooterProps {
  organizationName: string;
  contactEmail?: string | null;
  contactPhone?: string | null;
  address?: string | null;
  footerMenu?: { label: string; url: string }[] | null;
  socialLinks?: { platform: string; url: string; id?: string | null }[] | null;
}

export function Footer({
  organizationName,
  contactEmail,
  contactPhone,
  address,
  footerMenu,
  socialLinks,
}: FooterProps) {
  return (
    <footer className="bg-card text-card-foreground border-t pt-20 pb-8">
      <div className="container mx-auto mb-16 grid grid-cols-1 gap-12 px-4 md:grid-cols-4">
        <div className="flex flex-col items-start md:col-span-1">
          <Link href="/" className="group mb-6 flex items-center gap-3">
            <div className="bg-background relative h-12 w-12 overflow-hidden rounded-md transition-transform duration-300 group-hover:scale-105">
              <Image
                src="/logo.png"
                alt={`${organizationName} Logo`}
                fill
                className="object-contain"
              />
            </div>
            <span className="text-xl font-bold tracking-tight">{organizationName}</span>
          </Link>
          <p className="text-muted-foreground mb-4 max-w-xs text-sm">
            Empowering women worldwide to achieve their full potential through education, resources,
            and community.
          </p>
        </div>

        <div>
          <h4 className="mb-4 font-semibold">Quick Links</h4>
          <ul className="text-muted-foreground space-y-2 text-sm">
            {footerMenu?.map((item) => (
              <li key={item.label}>
                <Link href={item.url} className="hover:text-secondary transition-colors">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="mb-4 font-semibold">Contact Us</h4>
          <ul className="text-muted-foreground space-y-2 text-sm">
            {contactEmail && (
              <li>
                Email:{' '}
                <a href={`mailto:${contactEmail}`} className="hover:text-secondary">
                  {contactEmail}
                </a>
              </li>
            )}
            {contactPhone && (
              <li>
                Phone:{' '}
                <a href={`tel:${contactPhone.replace(/\D/g, '')}`} className="hover:text-secondary">
                  {formatPhoneNumber(contactPhone)}
                </a>
              </li>
            )}
            {address && <li>Address: {address}</li>}
          </ul>
        </div>

        <div>
          <h4 className="mb-4 font-semibold">Stay Connected</h4>
          <div className="mb-6 flex space-x-4">
            {socialLinks?.map((social) => (
              <a
                key={social.platform}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-secondary transition-colors"
              >
                {social.platform}
              </a>
            ))}
          </div>
          <FooterNewsletterForm />
        </div>
      </div>
      <div className="border-border/50 text-muted-foreground container mx-auto flex flex-col items-center justify-between gap-4 border-t px-4 pt-8 text-sm md:flex-row">
        <div>
          &copy; {new Date().getFullYear()} {organizationName}. All rights reserved.
        </div>
        <div className="flex gap-4">
          <Link href="/privacy-policy" className="hover:text-secondary transition-colors">
            Privacy Policy
          </Link>
          <Link href="/terms-of-service" className="hover:text-secondary transition-colors">
            Terms of Service
          </Link>
        </div>
      </div>
    </footer>
  );
}
