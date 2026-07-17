-- Palanchi.lk database schema
-- Run this in the Supabase SQL Editor (Project > SQL Editor > New query).
-- Safe to re-run: uses "if not exists" / "on conflict" where practical.

create extension if not exists "pgcrypto";

-- =========================================================
-- TABLES
-- =========================================================

-- Public profile table. id mirrors auth.users(id) so that once Supabase Auth
-- is wired up, a row here can be created per authenticated user and RLS
-- policies based on auth.uid() work with no further migration.
create table if not exists public.users (
  id uuid primary key references auth.users (id) on delete cascade,
  first_name text,
  last_name text,
  email text unique,
  phone text,
  district text,
  town text,
  is_admin boolean not null default false,
  created_at timestamptz not null default now()
);

create table if not exists public.categories (
  id serial primary key,
  name_en text not null,
  name_si text not null,
  name_ta text not null,
  created_at timestamptz not null default now()
);

create table if not exists public.advertisements (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references public.users (id) on delete set null,
  title text not null,
  description text,
  category_id integer references public.categories (id) on delete set null,
  district text not null,
  town text not null,
  price numeric(12, 2) not null,
  rental_period text not null check (rental_period in ('perHour', 'perDay', 'perWeek', 'perMonth')),
  quantity integer not null default 1,
  condition text not null check (condition in ('new', 'used')),
  contact_name text not null,
  phone text not null,
  whatsapp text,
  email text,
  address text,
  map_link text,
  status text not null default 'pending' check (status in ('pending', 'approved', 'rejected', 'suspended')),
  featured boolean not null default false,
  created_at timestamptz not null default now()
);

create table if not exists public.advertisement_images (
  id uuid primary key default gen_random_uuid(),
  advertisement_id uuid not null references public.advertisements (id) on delete cascade,
  image_url text not null,
  is_cover boolean not null default false,
  sort_order integer not null default 0
);

-- =========================================================
-- SEED DATA — categories (matches lib/data.ts AD_CATEGORIES)
-- =========================================================

insert into public.categories (name_en, name_si, name_ta)
select * from (values
  ('Scaffolding', 'ස්කැෆෝල්ඩිං', 'ஸ்கஃபோல்டிங்'),
  ('Construction equipment', 'ඉදිකිරීම් උපකරණ', 'கட்டுமான உபகரணங்கள்'),
  ('Generators', 'ජනරේටර්', 'ஜெனரேட்டர்கள்'),
  ('Power tools', 'විදුලි මෙවලම්', 'மின் கருவிகள்'),
  ('Excavators', 'කැණීම් යන්ත්‍ර', 'அகழ்வாராய்ச்சி'),
  ('Backhoes', 'බැක්හෝ', 'பேக்ஹோ'),
  ('Forklifts', 'ෆෝක්ලිෆ්ට්', 'ஃபோர்க்லிஃப்ட்'),
  ('Rollers', 'රෝලර්', 'ரோலர்'),
  ('Containers', 'කන්ටේනර්', 'கொள்கலன்கள்'),
  ('Vehicles', 'වාහන', 'வாகனங்கள்'),
  ('Agricultural equipment', 'කෘෂිකාර්මික උපකරණ', 'விவசாய உபகரணங்கள்'),
  ('Electrical equipment', 'විදුලි උපකරණ', 'மின் உபகரணங்கள்'),
  ('Event equipment', 'උත්සව උපකරණ', 'நிகழ்வு உபகரணங்கள்'),
  ('Others', 'වෙනත්', 'மற்றவை')
) as seed (name_en, name_si, name_ta)
where not exists (select 1 from public.categories);

-- =========================================================
-- HELPER FUNCTION — admin check (avoids recursive RLS on public.users)
-- =========================================================

create or replace function public.is_admin()
returns boolean
language sql
security definer
set search_path = public
stable
as $$
  select coalesce((select is_admin from public.users where id = auth.uid()), false);
$$;

-- =========================================================
-- AUTH — create a matching public.users row on signup
-- =========================================================

-- Reads first_name/last_name/phone/district/town out of the metadata passed
-- to supabase.auth.signUp({ options: { data: {...} } }). Runs as part of the
-- auth.users insert itself (security definer), so it works regardless of
-- whether email confirmation is required — it doesn't depend on the new
-- user having an active session yet, unlike a client-side insert would.
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.users (id, first_name, last_name, email, phone, district, town)
  values (
    new.id,
    new.raw_user_meta_data ->> 'first_name',
    new.raw_user_meta_data ->> 'last_name',
    new.email,
    new.raw_user_meta_data ->> 'phone',
    new.raw_user_meta_data ->> 'district',
    new.raw_user_meta_data ->> 'town'
  )
  on conflict (id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- =========================================================
-- ROW LEVEL SECURITY
-- =========================================================

alter table public.users enable row level security;
alter table public.categories enable row level security;
alter table public.advertisements enable row level security;
alter table public.advertisement_images enable row level security;

-- ---- users ----

drop policy if exists "Users can view their own profile" on public.users;
create policy "Users can view their own profile"
  on public.users for select
  using (auth.uid() = id);

drop policy if exists "Admins can view all profiles" on public.users;
create policy "Admins can view all profiles"
  on public.users for select
  using (public.is_admin());

drop policy if exists "Users can insert their own profile" on public.users;
create policy "Users can insert their own profile"
  on public.users for insert
  with check (auth.uid() = id);

drop policy if exists "Users can update their own profile" on public.users;
create policy "Users can update their own profile"
  on public.users for update
  using (auth.uid() = id)
  with check (auth.uid() = id);

-- ---- categories (public read-only for now; managed via dashboard/service role) ----

drop policy if exists "Anyone can view categories" on public.categories;
create policy "Anyone can view categories"
  on public.categories for select
  using (true);

drop policy if exists "Admins can manage categories" on public.categories;
create policy "Admins can manage categories"
  on public.categories for all
  using (public.is_admin())
  with check (public.is_admin());

-- ---- advertisements ----

drop policy if exists "Anyone can view approved ads" on public.advertisements;
create policy "Anyone can view approved ads"
  on public.advertisements for select
  using (status = 'approved');

drop policy if exists "Owners can view their own ads" on public.advertisements;
create policy "Owners can view their own ads"
  on public.advertisements for select
  using (auth.uid() = user_id);

drop policy if exists "Admins can view all ads" on public.advertisements;
create policy "Admins can view all ads"
  on public.advertisements for select
  using (public.is_admin());

-- Posting requires an account: caller must be logged in and the ad's
-- user_id must be their own, and it always starts out "pending".
drop policy if exists "Anyone can submit a pending ad" on public.advertisements;
drop policy if exists "Authenticated users can submit their own pending ad" on public.advertisements;
create policy "Authenticated users can submit their own pending ad"
  on public.advertisements for insert
  with check (status = 'pending' and auth.uid() = user_id);

drop policy if exists "Owners can update their own ads" on public.advertisements;
create policy "Owners can update their own ads"
  on public.advertisements for update
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

drop policy if exists "Admins can update any ad" on public.advertisements;
create policy "Admins can update any ad"
  on public.advertisements for update
  using (public.is_admin())
  with check (public.is_admin());

-- Owners may only delete ads that aren't already live/suspended (the "My
-- Ads" page only offers delete for pending/rejected listings; enforced here
-- too so it can't be bypassed by calling the API directly).
drop policy if exists "Owners can delete their own ads" on public.advertisements;
drop policy if exists "Owners can delete their own pending or rejected ads" on public.advertisements;
create policy "Owners can delete their own pending or rejected ads"
  on public.advertisements for delete
  using (auth.uid() = user_id and status in ('pending', 'rejected'));

drop policy if exists "Admins can delete any ad" on public.advertisements;
create policy "Admins can delete any ad"
  on public.advertisements for delete
  using (public.is_admin());

-- Owners can update their own ads, but only admins may change `status` —
-- with one exception: an owner editing their ad may reset it to "pending"
-- themselves (e.g. after editing a live ad, so it goes back for re-review).
-- They still cannot set it to "approved"/"rejected"/"suspended" directly.
-- The admin panel's API routes use the service_role key (see lib/supabaseAdmin.ts),
-- which bypasses RLS but NOT triggers, so it must also be allowed here.
--
-- Deliberately NOT security definer: this function only needs to read
-- current_user (the actual calling role, e.g. service_role/anon/authenticated).
-- Security definer would replace current_user with the function owner for
-- the duration of the call, breaking that check. public.is_admin() still
-- elevates internally on its own, so this function doesn't need to.
create or replace function public.prevent_status_change_by_non_admin()
returns trigger
language plpgsql
set search_path = public
as $$
begin
  if new.status is distinct from old.status
     and new.status <> 'pending'
     and not public.is_admin()
     and current_user <> 'service_role' then
    raise exception 'Only admins can change advertisement status';
  end if;
  return new;
end;
$$;

drop trigger if exists trg_prevent_status_change on public.advertisements;
create trigger trg_prevent_status_change
  before update on public.advertisements
  for each row execute function public.prevent_status_change_by_non_admin();

-- ---- advertisement_images ----

drop policy if exists "Anyone can view images of approved ads" on public.advertisement_images;
create policy "Anyone can view images of approved ads"
  on public.advertisement_images for select
  using (
    exists (
      select 1 from public.advertisements a
      where a.id = advertisement_id and a.status = 'approved'
    )
  );

drop policy if exists "Owners can view their own ad images" on public.advertisement_images;
create policy "Owners can view their own ad images"
  on public.advertisement_images for select
  using (
    exists (
      select 1 from public.advertisements a
      where a.id = advertisement_id and a.user_id = auth.uid()
    )
  );

drop policy if exists "Admins can view all ad images" on public.advertisement_images;
create policy "Admins can view all ad images"
  on public.advertisement_images for select
  using (public.is_admin());

drop policy if exists "Owners can add images to their own ads" on public.advertisement_images;
create policy "Owners can add images to their own ads"
  on public.advertisement_images for insert
  with check (
    exists (
      select 1 from public.advertisements a
      where a.id = advertisement_id and a.user_id = auth.uid()
    )
  );

drop policy if exists "Owners can update their own ad images" on public.advertisement_images;
create policy "Owners can update their own ad images"
  on public.advertisement_images for update
  using (
    exists (
      select 1 from public.advertisements a
      where a.id = advertisement_id and a.user_id = auth.uid()
    )
  );

drop policy if exists "Owners can delete their own ad images" on public.advertisement_images;
create policy "Owners can delete their own ad images"
  on public.advertisement_images for delete
  using (
    exists (
      select 1 from public.advertisements a
      where a.id = advertisement_id and a.user_id = auth.uid()
    )
  );

drop policy if exists "Admins can manage all ad images" on public.advertisement_images;
create policy "Admins can manage all ad images"
  on public.advertisement_images for all
  using (public.is_admin())
  with check (public.is_admin());

-- =========================================================
-- STORAGE — bucket for advertisement photos
-- =========================================================

insert into storage.buckets (id, name, public)
values ('advertisement-images', 'advertisement-images', true)
on conflict (id) do nothing;

drop policy if exists "Public read access to ad images" on storage.objects;
create policy "Public read access to ad images"
  on storage.objects for select
  using (bucket_id = 'advertisement-images');

drop policy if exists "Anyone can upload ad images" on storage.objects;
drop policy if exists "Authenticated users can upload ad images" on storage.objects;
create policy "Authenticated users can upload ad images"
  on storage.objects for insert
  to authenticated
  with check (bucket_id = 'advertisement-images');
