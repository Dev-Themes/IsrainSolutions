import Link from "next/link";
import { Container } from "@/components/layout/container";

export default function NotFound() {
  return (
    <Container className="flex h-full flex-col items-center justify-center min-h-[400px]">
      <div className="flex flex-col items-center gap-4 text-center">
        <h2 className="text-4xl font-extrabold tracking-tight lg:text-5xl">404</h2>
        <p className="text-lg text-muted-foreground">Page not found.</p>
        <Link
          href="/"
          className="rounded-md bg-primary px-4 py-2 text-sm text-primary-foreground hover:bg-primary/90"
        >
          Return Home
        </Link>
      </div>
    </Container>
  );
}
