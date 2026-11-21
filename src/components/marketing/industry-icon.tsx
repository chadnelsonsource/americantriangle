export function IndustryIcon({ slug }: { slug: string }) {
  const props = {
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.5,
    "aria-hidden": true as const,
    className: "h-6 w-6 text-accent",
  };
  if (slug === "healthcare") {
    return (
      <svg {...props}>
        <circle cx="12" cy="12" r="8" />
        <path d="M12 8.5v7M8.5 12h7" />
      </svg>
    );
  }
  if (slug === "financial-services") {
    return (
      <svg {...props}>
        <rect x="5" y="3.5" width="14" height="17" />
        <path d="M8.5 8h7M8.5 12h7M8.5 16h4" />
      </svg>
    );
  }
  if (slug === "software") {
    return (
      <svg {...props}>
        <path d="M8 8 4.5 12 8 16M16 8l3.5 4L16 16M13 6l-2 12" />
      </svg>
    );
  }
  if (slug === "education") {
    return (
      <svg {...props}>
        <path d="M3.5 9 12 5l8.5 4L12 13 3.5 9Z" />
        <path d="M7 11.2V16c1.6 1.2 3.2 1.8 5 1.8s3.4-.6 5-1.8v-4.8" />
      </svg>
    );
  }
  if (slug === "manufacturing") {
    return (
      <svg {...props}>
        <rect x="3.5" y="3.5" width="7" height="7" />
        <rect x="13.5" y="3.5" width="7" height="7" />
        <rect x="3.5" y="13.5" width="7" height="7" />
        <rect x="13.5" y="13.5" width="7" height="7" />
      </svg>
    );
  }
  return (
    <svg {...props}>
      <path d="M4 8.5h11l2 3.5H4V8.5Z" />
      <path d="M8 8.5 9.5 4h5" />
      <path d="M7 16.5h.01M16 16.5h.01" />
      <circle cx="7" cy="16.5" r="1.25" />
      <circle cx="16" cy="16.5" r="1.25" />
    </svg>
  );
}
