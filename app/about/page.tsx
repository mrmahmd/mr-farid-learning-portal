import { InnerPageShell } from "../components/InnerPageShell";
import { portalAsset } from "../asset-path";

const features = [
  ["01", "A clear learning path", "Each grade is organised into curricula, units, lessons and activities."],
  ["02", "Made for young learners", "A cheerful, simple experience that works beautifully on phones and computers."],
  ["03", "Progress that matters", "Students will be able to continue lessons and follow their achievements."],
  ["04", "Teacher connection", "Direct communication with Mr. Mohamed Farid through trusted channels."],
];

export default function AboutPage() {
  return (
    <InnerPageShell className="content-page">
      <section className="about-card">
        <p className="eyebrow"><span /> About the portal</p>
        <h1>A complete English learning world for every primary learner.</h1>
        <p className="lead">Mr.Farid Learning Portal brings English and Connect Plus curricula from Primary 1 to Primary 6 together in one welcoming portal.</p>
        <div className="creator-credit">
          <img src={portalAsset("/mr-farid-avatar.png")} alt="Mr. Mohamed Farid" />
          <div>
            <small>DESIGNED &amp; DEVELOPED BY</small>
            <strong>Mr. Mohamed Farid</strong>
            <span>English Teacher &amp; Educational Content Designer</span>
          </div>
        </div>
        <div className="feature-grid">
          {features.map(([number, title, copy]) => (
            <article key={number}><b>{number}</b><h2>{title}</h2><p>{copy}</p></article>
          ))}
        </div>
      </section>
    </InnerPageShell>
  );
}
