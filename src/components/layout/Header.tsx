'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { buttonVariants } from '@/components/ui/button';
import { Menu, X } from 'lucide-react';

interface HeaderProps {
  organizationName: string;
  mainMenu?: { label: string; url: string }[] | null;
  donationUrl?: string | null;
}

export function Header({ organizationName, mainMenu, donationUrl }: HeaderProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname() || '';

  // Extract Event link and shorten labels for compactness
  const eventLink = (mainMenu || []).find((item) => item.label.toLowerCase().includes('event'));
  const eventUrl = eventLink ? eventLink.url : '/events';

  const processedMenu = (mainMenu || [])
    .filter((item) => !item.label.toLowerCase().includes('event'))
    .map((item) => {
      const lowerLabel = item.label.toLowerCase();
      let newLabel = item.label;
      if (lowerLabel === 'about us') newLabel = 'About';
      if (lowerLabel === 'our programs') newLabel = 'Programs';
      if (lowerLabel === 'success stories') newLabel = 'Stories';
      if (lowerLabel === 'impact statistics') newLabel = 'Impact';

      return { ...item, label: newLabel };
    });

  const checkActive = (url: string) => {
    if (url === '/') return pathname === '/';
    return pathname === url || pathname.startsWith(`${url}/`);
  };

  return (
    <header className="bg-background/95 supports-[backdrop-filter]:bg-background/80 sticky top-0 z-50 w-full border-b backdrop-blur transition-all duration-300">
      <div className="container mx-auto flex h-20 items-center justify-between px-4">
        {/* Logo / Identity */}
        <Link href="/" className="group flex shrink-0 items-center gap-3">
          <div className="relative h-10 w-10 overflow-hidden rounded-md transition-transform duration-300 group-hover:scale-105">
            <Image
              src="/logo.png"
              alt={`${organizationName} Logo`}
              fill
              className="object-contain"
            />
          </div>
          <span className="from-secondary to-secondary/80 bg-gradient-to-r bg-clip-text text-xl font-bold tracking-tight text-transparent md:text-2xl">
            {organizationName}
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden items-center space-x-6 lg:flex">
          {processedMenu.map((item) => {
            const isActive = checkActive(item.url);
            return (
              <Link
                key={item.label}
                href={item.url}
                className={`relative py-2 text-sm font-medium transition-colors hover:text-[#E56A2D] ${
                  isActive ? 'text-[#E56A2D]' : 'text-foreground/80'
                }`}
              >
                {item.label}
                {/* Active Underline */}
                <span
                  className={`absolute bottom-0 left-0 h-0.5 rounded-full bg-[#E56A2D] transition-all duration-300 ${
                    isActive ? 'w-full opacity-100' : 'w-0 opacity-0'
                  }`}
                />
              </Link>
            );
          })}

          <div className="border-border flex items-center gap-3 border-l pl-4">
            <Link
              href={eventUrl}
              className={buttonVariants({
                variant: 'outline',
                className:
                  'text-primary border-primary hover:bg-primary/90 hover:text-primary-foreground shadow-sm transition-all hover:border-transparent',
              })}
            >
              Attend Event
            </Link>
            {donationUrl && (
              <a
                href={donationUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={buttonVariants({
                  variant: 'default',
                  className: 'shadow-sm transition-shadow hover:shadow-md',
                })}
              >
                Donate Now
              </a>
            )}
          </div>
        </nav>

        {/* Mobile Toggle */}
        <button
          className="text-foreground p-2 lg:hidden"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Navigation Dropdown */}
      {isMobileMenuOpen && (
        <div className="bg-background absolute left-0 w-full border-t shadow-lg lg:hidden">
          <div className="space-y-2 px-4 py-4">
            {processedMenu.map((item) => {
              const isActive = checkActive(item.url);
              return (
                <Link
                  key={item.label}
                  href={item.url}
                  className={`block rounded-lg px-4 py-3 text-base font-medium transition-colors ${
                    isActive
                      ? 'bg-[#E56A2D]/10 text-[#E56A2D]'
                      : 'text-foreground hover:bg-accent/5 hover:text-[#E56A2D]'
                  }`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.label}
                </Link>
              );
            })}
          </div>
          <div className="bg-muted/20 space-y-3 border-t px-4 pt-2 pb-6">
            <Link
              href={eventUrl}
              onClick={() => setIsMobileMenuOpen(false)}
              className={buttonVariants({
                variant: 'outline',
                className:
                  'text-primary border-primary hover:bg-primary/90 hover:text-primary-foreground h-12 w-full text-base transition-all hover:border-transparent',
              })}
            >
              Attend Event
            </Link>
            {donationUrl && (
              <a
                href={donationUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setIsMobileMenuOpen(false)}
                className={buttonVariants({
                  variant: 'default',
                  className: 'h-12 w-full text-base',
                })}
              >
                Donate Now
              </a>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
