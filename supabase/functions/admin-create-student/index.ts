// @ts-nocheck
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.110.5";
const cors = { "Access-Control-Allow-Origin": "https://www.mrfarid.net", "Access-Control-Allow-Headers": "authorization, content-type, apikey, x-client-info", "Access-Control-Allow-Methods": "POST, OPTIONS" };
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
  const { data: { user }, error: userError } = await verifier.auth.getUser(authorization.slice(7));
  if (userError || user?.app_metadata?.role !== "admin") return json({ error: "Administrator access required" }, 403);
  let input: any;
  try { input = await request.json(); } catch { return json({ error: "Invalid JSON" }, 400); }
  const fullName = String(input.fullName ?? "").trim();
  const password = String(input.password ?? "");
  const grade = Number(input.grade ?? 1);
  if (fullName.length < 3 || fullName.length > 100) return json({ error: "Full name must be 3-100 characters" }, 400);
  if (password.length < 8) return json({ error: "Password must contain at least 8 characters" }, 400);
  if (!Number.isInteger(grade) || grade < 1 || grade > 6) return json({ error: "Grade must be between 1 and 6" }, 400);
  const profilesResponse = await fetch(`${url}/rest/v1/profiles?select=username&username=ilike.st-%25`, { headers: { apikey: secretKey, Authorization: `Bearer ${secretKey}` } });
  const profiles = profilesResponse.ok ? await profilesResponse.json() : [];
  const next = (profiles ?? []).reduce((max: number, row: any) => {
    const match = String(row.username ?? "").match(/^st-(\d{3,})$/i);
    return match ? Math.max(max, Number(match[1])) : max;
  }, 0) + 1;
  const username = `ST-${String(next).padStart(3, "0")}`;
  const email = `${username.toLowerCase()}@students.mrfarid.invalid`;
  const createdResponse = await fetch(`${url}/auth/v1/admin/users`, {
    method: "POST",
    headers: { apikey: secretKey, "Content-Type": "application/json" },
    body: JSON.stringify({ email, password, email_confirm: true, user_metadata: { full_name: fullName, username: username.toLowerCase(), grade } }),
  });
  const created = await createdResponse.json();
  if (!createdResponse.ok) return json({ error: created.msg ?? created.message ?? created.error_description ?? "Could not create account" }, createdResponse.status);
  await fetch(`${url}/rest/v1/student_access?on_conflict=user_id`, {
    method: "POST",
    headers: { apikey: secretKey, "Content-Type": "application/json", Prefer: "resolution=merge-duplicates" },
    body: JSON.stringify({ user_id: created.id, grade, access_mode: "grade", allowed_curricula: [], booklet_access: true, must_change_password: true }),
  });
  return json({ username, studentId: created.id, fullName, grade });
});
