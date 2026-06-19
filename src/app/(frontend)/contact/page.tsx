import React from 'react';
import { getContactPage, getSiteSettings } from '@/lib/payload';
import { Container } from '@/components/shared/Container';
import { HeroSection } from '@/components/shared/HeroSection';
import { AnimatedSection } from '@/components/shared/AnimatedSection';
import { ContactForm } from './ContactForm';
import { constructMetadata } from '@/lib/seo';
import { MapPin, Mail, Phone, Clock, HelpCircle, Share2 } from 'lucide-react';
import Link from 'next/link';

export async function generateMetadata() {
  const data = await getContactPage();
  return constructMetadata({
    title: 'Contact Us',
    description: data.hero?.subtitle || 'Get in touch with Women\'s Synergy.',
    path: '/contact',
  });
}

export default async function ContactUsPage() {
  const [contactData, settings] = await Promise.all([
    getContactPage(),
    getSiteSettings()
  ]);

  const mapEmbedUrl = settings.mapEmbedUrl || 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d127641.13459846838!2d30.0076295!3d-1.954203!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x19dca4258ed8e797%3A0xf32b36a5411d0bc8!2sKigali%2C%20Rwanda!5e0!3m2!1sen!2sus!4v1700000000000!5m2!1sen!2sus';

  return (
    <div className="flex flex-col min-h-screen bg-background">
      {/* 1. Hero */}
      <HeroSection 
        title={contactData.hero?.title || 'Get in Touch'}
        subtitle={contactData.hero?.subtitle || 'We are here to answer your questions and explore collaboration opportunities.'}
      />

      {/* 2. Main Content */}
      <section className="py-20 md:py-32 relative z-20">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
            
            {/* Contact Info & Map Side */}
            <div className="lg:col-span-5 space-y-12">
              <AnimatedSection direction="up">
                <h2 className="text-3xl font-bold mb-8">Contact Information</h2>
                
                <div className="space-y-6">
                  {settings.address && (
                    <div className="flex items-start">
                      <div className="bg-primary/10 p-3 rounded-full mr-4 text-primary shrink-0">
                        <MapPin className="w-6 h-6" />
                      </div>
                      <div>
                        <h4 className="font-bold text-foreground">Office Address</h4>
                        <p className="text-muted-foreground mt-1 whitespace-pre-line">{settings.address}</p>
                      </div>
                    </div>
                  )}

                  {settings.contactEmail && (
                    <div className="flex items-start">
                      <div className="bg-primary/10 p-3 rounded-full mr-4 text-primary shrink-0">
                        <Mail className="w-6 h-6" />
                      </div>
                      <div>
                        <h4 className="font-bold text-foreground">Email Address</h4>
                        <a href={`mailto:${settings.contactEmail}`} className="text-primary hover:underline mt-1 block">
                          {settings.contactEmail}
                        </a>
                      </div>
                    </div>
                  )}

                  {settings.contactPhone && (
                    <div className="flex items-start">
                      <div className="bg-primary/10 p-3 rounded-full mr-4 text-primary shrink-0">
                        <Phone className="w-6 h-6" />
                      </div>
                      <div>
                        <h4 className="font-bold text-foreground">Phone Number</h4>
                        <a href={`tel:${settings.contactPhone}`} className="text-primary hover:underline mt-1 block">
                          {settings.contactPhone}
                        </a>
                      </div>
                    </div>
                  )}

                  {settings.workingHours && (
                    <div className="flex items-start">
                      <div className="bg-primary/10 p-3 rounded-full mr-4 text-primary shrink-0">
                        <Clock className="w-6 h-6" />
                      </div>
                      <div>
                        <h4 className="font-bold text-foreground">Working Hours</h4>
                        <p className="text-muted-foreground mt-1">{settings.workingHours}</p>
                      </div>
                    </div>
                  )}
                </div>
              </AnimatedSection>

              <AnimatedSection direction="up" delay={0.1}>
                <h3 className="text-xl font-bold mb-6 flex items-center">
                  <Share2 className="w-5 h-5 mr-3 text-primary" /> Connect With Us
                </h3>
                <div className="flex flex-wrap gap-3">
                  {settings.socialLinks?.map((social: any, idx: number) => (
                    <a 
                      key={idx} 
                      href={social.url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="bg-muted hover:bg-primary/10 text-muted-foreground hover:text-primary px-5 py-2.5 rounded-full text-sm font-semibold transition-colors border border-border"
                    >
                      {social.platform}
                    </a>
                  ))}
                </div>
              </AnimatedSection>

              <AnimatedSection direction="up" delay={0.2} className="w-full h-[300px] md:h-[400px] rounded-3xl overflow-hidden border border-border/50 shadow-sm relative">
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
        <section className="py-24 bg-muted/30 border-t">
          <Container>
            <AnimatedSection direction="up" className="max-w-3xl mx-auto text-center mb-16">
              <h2 className="text-3xl font-bold mb-4">Frequently Asked Questions</h2>
              <p className="text-muted-foreground">Find quick answers to common questions about contacting and working with Women's Synergy.</p>
            </AnimatedSection>
            
            <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
              {contactData.faqs.map((faq: any, idx: number) => (
                <AnimatedSection key={idx} direction="up" delay={idx * 0.1}>
                  <div className="bg-card rounded-2xl p-6 border border-border/50 h-full hover:shadow-md transition-shadow">
                    <div className="flex items-start">
                      <HelpCircle className="w-6 h-6 text-primary mr-4 shrink-0 mt-0.5" />
                      <div>
                        <h4 className="font-bold text-lg mb-2">{faq.question}</h4>
                        <p className="text-muted-foreground">{faq.answer}</p>
                      </div>
                    </div>
                  </div>
                </AnimatedSection>
              ))}
            </div>
          </Container>
        </section>
      )}

    </div>
  );
}
