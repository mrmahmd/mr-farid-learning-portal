// @ts-nocheck
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.110.5";
const cors = { "Access-Control-Allow-Origin": "https://mrfarid.net", "Access-Control-Allow-Headers": "authorization, content-type, apikey, x-client-info", "Access-Control-Allow-Methods": "POST, OPTIONS" };
const json = (body: unknown, status = 200) => new Response(JSON.stringify(body), { status, headers: { ...cors, "Content-Type": "application/json" } });
const namedKey = (name: string) => JSON.parse(Deno.env.get(name) ?? "{}").default;

Deno.serve(async (request) => {
  if (request.method === "OPTIONS") return new Response("ok", { headers: cors });
  if (request.method !== "POST") return json({ error: "Method not allowed" }, 405);
  const url = Deno.env.get("SUPABASE_URL");
  const secretKey = namedKey("SUPABASE_SECRET_KEYS");
  const publicKey = namedKey("SUPABASE_PUBLISHABLE_KEYS");
  const authorization = request.headers.get("Authorization");
  if (!url || !secretKey || !publicKey || !authorization?.startsWith("Bearer ")) return json({ error: "Server authentication is not configured" }, 500);
  const verifier = createClient(url, publicKey, { auth: { persistSession: false, autoRefreshToken: false } });
  const { data: { user } } = await verifier.auth.getUser(authorization.slice(7));
  if (user?.app_metadata?.role !== "admin") return json({ error: "Administrator access required" }, 403);
  let body: any;
  try { body = await request.json(); } catch { return json({ error: "Invalid request" }, 400); }
  const userId = String(body.userId ?? "");
  if (!userId) return json({ error: "Student ID is required" }, 400);
  const updateAuth = async (payload: any) => {
    const response = await fetch(`${url}/auth/v1/admin/users/${userId}`, { method: "PUT", headers: { apikey: secretKey, "Content-Type": "application/json" }, body: JSON.stringify(payload) });
    return { response, data: await response.json() };
  };
  const saveAccess = (payload: any) => fetch(`${url}/rest/v1/student_access?on_conflict=user_id`, { method: "POST", headers: { apikey: secretKey, "Content-Type": "application/json", Prefer: "resolution=merge-duplicates" }, body: JSON.stringify({ user_id: userId, ...payload, updated_at: new Date().toISOString() }) });
  if (body.action === "suspend") {
    const suspended = Boolean(body.suspended);
    const { response, data } = await updateAuth({ ban_duration: suspended ? "876000h" : "none" });
    if (!response.ok) return json({ error: data.msg ?? data.message ?? "Could not update account" }, response.status);
    const saved = await saveAccess({ is_suspended: suspended });
    return saved.ok ? json({ success: true, suspended }) : json({ error: "Access record could not be saved" }, 500);
  }
  if (body.action === "reset_password") {
    const password = String(body.password ?? "");
    if (password.length < 8) return json({ error: "Password must contain at least 8 characters" }, 400);
    const { response, data } = await updateAuth({ password });
    return response.ok ? json({ success: true }) : json({ error: data.msg ?? data.message ?? "Could not reset password" }, response.status);
  }
  if (body.action === "update_access") {
    const grade = body.grade == null ? null : Number(body.grade);
    if (grade !== null && (!Number.isInteger(grade) || grade < 1 || grade > 6)) return json({ error: "Invalid grade" }, 400);
    const allowed = Array.isArray(body.allowedCurricula) ? body.allowedCurricula.map(String) : [];
    const saved = await saveAccess({ grade, allowed_curricula: allowed, booklet_access: Boolean(body.bookletAccess) });
    return saved.ok ? json({ success: true }) : json({ error: await saved.text() }, saved.status);
  }
  return json({ error: "Unknown action" }, 400);
});
