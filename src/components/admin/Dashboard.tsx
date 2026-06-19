import React from 'react';
import { getPayload, CollectionConfig, GlobalConfig, PayloadRequest } from 'payload';
import configPromise from '@payload-config';
import { headers } from 'next/headers';
import {
  Activity,
  BookOpen,
  Calendar,
  Image as ImageIcon,
  Users,
  MessageSquare,
  HeartHandshake,
  Briefcase,
  Plus,
  ArrowRight,
  FileText,
  Settings,
  LayoutDashboard,
  Globe,
  FileImage,
  Layers,
} from 'lucide-react';
import Link from 'next/link';

// Helper to assign icons to entities dynamically
const getIcon = (slug: string) => {
  const iconMap: Record<string, React.ElementType> = {
    programs: BookOpen,
    events: Calendar,
    'success-stories': Activity,
    gallery: ImageIcon,
    volunteers: Users,
    'donation-leads': HeartHandshake,
    'contact-requests': MessageSquare,
    'partnership-requests': Briefcase,
    users: Users,
    media: FileImage,
    'site-settings': Settings,
    navigation: LayoutDashboard,
    homepage: Globe,
    'about-us': FileText,
    'impact-page': Activity,
    'get-involved': HeartHandshake,
    'contact-page': MessageSquare,
    'impact-statistics': Activity,
    partners: Briefcase,
    'newsletter-subscribers': MessageSquare,
    'event-registrations': Calendar,
  };
  return iconMap[slug] || Layers;
};

export default async function Dashboard() {
  const payload = await getPayload({ config: configPromise });

  // payload.auth() requires a live request context. Wrap safely for static generation passes.
  let user: { id?: string | number; roles?: string[] } | null = null;
  try {
    const reqHeaders = await headers();
    const authResult = await payload.auth({ headers: reqHeaders });
    user = authResult.user;
  } catch {
    // During static path generation or non-request contexts, auth is unavailable.
    // user remains null and no dashboard sections will be shown.
  }

  const collections = payload.config.collections || [];
  const globals = payload.config.globals || [];

  // Group Navigation Items dynamically
  const groups: Record<
    string,
    {
      type: 'collection' | 'global';
      slug: string;
      label: string;
      description: string;
      href: string;
    }[]
  > = {};

  const checkAccess = async (
    entity: CollectionConfig | GlobalConfig,
    action: 'read' | 'create' | 'update' | 'delete',
  ) => {
    if (!entity.access || typeof (entity.access as Record<string, unknown>)[action] !== 'function')
      return true;
    try {
      const accessFn = (entity.access as Record<string, (...args: unknown[]) => unknown>)[action];
      const result = await accessFn({ req: { user } as unknown as PayloadRequest });
      return result !== false;
    } catch {
      return false;
    }
  };

  const processEntity = async (
    entity: CollectionConfig | GlobalConfig,
    type: 'collection' | 'global',
  ) => {
    // Determine if user can read this collection/global
    // For globals, read access usually implies manage access in Payload admin context, but we check update for edit.
    const canRead = await checkAccess(entity, 'read');
    if (!canRead) return;

    // Special safeguard: non-super-admins shouldn't see Users collection in their dashboard
    if (entity.slug === 'users' && !user?.roles?.includes('super_admin')) return;

    const groupName =
      typeof entity.admin?.group === 'string'
        ? entity.admin.group
        : entity.admin?.group
          ? (entity.admin.group as Record<string, string>).en || 'Operations'
          : 'Operations';

    if (!groups[groupName]) groups[groupName] = [];

    let label = entity.slug;
    const colConfig = entity as CollectionConfig;
    const globConfig = entity as GlobalConfig;
    if (colConfig.labels?.plural)
      label =
        typeof colConfig.labels.plural === 'string'
          ? colConfig.labels.plural
          : typeof colConfig.labels.plural === 'function'
            ? entity.slug
            : (colConfig.labels.plural as Record<string, string>).en;
    else if (globConfig.label)
      label =
        typeof globConfig.label === 'string'
          ? globConfig.label
          : typeof globConfig.label === 'function'
            ? entity.slug
            : (globConfig.label as Record<string, string>).en;
    else label = entity.slug.replace(/-/g, ' ').replace(/\b\w/g, (l: string) => l.toUpperCase());

    let description = '';
    if (entity.admin?.description) {
      description =
        typeof entity.admin.description === 'string'
          ? entity.admin.description
          : typeof entity.admin.description === 'function'
            ? ''
            : (entity.admin.description as Record<string, string>).en || '';
    }

    groups[groupName].push({
      type,
      slug: entity.slug,
      label,
      description,
      href: `/admin/${type === 'collection' ? 'collections' : 'globals'}/${entity.slug}`,
    });
  };

  await Promise.all([
    ...collections.map((col) => processEntity(col, 'collection')),
    ...globals.map((glob) => processEntity(glob, 'global')),
  ]);

  // Determine top metrics - only for collections they have access to
  const metricSlugs = [
    'programs',
    'events',
    'success-stories',
    'gallery',
    'volunteers',
    'donation-leads',
    'contact-requests',
    'partnership-requests',
  ];

  const metricPromises = metricSlugs.map(async (slug) => {
    try {
      const col = collections.find((c) => c.slug === slug);
      if (!col) return null;

      const canRead = await checkAccess(col, 'read');
      if (!canRead) return null;

      let label = slug.replace(/-/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase());
      if (col.labels?.plural)
        label =
          typeof col.labels.plural === 'string'
            ? col.labels.plural
            : typeof col.labels.plural === 'function'
              ? label
              : (col.labels.plural as Record<string, string>).en;

      const res = await payload.find({
        collection: slug as never,
        limit: 0,
        overrideAccess: false,
        user,
      });
      return {
        slug,
        label,
        count: res.totalDocs,
        icon: getIcon(slug),
        href: `/admin/collections/${slug}`,
      };
    } catch {
      return null;
    }
  });

  const metrics = (await Promise.all(metricPromises)).filter(Boolean) as {
    slug: string;
    label: string;
    count: number;
    icon: React.ElementType;
    href: string;
  }[];

  // Quick Actions - Only show if user has CREATE access
  const allQuickActions = [
    { label: 'New Event', slug: 'events', href: '/admin/collections/events/create' },
    { label: 'New Program', slug: 'programs', href: '/admin/collections/programs/create' },
    {
      label: 'New Story',
      slug: 'success-stories',
      href: '/admin/collections/success-stories/create',
    },
    { label: 'Upload Media', slug: 'media', href: '/admin/collections/media/create' },
  ];

  const quickActionPromises = allQuickActions.map(async (action) => {
    const col = collections.find((c) => c.slug === action.slug);
    if (!col) return null;
    const canCreate = await checkAccess(col, 'create');
    return canCreate ? action : null;
  });

  const quickActions = (await Promise.all(quickActionPromises)).filter(Boolean) as {
    label: string;
    slug: string;
    href: string;
  }[];

  return (
    <div className="mx-auto w-full max-w-[1600px] p-8 font-sans">
      <div className="mb-8 flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">
            Women&apos;s Synergy Operations
          </h1>
          <p className="mt-1 text-gray-500">
            Central command center for content and community engagement.
          </p>
        </div>
        {quickActions.length > 0 && (
          <div className="flex flex-wrap gap-3">
            {quickActions.map((action: { label: string; slug: string; href: string }) => (
              <Link
                key={action.label}
                href={action.href}
                className="focus-visible:ring-ring inline-flex h-9 items-center justify-center rounded-md bg-pink-600 px-4 py-2 text-sm font-medium text-white shadow transition-colors hover:bg-pink-700 focus-visible:ring-1 focus-visible:outline-none"
              >
                <Plus className="mr-2 h-4 w-4" />
                {action.label}
              </Link>
            ))}
          </div>
        )}
      </div>

      {/* Metrics Grid */}
      {metrics.length > 0 && (
        <div className="mb-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {metrics.map(
            (metric: {
              slug: string;
              label: string;
              count: number;
              icon: React.ElementType;
              href: string;
            }) => {
              const Icon = metric.icon;
              return (
                <Link key={metric.label} href={metric.href} className="group block">
                  <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm transition-all duration-200 hover:border-pink-200 hover:shadow-md">
                    <div className="mb-4 flex items-center justify-between">
                      <div
                        className={`rounded-lg bg-gray-100 p-3 text-gray-700 transition-colors group-hover:bg-pink-100 group-hover:text-pink-600`}
                      >
                        <Icon className="h-6 w-6" />
                      </div>
                      <ArrowRight className="h-5 w-5 -translate-x-2 text-gray-400 opacity-0 transition-all group-hover:translate-x-0 group-hover:text-pink-600 group-hover:opacity-100" />
                    </div>
                    <div>
                      <h3 className="text-3xl font-bold text-gray-900">{metric.count}</h3>
                      <p className="mt-1 text-sm font-medium text-gray-500">{metric.label}</p>
                    </div>
                  </div>
                </Link>
              );
            },
          )}
        </div>
      )}

      {/* Configuration-Driven Navigation Groups */}
      <div className="space-y-12">
        {Object.keys(groups)
          .sort()
          .map((groupName) => (
            <div key={groupName}>
              <h2 className="mb-6 border-b border-gray-200 pb-2 text-xl font-bold text-gray-900">
                {groupName}
              </h2>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {groups[groupName].map((item) => {
                  const Icon = getIcon(item.slug);
                  return (
                    <Link key={item.slug} href={item.href} className="group block">
                      <div className="flex h-full flex-col justify-between rounded-xl border border-gray-200 bg-white p-5 shadow-sm transition-all duration-200 hover:border-pink-200 hover:shadow-md">
                        <div>
                          <div className="mb-3 flex items-center gap-3">
                            <Icon className="h-5 w-5 text-gray-500 transition-colors group-hover:text-pink-600" />
                            <h3 className="font-semibold text-gray-900 transition-colors group-hover:text-pink-600">
                              {item.label}
                            </h3>
                          </div>
                          {item.description && (
                            <p className="line-clamp-2 text-sm text-gray-500">{item.description}</p>
                          )}
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}
