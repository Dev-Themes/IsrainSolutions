"use server";

import { prisma } from "@/lib/prisma";
import { requireClientUser } from "@/lib/client/auth";
import { ContributorProfileSchema, ContributorProfileInput } from "@/lib/validation/contributor-profile";
import { revalidatePath } from "next/cache";

export async function getContributorProfile() {
  const session = await requireClientUser({ redirectOnFail: false });
  const userId = session.user.id;

  const profile = await prisma.contributorProfile.findUnique({
    where: { userId },
  });

  return {
    profile,
    user: {
      id: session.user.id,
      name: session.user.name,
      email: session.user.email,
    },
  };
}

export async function upsertContributorProfile(input: ContributorProfileInput) {
  const session = await requireClientUser({ redirectOnFail: false });
  const userId = session.user.id;

  const validated = ContributorProfileSchema.parse(input);

  const profile = await prisma.contributorProfile.upsert({
    where: { userId },
    update: {
      fullName: validated.fullName,
      organization: validated.organization,
      country: validated.country,
      phoneNumber: validated.phoneNumber,
      bio: validated.bio,
      websiteUrl: validated.websiteUrl,
    },
    create: {
      userId,
      fullName: validated.fullName,
      organization: validated.organization,
      country: validated.country,
      phoneNumber: validated.phoneNumber,
      bio: validated.bio,
      websiteUrl: validated.websiteUrl,
    },
  });

  revalidatePath("/dashboard/settings");
  revalidatePath("/dashboard");

  return { success: true, profile };
}
