import { ResetForm } from "@/features/auth/forms";
import { pageMetadata } from "@/config/seo";

export const metadata = pageMetadata("Forgot password", "Send a password reset link.", "/forgot-password");

export default function ForgotPasswordPage() {
  return (
    <>
      <h1 className="text-4xl">Reset your password</h1>
      <p className="mt-3 text-sm text-muted">If the email matches an account, a reset link is sent. The page does not reveal whether the account exists.</p>
      <div className="mt-8">
        <ResetForm />
      </div>
    </>
  );
}
