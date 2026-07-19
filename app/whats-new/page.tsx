import { InnerPageShell } from "../components/InnerPageShell";

const updates = [
  {
    badge: "New Curriculum",
    date: "Just added",
    title: "English Primary 3 – First Term Added",
    description: "English Primary 3 First Term is now available with six units, interactive lessons, Grammar Banks, challenges, and saved student progress.",
    tone: "update-mint",
    icon: "📚",
  },
  {
    badge: "Available Now",
    date: "First release",
    title: "Primary 4 Curricula Added",
    description: "English Primary 4 and Connect Plus Primary 4 are the first curriculum applications available in the portal.",
    tone: "update-blue",
    icon: "📚",
  },
  {
    badge: "New",
    date: "Recently added",
    title: "Educational Games Section",
    description: "A dedicated games area is now available, organized by primary grade and curriculum.",
    tone: "update-purple",
    icon: "🎮",
  },
  {
    badge: "New App",
    date: "Recently added",
    title: "English Primary 4 Games App",
    description: "Students can explore an interactive collection of unit and lesson games for English Primary 4.",
    tone: "update-mint",
    icon: "⭐",
  },
  {
    badge: "Available Now",
    date: "Just added",
    title: "English Primary 4 – First Term Added to Games",
    description: "The English Primary 4 First Term curriculum is now available inside the Educational Games section.",
    tone: "update-blue",
    icon: "📘",
  },
  {
    badge: "New Curriculum",
    date: "Recently added",
    title: "English Primary 1 – First Term",
    description: "English Primary 1 First Term is now available with units, lessons, activities, and student progress tracking.",
    tone: "update-sun",
    icon: "🚀",
  },
];

export default function WhatsNewPage() {
  return (
    <InnerPageShell className="content-page whats-new-page">
      <section className="whats-new-card">
        <div className="whats-new-heading">
          <p className="eyebrow"><span /> Portal updates</p>
          <h1>What&apos;s New?</h1>
          <p>Discover the latest curricula, learning apps, games, and features added to Mr.Farid Learning Portal.</p>
        </div>
        <div className="updates-list">
          {updates.map((update, index) => (
            <article className={`update-item ${update.tone}`} key={update.title}>
              <div className="update-number">0{index + 1}</div>
              <div className="update-icon" aria-hidden="true">{update.icon}</div>
              <div className="update-copy">
                <div className="update-meta"><span>{update.badge}</span><small>{update.date}</small></div>
                <h2>{update.title}</h2>
                <p>{update.description}</p>
              </div>
            </article>
          ))}
        </div>
        <div className="updates-footer"><span>✨</span><strong>More exciting learning experiences are coming soon.</strong></div>
      </section>
    </InnerPageShell>
  );
}
