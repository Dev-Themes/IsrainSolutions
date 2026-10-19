"use server";

import * as z from "zod";
import argon2 from "argon2";
import { signupSchema } from "@/lib/validations/auth";
import { prisma } from "@/lib/prisma";
import { generateVerificationToken } from "@/lib/tokens";
import { sendVerificationEmail } from "@/lib/mail";

export const register = async (_values: z.infer<typeof signupSchema>) => {
  return {
    error: "Public contributor registration has been discontinued. External contributors submit pitches via the Write for Us editorial process.",
  };
};
