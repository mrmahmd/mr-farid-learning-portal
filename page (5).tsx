import type { ReactNode } from "react";
import { SiteHeader } from "./SiteHeader";
import { SocialLinks } from "./SocialLinks";

export function InnerPageShell({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <main className={`inner-page ${className}`}>
      <SiteHeader />
      <div className="inner-shade" aria-hidden="true" />
      <div className="inner-content">{children}</div>
      <SocialLinks floating />
    </main>
  );
}
