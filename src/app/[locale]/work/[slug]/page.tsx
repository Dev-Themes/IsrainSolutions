import React from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { projects, getProjectBySlug, getRelatedProjects } from "@/data/projects";
import { defaultLocale, locales, isValidLocale } from "@/i18n/config";
import { Locale } from "@/types/portfolio";
import { constructMetadata, generateCreativeWorkSchema } from "@/lib/seo";
import { ProjectHero } from "@/components/portfolio/ProjectHero";
import { ProjectGallery } from "@/components/portfolio/ProjectGallery";

export function generateStaticParams() {
  return locales.flatMap((locale) =>
    projects.map((project) => ({
      locale,
      slug: project.slug,
    }))
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const validLocale: Locale = isValidLocale(locale) ? locale : defaultLocale;
  const project = getProjectBySlug(slug);

  if (!project) {
    return constructMetadata({
      locale: validLocale,
      title: "Projet Introuvable",
      description: "Cette étude de cas n'existe pas dans nos archives.",
    });
  }

  return constructMetadata({
    locale: validLocale,
    path: `work/${project.slug}`,
    title: `${project.title} — [${project.category}]`,
    description: project.description[validLocale],
    ogImage: project.coverImage,
  });
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const validLocale: Locale = isValidLocale(locale) ? locale : defaultLocale;
  const project = getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  const relatedProjects = getRelatedProjects(project.slug, 2);

  // Compute next project
  const currentIndex = projects.findIndex((p) => p.slug === project.slug);
  const nextProject = projects[(currentIndex + 1) % projects.length];

  const creativeWorkSchema = generateCreativeWorkSchema(project, validLocale);

  return (
    <article className="w-full">
      {/* Schema.org CreativeWork JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(creativeWorkSchema) }}
      />

      {/* Hero Panoramic Header */}
      <ProjectHero project={project} locale={validLocale} />

      {/* Visual Storytelling Gallery & Next Project */}
      <ProjectGallery
        project={project}
        relatedProjects={relatedProjects}
        nextProject={nextProject}
        locale={validLocale}
      />
    </article>
  );
}
