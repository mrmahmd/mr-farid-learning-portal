"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { InnerPageShell } from "../components/InnerPageShell";

export default function LoginPage() {
  const [message, setMessage] = useState("");
  const router = useRouter();

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setMessage("Opening the curricula available for your grade...");
    window.setTimeout(() => router.push("/student/curricula"), 350);
  }

  return (
    <InnerPageShell className="centered-page">
      <form className="glass-card standalone-form" onSubmit={handleSubmit}>
        <div className="form-title centered-title">
          <span className="mini-logo">MF</span>
          <div><p>Welcome back</p><h1>Student Login</h1></div>
        </div>
        <label htmlFor="loginUsername">Username</label>
        <input id="loginUsername" name="username" placeholder="Enter your username" required />
        <label htmlFor="loginPassword">Password</label>
        <input id="loginPassword" name="password" type="password" placeholder="Enter your password" required />
        <button className="primary-button" type="submit">Enter &amp; View My Curricula <span>→</span></button>
        {message && <p className="form-message" role="status">{message}</p>}
        <p className="form-switch">New student? <Link href="/register">Create an account</Link></p>
      </form>
    </InnerPageShell>
  );
}
