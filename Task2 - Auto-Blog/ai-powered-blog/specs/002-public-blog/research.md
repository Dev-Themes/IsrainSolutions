# Research: Public Blog & Content

## HTML Sanitization

**Context**: Spec 002 requires that stored/rendered article HTML is sanitized before displaying it to prevent XSS attacks, as user-generated content might be injected.

* **Decision**: Use `sanitize-html` (or `dompurify` if running strictly on the client, but `sanitize-html` works great in Server Components).
* **Rationale**: It provides robust server-side sanitization of HTML strings, which fits perfectly with our Next.js Server Component architecture where HTML will be sanitized before being sent to the client.
* **Alternatives considered**: Next.js `dangerouslySetInnerHTML` without sanitization (rejected: violates security constraints), `react-html-parser` (rejected: overhead, does not automatically sanitize).

## Article Search

**Context**: Need keyword-based article search.

* **Decision**: Implement basic PostgreSQL `ilike` queries on `title` and `excerpt` initially.
* **Rationale**: Avoids the infrastructure complexity and cost of introducing an external search provider (like Algolia or Typesense) prematurely, keeping the foundation minimal as required by the constitution.
* **Alternatives considered**: PostgreSQL full-text search (TSVECTOR) (considered: viable if `ilike` becomes too slow, but `ilike` is simpler for the initial implementation), external services (Algolia) (rejected: out of scope).

All technical requirements are clear and no further clarifications are needed from the user.
