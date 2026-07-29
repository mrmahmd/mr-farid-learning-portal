"use client";

import { FormEvent, useCallback, useEffect, useMemo, useState } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import { getSupabaseBrowserClient, usernameToStudentEmail } from "../lib/supabase";
import { curricula } from "../data/curricula";

type AccessMode = "grade" | "custom" | "all" | "none";

type StudentRow = {
  id: string;
  name: string;
  username: string;
  createdAt: string;
  apps: number;
  activity: string;
  updatedAt: string | null;
  suspended: boolean;
  grade: number | null;
  accessMode: AccessMode;
  allowedCurricula: string[];
  bookletAccess: boolean;
};

export default function AdminDashboardPage() {
  const [authState, setAuthState] = useState<"checking" | "signed-out" | "denied" | "allowed">("checking");
  const [authMessage, setAuthMessage] = useState("");
  const [authLoading, setAuthLoading] = useState(false);
  const [section, setSection] = useState("Overview");
  const [query, setQuery] = useState("");
  const [students, setStudents] = useState<StudentRow[]>([]);
  const [dataMessage, setDataMessage] = useState("Loading student data...");
  const [createMessage, setCreateMessage] = useState("");
  const [creating, setCreating] = useState(false);
  const [editingStudentId, setEditingStudentId] = useState<string | null>(null);
  const [editingGrade, setEditingGrade] = useState(1);
  const [accessMode, setAccessMode] = useState<AccessMode>("none");
  const [selectedCurricula, setSelectedCurricula] = useState<string[]>([]);
  const [bookletAccess, setBookletAccess] = useState(true);

  const loadStudents = useCallback(async () => {
    const supabase = getSupabaseBrowserClient();
    setDataMessage("Loading student data...");
    const [{ data: profiles, error: profilesError }, { data: progress, error: progressError }, { data: access, error: accessError }] = await Promise.all([
      supabase.from("profiles").select("id, full_name, username, created_at").order("created_at", { ascending: false }),
      supabase.from("course_progress").select("user_id, app_id, state, updated_at").order("updated_at", { ascending: false }),
      supabase.from("student_access").select("user_id, is_suspended, grade, access_mode, allowed_curricula, booklet_access"),
    ]);
    if (profilesError || progressError || accessError) {
      setDataMessage(profilesError?.message ?? progressError?.message ?? accessError?.message ?? "Could not load students.");
      return;
    }
    const rows = (profiles ?? []).map((profile) => {
      const records = (progress ?? []).filter((item) => item.user_id === profile.id);
      const latest = records[0];
      const controls = (access ?? []).find((item) => item.user_id === profile.id);
      const lastActivity = latest?.state?.portalLastActivity;
      return {
        id: profile.id,
        name: profile.full_name,
        username: profile.username.toUpperCase(),
        createdAt: profile.created_at,
        apps: records.length,
        activity: lastActivity?.label ?? latest?.app_id ?? "No activity yet",
        updatedAt: latest?.updated_at ?? null,
        suspended: controls?.is_suspended ?? false,
        grade: controls?.grade ?? null,
        accessMode: (["grade", "custom", "all", "none"].includes(controls?.access_mode) ? controls?.access_mode : "none") as AccessMode,
        allowedCurricula: controls?.allowed_curricula ?? [],
        bookletAccess: controls?.booklet_access ?? false,
      };
    });
    setStudents(rows);
    setDataMessage(rows.length ? "" : "No student accounts found.");
  }, []);

  useEffect(() => {
    getSupabaseBrowserClient().auth.getUser().then(({ data }) => {
      setAuthState(data.user?.app_metadata?.role === "admin" ? "allowed" : data.user ? "denied" : "signed-out");
    });
  }, []);

  useEffect(() => {
    if (authState === "allowed") void loadStudents();
  }, [authState, loadStudents]);

  useEffect(() => {
    if (!editingStudentId) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = previousOverflow; };
  }, [editingStudentId]);

  const visibleStudents = useMemo(
    () => students.filter((student) => `${student.name} ${student.username}`.toLowerCase().includes(query.toLowerCase())),
    [students, query],
  );

  async function signInAdmin(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    setAuthLoading(true);
    setAuthMessage("");
    const supabase = getSupabaseBrowserClient();
    const { error } = await supabase.auth.signInWithPassword({
      email: usernameToStudentEmail(String(form.get("username") ?? "")),
      password: String(form.get("password") ?? ""),
    });
    if (error) {
      setAuthMessage(error.message);
      setAuthLoading(false);
      return;
    }
    await supabase.auth.refreshSession();
    const { data } = await supabase.auth.getUser();
    if (data.user?.app_metadata?.role === "admin") setAuthState("allowed");
    else {
      await supabase.auth.signOut();
      setAuthState("denied");
    }
    setAuthLoading(false);
  }

  async function invokeAdminFunction(functionName: string, body: Record<string, unknown>) {
    const supabase = getSupabaseBrowserClient();
    const { error: refreshError } = await supabase.auth.refreshSession();
    if (refreshError) return { data: null, error: refreshError };
    return supabase.functions.invoke(functionName, { body });
  }

  async function createStudent(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formElement = event.currentTarget;
    const form = new FormData(formElement);
    setCreating(true);
    setCreateMessage("Creating account...");
    const { data, error } = await invokeAdminFunction("admin-create-student", {
      fullName: String(form.get("fullName") ?? ""),
      password: String(form.get("password") ?? ""),
      grade: Number(form.get("grade") ?? 1),
    });
    if (error || data?.error) {
      let detail = data?.error ?? error?.message ?? "Could not create account.";
      if (error && "context" in error) {
        try { detail = (await (error.context as Response).json())?.error ?? detail; } catch { /* keep fallback */ }
      }
      setCreateMessage(detail);
      setCreating(false);
      return;
    }
    setCreateMessage(`Account created successfully. Username: ${data.username}`);
    formElement.reset();
    await loadStudents();
    setCreating(false);
  }

  function openAccessEditor(student: StudentRow) {
    setEditingStudentId(student.id);
    setEditingGrade(student.grade ?? 1);
    setAccessMode(student.accessMode);
    setSelectedCurricula(student.allowedCurricula);
    setBookletAccess(student.bookletAccess);
    setDataMessage("");
  }

  function toggleCurriculum(slug: string) {
    setSelectedCurricula((current) => current.includes(slug)
      ? current.filter((item) => item !== slug)
      : [...current, slug]);
  }

  async function saveStudentAccess(student: StudentRow) {
    setDataMessage("Saving student access...");
    const body = {
      userId: student.id,
      action: "update_access",
      grade: editingGrade,
      accessMode,
      allowedCurricula: accessMode === "custom" ? selectedCurricula : [],
      bookletAccess,
    };
    const { data, error } = await invokeAdminFunction("admin-manage-student", body);
    let detail = data?.error ?? error?.message ?? "Could not save changes.";
    if (error && "context" in error) {
      try { detail = (await (error.context as Response).json())?.error ?? detail; } catch { /* keep fallback */ }
    }
    setDataMessage(error || data?.error ? detail : "Student access updated successfully.");
    if (!error && !data?.error) {
      setEditingStudentId(null);
      await loadStudents();
    }
  }

  async function manageStudent(student: StudentRow, action: "suspend" | "reset_password") {
    let body: Record<string, unknown> = { userId: student.id, action };
    if (action === "suspend") body.suspended = !student.suspended;
    if (action === "reset_password") {
      const password = window.prompt(`Enter a new temporary password for ${student.username}:`);
      if (!password) return;
      body.password = password;
    }
    setDataMessage("Saving student controls...");
    const { data, error } = await invokeAdminFunction("admin-manage-student", body);
    let detail = data?.error ?? error?.message ?? "Could not save changes.";
    if (error && "context" in error) {
      try { detail = (await (error.context as Response).json())?.error ?? detail; } catch { /* keep fallback */ }
    }
    setDataMessage(error || data?.error ? detail : "Student controls saved successfully.");
    if (!error && !data?.error) await loadStudents();
  }

  if (authState !== "allowed") {
    return (
      <main className="admin-page" dir="ltr">
        <section className="admin-content admin-auth-card">
          <div className="admin-brand"><span>MF</span><div><b>Mr.Farid</b><small>Admin Control Center</small></div></div>
          {authState === "checking" && <p>Checking administrator session...</p>}
          {authState === "denied" && <p className="form-message error">This account is not authorized as an administrator.</p>}
          <form className="glass-card standalone-form" onSubmit={signInAdmin}>
            <h1>Administrator Sign In</h1>
            <label htmlFor="adminUsername">Username</label>
            <input id="adminUsername" name="username" required autoComplete="username" />
            <label htmlFor="adminPassword">Password</label>
            <input id="adminPassword" name="password" type="password" required autoComplete="current-password" />
            <button className="primary-button" type="submit" disabled={authLoading}>{authLoading ? "Signing in..." : "Enter Control Center"}</button>
            {authMessage && <p className="form-message error">{authMessage}</p>}
          </form>
          <Link href="/" className="admin-back-link">Back to Portal</Link>
        </section>
      </main>
    );
  }

  return (
    <main className="admin-page" dir="ltr">
      <aside className="admin-sidebar">
        <Link href="/" className="admin-brand"><span>MF</span><div><b>Mr.Farid</b><small>Admin Control Center</small></div></Link>
        <div className="admin-nav-label">CONTROL CENTER</div>
        {["Overview", "Students", "Curricula", "Booklets", "Activity Log", "Settings"].map((item) => (
          <button key={item} className={section === item ? "admin-nav-item active" : "admin-nav-item"} onClick={() => setSection(item)}><span>{item}</span></button>
        ))}
        <Link href="/" className="admin-back-link">Back to Portal</Link>
      </aside>

      <section className="admin-content">
        <header className="admin-topbar"><div><span className="panel-kicker">ADMINISTRATION</span><h1>{section}</h1><p>Live student data from Supabase.</p></div><div className="admin-account"><span className="admin-status-dot" /> Mr. Mohamed Farid</div></header>

        {section === "Overview" && <>
          <div className="admin-alert"><div><b>Supabase is connected</b><p>Student accounts and progress shown below are loaded from the live database.</p></div><button type="button" onClick={() => void loadStudents()}>Refresh</button></div>
          <div className="admin-stats">
            <article><span>Students</span><strong>{students.length}</strong><small>Live accounts</small></article>
            <article><span>With activity</span><strong>{students.filter((student) => student.apps > 0).length}</strong><small>Cloud progress found</small></article>
            <article><span>Saved courses</span><strong>{students.reduce((total, student) => total + student.apps, 0)}</strong><small>Progress records</small></article>
            <article><span>Database</span><strong>Live</strong><small>Supabase connected</small></article>
          </div>
          <section className="admin-panel">
            <div className="admin-panel-heading"><div><span className="panel-kicker">RECENT ACTIVITY</span><h2>Student learning activity</h2></div><button type="button" onClick={() => setSection("Students")}>View students</button></div>
            <div className="activity-list">{students.slice(0, 6).map((student) => <div key={student.id}><span className="activity-avatar blue">{student.name.split(" ").map((part) => part[0]).join("").slice(0, 2)}</span><p><b>{student.name}</b><small>{student.activity}</small></p><time>{student.updatedAt ? new Date(student.updatedAt).toLocaleDateString() : "New"}</time></div>)}</div>
            {dataMessage && <p>{dataMessage}</p>}
          </section>
        </>}

        {section === "Students" && <>
          <section className="admin-panel">
            <div className="admin-panel-heading"><div><span className="panel-kicker">CREATE STUDENT</span><h2>New managed account</h2></div></div>
            <form className="student-settings-form" onSubmit={createStudent}>
              <label>Student full name<input name="fullName" minLength={3} maxLength={100} required /></label>
              <label>Grade<select name="grade" defaultValue="1">{[1, 2, 3, 4, 5, 6].map((grade) => <option key={grade} value={grade}>Primary {grade}</option>)}</select></label>
              <label>Temporary password<input name="password" type="password" minLength={8} required /></label>
              <button className="dashboard-primary-button" type="submit" disabled={creating}>{creating ? "Creating..." : "Create Student Account"}</button>
              {createMessage && <p className="settings-message">{createMessage}</p>}
            </form>
          </section>
          <section className="admin-panel">
            <div className="admin-panel-heading"><div><span className="panel-kicker">STUDENT ACCOUNTS</span><h2>Manage students</h2></div><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search name or username" /></div>
            <div className="student-table"><div className="student-table-head"><span>Student</span><span>Status</span><span>Grade / Subscription</span><span>Last activity</span><span>Controls</span></div>{visibleStudents.map((student) => <div className={`student-table-row${editingStudentId === student.id ? " selected" : ""}`} key={student.id}><div className="student-cell"><span className="admin-avatar">{student.name.split(" ").map((part) => part[0]).join("").slice(0, 2)}</span><p><b>{student.name}</b><small>{student.username}</small></p></div><span className={`status-pill ${student.suspended ? "suspended" : "active"}`}>{student.suspended ? "Suspended" : "Active"}</span><span>{student.grade ? `Primary ${student.grade}` : "Grade needs assignment"} · {student.accessMode === "all" ? "Full portal access" : student.accessMode === "custom" ? "Custom access" : student.accessMode === "grade" ? "Stage subscription active" : "Content locked"}</span><span>{student.activity}</span><div className="row-actions"><button type="button" onClick={() => void manageStudent(student, "suspend")}>{student.suspended ? "Activate" : "Suspend"}</button><button type="button" onClick={() => void manageStudent(student, "reset_password")}>Password</button><button className="access-action" type="button" onClick={() => openAccessEditor(student)}>Access</button></div></div>)}</div>
            {editingStudentId && typeof document !== "undefined" && createPortal((() => {
              const student = students.find((item) => item.id === editingStudentId);
              if (!student) return null;
              return <div className="access-drawer-backdrop" onClick={() => setEditingStudentId(null)}>
                <aside className="student-access-drawer" role="dialog" aria-modal="true" aria-label={`Access settings for ${student.name}`} onClick={(event) => event.stopPropagation()}>
                <div className="access-editor-heading">
                  <div><span className="panel-kicker">CONTENT ACCESS</span><h3>{student.name}</h3><p>{student.username} · Primary {editingGrade}</p></div>
                  <button type="button" onClick={() => setEditingStudentId(null)}>Close</button>
                </div>
                <label className="access-grade-control">
                  <span><b>Student Grade</b><small>Changing this updates the grade shown beside the student after saving.</small></span>
                  <select value={editingGrade} onChange={(event) => setEditingGrade(Number(event.target.value))}>
                    {[1, 2, 3, 4, 5, 6].map((grade) => <option key={grade} value={grade}>Primary {grade}</option>)}
                  </select>
                </label>
                <div className="access-presets">
                  <button className={accessMode === "grade" ? "active" : ""} type="button" onClick={() => { setAccessMode("grade"); setBookletAccess(true); }}><b>Activate This Stage</b><small>Open only Primary {editingGrade}: curricula, games, booklets and assessment books.</small></button>
                  <button className={accessMode === "all" ? "active all" : "all"} type="button" onClick={() => { setAccessMode("all"); setBookletAccess(true); }}><b>Open Full Portal</b><small>Allow every available grade and learning resource.</small></button>
                  <button className={accessMode === "custom" ? "active custom" : "custom"} type="button" onClick={() => setAccessMode("custom")}><b>Choose Specific Courses</b><small>Open only the courses selected below.</small></button>
                  <button className={accessMode === "none" ? "active danger" : "danger"} type="button" onClick={() => { setAccessMode("none"); setBookletAccess(false); }}><b>Close Content</b><small>Keep every learning page locked until the student subscribes.</small></button>
                </div>
                {accessMode === "custom" && <div className="curriculum-access-grid">
                  {curricula.map((curriculum) => <label key={curriculum.slug}><input type="checkbox" checked={selectedCurricula.includes(curriculum.slug)} onChange={() => toggleCurriculum(curriculum.slug)} /><span><b>{curriculum.title}</b><small>Primary {curriculum.grade}</small></span></label>)}
                </div>}
                <label className="booklet-access-control"><input type="checkbox" checked={bookletAccess} onChange={(event) => setBookletAccess(event.target.checked)} /><span><b>Assessment books and booklets</b><small>Allow downloads and interactive assessment books for this student.</small></span></label>
                <div className="access-editor-actions"><button type="button" onClick={() => setEditingStudentId(null)}>Cancel</button><button className="save" type="button" onClick={() => void saveStudentAccess(student)}>Save Access</button></div>
                </aside>
              </div>;
            })(), document.body)}
            {dataMessage && <p>{dataMessage}</p>}
          </section>
        </>}

        {section !== "Overview" && section !== "Students" && <section className="admin-empty-state"><h2>{section} management</h2><p>This section will be connected in the next stage.</p><button type="button" onClick={() => setSection("Overview")}>Back to overview</button></section>}
      </section>
    </main>
  );
}
