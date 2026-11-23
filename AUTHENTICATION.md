# Authentication setup

Authentication uses the existing MySQL connection and the `users` table. The app does not create or migrate tables automatically.

## 1. Create or update the users table

For a fresh database, execute `database/users.sql` against the database configured by `DB_NAME`.

| Column | Purpose |
| --- | --- |
| `id` | Auto-incrementing primary key |
| `name` | Account holder name |
| `email` | Unique, normalized email address |
| `password_hash` | Salted scrypt password hash |
| `token_version` | Invalidates previously issued sessions when incremented |
| `created_at` | Account creation timestamp |

If you already created the table using the earlier schema, run `database/migrations/001_add_token_version_to_users.sql` once. Do not run it on a fresh table that already contains this column.

A UNIQUE index on email prevents duplicate registrations, including concurrent requests.

## 2. Configure the session secret

Add `AUTH_SECRET` to `.env.local`. It must contain at least 32 bytes of random secret material. Generate a value with:

    openssl rand -base64 32

Then set:

    AUTH_SECRET=your-generated-secret

Keep it private and do not commit it. Use the same secret across instances that validate the same sessions. Changing it invalidates existing cookies.

## 3. Authentication routes

| Method | Endpoint | Purpose |
| --- | --- | --- |
| POST | `/api/auth/register` | Create an account and sign it in |
| POST | `/api/auth/login` | Verify credentials and sign in |
| GET | `/api/auth/me` | Return the signed-in user |
| POST | `/api/auth/logout` | Revoke the session and clear the cookie |

The cookie is signed, HTTP-only, SameSite=Lax, Secure in production, and expires after seven days. Passwords are stored as salted scrypt hashes and never returned by the API.

## 4. Protected application access

- The Next.js 16 `proxy.ts` redirects unauthenticated visitors from `/appointments` to `/login`, preserving the requested path.
- Authenticated users visiting `/login` or `/register` are redirected to `/appointments`.
- Every appointment API checks the signed cookie against the current `users.token_version` in the database. Do not rely on proxy checks alone for API security.
- Logout increments `token_version`, revoking all existing sessions for that account, and clears the current browser cookie.
- Cookie-authenticated write endpoints reject a supplied Origin that does not match the request origin.

All signed-in accounts currently share the same appointment workspace. Per-user appointment ownership and role-based permissions are not part of this implementation.

## 5. Account policy

Registration accepts name, email, and password. Email addresses are trimmed and normalized to lowercase. Passwords must contain 8 to 128 characters. Login uses email; usernames and roles are not required.
