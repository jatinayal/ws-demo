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
    <div className="bg-card rounded-3xl p-6 md:p-10 border border-border/50 shadow-xl shadow-black/5">
      <h3 className="text-2xl font-bold mb-6 flex items-center">
        Send us a Message <Send className="w-5 h-5 ml-3 text-primary" />
      </h3>
      
      {formStatus && (
        <div className={`p-6 rounded-2xl mb-8 flex items-start ${formStatus.success ? 'bg-green-50 dark:bg-green-950/30 border border-green-200 dark:border-green-900' : 'bg-destructive/10 border border-destructive/20'}`}>
          {formStatus.success ? <CheckCircle2 className="w-6 h-6 text-green-600 dark:text-green-500 mr-4 shrink-0 mt-0.5" /> : <AlertCircle className="w-6 h-6 text-destructive mr-4 shrink-0 mt-0.5" />}
          <div>
            <h4 className={`font-bold ${formStatus.success ? 'text-green-800 dark:text-green-400' : 'text-destructive'}`}>
              {formStatus.success ? 'Success!' : 'Error'}
            </h4>
            <p className={`text-sm mt-1 ${formStatus.success ? 'text-green-700/80 dark:text-green-400/80' : 'text-destructive/80'}`}>
              {formStatus.message}
            </p>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label htmlFor="name" className="text-sm font-semibold">Full Name *</label>
            <input type="text" id="name" name="name" required className="w-full bg-background border border-border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary" placeholder="Jane Doe" />
          </div>
          <div className="space-y-2">
            <label htmlFor="email" className="text-sm font-semibold">Email Address *</label>
            <input type="email" id="email" name="email" required className="w-full bg-background border border-border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary" placeholder="jane@example.com" />
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label htmlFor="phone" className="text-sm font-semibold">Phone Number</label>
            <input type="tel" id="phone" name="phone" className="w-full bg-background border border-border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary" placeholder="+1 (555) 000-0000" />
          </div>
          <div className="space-y-2">
            <label htmlFor="inquiryType" className="text-sm font-semibold">Inquiry Type *</label>
            <select id="inquiryType" name="inquiryType" required className="w-full bg-background border border-border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary">
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
          <label htmlFor="subject" className="text-sm font-semibold">Subject *</label>
          <input type="text" id="subject" name="subject" required className="w-full bg-background border border-border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary" placeholder="How can we help you?" />
        </div>

        <div className="space-y-2">
          <label htmlFor="message" className="text-sm font-semibold">Message *</label>
          <textarea id="message" name="message" required rows={6} className="w-full bg-background border border-border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary resize-none" placeholder="Type your message here..."></textarea>
        </div>

        <button type="submit" disabled={isSubmitting} className={cn(buttonVariants({ size: 'lg', className: 'w-full rounded-xl font-bold h-14' }))}>
          {isSubmitting ? 'Sending Message...' : 'Send Message'}
        </button>
      </form>
    </div>
  );
}
