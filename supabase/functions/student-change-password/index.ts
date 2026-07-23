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
  const { data: { user }, error: userError } = await verifier.auth.getUser(authorization.slice(7));
  if (userError || !user) return json({ error: "Student authentication required" }, 401);

  let input: any;
  try { input = await request.json(); } catch { return json({ error: "Invalid request" }, 400); }
  const password = String(input.password ?? "");
  if (password.length < 8) return json({ error: "Password must contain at least 8 characters" }, 400);

  const updateResponse = await fetch(`${url}/auth/v1/admin/users/${user.id}`, {
    method: "PUT",
    headers: { apikey: secretKey, "Content-Type": "application/json" },
    body: JSON.stringify({ password }),
  });
  const updateData = await updateResponse.json();
  if (!updateResponse.ok) return json({ error: updateData.msg ?? updateData.message ?? "Could not change password" }, updateResponse.status);

  const accessResponse = await fetch(`${url}/rest/v1/student_access?user_id=eq.${user.id}`, {
    method: "PATCH",
    headers: { apikey: secretKey, "Content-Type": "application/json", Prefer: "return=minimal" },
    body: JSON.stringify({ must_change_password: false, updated_at: new Date().toISOString() }),
  });
  return accessResponse.ok ? json({ success: true }) : json({ error: "Password changed but account setup could not be completed" }, 500);
});
