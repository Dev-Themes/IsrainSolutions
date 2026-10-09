'use server';

import { contactSchema } from '@/lib/validation/contact';
import { deliverLead } from '@/lib/lead-delivery';

export async function submitContact(prevState: any, formData: FormData) {
  // 1. Check honeypot
  if (formData.get('website')) {
    return { ok: true }; // Generic success
  }

  // 2. Check timing (formStartedAt)
  const formStartedAt = formData.get('formStartedAt') as string;
  if (!formStartedAt) {
    return { ok: false, message: 'Invalid submission. Please try again.' };
  }
  const startedAt = parseInt(formStartedAt, 10);
  if (Date.now() - startedAt < 2000) {
    return { ok: false, message: 'Submission too fast. Please try again.' };
  }

  // 3. Parse and validate
  const rawData = {
    requestType: formData.get('requestType'),
    name: formData.get('name'),
    phone: formData.get('phone'),
    email: formData.get('email') || '',
    address: formData.get('address') || '',
    service: formData.get('service'),
    issue: formData.get('issue'),
    contactMethod: formData.get('contactMethod'),
    textConsent: formData.get('textConsent') === 'on',
  };

  const parsed = contactSchema.safeParse(rawData);

  if (!parsed.success) {
    return {
      ok: false,
      errors: parsed.error.flatten().fieldErrors,
      message: 'Please fix the errors in the form.',
    };
  }

  // 4. Deliver lead
  const result = await deliverLead(parsed.data);

  if (!result.ok) {
    return { ok: false, message: result.message || 'Something went wrong.' };
  }

  return { ok: true };
}
