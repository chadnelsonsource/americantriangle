"use client";

import { useEffect } from "react";

function blocked(el: HTMLElement) {
  if (el.closest("form, table, .hero-wash") || el.querySelector("form, table")) return true;
  if (el.parentElement?.closest(".cycle")) return true;
  const section = el.closest("section");
  if (section?.querySelector(".hero-wash")) return true;
  const position = getComputedStyle(el).position;
  return position === "absolute" || position === "fixed";
}

function add(list: HTMLElement[], el: Element | null) {
  if (!(el instanceof HTMLElement) || list.includes(el) || blocked(el)) return;
  list.push(el);
}

function collect(root: ParentNode) {
  const list: HTMLElement[] = [];
  root.querySelectorAll("section").forEach((section) => {
    if (section.querySelector(".hero-wash")) return;
    const title = section.querySelector(":scope .heading-title, :scope h2");
    if (!(title instanceof HTMLElement) || title.closest(".surface, .reveal, li, a")) return;
    const cluster = title.parentElement;
    if (cluster && cluster !== section && !cluster.querySelector(".surface, .reveal")) {
      add(list, cluster);
      return;
    }
    const eyebrow = title.previousElementSibling;
    if (eyebrow?.classList.contains("eyebrow")) add(list, eyebrow);
    add(list, title);
    const lede = title.nextElementSibling;
    if (lede?.tagName === "P") add(list, lede);
  });

  root.querySelectorAll(".surface, .reveal, .cycle, ul.divide-y > li, .bg-night").forEach((el) => add(list, el));

  root.querySelectorAll("section > ul, section > ol").forEach((listEl) => {
    if (listEl.querySelector(".surface, .reveal") || listEl.classList.contains("divide-y")) return;
    add(list, listEl);
  });

  return list.filter((el) => !list.some((other) => other !== el && other.contains(el)));
}

export function RevealOnScroll() {
  useEffect(() => {
    const root = document.getElementById("content");
    if (!root) return;
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (motion.matches) return;

    const html = document.documentElement;

    function settle(initial: boolean) {
      const entering: HTMLElement[] = [];
      collect(root!).forEach((el) => {
        el.classList.add("reveal");
        if (el.classList.contains("is-in") || el.classList.contains("is-shown")) return;
        const rect = el.getBoundingClientRect();
        if (rect.width === 0 && rect.height === 0 || rect.bottom <= 0) {
          el.classList.add("is-shown");
          return;
        }
        const viewport = window.innerHeight || document.documentElement.clientHeight;
        const onScreen = rect.bottom > 0 && rect.top < viewport;
        if (initial && onScreen) {
          el.classList.add("is-shown");
          return;
        }
        if (rect.top < viewport * 0.9 && rect.bottom > 0) entering.push(el);
      });
      entering
        .sort((a, b) => a.getBoundingClientRect().top - b.getBoundingClientRect().top || a.getBoundingClientRect().left - b.getBoundingClientRect().left)
        .forEach((el, index) => {
          el.style.setProperty("--reveal-delay", `${Math.min(index, 6) * 70}ms`);
          el.classList.add("is-in");
        });
    }

    settle(true);
    html.classList.add("reveal-ready");

    let scheduled = false;
    function requestSettle(initial: boolean) {
      if (scheduled) return;
      scheduled = true;
      requestAnimationFrame(() => {
        scheduled = false;
        settle(initial);
      });
    }

    const changes = new MutationObserver(() => requestSettle(true));
    changes.observe(root, { childList: true, subtree: true });
    const onScroll = () => requestSettle(false);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    function onFocusIn(event: FocusEvent) {
      const target = event.target;
      if (!(target instanceof Element)) return;
      const el = target.closest(".reveal");
      if (!(el instanceof HTMLElement) || el.classList.contains("is-in") || el.classList.contains("is-shown")) return;
      el.classList.add("is-shown");
    }
    root.addEventListener("focusin", onFocusIn);

    return () => {
      changes.disconnect();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      root.removeEventListener("focusin", onFocusIn);
      html.classList.remove("reveal-ready");
    };
  }, []);

  return null;
}
