"use server";

import * as z from "zod";
import argon2 from "argon2";
import { signupSchema } from "@/lib/validations/auth";
import { prisma } from "@/lib/prisma";
import { generateVerificationToken } from "@/lib/tokens";
import { sendVerificationEmail } from "@/lib/mail";

export const register = async (values: z.infer<typeof signupSchema>) => {
  try {
    const validatedFields = signupSchema.safeParse(values);

    if (!validatedFields.success) {
      return { error: "Invalid fields" };
    }

    const { email, password, name } = validatedFields.data;

    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      // Returning generic error to prevent account enumeration, or standard error
      return { error: "Email already in use" };
    }

    const passwordHash = await argon2.hash(password);

    await prisma.user.create({
      data: {
        name,
        email,
        passwordHash,
        role: "CLIENT",
      },
    });

    const verificationToken = await generateVerificationToken(email);
    
    // We intentionally don't await email sending to avoid blocking the response
    // In a real production app we might queue this
    sendVerificationEmail(email, verificationToken.token, name).catch(console.error);

    return { success: "Confirmation email sent!" };
  } catch (error) {
    console.error("Registration error:", error);
    return { error: "Something went wrong" };
  }
};
