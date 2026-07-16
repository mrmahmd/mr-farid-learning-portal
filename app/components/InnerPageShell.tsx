import type { ReactNode } from "react";
import { SiteHeader } from "./SiteHeader";
import { SocialLinks } from "./SocialLinks";

export function InnerPageShell({
  children,
  className = "",
  showSocialLinks = true,
}: {
  children: ReactNode;
  className?: string;
  showSocialLinks?: boolean;
}) {
  return (
    <main className={`inner-page ${className}`}>
      <SiteHeader />
      <div className="inner-shade" aria-hidden="true" />
      <div className="inner-content">{children}</div>
      {showSocialLinks && <SocialLinks floating />}
    </main>
  );
}
