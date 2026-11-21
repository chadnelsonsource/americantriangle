import { SignUpForm } from "@/features/auth/forms";
import { pageMetadata } from "@/config/seo";

export const metadata = pageMetadata("Create account", "Register as a contributor or a client owner.", "/register");

export default function RegisterPage() {
  return (
    <>
      <h1 className="text-4xl">Create an account</h1>
      <p className="mt-3 text-sm text-muted">Staff and administrator accounts are invitation-only. The public form cannot create them.</p>
      <div className="mt-8">
        <SignUpForm />
      </div>
    </>
  );
}
