'use server';

import { getPayloadClient } from '@/lib/payload';
import { revalidatePath } from 'next/cache';

export async function submitVolunteerApplication(formData: FormData) {
  const payload = await getPayloadClient();
  
  try {
    // Extract areas of interest - Handle possible multiple selections
    // Note: FormData.getAll() might be empty depending on how the frontend form encodes it. 
    // We'll capture a single value if it's a simple select or text for safety
    const areas = formData.getAll('areasOfInterest').map(String);
    const validAreas = areas.length > 0 ? areas : ['other'];
    
    await payload.create({
      collection: 'volunteers',
      data: {
        fullName: String(formData.get('fullName') || ''),
        email: String(formData.get('email') || ''),
        phone: String(formData.get('phone') || ''),
        areasOfInterest: validAreas as any,
        message: String(formData.get('message') || ''),
        status: 'pending',
      },
    });

    return { success: true, message: 'Your volunteer application has been submitted successfully. We will be in touch soon!' };
  } catch (error) {
    console.error('Volunteer submission error:', error);
    return { success: false, message: 'Failed to submit application. Please try again later.' };
  }
}

export async function submitPartnershipInquiry(formData: FormData) {
  const payload = await getPayloadClient();
  
  try {
    await payload.create({
      collection: 'partnership-requests',
      data: {
        organizationName: String(formData.get('organizationName') || ''),
        contactName: String(formData.get('contactName') || ''),
        email: String(formData.get('email') || ''),
        phone: String(formData.get('phone') || ''),
        partnershipType: String(formData.get('partnershipType') || 'other') as any,
        proposal: String(formData.get('proposal') || ''),
        status: 'new',
      },
    });

    return { success: true, message: 'Your partnership inquiry has been received. Our team will review your proposal and respond shortly.' };
  } catch (error) {
    console.error('Partnership submission error:', error);
    return { success: false, message: 'Failed to submit inquiry. Please try again later.' };
  }
}

export async function submitDonationLead(formData: FormData) {
  const payload = await getPayloadClient();
  
  try {
    await payload.create({
      collection: 'donation-leads',
      data: {
        fullName: String(formData.get('fullName') || ''),
        email: String(formData.get('email') || ''),
        amount: Number(formData.get('amount')) || 0,
        frequency: String(formData.get('frequency') || 'one_time') as any,
        message: String(formData.get('message') || ''),
        status: 'new',
      },
    });

    return { success: true, message: 'Thank you for your pledge! Our team will contact you securely to complete the donation process.' };
  } catch (error) {
    console.error('Donation lead submission error:', error);
    return { success: false, message: 'Failed to process pledge. Please try again later.' };
  }
}
