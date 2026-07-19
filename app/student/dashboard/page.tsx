"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { InnerPageShell } from "../../components/InnerPageShell";
import { getSupabaseBrowserClient, type StudentProfile } from "../../lib/supabase";
import { curricula, type Curriculum } from "../../data/curricula";

type CourseRow = { app_id: string; state: Record<string, unknown>; updated_at: string };
const FAVORITES_KEY = "mrfarid_favourite_curricula";

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
  const [favoriteSlugs, setFavoriteSlugs] = useState<string[]>([]);
  const [status, setStatus] = useState("Loading your dashboard...");
  const router = useRouter();

  useEffect(() => {
    const saved = localStorage.getItem(FAVORITES_KEY);
    if (saved) {
      try { setFavoriteSlugs(JSON.parse(saved).slice(0, 2)); } catch { /* use defaults */ }
    }
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
      setRows((progressData ?? []) as CourseRow[]);
      setStatus(profileData ? "" : "We could not load your profile.");
    }
    void load();
    return () => { active = false; };
  }, [router]);

  const available = useMemo(() => rows.map((row) => courseFromAppId(row.app_id)).filter(Boolean) as Curriculum[], [rows]);
  const favorites = useMemo(() => {
    const selected = favoriteSlugs.map((slug) => curricula.find((item) => item.slug === slug)).filter(Boolean) as Curriculum[];
    return selected.length ? selected : available.slice(0, 2);
  }, [available, favoriteSlugs]);

  function saveFavorites(next: string[]) {
    const limited = next.slice(0, 2);
    setFavoriteSlugs(limited);
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(limited));
  }

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

        <div className="student-dashboard-grid">
          <article className="student-dashboard-panel last-activity-panel">
            <div className="panel-kicker">Last Activity</div>
            {latestCourse && latestActivity ? <><h2>{latestCourse.title}</h2><p>{String(latestActivity.detail ?? "Continue learning where you stopped")}</p><Link className="dashboard-primary-button" href={`/courses/${latestCourse.slug}?resume=1`}>Continue <span>→</span></Link></> : <><h2>Ready to learn?</h2><p>Your latest activity will appear here as you explore a curriculum.</p><Link className="dashboard-primary-button" href="/student/curricula">Choose a curriculum <span>→</span></Link></>}
          </article>

          <article className="student-dashboard-panel help-panel"><div className="panel-kicker">Help & Support</div><h2>Need a hand?</h2><p>Contact Mr.Farid directly on WhatsApp.</p><a className="dashboard-whatsapp-button" href="https://wa.me/966552019074" target="_blank" rel="noreferrer">Open WhatsApp</a></article>
        </div>

        <section className="dashboard-section"><div className="dashboard-section-heading"><div><div className="panel-kicker">My Favourite Curricula</div><h2>Choose up to two</h2></div><span className="dashboard-selection-note">Select your two shortcuts below</span></div><div className="favourite-select-grid">{[0, 1].map((slot) => <label className="favourite-select-card" key={slot}><span>Favourite {slot + 1}</span><select value={favoriteSlugs[slot] ?? ""} onChange={(event) => { const next = [...favoriteSlugs]; next[slot] = event.target.value; saveFavorites(next.filter(Boolean).filter((slug, index, all) => all.indexOf(slug) === index)); }}><option value="">Choose a curriculum</option>{curricula.map((course) => <option key={course.slug} value={course.slug} disabled={favoriteSlugs.includes(course.slug) && favoriteSlugs[slot] !== course.slug}>{course.title} — First Term</option>)}</select></label>)}</div><div className="favourite-grid">{favorites.map((course) => { const row = rows.find((item) => item.app_id.startsWith(course.slug)); const percent = progressPercent(course, row); return <article className="favourite-course-card" key={course.slug}><div className="favourite-course-icon">{course.type === "english" ? "A" : "+"}</div><div><h3>{course.title}</h3><p>{percent}% complete</p><div className="dashboard-progress"><span style={{ width: `${percent}%` }} /></div></div><Link href={`/courses/${course.slug}`}>Open</Link></article>; })}</div></section>

        <nav className="dashboard-quick-links" aria-label="Student shortcuts"><Link href="/student/curricula">My Curricula</Link><Link href="/games">Games</Link><Link href="/booklets">Booklets</Link><Link href="/whats-new">What’s New?</Link><Link href="/teacher">Meet the Teacher</Link></nav>
      </section>
    </InnerPageShell>
  );
}
