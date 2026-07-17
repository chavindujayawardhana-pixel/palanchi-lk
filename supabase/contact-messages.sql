-- New table for the Contact page's "Send us a message" form.
-- Run this in the Supabase SQL Editor (Project > SQL Editor > New query).
-- Safe to re-run.

create table if not exists public.contact_messages (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  subject text not null,
  message text not null,
  status text not null default 'unread' check (status in ('unread', 'read')),
  created_at timestamptz not null default now()
);

alter table public.contact_messages enable row level security;

-- Anyone can submit a message (the contact form has no login gate), always
-- starting "unread". Only admins can read/update them — via the admin
-- panel's service-role API routes (see lib/supabaseAdmin.ts), which bypass
-- RLS entirely, so no select/update policy is needed here at all.
drop policy if exists "Anyone can submit a contact message" on public.contact_messages;
create policy "Anyone can submit a contact message"
  on public.contact_messages for insert
  with check (status = 'unread');
