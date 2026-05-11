-- ============================================================
-- 完整数据库初始化脚本
-- 包含所有表、策略和功能
-- 管理员邮箱请自行替换
-- ============================================================

-- ============================================================
-- 1. Profiles 表
-- ============================================================

-- 创建 profiles 表
create table if not exists profiles (
  id uuid references auth.users not null primary key,
  nickname text,
  gender text check (gender in ('male', 'female', 'other')),
  avatar_url text,
  banned boolean default false,
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);

-- 添加注释
comment on column profiles.banned is '用户是否被封禁';
comment on column profiles.avatar_url is '用户头像 URL';

-- 启用行级安全
alter table profiles enable row level security;

-- 删除所有现有策略
do $$
declare
    pol record;
begin
    for pol in 
        select policyname 
        from pg_policies 
        where tablename = 'profiles'
    loop
        execute format('drop policy if exists %I on profiles', pol.policyname);
        raise notice 'Deleted profile policy: %', pol.policyname;
    end loop;
end $$;

-- Profiles RLS 策略
-- 所有人都可以查看 profiles（包括被封禁的用户）
create policy "Profiles are viewable by everyone"
on profiles for select
using ( true );

-- 管理员可以更新所有用户的资料（通过 JWT 中的 email 判断）
create policy "Admins can update all profiles"
on profiles for update
using (
  auth.jwt() ->> 'email' = 'your-admin-email@example.com'
  or auth.uid() = id
);

-- 管理员可以删除所有用户的资料
create policy "Admins can delete all profiles"
on profiles for delete
using (
  auth.jwt() ->> 'email' = 'your-admin-email@example.com'
  or auth.uid() = id
);

-- 用户可以插入自己的资料
create policy "Users can insert own profile"
on profiles for insert
with check ( auth.uid() = id );

-- 用户注册时自动创建 profile
drop trigger if exists on_auth_user_created on auth.users;
drop function if exists public.handle_new_user();

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


-- ============================================================
-- 2. User Posts 表
-- ============================================================

-- 创建 user_posts 表
create table if not exists user_posts (
  id uuid default gen_random_uuid() primary key,
  slug text unique not null,
  title text not null,
  content text not null,
  excerpt text,
  author_id uuid references auth.users not null,
  category text default '个人文章',
  color text default '#FF6B6B',
  published boolean default false,
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);

-- 创建索引
create index if not exists idx_user_posts_slug on user_posts(slug);
create index if not exists idx_user_posts_author on user_posts(author_id);
create index if not exists idx_user_posts_published on user_posts(published);
create index if not exists idx_user_posts_created_at on user_posts(created_at desc);

-- 启用行级安全
alter table user_posts enable row level security;

-- 删除所有现有策略
do $$
declare
    pol record;
begin
    for pol in 
        select policyname 
        from pg_policies 
        where tablename = 'user_posts'
    loop
        execute format('drop policy if exists %I on user_posts', pol.policyname);
        raise notice 'Deleted user_posts policy: %', pol.policyname;
    end loop;
end $$;

-- User Posts RLS 策略
-- 所有人都可以查看已发布的文章
create policy "Published posts are viewable by everyone"
on user_posts for select
using ( published = true );

-- 管理员可以查看所有文章（包括草稿）
create policy "Admins can view all posts"
on user_posts for select
using ( auth.jwt() ->> 'email' = 'your-admin-email@example.com' );

-- 用户可以查看自己的草稿
create policy "Users can view their own drafts"
on user_posts for select
using ( auth.uid() = author_id );

-- 登录用户可以创建文章
create policy "Users can insert their own posts"
on user_posts for insert
with check ( auth.uid() = author_id );

-- 管理员可以更新所有文章
create policy "Admins can update all posts"
on user_posts for update
using (
  auth.jwt() ->> 'email' = 'your-admin-email@example.com'
  or auth.uid() = author_id
);

-- 用户只能更新自己的文章
create policy "Users can update their own posts"
on user_posts for update
using ( auth.uid() = author_id );

-- 管理员可以删除所有文章
create policy "Admins can delete all posts"
on user_posts for delete
using (
  auth.jwt() ->> 'email' = 'your-admin-email@example.com'
  or auth.uid() = author_id
);

-- 用户只能删除自己的文章
create policy "Users can delete their own posts"
on user_posts for delete
using ( auth.uid() = author_id );


-- ============================================================
-- 3. Comments 表
-- ============================================================

-- 创建 comments 表
create table if not exists comments (
  id uuid default gen_random_uuid() primary key,
  post_slug text not null,
  user_id uuid references auth.users not null,
  content text not null,
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);

-- 创建索引以提高查询性能
create index if not exists idx_comments_post_slug on comments(post_slug);
create index if not exists idx_comments_user_id on comments(user_id);
create index if not exists idx_comments_created_at on comments(created_at desc);

-- 启用行级安全
alter table comments enable row level security;

-- 删除所有现有策略
do $$
declare
    pol record;
begin
    for pol in 
        select policyname 
        from pg_policies 
        where tablename = 'comments'
    loop
        execute format('drop policy if exists %I on comments', pol.policyname);
        raise notice 'Deleted comments policy: %', pol.policyname;
    end loop;
end $$;

-- Comments RLS 策略
-- 所有人都可以查看评论（公开读取）
create policy "Comments are viewable by everyone"
on comments for select
using ( true );

-- 只有登录用户可以插入评论
create policy "Users can insert their own comments"
on comments for insert
with check ( auth.uid() = user_id );

-- 管理员可以更新所有评论
create policy "Admins can update all comments"
on comments for update
using (
  auth.jwt() ->> 'email' = 'your-admin-email@example.com'
  or auth.uid() = user_id
);

-- 用户只能更新自己的评论
create policy "Users can update their own comments"
on comments for update
using ( auth.uid() = user_id );

-- 管理员可以删除所有评论
create policy "Admins can delete all comments"
on comments for delete
using (
  auth.jwt() ->> 'email' = 'your-admin-email@example.com'
  or auth.uid() = user_id
);

-- 用户只能删除自己的评论
create policy "Users can delete their own comments"
on comments for delete
using ( auth.uid() = user_id );


-- ============================================================
-- 4. Storage 存储桶策略
-- ============================================================

-- 创建 blog-images 存储桶
insert into storage.buckets (id, name, public)
values ('blog-images', 'blog-images', true)
on conflict (id) do nothing;

-- 启用行级安全
alter table storage.objects enable row level security;

-- 删除所有现有存储策略
do $$
declare
    pol record;
begin
    for pol in 
        select policyname 
        from pg_policies 
        where tablename = 'objects' and schemaname = 'storage'
    loop
        execute format('drop policy if exists %I on storage.objects', pol.policyname);
        raise notice 'Deleted storage policy: %', pol.policyname;
    end loop;
end $$;

-- Storage RLS 策略
-- 任何人都可以读取博客图片（公开访问）
create policy "Blog images are publicly accessible"
on storage.objects for select
using ( bucket_id = 'blog-images' );

-- 管理员可以管理所有图片
create policy "Admins can manage all blog images"
on storage.objects for all
using (
  auth.jwt() ->> 'email' = 'your-admin-email@example.com'
);

-- 登录用户可以上传图片
create policy "Users can upload blog images"
on storage.objects for insert
with check (
  bucket_id = 'blog-images' AND
  auth.role() = 'authenticated'
);

-- 用户可以更新自己上传的图片
create policy "Users can update their own blog images"
on storage.objects for update
using (
  bucket_id = 'blog-images' AND
  auth.uid() = owner
);

-- 用户可以删除自己上传的图片
create policy "Users can delete their own blog images"
on storage.objects for delete
using (
  bucket_id = 'blog-images' AND
  auth.uid() = owner
);


-- ============================================================
-- 5. 验证所有策略
-- ============================================================

select 
  schemaname,
  tablename,
  policyname,
  cmd,
  qual
from pg_policies 
where tablename in ('profiles', 'user_posts', 'comments')
   or (tablename = 'objects' and schemaname = 'storage')
order by tablename, policyname;
