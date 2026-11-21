import { PageIntro } from "@/components/workspace/shell";
import { ProfileForm } from "@/features/contributor/profile-form";

export default function ProfilePage() {
  return (
    <>
      <PageIntro title="Profile" lede="Skills, education, experience, languages, country, time zone, and availability are required before an assessment." />
      <ProfileForm />
    </>
  );
}
