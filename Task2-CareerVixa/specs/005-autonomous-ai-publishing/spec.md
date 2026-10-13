# Feature Specification: CareerVixa Autonomous AI Research & Daily Publishing

**Feature Branch**: `005-autonomous-ai-publishing`

**Created**: 2026-10-10

**Status**: Draft

**Input**: User description: "Spec 005 — CareerVixa Autonomous AI Research & Daily Publishing..."

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Scheduled Daily AI Publishing (Priority: P1)

CareerVixa automatically researches, generates, and publishes one career-related article every day using an AI agent.

**Why this priority**: This is the core functionality of the feature. Ensuring the site receives daily high-quality, relevant content autonomously drives traffic and maintains the platform's value.

**Independent Test**: Can be fully tested by triggering the scheduled job manually or setting a schedule, and verifying that exactly one article is researched, generated, validated, and published to the live blog.

**Acceptance Scenarios**:

1. **Given** it is the scheduled time (e.g., in Asia/Karachi), **When** the automation trigger fires, **Then** the AI researches a career topic, generates an article with sources, passes validation, and publishes it without admin intervention.
2. **Given** the automation trigger fires, **When** the AI attempts to generate an article but fails validation (e.g., unverifiable facts), **Then** the system retries up to the configured limit before aborting and logging a failure without publishing.

---

### User Story 2 - Admin Configuration & Management (Priority: P2)

An Admin configures the daily publishing schedule (time, timezone, topics), enables/disables the automation, and views execution history.

**Why this priority**: Admins need control over the autonomous system to pause it, change its focus, or investigate failures.

**Independent Test**: Can be fully tested by an Admin logging in, altering the schedule/topics, disabling automation, and verifying the changes prevent or modify the next scheduled run.

**Acceptance Scenarios**:

1. **Given** an Admin is logged in, **When** they disable the automation, **Then** the next scheduled trigger does not generate or publish an article.
2. **Given** an Admin is logged in, **When** they view execution history, **Then** they see logs of past runs including source references, validation results, and success/failure status.

---

### User Story 3 - Admin Manual AI Generation (Priority: P3)

An Admin can manually trigger the AI to generate an additional article outside of the daily schedule through the CMS.

**Why this priority**: Allows Admins to supplement the daily schedule with on-demand content generation when needed.

**Independent Test**: Can be fully tested by an Admin clicking a "Generate Article" button in the CMS and verifying an article is generated and optionally published independently of the daily quota.

**Acceptance Scenarios**:

1. **Given** an Admin is in the CMS, **When** they trigger a manual AI generation, **Then** an article is researched, generated, and saved/published without affecting the daily scheduled quota.

### Edge Cases

- What happens when there are insufficient reliable sources for a topic? The system aborts generation and does not publish.
- What happens when an unverifiable factual claim is made? The validation gate rejects the article, triggering a retry or failure.
- What happens when the scheduled trigger fires multiple times (e.g., overlapping jobs or server restarts)? The system enforces a strict one-article-per-day limit and skips duplicate runs.
- What happens when an external Client submits an article? It is never automatically published and requires manual Admin approval (Client content never enters autonomous publishing).

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: System MUST implement a Python AI agent using the OpenAI Agents SDK integrated with web search capabilities.
- **FR-002**: System MUST schedule and attempt exactly one successful article publication per calendar day (default timezone: Asia/Karachi).
- **FR-003**: System MUST perform live web research prioritizing authoritative sources before generating an article.
- **FR-004**: System MUST strictly generate articles within the CareerVixa niche (Career Development, Jobs, etc.).
- **FR-005**: System MUST format articles with SEO titles, introductions, H2/H3 headings, paragraphs, lists, conclusions, and a verified references section.
- **FR-006**: System MUST validate HTML safety, niche relevance, factual claims, and source URLs before publication.
- **FR-007**: System MUST NOT invent statistics, quotes, or references; traceable citations are required.
- **FR-008**: System MUST block prohibited content (explicit, hateful, scams, etc.) immediately.
- **FR-009**: System MUST automatically publish platform-owned AI articles if they pass all validation gates (no Admin approval needed).
- **FR-010**: System MUST retry generation within configured limits upon validation failure; if exhausted, it MUST log the failure and notify the Admin.
- **FR-011**: System MUST strictly enforce a limit of one scheduled AI article per day to prevent duplicate publications from overlapping triggers.
- **FR-012**: System MUST provide an Admin UI to configure publishing time, topics, and toggle automation.
- **FR-013**: System MUST persist execution metadata, validation results, and source references for Admin review.
- **FR-014**: System MUST integrate the published AI articles directly into the existing CMS, public blog, and SEO infrastructure (cache invalidation).
- **FR-015**: System MUST allow Admins to manually initiate AI article generation without consuming the daily quota.
- **FR-016**: System MUST explicitly prohibit automatic publication of any Client-submitted content.

### Key Entities

- **AIExecutionLog**: Represents a single run of the autonomous agent. Attributes: timestamp, status (success/failure), validation details, error logs, and associated article ID (if published).
- **AIConfiguration**: Singleton or key-value settings. Attributes: schedule time, timezone, automation enabled (boolean), topic preferences.
- **Article (Extension)**: Existing article model may need new fields for `isAIGenerated` (boolean) and `aiSourceReferences` (JSON/Text).

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: 100% of automatically published articles pass structural, factual, and safety validations prior to going live.
- **SC-002**: Exactly one article is published per day by the scheduled job, with 0 duplicate publications occurring due to trigger overlaps.
- **SC-003**: 100% of published AI articles include a verified reference section with working external URLs.
- **SC-004**: 0% of Client-submitted articles are ever published automatically by the AI agent.
- **SC-005**: AI job failures correctly notify the Admin and preserve diagnostic logs in 100% of failure scenarios.

## Assumptions

- The existing Vercel Cron and Inngest infrastructure (mentioned in the Constitution) will be used to reliably trigger the Python AI agent or API endpoint.
- Web search integration will utilize a standard search API (e.g., Tavily, Google Custom Search, or equivalent) accessible to the Python agent.
- The Python AI agent will communicate with the Next.js backend securely (e.g., via a protected API route with an internal secret) to insert the article into the database.
