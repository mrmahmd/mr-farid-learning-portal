import { InnerPageShell } from "../components/InnerPageShell";
import { SocialLinks } from "../components/SocialLinks";
import { portalAsset } from "../asset-path";

const profileDetails = [
  {
    icon: "ED",
    label: "Education",
    text: "Bachelor of Arts and Education, Faculty of Education, Mansoura University — 2007.",
  },
  {
    icon: "CP",
    label: "Current Position",
    text: "English Teacher at AlAndalus Private Schools — Egyptian Section, Al-Hamdaniyah, Jeddah.",
  },
  {
    icon: "ET",
    label: "Educational Technology",
    text: "Designs interactive educational applications, digital learning experiences, worksheets, games, and AI-powered learning content.",
  },
  {
    icon: "TD",
    label: "Teacher Development",
    text: "Supports and trains teachers in using artificial intelligence for lesson planning and educational content creation.",
  },
];

export default function TeacherPage() {
  return (
    <InnerPageShell className="content-page">
      <section className="teacher-profile-card">
        <aside className="teacher-visual">
          <div className="teacher-photo-frame">
            <img src={portalAsset("/mr-farid-avatar.png")} alt="Mr. Mohamed Farid" />
            <span className="teacher-status"><i /> Senior English Instructor</span>
          </div>
          <div className="teacher-contact-panel">
            <small>CONNECT WITH THE TEACHER</small>
            <SocialLinks labeled />
          </div>
        </aside>

        <div className="teacher-profile-copy">
          <p className="eyebrow"><span /> Meet the teacher</p>
          <h1>Mr. Mohamed Farid</h1>
          <div className="teacher-titles">
            <strong>Senior English Instructor</strong>
            <span>English Teacher &amp; Educational Content Designer</span>
          </div>

          <div className="profile-detail-grid">
            {profileDetails.map((item) => (
              <article key={item.label}>
                <b>{item.icon}</b>
                <div><h2>{item.label}</h2><p>{item.text}</p></div>
              </article>
            ))}
          </div>

          <blockquote className="teacher-mission">
            <small>MY MISSION</small>
            <p>“To make English clear, enjoyable, practical, and memorable for every learner.”</p>
          </blockquote>
        </div>
      </section>
    </InnerPageShell>
  );
}
