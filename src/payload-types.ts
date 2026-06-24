export interface Media {
  id: string;
  url?: string;
  filename?: string;
  mimeType?: string;
  filesize?: number;
  width?: number;
  height?: number;
  createdAt: string;
  updatedAt: string;
}

export interface Program {
  id: string;
  title: string;
  slug?: string | null;
  category?: 'education' | 'leadership' | 'entrepreneurship' | 'wellness' | 'community' | null;
  programStatus?: 'active' | 'completed' | 'planned' | null;
  coverImage?: string | Media | null;
  shortDescription?: string | null;
  content?: Record<string, unknown> | null;
  objectives?: { id?: string | null; objective: string }[] | null;
  keyActivities?: { id?: string | null; activity: string; description?: string | null }[] | null;
  impactMetrics?:
    | {
        id?: string | null;
        label: string;
        value: number;
        suffix?: string | null;
        icon?: string | null;
      }[]
    | null;
  beneficiaryOutcomes?: Record<string, unknown> | null;
  gallery?: { id?: string | null; image: string | Media }[] | null;
  relatedPrograms?: (string | Program)[] | null;
  donationUrl?: string | null;
  meta?: {
    title?: string | null;
    description?: string | null;
    image?: string | Media | null;
  } | null;
  createdAt: string;
  updatedAt: string;
}

export interface SuccessStory {
  id: string;
  personName: string;
  slug?: string | null;
  storyStatus?: 'published' | 'archived' | null;
  program?: string | Program | null;
  image?: string | Media | null;
  quote: string;
  story?: Record<string, unknown> | null;
  beneficiaryDetails?: {
    age?: number | null;
    location?: string | null;
    occupation?: string | null;
  } | null;
  impactOutcomes?: { label: string; value: string; suffix?: string | null }[] | null;
  mediaGallery?: { image: string | Media }[] | null;
  relatedStories?: (string | SuccessStory)[] | null;
  donationUrl?: string | null;
  meta?: {
    title?: string | null;
    description?: string | null;
    image?: string | Media | null;
  } | null;
  createdAt: string;
  updatedAt: string;
}

export interface Event {
  id: string;
  title: string;
  slug?: string;
  date: string;
  endDate?: string | null;
  location: string;
  virtualLink?: string | null;
  coverImage?: string | Media | null;
  shortDescription?: string | null;
  description?: Record<string, unknown> | null;
  category?: string | null;
  eventType?: 'physical' | 'virtual' | 'hybrid' | null;
  eventStatus?: 'upcoming' | 'ongoing' | 'past' | 'completed' | null;
  schedule?: { id?: string; time: string; title: string; description?: string | null }[] | null;
  speakers?:
    | {
        id?: string;
        name: string;
        role: string;
        image?: string | Media | null;
        bio?: string | null;
      }[]
    | null;
  faqs?: { id?: string; question: string; answer: string }[] | null;
  gallery?: { id?: string; image: string | Media }[] | null;
  relatedPrograms?: (string | Program)[] | null;
  relatedEvents?: (string | Event)[] | null;
  createdAt: string;
  updatedAt: string;
}

export interface Partner {
  id: string;
  name: string;
  logo?: string | Media | null;
  websiteUrl?: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface Homepage {
  hero?: {
    heading: string;
    subheading?: string;
    backgroundImage?: string | Media | null;
    callsToAction?: { label?: string; url?: string; variant?: string }[];
  };
  aboutSection?: {
    heading?: string;
    content?: Record<string, unknown> | null;
    image?: string | Media | null;
    ctaLabel?: string;
    ctaUrl?: string;
  };
  programsSection?: {
    heading?: string;
    description?: string;
    featuredPrograms?: (string | Program)[] | null;
  };
  impactSection?: {
    heading?: string;
    description?: string;
  };
  storiesSection?: {
    heading?: string;
    description?: string;
    featuredStories?: (string | SuccessStory)[] | null;
  };
  eventsSection?: {
    heading?: string;
    description?: string;
  };
  partnersSection?: {
    heading?: string;
    description?: string;
  };
  donationCta?: {
    heading?: string;
    description?: string;
    buttonLabel?: string;
    buttonUrl?: string;
  };
}

export interface ImpactStatistic {
  id: string;
  icon?: string | null;
  value: number;
  prefix?: string | null;
  suffix?: string | null;
  label: string;
  createdAt: string;
  updatedAt: string;
}

export interface Gallery {
  id: string;
  title: string;
  slug?: string | null;
  albumStatus?: 'published' | 'draft' | null;
  category?:
    | 'event'
    | 'workshop'
    | 'community'
    | 'entrepreneur'
    | 'program'
    | 'celebration'
    | 'impact'
    | null;
  coverImage?: string | Media | null;
  description?: Record<string, unknown> | null;
  images: { id?: string; image: string | Media; caption?: string | null }[];
  associatedEvent?: string | Event | null;
  associatedProgram?: string | Program | null;
  createdAt: string;
  updatedAt: string;
}

export interface PrivacyPolicy {
  id: string;
  title: string;
  lastUpdated: string;
  sections: {
    title: string;
    content: Record<string, unknown>;
    id?: string | null;
  }[];
  seo?: {
    title?: string | null;
    description?: string | null;
  };
  createdAt?: string;
  updatedAt?: string;
}

export interface TermsOfService {
  id: string;
  title: string;
  lastUpdated: string;
  sections: {
    title: string;
    content: Record<string, unknown>;
    id?: string | null;
  }[];
  seo?: {
    title?: string | null;
    description?: string | null;
  };
  createdAt?: string;
  updatedAt?: string;
}

export interface GetInvolved {
  id: string;
  hero: {
    title: string;
    subtitle: string;
    backgroundImage?: string | Media | null;
  };
  volunteerSection: {
    title: string;
    description: string;
    benefits?: { benefit?: string | null; id?: string | null }[] | null;
  };
  partnerSection: {
    title: string;
    description: string;
    partnerTypes?:
      | { type?: string | null; description?: string | null; id?: string | null }[]
      | null;
  };
  donateSection: {
    title: string;
    description: string;
  };
  faqs?:
    | {
        question: string;
        answer: string;
        id?: string | null;
      }[]
    | null;
  createdAt?: string;
  updatedAt?: string;
}
