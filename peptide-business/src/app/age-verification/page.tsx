import { Metadata } from "next";
import AgeVerificationClient from "./AgeVerificationClient";

export const metadata: Metadata = {
  title: "Age Confirmation | Peptide Ingredients Lab",
  description: "Please confirm you are at least 18 years old to access the peptide ingredient catalog.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function AgeVerificationPage({
  searchParams,
}: {
  searchParams: { returnUrl?: string };
}) {
  const returnUrl = searchParams.returnUrl || "/";

  return <AgeVerificationClient returnUrl={returnUrl} />;
}
