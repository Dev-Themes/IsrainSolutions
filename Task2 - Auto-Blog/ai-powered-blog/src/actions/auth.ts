"use server";

import { auth } from "../services/auth";
import { loginSchema, registerSchema, LoginInput, RegisterInput } from "../lib/auth/validation";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export async function registerUser(data: RegisterInput) {
  const parsed = registerSchema.safeParse(data);
  if (!parsed.success) {
    return { error: parsed.error.issues[0].message };
  }

  try {
    const response = await auth.api.signUpEmail({
      body: {
        email: parsed.data.email,
        password: parsed.data.password,
        name: parsed.data.name,
        role: "CLIENT"
      },
      headers: await headers(),
      asResponse: true
    });
    
    // Better auth with asResponse: true returns a fetch Response.
    // If it is not ok, we handle it
    if (!response.ok) {
        const resData = await response.json().catch(() => ({}));
        return { error: resData.message || response.statusText || "Registration failed" };
    }
  } catch (err) {
    return { error: err instanceof Error ? err.message : "Registration failed" };
  }

  redirect("/dashboard");
}

export async function loginUser(data: LoginInput) {
  const parsed = loginSchema.safeParse(data);
  if (!parsed.success) {
    return { error: parsed.error.issues[0].message };
  }

  try {
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
        return { error: resData.message || "Invalid credentials" };
    }
  } catch (err) {
    return { error: "Invalid credentials" };
  }

  redirect("/dashboard");
}

export async function logoutUser() {
  try {
      await auth.api.signOut({
          headers: await headers(),
          asResponse: true
      });
  } catch(e) {}
  redirect("/");
}
