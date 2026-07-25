"use client";

import { useEffect, useState } from "react";
import { getSupabaseBrowserClient } from "../lib/supabase";
import { MarketingLanding } from "./MarketingLanding";
import { PortalHome } from "./PortalHome";
import styles from "./MarketingLanding.module.css";

type EntryState = "checking" | "visitor" | "student";

export function HomeExperience() {
  const [entryState, setEntryState] = useState<EntryState>("checking");

  useEffect(() => {
    const supabase = getSupabaseBrowserClient();
    let active = true;

    void supabase.auth.getSession().then(({ data }) => {
      if (active) setEntryState(data.session ? "student" : "visitor");
    });

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      if (active) setEntryState(session ? "student" : "visitor");
    });

    return () => {
      active = false;
      listener.subscription.unsubscribe();
    };
  }, []);

  if (entryState === "checking") {
    return (
      <main className={styles.entryLoading} aria-label="Loading Mr.Farid Learning Portal">
        <span>MF</span>
      </main>
    );
  }

  return entryState === "student" ? <PortalHome /> : <MarketingLanding />;
}
