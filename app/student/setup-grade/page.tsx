"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { InnerPageShell } from "../../components/InnerPageShell";
import { getSupabaseBrowserClient } from "../../lib/supabase";

const grades = [1, 2, 3, 4, 5, 6];

export default function StudentGradeSetupPage() {
  const [selectedGrade, setSelectedGrade] = useState<number | null>(null);
  const [message, setMessage] = useState("Checking your account...");
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const router = useRouter();

  useEffect(() => {
    let active = true;
    async function verifyAccount() {
      const supabase = getSupabaseBrowserClient();
      const { data: sessionData } = await supabase.auth.getSession();
      if (!sessionData.session) {
        router.replace("/login");
        return;
      }
      const { data, error } = await supabase
        .from("student_access")
        .select("grade, is_suspended")
        .eq("user_id", sessionData.session.user.id)
        .maybeSingle();
      if (!active) return;
      if (error || !data) {
        setMessage("We could not load your account. Please contact Mr.Farid.");
        setIsLoading(false);
        return;
      }
      if (data.is_suspended) {
        await supabase.auth.signOut();
        router.replace("/login");
        return;
      }
      if (typeof data.grade === "number") {
        router.replace("/student/dashboard");
        return;
      }
      setMessage("");
      setIsLoading(false);
    }
    void verifyAccount();
    return () => { active = false; };
  }, [router]);

  async function saveGrade() {
    if (!selectedGrade || isSaving) return;
    setIsSaving(true);
    setMessage("Saving your grade...");
    const supabase = getSupabaseBrowserClient();
    const { data: sessionData } = await supabase.auth.getSession();
    if (!sessionData.session) {
      router.replace("/login");
      return;
    }
    const { data, error } = await supabase
      .from("student_access")
      .update({ grade: selectedGrade })
      .eq("user_id", sessionData.session.user.id)
      .is("grade", null)
      .select("grade")
      .single();
    if (error || !data) {
      setMessage(error?.message ?? "The grade could not be saved. Please contact Mr.Farid.");
      setIsSaving(false);
      return;
    }
    router.replace("/student/dashboard");
  }

  async function signOut() {
    await getSupabaseBrowserClient().auth.signOut();
    router.replace("/");
  }

  return (
    <InnerPageShell className="grade-setup-page">
      <section className="grade-setup-card">
        <span className="mini-logo">MF</span>
        <div className="grade-setup-heading">
          <p className="eyebrow"><span /> Complete your account</p>
          <h1>Choose Your Primary Grade</h1>
          <p>Select your real grade so the portal can show only the curricula, games and booklets prepared for you.</p>
        </div>
        <div className="grade-setup-arabic" dir="rtl">
          <h2>اختر مرحلتك الدراسية</h2>
          <p>اختر صفك الدراسي الصحيح حتى تعرض لك المنصة المناهج والألعاب والبوكلتس الخاصة بمرحلتك فقط.</p>
        </div>

        {isLoading ? <p className="form-message">{message}</p> : (
          <>
            <div className="grade-choice-grid" role="radiogroup" aria-label="Choose primary grade">
              {grades.map((grade) => (
                <button
                  className={selectedGrade === grade ? "grade-choice selected" : "grade-choice"}
                  type="button"
                  role="radio"
                  aria-checked={selectedGrade === grade}
                  onClick={() => setSelectedGrade(grade)}
                  key={grade}
                >
                  <small>الصف</small>
                  <strong>Primary {grade}</strong>
                </button>
              ))}
            </div>
            <div className="grade-choice-warning">
              <b>Important · مهم</b>
              <span>Choose carefully. To change your grade later, contact Mr.Farid on WhatsApp.</span>
              <span dir="rtl">اختر بعناية. لتغيير المرحلة بعد ذلك تواصل مع مستر فريد عبر واتساب.</span>
            </div>
            <button className="primary-button grade-confirm-button" type="button" disabled={!selectedGrade || isSaving} onClick={() => void saveGrade()}>
              {isSaving ? "Saving..." : "Confirm My Grade · تأكيد المرحلة"}
            </button>
            {message && <p className="form-message error">{message}</p>}
          </>
        )}
        <button className="grade-setup-signout" type="button" onClick={() => void signOut()}>Sign Out · تسجيل الخروج</button>
      </section>
    </InnerPageShell>
  );
}
