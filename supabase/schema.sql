-- CIE Dashboard: Supabase Schema
-- Config-driven architecture: swap company config, everything follows

-- ============================================================
-- Company Configuration
-- ============================================================
CREATE TABLE company_configs (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  is_active BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE products (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  config_id UUID REFERENCES company_configs(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  slug TEXT NOT NULL,
  company_type TEXT NOT NULL CHECK (company_type IN ('own', 'competitor')),
  g2_url TEXT,
  capterra_url TEXT,
  reddit_query TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- ============================================================
-- Feedback & Classification
-- ============================================================
CREATE TABLE themes (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  config_id UUID REFERENCES company_configs(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  description TEXT,
  classification TEXT CHECK (classification IN ('pain_point', 'feature_request', 'praise', 'churn_risk')),
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE feedback_items (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  config_id UUID REFERENCES company_configs(id) ON DELETE CASCADE,
  product_id UUID REFERENCES products(id),
  text TEXT NOT NULL,
  source TEXT NOT NULL CHECK (source IN ('G2', 'Capterra', 'Gartner', 'Support', 'NPS', 'Reddit')),
  sentiment_score NUMERIC(4,3),
  sentiment_label TEXT CHECK (sentiment_label IN ('positive', 'neutral', 'negative')),
  rating INTEGER CHECK (rating BETWEEN 1 AND 5),
  source_url TEXT,
  scraped_at TIMESTAMPTZ DEFAULT now(),
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE feedback_themes (
  feedback_id UUID REFERENCES feedback_items(id) ON DELETE CASCADE,
  theme_id UUID REFERENCES themes(id) ON DELETE CASCADE,
  PRIMARY KEY (feedback_id, theme_id)
);

-- ============================================================
-- Alerts
-- ============================================================
CREATE TABLE alerts (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  config_id UUID REFERENCES company_configs(id) ON DELETE CASCADE,
  theme_id UUID REFERENCES themes(id),
  severity TEXT NOT NULL CHECK (severity IN ('critical', 'warning', 'info')),
  title TEXT NOT NULL,
  description TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- ============================================================
-- Weekly Briefs
-- ============================================================
CREATE TABLE weekly_briefs (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  config_id UUID REFERENCES company_configs(id) ON DELETE CASCADE,
  week_of DATE NOT NULL,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  key_metrics JSONB,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- ============================================================
-- Pipeline & System Health
-- ============================================================
CREATE TABLE pipeline_runs (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  config_id UUID REFERENCES company_configs(id) ON DELETE CASCADE,
  source TEXT NOT NULL,
  status TEXT NOT NULL CHECK (status IN ('success', 'partial', 'failed')),
  items_processed INTEGER DEFAULT 0,
  errors INTEGER DEFAULT 0,
  started_at TIMESTAMPTZ,
  completed_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE eval_metrics (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  config_id UUID REFERENCES company_configs(id) ON DELETE CASCADE,
  classification_accuracy NUMERIC(5,4),
  sentiment_accuracy NUMERIC(5,4),
  cluster_coherence NUMERIC(5,4),
  eval_date DATE DEFAULT CURRENT_DATE,
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE cost_tracking (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  config_id UUID REFERENCES company_configs(id) ON DELETE CASCADE,
  month TEXT NOT NULL,
  openai_spend NUMERIC(10,2) DEFAULT 0,
  anthropic_spend NUMERIC(10,2) DEFAULT 0,
  total_tokens BIGINT DEFAULT 0,
  budget NUMERIC(10,2) DEFAULT 300,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- ============================================================
-- Computed Views
-- ============================================================
CREATE OR REPLACE VIEW theme_stats AS
SELECT
  t.id,
  t.config_id,
  t.name,
  t.description,
  t.classification,
  COUNT(ft.feedback_id) AS feedback_count,
  COALESCE(AVG(fi.sentiment_score), 0) AS avg_sentiment,
  MAX(fi.scraped_at) AS last_updated
FROM themes t
LEFT JOIN feedback_themes ft ON t.id = ft.theme_id
LEFT JOIN feedback_items fi ON ft.feedback_id = fi.id
GROUP BY t.id, t.config_id, t.name, t.description, t.classification;

CREATE OR REPLACE VIEW source_distribution AS
SELECT
  config_id,
  source,
  COUNT(*) AS count,
  AVG(sentiment_score) AS avg_sentiment
FROM feedback_items
GROUP BY config_id, source;

-- ============================================================
-- Row Level Security (public read for dashboard)
-- ============================================================
ALTER TABLE company_configs ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE themes ENABLE ROW LEVEL SECURITY;
ALTER TABLE feedback_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE feedback_themes ENABLE ROW LEVEL SECURITY;
ALTER TABLE alerts ENABLE ROW LEVEL SECURITY;
ALTER TABLE weekly_briefs ENABLE ROW LEVEL SECURITY;
ALTER TABLE pipeline_runs ENABLE ROW LEVEL SECURITY;
ALTER TABLE eval_metrics ENABLE ROW LEVEL SECURITY;
ALTER TABLE cost_tracking ENABLE ROW LEVEL SECURITY;

-- Public read access (dashboard is public)
CREATE POLICY "Public read" ON company_configs FOR SELECT USING (true);
CREATE POLICY "Public read" ON products FOR SELECT USING (true);
CREATE POLICY "Public read" ON themes FOR SELECT USING (true);
CREATE POLICY "Public read" ON feedback_items FOR SELECT USING (true);
CREATE POLICY "Public read" ON feedback_themes FOR SELECT USING (true);
CREATE POLICY "Public read" ON alerts FOR SELECT USING (true);
CREATE POLICY "Public read" ON weekly_briefs FOR SELECT USING (true);
CREATE POLICY "Public read" ON pipeline_runs FOR SELECT USING (true);
CREATE POLICY "Public read" ON eval_metrics FOR SELECT USING (true);
CREATE POLICY "Public read" ON cost_tracking FOR SELECT USING (true);
