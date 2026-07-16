import Link from "next/link";
import { portalAsset } from "../asset-path";

export function SiteHeader() {
  return (
    <header className="site-header">
      <Link href="/" className="brand" aria-label="Mr.Farid home">
        <span className="brand-mark brand-portrait">
          <img src={portalAsset("/mr-farid-avatar.png")} alt="" />
          <span>✦</span>
        </span>
        <span className="brand-name">
          <strong>Mr.Farid</strong>
          <small>Learning Portal</small>
        </span>
      </Link>

      <nav className="desktop-nav" aria-label="Main navigation" dir="ltr">
        <Link href="/teacher">Meet the Teacher</Link>
        <Link href="/curricula">Curricula</Link>
        <Link href="/about">About the Portal</Link>
      </nav>

      <div className="header-actions">
        <Link href="/login" className="nav-login">Sign In</Link>
        <Link href="/register" className="nav-create">Create Account</Link>
      </div>

      <details className="mobile-menu">
        <summary aria-label="Open navigation">☰</summary>
        <div className="mobile-menu-panel">
          <Link href="/teacher">Meet the Teacher</Link>
          <Link href="/curricula">Curricula</Link>
          <Link href="/about">About the Portal</Link>
          <Link href="/login">Sign In</Link>
          <Link href="/register">Create Account</Link>
        </div>
      </details>
    </header>
  );
}
