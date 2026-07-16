"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { InnerPageShell } from "../../components/InnerPageShell";
import { CurriculumIcon } from "../../components/CurriculumIcon";
import { curricula } from "../../data/curricula";
import {
  getSupabaseBrowserClient,
  type StudentProfile,
} from "../../lib/supabase";

const grades = [1, 2, 3, 4, 5, 6];

export default function StudentCurriculaPage() {
  const [profile, setProfile] = useState<StudentProfile | null>(null);
  const [status, setStatus] = useState("Checking your account...");
  const [hasError, setHasError] = useState(false);
  const router = useRouter();

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

  async function handleSignOut() {
    setStatus("Signing out...");
    await getSupabaseBrowserClient().auth.signOut();
    router.replace("/");
  }

  if (!profile) {
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
            <h1>Choose any curriculum</h1>
            <p>Welcome, {profile.full_name}. Your account can open every curriculum below.</p>
          </div>
          <div className="student-welcome-actions">
            <span className="student-account-badge"><small>STUDENT</small>@{profile.username}</span>
            <button className="sign-out-button" type="button" onClick={handleSignOut}>Sign Out</button>
          </div>
        </div>

        <div className="student-grade-grid">
          {grades.map((grade) => (
            <article className="student-grade-card" key={grade}>
              <header>
                <span className="grade-number">{grade}</span>
                <div>
                  <small>CHOOSE YOUR COURSE</small>
                  <h2>Primary {grade}</h2>
                </div>
              </header>

                <div className="student-course-options">
                  {curricula.filter((curriculum) => curriculum.grade === grade).map((curriculum) => (
                    <section className={`student-course-group ${curriculum.type}-course-group`} key={curriculum.slug}>
                      <div className="student-course-group-title">
                        <CurriculumIcon type={curriculum.type} grade={grade} compact />
                        <strong>{curriculum.title}</strong>
                      </div>
                      <div className="term-entry-options">
                        <Link className="term-entry first-term-entry" href={`/courses/${curriculum.slug}`}>
                          <span>First Term</span><small>Open →</small>
                        </Link>
                        <span className="term-entry second-term-entry" aria-label="Second Term will be available soon">
                          <span>Second Term</span><small>Coming soon</small>
                        </span>
                      </div>
                    </section>
                  ))}
                </div>
            </article>
          ))}
        </div>

        <p className="student-access-note">
          You can return to this page at any time and choose a different curriculum.
        </p>
      </section>
    </InnerPageShell>
  );
}
