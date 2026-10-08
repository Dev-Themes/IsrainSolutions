# spec.md — Public Blog & Content

## Goal

Build the public-facing career, jobs and professional growth blog where visitors can discover, search and read high-quality published content.

The experience must be responsive, SEO-ready, accessible, fast and aligned with the project constitution.

## User Scenarios

* A visitor lands on the homepage and discovers relevant career content.
* A visitor browses published articles by category or tag.
* A visitor searches for career, job and professional-growth content.
* A visitor opens an article and reads its complete content.
* A visitor discovers related articles after reading.
* A visitor sees a clear CTA to publish an article on the platform.
* Unpublished, rejected or draft content is never publicly accessible.

## Functional Requirements

FR-1 Display only published articles on public pages.
FR-2 Provide a responsive homepage with featured and recent career-related articles.
FR-3 Provide a paginated blog listing with article cards containing title, excerpt, category, author, publication date and relevant metadata.
FR-4 Provide individual article pages with title, author, publication date, category, tags and sanitized article content.
FR-5 Support career-focused categories such as Career Development, Job Search, Resumes & Interviews, Remote Work, Freelancing, Professional Skills and Certifications & Learning.
FR-6 Support article tags and category filtering.
FR-7 Provide keyword-based article search.
FR-8 Provide related-article recommendations based on relevant categories, tags or content relationships.
FR-9 Provide responsive navigation and clear paths between homepage, blog, categories, search and article pages.
FR-10 Provide a clear contributor CTA such as “Want to publish your article?” without requiring authentication to view it.
FR-11 Use server-side data fetching and rendering where appropriate.
FR-12 Sanitize stored/rendered article HTML before displaying user-generated content.
FR-13 Ensure public article content is structured for future SEO metadata, canonical URLs and structured data.
FR-14 Generate stable, human-readable article URLs using unique slugs.
FR-15 Handle missing articles and invalid routes with appropriate not-found states.
FR-16 Do not expose drafts, rejected submissions or other non-public content through public queries, search or related-article components.

## Responsive Requirements

Test and verify at minimum:

* 320px
* 375px
* 640px
* 768px
* 1024px
* 1280px
* 1440px+

Every supported viewport must maintain:

* Consistent global container alignment.
* Readable article typography.
* Responsive navigation.
* Responsive article cards and media.
* Accessible search and filtering.
* No horizontal overflow.
* No clipping or overlapping content.

## Content Rules

The platform niche is:

**Career, Jobs & Professional Growth**

Primary content pillars:

* Career Development
* Job Search
* Resumes & Interviews
* Remote Work
* Freelancing
* Professional Skills
* Certifications & Learning

Content must provide practical professional value and remain relevant to the platform's niche.

No fabricated employers, job openings, credentials, statistics, salaries or professional claims may be presented as facts.

## Edge Cases & Rules

* No published articles → show an intentional empty state.
* Invalid article slug → return not-found.
* Draft/rejected/unapproved article → never render publicly.
* Article with missing optional metadata → render gracefully without broken layout.
* No search results → show a useful empty state.
* No related articles → omit the related section rather than showing irrelevant content.
* Malicious or unsafe HTML → sanitize before rendering.
* Very long titles/excerpts → wrap without breaking layout.
* Large article content → remain readable and performant.
* Pagination beyond available results → return an appropriate empty/not-found state.
* Public pages must not require authentication.

## Out of Scope

* Authentication and account management.
* Client dashboard.
* Article creation and editing.
* Client submissions.
* Editorial review and approval workflow.
* AI article generation.
* Automated article scheduling.
* Article analytics.
* Email notifications.
* Admin CMS.
* Final technical SEO implementation beyond the public content structure required here.

## Acceptance Criteria

* [ ] Homepage displays published career-related content.
* [ ] Blog listing displays only published articles.
* [ ] Categories and tags can filter published content.
* [ ] Article search returns relevant published articles.
* [ ] Individual article pages render complete sanitized content.
* [ ] Draft, rejected and unapproved articles are inaccessible publicly.
* [ ] Related articles are displayed when relevant content exists.
* [ ] Contributor CTA is visible and usable.
* [ ] Article URLs use stable unique slugs.
* [ ] Missing articles return the proper not-found state.
* [ ] Empty search and content states are handled.
* [ ] Public pages work correctly from 320px through 1440px+.
* [ ] No horizontal overflow, clipping or layout overlap exists.
* [ ] Public content uses Server Components where client-side interactivity is unnecessary.
* [ ] Article HTML is sanitized before rendering.
* [ ] No fabricated career, employment, salary, credential or statistical claims are introduced.
* [ ] Implementation follows the project constitution.
* [ ] A human reviews the implementation against this specification before completion.
