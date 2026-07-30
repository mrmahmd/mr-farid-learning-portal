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
      </section>
    </InnerPageShell>
  );
}
