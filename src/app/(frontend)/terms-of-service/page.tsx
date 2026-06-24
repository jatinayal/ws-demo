import React from 'react';
import { getTermsOfService } from '@/lib/payload';
import { Container } from '@/components/shared/Container';
import { RichText } from '@payloadcms/richtext-lexical/react';
import { constructMetadata } from '@/lib/seo';
import type { SerializedEditorState } from '@payloadcms/richtext-lexical/lexical';

export async function generateMetadata() {
  const data = await getTermsOfService();
  return constructMetadata({
    title: data?.seo?.title || data?.title || 'Terms of Service',
    description: data?.seo?.description || 'Read our terms of service.',
    path: '/terms-of-service',
  });
}

export default async function TermsOfServicePage() {
  const data = await getTermsOfService();

  return (
    <div className="bg-background min-h-screen pt-32 pb-24">
      <Container className="max-w-4xl">
        <div className="mb-12 border-b pb-8">
          <h1 className="mb-4 text-4xl font-extrabold tracking-tight md:text-5xl">
            {data?.title || 'Terms of Service'}
          </h1>
          {data?.lastUpdated && (
            <p className="text-muted-foreground font-medium">
              Last updated:{' '}
              {new Date(data.lastUpdated).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </p>
          )}
        </div>
        <div className="space-y-12">
          {data?.sections && data.sections.length > 0 ? (
            data.sections.map(
              (
                section: NonNullable<import('@/payload-types').TermsOfService['sections']>[0],
                idx: number,
              ) => (
                <section key={idx} className="scroll-mt-24">
                  <h2 className="text-foreground mb-6 text-2xl font-bold tracking-tight md:text-3xl">
                    {section.title}
                  </h2>
                  <div className="prose prose-lg dark:prose-invert text-muted-foreground max-w-none leading-relaxed">
                    <RichText data={section.content as unknown as SerializedEditorState} />
                  </div>
                </section>
              ),
            )
          ) : (
            <p className="text-muted-foreground text-lg">
              Our terms of service are currently being updated. Please check back later.
            </p>
          )}
        </div>
      </Container>
    </div>
  );
}
