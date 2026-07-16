"use client";

import { FormEvent, useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { portalAsset } from "../asset-path";
import {
  friendlyAuthError,
  getSupabaseBrowserClient,
  isValidUsername,
  usernameToStudentEmail,
} from "../lib/supabase";

type ResumeActivity = {
  courseTitle: string;
  detail: string;
  href: string;
};

const COURSE_DETAILS: Record<string, { title: string; slug: string }> = {
  "connect-plus-primary-4-first-term": {
    title: "Connect Plus Primary 4 – First Term",
    slug: "connect-plus-primary-4",
  },
  "english-primary-4-first-term": {
    title: "English Primary 4 – First Term",
    slug: "english-primary-4",
  },
};

function record(value: unknown): Record<string, unknown> {
  return value && typeof value === "object" ? (value as Record<string, unknown>) : {};
}

function unitLabel(value: unknown) {
  const match = String(value ?? "").match(/(\d+)/);
  return match ? `Unit ${match[1]}` : "Unit";
}

function lessonLabel(value: unknown, isZeroBased = false) {
  const match = String(value ?? "").match(/(\d+)/);
  if (!match) return "";
  const number = Number(match[1]) + (isZeroBased ? 1 : 0);
  return `Lesson ${number}`;
}

function pageLabel(value: unknown) {
  const labels: Record<string, string> = {
    overview: "Overview",
    vocabulary: "Vocabulary",
    language: "Language Lab",
    reading: "Reading",
    practice: "Practice",
  };
  return labels[String(value ?? "")] ?? "Learning page";
}

function describeLastActivity(appId: string, rawState: unknown): ResumeActivity | null {
  const course = COURSE_DETAILS[appId];
  if (!course) return null;
  const state = record(rawState);
  let detail = "";

  if (appId === "connect-plus-primary-4-first-term") {
    const question = record(state.lastQuestion);
    const page = record(state.lastPage);
    const target = Object.keys(question).length ? question : page;
    if (!Object.keys(target).length) return null;
    const parts = [unitLabel(target.module)];
    if (Boolean(target.boss)) {
      parts.push("Unit Question Bank");
    } else {
      const lesson = lessonLabel(target.lesson, true);
      if (lesson) parts.push(lesson);
    }
    if (Object.keys(question).length && Number.isFinite(Number(question.index))) {
      parts.push(`Practice question ${Number(question.index) + 1}`);
    } else {
      parts.push(pageLabel(target.tab));
    }
    detail = parts.join(" • ");
  }

  if (appId === "english-primary-4-first-term") {
    const route = record(state.lastRoute);
    if (!route.type || route.type === "dashboard") return null;
    const activityId = String(route.activityId ?? route.lessonId ?? "");
    const unit = unitLabel(activityId || route.unit);
    const parts = [unit];

    if (route.type === "unit") {
      parts.push("Unit overview");
    } else if (route.mode === "bank") {
      parts.push("Unit Question Bank");
    } else {
      const lesson = lessonLabel(activityId);
      if (lesson) parts.push(lesson);
      if (route.type === "quiz") {
        const quizProgress = record(state.quizProgress);
        const savedQuiz = record(quizProgress[`${String(route.mode)}:${activityId}`]);
        const question = Number(savedQuiz.index);
        parts.push(Number.isFinite(question) ? `Practice question ${question + 1}` : "Practice");
      } else {
        parts.push(pageLabel(route.tab));
      }
    }
    detail = parts.join(" • ");
  }

  return detail
    ? { courseTitle: course.title, detail, href: `${portalAsset(`/courses/${course.slug}/`)}?resume=1` }
    : null;
}

export function HomeLoginCard() {
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [resumeActivity, setResumeActivity] = useState<ResumeActivity | null>(null);
  const router = useRouter();

  useEffect(() => {
    const supabase = getSupabaseBrowserClient();
    let isActive = true;

    async function loadStudentSession() {
      const { data } = await supabase.auth.getSession();
      if (!isActive) return;
      setIsSignedIn(Boolean(data.session));
      if (!data.session) {
        setResumeActivity(null);
        return;
      }

      const { data: progressRows } = await supabase
        .from("course_progress")
        .select("app_id, state, updated_at")
        .order("updated_at", { ascending: false });

      if (!isActive) return;
      const latestActivity = (progressRows ?? [])
        .map((row) => describeLastActivity(String(row.app_id), row.state))
        .find((activity): activity is ResumeActivity => Boolean(activity));
      setResumeActivity(latestActivity ?? null);
    }

    void loadStudentSession();

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!isActive) return;
      setIsSignedIn(Boolean(session));
      if (!session) setResumeActivity(null);
      else void loadStudentSession();
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
    setResumeActivity(null);
    router.push("/student/curricula");
  }

  async function handleSignOut() {
    await getSupabaseBrowserClient().auth.signOut();
    setIsSignedIn(false);
    setResumeActivity(null);
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

        {resumeActivity ? (
          <div className="last-activity-card">
            <span>Last activity</span>
            <strong>{resumeActivity.courseTitle}</strong>
            <p>{resumeActivity.detail}</p>
            <a className="primary-button" href={resumeActivity.href}>
              Continue <span aria-hidden="true">→</span>
            </a>
          </div>
        ) : (
          <p className="returning-student-copy">
            Your session is saved. Choose a curriculum and start learning.
          </p>
        )}

        <Link className="secondary-button returning-curricula-link" href="/student/curricula">
          My Curricula
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
