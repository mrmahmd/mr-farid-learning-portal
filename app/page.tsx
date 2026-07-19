import { SiteHeader } from "./components/SiteHeader";
import { SocialLinks } from "./components/SocialLinks";
import { HomeLoginCard } from "./components/HomeLoginCard";

export default function Home() {
  return (
    <main className="hero-page">
      <div className="hero-top-mask" aria-hidden="true" />
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

        <div className="hero-login-stack">
          <aside className="platform-update-card" aria-label="Platform development update">
            <div className="platform-update-icon">✦</div>
            <div><p className="platform-update-label">Platform Update · تحديث المنصة</p><h2>The platform is under development</h2><p>New curricula and interactive learning resources are being added gradually.</p><p dir="rtl">المنصة قيد الإنشاء، ويتم إضافة المناهج والمصادر التعليمية التفاعلية تدريجيًا.</p></div>
          </aside>
          <HomeLoginCard />
        </div>
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
