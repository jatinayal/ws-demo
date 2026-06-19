'use server';

import { getPayloadClient } from '@/lib/payload';

export async function submitContactRequest(formData: FormData) {
  const payload = await getPayloadClient();

  try {
    const inquiryType = String(formData.get('inquiryType') || 'general');

    await payload.create({
      collection: 'contact-requests',
      data: {
        name: String(formData.get('name') || ''),
        email: String(formData.get('email') || ''),
        phone: String(formData.get('phone') || ''),
        inquiryType: inquiryType as
          | 'general'
          | 'program'
          | 'partnership'
          | 'donation'
          | 'media'
          | 'other',
        subject: String(formData.get('subject') || ''),
        message: String(formData.get('message') || ''),
        status: 'new',
      },
    });

    return {
      success: true,
      message:
        'Thank you for reaching out! Your message has been received. Our team will review it and get back to you shortly.',
    };
  } catch (error) {
    console.error('Contact submission error:', error);
    return {
      success: false,
      message:
        'Failed to send your message. Please try again later or contact us directly via email.',
    };
  }
}
