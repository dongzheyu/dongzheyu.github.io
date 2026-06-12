-- ============================================================
-- PostgreSQL 全文搜索函数
-- 支持 user_posts 表的高效全文搜索
-- ============================================================

-- 添加 search_vector 列
ALTER TABLE user_posts ADD COLUMN IF NOT EXISTS search_vector tsvector;

-- 创建 GIN 索引
CREATE INDEX IF NOT EXISTS idx_user_posts_search ON user_posts USING GIN(search_vector);

-- 触发器自动更新 search_vector
CREATE OR REPLACE FUNCTION update_search_vector()
RETURNS trigger AS $$
BEGIN
  NEW.search_vector :=
    setweight(to_tsvector('simple', COALESCE(NEW.title, '')), 'A') ||
    setweight(to_tsvector('simple', COALESCE(NEW.excerpt, '')), 'B') ||
    setweight(to_tsvector('simple', COALESCE(NEW.content, '')), 'C');
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS tsvector_update ON user_posts;
CREATE TRIGGER tsvector_update
  BEFORE INSERT OR UPDATE ON user_posts
  FOR EACH ROW
  EXECUTE FUNCTION update_search_vector();

-- 初始化已有数据的 search_vector
UPDATE user_posts SET
  search_vector =
    setweight(to_tsvector('simple', COALESCE(title, '')), 'A') ||
    setweight(to_tsvector('simple', COALESCE(excerpt, '')), 'B') ||
    setweight(to_tsvector('simple', COALESCE(content, '')), 'C')
WHERE search_vector IS NULL;

-- 全文搜索函数
CREATE OR REPLACE FUNCTION search_posts(search_query text)
RETURNS TABLE (
  id uuid,
  title text,
  excerpt text,
  content_snippet text,
  category text,
  color text,
  slug text,
  rank real
) AS $$
DECLARE
  ts_query tsquery;
BEGIN
  -- 构建搜索查询
  ts_query := plainto_tsquery('simple', search_query);
  
  RETURN QUERY
  SELECT
    p.id,
    p.title,
    p.excerpt,
    -- 提取匹配位置的上下文片段
    ts_headline('simple', COALESCE(p.content, ''), ts_query,
      'StartSel=<mark>, StopSel=</mark>, MaxFragments=1, MaxWords=35, MinWords=15'
    ) AS content_snippet,
    p.category,
    p.color,
    p.slug,
    ts_rank_cd(p.search_vector, ts_query)::real AS rank
  FROM user_posts p
  WHERE p.published = true
    AND p.search_vector @@ ts_query
  ORDER BY rank DESC
  LIMIT 20;
END;
$$ LANGUAGE plpgsql;
