import ServiceDetailPage, { generateMetadata as detailMetadata } from "../services/[slug]/page";

export async function generateMetadata() {
  return detailMetadata({ params: Promise.resolve({ slug: "wikipedia-links" }) });
}

export default function Page() {
  return <ServiceDetailPage params={Promise.resolve({ slug: "wikipedia-links" })} />;
}
