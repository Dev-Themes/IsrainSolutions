"use server";

import { requireAdmin } from "@/lib/auth";
import { writeFile, mkdir } from "fs/promises";
import { join } from "path";
import { existsSync } from "fs";
import crypto from "crypto";

export async function uploadImage(formData: FormData) {
  await requireAdmin();

  const file = formData.get("file") as File;
  if (!file) throw new Error("No file provided");

  const validTypes = ["image/jpeg", "image/png", "image/webp", "image/gif"];
  if (!validTypes.includes(file.type)) {
    throw new Error("Invalid file type. Only JPEG, PNG, WEBP, and GIF are allowed.");
  }

  if (file.size > 5 * 1024 * 1024) {
    throw new Error("File size exceeds 5MB limit.");
  }

  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  const uploadDir = join(process.cwd(), "public", "uploads");
  if (!existsSync(uploadDir)) {
    await mkdir(uploadDir, { recursive: true });
  }

  const extension = file.type.split("/")[1];
  const filename = `${crypto.randomUUID()}.${extension}`;
  const filepath = join(uploadDir, filename);

  await writeFile(filepath, buffer);

  return {
    url: `/uploads/${filename}`,
    success: true,
  };
}
