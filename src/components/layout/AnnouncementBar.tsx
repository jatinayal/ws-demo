import Link from 'next/link';

interface AnnouncementBarProps {
  enabled?: boolean | null;
  text?: string | null;
  link?: string | null;
}

export function AnnouncementBar({ enabled, text, link }: AnnouncementBarProps) {
  if (!enabled || !text) return null;

  const content = (
    <div className="bg-primary text-primary-foreground px-4 py-2 text-center text-sm font-medium">
      {text}
    </div>
  );

  if (link) {
    return (
      <Link href={link} className="block transition-opacity hover:opacity-90">
        {content}
      </Link>
    );
  }

  return content;
}
