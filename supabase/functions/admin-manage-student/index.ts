// @ts-nocheck
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.110.5";

const cors = {
  "Access-Control-Allow-Origin": "https://mrfarid.net",
  "Access-Control-Allow-Headers": "authorization, content-type, apikey, x-client-info",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};
const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), { status, headers: { ...cors, "Content-Type": "application/json" } });

Deno.serve(async (request) => {
  if (request.method === "OPTIONS") return new Response("ok", { headers: cors });
  if (request.method !== "POST") return json({ error: "Method not allowed" }, 405);
  const url = Deno.env.get("SUPABASE_URL");
  const key = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
  const authorization = request.headers.get("Authorization");
  if (!url || !key || !authorization?.startsWith("Bearer ")) return json({ error: "Authentication required" }, 401);
  const admin = createClient(url, key, { auth: { persistSession: false, autoRefreshToken: false } });
  const { data: { user } } = await admin.auth.getUser(authorization.slice(7));
  if (user?.app_metadata?.role !== "admin") return json({ error: "Administrator access required" }, 403);

  let body: Record<string, unknown>;
  try { body = await request.json(); } catch { return json({ error: "Invalid request" }, 400); }
  const userId = String(body.userId ?? "");
  if (!userId) return json({ error: "Student ID is required" }, 400);

  if (body.action === "suspend") {
    const suspended = Boolean(body.suspended);
    const { error } = await admin.auth.admin.updateUserById(userId, { ban_duration: suspended ? "876000h" : "none" });
    if (error) return json({ error: error.message }, 400);
    await admin.from("student_access").upsert({ user_id: userId, is_suspended: suspended, updated_at: new Date().toISOString() }, { onConflict: "user_id" });
    return json({ success: true, suspended });
  }
  if (body.action === "reset_password") {
    const password = String(body.password ?? "");
    if (password.length < 8) return json({ error: "Password must contain at least 8 characters" }, 400);
    const { error } = await admin.auth.admin.updateUserById(userId, { password });
    return error ? json({ error: error.message }, 400) : json({ success: true });
  }
  if (body.action === "update_access") {
    const grade = body.grade == null ? null : Number(body.grade);
    if (grade !== null && (!Number.isInteger(grade) || grade < 1 || grade > 6)) return json({ error: "Invalid grade" }, 400);
    const allowed = Array.isArray(body.allowedCurricula) ? body.allowedCurricula.map(String) : [];
    const { error } = await admin.from("student_access").upsert({
      user_id: userId,
      grade,
      allowed_curricula: allowed,
      booklet_access: Boolean(body.bookletAccess),
      updated_at: new Date().toISOString(),
    }, { onConflict: "user_id" });
    return error ? json({ error: error.message }, 400) : json({ success: true });
  }
  return json({ error: "Unknown action" }, 400);
});
