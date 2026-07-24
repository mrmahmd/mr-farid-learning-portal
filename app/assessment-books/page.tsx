import Link from "next/link";
import { InnerPageShell } from "../components/InnerPageShell";
import { CurriculumCover } from "../components/CurriculumCover";
import { portalAsset } from "../asset-path";

const grades = [1, 2, 3, 4, 5, 6];

export default function AssessmentBooksPage() {
  return (
    <InnerPageShell className="content-page curricula-page assessment-books-page">
      <section className="curricula-card">
        <div className="curricula-heading">
          <p className="eyebrow"><span /> Assessment resources</p>
          <h1>Assessment Books</h1>
          <p>Explore interactive assessment workbooks organized by primary grade. The available book opens directly in your browser and does not require a student account at this stage.</p>
        </div>
        <div className="grade-grid">
          {grades.map((grade) => {
            const available = grade === 4;
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
                        <div className="curriculum-term"><strong>First Term</strong>{available ? <Link className="new-curriculum-entry" href={portalAsset("/assessment-books/english-primary-4/")}>Open Book</Link> : <span>Coming soon</span>}</div>
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
