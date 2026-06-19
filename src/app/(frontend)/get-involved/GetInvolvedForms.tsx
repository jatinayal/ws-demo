'use client';

import React, { useState } from 'react';
import { submitVolunteerApplication, submitPartnershipInquiry, submitDonationLead } from './actions';
import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Heart, Users, Briefcase, AlertCircle, CheckCircle2 } from 'lucide-react';

export function GetInvolvedForms() {
  const [activeTab, setActiveTab] = useState<'volunteer' | 'partner' | 'donate'>('volunteer');
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
    <div className="bg-card rounded-3xl p-6 md:p-10 border border-border/50 shadow-2xl shadow-black/5">
      {/* Tabs */}
      <div className="flex flex-wrap gap-2 md:gap-4 mb-10 border-b border-border pb-6">
        <button 
          onClick={() => { setActiveTab('volunteer'); setFormStatus(null); }}
          className={`flex-1 min-w-[140px] px-4 py-3 rounded-2xl flex items-center justify-center font-bold text-sm transition-all ${activeTab === 'volunteer' ? 'bg-primary text-white shadow-md' : 'bg-muted text-muted-foreground hover:bg-muted/80'}`}
        >
          <Users className="w-4 h-4 mr-2" /> Volunteer
        </button>
        <button 
          onClick={() => { setActiveTab('partner'); setFormStatus(null); }}
          className={`flex-1 min-w-[140px] px-4 py-3 rounded-2xl flex items-center justify-center font-bold text-sm transition-all ${activeTab === 'partner' ? 'bg-primary text-white shadow-md' : 'bg-muted text-muted-foreground hover:bg-muted/80'}`}
        >
          <Briefcase className="w-4 h-4 mr-2" /> Partner With Us
        </button>
        <button 
          onClick={() => { setActiveTab('donate'); setFormStatus(null); }}
          className={`flex-1 min-w-[140px] px-4 py-3 rounded-2xl flex items-center justify-center font-bold text-sm transition-all ${activeTab === 'donate' ? 'bg-primary text-white shadow-md' : 'bg-muted text-muted-foreground hover:bg-muted/80'}`}
        >
          <Heart className="w-4 h-4 mr-2" /> Donate
        </button>
      </div>

      {/* Status Message */}
      {formStatus && (
        <div className={`p-6 rounded-2xl mb-8 flex items-start ${formStatus.success ? 'bg-green-50 dark:bg-green-950/30 border border-green-200 dark:border-green-900' : 'bg-destructive/10 border border-destructive/20'}`}>
          {formStatus.success ? <CheckCircle2 className="w-6 h-6 text-green-600 dark:text-green-500 mr-4 shrink-0" /> : <AlertCircle className="w-6 h-6 text-destructive mr-4 shrink-0" />}
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

      {/* Forms */}
      <div className="relative">
        
        {/* Volunteer Form */}
        {activeTab === 'volunteer' && (
          <form onSubmit={handleVolunteerSubmit} className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <h3 className="text-2xl font-bold mb-6">Volunteer Application</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label htmlFor="v-name" className="text-sm font-semibold">Full Name *</label>
                <input type="text" id="v-name" name="fullName" required className="w-full bg-background border border-border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary" />
              </div>
              <div className="space-y-2">
                <label htmlFor="v-email" className="text-sm font-semibold">Email Address *</label>
                <input type="email" id="v-email" name="email" required className="w-full bg-background border border-border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary" />
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label htmlFor="v-phone" className="text-sm font-semibold">Phone Number *</label>
                <input type="tel" id="v-phone" name="phone" required className="w-full bg-background border border-border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary" />
              </div>
              <div className="space-y-2">
                <label htmlFor="v-area" className="text-sm font-semibold">Primary Area of Interest</label>
                <select id="v-area" name="areasOfInterest" className="w-full bg-background border border-border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary">
                  <option value="events">Event Support</option>
                  <option value="mentorship">Mentorship & Coaching</option>
                  <option value="fundraising">Fundraising Campaigns</option>
                  <option value="admin_support">Administrative Support</option>
                  <option value="other">Other / Open to anything</option>
                </select>
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="v-message" className="text-sm font-semibold">Why do you want to volunteer? (Optional)</label>
              <textarea id="v-message" name="message" rows={4} className="w-full bg-background border border-border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary resize-none"></textarea>
            </div>

            <button type="submit" disabled={isSubmitting} className={cn(buttonVariants({ size: 'lg', className: 'w-full rounded-xl font-bold h-14' }))}>
              {isSubmitting ? 'Submitting Application...' : 'Submit Volunteer Application'}
            </button>
          </form>
        )}

        {/* Partner Form */}
        {activeTab === 'partner' && (
          <form onSubmit={handlePartnerSubmit} className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <h3 className="text-2xl font-bold mb-6">Partnership Inquiry</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label htmlFor="p-org" className="text-sm font-semibold">Organization Name *</label>
                <input type="text" id="p-org" name="organizationName" required className="w-full bg-background border border-border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary" />
              </div>
              <div className="space-y-2">
                <label htmlFor="p-name" className="text-sm font-semibold">Contact Person *</label>
                <input type="text" id="p-name" name="contactName" required className="w-full bg-background border border-border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary" />
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label htmlFor="p-email" className="text-sm font-semibold">Email Address *</label>
                <input type="email" id="p-email" name="email" required className="w-full bg-background border border-border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary" />
              </div>
              <div className="space-y-2">
                <label htmlFor="p-phone" className="text-sm font-semibold">Phone Number</label>
                <input type="tel" id="p-phone" name="phone" className="w-full bg-background border border-border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary" />
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="p-type" className="text-sm font-semibold">Partnership Type *</label>
              <select id="p-type" name="partnershipType" required className="w-full bg-background border border-border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary">
                <option value="corporate">Corporate Partnership</option>
                <option value="ngo">NGO Collaboration</option>
                <option value="institutional">Institutional / Academic</option>
                <option value="csr">CSR Engagement</option>
                <option value="sponsorship">Event Sponsorship</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div className="space-y-2">
              <label htmlFor="p-proposal" className="text-sm font-semibold">Partnership Proposal / Details *</label>
              <textarea id="p-proposal" name="proposal" required rows={5} placeholder="Tell us how we can collaborate..." className="w-full bg-background border border-border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary resize-none"></textarea>
            </div>

            <button type="submit" disabled={isSubmitting} className={cn(buttonVariants({ size: 'lg', className: 'w-full rounded-xl font-bold h-14' }))}>
              {isSubmitting ? 'Submitting Inquiry...' : 'Submit Partnership Inquiry'}
            </button>
          </form>
        )}

        {/* Donate Form */}
        {activeTab === 'donate' && (
          <form onSubmit={handleDonateSubmit} className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <h3 className="text-2xl font-bold mb-2">Fund the Future</h3>
            <p className="text-muted-foreground text-sm mb-6">Submit a pledge below. A member of our team will contact you securely to arrange the transfer.</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label htmlFor="d-name" className="text-sm font-semibold">Full Name *</label>
                <input type="text" id="d-name" name="fullName" required className="w-full bg-background border border-border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary" />
              </div>
              <div className="space-y-2">
                <label htmlFor="d-email" className="text-sm font-semibold">Email Address *</label>
                <input type="email" id="d-email" name="email" required className="w-full bg-background border border-border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary" />
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label htmlFor="d-amount" className="text-sm font-semibold">Pledge Amount (USD) *</label>
                <input type="number" id="d-amount" name="amount" min="1" required className="w-full bg-background border border-border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary" placeholder="100" />
              </div>
              <div className="space-y-2">
                <label htmlFor="d-freq" className="text-sm font-semibold">Donation Frequency *</label>
                <select id="d-freq" name="frequency" required className="w-full bg-background border border-border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary">
                  <option value="one_time">One-time Donation</option>
                  <option value="monthly">Monthly Recurring</option>
                  <option value="yearly">Yearly Recurring</option>
                </select>
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="d-message" className="text-sm font-semibold">Message (Optional)</label>
              <textarea id="d-message" name="message" rows={3} placeholder="Is this donation in honor of someone?" className="w-full bg-background border border-border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary resize-none"></textarea>
            </div>

            <button type="submit" disabled={isSubmitting} className={cn(buttonVariants({ size: 'lg', className: 'w-full rounded-xl font-bold h-14' }))}>
              {isSubmitting ? 'Processing...' : 'Submit Donation Pledge'}
            </button>
          </form>
        )}

      </div>
    </div>
  );
}
