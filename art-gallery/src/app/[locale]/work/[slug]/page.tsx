import { notFound } from "next/navigation";
import { projects, getProjectBySlug, getRelatedProjects } from "@/data/projects";
import { isValidLocale } from "@/i18n/config";
import { constructMetadata, generateCreativeWorkSchema } from "@/lib/seo";
import { ProjectHero } from "@/components/portfolio/ProjectHero";
import { ProjectGallery } from "@/components/portfolio/ProjectGallery";

type Props = { params: Promise<{ locale: string; slug: string }> };
export const dynamicParams = false;
export function generateStaticParams() { return projects.map(({ slug }) => ({ slug })); }
export async function generateMetadata({ params }: Props) {
  const { locale, slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project || !isValidLocale(locale)) notFound();
  return constructMetadata({ locale, path: `work/${slug}`, title: project.title, description: project.description[locale] ?? project.description.en, ogImage: project.coverImage });
}
export default async function ProjectPage({ params }: Props) {
  const { locale, slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project || !isValidLocale(locale)) notFound();
  const nextProject = projects[(projects.indexOf(project) + 1) % projects.length];
  return <>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(generateCreativeWorkSchema(project, locale)).replace(/</g, "\\u003c") }} />
    <ProjectHero project={project} locale={locale} />
    <ProjectGallery project={project} relatedProjects={getRelatedProjects(slug)} nextProject={nextProject} locale={locale} />
  </>;
}
