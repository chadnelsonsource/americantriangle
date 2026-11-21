import { Skeleton } from "@/components/ui/feedback";

export default function Loading() {
  return (
    <main id="content" aria-busy="true" className="mx-auto max-w-3xl space-y-4 px-6 py-16">
      <p className="sr-only">Loading</p>
      <Skeleton className="h-4 w-24" />
      <Skeleton className="h-12 w-2/3" />
      <Skeleton className="h-24 w-full" />
    </main>
  );
}
