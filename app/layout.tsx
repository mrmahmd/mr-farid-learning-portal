import type { Metadata } from "next";
import type { CSSProperties } from "react";
import { portalAsset } from "./asset-path";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Mr.Farid Learning Portal",
    template: "%s | Mr.Farid",
  },
  description: "Mr. Mohamed Farid Learning Portal for English and Connect Plus, Primary 1–6.",
  icons: {
    icon: portalAsset("/mr-farid-avatar.png"),
    apple: portalAsset("/mr-farid-avatar.png"),
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const portalTheme = {
    "--portal-hero-image": `url("${portalAsset("/hero-learning-world-v2.png")}")`,
  } as CSSProperties;

  return (
    <html lang="en">
      <body style={portalTheme}>{children}</body>
    </html>
  );
}
