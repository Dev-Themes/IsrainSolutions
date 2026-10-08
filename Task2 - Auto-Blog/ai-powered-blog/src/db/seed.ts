import * as dotenv from "dotenv";
dotenv.config({ path: ".env.local" });
import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import * as schema from "./schema";
const sql = neon(process.env.DATABASE_URL!);
const db = drizzle(sql, { schema });

import { categories, tags, articles, articleTags } from "./schema";
import { user as userTable } from "./schema";
import { eq } from "drizzle-orm";
import * as crypto from "crypto";

async function main() {
  console.log("Seeding database...");

  // Create a dummy user
  const userId = crypto.randomUUID();
  await db.insert(userTable).values({
    id: userId,
    name: "Jane Doe",
    email: "jane@example.com",
    emailVerified: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  }).onConflictDoNothing();

  const user = await db.query.user.findFirst({
    where: eq(userTable.email, "jane@example.com"),
  });

  if (!user) throw new Error("Failed to create/find user");

  // Create categories
  const categoryValues = [
    { name: "Career Development", slug: "career-development" },
    { name: "Job Search", slug: "job-search" },
    { name: "Remote Work", slug: "remote-work" },
  ];
  
  await db.insert(categories).values(categoryValues).onConflictDoNothing();
  
  const allCategories = await db.query.categories.findMany();

  // Create tags
  const tagValues = [
    { name: "Interview", slug: "interview" },
    { name: "Culture", slug: "culture" },
    { name: "Productivity", slug: "productivity" },
  ];

  await db.insert(tags).values(tagValues).onConflictDoNothing();
  
  const allTags = await db.query.tags.findMany();

  // Create articles
  const catDev = allCategories.find((c) => c.slug === "career-development");
  const catJob = allCategories.find((c) => c.slug === "job-search");
  const catRem = allCategories.find((c) => c.slug === "remote-work");
  
  const tagCult = allTags.find((t) => t.slug === "culture");
  const tagProd = allTags.find((t) => t.slug === "productivity");

  if (!catDev || !catJob || !catRem || !tagCult || !tagProd) throw new Error("Missing taxonomies");

  const articleValues = [
    {
      slug: "future-of-remote-work-hybrid",
      title: "The Future of Remote Work: Navigating the Hybrid Paradigm",
      excerpt: "As companies transition from fully remote to hybrid models, employees are finding themselves caught in a complex web of new expectations. Here is how to navigate the shifting landscape and maintain your career trajectory.",
      content: `<h2>The Shifting Landscape of Work</h2>\n<p>As companies transition from fully remote to hybrid models, employees are finding themselves caught in a complex web of new expectations. The "return to office" mandates have created a paradigm shift that requires a new set of professional skills.</p>\n<p>To succeed in this hybrid environment, professionals must adapt their communication styles, visibility strategies, and boundary-setting techniques.</p>\n<h3>1. Mastering Asynchronous Communication</h3>\n<p>When half your team is in the office and the other half is remote, synchronized meetings become a bottleneck. The key is to master asynchronous communication:</p>\n<ul>\n  <li>Write clear, comprehensive documentation</li>\n  <li>Use recorded video messages for complex explanations</li>\n  <li>Set explicit expectations for response times</li>\n</ul>\n<blockquote>"The most successful hybrid teams are those that treat every day as a remote day when it comes to communication protocols." — Remote Work Expert</blockquote>\n<h3>2. Strategic Visibility</h3>\n<p>Proximity bias is real. When you are not physically present, your contributions can be overlooked. You must strategically manage your visibility:</p>\n<ol>\n  <li>Over-communicate your progress and wins</li>\n  <li>Schedule regular one-on-ones with stakeholders</li>\n  <li>Volunteer for cross-functional initiatives</li>\n</ol>\n<h2>Conclusion</h2>\n<p>The hybrid paradigm is here to stay. By proactively adapting your work style, you can leverage the flexibility of remote work while maintaining the strategic relationships built in the office.</p>`,
      status: "PUBLISHED" as const,
      publishedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2), // 2 days ago
      authorId: user.id,
      authorName: user.name,
      categoryId: catRem.id,
    },
    {
      slug: "hidden-red-flags-job-descriptions",
      title: "10 Hidden Red Flags in Job Descriptions",
      excerpt: "A job description is a company's marketing pitch to potential candidates. However, what they leave out—or how they phrase certain requirements—can speak volumes about the culture.",
      content: `<h2>Reading Between the Lines</h2>\n<p>A job description is a company's marketing pitch to potential candidates. However, what they leave out—or how they phrase certain requirements—can speak volumes about the company culture.</p>\n<p>Here are the top red flags to watch out for when browsing job boards.</p>\n<h3>The "Rockstar" Requirement</h3>\n<p>When a company asks for a "ninja," "rockstar," or "wizard," they are often looking for someone who will do the jobs of three people for the salary of one.</p>\n<blockquote>"We need a coding ninja who thrives in a fast-paced environment and wears many hats."</blockquote>\n<p>Translation: We have no structure, unreasonable deadlines, and you will be responsible for tasks outside your job scope without additional compensation.</p>\n<h3>"Work Hard, Play Hard" Culture</h3>\n<p>This phrase often indicates a culture of burnout disguised as camaraderie. It usually means:</p>\n<ul>\n  <li>Expectations of 60+ hour work weeks</li>\n  <li>Blurry boundaries between personal and professional time</li>\n  <li>Mandatory "fun" events after hours</li>\n</ul>\n<h3>Vague Requirements & Broad Scopes</h3>\n<p>If the responsibilities list covers everything from database administration to social media marketing, the company doesn't actually know what they need. You will be set up to fail because the expectations are impossible to meet.</p>\n<h2>How to Navigate Red Flags</h2>\n<p>Not every poorly written job description indicates a toxic workplace. Sometimes, it's simply a matter of HR writing the posting without input from the hiring manager. Always use the interview process to clarify these points before making a decision.</p>`,
      status: "PUBLISHED" as const,
      publishedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 5), // 5 days ago
      authorId: user.id,
      authorName: user.name,
      categoryId: catJob.id,
    },
    {
      slug: "how-to-ace-interviews",
      title: "How to Ace Your Tech Interviews",
      excerpt: "A comprehensive guide to cracking tech interviews.",
      content: "<p>This is a <strong>sanitized</strong> piece of content.</p>",
      status: "PUBLISHED" as const,
      publishedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 10),
      authorId: user.id,
      authorName: user.name,
      categoryId: catJob.id,
    }
  ];

  await db.insert(articles).values(articleValues).onConflictDoNothing();

  const allArticles = await db.query.articles.findMany();

  // Link tags
  const art1 = allArticles.find((a) => a.slug === "future-of-remote-work-hybrid");
  const art2 = allArticles.find((a) => a.slug === "hidden-red-flags-job-descriptions");
  
  if (art1 && art2) {
    await db.insert(articleTags).values([
      { articleId: art1.id, tagId: tagProd.id },
      { articleId: art2.id, tagId: tagCult.id },
    ]).onConflictDoNothing();
  }

  console.log("Seeding complete!");
  process.exit(0);
}

main().catch((err) => {
  console.error("Seeding failed:", err);
  process.exit(1);
});
