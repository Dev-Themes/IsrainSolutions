import { prisma } from "@/lib/prisma";

/**
 * Stop words, title filler, and common prefixes/suffixes to strip during normalization.
 */
const STRIP_WORDS = new Set([
  "how", "to", "a", "an", "the", "in", "for", "and", "of", "with", "on",
  "guide", "master", "mastering", "navigating", "strategies", "strategy",
  "tips", "best", "practices", "role", "future", "what", "is", "ultimate",
  "essential", "step", "by", "comprehensive", "overview", "top", "tricks",
  "hacks", "roadmap", "handbook", "blueprint", "accelerate", "practical"
]);

/**
 * Common career synonym canonicalization map.
 */
const SYNONYM_MAP: Record<string, string> = {
  "cv": "resume",
  "resumes": "resume",
  "cvs": "resume",
  "jobs": "career",
  "job": "career",
  "careers": "career",
  "profession": "career",
  "professional": "career",
  "professions": "career",
  "compensation": "salary",
  "pay": "salary",
  "earnings": "salary",
  "salaries": "salary",
  "wfh": "remotework",
  "telecommute": "remotework",
  "telecommuting": "remotework",
  "agents": "agent",
  "agentic": "agent",
  "interviewing": "interview",
  "interviews": "interview",
  "negotiations": "negotiate",
  "negotiation": "negotiate",
  "negotiating": "negotiate",
  "effectively": "productive",
  "efficiency": "productive",
  "productivity": "productive",
  "grads": "graduates",
  "graduate": "graduates",
};

/**
 * Normalizes a topic string into a set of canonical semantic tokens.
 */
export function normalizeTopicTokens(text: string): string[] {
  if (!text) return [];

  // 1. Lowercase and normalize common phrases
  let cleaned = text
    .toLowerCase()
    .replace(/\bworking from home\b|\bwork from home\b|\bremote work\b/g, "remotework")
    .replace(/\btool calling\b/g, "toolcalling")
    .replace(/\bnew graduates\b|\bcollege grads\b|\bentry level\b/g, "graduates")
    .replace(/['’]/g, "")
    .replace(/[^a-z0-9\s]/g, " ");

  // 2. Remove calendar years (e.g. 2024, 2025, 2026, 2027)
  cleaned = cleaned.replace(/\b202[0-9]\b/g, " ");

  // 3. Tokenize and map synonyms
  const rawTokens = cleaned.split(/\s+/).filter(Boolean);
  const result: string[] = [];

  for (const token of rawTokens) {
    if (STRIP_WORDS.has(token)) continue;
    const mapped = SYNONYM_MAP[token] || token;
    result.push(mapped);
  }

  return Array.from(new Set(result));
}

/**
 * Computes Jaccard token similarity between two strings.
 */
export function calculateTokenSimilarity(tokensA: string[], tokensB: string[]): number {
  if (tokensA.length === 0 || tokensB.length === 0) return 0;

  const setA = new Set(tokensA);
  const setB = new Set(tokensB);

  let intersectionCount = 0;
  for (const token of setA) {
    if (setB.has(token)) {
      intersectionCount++;
    }
  }

  const unionCount = new Set([...tokensA, ...tokensB]).size;
  return unionCount === 0 ? 0 : intersectionCount / unionCount;
}

/**
 * Deterministic pre-filter: Checks if candidate topic has substantial token or phrase overlap
 * with any existing published article title.
 */
export function checkDeterministicOverlap(
  candidateTopic: string,
  existingTitles: string[]
): { isOverlap: boolean; matchedTitle?: string; similarityScore: number; reason?: string } {
  const candidateTokens = normalizeTopicTokens(candidateTopic);
  if (candidateTokens.length === 0) {
    return { isOverlap: false, similarityScore: 0 };
  }

  const candidateNormStr = candidateTokens.sort().join(" ");

  for (const title of existingTitles) {
    const existingTokens = normalizeTopicTokens(title);
    if (existingTokens.length === 0) continue;

    // Exact normalized stem equivalence
    const existingNormStr = existingTokens.sort().join(" ");
    if (candidateNormStr === existingNormStr) {
      return {
        isOverlap: true,
        matchedTitle: title,
        similarityScore: 1.0,
        reason: `Candidate normalized stem matches existing article "${title}" identically.`,
      };
    }

    // High Jaccard token overlap (>= 0.65 indicates substantially identical scope and phrasing)
    const similarity = calculateTokenSimilarity(candidateTokens, existingTokens);
    if (similarity >= 0.65) {
      return {
        isOverlap: true,
        matchedTitle: title,
        similarityScore: similarity,
        reason: `High token overlap (${Math.round(similarity * 100)}%) with existing article "${title}".`,
      };
    }

    // Subset containment check: If one topic's non-trivial tokens are completely contained within the other
    // and both share at least 3 core tokens
    const setC = new Set(candidateTokens);
    const setE = new Set(existingTokens);
    const shared = candidateTokens.filter((t) => setE.has(t));

    if (shared.length >= 3 && (shared.length === candidateTokens.length || shared.length === existingTokens.length)) {
      return {
        isOverlap: true,
        matchedTitle: title,
        similarityScore: 0.85,
        reason: `Core semantic concepts [${shared.join(", ")}] are fully subsumed by existing article "${title}".`,
      };
    }
  }

  return { isOverlap: false, similarityScore: 0 };
}

export interface SemanticCheckResult {
  isDuplicate: boolean;
  overlappingTitle: string | null;
  reason: string;
}

/**
 * Evaluates semantic topic uniqueness against existing published articles using the platform LLM.
 * Compares:
 *  1. Central question
 *  2. Target audience
 *  3. Search intent
 *  4. Main concepts
 *  5. Substantial content overlap
 *
 * Differentiates genuine duplicates (same intent/audience) from distinct topics with shared keywords
 * (e.g. "Agentic AI Career Trends" vs "Building Reliable AI Tool-Calling Agents").
 */
export async function checkSemanticSimilarity(
  candidateTopic: string,
  existingArticles: Array<{ title: string; summary?: string | null }>
): Promise<SemanticCheckResult> {
  // If no existing articles, cannot be duplicate
  if (!existingArticles || existingArticles.length === 0) {
    return { isDuplicate: false, overlappingTitle: null, reason: "No existing published articles." };
  }

  // 1. Run deterministic filter first
  const deterministicResult = checkDeterministicOverlap(
    candidateTopic,
    existingArticles.map((a) => a.title)
  );

  if (deterministicResult.isOverlap && deterministicResult.matchedTitle) {
    return {
      isDuplicate: true,
      overlappingTitle: deterministicResult.matchedTitle,
      reason: deterministicResult.reason || "Deterministic match detected.",
    };
  }

  // 2. Select top candidate articles with any mild token overlap for deep LLM evaluation
  const candidateTokens = new Set(normalizeTopicTokens(candidateTopic));
  const relevantExisting = existingArticles
    .map((article) => {
      const tokens = normalizeTopicTokens(article.title);
      const overlapCount = tokens.filter((t) => candidateTokens.has(t)).length;
      return { article, overlapCount };
    })
    .filter((item) => item.overlapCount > 0)
    .sort((a, b) => b.overlapCount - a.overlapCount)
    .slice(0, 10)
    .map((item) => item.article);

  // If no existing articles share any keywords, it is definitely distinct
  if (relevantExisting.length === 0) {
    return { isDuplicate: false, overlappingTitle: null, reason: "Zero shared keywords with published articles." };
  }

  // 3. Query LLM for semantic evaluation
  const geminiKey = process.env.GEMINI_API_KEY;
  const openaiKey = process.env.OPENAI_API_KEY;

  if (!geminiKey && !openaiKey) {
    // If no AI keys available, deterministic check was clean so accept
    return { isDuplicate: false, overlappingTitle: null, reason: "No AI keys available; passed deterministic check." };
  }

  const existingListStr = relevantExisting
    .map((a, idx) => `[${idx + 1}] Title: "${a.title}"${a.summary ? ` | Summary: "${a.summary}"` : ""}`)
    .join("\n");

  const prompt = `You are a Chief SEO Editor and Content Architect evaluating topic uniqueness for CareerVixa.
We must prevent publishing articles that duplicate or substantially overlap previously published content.

CANDIDATE TOPIC TO EVALUATE:
"${candidateTopic}"

PREVIOUSLY PUBLISHED ARTICLES:
${existingListStr}

EVALUATION RULES:
- REJECT as a duplicate if the candidate shares substantially the same search intent, answers the same central question, targets the same audience, or covers the same outline with different wording (e.g. "How Agentic AI Is Changing Careers" vs "How AI Agents Are Transforming Jobs", or "Resume Writing for Graduates" vs "CV Tips for New Graduates").
- ACCEPT as distinct if the central purpose, technical scope, audience, or coverage differ materially, even if they share keywords (e.g. "Agentic AI Career Trends" vs "Building Reliable AI Tool-Calling Agents" — one is broad career trends, the other is an engineering guide; or "Interview Preparation" vs "Salary Negotiation Techniques" — distinct phases and intents).

OUTPUT SCHEMA:
Return ONLY valid JSON matching:
{
  "isDuplicate": true or false,
  "overlappingTitle": "Title of the existing article that duplicates this candidate, or null if distinct",
  "reason": "Clear 1-2 sentence explanation of why this is considered a duplicate or distinct"
}`;

  let rawJsonText: string | null = null;

  // Try Gemini
  if (geminiKey) {
    try {
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 30000);

      const res = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-3.1-flash-lite:generateContent?key=${geminiKey}`,
        {
          method: "POST",
          signal: controller.signal,
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            contents: [{ parts: [{ text: prompt }] }],
            generationConfig: {
              responseMimeType: "application/json",
              maxOutputTokens: 1024,
            },
          }),
        }
      );

      clearTimeout(timeout);
      if (res.ok) {
        const data = await res.json();
        const text = data.candidates?.[0]?.content?.parts?.[0]?.text;
        if (text) rawJsonText = text;
      }
    } catch (err: any) {
      console.warn("Gemini semantic check warning:", err.message);
    }
  }

  // Fallback to OpenAI
  if (!rawJsonText && openaiKey) {
    try {
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 30000);

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
              content: "You are an SEO Content Architect evaluating topic uniqueness. Output strictly valid JSON.",
            },
            {
              role: "user",
              content: prompt,
            },
          ],
        }),
      });

      clearTimeout(timeout);
      if (res.ok) {
        const data = await res.json();
        rawJsonText = data.choices?.[0]?.message?.content;
      }
    } catch (err: any) {
      console.warn("OpenAI semantic check warning:", err.message);
    }
  }

  if (rawJsonText) {
    try {
      const parsed = JSON.parse(rawJsonText);
      return {
        isDuplicate: Boolean(parsed.isDuplicate),
        overlappingTitle: parsed.overlappingTitle ? String(parsed.overlappingTitle) : null,
        reason: parsed.reason ? String(parsed.reason) : "Semantic evaluation completed.",
      };
    } catch {
      // If parsing fails, fall back to safe default
    }
  }

  return { isDuplicate: false, overlappingTitle: null, reason: "Passed deterministic checks; semantic evaluation unconstrained." };
}

/**
 * Resolves a unique, high-value editorial topic for autonomous publishing.
 * If the candidate topic is duplicate or generic, generates fresh candidates using AI
 * and validates each candidate through deterministic and semantic safeguards.
 * Retries up to 4 bounded attempts.
 */
export async function resolveUniqueAutonomousTopic(params: {
  preferredTopic?: string | null;
  timezone?: string;
  maxAttempts?: number;
}): Promise<{ topic: string; rationale: string }> {
  const maxAttempts = params.maxAttempts || 4;

  // 1. Fetch published articles from the database for comparison
  const publishedArticles = await prisma.article.findMany({
    where: { status: "PUBLISHED" },
    select: { title: true, summary: true, slug: true },
    orderBy: { publishedAt: "desc" },
    take: 40,
  });

  const preferred = params.preferredTopic?.trim();
  const isGenericDefault =
    !preferred ||
    preferred.toLowerCase().includes("navigating career trajectories") ||
    preferred.toLowerCase().includes("strategic workplace skills");

  // If a non-generic preferred topic was provided by Admin, evaluate it first
  if (preferred && !isGenericDefault) {
    const check = await checkSemanticSimilarity(preferred, publishedArticles);
    if (!check.isDuplicate) {
      return {
        topic: preferred,
        rationale: "Admin preferred topic passed uniqueness verification.",
      };
    }
    console.warn(`[Autonomous Publisher] Preferred topic "${preferred}" rejected as duplicate of "${check.overlappingTitle}": ${check.reason}`);
  }

  // 2. Generate a fresh, unique topic within CareerVixa's core niche using bounded retries
  const geminiKey = process.env.GEMINI_API_KEY;
  const openaiKey = process.env.OPENAI_API_KEY;

  if (!geminiKey && !openaiKey) {
    throw new Error("Cannot propose autonomous topic: AI API key (GEMINI_API_KEY or OPENAI_API_KEY) is missing.");
  }

  const existingTitlesList = publishedArticles.map((a) => `- ${a.title}`).join("\n");
  const rejectedHistory: Array<{ candidate: string; reason: string }> = [];

  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    const rejectedContext =
      rejectedHistory.length > 0
        ? `\nPREVIOUSLY REJECTED CANDIDATES IN THIS SESSION (DO NOT REPEAT OR GENERATE SIMILAR TOPICS):\n` +
          rejectedHistory.map((r) => `- Rejected: "${r.candidate}" (Reason: ${r.reason})`).join("\n") + "\n"
        : "";

    const generationPrompt = `You are the Lead Editorial Director of CareerVixa (careervixa.com).
Your task is to select ONE original, timely, high-value editorial article topic for today's publication.

NICHE DOMAINS:
- Modern Engineering & AI Careers (e.g. AI Agents, LLM system architecture, platform engineering, data infra)
- Executive Leadership & Technical Management (e.g. engineering leadership, managing ICs, staff+ transitions)
- Advanced Career Strategy & Workplace Positioning (e.g. compensation negotiation, equity grants, talent mobility)
- Strategic Remote & Distributed Work Mastery

EXISTING PUBLISHED ARTICLES (YOU MUST NOT DUPLICATE OR OVERLAP THESE IN THEME, QUESTION, OR INTENT):
${existingTitlesList}
${rejectedContext}
REQUIREMENTS:
- Must have a CLEAR, DISTINCT central question and practical angle.
- Avoid generic repeated titles like "Navigating Career Trajectories" or "Top Skills for 2026".
- Provide concrete value to ambitious professionals.

OUTPUT FORMAT:
Return ONLY valid JSON:
{
  "topic": "Specific, authoritative proposed topic under 65 characters",
  "rationale": "Why this topic is unique, timely, and distinct from published articles"
}`;

    let proposalText: string | null = null;

    if (geminiKey) {
      try {
        const controller = new AbortController();
        const timeout = setTimeout(() => controller.abort(), 35000);

        const res = await fetch(
          `https://generativelanguage.googleapis.com/v1beta/models/gemini-3.1-flash-lite:generateContent?key=${geminiKey}`,
          {
            method: "POST",
            signal: controller.signal,
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              contents: [{ parts: [{ text: generationPrompt }] }],
              generationConfig: {
                responseMimeType: "application/json",
                maxOutputTokens: 1024,
              },
            }),
          }
        );

        clearTimeout(timeout);
        if (res.ok) {
          const data = await res.json();
          const text = data.candidates?.[0]?.content?.parts?.[0]?.text;
          if (text) proposalText = text;
        }
      } catch (err: any) {
        console.warn(`[Autonomous Publisher] Gemini topic generation attempt ${attempt} warning:`, err.message);
      }
    }

    if (!proposalText && openaiKey) {
      try {
        const controller = new AbortController();
        const timeout = setTimeout(() => controller.abort(), 35000);

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
                content: "You are an executive editor selecting a distinct article topic. Return JSON.",
              },
              {
                role: "user",
                content: generationPrompt,
              },
            ],
          }),
        });

        clearTimeout(timeout);
        if (res.ok) {
          const data = await res.json();
          proposalText = data.choices?.[0]?.message?.content;
        }
      } catch (err: any) {
        console.warn(`[Autonomous Publisher] OpenAI topic generation attempt ${attempt} warning:`, err.message);
      }
    }

    if (!proposalText) {
      continue;
    }

    try {
      const parsed = JSON.parse(proposalText);
      const proposedTopic = String(parsed.topic || "").trim();
      const rationale = String(parsed.rationale || "").trim();

      if (proposedTopic.length < 5) continue;

      // Evaluate candidate against published articles
      const check = await checkSemanticSimilarity(proposedTopic, publishedArticles);

      if (!check.isDuplicate) {
        // Successful candidate found!
        return { topic: proposedTopic, rationale };
      }

      // Reject and log
      console.warn(
        `[Autonomous Publisher] Topic candidate rejected (Attempt ${attempt}/${maxAttempts}): "${proposedTopic}" overlaps "${check.overlappingTitle}". Reason: ${check.reason}`
      );
      rejectedHistory.push({ candidate: proposedTopic, reason: check.reason });
    } catch {
      continue;
    }
  }

  // If all attempts failed, fail safely per Section 5.6
  throw new Error(
    `Topic uniqueness safeguard: Could not establish a sufficiently distinct, non-duplicate topic after ${maxAttempts} bounded attempts. Publication aborted to preserve editorial integrity.`
  );
}
