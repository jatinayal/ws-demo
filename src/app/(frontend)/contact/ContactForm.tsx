'use client';

import React, { useState } from 'react';
import { submitContactRequest } from './actions';
import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { AlertCircle, CheckCircle2, Send } from 'lucide-react';

export function ContactForm() {
  const [formStatus, setFormStatus] = useState<{ success: boolean; message: string } | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setFormStatus(null);
    const formData = new FormData(e.currentTarget);
    const result = await submitContactRequest(formData);
    setFormStatus(result);
    setIsSubmitting(false);
    if (result.success) e.currentTarget.reset();
  };

  return (
    <div className="bg-card border-border/50 rounded-3xl border p-6 shadow-xl shadow-black/5 md:p-10">
      <h3 className="mb-6 flex items-center text-2xl font-bold">
        Send us a Message <Send className="text-primary ml-3 h-5 w-5" />
      </h3>

      {formStatus && (
        <div
          className={`mb-8 flex items-start rounded-2xl p-6 ${formStatus.success ? 'border border-green-200 bg-green-50 dark:border-green-900 dark:bg-green-950/30' : 'bg-destructive/10 border-destructive/20 border'}`}
        >
          {formStatus.success ? (
            <CheckCircle2 className="mt-0.5 mr-4 h-6 w-6 shrink-0 text-green-600 dark:text-green-500" />
          ) : (
            <AlertCircle className="text-destructive mt-0.5 mr-4 h-6 w-6 shrink-0" />
          )}
          <div>
            <h4
              className={`font-bold ${formStatus.success ? 'text-green-800 dark:text-green-400' : 'text-destructive'}`}
            >
              {formStatus.success ? 'Success!' : 'Error'}
            </h4>
            <p
              className={`mt-1 text-sm ${formStatus.success ? 'text-green-700/80 dark:text-green-400/80' : 'text-destructive/80'}`}
            >
              {formStatus.message}
            </p>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div className="space-y-2">
            <label htmlFor="name" className="text-sm font-semibold">
              Full Name *
            </label>
            <input
              type="text"
              id="name"
              name="name"
              required
              className="bg-background border-border focus:ring-primary w-full rounded-xl border px-4 py-3 focus:ring-2 focus:outline-none"
              placeholder="Jane Doe"
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="email" className="text-sm font-semibold">
              Email Address *
            </label>
            <input
              type="email"
              id="email"
              name="email"
              required
              className="bg-background border-border focus:ring-primary w-full rounded-xl border px-4 py-3 focus:ring-2 focus:outline-none"
              placeholder="jane@example.com"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div className="space-y-2">
            <label htmlFor="phone" className="text-sm font-semibold">
              Phone Number
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              className="bg-background border-border focus:ring-primary w-full rounded-xl border px-4 py-3 focus:ring-2 focus:outline-none"
              placeholder="+1 (555) 000-0000"
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="inquiryType" className="text-sm font-semibold">
              Inquiry Type *
            </label>
            <select
              id="inquiryType"
              name="inquiryType"
              required
              className="bg-background border-border focus:ring-primary w-full rounded-xl border px-4 py-3 focus:ring-2 focus:outline-none"
            >
              <option value="general">General Inquiry</option>
              <option value="volunteer">Volunteer Interest</option>
              <option value="partnership">Partnership Inquiry</option>
              <option value="sponsorship">Sponsorship Opportunity</option>
              <option value="donation">Donation Question</option>
              <option value="media">Media / PR Inquiry</option>
              <option value="program">Program Information</option>
            </select>
          </div>
        </div>

        <div className="space-y-2">
          <label htmlFor="subject" className="text-sm font-semibold">
            Subject *
          </label>
          <input
            type="text"
            id="subject"
            name="subject"
            required
            className="bg-background border-border focus:ring-primary w-full rounded-xl border px-4 py-3 focus:ring-2 focus:outline-none"
            placeholder="How can we help you?"
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="message" className="text-sm font-semibold">
            Message *
          </label>
          <textarea
            id="message"
            name="message"
            required
            rows={6}
            className="bg-background border-border focus:ring-primary w-full resize-none rounded-xl border px-4 py-3 focus:ring-2 focus:outline-none"
            placeholder="Type your message here..."
          ></textarea>
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className={cn(
            buttonVariants({ size: 'lg', className: 'h-14 w-full rounded-xl font-bold' }),
          )}
        >
          {isSubmitting ? 'Sending Message...' : 'Send Message'}
        </button>
      </form>
    </div>
  );
}
