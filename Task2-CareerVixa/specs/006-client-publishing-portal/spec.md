# Feature Specification: CareerVixa Client Dashboard & Guest Publishing Portal

**Feature Branch**: `006-client-publishing-portal`

**Created**: 2026-10-11

**Status**: Draft

**Input**: User description: "Build a secure, professional Client Publishing Portal for CareerVixa, focused on Career, Jobs & Professional Growth. Allow authenticated external contributors to create career-related promotional articles manually or through AI, manage private drafts, provide their business and original-source information, and submit articles for mandatory Admin review. Client articles must never publish automatically."

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Client Access, Onboarding & Overview (Priority: P1)

An external contributor or guest author navigates from the public "Publish Your Article on CareerVixa" call-to-action into authentication, verifies their account, and lands on a personalized contributor dashboard. The dashboard provides clear metrics of their publishing pipeline, displaying active counts for private drafts, submissions pending review, published articles, and submissions requiring revision.

**Why this priority**: Without authenticated access, secure workspace isolation, and an operational dashboard, contributors cannot create, manage, or monitor submissions.

**Independent Test**: Can be tested independently by logging in as an authenticated contributor, visiting the contributor portal, and verifying the dashboard metrics accurately reflect the user's private article counts.

**Acceptance Scenarios**:

1. **Given** a visitor on the public homepage or `/publish` CTA, **When** they click "Publish as a guest" or register, **Then** they are guided through contributor authentication and redirected to their personalized contributor dashboard.
2. **Given** an authenticated contributor on their dashboard, **When** the page loads, **Then** they see their current submission counts broken down by status (Drafts, Pending Review, Changes Requested, Rejected, Published).
3. **Given** an unauthenticated visitor or unauthorized role, **When** they attempt to access the contributor dashboard, **Then** they are redirected to login and denied direct access to contributor data.

---

### User Story 2 - Manual Article Drafting & Contributor Profile (Priority: P1)

A contributor creates a career-related article manually using a rich-text editor, providing title, excerpt, headings, paragraphs, bullet points, links, and structured sections. Alongside the article content, the contributor provides their author profile details (full name, verified email, organization, country, phone, author bio, website) and saves their progress as an ongoing private draft.

**Why this priority**: Core content creation is the primary value of the portal. Contributors must be able to craft, format, and continuously save drafts before submission.

**Independent Test**: Can be tested independently by creating a manual draft with formatted text and contributor profile details, saving the draft, and reopening it to verify all content and styling persist intact.

**Acceptance Scenarios**:

1. **Given** a contributor in the article editor, **When** they input an article title, format body content with headings and lists, and click "Save Draft", **Then** the article is stored securely as a private draft associated solely with their account.
2. **Given** a contributor editing a draft, **When** they enter their organization, author bio, country, and website details, **Then** these contributor attributes are saved and retained with the submission draft.
3. **Given** a saved draft, **When** the contributor closes their session and returns later, **Then** they can reopen, update, or delete the unfinished draft without altering any other articles.

---

### User Story 3 - Article Submission & Mandatory Review Gate (Priority: P1)

A contributor completes their draft, validates all required contributor and promotional metadata (category, tags, excerpt, original source URL, promotional website URL, originality declaration, and terms consent), previews the article, and submits it for review. The article transitions from `Draft` to `Pending Review`. The article remains strictly private and is never published automatically.

**Why this priority**: Protecting platform editorial integrity and search reputation requires an airtight gate ensuring guest articles are never published without manual Administrator review.

**Independent Test**: Can be tested independently by completing all required submission fields, clicking "Submit for Review", and verifying the article status becomes `Pending Review` while remaining completely invisible on public feeds.

**Acceptance Scenarios**:

1. **Given** a completed draft with all required fields filled, **When** the contributor confirms their originality declaration and submits the article, **Then** the status transitions to `Pending Review`, a submission timestamp is recorded, and the article is locked from casual editing.
2. **Given** an article submitted for review, **When** an anonymous visitor or regular reader views the public blog or category feeds, **Then** the submitted article does NOT appear anywhere on public routes.
3. **Given** a draft missing mandatory fields (such as promotional URL, category, or originality consent), **When** the contributor attempts to submit, **Then** the system highlights the missing fields, prevents status transition, and keeps the article safely in `Draft` status.

---

### User Story 4 - AI-Assisted Article Generation (Priority: P2)

A contributor provides a career-focused topic, industry keywords, desired tone, and optional guidelines to generate an AI-assisted article draft. The AI agent searches authoritative sources, drafts a structured career article with citations, and deposits the output into the contributor's editor as a private draft for manual refinement. The AI generator never publishes articles directly.

**Why this priority**: Empowers contributors who prefer AI co-writing while maintaining CareerVixa's strict niche, quality, factual accuracy, and safety standards.

**Independent Test**: Can be tested independently by supplying a topic and keywords in the contributor AI generator, generating a structured article, and verifying it opens in the editor as a private draft with verified references.

**Acceptance Scenarios**:

1. **Given** an authenticated contributor, **When** they submit a career topic and keywords into the AI draft generator, **Then** the system conducts live research, drafts a structured article with citations, and saves it as an editable private draft.
2. **Given** an AI-generated draft, **When** generation completes, **Then** the article status remains strictly `Draft` and requires contributor review and manual submission before entering the review queue.
3. **Given** an AI generation request that fails due to network or provider timeout, **When** the error occurs, **Then** existing contributor drafts are not overwritten or corrupted, and an actionable error message is displayed.

---

### User Story 5 - Contributor Article Management & Revision Workflow (Priority: P2)

A contributor manages their portfolio of submissions through a dedicated list view featuring status badges (`Draft`, `Pending Review`, `Changes Requested`, `Rejected`, `Published`), search, and category filtering. If an administrator requests changes, the contributor can inspect feedback, edit the article, and resubmit it for review.

**Why this priority**: Provides complete transparency to contributors regarding their submission lifecycle and enables iterative feedback loops for editorial revisions.

**Independent Test**: Can be tested independently by viewing the contributor articles table, filtering by status, previewing formatting, and confirming that `Pending Review` articles cannot be modified while `Changes Requested` articles can be edited and resubmitted.

**Acceptance Scenarios**:

1. **Given** an article marked as `Changes Requested` by an administrator, **When** the contributor opens the article, **Then** they can view the revision requests, update the content, and resubmit it to `Pending Review`.
2. **Given** an article currently in `Pending Review` or `Published` status, **When** the contributor views the article, **Then** destructive actions (edit, delete) are disabled to protect review integrity.
3. **Given** multiple contributors with articles on the platform, **When** any contributor views their articles list, **Then** they can only see and access articles belonging to their own account.

---

### Edge Cases

- **Incomplete Contributor Profile**: A contributor may save an unfinished draft at any time without completing all profile fields; however, final submission to `Pending Review` is blocked until all required contributor and promotional metadata fields are validated.
- **Invalid or Suspicious URLs**: Original source URLs and promotional target URLs are validated for format and accessibility. Unsafe protocols (e.g., non-HTTP/HTTPS) or malformed domains are rejected at submission time.
- **Concurrent Submissions**: Rapid multi-clicking of the "Submit for Review" button is debounced on both client and server to prevent duplicate submission entries or conflicting state transitions.
- **Non-Career Categories and Topics**: Guest submissions are constrained to CareerVixa's designated niche taxonomy (Career Development, Job Search, Resume Writing, Interviews, Professional Skills, Remote Work, Freelancing). Submissions outside these categories cannot be submitted.
- **Attempted Direct Publishing**: Any client-side request attempting to set article status directly to `PUBLISHED` or bypass review is rejected server-side with an authorization violation error.
- **Deletion Restrictions**: Articles in `Pending Review` cannot be deleted directly to prevent orphaned review states; contributors may only withdraw or cancel submissions if explicitly allowed by policy.

---

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: System MUST provide a responsive, CareerVixa-branded Contributor Dashboard accessible exclusively to authenticated users with the contributor (`CLIENT`) role.
- **FR-002**: System MUST link the public `/publish` call-to-action directly to contributor registration/login and subsequent dashboard redirection.
- **FR-003**: System MUST support complete CRUD management of private article drafts owned by the authenticated contributor.
- **FR-004**: System MUST provide a rich-text editor supporting headings (H1, H2, H3), paragraphs, lists, links, blockquotes, code, and safe HTML output.
- **FR-005**: System MUST allow contributors to trigger AI-assisted draft generation by providing niche-relevant career topics, keywords, tags, and optional guidelines.
- **FR-006**: System MUST reuse the autonomous web-research and content generation pipeline for client drafts under separate contributor generation rules and quotas.
- **FR-007**: AI-generated client articles MUST follow CareerVixa's content structure, factual citation rules, and prohibited content filters, saving strictly as private drafts.
- **FR-008**: System MUST collect mandatory contributor information: Full Name, Verified Email, and Country; and optional contributor details: Organization Name, Phone Number, Author Bio, and Organization Website.
- **FR-009**: System MUST collect mandatory article submission metadata: Title, Excerpt, Body Content, Career Category, Relevant Tags, Original Source URL (if previously published elsewhere), Promotional Website URL, Publication Rights Declaration, and Terms Consent.
- **FR-010**: System MUST provide a live preview allowing contributors to inspect article layout, formatting, and outbound promotional links prior to submission.
- **FR-011**: System MUST support a comprehensive submission lifecycle with the following statuses: `Draft`, `Pending Review`, `Changes Requested`, `Rejected`, `Approved`, and `Published`.
- **FR-012**: System MUST validate all required contributor, promotional, and originality fields before allowing an article to transition from `Draft` or `Changes Requested` to `Pending Review`.
- **FR-013**: System MUST strictly prevent any client submission from publishing automatically; all submissions remain private until manual administrative review.
- **FR-014**: System MUST allow contributors to view their articles with status filtering, search, sorting, and pagination.
- **FR-015**: System MUST lock articles in `Pending Review` or `Published` status from direct client edits or deletions.
- **FR-016**: System MUST enforce server-side data isolation, ensuring no contributor can view, edit, or delete another contributor's drafts or profile data.
- **FR-017**: System MUST record submission timestamps, promotional target URLs, original source URLs, author attribution, and content origin (manual vs. AI-assisted).
- **FR-018**: System MUST provide an overview dashboard displaying real-time metrics for Total Drafts, Pending Reviews, Approved/Published Articles, and Revisions/Rejections.
- **FR-019**: System MUST prepare data contracts and integration hooks for subsequent administrative review workflows, email notifications, and decision auditing.

---

### Key Entities

- **Contributor Profile**: Represents external contributor information associated with a user account, including full name, country, company/organization, phone number, bio, and website URL.
- **Contributor Article**: An extension of the core article entity capturing guest contributor specifics, including client ownership (`authorId`), submission status (`DRAFT`, `PENDING_REVIEW`, `CHANGES_REQUESTED`, `REJECTED`, `APPROVED`, `PUBLISHED`), promotional website URL, original source URL, originality declaration timestamp, and content origin.
- **Submission Revision Log**: Records editorial feedback, requested changes, and resubmission timestamps between administrators and contributors.

---

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: 100% of contributor articles remain private upon submission; exactly 0% publish automatically without administrative approval.
- **SC-002**: Contributors can draft, format, and save private articles in under 3 seconds per save action.
- **SC-003**: AI-assisted draft generation produces a fully cited, structured career draft within 30 seconds.
- **SC-004**: 100% of submitted articles contain verified required contributor details, promotional URLs, and originality declarations before entering the review queue.
- **SC-005**: Contributor data isolation is 100% enforced; 0 unauthorized cross-account draft views or modifications occur under penetration tests.
- **SC-006**: Contributors can complete the full journey from registration to draft submission in under 10 minutes.

---

## Assumptions

- Contributor accounts utilize CareerVixa's existing `CLIENT` role established in Spec 003.
- Media upload and cover image handling utilize the existing storage and validation patterns established in Specs 001–004.
- Automated email alerts upon submission and editorial decision forms will be implemented in Spec 007 (Admin Review & Approval Workflow).
- Client AI generation will utilize existing OpenAI/Gemini and Tavily configurations without requiring external contributors to provide their own API keys.
- Contributors agree to CareerVixa's standard publishing terms and grant necessary rights upon submission.
