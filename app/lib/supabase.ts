import { createClient, type SupabaseClient } from "@supabase/supabase-js";

const supabaseUrl =
  process.env.NEXT_PUBLIC_SUPABASE_URL ??
  "https://tygekqfjytwbkvdkjcrg.supabase.co";

const supabasePublishableKey =
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ??
  "sb_publishable_QiA5NUT4QgIZCyQL3eXEIQ_m0xw3FBP";

const studentEmailDomain = "students.mrfarid.invalid";

let browserClient: SupabaseClient | undefined;

export type StudentProfile = {
  id: string;
  full_name: string;
  username: string;
  role: "student";
  created_at: string;
};

export function getSupabaseBrowserClient() {
  if (!browserClient) {
    browserClient = createClient(supabaseUrl, supabasePublishableKey, {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
        detectSessionInUrl: true,
      },
    });
  }

  return browserClient;
}

export function normalizeUsername(value: string) {
  return value.trim().toLowerCase();
}

export function isValidUsername(value: string) {
  return /^[a-z0-9._-]{4,30}$/.test(normalizeUsername(value));
}

export function usernameToStudentEmail(value: string) {
  return `${normalizeUsername(value)}@${studentEmailDomain}`;
}

export function friendlyAuthError(message: string) {
  const normalized = message.toLowerCase();

  if (normalized.includes("invalid login credentials")) {
    return "The username or password is incorrect.";
  }

  if (
    normalized.includes("already registered") ||
    normalized.includes("already been registered") ||
    normalized.includes("duplicate key")
  ) {
    return "This username is already in use. Please choose another one.";
  }

  if (normalized.includes("rate limit")) {
    return "Too many attempts. Please wait a few minutes and try again.";
  }

  if (normalized.includes("database error")) {
    return "Account setup is not active yet. Please contact Mr.Farid.";
  }

  return message;
}
