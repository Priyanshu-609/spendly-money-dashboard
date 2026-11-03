create table if not exists public.spendly_workspaces (
  user_id uuid primary key references auth.users (id) on delete cascade,
  workspace jsonb not null default '{}'::jsonb check (jsonb_typeof(workspace) = 'object'),
  updated_at timestamptz not null default now()
);

alter table public.spendly_workspaces enable row level security;
revoke all on table public.spendly_workspaces from anon, authenticated;
grant select, insert, update, delete on table public.spendly_workspaces to authenticated;

drop policy if exists "Users read their own Spendly workspace" on public.spendly_workspaces;
create policy "Users read their own Spendly workspace"
  on public.spendly_workspaces for select to authenticated
  using ((select auth.uid()) = user_id);

drop policy if exists "Users create their own Spendly workspace" on public.spendly_workspaces;
create policy "Users create their own Spendly workspace"
  on public.spendly_workspaces for insert to authenticated
  with check ((select auth.uid()) = user_id);

drop policy if exists "Users update their own Spendly workspace" on public.spendly_workspaces;
create policy "Users update their own Spendly workspace"
  on public.spendly_workspaces for update to authenticated
  using ((select auth.uid()) = user_id)
  with check ((select auth.uid()) = user_id);

drop policy if exists "Users delete their own Spendly workspace" on public.spendly_workspaces;
create policy "Users delete their own Spendly workspace"
  on public.spendly_workspaces for delete to authenticated
  using ((select auth.uid()) = user_id);
