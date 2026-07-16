"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { InnerPageShell } from "../components/InnerPageShell";

export default function RegisterPage() {
  const [message, setMessage] = useState("");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    if (data.get("password") !== data.get("confirmPassword")) {
      setMessage("Passwords do not match. Please try again.");
      return;
    }
    setMessage("Great! The form is ready. Account saving will be activated when Supabase is connected.");
  }

  return (
    <InnerPageShell className="form-page">
      <section className="wide-glass-card">
        <div className="form-intro">
          <p className="eyebrow"><span /> Start your journey</p>
          <h1>Create your student account</h1>
          <p>One account will give you access to your grade, curriculum, lessons, activities and progress.</p>
          <ul className="benefit-list">
            <li><b>01</b><span><strong>Choose your grade</strong><small>Primary 1 through Primary 6</small></span></li>
            <li><b>02</b><span><strong>Get both curricula</strong><small>English and Connect Plus for your grade</small></span></li>
            <li><b>03</b><span><strong>Learn and shine</strong><small>Track lessons and achievements</small></span></li>
          </ul>
        </div>

        <form className="account-form" onSubmit={handleSubmit}>
          <div className="form-title">
            <span className="mini-logo">MF</span>
            <div><p>Student registration</p><h2>New Account</h2></div>
          </div>

          <label htmlFor="fullName">Full Name</label>
          <input id="fullName" name="fullName" placeholder="Enter the student's full name" required />

          <label htmlFor="username">Username</label>
          <input id="username" name="username" placeholder="Choose a username" minLength={4} required />

          <label htmlFor="grade">Grade</label>
          <select id="grade" name="grade" defaultValue="" required>
            <option value="" disabled>Choose the student&apos;s grade</option>
            <option value="1">Primary 1</option>
            <option value="2">Primary 2</option>
            <option value="3">Primary 3</option>
            <option value="4">Primary 4</option>
            <option value="5">Primary 5</option>
            <option value="6">Primary 6</option>
          </select>
          <p className="field-help">The student automatically gets English and Connect Plus for this grade.</p>

          <div className="two-columns">
            <div><label htmlFor="password">Password</label><input id="password" name="password" type="password" placeholder="At least 8 characters" minLength={8} required /></div>
            <div><label htmlFor="confirmPassword">Confirm Password</label><input id="confirmPassword" name="confirmPassword" type="password" placeholder="Repeat password" minLength={8} required /></div>
          </div>

          <button className="primary-button" type="submit">Create My Account <span>→</span></button>
          {message && <p className="form-message" role="status">{message}</p>}
          <p className="form-switch">Already registered? <Link href="/login">Sign in here</Link></p>
        </form>
      </section>
    </InnerPageShell>
  );
}
