"use server";

import { auth } from "../services/auth";
import { loginSchema, LoginInput } from "../lib/auth/validation";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { db } from "../db";
import { user } from "../db/schema";
import { eq } from "drizzle-orm";

export async function adminLoginAction(data: LoginInput) {
  const parsed = loginSchema.safeParse(data);
  if (!parsed.success) {
    return { error: parsed.error.issues[0].message };
  }

  try {
    // First, verify the user actually exists and is an ADMIN before signing in
    // This adds an extra layer of protection
    const existingUser = await db.select().from(user).where(eq(user.email, parsed.data.email)).limit(1);
    
    if (!existingUser.length || existingUser[0].role !== "ADMIN") {
        return { error: "Invalid admin credentials" };
    }

    const response = await auth.api.signInEmail({
      body: {
        email: parsed.data.email,
        password: parsed.data.password,
      },
      headers: await headers(),
      asResponse: true
    });
    
    if (!response.ok) {
        const resData = await response.json().catch(() => ({}));
        return { error: resData.message || "Invalid admin credentials" };
    }
  } catch (err) {
    return { error: "Invalid admin credentials" };
  }

  redirect("/admin");
}
