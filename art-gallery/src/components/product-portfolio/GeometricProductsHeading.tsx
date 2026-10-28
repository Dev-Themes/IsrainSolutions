import { ui } from "@/i18n/ui";
import { GeometricHeading } from "@/components/branding/GeometricHeading";
import type { Locale } from "@/types/portfolio";

export function GeometricProductsHeading({ as = "h1", className = "", locale = "en" }: { as?: "h1" | "h2"; className?: string; locale?: Locale }) {
  return <GeometricHeading text={ui(locale, "PRODUITS", "PRODUCTS")} as={as} className={className} />;
}
