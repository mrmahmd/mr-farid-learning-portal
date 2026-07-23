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

  const supabaseUrl = Deno.env.get("SUPABASE_URL");
  const serviceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
  if (!supabaseUrl || !serviceRoleKey) return json({ error: "Server configuration is incomplete" }, 500);

  const authorization = request.headers.get("Authorization");
  if (!authorization?.startsWith("Bearer ")) return json({ error: "Authentication required" }, 401);

  const adminClient = createClient(supabaseUrl, serviceRoleKey, { auth: { autoRefreshToken: false, persistSession: false } });
  const token = authorization.slice("Bearer ".length);
  const { data: { user }, error: userError } = await adminClient.auth.getUser(token);
  if (userError || user?.app_metadata?.role !== "admin") return json({ error: "Administrator access required" }, 403);

  let input: { fullName?: string; password?: string; grade?: number };
  try { input = await request.json(); } catch { return json({ error: "Invalid JSON" }, 400); }
  const fullName = input.fullName?.trim() ?? "";
  const password = input.password ?? "";
  if (fullName.length < 3 || fullName.length > 100) return json({ error: "Full name must be 3–100 characters" }, 400);
  if (password.length < 8) return json({ error: "Password must contain at least 8 characters" }, 400);
  if (input.grade !== undefined && (!Number.isInteger(input.grade) || input.grade < 1 || input.grade > 6)) return json({ error: "Grade must be between 1 and 6" }, 400);

  const { data: profiles, error: profilesError } = await adminClient.from("profiles").select("username").like("username", "st-%");
  if (profilesError) return json({ error: profilesError.message }, 500);
  const nextNumber = (profiles ?? []).reduce((max, row) => {
    const match = String(row.username ?? "").match(/^st-(\\d{3,})$/i);
    return match ? Math.max(max, Number(match[1])) : max;
  }, 0) + 1;
  const username = `ST-${String(nextNumber).padStart(3, "0")}`;
  const email = `${username.toLowerCase()}@students.mrfarid.invalid`;

  const { data: created, error: createError } = await adminClient.auth.admin.createUser({
    email,
    password,
    email_confirm: true,
    user_metadata: { full_name: fullName, username: username.toLowerCase(), grade: input.grade ?? null },
  });
  if (createError || !created.user) return json({ error: createError?.message ?? "Could not create account" }, 400);

  return json({ username, studentId: created.user.id, fullName, grade: input.grade ?? null });
});
