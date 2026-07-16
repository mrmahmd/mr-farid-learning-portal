import Link from "next/link";
import { SiteHeader } from "./components/SiteHeader";
import { SocialLinks } from "./components/SocialLinks";

export default function Home() {
  return (
    <main className="hero-page">
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

        <aside className="glass-card login-card" aria-label="Student login">
          <div className="card-heading">
            <span className="mini-logo">MF</span>
            <div>
              <p>Welcome back</p>
              <h2>Student Login</h2>
            </div>
          </div>

          <label className="field-label" htmlFor="home-username">Username</label>
          <div className="input-shell">
            <span aria-hidden="true">●</span>
            <input id="home-username" name="username" placeholder="Enter your username" autoComplete="username" />
          </div>

          <div className="label-row">
            <label className="field-label" htmlFor="home-password">Password</label>
            <a href="#" className="quiet-link">Forgot password?</a>
          </div>
          <div className="input-shell">
            <span aria-hidden="true">✦</span>
            <input id="home-password" name="password" type="password" placeholder="Enter your password" autoComplete="current-password" />
          </div>

          <Link className="primary-button" href="/login">
            Enter Learning Portal <span aria-hidden="true">→</span>
          </Link>

          <div className="divider"><span>New to our learning world?</span></div>

          <Link className="secondary-button" href="/register">
            Create New Account
          </Link>

          <p className="privacy-note">A safe learning space for every young learner.</p>
        </aside>
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
