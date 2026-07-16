import { InnerPageShell } from "../components/InnerPageShell";

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
                  <span className="book-icon">E</span>
                  <div>
                    <strong>English Primary {grade}</strong>
                    <small>English Curriculum</small>
                    <div className="term-badges" aria-label="Available terms">
                      <span>First Term</span><span>Second Term</span>
                    </div>
                  </div>
                </div>
                <div className="curriculum-option connect-option">
                  <span className="book-icon">C+</span>
                  <div>
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
