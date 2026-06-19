'use server';

import { getPayloadClient } from '@/lib/payload';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export async function submitEventRegistration(formData: FormData) {
  const eventId = formData.get('eventId') as string;
  const name = formData.get('name') as string;
  const email = formData.get('email') as string;
  const phone = formData.get('phone') as string;

  if (!eventId || !name || !email) {
    throw new Error('Missing required fields');
  }

  const payload = await getPayloadClient();

  try {
    await payload.create({
      collection: 'event-registrations',
      data: {
        event: eventId as any,
        name,
        email,
        phone,
        status: 'pending',
      },
    });

    // In a real application, you might want to redirect to a thank you page
    // or return a success state to the component to show a success message.
    // We will just return success to let the form clear, but since we are using basic action,
    // we can redirect or return an object.
    
  } catch (error) {
    console.error('Failed to register for event:', error);
    throw new Error('Failed to register');
  }
  
  redirect('?success=true');
}
