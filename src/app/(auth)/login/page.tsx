import Link from "next/link";
import { SignInForm } from "@/features/auth/forms";
import { pageMetadata } from "@/config/seo";
import { safeInternalPath } from "@/server/auth/paths";
import { showAccountEntry } from "@/config/site";

export const metadata = pageMetadata("Sign in", "Sign in to Americantriangle.", "/login");

export default async function LoginPage({ searchParams }: { searchParams: Promise<{ next?: string }> }) {
  const params = await searchParams;
  const nextPath = params.next ? safeInternalPath(params.next, "") : "";
  return (
    <>
      <h1 className="text-4xl">Sign in</h1>
      <p className="mt-3 text-sm text-muted">Email and password. Google, GitHub, and enterprise SSO are not enabled.</p>
      <div className="mt-8">
        <SignInForm nextPath={nextPath} />
      </div>
      <p className="mt-6 text-sm">
        <Link href="/forgot-password" className="underline decoration-copper underline-offset-4">
          Forgot password
        </Link>
        {showAccountEntry ? (
          <>
            {" · "}
            <Link href="/register" className="underline decoration-copper underline-offset-4">
              Create an account
            </Link>
          </>
        ) : null}
      </p>
    </>
  );
}
