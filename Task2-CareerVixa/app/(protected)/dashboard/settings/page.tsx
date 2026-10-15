import { getContributorProfile } from "@/lib/actions/client-profile";
import ContributorProfileForm from "@/components/client/ContributorProfileForm";

export const metadata = {
  title: "Contributor Settings | CareerVixa",
  description: "Manage your contributor profile, contact information, and guest publishing credentials.",
};

export default async function SettingsPage() {
  const { profile, user } = await getContributorProfile();

  return (
    <div className="max-w-4xl space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight sm:text-3xl text-slate-950 dark:text-[#F8FAFC]">Contributor Profile</h1>
        <p className="text-sm text-slate-600 dark:text-[#CBD5E1] mt-1">
          Manage your author attribution, organization details, and publishing credentials for CareerVixa.
        </p>
      </div>

      <ContributorProfileForm initialProfile={profile} user={user} />
    </div>
  );
}
