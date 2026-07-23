"use client";

import { FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { InnerPageShell } from "../../components/InnerPageShell";
import { getSupabaseBrowserClient } from "../../lib/supabase";

export default function StudentChangePasswordPage() {
  const [checking, setChecking] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);
  const router = useRouter();

  useEffect(() => {
    let active = true;
    async function verify() {
      const supabase = getSupabaseBrowserClient();
      const { data: sessionData } = await supabase.auth.getSession();
      if (!sessionData.session) {
        router.replace("/login");
        return;
      }
      const { data } = await supabase
        .from("student_access")
        .select("grade, must_change_password")
        .eq("user_id", sessionData.session.user.id)
        .maybeSingle();
      if (!active) return;
      if (!data?.must_change_password) {
        router.replace(typeof data?.grade === "number" ? "/student/dashboard" : "/student/setup-grade");
        return;
      }
      setChecking(false);
    }
    void verify();
    return () => { active = false; };
  }, [router]);

  async function savePassword(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const password = String(form.get("password") ?? "");
    const confirmation = String(form.get("confirmation") ?? "");
    setIsError(false);

    if (password.length < 8) {
      setIsError(true);
      setMessage("Your new password must contain at least 8 characters.");
      return;
    }
    if (password !== confirmation) {
      setIsError(true);
      setMessage("The two passwords do not match.");
      return;
    }

    setSaving(true);
    setMessage("Saving your private password...");
    const supabase = getSupabaseBrowserClient();
    const { data, error } = await supabase.functions.invoke("student-change-password", {
      body: { password },
    });
    let detail = data?.error ?? error?.message ?? "Your password could not be changed.";
    if (error && "context" in error) {
      try { detail = (await (error.context as Response).json())?.error ?? detail; } catch { /* keep fallback */ }
    }
    if (error || data?.error) {
      setIsError(true);
      setMessage(detail);
      setSaving(false);
      return;
    }
    setMessage("Password saved successfully. Opening your dashboard...");
    router.replace("/student/dashboard");
  }

  async function signOut() {
    await getSupabaseBrowserClient().auth.signOut();
    router.replace("/");
  }

  return (
    <InnerPageShell className="password-setup-page">
      <section className="password-setup-card">
        <span className="mini-logo">MF</span>
        <p className="eyebrow"><span /> First login security</p>
        <h1>Create Your Private Password</h1>
        <p className="password-setup-lead">
          Mr.Farid gave you a temporary password. Create a new password that only you know before continuing.
        </p>
        <div className="password-setup-arabic" dir="rtl">
          <h2>أنشئ كلمة مرورك الخاصة</h2>
          <p>كلمة المرور الحالية مؤقتة. اكتب كلمة مرور جديدة خاصة بك ولا تشاركها مع أي شخص.</p>
        </div>
        {checking ? <p className="form-message">Checking your account...</p> : (
          <form className="password-setup-form" onSubmit={savePassword}>
            <label htmlFor="newPassword">New password</label>
            <input id="newPassword" name="password" type="password" minLength={8} autoComplete="new-password" required />
            <label htmlFor="confirmPassword">Confirm new password</label>
            <input id="confirmPassword" name="confirmation" type="password" minLength={8} autoComplete="new-password" required />
            <button className="primary-button" type="submit" disabled={saving}>{saving ? "Saving..." : "Save My Private Password"}</button>
            {message && <p className={`form-message${isError ? " error" : ""}`} role="status">{message}</p>}
          </form>
        )}
        <button className="password-setup-signout" type="button" onClick={signOut}>Sign Out</button>
      </section>
    </InnerPageShell>
  );
}
