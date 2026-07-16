"use client";

import { FormEvent, useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  friendlyAuthError,
  getSupabaseBrowserClient,
  isValidUsername,
  usernameToStudentEmail,
} from "../lib/supabase";

export function HomeLoginCard() {
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
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

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const username = String(form.get("username") ?? "");
    const password = String(form.get("password") ?? "");

    if (!isValidUsername(username)) {
      setIsError(true);
      setMessage("Enter a valid username using English letters, numbers, dots, dashes or underscores.");
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

    setIsSignedIn(true);
    router.push("/student/curricula");
  }

  async function handleSignOut() {
    await getSupabaseBrowserClient().auth.signOut();
    setIsSignedIn(false);
    setMessage("");
  }

  if (isSignedIn) {
    return (
      <aside className="glass-card login-card returning-student-card" aria-label="Continue learning">
        <div className="card-heading">
          <span className="mini-logo">MF</span>
          <div>
            <p>Welcome back</p>
            <h2>You are signed in</h2>
          </div>
        </div>

        <p className="returning-student-copy">
          Your session is saved. Continue to your curricula without entering your username and password again.
        </p>

        <Link className="primary-button" href="/student/curricula">
          Continue to My Curricula <span aria-hidden="true">→</span>
        </Link>

        <button className="secondary-button" type="button" onClick={handleSignOut}>
          Sign Out
        </button>

        <p className="privacy-note">Your account stays signed in on this device.</p>
      </aside>
    );
  }

  return (
    <form className="glass-card login-card" aria-label="Student login" onSubmit={handleSubmit}>
      <div className="card-heading">
        <span className="mini-logo">MF</span>
        <div>
          <p>Welcome back</p>
          <h2>Student Login</h2>
        </div>
      </div>

      <label className="field-label" htmlFor="home-username">Username</label>
      <div className="input-shell">
        <span aria-hidden="true">ID</span>
        <input id="home-username" name="username" placeholder="Enter your username" autoComplete="username" required />
      </div>

      <div className="label-row">
        <label className="field-label" htmlFor="home-password">Password</label>
        <a
          href="https://wa.me/966552019074?text=I%20need%20help%20with%20my%20Mr.Farid%20Portal%20password"
          className="quiet-link"
          target="_blank"
          rel="noreferrer"
        >
          Need help?
        </a>
      </div>
      <div className="input-shell">
        <span aria-hidden="true">••</span>
        <input id="home-password" name="password" type="password" placeholder="Enter your password" autoComplete="current-password" required />
      </div>

      <button className="primary-button" type="submit" disabled={isLoading}>
        {isLoading ? "Signing In..." : "Enter Learning Portal"} <span aria-hidden="true">→</span>
      </button>

      {message && (
        <p className={`form-message${isError ? " error" : ""}`} role="status" aria-live="polite">
          {message}
        </p>
      )}

      <div className="divider"><span>New to our learning world?</span></div>

      <Link className="secondary-button" href="/register">
        Create New Account
      </Link>

      <p className="privacy-note">A safe learning space for every young learner.</p>
    </form>
  );
}
