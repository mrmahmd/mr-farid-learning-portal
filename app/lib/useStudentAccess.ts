"use client";

import { useEffect, useState } from "react";
import { getSupabaseBrowserClient } from "./supabase";

export type StudentAccessState = {
  loading: boolean;
  signedIn: boolean;
  suspended: boolean;
  grade: number | null;
  allowedCurricula: string[];
  bookletAccess: boolean;
};

const initialState: StudentAccessState = {
  loading: true,
  signedIn: false,
  suspended: false,
  grade: null,
  allowedCurricula: [],
  bookletAccess: true,
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
        .select("is_suspended, grade, allowed_curricula, booklet_access")
        .eq("user_id", session.user.id)
        .maybeSingle();

      if (!active) return;
      setState({
        loading: false,
        signedIn: true,
        suspended: data?.is_suspended ?? false,
        grade: typeof data?.grade === "number" ? data.grade : null,
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
  if (!access.signedIn || access.suspended) return false;
  if (access.grade === null) return false;
  if (access.grade === grade) return true;
  return access.allowedCurricula.some((slug) => slug.endsWith(`primary-${grade}`));
}

export function canOpenCurriculum(slug: string, grade: number, access: StudentAccessState) {
  return canOpenGrade(grade, access) || access.allowedCurricula.includes(slug);
}
