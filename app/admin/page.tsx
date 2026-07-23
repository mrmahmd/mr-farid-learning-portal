"use client";

import { FormEvent, useCallback, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { getSupabaseBrowserClient, usernameToStudentEmail } from "../lib/supabase";

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

  const loadStudents = useCallback(async () => {
    const supabase = getSupabaseBrowserClient();
    setDataMessage("Loading student data...");
    const [{ data: profiles, error: profilesError }, { data: progress, error: progressError }, { data: access, error: accessError }] = await Promise.all([
      supabase.from("profiles").select("id, full_name, username, created_at").order("created_at", { ascending: false }),
      supabase.from("course_progress").select("user_id, app_id, state, updated_at").order("updated_at", { ascending: false }),
      supabase.from("student_access").select("user_id, is_suspended, grade, allowed_curricula, booklet_access"),
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
        allowedCurricula: controls?.allowed_curricula ?? [],
        bookletAccess: controls?.booklet_access ?? true,
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

  async function createStudent(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formElement = event.currentTarget;
    const form = new FormData(formElement);
    setCreating(true);
    setCreateMessage("Creating account...");
    const { data, error } = await getSupabaseBrowserClient().functions.invoke("admin-create-student", {
      body: {
        fullName: String(form.get("fullName") ?? ""),
        password: String(form.get("password") ?? ""),
        grade: Number(form.get("grade") ?? 1),
      },
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

  async function manageStudent(student: StudentRow, action: "suspend" | "reset_password" | "update_access") {
    let body: Record<string, unknown> = { userId: student.id, action };
    if (action === "suspend") body.suspended = !student.suspended;
    if (action === "reset_password") {
      const password = window.prompt(`Enter a new temporary password for ${student.username}:`);
      if (!password) return;
      body.password = password;
    }
    if (action === "update_access") {
      const allowed = window.prompt(
        "Enter extra curriculum slugs separated by commas. Leave empty for access to the student's assigned grade only.",
        student.allowedCurricula.join(", "),
      );
      if (allowed === null) return;
      const gradeValue = window.prompt("Enter grade from 1 to 6:", String(student.grade ?? 1));
      if (gradeValue === null) return;
      body = {
        ...body,
        grade: Math.min(6, Math.max(1, Number(gradeValue))),
        allowedCurricula: allowed.split(",").map((item) => item.trim()).filter(Boolean),
        bookletAccess: window.confirm("Allow this student to download booklets?"),
      };
    }
    setDataMessage("Saving student controls...");
    const { data, error } = await getSupabaseBrowserClient().functions.invoke("admin-manage-student", { body });
    let detail = data?.error ?? error?.message ?? "Could not save changes.";
    if (error && "context" in error) {
      try { detail = (await (error.context as Response).json())?.error ?? detail; } catch { /* keep fallback */ }
    }
    setDataMessage(error || data?.error ? detail : "Student controls saved successfully.");
    if (!error && !data?.error) await loadStudents();
  }

  if (authState !== "allowed") {
    return (
      <main className="admin-page">
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
    <main className="admin-page">
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
            <div className="student-table"><div className="student-table-head"><span>Student</span><span>Status</span><span>Grade / Courses</span><span>Last activity</span><span>Controls</span></div>{visibleStudents.map((student) => <div className="student-table-row" key={student.id}><div className="student-cell"><span className="admin-avatar">{student.name.split(" ").map((part) => part[0]).join("").slice(0, 2)}</span><p><b>{student.name}</b><small>{student.username}</small></p></div><span className={`status-pill ${student.suspended ? "suspended" : "active"}`}>{student.suspended ? "Suspended" : "Active"}</span><span>{student.grade ? `Primary ${student.grade}` : "Grade needs assignment"} · {student.allowedCurricula.length ? `${student.allowedCurricula.length} extra` : "Grade only"} · {student.bookletAccess ? "Booklets on" : "Booklets off"}</span><span>{student.activity}</span><div className="row-actions"><button type="button" onClick={() => void manageStudent(student, "suspend")}>{student.suspended ? "Activate" : "Suspend"}</button><button type="button" onClick={() => void manageStudent(student, "reset_password")}>Password</button><button type="button" onClick={() => void manageStudent(student, "update_access")}>Access</button></div></div>)}</div>
            {dataMessage && <p>{dataMessage}</p>}
          </section>
        </>}

        {section !== "Overview" && section !== "Students" && <section className="admin-empty-state"><h2>{section} management</h2><p>This section will be connected in the next stage.</p><button type="button" onClick={() => setSection("Overview")}>Back to overview</button></section>}
      </section>
    </main>
  );
}
