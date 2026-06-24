'use client';

import React, { useEffect, useState, useCallback } from 'react';
import { usePathname } from 'next/navigation';

const COLLECTIONS = [
  'event-registrations',
  'volunteers',
  'donation-leads',
  'contact-requests',
  'partnership-requests',
  'newsletter-subscribers',
];

export const NotificationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const pathname = usePathname();
  const [counts, setCounts] = useState<Record<string, number>>({});

  const fetchCounts = useCallback(async () => {
    // Only run in the browser
    if (typeof window === 'undefined') return;

    // Check if we are inside the admin panel
    if (!pathname?.startsWith('/admin')) return;

    const newCounts: Record<string, number> = {};
    for (const slug of COLLECTIONS) {
      // If currently on the page, reset lastViewed and skip fetching
      if (pathname === `/admin/collections/${slug}`) {
        localStorage.setItem(`lastViewed_${slug}`, new Date().toISOString());
        newCounts[slug] = 0;
        continue;
      }

      let lastViewed = localStorage.getItem(`lastViewed_${slug}`);
      if (!lastViewed) {
        // Default to 24 hours ago for first time
        const date = new Date();
        date.setDate(date.getDate() - 1);
        lastViewed = date.toISOString();
        localStorage.setItem(`lastViewed_${slug}`, lastViewed);
      }

      try {
        const res = await fetch(
          `/api/${slug}?where[createdAt][greater_than]=${lastViewed}&limit=0`,
        );
        if (res.ok) {
          const data = await res.json();
          newCounts[slug] = data.totalDocs || 0;
        }
      } catch {
        // Ignore errors to prevent console spam
      }
    }
    setCounts(newCounts);
  }, [pathname]);

  // Polling
  useEffect(() => {
    const initialTimer = setTimeout(() => {
      fetchCounts();
    }, 100);
    const interval = setInterval(fetchCounts, 15000); // 15 seconds
    return () => {
      clearTimeout(initialTimer);
      clearInterval(interval);
    };
  }, [fetchCounts]);

  // DOM Injection for Badges
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const updateDOM = () => {
      COLLECTIONS.forEach((slug) => {
        // Payload creates links with href matching the collection URL
        const link = document.querySelector(`a[href="/admin/collections/${slug}"]`);
        if (link) {
          const count = counts[slug] || 0;
          let badge = link.querySelector('.nav-notification-badge') as HTMLElement;

          if (!badge && count > 0) {
            badge = document.createElement('span');
            badge.className = 'nav-notification-badge';
            Object.assign(badge.style, {
              backgroundColor: '#E56A2D', // Brand Primary
              color: 'white',
              fontSize: '11px',
              fontWeight: 'bold',
              padding: '2px 8px',
              borderRadius: '9999px',
              marginLeft: 'auto',
              lineHeight: '1.2',
              display: 'inline-block',
              boxShadow: '0 2px 4px rgba(229, 106, 45, 0.2)',
            });

            // Adjust link to handle the badge properly without breaking Payload's layout
            (link as HTMLElement).style.display = 'flex';
            (link as HTMLElement).style.alignItems = 'center';
            (link as HTMLElement).style.justifyContent = 'space-between';
            link.appendChild(badge);
          }

          if (badge) {
            if (count > 0) {
              badge.textContent = `+${count}`;
              badge.style.display = 'inline-block';
            } else {
              badge.style.display = 'none';
            }
          }
        }
      });
    };

    updateDOM();

    // Setup MutationObserver to re-apply badges if Payload re-renders the Nav
    const observer = new MutationObserver(() => {
      updateDOM();
    });

    const navElement = document.querySelector('nav') || document.body;
    observer.observe(navElement, { childList: true, subtree: true });

    return () => observer.disconnect();
  }, [counts]);

  return <>{children}</>;
};
