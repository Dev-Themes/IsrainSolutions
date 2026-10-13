import { z } from "zod";

export const ContributorProfileSchema = z.object({
  fullName: z.string().min(2, "Full name must be at least 2 characters").max(100),
  organization: z.string().max(100, "Organization name cannot exceed 100 characters").optional().nullable(),
  country: z.string().min(2, "Country is required").max(100),
  phoneNumber: z.string().max(30, "Phone number cannot exceed 30 characters").optional().nullable(),
  bio: z.string().max(500, "Bio cannot exceed 500 characters").optional().nullable(),
  websiteUrl: z.string().url("Must be a valid URL").optional().nullable().or(z.literal("")),
});

export type ContributorProfileInput = z.infer<typeof ContributorProfileSchema>;
