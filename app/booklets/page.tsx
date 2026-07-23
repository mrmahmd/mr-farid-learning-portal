"use client";

import { InnerPageShell } from "../components/InnerPageShell";
import { CurriculumCover } from "../components/CurriculumCover";
import { BookletAccessGate } from "../components/BookletAccessGate";
import { canOpenCurriculum, canOpenGrade, useStudentAccess } from "../lib/useStudentAccess";
import Link from "next/link";

const grades = [1, 2, 3, 4, 5, 6];
const terms = ["First Term", "Second Term"];

export default function BookletsPage() {
  const access = useStudentAccess();
  const visibleGrades = access.grade
    ? [access.grade, ...grades.filter((grade) => grade !== access.grade)]
    : grades;

  if (!access.loading && access.signedIn && access.grade === null) {
    return (
      <InnerPageShell className="booklets-page">
        <section className="glass-card standalone-form">
          <span className="mini-logo">MF</span>
          <h1>Choose your primary grade first</h1>
          <p dir="rtl">اختر مرحلتك الدراسية أولًا حتى تظهر لك البوكلتس الخاصة بمرحلتك.</p>
          <Link className="primary-button" href="/student/setup-grade">Choose My Grade · اختيار المرحلة</Link>
        </section>
      </InnerPageShell>
    );
  }

  return (
    <InnerPageShell className="booklets-page">
      <BookletAccessGate>
      <section className="booklets-card">
        <header className="booklets-heading">
          <p className="eyebrow"><span /> Study resources</p>
          <h1>Booklets &amp; Explanations</h1>
          <p>
            Choose a primary grade, then find the English and Connect Plus
            explanations and booklets prepared for that level.
          </p>
        </header>

        <div className="booklets-grid">
          {visibleGrades.map((grade) => {
            const gradeAvailable = canOpenGrade(grade, access);
            const englishAvailable = canOpenCurriculum(`english-primary-${grade}`, grade, access);
            const connectAvailable = canOpenCurriculum(`connect-plus-primary-${grade}`, grade, access);
            return (
            <article className={`booklet-grade-card${gradeAvailable ? " grade-accessible" : " grade-locked"}`} key={grade}>
              <header>
                <span className="grade-number">0{grade}</span>
                <div>
                  <small>PRIMARY GRADE</small>
                  <h2>Primary {grade}</h2>
                </div>
                {!gradeAvailable && <span className="grade-lock-badge">🔒 Locked</span>}
              </header>

              <div className="booklet-resources">
                <section className="booklet-resource english-booklet">
                  <CurriculumCover type="english" grade={grade} />
                  <div>
                    <h3>English Primary {grade}</h3>
                    <p>Explanations and printable booklets</p>
                    <div className="booklet-term-options">
                      {terms.map((term) => (
                        <div className="booklet-term-option" key={term}>
                          <strong>{term}</strong>
                          {englishAvailable && grade === 1 && term === "First Term" ? <a className="booklet-download-button" href="https://ia902800.us.archive.org/20/items/grade-1enlgish-1termbook/.Grade1enlgish-1termbook.pdf" target="_blank" rel="noreferrer">Download PDF ↗</a> : <button type="button" disabled>{englishAvailable ? "Soon" : "Locked"}</button>}
                        </div>
                      ))}
                    </div>
                  </div>
                </section>

                <section className="booklet-resource connect-booklet">
                  <CurriculumCover type="connect" grade={grade} />
                  <div>
                    <h3>Connect Plus Primary {grade}</h3>
                    <p>Explanations and printable booklets</p>
                    <div className="booklet-term-options">
                      {terms.map((term) => (
                        <div className="booklet-term-option" key={term}>
                          <strong>{term}</strong>
                          <button type="button" disabled>{connectAvailable ? "Soon" : "Locked"}</button>
                        </div>
                      ))}
                    </div>
                  </div>
                </section>
              </div>
            </article>
          )})}
        </div>

        <p className="booklets-note">
          Download buttons will become available as soon as each resource link is added.
        </p>
      </section>
      </BookletAccessGate>
    </InnerPageShell>
  );
}
