import { Container } from "@/components/layout/container";
import { Loader2 } from "lucide-react";

export default function Loading() {
  return (
    <Container className="flex h-full flex-col items-center justify-center min-h-[400px]">
      <div className="flex flex-col items-center gap-4">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
        <p className="text-sm text-muted-foreground">Loading...</p>
      </div>
    </Container>
  );
}
