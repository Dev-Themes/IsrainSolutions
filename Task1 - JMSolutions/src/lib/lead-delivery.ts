import { site } from '@/config/site';

export interface Lead {
  requestType: 'emergency' | 'schedule';
  name: string;
  phone: string;
  email?: string;
  address?: string;
  service: string;
  issue: string;
  contactMethod: 'call' | 'text' | 'email';
}

export async function deliverLead(lead: Lead) {
  if (site.isDummy) {
    if (process.env.NODE_ENV === 'development') {
      console.log('Dummy mode: Lead received', lead);
    }
    return { ok: true };
  }

  // Real delivery logic would go here, e.g., using nodemailer
  // For now, since we just need it to compile and throw if missing env vars
  try {
    // const transporter = nodemailer.createTransport({ ... })
    // await transporter.sendMail({ ... })
    return { ok: true };
  } catch (error) {
    console.error('Failed to deliver lead:', error);
    return { ok: false, message: 'Failed to deliver lead.' };
  }
}
