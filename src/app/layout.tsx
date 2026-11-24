import type { Metadata } from "next";
import { Newsreader, Outfit } from "next/font/google";
import { site, siteOrigin } from "@/config/site";
import "@/styles/globals.css";

const sans = Outfit({ subsets: ["latin"], variable: "--font-outfit", display: "swap" });
const serif = Newsreader({ subsets: ["latin"], style: ["normal", "italic"], variable: "--font-newsreader", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(siteOrigin),
  title: { default: site.name, template: `%s · ${site.name}` },
  description: site.description,
  applicationName: site.name,
  robots: { index: true, follow: true },
  icons: {
    icon: [
      { url: "/favicon_io/favicon.ico" },
      { url: "/favicon_io/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon_io/favicon-16x16.png", sizes: "16x16", type: "image/png" },
    ],
    apple: [{ url: "/favicon_io/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
  },
  manifest: "/favicon_io/site.webmanifest",
  openGraph: {
    title: site.positioning,
    description: site.description,
    siteName: site.name,
    url: siteOrigin,
    type: "website",
    images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: "Americantriangle. The human layer behind reliable AI." }],
  },
  twitter: {
    card: "summary_large_image",
    title: site.positioning,
    description: site.description,
    images: ["/opengraph-image"],
  },
};

const themeScript = `try{var t=localStorage.getItem("theme");if(t==="dark"){document.documentElement.classList.add("dark")}}catch(e){}`;

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${sans.variable} ${serif.variable}`} data-scroll-behavior="smooth" suppressHydrationWarning>
      <body>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        <a href="#content" className="skip-link">
          Skip to content
        </a>
        {children}
      </body>
    </html>
  );
}
