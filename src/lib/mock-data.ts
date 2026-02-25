// ============================================================
// CIE Dashboard - Mock Data
// Structured for easy swap to Supabase later
// ============================================================

export type Product = {
  id: string;
  name: string;
  company: "marigold" | "competitor";
};

export type FeedbackSource = "G2" | "Capterra" | "Gartner" | "Support" | "NPS" | "Reddit";

export type SentimentLabel = "positive" | "neutral" | "negative";

export type FeedbackItem = {
  id: string;
  text: string;
  source: FeedbackSource;
  product_id: string;
  sentiment_score: number;
  sentiment_label: SentimentLabel;
  theme_ids: string[];
  created_at: string;
  rating?: number;
};

export type Theme = {
  id: string;
  name: string;
  description: string;
  score: number;
  feedback_count: number;
  avg_sentiment: number;
  trend: "up" | "stable" | "down";
  top_product_id: string;
  classification: "feature_request" | "pain_point" | "praise" | "churn_risk";
  last_updated: string;
  sentiment_history: { week: string; score: number }[];
  source_breakdown: { source: FeedbackSource; count: number }[];
};

export type Alert = {
  id: string;
  severity: "critical" | "warning" | "info";
  theme_id: string;
  title: string;
  description: string;
  created_at: string;
};

export type WeeklyBrief = {
  id: string;
  week_of: string;
  title: string;
  content: string;
  key_metrics: {
    top_themes: string[];
    emerging_signals: string[];
    sentiment_changes: { theme: string; change: number }[];
  };
};

export type PipelineRun = {
  id: string;
  status: "success" | "partial" | "failed";
  started_at: string;
  completed_at: string;
  items_processed: number;
  errors: number;
  source: FeedbackSource;
};

export type EvalMetrics = {
  classification_accuracy: number;
  sentiment_accuracy: number;
  cluster_coherence: number;
  last_eval_date: string;
};

export type CostTracker = {
  month: string;
  openai_spend: number;
  anthropic_spend: number;
  total_tokens: number;
  budget: number;
};

// ============================================================
// Products
// ============================================================
export const products: Product[] = [
  { id: "sailthru", name: "Sailthru", company: "marigold" },
  { id: "cheetah", name: "Cheetah Digital", company: "marigold" },
  { id: "selligent", name: "Selligent", company: "marigold" },
  { id: "braze", name: "Braze", company: "competitor" },
  { id: "klaviyo", name: "Klaviyo", company: "competitor" },
  { id: "iterable", name: "Iterable", company: "competitor" },
];

// ============================================================
// Themes
// ============================================================
export const themes: Theme[] = [
  {
    id: "th-001",
    name: "Email Deliverability",
    description: "Feedback related to email deliverability rates, inbox placement, and spam filtering issues across platforms.",
    score: 87,
    feedback_count: 48,
    avg_sentiment: 0.42,
    trend: "down",
    top_product_id: "sailthru",
    classification: "pain_point",
    last_updated: "2026-02-22",
    sentiment_history: [
      { week: "W4 Jan", score: 0.55 },
      { week: "W1 Feb", score: 0.51 },
      { week: "W2 Feb", score: 0.46 },
      { week: "W3 Feb", score: 0.42 },
    ],
    source_breakdown: [
      { source: "G2", count: 18 },
      { source: "Support", count: 14 },
      { source: "Capterra", count: 9 },
      { source: "NPS", count: 7 },
    ],
  },
  {
    id: "th-002",
    name: "Segmentation UX",
    description: "User experience friction in audience segmentation builders, including query performance and UI responsiveness.",
    score: 79,
    feedback_count: 41,
    avg_sentiment: 0.38,
    trend: "down",
    top_product_id: "cheetah",
    classification: "pain_point",
    last_updated: "2026-02-21",
    sentiment_history: [
      { week: "W4 Jan", score: 0.45 },
      { week: "W1 Feb", score: 0.43 },
      { week: "W2 Feb", score: 0.40 },
      { week: "W3 Feb", score: 0.38 },
    ],
    source_breakdown: [
      { source: "G2", count: 15 },
      { source: "Capterra", count: 11 },
      { source: "Support", count: 10 },
      { source: "NPS", count: 5 },
    ],
  },
  {
    id: "th-003",
    name: "AI Personalization",
    description: "Positive reception of AI-driven content personalization and recommendations engine capabilities.",
    score: 74,
    feedback_count: 36,
    avg_sentiment: 0.72,
    trend: "up",
    top_product_id: "sailthru",
    classification: "praise",
    last_updated: "2026-02-22",
    sentiment_history: [
      { week: "W4 Jan", score: 0.63 },
      { week: "W1 Feb", score: 0.66 },
      { week: "W2 Feb", score: 0.69 },
      { week: "W3 Feb", score: 0.72 },
    ],
    source_breakdown: [
      { source: "G2", count: 14 },
      { source: "Capterra", count: 10 },
      { source: "NPS", count: 8 },
      { source: "Reddit", count: 4 },
    ],
  },
  {
    id: "th-004",
    name: "API Documentation",
    description: "Requests for better API documentation, code examples, and developer onboarding experience.",
    score: 68,
    feedback_count: 29,
    avg_sentiment: 0.35,
    trend: "stable",
    top_product_id: "cheetah",
    classification: "feature_request",
    last_updated: "2026-02-20",
    sentiment_history: [
      { week: "W4 Jan", score: 0.34 },
      { week: "W1 Feb", score: 0.36 },
      { week: "W2 Feb", score: 0.35 },
      { week: "W3 Feb", score: 0.35 },
    ],
    source_breakdown: [
      { source: "G2", count: 8 },
      { source: "Support", count: 12 },
      { source: "Reddit", count: 5 },
      { source: "Gartner", count: 4 },
    ],
  },
  {
    id: "th-005",
    name: "Cross-Channel Orchestration",
    description: "Growing demand for unified cross-channel campaign orchestration spanning email, SMS, push, and web.",
    score: 65,
    feedback_count: 33,
    avg_sentiment: 0.58,
    trend: "up",
    top_product_id: "selligent",
    classification: "feature_request",
    last_updated: "2026-02-22",
    sentiment_history: [
      { week: "W4 Jan", score: 0.50 },
      { week: "W1 Feb", score: 0.53 },
      { week: "W2 Feb", score: 0.55 },
      { week: "W3 Feb", score: 0.58 },
    ],
    source_breakdown: [
      { source: "G2", count: 12 },
      { source: "Capterra", count: 8 },
      { source: "Gartner", count: 7 },
      { source: "NPS", count: 6 },
    ],
  },
  {
    id: "th-006",
    name: "Pricing Concerns",
    description: "Recurring feedback about pricing transparency, value perception, and contract flexibility.",
    score: 61,
    feedback_count: 27,
    avg_sentiment: 0.28,
    trend: "down",
    top_product_id: "cheetah",
    classification: "churn_risk",
    last_updated: "2026-02-21",
    sentiment_history: [
      { week: "W4 Jan", score: 0.35 },
      { week: "W1 Feb", score: 0.33 },
      { week: "W2 Feb", score: 0.30 },
      { week: "W3 Feb", score: 0.28 },
    ],
    source_breakdown: [
      { source: "G2", count: 10 },
      { source: "Capterra", count: 8 },
      { source: "NPS", count: 6 },
      { source: "Gartner", count: 3 },
    ],
  },
  {
    id: "th-007",
    name: "Reporting & Analytics",
    description: "Need for more advanced campaign analytics, attribution modeling, and custom report builders.",
    score: 58,
    feedback_count: 24,
    avg_sentiment: 0.45,
    trend: "stable",
    top_product_id: "sailthru",
    classification: "feature_request",
    last_updated: "2026-02-19",
    sentiment_history: [
      { week: "W4 Jan", score: 0.44 },
      { week: "W1 Feb", score: 0.46 },
      { week: "W2 Feb", score: 0.45 },
      { week: "W3 Feb", score: 0.45 },
    ],
    source_breakdown: [
      { source: "G2", count: 9 },
      { source: "Capterra", count: 6 },
      { source: "Support", count: 5 },
      { source: "NPS", count: 4 },
    ],
  },
  {
    id: "th-008",
    name: "Onboarding Experience",
    description: "Feedback about implementation complexity, time-to-value, and the quality of onboarding support.",
    score: 52,
    feedback_count: 21,
    avg_sentiment: 0.41,
    trend: "up",
    top_product_id: "selligent",
    classification: "pain_point",
    last_updated: "2026-02-20",
    sentiment_history: [
      { week: "W4 Jan", score: 0.33 },
      { week: "W1 Feb", score: 0.36 },
      { week: "W2 Feb", score: 0.39 },
      { week: "W3 Feb", score: 0.41 },
    ],
    source_breakdown: [
      { source: "G2", count: 7 },
      { source: "Support", count: 8 },
      { source: "NPS", count: 4 },
      { source: "Capterra", count: 2 },
    ],
  },
  {
    id: "th-009",
    name: "Mobile SDK Quality",
    description: "Technical issues with mobile SDK integration, push notification reliability, and in-app messaging.",
    score: 45,
    feedback_count: 18,
    avg_sentiment: 0.32,
    trend: "stable",
    top_product_id: "selligent",
    classification: "pain_point",
    last_updated: "2026-02-18",
    sentiment_history: [
      { week: "W4 Jan", score: 0.30 },
      { week: "W1 Feb", score: 0.31 },
      { week: "W2 Feb", score: 0.33 },
      { week: "W3 Feb", score: 0.32 },
    ],
    source_breakdown: [
      { source: "Support", count: 9 },
      { source: "G2", count: 4 },
      { source: "Reddit", count: 3 },
      { source: "Capterra", count: 2 },
    ],
  },
  {
    id: "th-010",
    name: "Template Builder",
    description: "Praise and feature requests around the drag-and-drop email template builder and design system.",
    score: 41,
    feedback_count: 16,
    avg_sentiment: 0.62,
    trend: "up",
    top_product_id: "sailthru",
    classification: "praise",
    last_updated: "2026-02-19",
    sentiment_history: [
      { week: "W4 Jan", score: 0.55 },
      { week: "W1 Feb", score: 0.57 },
      { week: "W2 Feb", score: 0.60 },
      { week: "W3 Feb", score: 0.62 },
    ],
    source_breakdown: [
      { source: "G2", count: 6 },
      { source: "Capterra", count: 5 },
      { source: "NPS", count: 3 },
      { source: "Reddit", count: 2 },
    ],
  },
];

// ============================================================
// Feedback Items (200+ realistic items)
// ============================================================
const feedbackTemplates: { text: string; source: FeedbackSource; product_id: string; sentiment_score: number; sentiment_label: SentimentLabel; theme_ids: string[]; rating?: number }[] = [
  // Email Deliverability - Sailthru
  { text: "Our deliverability rates dropped 15% after migrating to Sailthru. The IP warming process was poorly documented and support took days to respond.", source: "G2", product_id: "sailthru", sentiment_score: 0.18, sentiment_label: "negative", theme_ids: ["th-001"], rating: 2 },
  { text: "Sailthru's deliverability tools are solid once you get them configured. Took about a month to see consistent inbox placement above 95%.", source: "G2", product_id: "sailthru", sentiment_score: 0.65, sentiment_label: "positive", theme_ids: ["th-001"], rating: 4 },
  { text: "Inbox placement for Gmail has been terrible this quarter. We are seeing 30% of our sends landing in promotions tab.", source: "Support", product_id: "sailthru", sentiment_score: 0.12, sentiment_label: "negative", theme_ids: ["th-001"] },
  { text: "The new deliverability dashboard gives great visibility into inbox placement. Being able to see per-ISP metrics is a game changer.", source: "NPS", product_id: "sailthru", sentiment_score: 0.78, sentiment_label: "positive", theme_ids: ["th-001"] },
  { text: "We keep getting flagged as spam on Yahoo. Been working with support for 3 weeks with no resolution.", source: "Support", product_id: "sailthru", sentiment_score: 0.08, sentiment_label: "negative", theme_ids: ["th-001"] },
  { text: "Deliverability is the one area where Sailthru clearly beats the competition. Their dedicated IP management is excellent.", source: "Capterra", product_id: "sailthru", sentiment_score: 0.82, sentiment_label: "positive", theme_ids: ["th-001"], rating: 5 },
  { text: "After switching to shared IP pools, our deliverability improved. The team helped us optimize our sending reputation.", source: "G2", product_id: "sailthru", sentiment_score: 0.71, sentiment_label: "positive", theme_ids: ["th-001"], rating: 4 },

  // Email Deliverability - Cheetah
  { text: "Cheetah Digital's email deliverability has been inconsistent. Some campaigns hit 98% inbox, others barely crack 80%.", source: "G2", product_id: "cheetah", sentiment_score: 0.35, sentiment_label: "negative", theme_ids: ["th-001"], rating: 3 },
  { text: "The bounce management in Cheetah is outdated. Hard bounces take too long to suppress.", source: "Support", product_id: "cheetah", sentiment_score: 0.22, sentiment_label: "negative", theme_ids: ["th-001"] },
  { text: "We moved from Cheetah to Braze primarily because of deliverability issues with our transactional emails.", source: "G2", product_id: "cheetah", sentiment_score: 0.15, sentiment_label: "negative", theme_ids: ["th-001", "th-006"], rating: 2 },

  // Segmentation UX - Cheetah
  { text: "Building segments in Cheetah Digital is painfully slow. Complex queries with behavioral data take 10+ minutes to return counts.", source: "G2", product_id: "cheetah", sentiment_score: 0.15, sentiment_label: "negative", theme_ids: ["th-002"], rating: 2 },
  { text: "The segment builder UI feels like it was designed in 2015. No drag-and-drop, no visual query builder. Just raw filter dropdowns.", source: "Capterra", product_id: "cheetah", sentiment_score: 0.20, sentiment_label: "negative", theme_ids: ["th-002"], rating: 2 },
  { text: "We have to export to CSV and re-import just to create exclusion segments. This should be a basic feature.", source: "Support", product_id: "cheetah", sentiment_score: 0.10, sentiment_label: "negative", theme_ids: ["th-002"] },
  { text: "The new segmentation updates are a step in the right direction but still lag behind what Klaviyo offers out of the box.", source: "G2", product_id: "cheetah", sentiment_score: 0.40, sentiment_label: "neutral", theme_ids: ["th-002"], rating: 3 },
  { text: "Segment refresh times have improved recently. Still wish we could do real-time segmentation for triggered campaigns.", source: "NPS", product_id: "cheetah", sentiment_score: 0.48, sentiment_label: "neutral", theme_ids: ["th-002"] },

  // Segmentation UX - Sailthru
  { text: "Sailthru's Audience Builder is intuitive once you learn it. The behavioral targeting options are comprehensive.", source: "G2", product_id: "sailthru", sentiment_score: 0.68, sentiment_label: "positive", theme_ids: ["th-002"], rating: 4 },
  { text: "Nested segment logic in Sailthru crashes the browser when dealing with lists over 1M contacts.", source: "Support", product_id: "sailthru", sentiment_score: 0.12, sentiment_label: "negative", theme_ids: ["th-002"] },

  // AI Personalization - Sailthru
  { text: "Sailthru's personalization engine is genuinely impressive. Saw a 22% lift in click-through rates after enabling AI-powered content blocks.", source: "G2", product_id: "sailthru", sentiment_score: 0.88, sentiment_label: "positive", theme_ids: ["th-003"], rating: 5 },
  { text: "The AI product recommendations are spookily good. Our customers are clicking on items we never would have manually curated.", source: "Capterra", product_id: "sailthru", sentiment_score: 0.85, sentiment_label: "positive", theme_ids: ["th-003"], rating: 5 },
  { text: "Prediction Manager lets us identify churn risk before it happens. Integrated it with our lifecycle campaigns and reduced churn by 8%.", source: "G2", product_id: "sailthru", sentiment_score: 0.90, sentiment_label: "positive", theme_ids: ["th-003"], rating: 5 },
  { text: "The AI subject line optimizer consistently outperforms our manually written subject lines in A/B tests.", source: "NPS", product_id: "sailthru", sentiment_score: 0.80, sentiment_label: "positive", theme_ids: ["th-003"] },
  { text: "Personalization is great but the setup is complex. Took our team 3 months to fully implement the recommendation engine.", source: "G2", product_id: "sailthru", sentiment_score: 0.55, sentiment_label: "positive", theme_ids: ["th-003", "th-008"], rating: 3 },
  { text: "Wish the AI features were available on all plans. Right now they are locked behind the enterprise tier.", source: "Capterra", product_id: "sailthru", sentiment_score: 0.35, sentiment_label: "negative", theme_ids: ["th-003", "th-006"], rating: 3 },

  // API Documentation
  { text: "Cheetah's API docs are a mess. Half the endpoints are undocumented, and the ones that are documented have outdated examples.", source: "G2", product_id: "cheetah", sentiment_score: 0.12, sentiment_label: "negative", theme_ids: ["th-004"], rating: 1 },
  { text: "Spent 2 weeks trying to integrate the Cheetah API. The SDKs are not maintained and the REST docs are incomplete.", source: "Support", product_id: "cheetah", sentiment_score: 0.08, sentiment_label: "negative", theme_ids: ["th-004"] },
  { text: "Sailthru's API is well-designed but the documentation could use more real-world examples.", source: "Reddit", product_id: "sailthru", sentiment_score: 0.45, sentiment_label: "neutral", theme_ids: ["th-004"] },
  { text: "The developer experience with Cheetah Digital is below average. No Postman collection, no OpenAPI spec, no sandbox.", source: "Reddit", product_id: "cheetah", sentiment_score: 0.15, sentiment_label: "negative", theme_ids: ["th-004"] },
  { text: "API rate limits are poorly communicated. We hit them in production and had no idea they existed.", source: "Support", product_id: "cheetah", sentiment_score: 0.10, sentiment_label: "negative", theme_ids: ["th-004"] },

  // Cross-Channel Orchestration
  { text: "Selligent's journey builder handles cross-channel well. We run email, SMS, and push from a single workflow.", source: "G2", product_id: "selligent", sentiment_score: 0.75, sentiment_label: "positive", theme_ids: ["th-005"], rating: 4 },
  { text: "The cross-channel capabilities are promising but the SMS integration feels bolted on rather than native.", source: "Capterra", product_id: "selligent", sentiment_score: 0.45, sentiment_label: "neutral", theme_ids: ["th-005"], rating: 3 },
  { text: "We chose Selligent specifically for multi-channel orchestration. It delivers on that promise better than most.", source: "Gartner", product_id: "selligent", sentiment_score: 0.72, sentiment_label: "positive", theme_ids: ["th-005"] },
  { text: "Would love to see web push and in-app messaging added to the journey builder. Right now it is email and SMS only.", source: "NPS", product_id: "selligent", sentiment_score: 0.50, sentiment_label: "neutral", theme_ids: ["th-005"] },
  { text: "Compared to Iterable's cross-channel, Selligent still has room to grow. But they are moving in the right direction.", source: "G2", product_id: "selligent", sentiment_score: 0.55, sentiment_label: "positive", theme_ids: ["th-005"], rating: 3 },

  // Pricing Concerns
  { text: "Cheetah's pricing is extremely opaque. Took 3 sales calls just to get a ballpark number. Not a great buying experience.", source: "G2", product_id: "cheetah", sentiment_score: 0.18, sentiment_label: "negative", theme_ids: ["th-006"], rating: 2 },
  { text: "We are paying significantly more per contact than we would on Klaviyo for essentially the same feature set.", source: "Capterra", product_id: "cheetah", sentiment_score: 0.15, sentiment_label: "negative", theme_ids: ["th-006"], rating: 2 },
  { text: "The annual contract lock-in with no opt-out clause is frustrating. We wanted to downgrade but couldn't.", source: "NPS", product_id: "cheetah", sentiment_score: 0.10, sentiment_label: "negative", theme_ids: ["th-006"] },
  { text: "Sailthru's pricing is fair for what you get, especially the AI features. But the jump from Pro to Enterprise is steep.", source: "G2", product_id: "sailthru", sentiment_score: 0.45, sentiment_label: "neutral", theme_ids: ["th-006"], rating: 3 },
  { text: "Selligent's pricing model is reasonable but they nickel and dime on add-ons like SMS and advanced analytics.", source: "Gartner", product_id: "selligent", sentiment_score: 0.30, sentiment_label: "negative", theme_ids: ["th-006"] },

  // Reporting & Analytics
  { text: "Sailthru's reporting is functional but basic. We export everything to Looker because the built-in dashboards lack depth.", source: "G2", product_id: "sailthru", sentiment_score: 0.35, sentiment_label: "negative", theme_ids: ["th-007"], rating: 3 },
  { text: "Need multi-touch attribution in the platform. Currently there is no way to see campaign influence across channels.", source: "Support", product_id: "sailthru", sentiment_score: 0.25, sentiment_label: "negative", theme_ids: ["th-007"] },
  { text: "The real-time campaign metrics are helpful for monitoring sends, but historical trend analysis is weak.", source: "Capterra", product_id: "sailthru", sentiment_score: 0.40, sentiment_label: "neutral", theme_ids: ["th-007"], rating: 3 },
  { text: "Custom report builder would be huge. Right now we are stuck with pre-built reports that do not match our KPIs.", source: "NPS", product_id: "sailthru", sentiment_score: 0.30, sentiment_label: "negative", theme_ids: ["th-007"] },

  // Onboarding Experience
  { text: "Selligent's onboarding was rough. The implementation took 6 months and required significant professional services budget.", source: "G2", product_id: "selligent", sentiment_score: 0.18, sentiment_label: "negative", theme_ids: ["th-008"], rating: 2 },
  { text: "The onboarding team was knowledgeable but the process felt rushed. We went live before we were truly ready.", source: "NPS", product_id: "selligent", sentiment_score: 0.30, sentiment_label: "negative", theme_ids: ["th-008"] },
  { text: "Cheetah's implementation was smooth thanks to a great onboarding manager. Had our first campaign out in 3 weeks.", source: "G2", product_id: "cheetah", sentiment_score: 0.78, sentiment_label: "positive", theme_ids: ["th-008"], rating: 4 },
  { text: "The learning curve is steep. Even after onboarding, our team needed 2 more months to feel comfortable with the platform.", source: "Capterra", product_id: "selligent", sentiment_score: 0.25, sentiment_label: "negative", theme_ids: ["th-008"], rating: 2 },

  // Mobile SDK Quality
  { text: "Selligent's mobile SDK has caused multiple app crashes in production. The push notification handling is unreliable on Android.", source: "Support", product_id: "selligent", sentiment_score: 0.08, sentiment_label: "negative", theme_ids: ["th-009"] },
  { text: "The iOS SDK is outdated and does not support the latest notification frameworks. We had to write custom wrappers.", source: "Support", product_id: "selligent", sentiment_score: 0.12, sentiment_label: "negative", theme_ids: ["th-009"] },
  { text: "In-app messaging works well when it works, but the SDK initialization is flaky and drops messages.", source: "G2", product_id: "selligent", sentiment_score: 0.28, sentiment_label: "negative", theme_ids: ["th-009"], rating: 2 },
  { text: "Mobile push open tracking is inconsistent. We see significant discrepancies between Selligent data and our own analytics.", source: "Support", product_id: "selligent", sentiment_score: 0.15, sentiment_label: "negative", theme_ids: ["th-009"] },

  // Template Builder
  { text: "The drag-and-drop template builder in Sailthru is excellent. Our designers can create campaigns without any HTML knowledge.", source: "G2", product_id: "sailthru", sentiment_score: 0.85, sentiment_label: "positive", theme_ids: ["th-010"], rating: 5 },
  { text: "Template versioning and A/B testing content blocks directly in the builder saves us hours every week.", source: "Capterra", product_id: "sailthru", sentiment_score: 0.80, sentiment_label: "positive", theme_ids: ["th-010"], rating: 4 },
  { text: "Would love to see more pre-built templates. The current library is limited compared to Mailchimp or HubSpot.", source: "NPS", product_id: "sailthru", sentiment_score: 0.50, sentiment_label: "neutral", theme_ids: ["th-010"] },
  { text: "The template builder is good but rendering in Outlook is hit or miss. Need better testing tools built in.", source: "G2", product_id: "sailthru", sentiment_score: 0.45, sentiment_label: "neutral", theme_ids: ["th-010"], rating: 3 },

  // Competitor feedback - Braze
  { text: "Braze's real-time personalization is best-in-class. The Content Cards feature alone justified the switch from Sailthru.", source: "G2", product_id: "braze", sentiment_score: 0.88, sentiment_label: "positive", theme_ids: ["th-003"], rating: 5 },
  { text: "Braze's segmentation is lightning fast. Complex behavioral segments return in seconds, not minutes.", source: "Capterra", product_id: "braze", sentiment_score: 0.85, sentiment_label: "positive", theme_ids: ["th-002"], rating: 5 },
  { text: "Braze Canvas is the best journey builder in the market. Intuitive, powerful, and flexible.", source: "G2", product_id: "braze", sentiment_score: 0.90, sentiment_label: "positive", theme_ids: ["th-005"], rating: 5 },
  { text: "Braze is expensive but you get what you pay for. The platform is reliable and the support team is responsive.", source: "Gartner", product_id: "braze", sentiment_score: 0.65, sentiment_label: "positive", theme_ids: ["th-006"] },
  { text: "API documentation is excellent. Comprehensive SDKs, Postman collections, and sandbox environments.", source: "Reddit", product_id: "braze", sentiment_score: 0.82, sentiment_label: "positive", theme_ids: ["th-004"] },
  { text: "Braze's email deliverability is good but not exceptional. Their strength is more in push and in-app.", source: "G2", product_id: "braze", sentiment_score: 0.55, sentiment_label: "positive", theme_ids: ["th-001"], rating: 3 },
  { text: "Onboarding with Braze was seamless. Their implementation team had us live in 6 weeks.", source: "G2", product_id: "braze", sentiment_score: 0.80, sentiment_label: "positive", theme_ids: ["th-008"], rating: 4 },
  { text: "Reporting in Braze is solid but custom reports require Currents export to a data warehouse.", source: "Capterra", product_id: "braze", sentiment_score: 0.50, sentiment_label: "neutral", theme_ids: ["th-007"], rating: 3 },

  // Competitor feedback - Klaviyo
  { text: "Klaviyo's segmentation is the gold standard for ecommerce. Real-time behavioral segments with zero lag.", source: "G2", product_id: "klaviyo", sentiment_score: 0.92, sentiment_label: "positive", theme_ids: ["th-002"], rating: 5 },
  { text: "For an ecommerce brand, Klaviyo's personalization is unmatched. Product recommendations are powered by actual purchase data.", source: "Capterra", product_id: "klaviyo", sentiment_score: 0.87, sentiment_label: "positive", theme_ids: ["th-003"], rating: 5 },
  { text: "Klaviyo's pricing is transparent and scales well. You know exactly what you are paying for each month.", source: "G2", product_id: "klaviyo", sentiment_score: 0.78, sentiment_label: "positive", theme_ids: ["th-006"], rating: 4 },
  { text: "Email deliverability on Klaviyo is excellent out of the box. Minimal configuration needed.", source: "Capterra", product_id: "klaviyo", sentiment_score: 0.80, sentiment_label: "positive", theme_ids: ["th-001"], rating: 4 },
  { text: "Klaviyo's flow builder is intuitive but lacks advanced branching logic for complex multi-channel journeys.", source: "G2", product_id: "klaviyo", sentiment_score: 0.55, sentiment_label: "positive", theme_ids: ["th-005"], rating: 3 },
  { text: "Analytics are built right into Klaviyo. Revenue attribution per campaign and per flow is available by default.", source: "NPS", product_id: "klaviyo", sentiment_score: 0.82, sentiment_label: "positive", theme_ids: ["th-007"] },
  { text: "The template builder is decent for basic emails but falls short for complex, branded designs.", source: "G2", product_id: "klaviyo", sentiment_score: 0.45, sentiment_label: "neutral", theme_ids: ["th-010"], rating: 3 },

  // Competitor feedback - Iterable
  { text: "Iterable's cross-channel orchestration is seamless. Email, push, SMS, in-app all in one workflow.", source: "G2", product_id: "iterable", sentiment_score: 0.85, sentiment_label: "positive", theme_ids: ["th-005"], rating: 5 },
  { text: "Iterable's API is developer-friendly with excellent documentation and SDKs for every language.", source: "Reddit", product_id: "iterable", sentiment_score: 0.80, sentiment_label: "positive", theme_ids: ["th-004"] },
  { text: "AI-powered send time optimization in Iterable boosted our open rates by 12%.", source: "Capterra", product_id: "iterable", sentiment_score: 0.78, sentiment_label: "positive", theme_ids: ["th-003"], rating: 4 },
  { text: "Iterable's pricing is reasonable for mid-market but gets expensive fast at enterprise scale.", source: "Gartner", product_id: "iterable", sentiment_score: 0.40, sentiment_label: "neutral", theme_ids: ["th-006"] },
  { text: "Segmentation in Iterable is good but the UI could be more intuitive. There is a learning curve.", source: "G2", product_id: "iterable", sentiment_score: 0.55, sentiment_label: "positive", theme_ids: ["th-002"], rating: 3 },
  { text: "Email deliverability on Iterable has been consistently high. Rarely see issues with inbox placement.", source: "Capterra", product_id: "iterable", sentiment_score: 0.75, sentiment_label: "positive", theme_ids: ["th-001"], rating: 4 },
  { text: "Onboarding was well-structured. Their success team held weekly calls during the first 3 months.", source: "NPS", product_id: "iterable", sentiment_score: 0.72, sentiment_label: "positive", theme_ids: ["th-008"] },

  // More mixed feedback for volume
  { text: "The platform handles high-volume sends well but struggles with real-time triggered campaigns during peak hours.", source: "Support", product_id: "sailthru", sentiment_score: 0.35, sentiment_label: "negative", theme_ids: ["th-001"] },
  { text: "Customer support is responsive but often lacks deep technical knowledge about the platform internals.", source: "NPS", product_id: "cheetah", sentiment_score: 0.30, sentiment_label: "negative", theme_ids: ["th-008"] },
  { text: "We have been a Selligent customer for 4 years. The product has improved significantly but still needs polish.", source: "G2", product_id: "selligent", sentiment_score: 0.55, sentiment_label: "positive", theme_ids: ["th-005"], rating: 3 },
  { text: "The integration marketplace is lacking. We need native connectors for Snowflake, BigQuery, and modern CDPs.", source: "Capterra", product_id: "cheetah", sentiment_score: 0.20, sentiment_label: "negative", theme_ids: ["th-004"], rating: 2 },
  { text: "Sailthru's recommendation engine helped us increase average order value by 15% in Q4.", source: "G2", product_id: "sailthru", sentiment_score: 0.88, sentiment_label: "positive", theme_ids: ["th-003"], rating: 5 },
  { text: "Really impressed with the new journey analytics dashboard. Finally can see conversion rates at each step.", source: "NPS", product_id: "selligent", sentiment_score: 0.75, sentiment_label: "positive", theme_ids: ["th-007"] },
  { text: "Cheetah's loyalty program management is their strongest feature. Integration with campaign tools is where it falls apart.", source: "Gartner", product_id: "cheetah", sentiment_score: 0.48, sentiment_label: "neutral", theme_ids: ["th-005"] },
  { text: "The mobile app push notification delivery rate has dropped below 70%. Unacceptable for our use case.", source: "Support", product_id: "selligent", sentiment_score: 0.05, sentiment_label: "negative", theme_ids: ["th-009"] },
  { text: "Sailthru's lifecycle optimization tool is underrated. It automatically identifies the best time to message each user.", source: "Capterra", product_id: "sailthru", sentiment_score: 0.82, sentiment_label: "positive", theme_ids: ["th-003"], rating: 4 },
  { text: "We evaluated Braze and Iterable before choosing Cheetah. Regretting that decision based on the developer experience alone.", source: "Reddit", product_id: "cheetah", sentiment_score: 0.12, sentiment_label: "negative", theme_ids: ["th-004"] },

  // Additional volume items
  { text: "Excellent customer support team. They helped us troubleshoot a complex deliverability issue in under 2 hours.", source: "NPS", product_id: "sailthru", sentiment_score: 0.85, sentiment_label: "positive", theme_ids: ["th-001"] },
  { text: "The campaign approval workflow is clunky. Multiple reviewers cannot collaborate simultaneously.", source: "Capterra", product_id: "cheetah", sentiment_score: 0.25, sentiment_label: "negative", theme_ids: ["th-002"], rating: 2 },
  { text: "Braze's pricing is steep but the ROI is there. We saw 3x return on our investment in the first year.", source: "G2", product_id: "braze", sentiment_score: 0.70, sentiment_label: "positive", theme_ids: ["th-006"], rating: 4 },
  { text: "Klaviyo integrates natively with Shopify in ways no other platform can match.", source: "Capterra", product_id: "klaviyo", sentiment_score: 0.90, sentiment_label: "positive", theme_ids: ["th-005"], rating: 5 },
  { text: "Selligent's European data residency is a must-have for us. GDPR compliance was seamless.", source: "Gartner", product_id: "selligent", sentiment_score: 0.72, sentiment_label: "positive", theme_ids: ["th-008"] },
  { text: "Template rendering issues across email clients are frequent. Dark mode email support is basically non-existent.", source: "Support", product_id: "cheetah", sentiment_score: 0.18, sentiment_label: "negative", theme_ids: ["th-010"] },
  { text: "Iterable's Catalog feature for personalization is powerful. We use it to dynamically populate product grids.", source: "G2", product_id: "iterable", sentiment_score: 0.82, sentiment_label: "positive", theme_ids: ["th-003"], rating: 4 },
  { text: "The segmentation performance has gotten worse with our growing contact list. 5M+ contacts and counts take forever.", source: "Support", product_id: "cheetah", sentiment_score: 0.10, sentiment_label: "negative", theme_ids: ["th-002"] },
  { text: "Sailthru's content affinity model is unique in the market. No other platform does interest-based personalization this well.", source: "G2", product_id: "sailthru", sentiment_score: 0.92, sentiment_label: "positive", theme_ids: ["th-003"], rating: 5 },
  { text: "Push notification rich media support is limited. Cannot send carousels or interactive notifications.", source: "Capterra", product_id: "selligent", sentiment_score: 0.20, sentiment_label: "negative", theme_ids: ["th-009"], rating: 2 },
  { text: "Klaviyo's reporting dashboard is clean and actionable. Love the cohort analysis feature.", source: "G2", product_id: "klaviyo", sentiment_score: 0.80, sentiment_label: "positive", theme_ids: ["th-007"], rating: 4 },
  { text: "Braze's in-app messaging SDK is rock solid. Zero crashes and handles edge cases gracefully.", source: "Reddit", product_id: "braze", sentiment_score: 0.85, sentiment_label: "positive", theme_ids: ["th-009"] },
  { text: "The lack of a visual workflow builder in Cheetah Digital is a dealbreaker for our marketing team.", source: "G2", product_id: "cheetah", sentiment_score: 0.15, sentiment_label: "negative", theme_ids: ["th-005"], rating: 1 },
  { text: "Great platform overall but the pricing model makes it hard to justify for smaller brands.", source: "Capterra", product_id: "sailthru", sentiment_score: 0.42, sentiment_label: "neutral", theme_ids: ["th-006"], rating: 3 },
  { text: "Iterable's onboarding documentation is excellent. Self-serve setup is actually possible.", source: "G2", product_id: "iterable", sentiment_score: 0.78, sentiment_label: "positive", theme_ids: ["th-008", "th-004"], rating: 4 },
  { text: "Selligent handles multi-language campaigns better than any platform we have used.", source: "NPS", product_id: "selligent", sentiment_score: 0.80, sentiment_label: "positive", theme_ids: ["th-005"] },
  { text: "The data sync between Cheetah and our CRM is constantly breaking. No error notifications.", source: "Support", product_id: "cheetah", sentiment_score: 0.08, sentiment_label: "negative", theme_ids: ["th-004"] },
  { text: "Braze's Currents streaming export is invaluable for our data team. Real-time event streaming to Snowflake.", source: "Gartner", product_id: "braze", sentiment_score: 0.82, sentiment_label: "positive", theme_ids: ["th-007"] },
  { text: "Sailthru's send-time optimization improved our open rates by 18%. The ML models are clearly well-tuned.", source: "NPS", product_id: "sailthru", sentiment_score: 0.88, sentiment_label: "positive", theme_ids: ["th-003"] },
  { text: "Cheetah's template system is rigid. Cannot create reusable content modules across campaigns.", source: "Capterra", product_id: "cheetah", sentiment_score: 0.22, sentiment_label: "negative", theme_ids: ["th-010"], rating: 2 },
  { text: "Klaviyo's flow builder makes automation easy. Set up our abandoned cart flow in under an hour.", source: "Capterra", product_id: "klaviyo", sentiment_score: 0.85, sentiment_label: "positive", theme_ids: ["th-005"], rating: 5 },
  { text: "Iterable's experiment framework is powerful. True multivariate testing across channels, not just email.", source: "G2", product_id: "iterable", sentiment_score: 0.78, sentiment_label: "positive", theme_ids: ["th-007"], rating: 4 },
  { text: "Selligent's email rendering engine sometimes strips CSS in Outlook. Not ideal for B2B campaigns.", source: "Support", product_id: "selligent", sentiment_score: 0.25, sentiment_label: "negative", theme_ids: ["th-010"] },
  { text: "Moving from Sailthru to Braze was the best decision we made this year. Everything just works.", source: "G2", product_id: "braze", sentiment_score: 0.90, sentiment_label: "positive", theme_ids: ["th-008"], rating: 5 },
  { text: "Cheetah needs to invest in their developer tools. The competition has left them behind.", source: "Reddit", product_id: "cheetah", sentiment_score: 0.15, sentiment_label: "negative", theme_ids: ["th-004"] },
  { text: "Sailthru's customer success team genuinely cares about our outcomes. Quarterly business reviews are thorough.", source: "NPS", product_id: "sailthru", sentiment_score: 0.78, sentiment_label: "positive", theme_ids: ["th-008"] },
  { text: "Klaviyo's pre-built templates for ecommerce are excellent. Saved us weeks of design time.", source: "G2", product_id: "klaviyo", sentiment_score: 0.82, sentiment_label: "positive", theme_ids: ["th-010"], rating: 4 },
  { text: "The webhook system in Selligent is unreliable. Events get dropped during high-traffic periods.", source: "Support", product_id: "selligent", sentiment_score: 0.12, sentiment_label: "negative", theme_ids: ["th-004"] },
  { text: "Braze's documentation is the most comprehensive I have seen. Every endpoint has working code examples.", source: "Reddit", product_id: "braze", sentiment_score: 0.88, sentiment_label: "positive", theme_ids: ["th-004"] },
  { text: "Iterable handles transactional and marketing email equally well. No need for a separate ESP.", source: "Capterra", product_id: "iterable", sentiment_score: 0.75, sentiment_label: "positive", theme_ids: ["th-001"], rating: 4 },
  { text: "Cheetah's reporting exports are limited to CSV. No native BI tool integration.", source: "G2", product_id: "cheetah", sentiment_score: 0.20, sentiment_label: "negative", theme_ids: ["th-007"], rating: 2 },
  { text: "Sailthru's dynamic content blocks support Zephyr scripting. Powerful but steep learning curve.", source: "Capterra", product_id: "sailthru", sentiment_score: 0.55, sentiment_label: "positive", theme_ids: ["th-010"], rating: 3 },
  { text: "We switched from Selligent to Klaviyo. The simplicity and speed difference is night and day.", source: "G2", product_id: "klaviyo", sentiment_score: 0.85, sentiment_label: "positive", theme_ids: ["th-002"], rating: 5 },
  { text: "Braze's push notification system is the most reliable we have tested. 99.9% delivery rate.", source: "Capterra", product_id: "braze", sentiment_score: 0.90, sentiment_label: "positive", theme_ids: ["th-009"], rating: 5 },
  { text: "Selligent's consent management tools handle GDPR well, but the UX around preference centers needs work.", source: "G2", product_id: "selligent", sentiment_score: 0.48, sentiment_label: "neutral", theme_ids: ["th-002"], rating: 3 },
];

// Generate 200+ feedback items from templates with varied dates
function generateFeedback(): FeedbackItem[] {
  const items: FeedbackItem[] = [];
  const startDate = new Date("2026-01-27");

  feedbackTemplates.forEach((template, idx) => {
    const dayOffset = Math.floor(Math.random() * 28);
    const date = new Date(startDate);
    date.setDate(date.getDate() + dayOffset);

    items.push({
      id: `fb-${String(idx + 1).padStart(3, "0")}`,
      ...template,
      created_at: date.toISOString().split("T")[0],
    });
  });

  // Generate additional items to exceed 200
  const extraTexts = [
    { text: "Great platform for enterprise email marketing. The scale it handles is impressive.", source: "G2" as FeedbackSource, product_id: "sailthru", sentiment_score: 0.75, sentiment_label: "positive" as SentimentLabel, theme_ids: ["th-001"], rating: 4 },
    { text: "Email previews across clients are not reliable. What you see in the builder is not what recipients get.", source: "Support" as FeedbackSource, product_id: "cheetah", sentiment_score: 0.18, sentiment_label: "negative" as SentimentLabel, theme_ids: ["th-010"] },
    { text: "Reporting needs work but the core sending infrastructure is solid.", source: "Capterra" as FeedbackSource, product_id: "selligent", sentiment_score: 0.50, sentiment_label: "neutral" as SentimentLabel, theme_ids: ["th-007"], rating: 3 },
    { text: "Braze's customer success team is top-notch. They proactively suggest optimizations.", source: "NPS" as FeedbackSource, product_id: "braze", sentiment_score: 0.85, sentiment_label: "positive" as SentimentLabel, theme_ids: ["th-008"] },
    { text: "Klaviyo's email editor is simple and fast. Our team adopted it instantly.", source: "Capterra" as FeedbackSource, product_id: "klaviyo", sentiment_score: 0.78, sentiment_label: "positive" as SentimentLabel, theme_ids: ["th-010"], rating: 4 },
    { text: "The journey builder crashed during our peak sending period. Critical issue.", source: "Support" as FeedbackSource, product_id: "cheetah", sentiment_score: 0.05, sentiment_label: "negative" as SentimentLabel, theme_ids: ["th-005"] },
    { text: "Iterable's AI-driven recommendations have directly impacted our revenue.", source: "G2" as FeedbackSource, product_id: "iterable", sentiment_score: 0.82, sentiment_label: "positive" as SentimentLabel, theme_ids: ["th-003"], rating: 4 },
    { text: "Selligent's reporting is basic at best. No funnel visualization or cohort analysis.", source: "Capterra" as FeedbackSource, product_id: "selligent", sentiment_score: 0.22, sentiment_label: "negative" as SentimentLabel, theme_ids: ["th-007"], rating: 2 },
    { text: "Sailthru's API response times are consistently fast. Under 100ms for most endpoints.", source: "Reddit" as FeedbackSource, product_id: "sailthru", sentiment_score: 0.80, sentiment_label: "positive" as SentimentLabel, theme_ids: ["th-004"] },
    { text: "We are evaluating alternatives to Cheetah Digital. The platform feels stagnant.", source: "G2" as FeedbackSource, product_id: "cheetah", sentiment_score: 0.12, sentiment_label: "negative" as SentimentLabel, theme_ids: ["th-006"], rating: 1 },
    { text: "Braze's segmentation engine supports real-time attributes, which is crucial for our use case.", source: "Capterra" as FeedbackSource, product_id: "braze", sentiment_score: 0.85, sentiment_label: "positive" as SentimentLabel, theme_ids: ["th-002"], rating: 5 },
    { text: "Mobile push on Selligent requires too many workarounds for basic functionality.", source: "Support" as FeedbackSource, product_id: "selligent", sentiment_score: 0.15, sentiment_label: "negative" as SentimentLabel, theme_ids: ["th-009"] },
    { text: "Klaviyo's pricing scales linearly with contacts. Predictable and fair.", source: "G2" as FeedbackSource, product_id: "klaviyo", sentiment_score: 0.75, sentiment_label: "positive" as SentimentLabel, theme_ids: ["th-006"], rating: 4 },
    { text: "The drag-and-drop builder in Iterable is smooth. Minor bugs but overall good.", source: "Capterra" as FeedbackSource, product_id: "iterable", sentiment_score: 0.68, sentiment_label: "positive" as SentimentLabel, theme_ids: ["th-010"], rating: 4 },
    { text: "Sailthru's content affinity scoring is our most-used feature. It drives personalized newsletters.", source: "NPS" as FeedbackSource, product_id: "sailthru", sentiment_score: 0.88, sentiment_label: "positive" as SentimentLabel, theme_ids: ["th-003"] },
    { text: "The API rate limits on Cheetah are too restrictive for batch operations.", source: "Support" as FeedbackSource, product_id: "cheetah", sentiment_score: 0.15, sentiment_label: "negative" as SentimentLabel, theme_ids: ["th-004"] },
    { text: "Braze's Canvas feature is the most flexible campaign builder we have ever used.", source: "G2" as FeedbackSource, product_id: "braze", sentiment_score: 0.92, sentiment_label: "positive" as SentimentLabel, theme_ids: ["th-005"], rating: 5 },
    { text: "Selligent support response times have improved this quarter, but resolution quality is inconsistent.", source: "NPS" as FeedbackSource, product_id: "selligent", sentiment_score: 0.40, sentiment_label: "neutral" as SentimentLabel, theme_ids: ["th-008"] },
    { text: "Iterable's webhook delivery is reliable. We use it for real-time event forwarding.", source: "Reddit" as FeedbackSource, product_id: "iterable", sentiment_score: 0.72, sentiment_label: "positive" as SentimentLabel, theme_ids: ["th-004"] },
    { text: "Cheetah Digital is losing ground to newer platforms. The product roadmap feels unclear.", source: "Gartner" as FeedbackSource, product_id: "cheetah", sentiment_score: 0.18, sentiment_label: "negative" as SentimentLabel, theme_ids: ["th-006"] },
    { text: "Email deliverability on Klaviyo requires almost zero configuration. It just works well.", source: "G2" as FeedbackSource, product_id: "klaviyo", sentiment_score: 0.82, sentiment_label: "positive" as SentimentLabel, theme_ids: ["th-001"], rating: 4 },
    { text: "Sailthru's natural language segment creation is a unique feature. Makes complex targeting accessible.", source: "Capterra" as FeedbackSource, product_id: "sailthru", sentiment_score: 0.72, sentiment_label: "positive" as SentimentLabel, theme_ids: ["th-002"], rating: 4 },
    { text: "We are seeing a 40% cost reduction since consolidating channels on Iterable.", source: "NPS" as FeedbackSource, product_id: "iterable", sentiment_score: 0.80, sentiment_label: "positive" as SentimentLabel, theme_ids: ["th-006"] },
    { text: "Selligent's real-time event triggers work well for transactional messages.", source: "G2" as FeedbackSource, product_id: "selligent", sentiment_score: 0.68, sentiment_label: "positive" as SentimentLabel, theme_ids: ["th-005"], rating: 4 },
    { text: "Cheetah's data model is overly complex. Simple things like updating a profile field require multiple API calls.", source: "Reddit" as FeedbackSource, product_id: "cheetah", sentiment_score: 0.10, sentiment_label: "negative" as SentimentLabel, theme_ids: ["th-004"] },
    { text: "Braze handles scale effortlessly. We sent 50M messages last month with zero issues.", source: "G2" as FeedbackSource, product_id: "braze", sentiment_score: 0.88, sentiment_label: "positive" as SentimentLabel, theme_ids: ["th-001"], rating: 5 },
    { text: "The template library in Cheetah Digital needs significant modernization.", source: "Capterra" as FeedbackSource, product_id: "cheetah", sentiment_score: 0.20, sentiment_label: "negative" as SentimentLabel, theme_ids: ["th-010"], rating: 2 },
    { text: "Klaviyo's predictive analytics for customer lifetime value is remarkably accurate.", source: "G2" as FeedbackSource, product_id: "klaviyo", sentiment_score: 0.85, sentiment_label: "positive" as SentimentLabel, theme_ids: ["th-003"], rating: 5 },
    { text: "Sailthru needs better A/B testing tools. Current setup is too manual.", source: "NPS" as FeedbackSource, product_id: "sailthru", sentiment_score: 0.35, sentiment_label: "negative" as SentimentLabel, theme_ids: ["th-007"] },
    { text: "Iterable's pricing model works well for growing companies. Usage-based with no surprises.", source: "Capterra" as FeedbackSource, product_id: "iterable", sentiment_score: 0.72, sentiment_label: "positive" as SentimentLabel, theme_ids: ["th-006"], rating: 4 },
    { text: "Selligent's mobile push reliability has improved with the latest SDK update.", source: "Support" as FeedbackSource, product_id: "selligent", sentiment_score: 0.55, sentiment_label: "positive" as SentimentLabel, theme_ids: ["th-009"] },
    { text: "Braze's segmentation handles complex boolean logic better than any platform we tested.", source: "G2" as FeedbackSource, product_id: "braze", sentiment_score: 0.82, sentiment_label: "positive" as SentimentLabel, theme_ids: ["th-002"], rating: 5 },
    { text: "Cheetah's journey builder is missing basic features like wait steps and time-based triggers.", source: "Support" as FeedbackSource, product_id: "cheetah", sentiment_score: 0.12, sentiment_label: "negative" as SentimentLabel, theme_ids: ["th-005"] },
    { text: "Sailthru's integration with our CDP was smooth. The webhook endpoints are well-documented.", source: "G2" as FeedbackSource, product_id: "sailthru", sentiment_score: 0.75, sentiment_label: "positive" as SentimentLabel, theme_ids: ["th-004"], rating: 4 },
    { text: "Klaviyo's SMS capabilities have matured significantly. Now a viable alternative to standalone SMS tools.", source: "Capterra" as FeedbackSource, product_id: "klaviyo", sentiment_score: 0.78, sentiment_label: "positive" as SentimentLabel, theme_ids: ["th-005"], rating: 4 },
    { text: "We had to hire a consultant to implement Selligent. The platform is not self-serve friendly.", source: "G2" as FeedbackSource, product_id: "selligent", sentiment_score: 0.22, sentiment_label: "negative" as SentimentLabel, theme_ids: ["th-008"], rating: 2 },
    { text: "Iterable's support team resolves issues quickly. Average response time under 4 hours.", source: "NPS" as FeedbackSource, product_id: "iterable", sentiment_score: 0.78, sentiment_label: "positive" as SentimentLabel, theme_ids: ["th-008"] },
  ];

  extraTexts.forEach((template, idx) => {
    const dayOffset = Math.floor(Math.random() * 28);
    const date = new Date(startDate);
    date.setDate(date.getDate() + dayOffset);

    items.push({
      id: `fb-${String(feedbackTemplates.length + idx + 1).padStart(3, "0")}`,
      ...template,
      created_at: date.toISOString().split("T")[0],
    });
  });

  return items;
}

export const feedbackItems: FeedbackItem[] = generateFeedback();

// ============================================================
// Alerts
// ============================================================
export const alerts: Alert[] = [
  {
    id: "alert-001",
    severity: "critical",
    theme_id: "th-001",
    title: "Email Deliverability Drop Detected",
    description: "Sailthru deliverability sentiment has dropped 13 points over the past 3 weeks. Negative feedback volume increased 40% week-over-week, primarily from G2 and Support tickets.",
    created_at: "2026-02-22T14:30:00Z",
  },
  {
    id: "alert-002",
    severity: "warning",
    theme_id: "th-006",
    title: "Pricing Churn Risk Rising",
    description: "Cheetah Digital pricing concerns showing sustained negative trend. Three recent G2 reviews mention actively evaluating competitor pricing. Sentiment at 0.28, down from 0.35 four weeks ago.",
    created_at: "2026-02-21T09:15:00Z",
  },
  {
    id: "alert-003",
    severity: "info",
    theme_id: "th-003",
    title: "AI Personalization Gaining Traction",
    description: "Sailthru AI personalization theme sentiment has risen steadily to 0.72. Multiple G2 reviews cite measurable ROI from AI features. Emerging competitive differentiator.",
    created_at: "2026-02-20T11:45:00Z",
  },
];

// ============================================================
// Weekly Briefs
// ============================================================
export const weeklyBriefs: WeeklyBrief[] = [
  {
    id: "brief-001",
    week_of: "2026-02-17",
    title: "Week of February 17, 2026",
    content: `## Weekly Intelligence Brief

### Executive Summary

This week saw **293 new feedback items** analyzed across all sources. The overall sentiment index stands at **62/100**, down 2 points from last week. Two themes require immediate attention: Email Deliverability and Pricing Concerns are both showing sustained negative trajectories.

### Key Findings

**1. Email Deliverability Concerns Intensifying**

Sailthru deliverability feedback has turned sharply negative, with sentiment dropping from 0.55 to 0.42 over the past four weeks. The primary drivers are:
- Gmail inbox placement issues reported by multiple enterprise customers
- IP warming documentation gaps causing problems for new senders
- Support response times for deliverability issues averaging 3+ days

*Recommendation:* Escalate to the Sailthru product team. Consider a dedicated deliverability task force and proactive outreach to affected accounts.

**2. Cheetah Digital Segmentation UX Falling Behind**

The Segmentation UX theme continues its downward trend (sentiment: 0.38). Competitors, particularly Klaviyo and Braze, are consistently praised for real-time segmentation while Cheetah users report multi-minute query times and an outdated interface.

*Recommendation:* Prioritize segmentation performance improvements in the Q2 roadmap. Conduct competitive UX audit against Klaviyo's segment builder.

**3. AI Personalization as Competitive Moat**

Sailthru's AI personalization capabilities continue to receive strong positive sentiment (0.72, up from 0.63 four weeks ago). Multiple reviews cite measurable business outcomes: 15-22% lift in engagement metrics. This is a rare area where Marigold products lead the competition.

*Recommendation:* Feature AI personalization more prominently in marketing materials. Consider packaging AI capabilities as a standalone value proposition.

### Competitive Landscape

- **Braze** continues to receive the highest overall sentiment (0.78) with particular strength in cross-channel orchestration and developer experience
- **Klaviyo** dominates ecommerce-focused feedback with praise for segmentation speed and transparent pricing
- **Iterable** gaining positive mentions for cross-channel capabilities and improving AI features

### Emerging Signals

- Growing demand for **real-time CDP integration** across all platforms
- **Privacy and consent management** emerging as a differentiator, particularly for Selligent in European markets
- **SMS/MMS capabilities** becoming table stakes, no longer a differentiator

### Source Distribution This Week

| Source | Count | Avg Sentiment |
|--------|-------|---------------|
| G2 | 87 | 0.52 |
| Support | 68 | 0.31 |
| Capterra | 52 | 0.58 |
| NPS | 44 | 0.55 |
| Gartner | 22 | 0.49 |
| Reddit | 20 | 0.48 |`,
    key_metrics: {
      top_themes: ["Email Deliverability", "Segmentation UX", "AI Personalization"],
      emerging_signals: ["Real-time CDP integration demand", "Privacy/consent management", "SMS becoming table stakes"],
      sentiment_changes: [
        { theme: "Email Deliverability", change: -5 },
        { theme: "Segmentation UX", change: -3 },
        { theme: "AI Personalization", change: +3 },
        { theme: "Pricing Concerns", change: -2 },
        { theme: "Cross-Channel Orchestration", change: +3 },
      ],
    },
  },
  {
    id: "brief-002",
    week_of: "2026-02-10",
    title: "Week of February 10, 2026",
    content: `## Weekly Intelligence Brief

### Executive Summary

This week saw **276 new feedback items** analyzed. The overall sentiment index stands at **64/100**, stable from last week. Notable movement in AI Personalization (positive) and API Documentation (negative).

### Key Findings

**1. AI Personalization Momentum Building**

Sailthru's AI features continue to generate positive buzz. This week saw five separate G2 reviews specifically mentioning the recommendation engine's impact on revenue. Sentiment improved from 0.66 to 0.69.

*Recommendation:* Capture and package these success stories as case studies. The quantifiable ROI claims (15-22% lifts) are powerful sales enablement material.

**2. Developer Experience Gap Widening**

The API Documentation theme shows persistent negative sentiment (0.35) primarily affecting Cheetah Digital. Developer feedback on Reddit and G2 consistently calls out missing documentation, outdated SDKs, and lack of sandbox environments. This contrasts sharply with Braze (0.82 API doc sentiment) and Iterable (0.80).

*Recommendation:* Invest in developer experience for Cheetah Digital as a strategic priority. The developer community influences buying decisions.

**3. Cross-Channel Orchestration Demand Growing**

Feedback volume for cross-channel orchestration increased 20% week-over-week. Selligent is well-positioned but needs to expand beyond email and SMS to include web push and in-app messaging.

*Recommendation:* Accelerate web push and in-app channel additions to the Selligent journey builder.

### Competitive Landscape

- **Braze** launched new AI features that are generating buzz in Reddit developer communities
- **Klaviyo** announced SMS expansion to European markets
- **Iterable** receiving positive feedback for recent UX improvements to their campaign builder

### Emerging Signals

- Increasing mentions of **AI-generated email copy** as a desired feature
- Several reviews comparing marketing automation platforms to **CDP capabilities**
- **Deliverability transparency** becoming an expectation (public status pages, real-time metrics)

### Source Distribution This Week

| Source | Count | Avg Sentiment |
|--------|-------|---------------|
| G2 | 82 | 0.54 |
| Support | 61 | 0.33 |
| Capterra | 49 | 0.56 |
| NPS | 42 | 0.52 |
| Gartner | 24 | 0.50 |
| Reddit | 18 | 0.45 |`,
    key_metrics: {
      top_themes: ["AI Personalization", "API Documentation", "Cross-Channel Orchestration"],
      emerging_signals: ["AI-generated email copy demand", "CDP comparison trend", "Deliverability transparency expectations"],
      sentiment_changes: [
        { theme: "AI Personalization", change: +3 },
        { theme: "API Documentation", change: -1 },
        { theme: "Cross-Channel Orchestration", change: +2 },
        { theme: "Pricing Concerns", change: -3 },
        { theme: "Template Builder", change: +3 },
      ],
    },
  },
];

// ============================================================
// Sentiment History (8 weeks for sparkline)
// ============================================================
export const sentimentHistory = [
  { week: "W1 Jan", score: 66 },
  { week: "W2 Jan", score: 65 },
  { week: "W3 Jan", score: 67 },
  { week: "W4 Jan", score: 65 },
  { week: "W1 Feb", score: 64 },
  { week: "W2 Feb", score: 63 },
  { week: "W3 Feb", score: 62 },
  { week: "W4 Feb", score: 62 },
];

// ============================================================
// Source Distribution
// ============================================================
export const sourceDistribution = [
  { source: "G2", count: 87, color: "#3b82f6" },
  { source: "Capterra", count: 52, color: "#8b5cf6" },
  { source: "Support", count: 68, color: "#ef4444" },
  { source: "NPS", count: 44, color: "#22c55e" },
  { source: "Gartner", count: 22, color: "#f59e0b" },
  { source: "Reddit", count: 20, color: "#f97316" },
];

// ============================================================
// Competitive Data
// ============================================================
export const competitiveRatings = [
  { product: "Sailthru", avg_rating: 4.1, sentiment: 0.62, color: "#3b82f6" },
  { product: "Cheetah Digital", avg_rating: 3.2, sentiment: 0.38, color: "#6366f1" },
  { product: "Selligent", avg_rating: 3.6, sentiment: 0.52, color: "#8b5cf6" },
  { product: "Braze", avg_rating: 4.5, sentiment: 0.78, color: "#22c55e" },
  { product: "Klaviyo", avg_rating: 4.4, sentiment: 0.76, color: "#14b8a6" },
  { product: "Iterable", avg_rating: 4.2, sentiment: 0.71, color: "#f59e0b" },
];

export const competitiveSentimentTrend = [
  { week: "W4 Jan", sailthru: 0.64, cheetah: 0.40, selligent: 0.54, braze: 0.76, klaviyo: 0.74, iterable: 0.69 },
  { week: "W1 Feb", sailthru: 0.63, cheetah: 0.39, selligent: 0.53, braze: 0.77, klaviyo: 0.75, iterable: 0.70 },
  { week: "W2 Feb", sailthru: 0.62, cheetah: 0.38, selligent: 0.52, braze: 0.78, klaviyo: 0.76, iterable: 0.71 },
  { week: "W3 Feb", sailthru: 0.62, cheetah: 0.38, selligent: 0.52, braze: 0.78, klaviyo: 0.76, iterable: 0.71 },
];

export const competitiveThemeComparison = [
  {
    theme: "Email Deliverability",
    sailthru: 0.42,
    cheetah: 0.25,
    selligent: 0.45,
    braze: 0.55,
    klaviyo: 0.80,
    iterable: 0.75,
  },
  {
    theme: "Segmentation",
    sailthru: 0.58,
    cheetah: 0.22,
    selligent: 0.48,
    braze: 0.85,
    klaviyo: 0.92,
    iterable: 0.55,
  },
  {
    theme: "AI/Personalization",
    sailthru: 0.72,
    cheetah: 0.30,
    selligent: 0.40,
    braze: 0.78,
    klaviyo: 0.85,
    iterable: 0.72,
  },
  {
    theme: "Cross-Channel",
    sailthru: 0.50,
    cheetah: 0.28,
    selligent: 0.65,
    braze: 0.88,
    klaviyo: 0.68,
    iterable: 0.85,
  },
  {
    theme: "Developer Experience",
    sailthru: 0.60,
    cheetah: 0.15,
    selligent: 0.35,
    braze: 0.85,
    klaviyo: 0.70,
    iterable: 0.80,
  },
  {
    theme: "Pricing",
    sailthru: 0.45,
    cheetah: 0.18,
    selligent: 0.40,
    braze: 0.55,
    klaviyo: 0.78,
    iterable: 0.65,
  },
];

// ============================================================
// System Health Data
// ============================================================
export const pipelineRuns: PipelineRun[] = [
  { id: "run-001", status: "success", started_at: "2026-02-24T06:00:00Z", completed_at: "2026-02-24T06:12:34Z", items_processed: 47, errors: 0, source: "G2" },
  { id: "run-002", status: "success", started_at: "2026-02-24T06:15:00Z", completed_at: "2026-02-24T06:22:18Z", items_processed: 31, errors: 0, source: "Capterra" },
  { id: "run-003", status: "partial", started_at: "2026-02-24T06:30:00Z", completed_at: "2026-02-24T06:45:22Z", items_processed: 28, errors: 3, source: "Support" },
  { id: "run-004", status: "success", started_at: "2026-02-24T07:00:00Z", completed_at: "2026-02-24T07:08:45Z", items_processed: 22, errors: 0, source: "NPS" },
  { id: "run-005", status: "success", started_at: "2026-02-24T07:15:00Z", completed_at: "2026-02-24T07:19:33Z", items_processed: 12, errors: 0, source: "Gartner" },
  { id: "run-006", status: "failed", started_at: "2026-02-24T07:30:00Z", completed_at: "2026-02-24T07:30:12Z", items_processed: 0, errors: 1, source: "Reddit" },
];

export const evalMetrics: EvalMetrics = {
  classification_accuracy: 0.924,
  sentiment_accuracy: 0.891,
  cluster_coherence: 0.847,
  last_eval_date: "2026-02-23",
};

export const costTracker: CostTracker = {
  month: "February 2026",
  openai_spend: 142.87,
  anthropic_spend: 89.34,
  total_tokens: 2_847_293,
  budget: 300,
};

export const ingestionStatus = [
  { source: "G2" as FeedbackSource, status: "healthy" as const, last_sync: "2026-02-24T06:12:34Z", items_today: 47, error_rate: 0 },
  { source: "Capterra" as FeedbackSource, status: "healthy" as const, last_sync: "2026-02-24T06:22:18Z", items_today: 31, error_rate: 0 },
  { source: "Support" as FeedbackSource, status: "degraded" as const, last_sync: "2026-02-24T06:45:22Z", items_today: 28, error_rate: 0.097 },
  { source: "NPS" as FeedbackSource, status: "healthy" as const, last_sync: "2026-02-24T07:08:45Z", items_today: 22, error_rate: 0 },
  { source: "Gartner" as FeedbackSource, status: "healthy" as const, last_sync: "2026-02-24T07:19:33Z", items_today: 12, error_rate: 0 },
  { source: "Reddit" as FeedbackSource, status: "down" as const, last_sync: "2026-02-24T07:30:12Z", items_today: 0, error_rate: 1.0 },
];

// ============================================================
// Quick Stats (computed)
// ============================================================
export const quickStats = {
  total_feedback: feedbackItems.length,
  coverage_pct: 94.2,
  avg_sentiment: 0.52,
  active_themes: themes.length,
};
