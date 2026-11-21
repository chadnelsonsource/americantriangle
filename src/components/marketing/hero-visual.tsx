"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { Component, useEffect, useState, useSyncExternalStore, type ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { pillars } from "@/config/catalog";
import { cn } from "@/lib/utils";

const HeroScene = dynamic(() => import("@/components/marketing/hero-scene").then((mod) => mod.HeroScene), { ssr: false });

type HeroDivisionId = "data" | "intelligence" | "engineering";

const divisions: readonly { id: HeroDivisionId; label: string; color: string; pillar: (typeof pillars)[number] }[] = [
  { id: "data", label: "Data infrastructure", color: "#ff9a32", pillar: pillars[0] },
  { id: "intelligence", label: "Model intelligence", color: "#8d5cff", pillar: pillars[1] },
  { id: "engineering", label: "Enterprise applications", color: "#2ad4e0", pillar: pillars[2] },
];

function webglAvailable() {
  try {
    const canvas = document.createElement("canvas");
    return Boolean(canvas.getContext("webgl2") || canvas.getContext("webgl"));
  } catch {
    return false;
  }
}

function subscribeMedia(query: string) {
  return (onStoreChange: () => void) => {
    const media = window.matchMedia(query);
    media.addEventListener("change", onStoreChange);
    return () => media.removeEventListener("change", onStoreChange);
  };
}

const subscribeReduced = subscribeMedia("(prefers-reduced-motion: reduce)");
const subscribeNarrow = subscribeMedia("(max-width: 767px)");

function subscribeVisibility(onStoreChange: () => void) {
  document.addEventListener("visibilitychange", onStoreChange);
  return () => document.removeEventListener("visibilitychange", onStoreChange);
}

function subscribeWebgl(onStoreChange: () => void) {
  window.addEventListener("visibilitychange", onStoreChange);
  return () => window.removeEventListener("visibilitychange", onStoreChange);
}

function reducedNow() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function narrowNow() {
  return window.matchMedia("(max-width: 767px)").matches;
}

function hiddenNow() {
  return document.hidden;
}

function serverFalse() {
  return false;
}

class SceneBoundary extends Component<{ children: ReactNode; onError: () => void }, { failed: boolean }> {
  state = { failed: false };

  static getDerivedStateFromError() {
    return { failed: true };
  }

  componentDidCatch() {
    this.props.onError();
  }

  render() {
    if (this.state.failed) return null;
    return this.props.children;
  }
}

function HeroFallback({ active }: { active: HeroDivisionId | null }) {
  const nodes = [
    { id: "data" as const, className: "left-[22%] h-24", color: "#ff9a32" },
    { id: "intelligence" as const, className: "left-1/2 h-40 -translate-x-1/2", color: "#8d5cff" },
    { id: "engineering" as const, className: "right-[22%] h-28", color: "#2ad4e0" },
  ];
  return (
    <div className="grid h-full place-items-end pb-10" aria-hidden="true">
      <div className="relative h-44 w-full max-w-sm">
        {nodes.map((node) => (
          <span
            key={node.id}
            className={cn("absolute bottom-0 w-3 border", node.className, active === node.id ? "opacity-100" : "opacity-70")}
            style={{ borderColor: node.color, boxShadow: `0 0 18px ${node.color}` }}
          />
        ))}
      </div>
    </div>
  );
}

export function HeroVisual() {
  const webgl = useSyncExternalStore(subscribeWebgl, webglAvailable, serverFalse);
  const reduced = useSyncExternalStore(subscribeReduced, reducedNow, serverFalse);
  const mobile = useSyncExternalStore(subscribeNarrow, narrowNow, serverFalse);
  const hidden = useSyncExternalStore(subscribeVisibility, hiddenNow, serverFalse);
  const [visible, setVisible] = useState(true);
  const [failed, setFailed] = useState(false);
  const [pinned, setPinned] = useState<HeroDivisionId | null>(null);
  const [preview, setPreview] = useState<HeroDivisionId | null>(null);
  const active = preview ?? pinned;
  const shown = divisions.find((division) => division.id === active);

  useEffect(() => {
    const node = document.getElementById("hero-visual");
    if (!node) return undefined;
    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), { threshold: 0.08 });
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  const live = webgl === true && !failed;

  return (
    <div className="min-w-0">
      <div id="hero-visual" className={cn("relative h-72 overflow-hidden rounded-md border border-white/10 bg-[radial-gradient(ellipse_at_center,#14233f_0%,#070b16_70%)] sm:h-80 lg:h-[32rem]", preview && "cursor-pointer")}>
        {live ? (
          <SceneBoundary onError={() => setFailed(true)}>
            <HeroScene active={active} reduced={reduced} mobile={mobile} paused={hidden || !visible} onHover={setPreview} onSelect={(id) => setPinned((current) => (current === id ? null : id))} />
          </SceneBoundary>
        ) : webgl === false || failed ? (
          <HeroFallback active={active} />
        ) : null}
      </div>
      <div className="mt-3" aria-live="polite">
        <p className="text-sm font-medium text-band">{shown ? shown.pillar.title : "Three connected divisions"}</p>
        <p className="mt-1 text-sm leading-6 text-band/75">
          {shown ? shown.pillar.body : "Select a division. The streams run in both directions. The three divisions are not a sequence."}
        </p>
        {shown ? (
          <Link href={shown.pillar.href} className="mt-1 inline-flex min-h-11 items-center text-sm text-band underline decoration-white/40 underline-offset-4 hover:decoration-band">
            Open {shown.pillar.title}
          </Link>
        ) : null}
      </div>
      <div className="mt-2 flex flex-wrap gap-2" role="group" aria-label="Divisions in the hero">
        {divisions.map((division) => (
          <Button
            key={division.id}
            type="button"
            variant="chip"
            tone="night"
            aria-pressed={pinned === division.id}
            className={active === division.id ? "border-band" : undefined}
            onMouseEnter={() => setPreview(division.id)}
            onMouseLeave={() => setPreview((current) => (current === division.id ? null : current))}
            onFocus={() => setPreview(division.id)}
            onBlur={() => setPreview((current) => (current === division.id ? null : current))}
            onClick={() => setPinned((current) => (current === division.id ? null : division.id))}
          >
            <span aria-hidden className="mr-2 h-1.5 w-1.5 rounded-full" style={{ backgroundColor: division.color }} />
            {division.label}
          </Button>
        ))}
      </div>
    </div>
  );
}
