-- ============================================
-- 启用第三方 OAuth 登录
-- 在 Supabase Dashboard → Authentication → Providers 中配置
-- ============================================

/*
  前置条件：在 Supabase Dashboard 中启用以下 Provider
  
  1. Google:
     - 访问 https://console.cloud.google.com/apis/credentials
     - 创建 OAuth 2.0 客户端 ID
     - 授权重定向 URI: https://<your-project-ref>.supabase.co/auth/v1/callback
  
  2. GitHub:
     - 访问 https://github.com/settings/developers
     - 创建新的 OAuth App
     - Authorization callback URL: https://<your-project-ref>.supabase.co/auth/v1/callback
  
  3. Microsoft (Azure):
     - 访问 https://portal.azure.com → App registrations
     - 创建新注册
     - 重定向 URI: https://<your-project-ref>.supabase.co/auth/v1/callback
*/

-- 确保 profiles 表支持 OAuth 用户
-- OAuth 用户可能没有密码，但需要有 profile 记录

-- 创建自动处理 OAuth 用户 profile 的函数
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name, avatar_url, created_at, updated_at)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.raw_user_meta_data->>'name', ''),
    COALESCE(NEW.raw_user_meta_data->>'avatar_url', NEW.raw_user_meta_data->>'picture', ''),
    NOW(),
    NOW()
  )
  ON CONFLICT (id) DO UPDATE SET
    email = EXCLUDED.email,
    full_name = COALESCE(EXCLUDED.full_name, profiles.full_name),
    avatar_url = COALESCE(EXCLUDED.avatar_url, profiles.avatar_url),
    updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 如果触发器不存在则创建
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_trigger WHERE tgname = 'on_auth_user_created'
  ) THEN
    CREATE TRIGGER on_auth_user_created
      AFTER INSERT ON auth.users
      FOR EACH ROW
      EXECUTE FUNCTION public.handle_new_user();
  END IF;
END
$$;

-- 确保 profiles 表有必要的列
DO $$
BEGIN
  -- 添加 full_name 列（如果不存在）
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'profiles' AND column_name = 'full_name'
  ) THEN
    ALTER TABLE public.profiles ADD COLUMN full_name TEXT;
  END IF;

  -- 添加 avatar_url 列（如果不存在）
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'profiles' AND column_name = 'avatar_url'
  ) THEN
    ALTER TABLE public.profiles ADD COLUMN avatar_url TEXT;
  END IF;
END
$$;

-- 更新 RLS 策略以允许用户查看公开资料
CREATE POLICY IF NOT EXISTS "Public profiles are viewable by everyone"
  ON public.profiles FOR SELECT
  USING (true);

-- 用户只能更新自己的资料
CREATE POLICY IF NOT EXISTS "Users can update own profile"
  ON public.profiles FOR UPDATE
  USING (auth.uid() = id);