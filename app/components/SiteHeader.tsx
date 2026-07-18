"use client";

import { useEffect, useState } from "react";
import { portalAsset } from "../asset-path";
import { getSupabaseBrowserClient } from "../lib/supabase";

export function SiteHeader() {
  const [isSignedIn, setIsSignedIn] = useState(false);

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
    window.location.assign(portalAsset("/"));
  }

  const curriculaHref = isSignedIn ? "/student/curricula" : "/curricula";
  const curriculaLabel = isSignedIn ? "My Curricula" : "Curricula";
  const pageHref = (path: string) => portalAsset(path === "/" ? "/" : `${path.replace(/\/$/, "")}/`);

  return (
    <header className="site-header">
      <a href={pageHref("/")} className="brand" aria-label="Mr.Farid home">
        <span className="brand-mark brand-portrait">
          <img src={portalAsset("/mr-farid-avatar.png")} alt="" />
          <span>✦</span>
        </span>
        <span className="brand-name">
          <strong>Mr.Farid</strong>
          <small>Learning Portal</small>
        </span>
      </a>

      <nav className="desktop-nav" aria-label="Main navigation" dir="ltr">
        <a href={pageHref("/")}>Home</a>
        <a href={pageHref("/teacher")}>Meet the Teacher</a>
        <a href={pageHref(curriculaHref)}>{curriculaLabel}</a>
        <a href={pageHref("/games")}>Games</a>
        <a href={pageHref("/whats-new")}>What's New?</a>
        <a href={pageHref("/booklets")}>Booklets</a>
        <a href={pageHref("/about")}>About the Portal</a>
      </nav>

      <div className="header-actions">
        {isSignedIn ? (
          <>
            <a href={pageHref("/student/curricula")} className="nav-login">My Curricula</a>
            <button className="nav-create nav-signout" type="button" onClick={handleSignOut}>Sign Out</button>
          </>
        ) : (
          <>
            <a href={pageHref("/login")} className="nav-login">Sign In</a>
            <a href={pageHref("/register")} className="nav-create">Create Account</a>
          </>
        )}
      </div>

      <details className="mobile-menu">
        <summary aria-label="Open navigation">☰</summary>
        <div className="mobile-menu-panel">
          <a href={pageHref("/")}>Home</a>
          <a href={pageHref("/teacher")}>Meet the Teacher</a>
          <a href={pageHref(curriculaHref)}>{curriculaLabel}</a>
          <a href={pageHref("/games")}>Games</a>
          <a href={pageHref("/whats-new")}>What's New?</a>
          <a href={pageHref("/booklets")}>Booklets</a>
          <a href={pageHref("/about")}>About the Portal</a>
          {isSignedIn ? (
            <>
              <a href={pageHref("/student/curricula")}>My Curricula</a>
              <button type="button" onClick={handleSignOut}>Sign Out</button>
            </>
          ) : (
            <>
              <a href={pageHref("/login")}>Sign In</a>
              <a href={pageHref("/register")}>Create Account</a>
            </>
          )}
        </div>
      </details>
    </header>
  );
}
