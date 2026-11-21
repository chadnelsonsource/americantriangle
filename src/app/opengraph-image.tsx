import { ImageResponse } from "next/og";

export const alt = "Americantriangle";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", background: "#111216", color: "#f6f3ec", display: "flex", flexDirection: "column", justifyContent: "flex-end", padding: 72 }}>
        <div style={{ fontSize: 22, letterSpacing: 4, color: "#ee5a24" }}>AMERICANTRIANGLE</div>
        <div style={{ fontSize: 64, marginTop: 24, maxWidth: 860, lineHeight: 1.05 }}>The human layer behind reliable AI.</div>
      </div>
    ),
    size,
  );
}
