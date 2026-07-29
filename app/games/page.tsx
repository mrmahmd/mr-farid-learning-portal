"use client";

import Link from "next/link";
import { InnerPageShell } from "../components/InnerPageShell";
import { portalAsset } from "../asset-path";
import { canOpenCurriculum, canOpenGrade, useStudentAccess } from "../lib/useStudentAccess";
import { SubscriptionNotice } from "../components/SubscriptionNotice";

const grades = [1, 2, 3, 4, 5, 6];
const englishGameWorlds: Record<number, string> = {
  1: "/games/english-primary-1-game-world/",
  3: "/games/english-primary-3-games/",
  4: "/games/english-primary-4-games/",
};

export default function GamesPage() {
  const access = useStudentAccess();

  if (!access.loading && !access.signedIn) {
    return (
      <InnerPageShell className="content-page games-page">
        <section className="glass-card standalone-form">
          <span className="mini-logo">MF</span>
          <h1>Student sign in required</h1>
          <p>Educational games are available to subscribers only.</p>
          <SubscriptionNotice />
        </section>
      </InnerPageShell>
    );
  }

  if (!access.loading && access.mustChangePassword) {
    return (
      <InnerPageShell className="content-page games-page">
        <section className="glass-card standalone-form">
          <span className="mini-logo">MF</span>
          <h1>Create your private password first</h1>
          <p>For your account security, choose a new personal password before opening the games.</p>
          <Link className="primary-button" href="/student/change-password">Create New Password</Link>
        </section>
      </InnerPageShell>
    );
  }

  if (!access.loading && access.signedIn && access.grade === null) {
    return (
      <InnerPageShell className="content-page games-page">
        <section className="glass-card standalone-form">
          <span className="mini-logo">MF</span>
          <h1>Choose your primary grade first</h1>
          <p dir="rtl">اختر مرحلتك الدراسية أولًا حتى تظهر لك الألعاب الخاصة بمرحلتك.</p>
          <Link className="primary-button" href="/student/setup-grade">Choose My Grade · اختيار المرحلة</Link>
        </section>
      </InnerPageShell>
    );
  }

  const visibleGrades = access.accessMode === "all" ? grades : (access.accessMode === "grade" || access.accessMode === "sample") && access.grade ? [access.grade] : [];
  return (
    <InnerPageShell className="content-page games-page">
      <section className="games-card">
        {access.accessMode !== "grade" && access.accessMode !== "all" && <SubscriptionNotice showSignIn={!access.signedIn} />}
        <div className="games-heading">
          <p className="eyebrow"><span /> Learn, play, remember</p>
          <h1>Educational Games</h1>
          <p>Your grade appears first. All other primary grades remain visible as locked learning levels.</p>
        </div>

        <div className="games-grid">
          {visibleGrades.map((grade) => {
            const gradeAvailable = canOpenGrade(grade, access);
            const englishAvailable = canOpenCurriculum(`english-primary-${grade}`, grade, access);
            const connectAvailable = canOpenCurriculum(`connect-plus-primary-${grade}`, grade, access);
            const englishGames = englishGameWorlds[grade];
            return (
              <article className={`game-grade-card${gradeAvailable ? " grade-accessible" : " grade-locked"}`} key={grade}>
                <header>
                  <span className="game-grade-number">P{grade}</span>
                  <div><small>{gradeAvailable ? "YOUR GRADE" : "LOCKED GRADE"}</small><h2>Primary {grade}</h2></div>
                  {!gradeAvailable && <span className="grade-lock-badge">🔒 Locked</span>}
                </header>
                <div className="game-options">
                  <div className="game-option english-game-option">
                    <span className="game-icon" aria-hidden="true">★</span>
                    <div>
                      <h3>English Primary {grade}</h3>
                      <p>Vocabulary, grammar and lesson games</p>
                      {englishAvailable && englishGames
                        ? <a className="game-launch" href={`${portalAsset(englishGames)}${access.accessMode === "sample" ? "?sample=1" : ""}`}>{access.accessMode === "sample" ? `Open Primary ${grade} Sample` : `Open English Primary ${grade} Games`}</a>
                        : <button type="button" disabled>{englishAvailable ? "Coming Soon" : "Locked"}</button>}
                    </div>
                  </div>
                  <div className="game-option connect-game-option">
                    <span className="game-icon" aria-hidden="true">✦</span>
                    <div>
                      <h3>Connect Plus Primary {grade}</h3>
                      <p>Interactive practice for Connect Plus lessons</p>
                      <button type="button" disabled>{connectAvailable ? "Coming Soon" : "Locked"}</button>
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </section>
    </InnerPageShell>
  );
}
