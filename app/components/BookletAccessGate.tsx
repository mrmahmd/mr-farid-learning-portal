"use client";

import { ReactNode, useEffect, useState } from "react";
import Link from "next/link";
import { getSupabaseBrowserClient } from "../lib/supabase";

export function BookletAccessGate({ children }: { children: ReactNode }) {
  const [state, setState] = useState<"loading" | "allowed" | "login" | "blocked">("loading");

  useEffect(() => {
    async function verify() {
      const supabase = getSupabaseBrowserClient();
      const { data } = await supabase.auth.getSession();
      if (!data.session) {
        setState("login");
        return;
      }
      const { data: access } = await supabase
        .from("student_access")
        .select("is_suspended, booklet_access")
        .eq("user_id", data.session.user.id)
        .maybeSingle();
      setState(access?.is_suspended || access?.booklet_access === false ? "blocked" : "allowed");
    }
    void verify();
  }, []);

  if (state === "allowed") return children;
  return (
    <section className="glass-card standalone-form">
      <span className="mini-logo">MF</span>
      <h1>{state === "loading" ? "Checking access..." : state === "login" ? "Student sign in required" : "Booklet access unavailable"}</h1>
      <p>{state === "blocked" ? "Please contact Mr.Farid to activate booklet downloads for your account." : "Sign in with your student account to view available booklets."}</p>
      {state === "login" && <Link className="primary-button" href="/login">Sign In</Link>}
      {state === "blocked" && <a className="primary-button" href="https://wa.me/966552019074" target="_blank" rel="noreferrer">Contact Mr.Farid</a>}
    </section>
  );
}
