import ServiceDetailPage, { generateMetadata as detailMetadata } from "../[slug]/page";

export async function generateMetadata() {
  return detailMetadata({ params: Promise.resolve({ slug: "seo-content-writing" }) });
}

export default function Page() {
  return <ServiceDetailPage params={Promise.resolve({ slug: "seo-content-writing" })} />;
}
