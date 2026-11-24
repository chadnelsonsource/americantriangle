import Link from "next/link";
import { cn } from "@/lib/utils";

export function Logo({
  className,
  imageClassName,
}: {
  className?: string;
  imageClassName?: string;
}) {
  return (
    <span className={cn("inline-flex items-center", className)}>
      <img src="/images/logo2.png" alt="Americantriangle" width={1096} height={469} className={cn("h-14 w-auto", imageClassName)} />
    </span>
  );
}

export function LogoLink() {
  return (
    <Link href="/" className="inline-flex min-h-11 items-center rounded-sm">
      <Logo />
    </Link>
  );
}
