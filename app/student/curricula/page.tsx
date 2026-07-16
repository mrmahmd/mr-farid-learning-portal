import Link from "next/link";
import { InnerPageShell } from "../../components/InnerPageShell";

export default function StudentCurriculaPage() {
  return (
    <InnerPageShell className="student-curricula-page">
      <section className="student-curricula-card">
        <div className="student-welcome">
          <div>
            <p className="eyebrow"><span /> Student portal</p>
            <h1>Choose your curriculum</h1>
            <p>Your account belongs to Primary 1, so both curricula below are available to you.</p>
          </div>
          <span className="student-grade-badge"><small>YOUR GRADE</small>Primary 1</span>
        </div>

        <div className="student-curriculum-grid">
          <article className="student-curriculum english-student-card">
            <div className="curriculum-book-cover"><span>English</span><b>1</b><small>PRIMARY</small></div>
            <div className="student-curriculum-copy">
              <span className="availability-dot">AVAILABLE FOR YOU</span>
              <h2>English Primary 1</h2>
              <p>Open the units, lessons, activities, practice and assessments for your English curriculum.</p>
              <button type="button">Enter Curriculum <span>→</span></button>
            </div>
          </article>

          <article className="student-curriculum connect-student-card">
            <div className="curriculum-book-cover"><span>Connect</span><b>+</b><small>PRIMARY 1</small></div>
            <div className="student-curriculum-copy">
              <span className="availability-dot">AVAILABLE FOR YOU</span>
              <h2>Connect Plus Primary 1</h2>
              <p>Open the units, lessons, activities, practice and assessments for your Connect Plus curriculum.</p>
              <button type="button">Enter Curriculum <span>→</span></button>
            </div>
          </article>
        </div>

        <p className="student-access-note">
          After connecting Supabase, the grade and both curriculum names will load automatically from the student account.
          <Link href="/login"> Back to login</Link>
        </p>
      </section>
    </InnerPageShell>
  );
}
