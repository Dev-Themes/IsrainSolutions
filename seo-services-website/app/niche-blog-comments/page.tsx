import ServiceDetailPage, { generateMetadata as detailMetadata } from "../services/[slug]/page";

export async function generateMetadata() {
  return detailMetadata({ params: Promise.resolve({ slug: "niche-blog-comments" }) });
}

export default function Page() {
  return <ServiceDetailPage params={Promise.resolve({ slug: "niche-blog-comments" })} />;
}
