# Supabase setup for Mr.Farid Learning Portal

Only two dashboard actions are required. No guardian email or extra student data is used.

1. Open **SQL Editor** in the Supabase dashboard, create a new query, paste `setup.sql`, then press **Run** once.
2. Open **Authentication → Providers → Email** and turn off **Confirm email**. The portal uses a private internal account identifier because students sign in with usernames, not real email addresses.

The public publishable key is used by the browser. Never add a secret key, service-role key or database password to the website or GitHub.

Password recovery is handled by contacting Mr.Farid through the WhatsApp link in the login form.
