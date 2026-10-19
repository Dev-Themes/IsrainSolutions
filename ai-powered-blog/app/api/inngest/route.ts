import { serve } from "inngest/next";
import { inngest } from "@/inngest/client";
import { dailyAIPublisher } from "@/inngest/functions";

export const dynamic = "force-dynamic";

// Create an API that serves zero-config background jobs
export const { GET, POST, PUT } = serve({
  client: inngest,
  functions: [
    dailyAIPublisher
  ],
});
