"use client";

import { useEffect, useId, useRef } from "react";
import { cn } from "@/lib/utils";

export function Dialog({
  id,
  open,
  title,
  onClose,
  children,
  className,
}: {
  id?: string;
  open: boolean;
  title: string;
  onClose: () => void;
  children: React.ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDialogElement>(null);
  const titleId = useId();

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    if (open && !node.open) node.showModal();
    if (!open && node.open) node.close();
  }, [open]);

  useEffect(() => {
    const query = window.matchMedia("(min-width: 48rem)");
    function closeOnDesktop() {
      if (query.matches) onClose();
    }
    query.addEventListener("change", closeOnDesktop);
    return () => query.removeEventListener("change", closeOnDesktop);
  }, [onClose]);

  return (
    <dialog id={id} ref={ref} aria-labelledby={titleId} className={cn("sheet", className)} onClose={onClose}>
      <div className="flex items-center justify-between gap-4 border-b border-white/10 px-5 py-3">
        <h2 id={titleId} className="font-sans text-base font-medium text-band">
          {title}
        </h2>
        <button type="button" className="min-h-11 rounded-md px-3 text-sm text-band transition-colors hover:bg-white/10" onClick={onClose}>
          Close
        </button>
      </div>
      <div className="max-h-[70vh] overflow-y-auto px-5 py-4">{children}</div>
    </dialog>
  );
}
