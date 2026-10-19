import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const defaultCategories = [
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

async function seed() {
  console.log("Seeding CareerVixa categories...");
  for (const cat of defaultCategories) {
    const record = await prisma.category.upsert({
      where: { slug: cat.slug },
      update: { name: cat.name, description: cat.description },
      create: { name: cat.name, slug: cat.slug, description: cat.description },
    });
    console.log(`- Upserted category: ${record.name} (${record.id})`);
  }
  console.log("Categories successfully seeded!");
}

seed()
  .catch((err) => {
    console.error("Seeding error:", err);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
