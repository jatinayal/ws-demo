import React from 'react';
import { getContactPage, getSiteSettings } from '@/lib/payload';
import { Container } from '@/components/shared/Container';
import { HeroSection } from '@/components/shared/HeroSection';
import { AnimatedSection } from '@/components/shared/AnimatedSection';
import { ContactForm } from './ContactForm';
import { constructMetadata } from '@/lib/seo';
import { MapPin, Mail, Phone, Clock, HelpCircle, Share2 } from 'lucide-react';
import { formatPhoneNumber } from '@/lib/utils';

export async function generateMetadata() {
  const data = await getContactPage();
  return constructMetadata({
    title: 'Contact Us',
    description: data.hero?.subtitle || "Get in touch with Women's Synergy.",
    path: '/contact',
  });
}

export default async function ContactUsPage() {
  const [contactData, settings] = await Promise.all([getContactPage(), getSiteSettings()]);

  const mapEmbedUrl =
    settings.mapEmbedUrl ||
    'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d127641.13459846838!2d30.0076295!3d-1.954203!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x19dca4258ed8e797%3A0xf32b36a5411d0bc8!2sKigali%2C%20Rwanda!5e0!3m2!1sen!2sus!4v1700000000000!5m2!1sen!2sus';

  return (
    <div className="bg-background flex min-h-screen flex-col">
      {/* 1. Hero */}
      <HeroSection
        title={contactData.hero?.title || 'Get in Touch'}
        subtitle={
          contactData.hero?.subtitle ||
          'We are here to answer your questions and explore collaboration opportunities.'
        }
      />

      {/* 2. Main Content */}
      <section className="relative z-20 py-20 md:py-32">
        <Container>
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-20">
            {/* Contact Info & Map Side */}
            <div className="space-y-12 lg:col-span-5">
              <AnimatedSection direction="up">
                <h2 className="mb-8 text-3xl font-bold">Contact Information</h2>

                <div className="space-y-6">
                  {settings.address && (
                    <div className="flex items-start">
                      <div className="bg-primary/10 text-primary mr-4 shrink-0 rounded-full p-3">
                        <MapPin className="h-6 w-6" />
                      </div>
                      <div>
                        <h4 className="text-foreground font-bold">Office Address</h4>
                        <p className="text-muted-foreground mt-1 whitespace-pre-line">
                          {settings.address}
                        </p>
                      </div>
                    </div>
                  )}

                  {settings.contactEmail && (
                    <div className="flex items-start">
                      <div className="bg-primary/10 text-primary mr-4 shrink-0 rounded-full p-3">
                        <Mail className="h-6 w-6" />
                      </div>
                      <div>
                        <h4 className="text-foreground font-bold">Email Address</h4>
                        <a
                          href={`mailto:${settings.contactEmail}`}
                          className="text-primary mt-1 block hover:underline"
                        >
                          {settings.contactEmail}
                        </a>
                      </div>
                    </div>
                  )}

                  {settings.contactPhone && (
                    <div className="flex items-start">
                      <div className="bg-primary/10 text-primary mr-4 shrink-0 rounded-full p-3">
                        <Phone className="h-6 w-6" />
                      </div>
                      <div>
                        <h4 className="text-foreground font-bold">Phone Number</h4>
                        <a
                          href={`tel:${settings.contactPhone.replace(/\D/g, '')}`}
                          className="text-primary mt-1 block hover:underline"
                        >
                          {formatPhoneNumber(settings.contactPhone)}
                        </a>
                      </div>
                    </div>
                  )}

                  {settings.workingHours && (
                    <div className="flex items-start">
                      <div className="bg-primary/10 text-primary mr-4 shrink-0 rounded-full p-3">
                        <Clock className="h-6 w-6" />
                      </div>
                      <div>
                        <h4 className="text-foreground font-bold">Working Hours</h4>
                        <p className="text-muted-foreground mt-1">{settings.workingHours}</p>
                      </div>
                    </div>
                  )}
                </div>
              </AnimatedSection>

              <AnimatedSection direction="up" delay={0.1}>
                <h3 className="mb-6 flex items-center text-xl font-bold">
                  <Share2 className="text-primary mr-3 h-5 w-5" /> Connect With Us
                </h3>
                <div className="flex flex-wrap gap-3">
                  {settings.socialLinks?.map(
                    (social: { platform?: string | null; url?: string | null }, idx: number) => (
                      <a
                        key={idx}
                        href={social.url || undefined}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-muted hover:bg-primary/10 text-muted-foreground hover:text-primary border-border rounded-full border px-5 py-2.5 text-sm font-semibold transition-colors"
                      >
                        {social.platform}
                      </a>
                    ),
                  )}
                </div>
              </AnimatedSection>

              <AnimatedSection
                direction="up"
                delay={0.2}
                className="border-border/50 relative h-[300px] w-full overflow-hidden rounded-3xl border shadow-sm md:h-[400px]"
              >
                <iframe
                  src={mapEmbedUrl}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen={false}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="absolute inset-0"
                  title="Organization Location Map"
                ></iframe>
              </AnimatedSection>
            </div>

            {/* Contact Form Side */}
            <div className="lg:col-span-7">
              <AnimatedSection direction="up" delay={0.2}>
                <ContactForm />
              </AnimatedSection>
            </div>
          </div>
        </Container>
      </section>

      {/* 3. FAQs */}
      {contactData.faqs && contactData.faqs.length > 0 && (
        <section className="bg-muted/30 border-t py-24">
          <Container>
            <AnimatedSection direction="up" className="mx-auto mb-16 max-w-3xl text-center">
              <h2 className="mb-4 text-3xl font-bold">Frequently Asked Questions</h2>
              <p className="text-muted-foreground">
                Find quick answers to common questions about contacting and working with
                Women&apos;s Synergy.
              </p>
            </AnimatedSection>

            <div className="mx-auto grid max-w-4xl grid-cols-1 gap-8 md:grid-cols-2">
              {contactData.faqs.map(
                (faq: { question?: string | null; answer?: string | null }, idx: number) => (
                  <AnimatedSection key={idx} direction="up" delay={idx * 0.1}>
                    <div className="bg-card border-border/50 h-full rounded-2xl border p-6 transition-shadow hover:shadow-md">
                      <div className="flex items-start">
                        <HelpCircle className="text-primary mt-0.5 mr-4 h-6 w-6 shrink-0" />
                        <div>
                          <h4 className="mb-2 text-lg font-bold">{faq.question}</h4>
                          <p className="text-muted-foreground">{faq.answer}</p>
                        </div>
                      </div>
                    </div>
                  </AnimatedSection>
                ),
              )}
            </div>
          </Container>
        </section>
      )}
    </div>
  );
}
