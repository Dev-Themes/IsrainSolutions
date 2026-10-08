import { z } from "zod";

const envSchema = z.object({
  DATABASE_URL: z.string().url(),
  BETTER_AUTH_SECRET: z.string().min(1),
  OPENAI_API_KEY: z.string().min(1),
  RESEND_API_KEY: z.string().min(1),
  INNGEST_EVENT_KEY: z.string().min(1),
  INNGEST_SIGNING_KEY: z.string().min(1),
  BLOB_READ_WRITE_TOKEN: z.string().min(1),
  SENTRY_DSN: z.string().url(),
});

// We only validate server-side environment variables
const parseEnv = () => {
  if (typeof window !== "undefined") return {} as z.infer<typeof envSchema>;
  
  const parsed = envSchema.safeParse(process.env);
  
  if (!parsed.success) {
    console.error("❌ Invalid environment variables:", parsed.error.format());
    throw new Error("Invalid environment variables");
  }
  
  return parsed.data;
};

export const env = parseEnv();
