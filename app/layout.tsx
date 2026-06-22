import type { Metadata, Viewport } from "next";
import { Space_Grotesk } from "next/font/google";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-space-grotesk",
  display: "swap",
});

export const metadata: Metadata = {
  title: "GLÅCE — Frozen Intelligence",
  description:
    "GLÅCE conçoit des expériences numériques cristallines — l'ingénierie de pointe rencontre une esthétique glaciale et intemporelle.",
  keywords: ["WebGL", "3D", "creative studio", "Awwwards", "design", "GLÅCE"],
  authors: [{ name: "GLÅCE Studio" }],
  openGraph: {
    title: "GLÅCE — Frozen Intelligence",
    description: "Expériences numériques cristallines. WebGL & IA.",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#050507",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" className={spaceGrotesk.variable}>
      <body className="bg-void text-frost font-sans antialiased">
        {children}
        <div className="noise-overlay" aria-hidden="true" />
      </body>
    </html>
  );
}
