import { InnerPageShell } from "../components/InnerPageShell";
import { portalAsset } from "../asset-path";

const grades = [1, 2, 3, 4, 5, 6];

export default function GamesPage() {
  return (
    <InnerPageShell className="content-page games-page">
      <section className="games-card">
        <div className="games-heading">
          <p className="eyebrow"><span /> Learn, play, remember</p>
          <h1>Educational Games</h1>
          <p>
            Enjoy short, engaging learning games arranged by primary grade and
            curriculum. Choose your class first, then select English or Connect
            Plus to find the activities for your lessons.
          </p>
        </div>

        <div className="games-grid">
          {grades.map((grade) => (
            <article className="game-grade-card" key={grade}>
              <header>
                <span className="game-grade-number">P{grade}</span>
                <div>
                  <small>PRIMARY GRADE</small>
                  <h2>Primary {grade}</h2>
                </div>
              </header>

              <div className="game-options">
                <div className="game-option english-game-option">
                  <span className="game-icon" aria-hidden="true">★</span>
                  <div>
                    <h3>English Primary {grade}</h3>
                    <p>Vocabulary, grammar and lesson games</p>
                    {grade === 1 ? (
                      <a className="game-launch" href={portalAsset("/games/english-primary-1-game-world/")}>Open English Primary 1 Games</a>
                    ) : grade === 4 ? (
                      <a className="game-launch" href={portalAsset("/games/english-primary-4-games/")}>Open English Primary 4 Games</a>
                    ) : <button type="button" disabled>Coming Soon</button>}
                  </div>
                </div>
                <div className="game-option connect-game-option">
                  <span className="game-icon" aria-hidden="true">✦</span>
                  <div>
                    <h3>Connect Plus Primary {grade}</h3>
                    <p>Interactive practice for Connect Plus lessons</p>
                    <button type="button" disabled>Coming Soon</button>
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
