-- Winter Arc : table des joueurs + règles d'accès.
-- À coller dans Supabase > SQL Editor, puis cliquer sur Run.

create table if not exists public.players (
  id uuid primary key references auth.users(id) on delete cascade,
  data jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now()
);

alter table public.players enable row level security;

grant select, insert, update on public.players to authenticated;

-- Tous les joueurs connectés voient le classement et les duels.
create policy "joueurs : lecture" on public.players
  for select to authenticated using (true);

-- Chacun ne peut créer et modifier que son propre profil.
create policy "joueurs : création de son profil" on public.players
  for insert to authenticated with check ((select auth.uid()) = id);

create policy "joueurs : modification de son profil" on public.players
  for update to authenticated using ((select auth.uid()) = id) with check ((select auth.uid()) = id);
