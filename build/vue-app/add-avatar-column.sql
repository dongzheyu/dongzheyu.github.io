-- 为 profiles 表添加 avatar_url 字段
alter table profiles add column if not exists avatar_url text;
