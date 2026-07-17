-- Revert: allow guest (anonymous) ad posting again, alongside authenticated posting.
-- Run this in the Supabase SQL Editor (Project > SQL Editor > New query).
-- Safe to re-run: uses "drop policy if exists" before every "create policy".

-- 1. advertisements: allow both authenticated-owned and anonymous (guest) inserts
drop policy if exists "Anyone can submit a pending ad" on public.advertisements;
drop policy if exists "Authenticated users can submit their own pending ad" on public.advertisements;
create policy "Authenticated users can submit their own pending ad"
  on public.advertisements for insert
  to authenticated
  with check (status = 'pending' and auth.uid() = user_id);

drop policy if exists "Anonymous users can submit a pending ad" on public.advertisements;
create policy "Anonymous users can submit a pending ad"
  on public.advertisements for insert
  to anon
  with check (status = 'pending' and user_id is null);

-- 2. advertisement_images: allow attaching/managing images for guest ads (user_id is null) again.
-- Uses a security definer helper rather than an inline EXISTS: a pending,
-- ownerless ad isn't visible under advertisements' own SELECT policies to
-- an anonymous caller, so a plain subquery would see zero rows (and fail)
-- even though the ownership check itself should pass.
create or replace function public.can_manage_ad_images(ad_id uuid)
returns boolean
language sql
security definer
set search_path = public
stable
as $$
  select exists (
    select 1 from public.advertisements a
    where a.id = ad_id and (a.user_id = auth.uid() or a.user_id is null)
  );
$$;

drop policy if exists "Owners can add images to their own ads" on public.advertisement_images;
create policy "Owners can add images to their own ads"
  on public.advertisement_images for insert
  with check (public.can_manage_ad_images(advertisement_id));

drop policy if exists "Owners can update their own ad images" on public.advertisement_images;
create policy "Owners can update their own ad images"
  on public.advertisement_images for update
  using (public.can_manage_ad_images(advertisement_id));

drop policy if exists "Owners can delete their own ad images" on public.advertisement_images;
create policy "Owners can delete their own ad images"
  on public.advertisement_images for delete
  using (public.can_manage_ad_images(advertisement_id));

-- 3. storage: allow guest photo uploads again
drop policy if exists "Anyone can upload ad images" on storage.objects;
drop policy if exists "Authenticated users can upload ad images" on storage.objects;
create policy "Anyone can upload ad images"
  on storage.objects for insert
  with check (bucket_id = 'advertisement-images');
