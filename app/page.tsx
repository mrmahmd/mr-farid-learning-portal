import { SiteHeader } from "./components/SiteHeader";
import { SocialLinks } from "./components/SocialLinks";
import { HomeLoginCard } from "./components/HomeLoginCard";

export default function Home() {
  return (
    <main className="hero-page">
      <div className="school-credit" aria-label="School and portal designer">
        <div className="school-lockup" aria-label="AlAndalus Private Schools">
          <span className="school-crest">APS</span>
          <span className="school-name">ALANDALUS<br />PRIVATE SCHOOLS</span>
        </div>
        <div className="designer-credit">
          <small>PREPARED AND DESIGNED BY</small>
          <strong>Mr. Mohamed Farid</strong>
        </div>
      </div>
      <SiteHeader />

      <div className="hero-shade" aria-hidden="true" />

      <section className="hero-content" aria-label="Mr.Farid Learning Portal welcome">
        <div className="hero-copy">
          <p className="eyebrow"><span /> Learning starts with wonder</p>
          <h1>
            Step into your
            <strong> learning world.</strong>
          </h1>
          <p className="hero-intro">
            A joyful English learning portal made for young explorers from
            Primary 1 to Primary 6.
          </p>

          <div className="curriculum-pills" aria-label="Available curricula">
            <span>English</span>
            <span>Connect Plus</span>
            <span>Primary 1–6</span>
          </div>
        </div>

        <HomeLoginCard />
      </section>

      <div className="hero-footer">
        <span>Learn</span><i />
        <span>Explore</span><i />
        <span>Shine</span>
      </div>

      <SocialLinks floating />
    </main>
  );
}
