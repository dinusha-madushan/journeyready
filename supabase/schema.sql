-- Run this once in Supabase: SQL Editor > New query > Run.
create table if not exists public.plans (
  user_id uuid primary key references auth.users(id) on delete cascade,
  data jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now()
);

alter table public.plans enable row level security;

create policy "Users read own plan" on public.plans
  for select using (auth.uid() = user_id);
create policy "Users insert own plan" on public.plans
  for insert with check (auth.uid() = user_id);
create policy "Users update own plan" on public.plans
  for update using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "Users delete own plan" on public.plans
  for delete using (auth.uid() = user_id);
