import React from 'react';
import { getPayload } from 'payload';
import configPromise from '@payload-config';
import { headers } from 'next/headers';
import { 
  Activity, BookOpen, Calendar, Image as ImageIcon, Users, 
  MessageSquare, HeartHandshake, Briefcase, Plus, ArrowRight, 
  FileText, Settings, LayoutDashboard, Globe, FileImage, Layers
} from 'lucide-react';
import Link from 'next/link';

// Helper to assign icons to entities dynamically
const getIcon = (slug: string) => {
  const iconMap: Record<string, React.ElementType> = {
    'programs': BookOpen,
    'events': Calendar,
    'success-stories': Activity,
    'gallery': ImageIcon,
    'volunteers': Users,
    'donation-leads': HeartHandshake,
    'contact-requests': MessageSquare,
    'partnership-requests': Briefcase,
    'users': Users,
    'media': FileImage,
    'site-settings': Settings,
    'navigation': LayoutDashboard,
    'homepage': Globe,
    'about-us': FileText,
    'impact-page': Activity,
    'get-involved': HeartHandshake,
    'contact-page': MessageSquare,
    'impact-statistics': Activity,
    'partners': Briefcase,
    'newsletter-subscribers': MessageSquare,
    'event-registrations': Calendar,
  };
  return iconMap[slug] || Layers;
};

export default async function Dashboard(props: any) {
  const payload = await getPayload({ config: configPromise });

  // payload.auth() requires a live request context. Wrap safely for static generation passes.
  let user: any = null;
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
  const groups: Record<string, { type: 'collection' | 'global', slug: string, label: string, description: string, href: string }[]> = {};

  const checkAccess = async (entity: any, action: 'read' | 'create' | 'update' | 'delete') => {
    if (!entity.access || typeof entity.access[action] !== 'function') return true;
    try {
      const result = await entity.access[action]({ req: { user } as any });
      return result !== false;
    } catch {
      return false;
    }
  };

  const processEntity = async (entity: any, type: 'collection' | 'global') => {
    // Determine if user can read this collection/global
    // For globals, read access usually implies manage access in Payload admin context, but we check update for edit.
    const canRead = await checkAccess(entity, 'read');
    if (!canRead) return;

    // Special safeguard: non-super-admins shouldn't see Users collection in their dashboard
    if (entity.slug === 'users' && !user?.roles?.includes('super_admin')) return;

    const groupName = typeof entity.admin?.group === 'string' ? entity.admin.group : (entity.admin?.group?.en || 'Operations');
    
    if (!groups[groupName]) groups[groupName] = [];
    
    let label = entity.slug;
    if (entity.labels?.plural) label = typeof entity.labels.plural === 'string' ? entity.labels.plural : entity.labels.plural.en;
    else if (entity.label) label = typeof entity.label === 'string' ? entity.label : entity.label.en;
    else label = entity.slug.replace(/-/g, ' ').replace(/\b\w/g, (l: string) => l.toUpperCase());

    let description = '';
    if (entity.admin?.description) {
        description = typeof entity.admin.description === 'string' ? entity.admin.description : (entity.admin.description.en || '');
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
    ...collections.map(col => processEntity(col, 'collection')),
    ...globals.map(glob => processEntity(glob, 'global'))
  ]);

  // Determine top metrics - only for collections they have access to
  const metricSlugs = ['programs', 'events', 'success-stories', 'gallery', 'volunteers', 'donation-leads', 'contact-requests', 'partnership-requests'];
  
  const metricPromises = metricSlugs.map(async (slug) => {
    try {
      const col = collections.find(c => c.slug === slug);
      if (!col) return null;
      
      const canRead = await checkAccess(col, 'read');
      if (!canRead) return null;

      let label = slug.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
      if (col.labels?.plural) label = typeof col.labels.plural === 'string' ? col.labels.plural : col.labels.plural.en;
      
      const res = await payload.find({ collection: slug as any, limit: 0, overrideAccess: false, user });
      return {
        slug,
        label,
        count: res.totalDocs,
        icon: getIcon(slug),
        href: `/admin/collections/${slug}`
      };
    } catch {
      return null;
    }
  });

  const metrics = (await Promise.all(metricPromises)).filter(Boolean);

  // Quick Actions - Only show if user has CREATE access
  const allQuickActions = [
    { label: 'New Event', slug: 'events', href: '/admin/collections/events/create' },
    { label: 'New Program', slug: 'programs', href: '/admin/collections/programs/create' },
    { label: 'New Story', slug: 'success-stories', href: '/admin/collections/success-stories/create' },
    { label: 'Upload Media', slug: 'media', href: '/admin/collections/media/create' },
  ];

  const quickActionPromises = allQuickActions.map(async (action) => {
    const col = collections.find(c => c.slug === action.slug);
    if (!col) return null;
    const canCreate = await checkAccess(col, 'create');
    return canCreate ? action : null;
  });

  const quickActions = (await Promise.all(quickActionPromises)).filter(Boolean);

  return (
    <div className="p-8 max-w-[1600px] mx-auto w-full font-sans">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Women's Synergy Operations</h1>
          <p className="text-gray-500 mt-1">Central command center for content and community engagement.</p>
        </div>
        {quickActions.length > 0 && (
          <div className="flex gap-3 flex-wrap">
            {quickActions.map((action: any) => (
              <Link key={action.label} href={action.href} className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring bg-pink-600 text-white shadow hover:bg-pink-700 h-9 px-4 py-2">
                <Plus className="w-4 h-4 mr-2" />
                {action.label}
              </Link>
            ))}
          </div>
        )}
      </div>

      {/* Metrics Grid */}
      {metrics.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {metrics.map((metric: any) => {
            const Icon = metric.icon;
            return (
              <Link key={metric.label} href={metric.href} className="block group">
                <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm transition-all duration-200 hover:shadow-md hover:border-pink-200">
                  <div className="flex items-center justify-between mb-4">
                    <div className={`p-3 rounded-lg bg-gray-100 text-gray-700 group-hover:bg-pink-100 group-hover:text-pink-600 transition-colors`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <ArrowRight className="w-5 h-5 text-gray-400 opacity-0 group-hover:opacity-100 group-hover:text-pink-600 transition-all -translate-x-2 group-hover:translate-x-0" />
                  </div>
                  <div>
                    <h3 className="text-3xl font-bold text-gray-900">{metric.count}</h3>
                    <p className="text-sm font-medium text-gray-500 mt-1">{metric.label}</p>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      )}

      {/* Configuration-Driven Navigation Groups */}
      <div className="space-y-12">
        {Object.keys(groups).sort().map((groupName) => (
          <div key={groupName}>
            <h2 className="text-xl font-bold text-gray-900 mb-6 border-b border-gray-200 pb-2">{groupName}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {groups[groupName].map((item) => {
                const Icon = getIcon(item.slug);
                return (
                  <Link key={item.slug} href={item.href} className="block group">
                    <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm transition-all duration-200 hover:shadow-md hover:border-pink-200 h-full flex flex-col justify-between">
                      <div>
                        <div className="flex items-center gap-3 mb-3">
                          <Icon className="w-5 h-5 text-gray-500 group-hover:text-pink-600 transition-colors" />
                          <h3 className="font-semibold text-gray-900 group-hover:text-pink-600 transition-colors">{item.label}</h3>
                        </div>
                        {item.description && (
                          <p className="text-sm text-gray-500 line-clamp-2">{item.description}</p>
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
