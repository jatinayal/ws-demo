'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { buttonVariants } from '@/components/ui/button';
import { Menu, X } from 'lucide-react';

interface HeaderProps {
  organizationName: string;
  mainMenu?: { label: string; url: string }[] | null;
  donationUrl?: string | null;
}

export function Header({ organizationName, mainMenu, donationUrl }: HeaderProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="bg-background/95 supports-[backdrop-filter]:bg-background/80 sticky top-0 z-50 w-full border-b backdrop-blur transition-all duration-300">
      <div className="container mx-auto flex h-20 items-center justify-between px-4">
        {/* Logo / Identity */}
        <Link href="/" className="group flex items-center gap-3">
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
        <nav className="hidden items-center space-x-6 md:flex">
          {mainMenu?.map((item) => (
            <Link
              key={item.label}
              href={item.url}
              className="text-foreground/80 hover:text-secondary text-sm font-medium transition-colors"
            >
              {item.label}
            </Link>
          ))}
          {donationUrl && (
            <a
              href={donationUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={buttonVariants({ variant: 'default', className: 'ml-4' })}
            >
              Donate Now
            </a>
          )}
        </nav>

        {/* Mobile Toggle */}
        <button
          className="text-foreground p-2 md:hidden"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Navigation Dropdown */}
      {isMobileMenuOpen && (
        <div className="bg-background absolute left-0 w-full space-y-4 border-t px-4 py-4 shadow-lg md:hidden">
          {mainMenu?.map((item) => (
            <Link
              key={item.label}
              href={item.url}
              className="text-foreground hover:text-secondary block text-base font-medium"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {item.label}
            </Link>
          ))}
          {donationUrl && (
            <div className="pt-2">
              <a
                href={donationUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={buttonVariants({ variant: 'default', className: 'w-full' })}
              >
                Donate Now
              </a>
            </div>
          )}
        </div>
      )}
    </header>
  );
}
