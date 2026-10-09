import { z } from 'zod';

export const contactSchema = z.object({
  requestType: z.enum(['emergency', 'schedule']),
  name: z.string().min(1, 'Full name is required'),
  phone: z.string().min(10, 'Phone number must be at least 10 digits'),
  email: z.string().email('Invalid email address').or(z.literal('')),
  address: z.string().optional(),
  service: z.string().min(1, 'Please select a service'),
  issue: z.string().min(20, 'Please provide more details (at least 20 characters)').max(800, 'Issue description cannot exceed 800 characters'),
  contactMethod: z.enum(['call', 'text', 'email']),
  textConsent: z.boolean().optional(),
  website: z.string().optional(), // honeypot
  formStartedAt: z.string().min(1),
}).superRefine((data, ctx) => {
  if (data.contactMethod === 'text' && !data.textConsent) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: 'You must agree to receive text messages if you prefer text contact',
      path: ['textConsent'],
    });
  }
});

export type ContactFormData = z.infer<typeof contactSchema>;
