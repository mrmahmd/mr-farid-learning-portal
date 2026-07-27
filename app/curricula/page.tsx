import Link from "next/link";
import { InnerPageShell } from "../components/InnerPageShell";
import { CurriculumCover } from "../components/CurriculumCover";

const grades = [1, 2, 3, 4, 5, 6];

export default function CurriculaPage() {
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

        <aside className="curricula-access-notice" aria-label="Account required to open curricula">
          <div className="curricula-access-icon" aria-hidden="true">🔒</div>
          <div className="curricula-access-copy">
            <strong>Sign in or create an account to open the curricula</strong>
            <span>Your free student account gives you access to every available curriculum.</span>
          </div>
          <div className="curricula-access-actions">
            <Link className="curricula-signin-link" href="/login">Sign In</Link>
            <Link className="curricula-create-link" href="/register">Create Account</Link>
          </div>
        </aside>

        <div className="grade-grid">
          {grades.map((grade) => (
            <article className="grade-card" key={grade}>
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
                    <div className="term-badges" aria-label="Available terms">
                      <span>First Term</span><span>Second Term</span>
                    </div>
                    {grade === 1 && <Link className="new-curriculum-entry" href="/courses/english-primary-1">Enter English Primary 1</Link>}
                    {grade === 2 && <Link className="new-curriculum-entry" href="/courses/english-primary-2">Enter English Primary 2</Link>}
                    {grade === 3 && <Link className="new-curriculum-entry" href="/courses/english-primary-3">Enter English Primary 3</Link>}
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
