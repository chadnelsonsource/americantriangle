import { LogoLink } from "@/components/brand/logo";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <main id="content" className="mx-auto flex min-h-screen max-w-md flex-col justify-center px-6 py-16">
      <LogoLink />
      <div className="mt-8">{children}</div>
    </main>
  );
}
