"use client";

import Link from "next/link";
import { InnerPageShell } from "../components/InnerPageShell";
import { portalAsset } from "../asset-path";
import { canOpenGrade, useStudentAccess } from "../lib/useStudentAccess";

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
          <p>Sign in to open the educational games for your primary grade.</p>
          <Link className="primary-button" href="/login">Sign In</Link>
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

  const visibleGrades = access.grade ? grades.filter((grade) => grade >= access.grade!) : grades;
  return (
    <InnerPageShell className="content-page games-page">
      <section className="games-card">
        <div className="games-heading">
          <p className="eyebrow"><span /> Learn, play, remember</p>
          <h1>Educational Games</h1>
          <p>Your grade games are available now. Higher grades remain visible as locked learning levels.</p>
        </div>

        <div className="games-grid">
          {visibleGrades.map((grade) => {
            const gradeAvailable = canOpenGrade(grade, access);
            const englishGames = englishGameWorlds[grade];
            return (
              <article className={`game-grade-card${gradeAvailable ? " grade-accessible" : " grade-locked"}`} key={grade}>
                <header>
                  <span className="game-grade-number">P{grade}</span>
                  <div><small>{gradeAvailable ? "YOUR GRADE" : "FUTURE GRADE"}</small><h2>Primary {grade}</h2></div>
                  {!gradeAvailable && <span className="grade-lock-badge">🔒 Locked</span>}
                </header>
                <div className="game-options">
                  <div className="game-option english-game-option">
                    <span className="game-icon" aria-hidden="true">★</span>
                    <div>
                      <h3>English Primary {grade}</h3>
                      <p>Vocabulary, grammar and lesson games</p>
                      {gradeAvailable && englishGames
                        ? <a className="game-launch" href={portalAsset(englishGames)}>Open English Primary {grade} Games</a>
                        : <button type="button" disabled>{gradeAvailable ? "Coming Soon" : "Locked"}</button>}
                    </div>
                  </div>
                  <div className="game-option connect-game-option">
                    <span className="game-icon" aria-hidden="true">✦</span>
                    <div>
                      <h3>Connect Plus Primary {grade}</h3>
                      <p>Interactive practice for Connect Plus lessons</p>
                      <button type="button" disabled>{gradeAvailable ? "Coming Soon" : "Locked"}</button>
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
