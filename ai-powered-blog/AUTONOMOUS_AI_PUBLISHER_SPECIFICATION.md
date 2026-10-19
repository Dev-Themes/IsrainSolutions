# CareerVixa — Autonomous AI Article Publisher Specification

## 1. Overview & Architecture

The **Autonomous AI Article Publisher** is a fully automated, cron-driven background pipeline in CareerVixa. It autonomously conducts live web research, drafts in-depth master career guides (1,800–2,500+ words), verifies factual claims against source citations, sanitizes content, attaches curated professional workplace stock photos, and directly publishes one article per calendar day to the live blog.

Unlike client or admin on-demand AI generators (which deposit private drafts into workspaces), the autonomous publisher is strictly scheduled, platform-owned, and publishes directly to production under an Administrator author profile.

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                       DAILY SCHEDULED TRIGGER                               │
│     Vercel Cron (04:00 UTC = 09:00 AM PKT) / Inngest (0 9 * * * PKT)       │
└──────────────────────────────────────┬──────────────────────────────────────┘
                                       │
                                       ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│                    SECURITY & CONCURRENCY CONTROLS                         │
│  - Verify Bearer CRON_SECRET / ?key authorization                          │
│  - Check Admin AIConfiguration.enabled kill-switch                          │
│  - Daily execution lock check: hasPublishedToday("Asia/Karachi")             │
└──────────────────────────────────────┬──────────────────────────────────────┘
                                       │
                                       ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│                       TOPIC & LIVE WEB RESEARCH                             │
│  - Select/read topic (Admin topicPreferences or CareerVixa default)         │
│  - Tavily Search API: "latest best practices <topic> career advice"         │
│  - Extract 4-5 verified source URLs and content snippets                    │
└──────────────────────────────────────┬──────────────────────────────────────┘
                                       │
                                       ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│                     LLM SYNTHESIS (GEMINI / OPENAI)                         │
│  - Gemini (gemini-3.1-flash-lite / 3.5 / 3.8) with OpenAI gpt-4o-mini failover│
│  - Length: 1,800 - 2,500+ words in semantic HTML                            │
│  - Mandatory sections: Roadmap, Table, Competency Matrix, Scripts, FAQ, Sources│
└──────────────────────────────────────┬──────────────────────────────────────┘
                                       │
                                       ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│                    STRICT VALIDATION & SANITIZATION                         │
│  - Zod Schema validation (title, slug, summary, metaTitle, metaDescription) │
│  - Prohibited keyword scanning ("scam", "crypto pump", "hack", etc.)        │
│  - DOMPurify HTML sanitization & enforce rel="sponsored nofollow"           │
│  - Verify <h2> presence and minimum content length                          │
└──────────────────────────────────────┬──────────────────────────────────────┘
                                       │
                                       ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│                     CURATED WORKPLACE IMAGE RESOLUTION                      │
│  - resolveWorkplaceImage(title, category) selects verified Unsplash CDN img │
│  - Strict editorial criteria: Modern office, desks, code screens, charts    │
└──────────────────────────────────────┬──────────────────────────────────────┘
                                       │
                                       ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│                    DATABASE PERSISTENCE & LIVE PUBLISH                      │
│  - Assign to Admin user profile (authorId)                                  │
│  - Status: PUBLISHED, publishedAt: now(), isAIGenerated: true               │
│  - Log execution success to AIExecutionLog                                  │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## 2. Trigger Mechanism & Scheduling

| Component | Location | Implementation Details |
|---|---|---|
| **Vercel Cron Trigger** | `vercel.json` | `schedule: "0 4 * * *"` (04:00 UTC = **09:00 AM Asia/Karachi**, UTC+5). |
| **API Endpoint** | `app/api/cron/daily-publish/route.ts` | Handles `GET` and `POST` webhooks from Vercel Cron. Configured with `dynamic = "force-dynamic"` and `maxDuration = 60`. |
| **Inngest Workflow Alternative** | `inngest/functions.ts` (`dailyAIPublisher`) | Scheduled with `cron: "TZ=Asia/Karachi 0 9 * * *"` and 3 bounded retries. |
| **Security & Authorization** | `route.ts` | Requires either: <br>1. `Authorization: Bearer <CRON_SECRET>` (Vercel Cron header)<br>2. Query parameter `?key=careervixa-cron` or `?key=<CRON_SECRET>`<br>3. Or local development environment (`NODE_ENV === "development"`). |
| **Admin Kill-Switch** | `app/(protected)/admin/ai/automation/page.tsx` | Admins can toggle daily automation ON/OFF in the CMS (`AIConfiguration.enabled`). If disabled, cron requests exit with status `skipped`. |

---

## 3. Concurrency & Rate Limit Locks (Strict 1-Per-Day Quota)

To prevent duplicate posts from retries, overlapping triggers, or server restarts:

1. **Daily Execution Lock (`hasPublishedToday` in `lib/automation/lock.ts`):**
   - Queries `prisma.aIExecutionLog` for any record with `status: "SUCCESS"` whose timestamp falls between `00:00:00.000` and `23:59:59.999` in the configured timezone (default: `Asia/Karachi`).
   - If an article has already been published today, the job aborts immediately:
     ```json
     {
       "status": "skipped",
       "reason": "An article has already been published today in timezone Asia/Karachi. Use ?force=true to test override."
     }
     ```
2. **Manual Override:** Admins can pass `?force=true` in testing environments to bypass the lock without corrupting the daily schedule.

---

## 4. Niche Boundaries & Topic Selection

### Niche Scope
Articles must strictly fall within CareerVixa's core domain:
> *"Career Development, Jobs, Resume Writing, Interviews, Professional Skills, Remote Work, and Freelancing"*

### Topic Resolution Hierarchy
1. **Admin Custom Instructions:** Reads `AIConfiguration.topicPreferences` set by Administrators in `/admin/ai/automation`.
2. **Default Pipeline Topic:** If no preferences are set, the engine uses:
   `"Navigating Career Trajectories, Compensation Benchmarks, and Strategic Workplace Skills in 2025"`.
3. **Python Agent Topic Selection (`agent/research/topic.py`):** When running through the Python agent service, `select_topic` reviews recent article titles from the database to guarantee thematic originality and prevent topic fatigue.

---

## 5. Live Authoritative Web Research

The pipeline never generates content in a vacuum; it performs live web research prior to drafting:

* **Search API:** Tavily Search API (`https://api.tavily.com/search`).
* **Query Format:** `"latest best practices <topic> career advice professionals"`.
* **Search Parameters:**
  - `search_depth`: `"advanced"`
  - `max_results`: `4` (internal engine) to `5` (Python agent)
  - `include_raw_content`: `true`
  - Timeout: 12 seconds
* **Context Extraction:** Each source is truncated to 1,200 characters of clean text and passed alongside its original URL into the synthesis prompt.
* **Fallback Guarantee:** If Tavily is unreachable or API keys are missing, the pipeline falls back to verified career databases (`https://careervixa.com/career-strategy`, `https://hbr.org/topic/career-planning`, `https://www.bls.gov/ooh/`) to prevent phantom or broken URLs.

---

## 6. Article Structure, Length & Editorial Rules

The synthesis prompt (`lib/ai/generate-article.ts` and `agent/generation/article.py`) imposes strict editorial standards:

### Word Count Standard
* **Minimum Length:** **1,800 to 2,500+ words** of practical, structured guidance.
* Superficial summaries, repetitive padding, and shallow overviews are explicitly prohibited.

### Persona
* *Elite executive career strategist and lead editor for CareerVixa.*

### Required Section Hierarchy
1. **Headline (`<h1>`):** Authoritative, compelling, SEO-optimized title under 65 characters.
2. **Executive Overview & Strategic Context (250+ words):** Macro-economic stakes, why the skill/role matters today, and who the guide serves.
3. **Industry Landscape & Market Outlook (350+ words):** Hiring dynamics, market demand, and an HTML `<table>` detailing entry-level, mid-level, and senior compensation benchmarks or market growth metrics.
4. **Step-by-Step Transition & Execution Roadmap (700+ words):**
   - `<h3>Phase 1: Foundation & Market Positioning</h3>` (Tactical audits, asset preparation)
   - `<h3>Phase 2: High-Impact Execution & Proof of Work</h3>` (Portfolio building, demonstrations, case studies)
   - `<h3>Phase 3: Strategic Outreach & Opportunity Capture</h3>` (Targeted networking, interview mastery, offer maximization)
5. **The Skills Competency Matrix (300+ words):** Breakdown of Hard Technical Competencies vs. Executive Soft Skills with actionable benchmarks.
6. **Copy-Paste Scripts & Email Templates (300+ words):** Word-for-word scripts (LinkedIn outreach, salary negotiation counter-offers, behavioral interview scripts) formatted in semantic `<blockquote>`.
7. **Common Pitfalls & High-Stakes Mistakes to Avoid (250+ words):** 4–5 real-world blunders that derail candidates and how to avoid them.
8. **Frequently Asked Questions (FAQ) (350+ words):** 4–5 real-world questions with authoritative answers.
9. **Final Action Plan:** Immediate next step for the reader.
10. **References & Source Citations (`<h2>`):** Clickable source links (`<a href="URL" target="_blank" rel="noopener noreferrer">Source Title</a>`) matching the research URLs.

---

## 7. Metadata, Schema & SEO Constraints

Every article must satisfy the Zod schema (`ArticleGenerationSchema` in `lib/validation/content.ts`):

| Attribute | Constraint | Description |
|---|---|---|
| `title` | `min(10).max(120)` | Clear, authoritative headline (prompt targets < 65 chars). |
| `slug` | `min(5).max(100)` | Clean lowercase kebab-case slug (e.g., `how-to-transition-into-ai-engineering`). |
| `summary` | `min(50).max(300)` | 2-sentence executive summary (target: 140–175 chars). |
| `content` | `min(500)` | Rich semantic HTML body (typically 10,000–18,000 chars). |
| `metaTitle` | Strictly `<= 60` chars | SEO meta title tag. Auto-truncated to 57 chars + `...` if exceeded. |
| `metaDescription` | Strictly `<= 160` chars | High-CTR meta description (target: 120–150 chars). Auto-truncated to 157 chars + `...` if exceeded. |
| `sources` | `z.array(z.string().url())` | Array of verified HTTP/HTTPS URLs from the research phase. |

---

## 8. Safety, Content Filters & Prohibited Keywords

The validator (`validateArticleContent` in `lib/validation/content.ts`) enforces zero tolerance:

### Prohibited Keywords (Automatic Rejection)
The text is scanned across `title`, `summary`, and `content`. If any of the following terms appear, the article is rejected immediately:
```typescript
const prohibitedKeywords = [
  "scam",
  "hack",
  "illegal",
  "nudity",
  "porn",
  "explicit",
  "buy followers",
  "crypto pump",
  "get rich quick"
];
```

### HTML Sanitization
Content is sanitized using DOMPurify (`jsdom` server-side), whitelisting only safe semantic tags:
* **Allowed Tags:** `h1`, `h2`, `h3`, `h4`, `p`, `ul`, `ol`, `li`, `a`, `strong`, `em`, `br`, `blockquote`, `code`, `pre`, `img`, `table`.
* **Allowed Attributes:** `href`, `title`, `target`, `rel`, `src`, `alt`, `class`.

### Outbound Link Governance
`enforceSponsoredLinks` inspects all `<a>` tags in the HTML:
* Automatically injects `rel="sponsored nofollow noopener noreferrer"`.
* Injects `target="_blank"`.

---

## 9. Workplace Stock Image Resolution

Automated articles do not generate AI images; instead, `resolveWorkplaceImage` (`lib/articles/images.ts`) selects a curated stock photo from a verified Unsplash repository based on keywords:

| Keyword Patterns | Image Category | Visual Content |
|---|---|---|
| `interview`, `hiring`, `question` | **Interview** | Corporate executive boardrooms and meeting spaces. |
| `resume`, `cv`, `cover letter`, `portfolio` | **Resume** | Clean executive desks with fountain pens, portfolios, and laptops. |
| `salary`, `compensation`, `negotiat`, `finance` | **Salary** | Financial data growth metrics and compensation analytics charts. |
| `tech`, `software`, `code`, `ai`, `engineer`, `remote` | **Technology** | Modern workstations with dual code monitors and development tools. |
| `lead`, `exec`, `manage`, `strategy`, `growth` | **Leadership** | Modern architectural corporate glass skyscrapers and high-rises. |
| All other topics | **General** | Professional minimalist office workstations with notebooks and laptops. |

### Image Editorial Standards
- Strictly professional office architecture, modern workspaces, desks, laptops, tech screens, and charts.
- Explicit editorial standard: strictly professional workplace visuals.
- High resolution, verified Unsplash CDN URLs.

---

## 10. Database Persistence & Client Isolation

### Author Attribution
* Automatically assigned to an `ADMIN` user (`prisma.user.findFirst({ where: { role: "ADMIN" } })`).
* Published under the CareerVixa editorial masthead.

### Database Record Creation
The article is written directly to the `Article` model with:
- `status`: `"PUBLISHED"`
- `publishedAt`: `new Date()`
- `isAIGenerated`: `true`
- `aiSourceReferences`: `JSON.stringify(validatedArticle.sources)`
- `coverImage`: Resolved stock photo URL
- `categoryId`: Matched to category containing "Career" or first available category

### Zero Client Auto-Publish Guarantee (FR-016)
`verifyPlatformOwnership` in `lib/articles/publish.ts` enforces that articles owned by `CLIENT` users **can never be published automatically** by the AI pipeline. Client guest submissions require mandatory editorial review.

### Execution Audit Logging
Every run (success or failure) creates an `AIExecutionLog` record:
- `status`: `"SUCCESS"` or `"FAILURE"`
- `articleId`: Associated article ID on success
- `validationData`: Parsed validation payload
- `errorLogs`: Detailed stack trace or rejection reason on failure
- Admin history viewable at `/admin/ai/history`.
