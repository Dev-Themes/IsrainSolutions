import { notFound } from "next/navigation";

/** Keep unknown localized URLs inside their language's layout and 404 boundary. */
export default function UnmatchedPage() {
  notFound();
}
