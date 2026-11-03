# Connect Spendly sign-in and cloud sync

Spendly supports passwordless one-time codes by email or SMS. Once connected, each signed-in user gets a private workspace that syncs between devices. A signed-out visitor continues to use browser storage.

## 1. Create the database table

Create a Supabase project, open its SQL Editor, and run [`supabase/schema.sql`](supabase/schema.sql). The table has row-level security policies so an authenticated user can access only the row whose `user_id` matches their Supabase user ID. Do not disable RLS.

## 2. Set up email codes

Enable email sign-in in Supabase Auth. Spendly asks for a numeric one-time code, so the email template must include the OTP token (`{{ .Token }}`). Supabase's default mail service is intended for limited testing; configure a custom SMTP provider before inviting general users so codes can be delivered to their addresses.

## 3. Set up phone codes

Enable phone sign-in and configure an SMS provider in Supabase Auth. Phone numbers must be entered in international format, for example `+919876543210`. SMS providers may charge per message and may require country-specific sender registration.

## 4. Add the browser-safe project values

In the Supabase project, copy the Project URL and the **publishable** API key (or legacy anon key) into `supabase-config.js`:

```js
window.SPENDLY_SUPABASE_CONFIG = {
  url: 'https://your-project.supabase.co',
  publishableKey: 'sb_publishable_…',
};
```

The URL and publishable key are designed for browser use. Never put a service-role or secret key in this file, in GitHub, or in a browser app. Row-level security must remain enabled because the publishable key is visible to visitors.

Set the Supabase Auth Site URL to `https://priyanshu-609.github.io/spendly-money-dashboard/`. Use the same email or phone on every device. Email and phone sign-in identifiers may be separate accounts unless explicitly linked in Supabase.

## Existing browser entries

When an account has no saved workspace, Spendly asks whether to import the entries from the current browser. If the account already has cloud data, that account's copy is loaded. Signing out keeps cloud data in the account and returns the app to its local workspace. The local backup is not deleted by sign-out.

## Official setup references

- [Passwordless email sign-in](https://supabase.com/docs/guides/auth/auth-email-passwordless)
- [Phone sign-in](https://supabase.com/docs/guides/auth/phone-login)
- [Configure custom SMTP](https://supabase.com/docs/guides/auth/auth-smtp)
- [Row-level security](https://supabase.com/docs/guides/database/postgres/row-level-security)
- [Supabase API keys](https://supabase.com/docs/guides/getting-started/api-keys)
