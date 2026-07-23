"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { InnerPageShell } from "../../components/InnerPageShell";
import { getSupabaseBrowserClient, type StudentProfile } from "../../lib/supabase";
import { curricula, type Curriculum } from "../../data/curricula";
import { useStudentAccess } from "../../lib/useStudentAccess";

type CourseRow = { app_id: string; state: Record<string, unknown>; updated_at: string };
function courseFromAppId(appId: string) {
  const slug = appId.replace(/-first-term$/, "");
  return curricula.find((item) => item.slug === slug);
}

function progressPercent(course: Curriculum, row?: CourseRow) {
  const state = row?.state ?? {};
  const progress = (state.progress ?? state) as Record<string, unknown>;
  const completed = progress.completedLessons as Record<string, boolean> | undefined;
  const count = completed ? Object.values(completed).filter(Boolean).length : 0;
  return Math.max(0, Math.min(100, Math.round((count / 24) * 100)));
}

export default function StudentDashboardPage() {
  const [profile, setProfile] = useState<StudentProfile | null>(null);
  const [rows, setRows] = useState<CourseRow[]>([]);
  const [activeSection, setActiveSection] = useState<"home" | "activity" | "favorites" | "progress" | "profile" | "help" | "settings">("home");
  const [editName, setEditName] = useState("");
  const [editUsername, setEditUsername] = useState("");
  const [settingsMessage, setSettingsMessage] = useState("");
  const [status, setStatus] = useState("Loading your dashboard...");
  const router = useRouter();
  const access = useStudentAccess();

  useEffect(() => {
    const supabase = getSupabaseBrowserClient();
    let active = true;
    async function load() {
      const { data: sessionData } = await supabase.auth.getSession();
      if (!sessionData.session) { router.replace("/login"); return; }
      const [{ data: profileData }, { data: progressData }] = await Promise.all([
        supabase.from("profiles").select("id, full_name, username, role, created_at").eq("id", sessionData.session.user.id).single<StudentProfile>(),
        supabase.from("course_progress").select("app_id, state, updated_at").eq("user_id", sessionData.session.user.id).order("updated_at", { ascending: false }),
      ]);
      if (!active) return;
      setProfile(profileData ?? null);
      setEditName(profileData?.full_name ?? "");
      setEditUsername(profileData?.username ?? "");
      setRows((progressData ?? []) as CourseRow[]);
      setStatus(profileData ? "" : "We could not load your profile.");
    }
    void load();
    return () => { active = false; };
  }, [router]);

  const gradeCurricula = useMemo(
    () => access.grade ? curricula.filter((course) => course.grade === access.grade) : curricula,
    [access.grade],
  );
  const favorites = gradeCurricula;

  async function signOut() {
    await getSupabaseBrowserClient().auth.signOut();
    router.replace("/");
  }

  if (!profile) return <InnerPageShell className="student-dashboard-page"><section className="student-dashboard-loading"><span className="mini-logo">MF</span><h1>Student Dashboard</h1><p>{status}</p></section></InnerPageShell>;

  const latest = rows[0];
  const latestCourse = latest ? courseFromAppId(latest.app_id) : null;
  const latestState = (latest?.state?.progress ?? latest?.state) as Record<string, unknown> | undefined;
  const latestActivity = (latestState?.portalLastActivity ?? latestState?.lastActivity) as Record<string, unknown> | undefined;

  return (
    <InnerPageShell className="student-dashboard-page">
      <section className="student-dashboard-card">
        <header className="student-dashboard-heading">
          <div><p className="eyebrow"><span /> Student space</p><h1>Welcome back, {profile.full_name.split(" ")[0]}!</h1><p>Your personal learning dashboard.</p></div>
          <div className="student-dashboard-account"><span>@{profile.username}</span><button type="button" onClick={signOut}>Sign Out</button></div>
        </header>

        <div className="student-dashboard-layout">
          <aside className="student-dashboard-sidebar" aria-label="Student dashboard menu">
            <div className="sidebar-title">Student Menu</div>
            <button className={activeSection === "home" ? "sidebar-active" : ""} onClick={() => setActiveSection("home")}>Dashboard</button>
            <button className={activeSection === "activity" ? "sidebar-active" : ""} onClick={() => setActiveSection("activity")}>Last Activity</button>
            <button className={activeSection === "favorites" ? "sidebar-active" : ""} onClick={() => setActiveSection("favorites")}>My Grade & Curricula</button>
            <button className={activeSection === "progress" ? "sidebar-active" : ""} onClick={() => setActiveSection("progress")}>My Progress</button>
            <button className={activeSection === "profile" ? "sidebar-active" : ""} onClick={() => setActiveSection("profile")}>My Profile</button>
            <button className={activeSection === "settings" ? "sidebar-active" : ""} onClick={() => setActiveSection("settings")}>Settings</button>
            <button className={activeSection === "help" ? "sidebar-active" : ""} onClick={() => setActiveSection("help")}>Help & Support</button>
          </aside>
          <div className="student-dashboard-main">
            {activeSection === "home" && <>
              <div className="student-dashboard-grid">
                <article className="student-dashboard-panel last-activity-panel"><div className="panel-kicker">Welcome back</div><h2>Ready to keep learning, {profile.full_name.split(" ")[0]}?</h2><p>Choose a section from your student menu and continue your learning journey.</p></article>
                <article className="student-dashboard-panel help-panel"><div className="panel-kicker">Quick help</div><h2>Your learning space</h2><p>Your progress and favourite curricula are saved to your account.</p></article>
              </div>
            </>}
            {activeSection === "activity" && <div className="student-dashboard-panel last-activity-panel"><div className="panel-kicker">Last Activity</div>{latestCourse && latestActivity ? <><h2>{latestCourse.title}</h2><p>{String(latestActivity.detail ?? "Continue learning where you stopped")}</p><Link className="dashboard-primary-button" href={`/courses/${latestCourse.slug}?resume=1`}>Continue <span>→</span></Link></> : <><h2>No activity yet</h2><p>Choose a curriculum to begin learning.</p><Link className="dashboard-primary-button" href="/student/curricula">Choose a curriculum <span>→</span></Link></>}</div>}
            {activeSection === "help" && <article className="student-dashboard-panel help-panel"><div className="panel-kicker">Help & Support</div><h2>Need a hand?</h2><p>Contact Mr.Farid directly on WhatsApp.</p><a className="dashboard-whatsapp-button" href="https://wa.me/966552019074" target="_blank" rel="noreferrer">Open WhatsApp</a></article>}
            {activeSection === "profile" && <article className="student-dashboard-panel"><div className="panel-kicker">My Profile</div><h2>{profile.full_name}</h2><p>Username: @{profile.username}</p><p>Your account profile is connected to your learning progress.</p></article>}
            {activeSection === "settings" && <section className="dashboard-section">
              <div className="dashboard-section-heading"><div><div className="panel-kicker">Settings</div><h2>Manage your account</h2></div></div>
              <form className="student-settings-form" onSubmit={async (event) => {
                event.preventDefault();
                setSettingsMessage("Saving...");
                const supabase = getSupabaseBrowserClient();
                const { data, error } = await supabase.from("profiles").update({ full_name: editName.trim(), username: editUsername.trim() }).eq("id", profile.id).select("id, full_name, username, role, created_at").single<StudentProfile>();
                if (error || !data) { setSettingsMessage(error?.message ?? "Could not save changes."); return; }
                setProfile(data);
                setSettingsMessage("Settings saved successfully.");
              }}>
                <label>Full name<input value={editName} onChange={(event) => setEditName(event.target.value)} required /></label>
                <label>Username<input value={editUsername} onChange={(event) => setEditUsername(event.target.value)} required /></label>
                <div className="dashboard-section-heading"><strong>Primary grade</strong><span className="dashboard-selection-note">{access.grade ? `Primary ${access.grade}` : "Not assigned yet"}</span></div>
                <p className="settings-message">Your grade is fixed to keep your learning organised. To change it, contact Mr.Farid on WhatsApp.</p>
                <a className="dashboard-whatsapp-button" href="https://wa.me/966552019074" target="_blank" rel="noreferrer">Request Grade Change</a>
                <button className="dashboard-primary-button" type="submit">Save Settings</button>
                {settingsMessage && <p className="settings-message">{settingsMessage}</p>}
              </form>
            </section>}
            {activeSection === "progress" && <section className="dashboard-section"><div className="dashboard-section-heading"><div><div className="panel-kicker">My Progress</div><h2>Your favourite curricula</h2></div></div><div className="favourite-grid">{favorites.map((course) => { const row = rows.find((item) => item.app_id.startsWith(course.slug)); const percent = progressPercent(course, row); return <article className="favourite-course-card" key={course.slug}><div className="favourite-course-icon">{course.type === "english" ? "A" : "+"}</div><div><h3>{course.title}</h3><p>{percent}% complete</p><div className="dashboard-progress"><span style={{ width: `${percent}%` }} /></div></div></article>; })}</div></section>}
            {activeSection === "favorites" && <>

        <div className="student-dashboard-grid duplicate-dashboard-block">
          <article className="student-dashboard-panel last-activity-panel">
            <div className="panel-kicker">Last Activity</div>
            {latestCourse && latestActivity ? <><h2>{latestCourse.title}</h2><p>{String(latestActivity.detail ?? "Continue learning where you stopped")}</p><Link className="dashboard-primary-button" href={`/courses/${latestCourse.slug}?resume=1`}>Continue <span>→</span></Link></> : <><h2>Ready to learn?</h2><p>Your latest activity will appear here as you explore a curriculum.</p><Link className="dashboard-primary-button" href="/student/curricula">Choose a curriculum <span>→</span></Link></>}
          </article>

          <article className="student-dashboard-panel help-panel"><div className="panel-kicker">Help & Support</div><h2>Need a hand?</h2><p>Contact Mr.Farid directly on WhatsApp.</p><a className="dashboard-whatsapp-button" href="https://wa.me/966552019074" target="_blank" rel="noreferrer">Open WhatsApp</a></article>
        </div>

        <section className="dashboard-section">
          <div className="dashboard-section-heading">
            <div><div className="panel-kicker">My Grade & Curricula</div><h2>Your registered learning stage</h2></div>
            <span className="dashboard-selection-note">{access.grade ? `Primary ${access.grade}` : "Grade not assigned"}</span>
          </div>
          <div className="favourite-select-grid">
            <div className="favourite-select-card">
              <span>My registered grade</span>
              <strong>{access.grade ? `Primary ${access.grade}` : "Waiting for grade assignment"}</strong>
            </div>
          </div>
          <p className="settings-message">Need to change your primary grade? Contact Mr.Farid on WhatsApp.</p>
          <a className="dashboard-whatsapp-button" href="https://wa.me/966552019074" target="_blank" rel="noreferrer">Contact Mr.Farid</a>
          <div className="favourite-grid">{favorites.map((course) => { const row = rows.find((item) => item.app_id.startsWith(course.slug)); const percent = progressPercent(course, row); return <article className="favourite-course-card" key={course.slug}><div className="favourite-course-icon">{course.type === "english" ? "A" : "+"}</div><div><h3>{course.title}</h3><p>{percent}% complete</p><div className="dashboard-progress"><span style={{ width: `${percent}%` }} /></div></div><Link href={`/courses/${course.slug}`}>Open</Link></article>; })}</div>
        </section>
            </>}

        <nav className="dashboard-quick-links" aria-label="Student shortcuts"><Link href="/teacher">Meet the Teacher</Link></nav>
          </div>
        </div>
      </section>
    </InnerPageShell>
  );
}
