import { pageMetadata } from "@/config/seo";

export const metadata = pageMetadata("Account recovery", "Set a new password from the email link.", "/account-recovery");

export default function AccountRecoveryPage() {
  return (
    <>
      <h1 className="text-4xl">Check your email</h1>
      <p className="mt-3 text-muted">Open the reset link to choose a new password. The link expires. After it works, sign in with the new password.</p>
    </>
  );
}
