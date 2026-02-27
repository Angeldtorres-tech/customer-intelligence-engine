import { supabase } from "./supabase";
import {
  products as mockProducts,
  themes as mockThemes,
  feedbackItems as mockFeedbackItems,
  alerts as mockAlerts,
  weeklyBriefs as mockWeeklyBriefs,
  pipelineRuns as mockPipelineRuns,
  evalMetrics as mockEvalMetrics,
  costTracker as mockCostTracker,
  sourceDistribution as mockSourceDistribution,
  sentimentHistory as mockSentimentHistory,
  competitiveRatings as mockCompetitiveRatings,
  competitiveSentimentTrend as mockCompetitiveSentimentTrend,
  competitiveThemeComparison as mockCompetitiveThemeComparison,
  quickStats as mockQuickStats,
  ingestionStatus as mockIngestionStatus,
} from "./mock-data";
import type {
  Product,
  Theme,
  FeedbackItem,
  Alert,
  WeeklyBrief,
  PipelineRun,
  EvalMetrics,
  CostTracker,
} from "./mock-data";

// ============================================================
// Active Config
// ============================================================
export async function getActiveConfig() {
  const { data, error } = await supabase
    .from("company_configs")
    .select("*")
    .eq("is_active", true)
    .limit(1)
    .single();

  if (error || !data) return null;
  return data as { id: string; name: string; is_active: boolean };
}

// ============================================================
// Products
// ============================================================
export async function getProducts(configId: string): Promise<Product[]> {
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .eq("config_id", configId);

  if (error || !data || data.length === 0) return mockProducts;

  return data.map((p) => ({
    id: p.id,
    name: p.name,
    company: p.company_type === "own" ? ("marigold" as const) : ("competitor" as const),
  }));
}

// ============================================================
// Themes (using theme_stats view for aggregated data)
// ============================================================
export async function getThemes(configId: string): Promise<Theme[]> {
  const { data, error } = await supabase
    .from("theme_stats")
    .select("*")
    .eq("config_id", configId);

  if (error || !data || data.length === 0) return mockThemes;

  // Theme stats from the view gives us basic info; for the full Theme shape
  // (score, trend, sentiment_history, source_breakdown, top_product_id) we
  // still enrich from mock data since those computed fields aren't in the DB.
  // This allows Supabase to provide the core data while mock fills presentation extras.
  return mockThemes.map((mockTheme) => {
    const dbTheme = data.find((d) => d.name === mockTheme.name);
    if (dbTheme) {
      return {
        ...mockTheme,
        id: dbTheme.id,
        name: dbTheme.name,
        description: dbTheme.description ?? mockTheme.description,
        classification: dbTheme.classification ?? mockTheme.classification,
        feedback_count: Number(dbTheme.feedback_count) || mockTheme.feedback_count,
        avg_sentiment: Number(dbTheme.avg_sentiment) || mockTheme.avg_sentiment,
        last_updated: dbTheme.last_updated ?? mockTheme.last_updated,
      };
    }
    return mockTheme;
  });
}

// ============================================================
// Feedback Items
// ============================================================
export async function getFeedbackItems(
  configId: string,
  options?: { source?: string; productId?: string; limit?: number }
): Promise<FeedbackItem[]> {
  let query = supabase
    .from("feedback_items")
    .select("*, feedback_themes(theme_id)")
    .eq("config_id", configId)
    .order("created_at", { ascending: false });

  if (options?.source) query = query.eq("source", options.source);
  if (options?.productId) query = query.eq("product_id", options.productId);
  if (options?.limit) query = query.limit(options.limit);

  const { data, error } = await query;

  if (error || !data || data.length === 0) return mockFeedbackItems;

  return data.map((f) => ({
    id: f.id,
    text: f.text,
    source: f.source,
    product_id: f.product_id,
    sentiment_score: Number(f.sentiment_score),
    sentiment_label: f.sentiment_label,
    theme_ids: (f.feedback_themes as { theme_id: string }[])?.map(
      (ft) => ft.theme_id
    ) ?? [],
    created_at: f.created_at,
    rating: f.rating ?? undefined,
  }));
}

// ============================================================
// Alerts
// ============================================================
export async function getAlerts(configId: string): Promise<Alert[]> {
  const { data, error } = await supabase
    .from("alerts")
    .select("*")
    .eq("config_id", configId)
    .order("created_at", { ascending: false });

  if (error || !data || data.length === 0) return mockAlerts;

  return data.map((a) => ({
    id: a.id,
    severity: a.severity,
    theme_id: a.theme_id,
    title: a.title,
    description: a.description,
    created_at: a.created_at,
  }));
}

// ============================================================
// Weekly Briefs
// ============================================================
export async function getWeeklyBriefs(configId: string): Promise<WeeklyBrief[]> {
  const { data, error } = await supabase
    .from("weekly_briefs")
    .select("*")
    .eq("config_id", configId)
    .order("week_of", { ascending: false });

  if (error || !data || data.length === 0) return mockWeeklyBriefs;

  return data.map((b) => ({
    id: b.id,
    week_of: b.week_of,
    title: b.title,
    content: b.content,
    key_metrics: b.key_metrics as WeeklyBrief["key_metrics"],
  }));
}

// ============================================================
// Pipeline Runs
// ============================================================
export async function getPipelineRuns(configId: string): Promise<PipelineRun[]> {
  const { data, error } = await supabase
    .from("pipeline_runs")
    .select("*")
    .eq("config_id", configId)
    .order("started_at", { ascending: false });

  if (error || !data || data.length === 0) return mockPipelineRuns;

  return data.map((r) => ({
    id: r.id,
    status: r.status,
    started_at: r.started_at,
    completed_at: r.completed_at,
    items_processed: r.items_processed,
    errors: r.errors,
    source: r.source,
  }));
}

// ============================================================
// Eval Metrics
// ============================================================
export async function getEvalMetrics(configId: string): Promise<EvalMetrics> {
  const { data, error } = await supabase
    .from("eval_metrics")
    .select("*")
    .eq("config_id", configId)
    .order("eval_date", { ascending: false })
    .limit(1)
    .single();

  if (error || !data) return mockEvalMetrics;

  return {
    classification_accuracy: Number(data.classification_accuracy),
    sentiment_accuracy: Number(data.sentiment_accuracy),
    cluster_coherence: Number(data.cluster_coherence),
    last_eval_date: data.eval_date,
  };
}

// ============================================================
// Cost Tracking
// ============================================================
export async function getCostTracking(configId: string): Promise<CostTracker> {
  const { data, error } = await supabase
    .from("cost_tracking")
    .select("*")
    .eq("config_id", configId)
    .order("created_at", { ascending: false })
    .limit(1)
    .single();

  if (error || !data) return mockCostTracker;

  return {
    month: data.month,
    openai_spend: Number(data.openai_spend),
    anthropic_spend: Number(data.anthropic_spend),
    total_tokens: Number(data.total_tokens),
    budget: Number(data.budget),
  };
}

// ============================================================
// Source Distribution (from view)
// ============================================================
export async function getSourceDistribution(configId: string) {
  const { data, error } = await supabase
    .from("source_distribution")
    .select("*")
    .eq("config_id", configId);

  if (error || !data || data.length === 0) return mockSourceDistribution;

  const colorMap: Record<string, string> = {
    G2: "#3b82f6",
    Capterra: "#8b5cf6",
    Support: "#ef4444",
    NPS: "#22c55e",
    Gartner: "#f59e0b",
    Reddit: "#f97316",
  };

  return data.map((s) => ({
    source: s.source as string,
    count: Number(s.count),
    color: colorMap[s.source as string] ?? "#6b7280",
  }));
}

// ============================================================
// Composite loaders for pages (convenience wrappers)
// ============================================================

/** Dashboard home page data */
export async function getDashboardData() {
  const config = await getActiveConfig();
  if (!config) {
    return {
      products: mockProducts,
      themes: mockThemes,
      alerts: mockAlerts,
      sourceDistribution: mockSourceDistribution,
      sentimentHistory: mockSentimentHistory,
      quickStats: mockQuickStats,
    };
  }

  const [products, themes, alerts, sourceDistribution] = await Promise.all([
    getProducts(config.id),
    getThemes(config.id),
    getAlerts(config.id),
    getSourceDistribution(config.id),
  ]);

  return {
    products,
    themes,
    alerts,
    sourceDistribution,
    sentimentHistory: mockSentimentHistory, // computed client-side in mock
    quickStats: {
      total_feedback: mockQuickStats.total_feedback,
      coverage_pct: mockQuickStats.coverage_pct,
      avg_sentiment: mockQuickStats.avg_sentiment,
      active_themes: themes.length,
    },
  };
}

/** Theme explorer page data */
export async function getThemeExplorerData() {
  const config = await getActiveConfig();
  if (!config) {
    return {
      products: mockProducts,
      themes: mockThemes,
      feedbackItems: mockFeedbackItems,
    };
  }

  const [products, themes, feedbackItems] = await Promise.all([
    getProducts(config.id),
    getThemes(config.id),
    getFeedbackItems(config.id),
  ]);

  return { products, themes, feedbackItems };
}

/** Weekly brief page data */
export async function getBriefPageData() {
  const config = await getActiveConfig();
  if (!config) return { weeklyBriefs: mockWeeklyBriefs };

  const weeklyBriefs = await getWeeklyBriefs(config.id);
  return { weeklyBriefs };
}

/** Competitive view page data (static competitive data from mock for now) */
export async function getCompetitiveData() {
  // Competitive data is derived from cross-product analysis.
  // For now return mock; in production this would be computed views.
  return {
    competitiveRatings: mockCompetitiveRatings,
    competitiveSentimentTrend: mockCompetitiveSentimentTrend,
    competitiveThemeComparison: mockCompetitiveThemeComparison,
  };
}

/** System health page data */
export async function getHealthData() {
  const config = await getActiveConfig();
  if (!config) {
    return {
      pipelineRuns: mockPipelineRuns,
      evalMetrics: mockEvalMetrics,
      costTracker: mockCostTracker,
      ingestionStatus: mockIngestionStatus,
    };
  }

  const [pipelineRuns, evalMetrics, costTracker] = await Promise.all([
    getPipelineRuns(config.id),
    getEvalMetrics(config.id),
    getCostTracking(config.id),
  ]);

  return {
    pipelineRuns,
    evalMetrics,
    costTracker,
    ingestionStatus: mockIngestionStatus, // derived from pipeline runs in production
  };
}
