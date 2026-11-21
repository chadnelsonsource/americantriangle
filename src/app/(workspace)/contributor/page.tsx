import { EmptyState } from "@/components/ui/feedback";
import { PageIntro } from "@/components/workspace/shell";
import { isSupabaseConfigured } from "@/config/public-env";

export default function ContributorHomePage() {
  return (
    <>
      <PageIntro title="Contributor overview" lede="Qualification, eligible projects, and your own assignments appear here after you sign in with a configured identity provider." />
      <div className="mt-8">
        <EmptyState
          title={isSupabaseConfigured() ? "No assignments yet" : "Identity is not configured"}
          body={
            isSupabaseConfigured()
              ? "When you are qualified and a project matches your skills, openings show up under Projects. Registration does not guarantee work."
              : "Add the Supabase URL and anon key to load your profile. No sample contributor is shown in their place."
          }
        />
      </div>
    </>
  );
}
