import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Mr.Farid Learning Portal",
    template: "%s | Mr.Farid",
  },
  description: "Mr. Mohamed Farid Learning Portal for English and Connect Plus, Primary 1–6.",
  icons: { icon: "/favicon.svg" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
