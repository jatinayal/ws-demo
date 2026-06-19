import Link from 'next/link';

interface AnnouncementBarProps {
  enabled?: boolean | null;
  text?: string | null;
  link?: string | null;
}

export function AnnouncementBar({ enabled, text, link }: AnnouncementBarProps) {
  if (!enabled || !text) return null;

  const content = (
    <div className="bg-primary text-primary-foreground py-2 px-4 text-center text-sm font-medium">
      {text}
    </div>
  );

  if (link) {
    return (
      <Link href={link} className="block hover:opacity-90 transition-opacity">
        {content}
      </Link>
    );
  }

  return content;
}
