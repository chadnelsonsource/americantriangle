import { Skeleton } from "@/components/ui/feedback";

export default function InternalLoading() {
  return (
    <div aria-busy="true" className="space-y-4">
      <p className="sr-only">Loading</p>
      <Skeleton className="h-10 w-48" />
      <Skeleton className="h-20 w-full max-w-xl" />
      <Skeleton className="h-40 w-full" />
    </div>
  );
}
