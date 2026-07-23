# Supabase Edge Functions

`admin-create-student` creates a student account only after validating the caller's access token and checking `user.app_metadata.role === "admin"`.

Required server secrets are supplied by Supabase automatically (`SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY`). The service-role key must never be copied into the Next.js/GitHub Pages client.
