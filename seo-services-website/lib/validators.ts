import { z } from "zod";

export const briefFormSchema = z.object({
  fullName: z.string().min(2, "Full name must be at least 2 characters."),
  email: z.string().email("Please provide a valid email address."),
  website: z.string().min(3, "Please provide a valid website URL."),
  service: z.string().min(1, "Please select a service."),
  budget: z.string().min(1, "Please select an estimated budget range."),
  targetDetails: z.string().min(5, "Please specify your target URL and keywords."),
  humanAnswer: z.string().min(1, "Please answer the human verification question."),
  niches: z.array(z.string()).optional(),
  honeypot: z.string().optional(),
});

export type BriefFormInput = z.infer<typeof briefFormSchema>;
