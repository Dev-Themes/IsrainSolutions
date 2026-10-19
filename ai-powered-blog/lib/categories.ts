import { prisma } from "@/lib/prisma";

export const DEFAULT_CAREER_CATEGORIES = [
  {
    name: "Career Development",
    slug: "career-development",
    description: "Long-term career planning, growth trajectories, and professional milestones.",
  },
  {
    name: "Job Search Strategies",
    slug: "job-search-strategies",
    description: "Proven methods to find and land top job opportunities.",
  },
  {
    name: "Resume & Cover Letters",
    slug: "resume-and-cover-letters",
    description: "Crafting winning resumes, portfolios, and job applications.",
  },
  {
    name: "Interview Preparation",
    slug: "interview-preparation",
    description: "Behavioral, technical, and executive interview techniques.",
  },
  {
    name: "Professional Skills & Growth",
    slug: "professional-skills-and-growth",
    description: "Workplace communication, leadership, and technical upskilling.",
  },
  {
    name: "Remote Work & Freelancing",
    slug: "remote-work-and-freelancing",
    description: "Navigating distributed teams, freelancing, and digital nomad careers.",
  },
  {
    name: "Salary & Negotiation",
    slug: "salary-and-negotiation",
    description: "Compensation benchmarks, offers, and promotion negotiation.",
  },
];

export async function getCareerCategories() {
  let categories = await prisma.category.findMany({
    select: { id: true, name: true, slug: true, description: true },
    orderBy: { name: "asc" },
  });

  if (categories.length === 0) {
    // Auto-seed default categories if database is empty
    for (const cat of DEFAULT_CAREER_CATEGORIES) {
      await prisma.category.upsert({
        where: { slug: cat.slug },
        update: { name: cat.name, description: cat.description },
        create: { name: cat.name, slug: cat.slug, description: cat.description },
      });
    }

    categories = await prisma.category.findMany({
      select: { id: true, name: true, slug: true, description: true },
      orderBy: { name: "asc" },
    });
  }

  return categories;
}
