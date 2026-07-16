"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { portalAsset } from "../asset-path";
import { getSupabaseBrowserClient } from "../lib/supabase";

export function SiteHeader() {
  const [isSignedIn, setIsSignedIn] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const supabase = getSupabaseBrowserClient();
    let isActive = true;

    void supabase.auth.getSession().then(({ data }) => {
      if (isActive) setIsSignedIn(Boolean(data.session));
    });

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      if (isActive) setIsSignedIn(Boolean(session));
    });

    return () => {
      isActive = false;
      listener.subscription.unsubscribe();
    };
  }, []);

  async function handleSignOut() {
    await getSupabaseBrowserClient().auth.signOut();
    setIsSignedIn(false);
    router.push("/");
  }

  const curriculaHref = isSignedIn ? "/student/curricula" : "/curricula";
  const curriculaLabel = isSignedIn ? "My Curricula" : "Curricula";

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
        <Link href="/">Home</Link>
        <Link href="/teacher">Meet the Teacher</Link>
        <Link href={curriculaHref}>{curriculaLabel}</Link>
        <Link href="/booklets">Booklets</Link>
        <Link href="/about">About the Portal</Link>
      </nav>

      <div className="header-actions">
        {isSignedIn ? (
          <>
            <Link href="/student/curricula" className="nav-login">My Curricula</Link>
            <button className="nav-create nav-signout" type="button" onClick={handleSignOut}>Sign Out</button>
          </>
        ) : (
          <>
            <Link href="/login" className="nav-login">Sign In</Link>
            <Link href="/register" className="nav-create">Create Account</Link>
          </>
        )}
      </div>

      <details className="mobile-menu">
        <summary aria-label="Open navigation">☰</summary>
        <div className="mobile-menu-panel">
          <Link href="/">Home</Link>
          <Link href="/teacher">Meet the Teacher</Link>
          <Link href={curriculaHref}>{curriculaLabel}</Link>
          <Link href="/booklets">Booklets</Link>
          <Link href="/about">About the Portal</Link>
          {isSignedIn ? (
            <>
              <Link href="/student/curricula">My Curricula</Link>
              <button type="button" onClick={handleSignOut}>Sign Out</button>
            </>
          ) : (
            <>
              <Link href="/login">Sign In</Link>
              <Link href="/register">Create Account</Link>
            </>
          )}
        </div>
      </details>
    </header>
  );
}
