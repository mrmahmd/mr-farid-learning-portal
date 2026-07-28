"use client";

import Link from "next/link";
import { InnerPageShell } from "../components/InnerPageShell";
import { CurriculumCover } from "../components/CurriculumCover";
import { SubscriptionNotice } from "../components/SubscriptionNotice";
import { canOpenCurriculum, useStudentAccess } from "../lib/useStudentAccess";
import { canOpenGrade } from "../lib/useStudentAccess";

const grades = [1, 2, 3, 4, 5, 6];

export default function CurriculaPage() {
  const access = useStudentAccess();
  const hasActiveStage = access.signedIn && access.accessMode === "grade" && Boolean(access.grade);
  return (
    <InnerPageShell className="content-page curricula-page">
      <section className="curricula-card">
        <div className="curricula-heading">
          <p className="eyebrow"><span /> Choose your grade</p>
          <h1>Our Curricula</h1>
          <p>
            Every primary grade from Primary 1 to Primary 6 includes two
            dedicated learning pathways: English and Connect Plus. This page
            provides an overview of the curricula available across the portal.
            Students access their assigned curricula from their personal
            accounts after signing in.
          </p>
        </div>

        {!hasActiveStage && <aside className="curricula-access-notice" aria-label="Account required to open curricula">
          <div className="curricula-access-icon" aria-hidden="true">🔒</div>
          <div className="curricula-access-copy">
            <strong>Sign in or create an account to open the curricula</strong>
            <span>Your free student account gives you access to every available curriculum.</span>
          </div>
          <div className="curricula-access-actions">
            <Link className="curricula-signin-link" href="/login">Sign In</Link>
            <Link className="curricula-create-link" href="/register">Create Account</Link>
          </div>
        </aside>}
        {!hasActiveStage && <SubscriptionNotice />}
        <div className="subscription-banner" dir="rtl" aria-hidden="true">
          <span className="subscription-banner-lock" aria-hidden="true">🔒</span>
          <div><strong>هذا المحتوى متاح للمشتركين فقط</strong><span>لمعرفة طريقة وتفاصيل الاشتراك تواصل معي عبر واتساب: 00966552019074</span></div>
          <a href="https://wa.me/966552019074" target="_blank" rel="noreferrer" aria-label="التواصل عبر واتساب">واتساب ↗</a>
        </div>

        <div className="grade-grid stage-centered-grid">
          {(access.signedIn && access.accessMode === "grade" && access.grade ? [access.grade] : []).map((grade) => (
            <article className={`grade-card${canOpenGrade(grade, access) ? " grade-subscription-open" : " grade-subscription-locked"}`} key={grade}>
              <header>
                <span className="grade-number">P{grade}</span>
                <div>
                  <small>PRIMARY GRADE</small>
                  <h2>Primary {grade}</h2>
                </div>
              </header>

              <div className="curriculum-options">
                <div className="curriculum-option english-option">
                  <CurriculumCover type="english" grade={grade} />
                  <div className="curriculum-option-content">
                    {grade === 3 && <span className="new-curriculum-badge">NEW · RECENTLY ADDED</span>}
                    <strong>English Primary {grade}</strong>
                    <small>English Curriculum</small>
                    <div className="curriculum-terms" aria-label="Available terms">
                      <div className="curriculum-term"><strong>First Term</strong>{[1, 2, 3, 4, 5, 6].includes(grade) && (canOpenCurriculum(`english-primary-${grade}`, grade, access) ? <Link className="new-curriculum-entry" href={`/courses/english-primary-${grade}`}>Enter</Link> : <button className="curriculum-locked-entry" type="button" disabled>🔒 Locked</button>)}</div>
                      <div className="curriculum-term unavailable"><strong>Second Term</strong><span>Coming soon</span></div>
                    </div>
                  </div>
                </div>
                <div className="curriculum-option connect-option">
                  <CurriculumCover type="connect" grade={grade} />
                  <div className="curriculum-option-content">
                    <strong>Connect Plus Primary {grade}</strong>
                    <small>Connect Plus Curriculum</small>
                    <div className="term-badges connect-term-badges" aria-label="Available terms">
                      <span>First Term</span><span>Second Term</span>
                    </div>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>
    </InnerPageShell>
  );
}
