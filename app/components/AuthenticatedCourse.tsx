"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import type { Curriculum } from "../data/curricula";
import { portalAsset } from "../asset-path";
import { getSupabaseBrowserClient } from "../lib/supabase";

export function AuthenticatedCourse({ curriculum }: { curriculum: Curriculum }) {
  const [isReady, setIsReady] = useState(false);
  const [studentName, setStudentName] = useState("Student");
  const router = useRouter();

  useEffect(() => {
    let isActive = true;

    async function verifySession() {
      const { data } = await getSupabaseBrowserClient().auth.getSession();

      if (!data.session) {
        router.replace("/login");
        return;
      }

      if (isActive) {
        setStudentName(String(data.session.user.user_metadata?.full_name ?? "Student"));
        setIsReady(true);
      }
    }

    void verifySession();

    return () => {
      isActive = false;
    };
  }, [router]);

  if (!isReady) {
    return (
      <section className="course-app-card student-loading-card">
        <span className="mini-logo">MF</span>
        <h1>Opening your curriculum...</h1>
        <p className="form-message" role="status">Checking your student account.</p>
      </section>
    );
  }

  if (curriculum.slug === "connect-plus-primary-4") {
    const appUrl = `${portalAsset("/course-apps/connect-plus-primary-4/index.html")}?student=${encodeURIComponent(studentName)}`;

    return (
      <section className="integrated-course-shell" aria-label={`${curriculum.title} application`}>
        <iframe
          className="integrated-course-frame"
          src={appUrl}
          title={`${curriculum.title} interactive application`}
          allow="autoplay"
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
