'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Button, buttonVariants } from '@/components/ui/button';
import { Menu, X } from 'lucide-react';

interface HeaderProps {
  organizationName: string;
  mainMenu?: { label: string; url: string }[] | null;
  donationUrl?: string | null;
}

export function Header({ organizationName, mainMenu, donationUrl }: HeaderProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80 transition-all duration-300">
      <div className="container mx-auto px-4 h-20 flex items-center justify-between">
        {/* Logo / Identity */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="relative w-10 h-10 overflow-hidden rounded-md transition-transform duration-300 group-hover:scale-105">
            <Image src="/logo.png" alt={`${organizationName} Logo`} fill className="object-contain" />
          </div>
          <span className="font-bold text-xl md:text-2xl tracking-tight bg-gradient-to-r from-secondary to-secondary/80 bg-clip-text text-transparent">{organizationName}</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          {mainMenu?.map((item) => (
            <Link
              key={item.label}
              href={item.url}
              className="text-sm font-medium text-foreground/80 hover:text-secondary transition-colors"
            >
              {item.label}
            </Link>
          ))}
          {donationUrl && (
            <a href={donationUrl} target="_blank" rel="noopener noreferrer" className={buttonVariants({ variant: 'default', className: "ml-4" })}>
              Donate Now
            </a>
          )}
        </nav>

        {/* Mobile Toggle */}
        <button
          className="md:hidden p-2 text-foreground"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Navigation Dropdown */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-t bg-background px-4 py-4 space-y-4 shadow-lg absolute w-full left-0">
          {mainMenu?.map((item) => (
            <Link
              key={item.label}
              href={item.url}
              className="block text-base font-medium text-foreground hover:text-secondary"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {item.label}
            </Link>
          ))}
          {donationUrl && (
            <div className="pt-2">
              <a href={donationUrl} target="_blank" rel="noopener noreferrer" className={buttonVariants({ variant: 'default', className: "w-full" })}>
                Donate Now
              </a>
            </div>
          )}
        </div>
      )}
    </header>
  );
}
