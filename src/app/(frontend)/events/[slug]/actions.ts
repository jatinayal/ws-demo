'use server';

import { getPayloadClient } from '@/lib/payload';
import { redirect } from 'next/navigation';

export async function submitEventRegistration(formData: FormData) {
  const eventIdStr = formData.get('eventId') as string;
  const name = formData.get('name') as string;
  const email = formData.get('email') as string;
  const phone = formData.get('phone') as string;

  if (!eventIdStr || !name || !email) {
    console.error('Missing required fields');
    redirect('?error=missing_fields');
  }

  const eventId = parseInt(eventIdStr, 10);
  if (isNaN(eventId)) {
    console.error('Invalid eventId:', eventIdStr);
    redirect('?error=invalid_event');
  }

  const payload = await getPayloadClient();

  try {
    const newRegistration = await payload.create({
      collection: 'event-registrations',
      data: {
        event: eventId,
        name,
        email,
        phone,
        status: 'pending',
      },
    });
    console.log('Successfully registered for event:', newRegistration.id);
  } catch (error) {
    console.error('Failed to register for event:', error);
    // Log structured details if error is a ValidationError
    if (error && typeof error === 'object' && 'data' in error) {
      console.error('Validation Error details:', (error as { data?: unknown }).data);
    }
    redirect('?error=registration_failed');
  }

  redirect('?success=true');
}
