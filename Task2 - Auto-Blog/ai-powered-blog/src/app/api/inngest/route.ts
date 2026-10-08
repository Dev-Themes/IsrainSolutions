import { serve } from "inngest/next";
import { inngest } from "@/services/inngest/client";

// Create an API that serves zero functions right now (to be added in future specs)
export const { GET, POST, PUT } = serve({
  client: inngest,
  functions: [
    /* your functions will be passed here later! */
  ],
});
