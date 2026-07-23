"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import type { Curriculum } from "../data/curricula";
import { portalAsset } from "../asset-path";
import { getSupabaseBrowserClient } from "../lib/supabase";

export function AuthenticatedCourse({ curriculum }: { curriculum: Curriculum }) {
  const [isReady, setIsReady] = useState(false);
  const [studentName, setStudentName] = useState("Student");
  const [sessionBridge, setSessionBridge] = useState<{ accessToken: string; refreshToken: string; userId: string } | null>(null);
  const [shouldResume, setShouldResume] = useState(false);
  const [deniedReason, setDeniedReason] = useState("");
  const courseFrame = useRef<HTMLIFrameElement>(null);
  const router = useRouter();

  useEffect(() => {
    setShouldResume(new URLSearchParams(window.location.search).get("resume") === "1");
  }, []);

  useEffect(() => {
    let isActive = true;

    async function verifySession() {
      const { data } = await getSupabaseBrowserClient().auth.getSession();

      if (!data.session) {
        router.replace("/login");
        return;
      }

      const { data: access } = await getSupabaseBrowserClient()
        .from("student_access")
        .select("is_suspended, grade, access_mode, allowed_curricula, must_change_password")
        .eq("user_id", data.session.user.id)
        .maybeSingle();

      if (access?.is_suspended) {
        await getSupabaseBrowserClient().auth.signOut();
        if (isActive) setDeniedReason("Your account is suspended. Please contact Mr.Farid.");
        return;
      }
      if (access?.must_change_password) {
        router.replace("/student/change-password");
        return;
      }

      const assignedGrade = typeof access?.grade === "number" ? access.grade : null;
      const candidateMode = access?.access_mode;
      const accessMode = typeof candidateMode === "string"
        && ["grade", "custom", "all", "none"].includes(candidateMode)
        ? candidateMode
        : "grade";
      const extraCurricula = Array.isArray(access?.allowed_curricula) ? access.allowed_curricula : [];
      if (assignedGrade === null) {
        router.replace("/student/setup-grade");
        return;
      }
      const curriculumAllowed =
        accessMode === "all"
        || (accessMode === "grade" && assignedGrade === curriculum.grade)
        || (accessMode !== "none" && extraCurricula.includes(curriculum.slug));
      if (!curriculumAllowed) {
        if (isActive) setDeniedReason("This curriculum is locked for your account. Please contact Mr.Farid if you need access.");
        return;
      }

      if (isActive) {
        setStudentName(String(data.session.user.user_metadata?.username ?? data.session.user.user_metadata?.full_name ?? "Student"));
        setSessionBridge({
          accessToken: data.session.access_token,
          refreshToken: data.session.refresh_token,
          userId: data.session.user.id,
        });
        setIsReady(true);
      }
    }

    void verifySession();

    return () => {
      isActive = false;
    };
  }, [curriculum.slug, router]);

  useEffect(() => {
    function sendSession(event?: MessageEvent) {
      if (!sessionBridge || !courseFrame.current?.contentWindow) return;
      if (event && (event.origin !== window.location.origin || event.data?.type !== "mrfarid-progress-session-request")) return;
      courseFrame.current.contentWindow.postMessage(
        {
          type: "mrfarid-progress-session",
          accessToken: sessionBridge.accessToken,
          refreshToken: sessionBridge.refreshToken,
        },
        window.location.origin,
      );
    }

    const listener = (event: MessageEvent) => sendSession(event);
    window.addEventListener("message", listener);
    return () => window.removeEventListener("message", listener);
  }, [sessionBridge]);

  if (deniedReason) {
    return (
      <section className="course-app-card student-loading-card">
        <span className="mini-logo">MF</span>
        <h1>Curriculum access unavailable</h1>
        <p className="form-message error">{deniedReason}</p>
        <Link className="primary-button" href="/student/curricula">Choose Another Curriculum</Link>
      </section>
    );
  }

  if (!isReady || !sessionBridge) {
    return (
      <section className="course-app-card student-loading-card">
        <span className="mini-logo">MF</span>
        <h1>Opening your curriculum...</h1>
        <p className="form-message" role="status">Checking your student account.</p>
      </section>
    );
  }

  const embeddedApps: Record<string, string> = {
    "english-primary-1": "/course-apps/english-primary-1/index.html",
    "english-primary-2": "/course-apps/english-primary-2/index.html",
    "english-primary-3": "/course-apps/english-primary-3/index.html",
    "connect-plus-primary-4": "/course-apps/connect-plus-primary-4/index.html",
    "english-primary-4": "/course-apps/english-primary-4/index.html",
  };

  const embeddedApp = embeddedApps[curriculum.slug];

  if (embeddedApp) {
    const cacheVersion = curriculum.slug === "english-primary-1" ? "&v=20260718-6" : curriculum.slug === "english-primary-2" ? "&v=20260724-1" : curriculum.slug === "english-primary-3" ? "&v=20260719-2" : curriculum.slug === "english-primary-4" ? "&v=20260717-12" : curriculum.slug === "connect-plus-primary-4" ? "&v=20260717-10" : "";
    const appUrl = `${portalAsset(embeddedApp)}?student=${encodeURIComponent(studentName)}&studentId=${encodeURIComponent(sessionBridge.userId)}${cacheVersion}${shouldResume ? "&resume=1" : ""}`;

    return (
      <section className="integrated-course-shell" aria-label={`${curriculum.title} application`}>
        <iframe
          ref={courseFrame}
          className="integrated-course-frame"
          src={appUrl}
          title={`${curriculum.title} interactive application`}
          allow="autoplay"
          onLoad={() => {
            if (!sessionBridge || !courseFrame.current?.contentWindow) return;
            courseFrame.current.contentWindow.postMessage(
              {
                type: "mrfarid-progress-session",
                accessToken: sessionBridge.accessToken,
                refreshToken: sessionBridge.refreshToken,
              },
              window.location.origin,
            );
            courseFrame.current.contentWindow.postMessage(
              { type: "mrfarid-course-entry", destination: shouldResume ? "resume" : "dashboard" },
              window.location.origin,
            );
            courseFrame.current.contentWindow.postMessage(
              { type: "PLATFORM_STUDENT", student: { studentId: sessionBridge.userId, studentName } },
              window.location.origin,
            );
          }}
        />
      </section>
    );
  }

  return (
    <section className={`course-app-card ${curriculum.type}-course-app`}>
      <div className="course-app-header">
        <div className="course-app-cover">
          <span>{curriculum.shortTitle}</span>
          <b>{curriculum.type === "english" ? curriculum.grade : "+"}</b>
          <small>PRIMARY {curriculum.grade}</small>
        </div>

        <div className="course-app-heading">
          <p className="eyebrow"><span /> Curriculum application</p>
          <h1>{curriculum.title}</h1>
          <p>{curriculum.description}</p>
        </div>
      </div>

      <div className="course-placeholder">
        <span className="mini-logo">MF</span>
        <h2>Your curriculum space is ready</h2>
        <p>
          The book content, units, lessons, exercises and games will be built here when this curriculum book is provided.
        </p>
      </div>

      <nav className="course-return-actions" aria-label="Curriculum navigation">
        <Link className="primary-button" href="/student/curricula">Choose Another Curriculum <span>↩</span></Link>
        <Link className="secondary-button" href="/">Portal Home</Link>
      </nav>
    </section>
  );
}
