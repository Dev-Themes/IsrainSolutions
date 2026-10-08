import { headers } from "next/headers";
import { auth } from "@/services/auth";

export async function requireAdmin() {
  const session = await auth.api.getSession({
    headers: await headers()
  });

  if (!session || session.user.role !== "ADMIN") {
    return false;
  }

  return true;
}

export async function getSession() {
  return await auth.api.getSession({
    headers: await headers()
  });
}
