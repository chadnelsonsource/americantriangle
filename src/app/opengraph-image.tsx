import { ImageResponse } from "next/og";

export const alt = "Americantriangle";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", background: "#07111f", color: "#f7fbff", display: "flex", flexDirection: "column", justifyContent: "flex-end", padding: 72 }}>
        <div style={{ fontSize: 22, letterSpacing: 4, color: "#22d3ee" }}>AMERICANTRIANGLE</div>
        <div style={{ fontSize: 28, marginTop: 20 }}>Talent. Technology. Opportunity.</div>
        <div style={{ fontSize: 56, marginTop: 20, maxWidth: 860, lineHeight: 1.05 }}>The human layer behind reliable AI.</div>
      </div>
    ),
    size,
  );
}
