"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { InnerPageShell } from "../components/InnerPageShell";
import {
  friendlyAuthError,
  getSupabaseBrowserClient,
  isValidUsername,
  normalizeUsername,
  usernameToStudentEmail,
} from "../lib/supabase";

export default function RegisterPage() {
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const fullName = String(form.get("fullName") ?? "").trim();
    const username = normalizeUsername(String(form.get("username") ?? ""));
    const grade = Number(form.get("grade") ?? 0);
    const password = String(form.get("password") ?? "");
    const confirmPassword = String(form.get("confirmPassword") ?? "");

    if (fullName.length < 3 || fullName.length > 100) {
      setIsError(true);
      setMessage("Please enter the student's full name.");
      return;
    }

    if (!isValidUsername(username)) {
      setIsError(true);
      setMessage("Use 4–30 English letters, numbers, dots, dashes or underscores for the username.");
      return;
    }

    if (!Number.isInteger(grade) || grade < 1 || grade > 6) {
      setIsError(true);
      setMessage("Please choose the student's primary grade.");
      return;
    }

    if (password !== confirmPassword) {
      setIsError(true);
      setMessage("Passwords do not match. Please try again.");
      return;
    }

    setIsLoading(true);
    setIsError(false);
    setMessage("Creating your account...");

    const { data, error } = await getSupabaseBrowserClient().auth.signUp({
      email: usernameToStudentEmail(username),
      password,
      options: {
        data: {
          full_name: fullName,
          username,
          grade,
        },
      },
    });

    if (error) {
      setIsLoading(false);
      setIsError(true);
      setMessage(friendlyAuthError(error.message));
      return;
    }

    if (data.session) {
      router.push("/student/dashboard");
      return;
    }

    setIsLoading(false);
    setMessage("Account created. You can now sign in with your username and password.");
  }

  return (
    <InnerPageShell className="form-page">
      <section className="wide-glass-card">
        <div className="form-intro">
          <p className="eyebrow"><span /> Start your journey</p>
          <h1>Create your student account</h1>
          <p>Choose the student&apos;s grade to open the right curricula, games and booklets from the first sign in.</p>
          <ul className="benefit-list">
            <li><b>01</b><span><strong>Create one account</strong><small>Use a simple username and password</small></span></li>
            <li><b>02</b><span><strong>Choose your primary grade</strong><small>Your learning content appears automatically</small></span></li>
            <li><b>03</b><span><strong>Learn in one organised space</strong><small>English and Connect Plus for your grade</small></span></li>
          </ul>
        </div>

        <form className="account-form" onSubmit={handleSubmit}>
          <div className="form-title">
            <span className="mini-logo">MF</span>
            <div><p>Student registration</p><h2>New Account</h2></div>
          </div>

          <label htmlFor="fullName">Full Name</label>
          <input id="fullName" name="fullName" placeholder="Enter the student's full name" minLength={3} maxLength={100} autoComplete="name" required />

          <label htmlFor="username">Username</label>
          <input
            id="username"
            name="username"
            placeholder="Choose a username"
            minLength={4}
            maxLength={30}
            pattern="[A-Za-z0-9._-]+"
            autoComplete="username"
            required
          />
          <p className="field-help">English letters and numbers only. Dots, dashes and underscores are allowed.</p>

          <label htmlFor="grade">Primary Grade</label>
          <select id="grade" name="grade" defaultValue="" required>
            <option value="" disabled>Choose the student&apos;s grade</option>
            {[1, 2, 3, 4, 5, 6].map((grade) => (
              <option key={grade} value={grade}>Primary {grade}</option>
            ))}
          </select>
          <p className="field-help">The student will see this grade and the higher locked grades.</p>

          <div className="two-columns">
            <div><label htmlFor="password">Password</label><input id="password" name="password" type="password" placeholder="At least 8 characters" minLength={8} autoComplete="new-password" required /></div>
            <div><label htmlFor="confirmPassword">Confirm Password</label><input id="confirmPassword" name="confirmPassword" type="password" placeholder="Repeat password" minLength={8} autoComplete="new-password" required /></div>
          </div>

          <button className="primary-button" type="submit" disabled={isLoading}>
            {isLoading ? "Creating Account..." : "Create My Account"} <span>→</span>
          </button>
          {message && (
            <p className={`form-message${isError ? " error" : ""}`} role="status" aria-live="polite">
              {message}
            </p>
          )}
          <p className="form-switch">Already registered? <Link href="/login">Sign in here</Link></p>
        </form>
      </section>
    </InnerPageShell>
  );
}
