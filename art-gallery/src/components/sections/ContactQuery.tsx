"use client";

import { useSearchParams } from "next/navigation";
import { videoOffers } from "@/data/video-offers";
import type { Locale } from "@/types/portfolio";
import { ContactSection } from "./ContactSection";

export function ContactQuery({ locale }: { locale: Locale }) {
  const query = useSearchParams();
  const values = query.getAll("offer");
  const selected = values.length === 1 ? videoOffers.find(item => String(item.count) === values[0]) : undefined;
  return <ContactSection locale={locale} as="h1" offer={selected?.count} />;
}
