import { auth } from "../../services/auth";
import { headers } from "next/headers";

export type Role = "CLIENT" | "ADMIN";

export async function getCurrentSession() {
  return await auth.api.getSession({
    headers: await headers()
  });
}

export async function requireAuth() {
  const session = await getCurrentSession();
  if (!session) {
    throw new Error("Unauthorized");
  }
  return session;
}

export async function requireRole(role: Role) {
  const session = await requireAuth();
  if (session.user.role !== role) {
    throw new Error("Forbidden");
  }
  return session;
}

export async function requireAdmin() {
  return requireRole("ADMIN");
}

export async function isResourceOwner(resourceUserId: string) {
  const session = await getCurrentSession();
  if (!session) return false;
  return session.user.id === resourceUserId || session.user.role === "ADMIN";
}

export async function requireResourceOwner(resourceUserId: string) {
  const isOwner = await isResourceOwner(resourceUserId);
  if (!isOwner) {
    throw new Error("Forbidden");
  }
}
