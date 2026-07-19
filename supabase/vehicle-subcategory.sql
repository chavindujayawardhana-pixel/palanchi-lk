-- Adds a subcategory tag for Vehicle listings ("For Rent" vs "For Hire", the
-- latter meaning a vehicle + driver service), plus a "per km" rental period
-- for hire-with-driver pricing.
-- Run this in the Supabase SQL Editor (Project > SQL Editor > New query).
-- Safe to re-run.

alter table public.advertisements add column if not exists subcategory text;

alter table public.advertisements drop constraint if exists advertisements_rental_period_check;
alter table public.advertisements add constraint advertisements_rental_period_check
  check (rental_period in ('perHour', 'perDay', 'perWeek', 'perMonth', 'perKm'));

alter table public.advertisements drop constraint if exists advertisements_subcategory_check;
alter table public.advertisements add constraint advertisements_subcategory_check
  check (subcategory is null or subcategory in ('forRent', 'forHire'));
