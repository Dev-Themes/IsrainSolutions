"use server";

import { db } from "@/db";
import { user } from "@/db/schema";
import { requireAdmin } from "@/lib/auth/guards";

export async function getUsers() {
  await requireAdmin();
  return await db.select().from(user);
}
