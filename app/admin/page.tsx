"use client";

import { useState } from "react";
import Link from "next/link";

const students = [
  { name: "Ahmed Mohamed", username: "ahmed2026", status: "Active", course: "English Primary 1", progress: 68, activity: "Practice question 9" },
  { name: "Sara Ali", username: "sara_ali", status: "Active", course: "Connect Plus Primary 4", progress: 42, activity: "Vocabulary Flashcards" },
  { name: "Omar Hassan", username: "omar.h", status: "Suspended", course: "English Primary 3", progress: 19, activity: "Unit 2 overview" },
];

export default function AdminDashboardPage() {
  const [section, setSection] = useState("Overview");
  const [query, setQuery] = useState("");
  const visibleStudents = students.filter((student) => `${student.name} ${student.username}`.toLowerCase().includes(query.toLowerCase()));

  return (
    <main className="admin-page">
      <aside className="admin-sidebar">
        <Link href="/" className="admin-brand"><span>MF</span><div><b>Mr.Farid</b><small>Admin Control Center</small></div></Link>
        <div className="admin-nav-label">CONTROL CENTER</div>
        {["Overview", "Students", "Curricula", "Booklets", "Activity Log", "Settings"].map((item) => <button key={item} className={section === item ? "admin-nav-item active" : "admin-nav-item"} onClick={() => setSection(item)}>{item === "Overview" ? "⌂" : item === "Students" ? "♙" : item === "Curricula" ? "▦" : item === "Booklets" ? "▤" : item === "Activity Log" ? "◷" : "⚙"}<span>{item}</span></button>)}
        <Link href="/" className="admin-back-link">← Back to Portal</Link>
      </aside>

      <section className="admin-content">
        <header className="admin-topbar"><div><span className="panel-kicker">ADMINISTRATION</span><h1>{section}</h1><p>Manage students, learning access, and portal resources.</p></div><div className="admin-account"><span className="admin-status-dot" /> Mr. Mohamed Farid</div></header>

        {section === "Overview" && <>
          <div className="admin-alert"><span>◈</span><div><b>Control center preview</b><p>Data actions will be enabled after the administrator role and policies are connected.</p></div><button type="button">Review setup</button></div>
          <div className="admin-stats"><article><span>Students</span><strong>128</strong><small>+12 this month</small></article><article><span>Active today</span><strong>34</strong><small>26.5% of accounts</small></article><article><span>Courses open</span><strong>8</strong><small>Across 4 grades</small></article><article><span>Booklet downloads</span><strong>246</strong><small>This month</small></article></div>
          <div className="admin-grid-two"><section className="admin-panel"><div className="admin-panel-heading"><div><span className="panel-kicker">RECENT ACTIVITY</span><h2>Student learning activity</h2></div><button type="button" onClick={() => setSection("Activity Log")}>View all</button></div><div className="activity-list"><div><span className="activity-avatar blue">AM</span><p><b>Ahmed Mohamed</b><small>Completed Practice question 9 · English Primary 1</small></p><time>2 min ago</time></div><div><span className="activity-avatar green">SA</span><p><b>Sara Ali</b><small>Opened Vocabulary Flashcards · Connect Plus Primary 4</small></p><time>18 min ago</time></div><div><span className="activity-avatar pink">OH</span><p><b>Omar Hassan</b><small>Account suspended by administrator</small></p><time>1 hr ago</time></div></div></section><section className="admin-panel access-panel"><div className="admin-panel-heading"><div><span className="panel-kicker">ACCESS CONTROL</span><h2>Quick controls</h2></div></div><button type="button" disabled>＋ Create student account</button><button type="button" disabled>▣ Manage curriculum access</button><button type="button" disabled>↗ Export activity report</button><small>Controls activate after secure Supabase policies are configured.</small></section></div>
        </>}

        {section === "Students" && <section className="admin-panel"><div className="admin-panel-heading"><div><span className="panel-kicker">STUDENT ACCOUNTS</span><h2>Manage students</h2></div><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search name or username" /></div><div className="student-table"><div className="student-table-head"><span>Student</span><span>Status</span><span>Curriculum</span><span>Progress</span><span>Actions</span></div>{visibleStudents.map((student) => <div className="student-table-row" key={student.username}><div className="student-cell"><span className="admin-avatar">{student.name.split(" ").map((part) => part[0]).join("")}</span><p><b>{student.name}</b><small>@{student.username}</small></p></div><span className={`status-pill ${student.status.toLowerCase()}`}>{student.status}</span><span>{student.course}</span><div><b>{student.progress}%</b><div className="mini-progress"><i style={{ width: `${student.progress}%` }} /></div></div><div className="row-actions"><button type="button" disabled>Open</button><button type="button" disabled>{student.status === "Suspended" ? "Activate" : "Suspend"}</button></div></div>)}</div></section>}

        {section !== "Overview" && section !== "Students" && <section className="admin-empty-state"><span>✦</span><h2>{section} management</h2><p>This section is designed and ready for secure Supabase data actions.</p><button type="button" onClick={() => setSection("Overview")}>Back to overview</button></section>}
      </section>
    </main>
  );
}
