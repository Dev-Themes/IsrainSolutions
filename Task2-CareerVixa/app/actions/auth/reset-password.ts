"use server";

import * as z from "zod";
import argon2 from "argon2";
import { resetPasswordSchema } from "@/lib/validations/auth";
import { prisma } from "@/lib/prisma";

export const resetPassword = async (values: z.infer<typeof resetPasswordSchema>) => {
  try {
    const validatedFields = resetPasswordSchema.safeParse(values);

    if (!validatedFields.success) {
      return { error: "Invalid fields" };
    }

    const { token, password } = validatedFields.data;

    const existingToken = await prisma.verificationToken.findUnique({
      where: { token },
    });

    if (!existingToken) {
      return { error: "Invalid token" };
    }

    const hasExpired = new Date(existingToken.expires) < new Date();

    if (hasExpired) {
      return { error: "Token has expired" };
    }

    const existingUser = await prisma.user.findUnique({
      where: { email: existingToken.identifier },
    });

    if (!existingUser) {
      return { error: "Email does not exist" };
    }

    const passwordHash = await argon2.hash(password);

    await prisma.user.update({
      where: { id: existingUser.id },
      data: { passwordHash },
    });

    await prisma.verificationToken.delete({
      where: { token: existingToken.token },
    });

    return { success: "Password updated successfully!" };
  } catch (error) {
    console.error("Reset password error:", error);
    return { error: "Something went wrong" };
  }
};
