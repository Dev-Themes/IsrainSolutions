import { createOpenAI } from "@ai-sdk/openai";

// The OpenAI API key will be validated via Zod env schema (T011)
// We provide a customized instance here that can be imported everywhere.
export const openai = createOpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

