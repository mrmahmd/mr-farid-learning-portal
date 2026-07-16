import { InnerPageShell } from "../components/InnerPageShell";

const grades = [1, 2, 3, 4, 5, 6];
const terms = ["First Term", "Second Term"];

export default function BookletsPage() {
  return (
    <InnerPageShell className="booklets-page">
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
          {grades.map((grade) => (
            <article className="booklet-grade-card" key={grade}>
              <header>
                <span className="grade-number">0{grade}</span>
                <div>
                  <small>PRIMARY GRADE</small>
                  <h2>Primary {grade}</h2>
                </div>
              </header>

              <div className="booklet-resources">
                <section className="booklet-resource english-booklet">
                  <span className="resource-icon" aria-hidden="true">EN</span>
                  <div>
                    <h3>English Primary {grade}</h3>
                    <p>Explanations and printable booklets</p>
                    <div className="booklet-term-options">
                      {terms.map((term) => (
                        <div className="booklet-term-option" key={term}>
                          <strong>{term}</strong>
                          <button type="button" disabled>Download link coming soon</button>
                        </div>
                      ))}
                    </div>
                  </div>
                </section>

                <section className="booklet-resource connect-booklet">
                  <span className="resource-icon" aria-hidden="true">C+</span>
                  <div>
                    <h3>Connect Plus Primary {grade}</h3>
                    <p>Explanations and printable booklets</p>
                    <div className="booklet-term-options">
                      {terms.map((term) => (
                        <div className="booklet-term-option" key={term}>
                          <strong>{term}</strong>
                          <button type="button" disabled>Download link coming soon</button>
                        </div>
                      ))}
                    </div>
                  </div>
                </section>
              </div>
            </article>
          ))}
        </div>

        <p className="booklets-note">
          Download buttons will become available as soon as each resource link is added.
        </p>
      </section>
    </InnerPageShell>
  );
}
