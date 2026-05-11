-- 为所有现有用户创建 profiles 记录
insert into profiles (id)
select id from auth.users
where id not in (select id from profiles)
on conflict (id) do nothing;
