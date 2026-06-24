'use client';

import React, { useState } from 'react';
import {
  submitVolunteerApplication,
  submitPartnershipInquiry,
  submitDonationLead,
} from './actions';
import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Heart, Users, Briefcase, AlertCircle, CheckCircle2 } from 'lucide-react';

export function GetInvolvedForms({
  activeTab: externalTab,
  onTabChange,
}: {
  activeTab?: 'volunteer' | 'partner' | 'donate';
  onTabChange?: (tab: 'volunteer' | 'partner' | 'donate') => void;
} = {}) {
  const [internalTab, setInternalTab] = useState<'volunteer' | 'partner' | 'donate'>('volunteer');
  const activeTab = externalTab || internalTab;

  const handleTabChange = (tab: 'volunteer' | 'partner' | 'donate') => {
    setFormStatus(null);
    if (onTabChange) onTabChange(tab);
    else setInternalTab(tab);
  };

  const [formStatus, setFormStatus] = useState<{ success: boolean; message: string } | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleVolunteerSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setFormStatus(null);
    const formData = new FormData(e.currentTarget);
    const result = await submitVolunteerApplication(formData);
    setFormStatus(result);
    setIsSubmitting(false);
    if (result.success) e.currentTarget.reset();
  };

  const handlePartnerSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setFormStatus(null);
    const formData = new FormData(e.currentTarget);
    const result = await submitPartnershipInquiry(formData);
    setFormStatus(result);
    setIsSubmitting(false);
    if (result.success) e.currentTarget.reset();
  };

  const handleDonateSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setFormStatus(null);
    const formData = new FormData(e.currentTarget);
    const result = await submitDonationLead(formData);
    setFormStatus(result);
    setIsSubmitting(false);
    if (result.success) e.currentTarget.reset();
  };

  return (
    <div className="bg-card border-border/50 rounded-3xl border p-6 shadow-2xl shadow-black/5 md:p-10">
      {/* Tabs */}
      <div className="border-border mb-10 flex flex-wrap gap-2 border-b pb-6 md:gap-4">
        <button
          onClick={() => handleTabChange('volunteer')}
          className={`flex min-w-[140px] flex-1 items-center justify-center rounded-2xl px-4 py-3 text-sm font-bold transition-all ${activeTab === 'volunteer' ? 'bg-primary text-white shadow-md' : 'bg-muted text-muted-foreground hover:bg-muted/80'}`}
        >
          <Users className="mr-2 h-4 w-4" /> Volunteer
        </button>
        <button
          onClick={() => handleTabChange('partner')}
          className={`flex min-w-[140px] flex-1 items-center justify-center rounded-2xl px-4 py-3 text-sm font-bold transition-all ${activeTab === 'partner' ? 'bg-primary text-white shadow-md' : 'bg-muted text-muted-foreground hover:bg-muted/80'}`}
        >
          <Briefcase className="mr-2 h-4 w-4" /> Partnership
        </button>
        <button
          onClick={() => handleTabChange('donate')}
          className={`flex min-w-[140px] flex-1 items-center justify-center rounded-2xl px-4 py-3 text-sm font-bold transition-all ${activeTab === 'donate' ? 'bg-primary text-white shadow-md' : 'bg-muted text-muted-foreground hover:bg-muted/80'}`}
        >
          <Heart className="mr-2 h-4 w-4" /> Donate
        </button>
      </div>

      {/* Status Message */}
      {formStatus && (
        <div
          className={`mb-8 flex items-start rounded-2xl p-6 ${formStatus.success ? 'border border-green-200 bg-green-50 dark:border-green-900 dark:bg-green-950/30' : 'bg-destructive/10 border-destructive/20 border'}`}
        >
          {formStatus.success ? (
            <CheckCircle2 className="mr-4 h-6 w-6 shrink-0 text-green-600 dark:text-green-500" />
          ) : (
            <AlertCircle className="text-destructive mr-4 h-6 w-6 shrink-0" />
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

      {/* Forms */}
      <div className="relative">
        {/* Volunteer Form */}
        {activeTab === 'volunteer' && (
          <form
            onSubmit={handleVolunteerSubmit}
            className="animate-in fade-in slide-in-from-bottom-4 space-y-6 duration-500"
          >
            <h3 className="mb-6 text-2xl font-bold">Volunteer Application</h3>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div className="space-y-2">
                <label htmlFor="v-name" className="text-sm font-semibold">
                  Full Name *
                </label>
                <input
                  type="text"
                  id="v-name"
                  name="fullName"
                  required
                  className="bg-background border-border focus:ring-primary w-full rounded-xl border px-4 py-3 focus:ring-2 focus:outline-none"
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="v-email" className="text-sm font-semibold">
                  Email Address *
                </label>
                <input
                  type="email"
                  id="v-email"
                  name="email"
                  required
                  className="bg-background border-border focus:ring-primary w-full rounded-xl border px-4 py-3 focus:ring-2 focus:outline-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div className="space-y-2">
                <label htmlFor="v-phone" className="text-sm font-semibold">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  id="v-phone"
                  name="phone"
                  required
                  className="bg-background border-border focus:ring-primary w-full rounded-xl border px-4 py-3 focus:ring-2 focus:outline-none"
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="v-area" className="text-sm font-semibold">
                  Primary Area of Interest
                </label>
                <select
                  id="v-area"
                  name="areasOfInterest"
                  className="bg-background border-border focus:ring-primary w-full rounded-xl border px-4 py-3 focus:ring-2 focus:outline-none"
                >
                  <option value="events">Event Support</option>
                  <option value="mentorship">Mentorship & Coaching</option>
                  <option value="fundraising">Fundraising Campaigns</option>
                  <option value="admin_support">Administrative Support</option>
                  <option value="other">Other / Open to anything</option>
                </select>
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="v-message" className="text-sm font-semibold">
                Why do you want to volunteer? (Optional)
              </label>
              <textarea
                id="v-message"
                name="message"
                rows={4}
                className="bg-background border-border focus:ring-primary w-full resize-none rounded-xl border px-4 py-3 focus:ring-2 focus:outline-none"
              ></textarea>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className={cn(
                buttonVariants({ size: 'lg', className: 'h-14 w-full rounded-xl font-bold' }),
              )}
            >
              {isSubmitting ? 'Submitting Application...' : 'Submit Volunteer Application'}
            </button>
          </form>
        )}

        {/* Partner Form */}
        {activeTab === 'partner' && (
          <form
            onSubmit={handlePartnerSubmit}
            className="animate-in fade-in slide-in-from-bottom-4 space-y-6 duration-500"
          >
            <h3 className="mb-6 text-2xl font-bold">Partnership Inquiry</h3>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div className="space-y-2">
                <label htmlFor="p-org" className="text-sm font-semibold">
                  Organization Name *
                </label>
                <input
                  type="text"
                  id="p-org"
                  name="organizationName"
                  required
                  className="bg-background border-border focus:ring-primary w-full rounded-xl border px-4 py-3 focus:ring-2 focus:outline-none"
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="p-name" className="text-sm font-semibold">
                  Contact Person *
                </label>
                <input
                  type="text"
                  id="p-name"
                  name="contactName"
                  required
                  className="bg-background border-border focus:ring-primary w-full rounded-xl border px-4 py-3 focus:ring-2 focus:outline-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div className="space-y-2">
                <label htmlFor="p-email" className="text-sm font-semibold">
                  Email Address *
                </label>
                <input
                  type="email"
                  id="p-email"
                  name="email"
                  required
                  className="bg-background border-border focus:ring-primary w-full rounded-xl border px-4 py-3 focus:ring-2 focus:outline-none"
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="p-phone" className="text-sm font-semibold">
                  Phone Number
                </label>
                <input
                  type="tel"
                  id="p-phone"
                  name="phone"
                  className="bg-background border-border focus:ring-primary w-full rounded-xl border px-4 py-3 focus:ring-2 focus:outline-none"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="p-type" className="text-sm font-semibold">
                Partnership Type *
              </label>
              <select
                id="p-type"
                name="partnershipType"
                required
                className="bg-background border-border focus:ring-primary w-full rounded-xl border px-4 py-3 focus:ring-2 focus:outline-none"
              >
                <option value="corporate">Corporate Partnership</option>
                <option value="ngo">NGO Collaboration</option>
                <option value="institutional">Institutional / Academic</option>
                <option value="csr">CSR Engagement</option>
                <option value="sponsorship">Event Sponsorship</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div className="space-y-2">
              <label htmlFor="p-proposal" className="text-sm font-semibold">
                Partnership Proposal / Details *
              </label>
              <textarea
                id="p-proposal"
                name="proposal"
                required
                rows={5}
                placeholder="Tell us how we can collaborate..."
                className="bg-background border-border focus:ring-primary w-full resize-none rounded-xl border px-4 py-3 focus:ring-2 focus:outline-none"
              ></textarea>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className={cn(
                buttonVariants({ size: 'lg', className: 'h-14 w-full rounded-xl font-bold' }),
              )}
            >
              {isSubmitting ? 'Submitting Inquiry...' : 'Submit Partnership Inquiry'}
            </button>
          </form>
        )}

        {/* Donate Form */}
        {activeTab === 'donate' && (
          <form
            onSubmit={handleDonateSubmit}
            className="animate-in fade-in slide-in-from-bottom-4 space-y-6 duration-500"
          >
            <h3 className="mb-2 text-2xl font-bold">Fund the Future</h3>
            <p className="text-muted-foreground mb-6 text-sm">
              Submit a pledge below. A member of our team will contact you securely to arrange the
              transfer.
            </p>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div className="space-y-2">
                <label htmlFor="d-name" className="text-sm font-semibold">
                  Full Name *
                </label>
                <input
                  type="text"
                  id="d-name"
                  name="fullName"
                  required
                  className="bg-background border-border focus:ring-primary w-full rounded-xl border px-4 py-3 focus:ring-2 focus:outline-none"
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="d-email" className="text-sm font-semibold">
                  Email Address *
                </label>
                <input
                  type="email"
                  id="d-email"
                  name="email"
                  required
                  className="bg-background border-border focus:ring-primary w-full rounded-xl border px-4 py-3 focus:ring-2 focus:outline-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div className="space-y-2">
                <label htmlFor="d-amount" className="text-sm font-semibold">
                  Pledge Amount (USD) *
                </label>
                <input
                  type="number"
                  id="d-amount"
                  name="amount"
                  min="1"
                  required
                  className="bg-background border-border focus:ring-primary w-full rounded-xl border px-4 py-3 focus:ring-2 focus:outline-none"
                  placeholder="100"
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="d-freq" className="text-sm font-semibold">
                  Donation Frequency *
                </label>
                <select
                  id="d-freq"
                  name="frequency"
                  required
                  className="bg-background border-border focus:ring-primary w-full rounded-xl border px-4 py-3 focus:ring-2 focus:outline-none"
                >
                  <option value="one_time">One-time Donation</option>
                  <option value="monthly">Monthly Recurring</option>
                  <option value="yearly">Yearly Recurring</option>
                </select>
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="d-message" className="text-sm font-semibold">
                Message (Optional)
              </label>
              <textarea
                id="d-message"
                name="message"
                rows={3}
                placeholder="Is this donation in honor of someone?"
                className="bg-background border-border focus:ring-primary w-full resize-none rounded-xl border px-4 py-3 focus:ring-2 focus:outline-none"
              ></textarea>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className={cn(
                buttonVariants({ size: 'lg', className: 'h-14 w-full rounded-xl font-bold' }),
              )}
            >
              {isSubmitting ? 'Processing...' : 'Submit Donation Pledge'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
