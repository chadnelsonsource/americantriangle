import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  poweredByHeader: false,
  reactStrictMode: true,
  agentRules: false,
  async redirects() {
    return [
      {
        source: "/",
        has: [{ type: "host", value: "www.americantriangle.com" }],
        destination: "https://americantriangle.com",
        permanent: true,
      },
      {
        source: "/:path+",
        has: [{ type: "host", value: "www.americantriangle.com" }],
        destination: "https://americantriangle.com/:path+",
        permanent: true,
      },
    ];
  },
  images: {
    // Sources are 1920px wide. The default list continues to 3840 and would upscale them.
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
  },
};

export default nextConfig;
