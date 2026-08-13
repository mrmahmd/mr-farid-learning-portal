"use client";

import { useEffect, useState } from "react";
import { getCurriculumContent } from "./content-registry";
import { getSupabaseBrowserClient } from "./supabase";

export type StudentAccessState = {
  loading: boolean;
  signedIn: boolean;
  suspended: boolean;
  grade: number | null;
  accessMode: "sample" | "grade" | "custom" | "all" | "none";
  mustChangePassword: boolean;
  allowedCurricula: string[];
  bookletAccess: boolean;
};

const initialState: StudentAccessState = {
  loading: true,
  signedIn: false,
  suspended: false,
  grade: null,
  accessMode: "none",
  mustChangePassword: false,
  allowedCurricula: [],
  bookletAccess: false,
};

export function useStudentAccess() {
  const [state, setState] = useState<StudentAccessState>(initialState);

  useEffect(() => {
    let active = true;
    const supabase = getSupabaseBrowserClient();

    async function loadAccess() {
      const { data: sessionData } = await supabase.auth.getSession();
      const session = sessionData.session;
      if (!active) return;
      if (!session) {
        setState({ ...initialState, loading: false });
        return;
      }

      const { data } = await supabase
        .from("student_access")
        .select("is_suspended, grade, access_mode, allowed_curricula, booklet_access, must_change_password")
        .eq("user_id", session.user.id)
        .maybeSingle();

      if (!active) return;
      const candidateMode = data?.access_mode;
      const accessMode: StudentAccessState["accessMode"] = typeof candidateMode === "string"
        && ["sample", "grade", "custom", "all", "none"].includes(candidateMode)
        ? candidateMode as StudentAccessState["accessMode"]
        : "none";
      setState({
        loading: false,
        signedIn: true,
        suspended: data?.is_suspended ?? false,
        grade: typeof data?.grade === "number" ? data.grade : null,
        accessMode,
        mustChangePassword: data?.must_change_password === true,
        allowedCurricula: Array.isArray(data?.allowed_curricula) ? data.allowed_curricula : [],
        bookletAccess: data?.booklet_access !== false,
      });
    }

    void loadAccess();
    const { data: listener } = supabase.auth.onAuthStateChange(() => void loadAccess());
    return () => {
      active = false;
      listener.subscription.unsubscribe();
    };
  }, []);

  return state;
}

export function canOpenGrade(grade: number, access: StudentAccessState) {
  return access.signedIn && !access.suspended && (
    access.accessMode === "all" ||
    (access.accessMode === "sample" && access.allowedCurricula.includes("__sample_all__")) ||
    ((access.accessMode === "grade" || access.accessMode === "sample") && access.grade === grade)
  );
}

export function canOpenCurriculum(slug: string, grade: number, access: StudentAccessState) {
  const curriculum = getCurriculumContent(slug);
  if (!curriculum || curriculum.availability !== "available" || curriculum.grade !== grade) {
    return false;
  }

  return canOpenGrade(grade, access)
    || (access.signedIn
      && !access.suspended
      && access.accessMode === "custom"
      && access.allowedCurricula.includes(curriculum.slug));
}

export function isSampleAccess(grade: number, access: StudentAccessState) {
  return access.signedIn && !access.suspended && access.accessMode === "sample" && (
    access.allowedCurricula.includes("__sample_all__") || access.grade === grade
  );
}

export function isSampleAllAccess(access: StudentAccessState) {
  return access.signedIn && !access.suspended && access.accessMode === "sample" && access.allowedCurricula.includes("__sample_all__");
}

export function canDownloadBooklets(access: StudentAccessState) {
  return access.signedIn && !access.suspended && access.bookletAccess
    && (access.accessMode === "grade" || access.accessMode === "all");
}
