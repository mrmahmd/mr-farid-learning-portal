"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { InnerPageShell } from "../components/InnerPageShell";
import { CurriculumCover } from "../components/CurriculumCover";
import { portalAsset } from "../asset-path";
import { getSupabaseBrowserClient } from "../lib/supabase";
import { SubscriptionNotice } from "../components/SubscriptionNotice";

const grades = [1, 2, 3, 4, 5, 6];

export default function AssessmentBooksPage() {
  const [access, setAccess] = useState<{ checked: boolean; session: boolean; allowed: boolean; sample: boolean; grade?: number | null; mode?: string; curricula: string[]; userId?: string; studentName?: string }>({ checked: false, session: false, allowed: false, sample: false, curricula: [] });

  useEffect(() => {
    let active = true;
    async function loadAccess() {
      const supabase = getSupabaseBrowserClient();
      const { data: sessionData } = await supabase.auth.getSession();
      if (!sessionData.session) {
        if (active) setAccess({ checked: true, session: false, allowed: false, sample: false, curricula: [] });
        return;
      }
      const { data: row } = await supabase
        .from("student_access")
        .select("is_suspended, grade, access_mode, allowed_curricula, booklet_access")
        .eq("user_id", sessionData.session.user.id)
        .maybeSingle();
      const curricula = Array.isArray(row?.allowed_curricula) ? row.allowed_curricula.filter((value: unknown): value is string => typeof value === "string") : [];
      const mode = typeof row?.access_mode === "string" ? row.access_mode : "none";
      const sample = Boolean(row && !row.is_suspended && mode === "sample" && row.grade);
      const allowed = Boolean(row && !row.is_suspended && ["grade", "all"].includes(mode));
      if (active) setAccess({ checked: true, session: true, allowed, sample, grade: row?.grade ?? null, mode, curricula, userId: sessionData.session.user.id, studentName: sessionData.session.user.user_metadata?.full_name ?? "Star Learner" });
    }
    void loadAccess();
    return () => { active = false; };
  }, []);

  const canOpen = (grade: number) => {
    if (!access.checked || !access.session) return false;
    return access.mode === "all" || ((access.mode === "grade" || access.mode === "sample") && access.grade === grade);
  };

  const bookHref = (grade: number) => {
    const base = portalAsset(`/assessment-books/english-primary-${grade}/`);
    if (!access.userId) return base;
    const query = new URLSearchParams({ studentId: access.userId, studentName: access.studentName ?? "Star Learner", className: `Primary ${grade}` });
    if (access.sample && access.grade === grade) query.set("sample", "1");
    return `${base}?${query.toString()}`;
  };

  return (
    <InnerPageShell className="content-page curricula-page assessment-books-page">
      <section className="curricula-card">
        <div className="curricula-heading">
          <p className="eyebrow"><span /> Assessment resources</p>
          <h1>Assessment Books</h1>
            <p>Explore interactive assessment workbooks organized by primary grade. Books open according to the learning stage and access assigned to the student account.</p>
            {!access.session && <p className="assessment-access-note">Sign in to open the assessment book assigned to your stage.</p>}
        </div>
        {!access.allowed && <SubscriptionNotice showSignIn={!access.session} />}
        <div className="grade-grid">
          {((access.allowed || access.sample) ? (access.mode === "all" ? grades : access.grade ? [access.grade] : []) : []).map((grade) => {
            const available = grade === 1 || grade === 2 || grade === 4;
            const open = available && canOpen(grade);
            const connectAvailable = false;
            return (
              <article className={`grade-card${available ? " grade-accessible" : " grade-locked"}`} key={grade}>
                <div className="grade-card-hero"><img src={portalAsset("/curriculum-covers/english-cover.png")} alt={`Primary ${grade} assessment`} /><div className="grade-card-hero-overlay" /><div className="grade-card-hero-label"><span>ASSESSMENT BOOKS</span><strong>Primary {grade}</strong></div></div>
                <header><span className="grade-number">P{grade}</span><div><small>PRIMARY GRADE</small><h2>Primary {grade}</h2></div>{available && <span className="new-curriculum-badge">NEW</span>}</header>
                <div className="curriculum-options">
                  <div className="curriculum-option english-option">
                    <CurriculumCover type="english" grade={grade} />
                    <div className="curriculum-option-content">
                      <strong>English Primary {grade}</strong><small>Interactive assessment workbook</small>
                      <div className="curriculum-terms">
                        <div className="curriculum-term"><strong>First Term</strong>{open ? <Link className="new-curriculum-entry" href={bookHref(grade)}>{access.sample ? "Open Sample" : "Open Book"}</Link> : available ? <span className="locked-entry">Locked</span> : <span>Coming soon</span>}</div>
                        <div className="curriculum-term unavailable"><strong>Second Term</strong><span>Coming soon</span></div>
                      </div>
                    </div>
                  </div>
                  {connectAvailable && <div className="curriculum-option connect-option">
                    <CurriculumCover type="connect" grade={grade} />
                    <div className="curriculum-option-content">
                      <strong>Connect Plus Primary {grade}</strong><small>Interactive activity book</small>
                      <div className="curriculum-terms">
                        <div className="curriculum-term"><strong>First Term</strong>{connectAvailable ? <Link className="new-curriculum-entry" href={portalAsset("/assessment-books/connect-plus-primary-4/")}>Open Book</Link> : <span>Coming soon</span>}</div>
                        <div className="curriculum-term unavailable"><strong>Second Term</strong><span>Coming soon</span></div>
                      </div>
                    </div>
                  </div>}
                </div>
              </article>
            );
          })}
        </div>
      </section>
    </InnerPageShell>
  );
}
