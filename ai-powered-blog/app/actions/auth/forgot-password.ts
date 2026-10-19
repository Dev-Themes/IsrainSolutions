"use server";

import * as z from "zod";
import { forgotPasswordSchema } from "@/lib/validations/auth";
import { prisma } from "@/lib/prisma";
import { generatePasswordResetToken } from "@/lib/tokens";
import { sendPasswordResetEmail } from "@/lib/mail";

export const forgotPassword = async (values: z.infer<typeof forgotPasswordSchema>) => {
  try {
    const validatedFields = forgotPasswordSchema.safeParse(values);

    if (!validatedFields.success) {
      return { error: "Invalid email" };
    }

    const { email } = validatedFields.data;

    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (!existingUser) {
      // Don't leak whether the account exists
      return { success: "Reset email sent!" };
    }

    const passwordResetToken = await generatePasswordResetToken(email);
    
    sendPasswordResetEmail(email, passwordResetToken.token, existingUser.name || "there").catch(console.error);

    return { success: "Reset email sent!" };
  } catch (error) {
    console.error("Forgot password error:", error);
    return { error: "Something went wrong" };
  }
};
