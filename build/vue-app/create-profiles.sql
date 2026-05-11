-- 创建 profiles 表
create table if not exists profiles (
  id uuid references auth.users not null primary key,
  nickname text,
  gender text check (gender in ('male', 'female', 'other')),
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);

-- 启用行级安全
alter table profiles enable row level security;

-- 删除已存在的策略（如果存在）
drop policy if exists "Profiles are viewable by everyone" on profiles;
drop policy if exists "Users can update their own profile" on profiles;

-- 任何人都可以查看个人资料（公开）
create policy "Profiles are viewable by everyone"
on profiles for select
using ( true );

-- 只有用户自己可以更新自己的资料
create policy "Users can update their own profile"
on profiles for update
using ( auth.uid() = id );

-- 删除已存在的函数和触发器（如果存在）
drop trigger if exists on_auth_user_created on auth.users;
drop function if exists public.handle_new_user();

-- 用户注册时自动创建 profile
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id)
  values (new.id);
  return new;
end;
$$ language plpgsql security definer;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();
