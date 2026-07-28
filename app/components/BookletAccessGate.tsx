"use client";

import { ReactNode, useEffect, useState } from "react";
import Link from "next/link";
import { getSupabaseBrowserClient } from "../lib/supabase";
import { SubscriptionNotice } from "./SubscriptionNotice";

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
        .select("is_suspended, booklet_access, access_mode")
        .eq("user_id", data.session.user.id)
        .maybeSingle();
      setState(!access || access.is_suspended || access.booklet_access !== true || access.access_mode !== "all" ? "blocked" : "allowed");
    }
    void verify();
  }, []);

  if (state === "allowed") return children;
  return (
    <section className="glass-card standalone-form booklet-locked-panel">
      <span className="mini-logo">MF</span>
      <h1>{state === "loading" ? "Checking access..." : "Booklets are for subscribers only"}</h1>
      {state !== "loading" ? <SubscriptionNotice showSignIn={state === "login"} /> : <p>Checking your account access…</p>}
    </section>
  );
}
