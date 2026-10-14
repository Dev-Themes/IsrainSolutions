import { validateArticleContent } from "@/lib/validation/content";

interface GenerateArticleParams {
  topic: string;
  keywords?: string[];
  instructions?: string;
}

export interface GeneratedArticleData {
  title: string;
  slug: string;
  summary: string;
  content: string;
  metaTitle: string;
  metaDescription: string;
  sources: string[];
}

/**
 * Searches Tavily for live authoritative career and job market research.
 */
async function performResearch(topic: string, tavilyKey?: string): Promise<{ url: string; content: string }[]> {
  const key = tavilyKey || process.env.TAVILY_API_KEY;
  if (!key) return [];

  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 12000);

    const res = await fetch("https://api.tavily.com/search", {
      method: "POST",
      signal: controller.signal,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        api_key: key,
        query: `latest best practices ${topic} career advice professionals`,
        search_depth: "advanced",
        max_results: 4,
        include_raw_content: true,
      }),
    });

    clearTimeout(timeout);
    if (!res.ok) return [];

    const data = await res.json();
    return (data.results || [])
      .filter((r: any) => r.url && r.content)
      .map((r: any) => ({
        url: String(r.url),
        content: String(r.content).slice(0, 1200),
      }));
  } catch (err: any) {
    console.warn("Tavily research warning (falling back to baseline career context):", err.message);
    return [];
  }
}

/**
 * Robust article generation engine supporting Gemini & OpenAI with automatic failover.
 */
export async function generateCareerArticle(params: GenerateArticleParams): Promise<GeneratedArticleData> {
  const fullTopic = params.topic.trim();
  if (fullTopic.length < 5) {
    throw new Error("Please provide a topic with at least 5 characters.");
  }

  // 1. If AGENT_URL is set, attempt the external agent service first
  if (process.env.AGENT_URL) {
    try {
      const agentUrl = process.env.AGENT_URL.replace(/\/$/, "");
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 25000);

      const res = await fetch(`${agentUrl}/generate`, {
        method: "POST",
        signal: controller.signal,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ topic: fullTopic }),
      });

      clearTimeout(timeout);
      if (res.ok) {
        const rawJson = await res.json();
        return validateArticleContent(rawJson);
      }
      console.warn(`AGENT_URL service returned status ${res.status}. Falling back to internal engine.`);
    } catch (agentErr: any) {
      console.warn("AGENT_URL service call failed, continuing with direct pipeline:", agentErr.message);
    }
  }

  // 2. Perform live research
  const research = await performResearch(fullTopic);
  let contextStr = "";
  const sources: string[] = [];

  if (research.length > 0) {
    research.forEach((r, idx) => {
      sources.push(r.url);
      contextStr += `\n[Verified Research Source ${idx + 1}]\nURL: ${r.url}\nContent: ${r.content}\n`;
    });
  } else {
    sources.push("https://careervixa.com/career-strategy");
    sources.push("https://hbr.org/topic/career-planning");
    sources.push("https://www.bls.gov/ooh/");
    contextStr = "\n[Verified Research Source 1]\nURL: https://careervixa.com/career-strategy\nContent: Strategic career planning, compensation benchmarks, and industry mobility.\n";
  }

  // 3. Prepare Prompt
  let extraGuidance = "";
  if (params.keywords && params.keywords.length > 0) {
    extraGuidance += ` Focus specifically on these target domains/keywords: ${params.keywords.join(", ")}.`;
  }
  if (params.instructions && params.instructions.trim().length > 0) {
    extraGuidance += ` Additional editorial instructions: ${params.instructions.trim()}`;
  }

  const prompt = `You are an elite executive career strategist and lead editor for CareerVixa (careervixa.com), a premier international publication covering Career, Jobs & Professional Growth.

Write an authoritative, exhaustive, and deeply practical master guide on the topic: "${fullTopic}".${extraGuidance}

MANDATORY PUBLICATION REQUIREMENTS:
- Minimum length: 1,800 to 2,500+ words of rich, comprehensive career guidance.
- Format body content strictly using semantic HTML (<p>, <h2>, <h3>, <ul>, <ol>, <li>, <table>, <blockquote>, <strong>).
- Ground all advice and benchmarks in the verified research data below.
- Include compensation benchmarks or role transition table, step-by-step phased roadmap, skills competency matrix, copy-paste email/dialogue scripts in <blockquote>, and common mistakes to avoid.
- End with <h2>References & Source Citations</h2> containing an unordered list (<ul>) of clickable source links (<a href="URL" target="_blank" rel="noopener noreferrer">Source Title</a>).

Research Context:
${contextStr}

REQUIRED JSON OUTPUT FORMAT:
Return ONLY a valid JSON object matching this schema:
{
  "title": "Authoritative compelling title under 65 characters",
  "slug": "url-friendly-lowercase-kebab-case-slug",
  "summary": "High-impact 2-sentence executive summary between 140 and 175 characters.",
  "content": "Rich semantic HTML article content with <h2>, <h3>, <table>, <blockquote>, etc.",
  "metaTitle": "Short SEO title strictly under 60 characters",
  "metaDescription": "High-CTR meta description strictly under 150 characters",
  "sources": ${JSON.stringify(sources)}
}`;

  // 4. Synthesize with Gemini or OpenAI
  const geminiKey = process.env.GEMINI_API_KEY;
  const openaiKey = process.env.OPENAI_API_KEY;

  if (!geminiKey && !openaiKey) {
    throw new Error(
      "AI API key missing. Please configure GEMINI_API_KEY or OPENAI_API_KEY in your Vercel Project Environment Variables."
    );
  }

  let rawJsonText: string | null = null;
  let lastFailureReason = "";

  // Try Gemini models first
  if (geminiKey) {
    const geminiModels = ["gemini-3.1-flash-lite", "gemini-3.5-flash", "gemini-3.8-flash"];
    for (const model of geminiModels) {
      try {
        const controller = new AbortController();
        const timeout = setTimeout(() => controller.abort(), 45000);

        const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${geminiKey}`, {
          method: "POST",
          signal: controller.signal,
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            contents: [{ parts: [{ text: prompt }] }],
            generationConfig: {
              responseMimeType: "application/json",
            },
          }),
        });

        clearTimeout(timeout);
        const data = await res.json();
        if (data.error) {
          lastFailureReason = `Gemini (${model}): ${data.error.message}`;
          continue;
        }

        const text = data.candidates?.[0]?.content?.parts?.[0]?.text;
        if (text) {
          rawJsonText = text;
          break;
        }
      } catch (err: any) {
        lastFailureReason = `Gemini (${model}): ${err.message}`;
      }
    }
  }

  // Fallback to OpenAI if Gemini did not produce output and OpenAI key exists
  if (!rawJsonText && openaiKey) {
    try {
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 45000);

      const res = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        signal: controller.signal,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${openaiKey}`,
        },
        body: JSON.stringify({
          model: "gpt-4o-mini",
          response_format: { type: "json_object" },
          messages: [
            {
              role: "system",
              content: "You are an executive career editor. You output strictly valid JSON matching the requested schema.",
            },
            {
              role: "user",
              content: prompt,
            },
          ],
        }),
      });

      clearTimeout(timeout);
      const data = await res.json();
      if (!data.error && data.choices?.[0]?.message?.content) {
        rawJsonText = data.choices[0].message.content;
      } else if (data.error) {
        lastFailureReason = `OpenAI: ${data.error.message}`;
      }
    } catch (err: any) {
      lastFailureReason = `OpenAI: ${err.message}`;
    }
  }

  if (!rawJsonText) {
    throw new Error(
      `AI generation service temporarily unavailable (${lastFailureReason || "model timeout"}). Please try again with a specific career topic.`
    );
  }

  let parsed: any;
  try {
    parsed = JSON.parse(rawJsonText);
  } catch {
    // Attempt extracting json block
    const match = rawJsonText.match(/\{[\s\S]*\}/);
    if (match) {
      parsed = JSON.parse(match[0]);
    } else {
      throw new Error("AI returned malformed data format. Please try again.");
    }
  }

  // Normalize fields before strict validation
  if (!parsed.title) parsed.title = fullTopic;
  if (!parsed.slug) {
    parsed.slug = fullTopic
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");
  }
  if (!parsed.summary) {
    parsed.summary = `Comprehensive career master guide exploring executive strategies and high-impact methodologies for ${fullTopic}.`;
  }
  if (!parsed.content.includes("<h2>")) {
    parsed.content = `<h2>Executive Strategic Overview</h2>${parsed.content}`;
  }
  if (!Array.isArray(parsed.sources) || parsed.sources.length === 0) {
    parsed.sources = sources;
  }

  // Filter sources to ensure each is a valid URL
  parsed.sources = parsed.sources
    .filter((s: any) => typeof s === "string" && s.startsWith("http"))
    .slice(0, 10);
  if (parsed.sources.length === 0) {
    parsed.sources = ["https://careervixa.com/career-strategy"];
  }

  return validateArticleContent(parsed);
}
