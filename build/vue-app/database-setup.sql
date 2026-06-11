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
-- 5. User Favorites 表（用户收藏）
-- ============================================================

-- 创建 user_favorites 表
create table if not exists user_favorites (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users not null,
  item_id text not null,
  item_type text check (item_type in ('test', 'blog')) not null,
  item_title text,
  item_description text,
  item_icon text,
  item_color text,
  created_at timestamp with time zone default now(),
  unique(user_id, item_id)
);

-- 添加注释
comment on table user_favorites is '用户收藏表，存储用户收藏的测试和文章';
comment on column user_favorites.user_id is '用户ID';
comment on column user_favorites.item_id is '项目ID，格式为 test:mbti 或 blog:cpp-guide';
comment on column user_favorites.item_type is '项目类型：test 或 blog';
comment on column user_favorites.item_title is '项目标题';
comment on column user_favorites.item_description is '项目描述';
comment on column user_favorites.item_icon is '项目图标';
comment on column user_favorites.item_color is '项目颜色';

-- 创建索引
create index if not exists idx_user_favorites_user_id on user_favorites(user_id);
create index if not exists idx_user_favorites_item_id on user_favorites(item_id);
create index if not exists idx_user_favorites_item_type on user_favorites(item_type);
create index if not exists idx_user_favorites_created_at on user_favorites(created_at desc);

-- 启用行级安全
alter table user_favorites enable row level security;

-- 删除所有现有策略
do $$
declare
    pol record;
begin
    for pol in 
        select policyname 
        from pg_policies 
        where tablename = 'user_favorites'
    loop
        execute format('drop policy if exists %I on user_favorites', pol.policyname);
    end loop;
end $$;

-- User Favorites RLS 策略
create policy "Users can view their own favorites"
on user_favorites for select
using ( auth.uid() = user_id );

create policy "Admins can view all favorites"
on user_favorites for select
using ( auth.jwt() ->> 'email' = 'your-admin-email@example.com' );

create policy "Users can insert their own favorites"
on user_favorites for insert
with check ( auth.uid() = user_id );

create policy "Users can delete their own favorites"
on user_favorites for delete
using ( auth.uid() = user_id );

create policy "Admins can delete all favorites"
on user_favorites for delete
using ( auth.jwt() ->> 'email' = 'your-admin-email@example.com' );


-- ============================================================
-- 6. User Test History 表（测试历史）
-- ============================================================

-- 创建 user_test_history 表
create table if not exists user_test_history (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users not null,
  test_id text not null,
  test_title text,
  score integer,
  max_score integer,
  level text,
  answers jsonb,
  completed_at timestamp with time zone default now()
);

-- 添加注释
comment on table user_test_history is '用户测试历史表，存储用户的测试结果';
comment on column user_test_history.user_id is '用户ID';
comment on column user_test_history.test_id is '测试ID，如 mbti, depression';
comment on column user_test_history.test_title is '测试标题';
comment on column user_test_history.score is '测试得分';
comment on column user_test_history.max_score is '测试满分';
comment on column user_test_history.level is '测试等级或结果类型';
comment on column user_test_history.answers is '用户答案（JSON格式）';
comment on column user_test_history.completed_at is '测试完成时间';

-- 创建索引
create index if not exists idx_user_test_history_user_id on user_test_history(user_id);
create index if not exists idx_user_test_history_test_id on user_test_history(test_id);
create index if not exists idx_user_test_history_completed_at on user_test_history(completed_at desc);

-- 启用行级安全
alter table user_test_history enable row level security;

-- 删除所有现有策略
do $$
declare
    pol record;
begin
    for pol in 
        select policyname 
        from pg_policies 
        where tablename = 'user_test_history'
    loop
        execute format('drop policy if exists %I on user_test_history', pol.policyname);
    end loop;
end $$;

-- User Test History RLS 策略
create policy "Users can view their own test history"
on user_test_history for select
using ( auth.uid() = user_id );

create policy "Admins can view all test history"
on user_test_history for select
using ( auth.jwt() ->> 'email' = 'your-admin-email@example.com' );

create policy "Users can insert their own test history"
on user_test_history for insert
with check ( auth.uid() = user_id );

create policy "Users can delete their own test history"
on user_test_history for delete
using ( auth.uid() = user_id );

create policy "Admins can delete all test history"
on user_test_history for delete
using ( auth.jwt() ->> 'email' = 'your-admin-email@example.com' );


-- ============================================================
-- 7. Tags 表（标签）
-- ============================================================

-- 创建 tags 表
create table if not exists tags (
  id uuid default gen_random_uuid() primary key,
  name text unique not null,
  count integer default 0,
  created_at timestamp with time zone default now()
);

-- 添加注释
comment on table tags is '标签表，存储所有标签';
comment on column tags.name is '标签名称';
comment on column tags.count is '标签使用次数';

-- 创建索引
create index if not exists idx_tags_name on tags(name);
create index if not exists idx_tags_count on tags(count desc);

-- 启用行级安全
alter table tags enable row level security;

-- 删除所有现有策略
do $$
declare
    pol record;
begin
    for pol in 
        select policyname 
        from pg_policies 
        where tablename = 'tags'
    loop
        execute format('drop policy if exists %I on tags', pol.policyname);
    end loop;
end $$;

-- Tags RLS 策略
create policy "Tags are viewable by everyone"
on tags for select
using ( true );

create policy "Admins can manage all tags"
on tags for all
using ( auth.jwt() ->> 'email' = 'your-admin-email@example.com' );

create policy "Authenticated users can create tags"
on tags for insert
with check ( auth.role() = 'authenticated' );


-- ============================================================
-- 8. Post Tags 表（文章标签关联）
-- ============================================================

-- 创建 post_tags 表
create table if not exists post_tags (
  id uuid default gen_random_uuid() primary key,
  post_id uuid references user_posts on delete cascade not null,
  tag_name text not null,
  created_at timestamp with time zone default now(),
  unique(post_id, tag_name)
);

-- 添加注释
comment on table post_tags is '文章标签关联表，存储文章与标签的多对多关系';
comment on column post_tags.post_id is '文章ID';
comment on column post_tags.tag_name is '标签名称';

-- 创建索引
create index if not exists idx_post_tags_post_id on post_tags(post_id);
create index if not exists idx_post_tags_tag_name on post_tags(tag_name);

-- 启用行级安全
alter table post_tags enable row level security;

-- 删除所有现有策略
do $$
declare
    pol record;
begin
    for pol in 
        select policyname 
        from pg_policies 
        where tablename = 'post_tags'
    loop
        execute format('drop policy if exists %I on post_tags', pol.policyname);
    end loop;
end $$;

-- Post Tags RLS 策略
create policy "Post tags are viewable by everyone"
on post_tags for select
using ( true );

create policy "Admins can manage all post tags"
on post_tags for all
using ( auth.jwt() ->> 'email' = 'your-admin-email@example.com' );

create policy "Users can insert tags for their own posts"
on post_tags for insert
with check (
  exists (
    select 1 from user_posts
    where user_posts.id = post_tags.post_id
    and user_posts.author_id = auth.uid()
  )
);

create policy "Users can delete tags from their own posts"
on post_tags for delete
using (
  exists (
    select 1 from user_posts
    where user_posts.id = post_tags.post_id
    and user_posts.author_id = auth.uid()
  )
);


-- ============================================================
-- 9. 验证所有策略
-- ============================================================

select 
  schemaname,
  tablename,
  policyname,
  cmd,
  qual
from pg_policies 
where tablename in ('profiles', 'user_posts', 'comments', 'user_favorites', 'user_test_history', 'tags', 'post_tags')
   or (tablename = 'objects' and schemaname = 'storage')
order by tablename, policyname;
