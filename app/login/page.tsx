"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { InnerPageShell } from "../components/InnerPageShell";
import {
  friendlyAuthError,
  getSupabaseBrowserClient,
  isValidUsername,
  usernameToStudentEmail,
} from "../lib/supabase";

export default function LoginPage() {
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const username = String(form.get("username") ?? "");
    const password = String(form.get("password") ?? "");

    if (!isValidUsername(username)) {
      setIsError(true);
      setMessage("Enter a valid username.");
      return;
    }

    setIsLoading(true);
    setIsError(false);
    setMessage("Signing you in...");

    const { error } = await getSupabaseBrowserClient().auth.signInWithPassword({
      email: usernameToStudentEmail(username),
      password,
    });

    if (error) {
      setIsLoading(false);
      setIsError(true);
      setMessage(friendlyAuthError(error.message));
      return;
    }

    router.push("/student/curricula");
  }

  return (
    <InnerPageShell className="centered-page">
      <form className="glass-card standalone-form" onSubmit={handleSubmit}>
        <div className="form-title centered-title">
          <span className="mini-logo">MF</span>
          <div><p>Welcome back</p><h1>Student Login</h1></div>
        </div>
        <label htmlFor="loginUsername">Username</label>
        <input id="loginUsername" name="username" placeholder="Enter your username" autoComplete="username" required />
        <label htmlFor="loginPassword">Password</label>
        <input id="loginPassword" name="password" type="password" placeholder="Enter your password" autoComplete="current-password" required />
        <button className="primary-button" type="submit" disabled={isLoading}>
          {isLoading ? "Signing In..." : "Enter & View All Curricula"} <span>→</span>
        </button>
        {message && (
          <p className={`form-message${isError ? " error" : ""}`} role="status" aria-live="polite">
            {message}
          </p>
        )}
        <p className="form-switch">New student? <Link href="/register">Create an account</Link></p>
        <p className="form-switch password-help">
          Forgot your password? <a href="https://wa.me/966552019074?text=I%20need%20help%20with%20my%20Mr.Farid%20Portal%20password" target="_blank" rel="noreferrer">Contact Mr.Farid</a>
        </p>
      </form>
    </InnerPageShell>
  );
}
