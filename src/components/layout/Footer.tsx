import React from 'react';
import Link from 'next/link';

import Image from 'next/image';

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
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
        <div className="md:col-span-1 flex flex-col items-start">
          <Link href="/" className="flex items-center gap-3 mb-6 group">
            <div className="relative w-12 h-12 overflow-hidden rounded-md transition-transform duration-300 group-hover:scale-105 bg-background">
              <Image src="/logo.png" alt={`${organizationName} Logo`} fill className="object-contain" />
            </div>
            <span className="text-xl font-bold tracking-tight">{organizationName}</span>
          </Link>
          <p className="text-sm text-muted-foreground mb-4 max-w-xs">
            Empowering women worldwide to achieve their full potential through education, resources, and community.
          </p>
        </div>
        
        <div>
          <h4 className="font-semibold mb-4">Quick Links</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
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
          <h4 className="font-semibold mb-4">Contact Us</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            {contactEmail && <li>Email: <a href={`mailto:${contactEmail}`} className="hover:text-secondary">{contactEmail}</a></li>}
            {contactPhone && <li>Phone: <a href={`tel:${contactPhone}`} className="hover:text-secondary">{contactPhone}</a></li>}
            {address && <li>Address: {address}</li>}
          </ul>
        </div>

        <div>
          <h4 className="font-semibold mb-4">Stay Connected</h4>
          <div className="flex space-x-4 mb-6">
            {socialLinks?.map((social) => (
              <a key={social.platform} href={social.url} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-secondary transition-colors">
                {social.platform}
              </a>
            ))}
          </div>
          {/* Newsletter Subscribe would go here */}
          <div className="text-sm text-muted-foreground">
            Subscribe to our newsletter to receive updates on our programs and impact.
          </div>
        </div>
      </div>
      <div className="container mx-auto px-4 pt-8 border-t border-border/50 text-center text-sm text-muted-foreground">
        &copy; {new Date().getFullYear()} {organizationName}. All rights reserved.
      </div>
    </footer>
  );
}
