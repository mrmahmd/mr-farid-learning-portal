"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { InnerPageShell } from "../../components/InnerPageShell";
import { CurriculumIcon } from "../../components/CurriculumIcon";
import { SubscriptionNotice } from "../../components/SubscriptionNotice";
import { portalAsset } from "../../asset-path";
import { curricula } from "../../data/curricula";
import {
  getSupabaseBrowserClient,
  type StudentProfile,
} from "../../lib/supabase";
import { canOpenCurriculum, isSampleAllAccess, useStudentAccess } from "../../lib/useStudentAccess";

const grades = [1, 2, 3, 4, 5, 6];

export default function StudentCurriculaPage() {
  const [profile, setProfile] = useState<StudentProfile | null>(null);
  const [status, setStatus] = useState("Checking your account...");
  const [hasError, setHasError] = useState(false);
  const router = useRouter();
  const access = useStudentAccess();
  const visibleGrades = access.accessMode === "all" || isSampleAllAccess(access) ? grades : (access.accessMode === "grade" || access.accessMode === "sample") && access.grade ? [access.grade] : [];

  useEffect(() => {
    const supabase = getSupabaseBrowserClient();
    let isActive = true;

    async function loadProfile() {
      const { data: sessionData } = await supabase.auth.getSession();
      const session = sessionData.session;

      if (!session) {
        router.replace("/login");
        return;
      }

      const { data, error } = await supabase
        .from("profiles")
        .select("id, full_name, username, role, created_at")
        .eq("id", session.user.id)
        .single<StudentProfile>();

      if (!isActive) return;

      if (error || !data) {
        setHasError(true);
        setStatus("We could not load your student profile. Please contact Mr.Farid.");
        return;
      }

      setProfile(data);
      setStatus("");
    }

    void loadProfile();

    const { data: authListener } = supabase.auth.onAuthStateChange((event) => {
      if (event === "SIGNED_OUT") router.replace("/login");
    });

    return () => {
      isActive = false;
      authListener.subscription.unsubscribe();
    };
  }, [router]);

  useEffect(() => {
    if (!access.loading && access.signedIn && access.mustChangePassword) {
      router.replace("/student/change-password");
      return;
    }
    if (!access.loading && access.signedIn && access.grade === null) {
      router.replace("/student/setup-grade");
    }
  }, [access.grade, access.loading, access.mustChangePassword, access.signedIn, router]);

  async function handleSignOut() {
    setStatus("Signing out...");
    await getSupabaseBrowserClient().auth.signOut();
    router.replace("/");
  }

  if (!profile || access.loading || access.mustChangePassword || access.grade === null) {
    return (
      <InnerPageShell className="student-curricula-page">
        <section className="student-curricula-card student-loading-card">
          <span className="mini-logo">MF</span>
          <h1>{hasError ? "Account help needed" : "Welcome to your portal"}</h1>
          <p className={`form-message${hasError ? " error" : ""}`} role="status">{status}</p>
          {hasError && (
            <a className="primary-button inline-action" href="https://wa.me/966552019074" target="_blank" rel="noreferrer">
              Contact Mr.Farid
            </a>
          )}
        </section>
      </InnerPageShell>
    );
  }

  return (
    <InnerPageShell className="student-curricula-page">
      <section className="student-curricula-card">
        <div className="student-welcome">
          <div>
            <p className="eyebrow"><span /> Student portal</p>
            <h1>{access.grade ? `Your Primary ${access.grade} learning space` : "Choose your curriculum"}</h1>
            <p>Welcome, {profile.full_name}. {access.grade ? "Your grade appears first. All other primary grades remain visible as locked levels." : "Your account remains active until Mr.Farid assigns your grade."}</p>
          </div>
          <div className="student-welcome-actions">
            <span className="student-account-badge"><small>STUDENT</small>@{profile.username}</span>
            <button className="sign-out-button" type="button" onClick={handleSignOut}>Sign Out</button>
          </div>
        </div>
        {access.accessMode !== "grade" && access.accessMode !== "all" && <p className="student-access-note" dir="rtl">محتوى مرحلتك مغلق حاليًا. لمعرفة تفاصيل الاشتراك تواصل مع مستر فريد عبر واتساب: 00966552019074.</p>}

        {access.accessMode !== "grade" && access.accessMode !== "all" && <SubscriptionNotice />}
        <div className="student-grade-grid">
          {visibleGrades.map((grade) => {
            const gradeAvailable = curricula.filter((curriculum) => curriculum.grade === grade).some((curriculum) => canOpenCurriculum(curriculum.slug, grade, access));
            return (
            <article className={`student-grade-card${gradeAvailable ? " grade-accessible" : " grade-locked"}`} key={grade}>
              <div className="student-grade-card-hero">
                <img src={portalAsset("/curriculum-covers/english-cover.png")} alt={`Primary ${grade} learning`} />
                <div><span>PRIMARY STAGE</span><strong>Primary {grade}</strong></div>
              </div>
              <header>
                <span className="grade-number">{grade}</span>
                <div>
                  <small>{gradeAvailable ? "YOUR LEARNING COURSES" : "LOCKED GRADE"}</small>
                  <h2>Primary {grade}</h2>
                </div>
                {!gradeAvailable && <span className="grade-lock-badge">🔒 Locked</span>}
              </header>

                <div className="student-course-options">
                  {curricula.filter((curriculum) => curriculum.grade === grade).map((curriculum) => (
                    <section className={`student-course-group ${curriculum.type}-course-group${canOpenCurriculum(curriculum.slug, grade, access) ? "" : " course-locked"}`} key={curriculum.slug}>
                      <div className="student-course-group-title">
                        <CurriculumIcon type={curriculum.type} grade={grade} compact />
                        <strong>{curriculum.title}</strong>
                      </div>
                      <div className="term-entry-options">
                        {canOpenCurriculum(curriculum.slug, grade, access) ? <Link className="term-entry first-term-entry" href={`/courses/${curriculum.slug}`}>
                          <span>First Term</span><small>{access.accessMode === "sample" ? "Open sample →" : "Open →"}</small>
                        </Link> : <span className="term-entry first-term-entry locked-entry" aria-disabled="true"><span>First Term</span><small>🔒 Locked</small></span>}
                        <span className="term-entry second-term-entry" aria-label="Second Term will be available soon">
                          <span>Second Term</span><small>Coming soon</small>
                        </span>
                      </div>
                    </section>
                  ))}
                </div>
            </article>
          )})}
        </div>

        <p className="student-access-note">
          Your assigned grade opens automatically. Mr.Farid can activate an additional curriculum when needed.
        </p>
      </section>
    </InnerPageShell>
  );
}
