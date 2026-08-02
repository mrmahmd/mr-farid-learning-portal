import { portalAsset } from "../asset-path";
import { InnerPageShell } from "../components/InnerPageShell";

export default function PlayLearnPage() {
  return (
    <InnerPageShell className="content-page play-learn-page">
      <section className="play-learn-card">
        <div className="play-learn-heading">
          <p className="eyebrow"><span aria-hidden="true" />Free English grammar games</p>
          <h1>Play &amp; Learn</h1>
          <p className="play-learn-lead">
            A free space for every young learner to practise English, play with confidence, and enjoy learning.
          </p>
        </div>

        <div className="play-learn-showcase">
        <article className="play-learn-game-card">
          <div
            className="play-learn-art"
            role="img"
            aria-label="Children playing football in an English learning game"
            style={{ backgroundImage: `url(${portalAsset("/play-learn/grammar-goal-champions/assets/opening-bg.webp")})` }}
          />
          <div className="play-learn-copy">
            <div className="play-learn-pills">
              <span className="play-learn-new">New</span>
              <span>Free for everyone</span>
            </div>
            <h2>Grammar Goal Champions</h2>
            <p>
              Take the perfect penalty kick! Practise Present Simple and Past Simple through quick grammar challenges,
              goal celebrations, and friendly competition.
            </p>
            <div className="play-learn-meta" aria-label="Game details">
              <span>Present Simple</span>
              <span>Past Simple</span>
              <span>Primary 3–6</span>
            </div>
            <a className="play-learn-launch" href={portalAsset("/play-learn/grammar-goal-champions/")}>Open Game <b aria-hidden="true">→</b></a>
          </div>
        </article>

        <article className="play-learn-game-card play-learn-pronoun-card">
          <div
            className="play-learn-art"
            role="img"
            aria-label="Pronoun Blaster grammar galaxy game"
            style={{ backgroundImage: `url(${portalAsset("/marketing/games.png")})` }}
          />
          <div className="play-learn-copy">
            <div className="play-learn-pills">
              <span className="play-learn-new">New</span>
              <span>Free for everyone</span>
            </div>
            <h2>Pronoun Blaster: Grammar Galaxy</h2>
            <p>
              Blast the correct pronoun and save the galaxy! Practise subject and object pronouns through colourful missions, quick decisions, and rewarding combos.
            </p>
            <div className="play-learn-meta" aria-label="Game details">
              <span>Subject pronouns</span>
              <span>Object pronouns</span>
              <span>All primary grades</span>
            </div>
            <a className="play-learn-launch" href={portalAsset("/play-learn/pronoun-blaster/")}>Open Game <b aria-hidden="true">→</b></a>
          </div>
        </article>

          <aside className="play-learn-howto" aria-label="How to play">
            <p className="play-learn-howto-kicker">How to Play</p>
            <h2>Choose a game, follow the instructions, and learn through play!</h2>
            <ol>
              <li><b>1</b><span><strong>Choose a game</strong> — open the game card that matches your learning goal.</span></li>
              <li><b>2</b><span><strong>Choose a level</strong> — follow the game instructions and start your mission.</span></li>
              <li><b>3</b><span><strong>Learn and improve</strong> — correct answers earn points, stars, and rewards.</span></li>
            </ol>
            <div className="play-learn-levels" aria-label="Available game levels">
              <span>Starter</span><span>Growing</span><span>Challenge</span><span>Champion</span>
            </div>
            <p className="play-learn-timer">⏱ You have 20 seconds for every question.</p>
          </aside>
        </div>
      </section>
    </InnerPageShell>
  );
}
