# CIE Dashboard: Complete Field-by-Field Expert Guide

## What This Is

The **Customer Intelligence Engine (CIE) Dashboard** is the UI layer (Layer 3) of a portfolio use case demonstrating how an AI Product Manager would build an autonomous customer feedback intelligence system. It ingests user feedback from 6 sources (G2, Capterra, Gartner, Support Tickets, NPS Surveys, Reddit), runs it through an AI classification pipeline (Claude/GPT), and surfaces actionable product intelligence in a polished dark-mode dashboard.

**Target company context:** Marigold (marketing technology, 40K+ customers, products include Sailthru, Cheetah Digital, and Selligent). Competitors tracked: Braze, Klaviyo, Iterable.

**Tech stack:** Next.js 14, TypeScript, Tailwind CSS, shadcn/ui, Recharts. Designed for Supabase backend swap.

---

## PAGE 1: DASHBOARD HOME (`/`)

The executive overview. A PM opens this every morning to get the pulse of customer sentiment.

### Top Row: Quick Stats (4 KPI Cards)

1. **Total Feedback** (e.g., 293)
   - Count of all feedback items ingested across all sources in the current analysis window
   - Represents raw volume: reviews, support tickets, NPS responses, forum posts
   - Why it matters: Volume is a leading indicator. A spike means something happened (launch, outage, competitor move)

2. **Source Coverage** (e.g., 94.2%)
   - Percentage of configured data sources that are actively syncing and healthy
   - 100% = all 6 sources ingesting. Below 90% = a source is down or degraded
   - Why it matters: If Reddit is down (as shown), you're missing developer sentiment. Coverage gaps create blind spots

3. **Avg Sentiment** (e.g., 0.52)
   - Mean sentiment score across all feedback items, on a 0-1 scale
   - 0 = extremely negative, 0.5 = neutral, 1.0 = extremely positive
   - Calculated by the AI classification pipeline (Claude/GPT) analyzing each feedback item's text
   - Why it matters: The single number that tells you "are customers getting happier or angrier?"

4. **Active Themes** (e.g., 10)
   - Number of distinct themes the AI has clustered feedback into
   - Themes are auto-generated and human-validated topic clusters (e.g., "Email Deliverability," "Pricing Concerns")
   - Why it matters: Theme count growing = new concerns emerging. Shrinking = issues consolidating

### Middle Row Left: Sentiment Trend (Area Chart)

- **X-axis:** Weeks (8-week rolling window, W1 Jan through W4 Feb)
- **Y-axis:** Overall sentiment index (0-100 scale)
- **The line/area:** Shows the trajectory of aggregate customer sentiment
- **Gradient fill:** Blue gradient below the line for visual weight
- In the mock data: shows a downward trend from 66 to 62 over 8 weeks
- Why it matters: Direction matters more than absolute number. A steady decline demands investigation

### Middle Row Right: Source Distribution (Donut/Pie Chart)

- **Each slice:** One of the 6 feedback sources
- **Size:** Proportional to feedback count from that source
- **Colors:** G2 (blue), Capterra (purple), Support (red), NPS (green), Gartner (amber), Reddit (orange)
- **Legend:** Below the chart with source name and count
- Mock data breakdown: G2 (87), Support (68), Capterra (52), NPS (44), Gartner (22), Reddit (20)
- Why it matters: If Support tickets dominate, customers are escalating. If G2 dominates, the public narrative is shifting. Source mix tells you WHERE the signal is coming from

### Bottom Row Left: Top Themes (Ranked List, 2/3 width)

Each theme row shows:
- **Rank number** (1-5): Ordered by relevance score
- **Theme name** (e.g., "Email Deliverability"): AI-generated cluster label
- **Trend icon** (arrow up/down/dash): Direction of sentiment over past 4 weeks
- **Product badge** (e.g., "Sailthru"): Which product this theme is most associated with
- **Score bar** (0-100): Relevance score combining volume, recency, and severity
- **Sentiment percentage** (e.g., "42%"): Average sentiment for this theme (color-coded: green >60%, yellow 40-60%, red <40%)
- **Item count** (e.g., "48 items"): How many feedback items cluster into this theme

**The 10 themes in the system:**
1. Email Deliverability (87 score, pain point, trending down)
2. Segmentation UX (79, pain point, trending down)
3. AI Personalization (74, praise, trending up)
4. API Documentation (68, feature request, stable)
5. Cross-Channel Orchestration (65, feature request, trending up)
6. Pricing Concerns (61, churn risk, trending down)
7. Reporting & Analytics (58, feature request, stable)
8. Onboarding Experience (52, pain point, trending up)
9. Mobile SDK Quality (45, pain point, stable)
10. Template Builder (41, praise, trending up)

### Bottom Row Right: Recent Alerts (1/3 width)

Each alert shows:
- **Severity icon:** Red circle (critical), yellow triangle (warning), blue info circle
- **Title:** What happened
- **Description:** 2-3 sentence explanation with specific data points
- **Severity badge:** Color-coded pill
- **Timestamp:** When the alert was generated

**The 3 alerts:**
1. **CRITICAL: Email Deliverability Drop Detected** - Sailthru sentiment dropped 13 points in 3 weeks, negative feedback up 40% WoW
2. **WARNING: Pricing Churn Risk Rising** - Cheetah Digital pricing sentiment at 0.28, three G2 reviews mention evaluating competitors
3. **INFO: AI Personalization Gaining Traction** - Sailthru AI sentiment at 0.72, multiple reviews cite measurable ROI

Why alerts matter: They are the autonomous output. The system doesn't just collect data, it proactively surfaces what needs attention. This is the "AI agent" behavior.

---

## PAGE 2: THEME EXPLORER (`/themes`)

Deep-dive into any theme. This is where a PM investigates after seeing an alert.

### Filter/Search Bar
- **Search input:** Filter themes by name
- **Classification filter:** Dropdown to filter by type (All, Pain Point, Feature Request, Praise, Churn Risk)

### Theme Cards (Grid Layout)

Each theme card contains:
- **Theme name** + classification badge (color-coded: red=pain_point, blue=feature_request, green=praise, yellow=churn_risk)
- **Description:** 1-2 sentence explanation of what this theme captures
- **Score:** Relevance score (0-100) shown as a progress bar
- **Feedback count:** Number of items in this cluster
- **Avg sentiment:** Percentage with color coding
- **Trend indicator:** Up/down/stable arrow
- **Top product:** Which product this theme most impacts
- **Last updated:** When new feedback was last classified into this theme

### Expanded Theme Detail (when clicked/selected)

- **Sentiment History Chart:** 4-week sparkline showing sentiment trajectory for this specific theme
- **Source Breakdown:** Horizontal bar chart showing which sources contribute feedback to this theme
- **Sample Feedback:** Actual feedback text snippets classified into this theme, with source, product, sentiment score, and date

### The 4 Classification Types Explained

1. **Pain Point:** Customers expressing frustration or problems. Highest priority for product fixes
2. **Feature Request:** Customers asking for capabilities that don't exist. Feeds the roadmap
3. **Praise:** Customers expressing satisfaction. Identifies competitive advantages to protect
4. **Churn Risk:** Feedback patterns that correlate with customer departure. Requires immediate intervention

---

## PAGE 3: WEEKLY BRIEF (`/brief`)

Auto-generated intelligence reports. This is what gets sent to stakeholders every Monday.

### Brief Selector
- **Dropdown:** Select which week's brief to view (Week of Feb 17, Week of Feb 10, etc.)

### Brief Content

Each weekly brief contains:

1. **Executive Summary**
   - Total feedback items analyzed that week
   - Overall sentiment index (0-100) and week-over-week change
   - Top-line findings in 2-3 sentences

2. **Key Findings** (3 sections)
   - Each finding has a bold headline, supporting data, and a specific recommendation
   - Example: "Email Deliverability Concerns Intensifying" with sentiment drop data and recommendation to form a task force

3. **Competitive Landscape**
   - Bullet-point summary of what competitors are doing
   - Based on feedback about Braze, Klaviyo, Iterable

4. **Emerging Signals**
   - New trends that don't yet have enough volume to be full themes
   - Example: "Growing demand for real-time CDP integration"

5. **Source Distribution Table**
   - Breakdown of that week's feedback by source with count and average sentiment

### Key Metrics Sidebar

- **Top Themes:** The 3 most active themes that week
- **Emerging Signals:** New patterns detected
- **Sentiment Changes:** Theme-by-theme sentiment movement (e.g., "Email Deliverability: -5", "AI Personalization: +3")

Why this page matters: It demonstrates the PM can design an automated reporting system that replaces manual competitive analysis. The brief is structured for executive consumption, not data dump.

---

## PAGE 4: COMPETITIVE VIEW (`/competitive`)

Head-to-head comparison of Marigold products vs. competitors using customer feedback data.

### Top Section: Overall Ratings Table

| Field | Description |
|-------|-------------|
| **Product** | Company/product name (Sailthru, Cheetah Digital, Selligent, Braze, Klaviyo, Iterable) |
| **Avg Rating** | Mean star rating from review platforms (1-5 scale) |
| **Sentiment** | AI-computed sentiment score (0-1) from all feedback |
| **Color indicator** | Visual bar showing relative position |

Mock data ratings:
- Braze: 4.5 / 0.78 (highest)
- Klaviyo: 4.4 / 0.76
- Iterable: 4.2 / 0.71
- Sailthru: 4.1 / 0.62
- Selligent: 3.6 / 0.52
- Cheetah Digital: 3.2 / 0.38 (lowest)

### Sentiment Trend Over Time (Line Chart)

- **X-axis:** Weeks (W4 Jan through W3 Feb)
- **Y-axis:** Sentiment score (0-1)
- **6 lines:** One per product, color-coded
- Shows how each product's customer perception is moving
- Key insight: Braze and Klaviyo pulling ahead, Cheetah Digital declining

### Radar Chart: Theme Comparison

- **6 axes:** Email Deliverability, Segmentation, AI/Personalization, Cross-Channel, Developer Experience, Pricing
- **Overlaid polygons:** One per product
- Shows strength/weakness profile at a glance
- Key insights from the data:
  - Klaviyo dominates Segmentation (0.92) and Pricing (0.78)
  - Braze leads Cross-Channel (0.88) and Developer Experience (0.85)
  - Sailthru leads AI/Personalization (0.72) among Marigold products
  - Cheetah Digital is weakest across almost all dimensions

### Theme-by-Theme Comparison Table

- Rows: Each theme (Email Deliverability, Segmentation, AI/Personalization, Cross-Channel, Developer Experience, Pricing)
- Columns: Each product's sentiment score for that theme
- Color-coded cells (green/yellow/red) for quick scanning

Why this page matters: This is the competitive intelligence a PM uses to inform roadmap priorities. It answers "where are we winning, where are we losing, and where should we invest?"

---

## PAGE 5: SYSTEM HEALTH (`/health`)

Operational monitoring of the CIE pipeline itself. Proves the system is production-grade.

### Pipeline Runs Table

| Field | Description |
|-------|-------------|
| **Status** | success (green), partial (yellow), failed (red) |
| **Source** | Which data source this run ingested from |
| **Items Processed** | Number of feedback items classified in this run |
| **Errors** | Number of processing failures |
| **Started** | Timestamp of run start |
| **Duration** | Time to complete (computed from start/end) |

Mock data shows:
- G2: 47 items, 0 errors, 12m 34s (success)
- Capterra: 31 items, 0 errors, 7m 18s (success)
- Support: 28 items, 3 errors, 15m 22s (partial)
- NPS: 22 items, 0 errors, 8m 45s (success)
- Gartner: 12 items, 0 errors, 4m 33s (success)
- Reddit: 0 items, 1 error, 0m 12s (failed)

### Pipeline Summary Stats
- **Total items processed today:** Sum across all runs (140)
- **Total errors:** Sum of all errors (4)
- **Success rate:** Percentage of runs that completed without errors

### AI Model Evaluation Metrics

| Metric | Value | What It Measures |
|--------|-------|------------------|
| **Classification Accuracy** | 92.4% | How accurately the AI assigns feedback to the correct theme cluster |
| **Sentiment Accuracy** | 89.1% | How well the AI's sentiment score matches human-labeled ground truth |
| **Cluster Coherence** | 84.7% | How semantically similar items within the same theme cluster are |
| **Last Eval Date** | Feb 23 | When metrics were last benchmarked against a human-labeled test set |

Why these metrics matter: This is the AI evaluation framework. In an interview, you explain: "I built an evaluation pipeline that continuously benchmarks classification accuracy, sentiment accuracy, and cluster coherence against human-labeled ground truth. This follows the AMI cycle (Analyze-Measure-Improve) from Aakash Gupta's AI PM framework."

### Cost Tracker

| Field | Description |
|-------|-------------|
| **Month** | Current billing period (February 2026) |
| **OpenAI Spend** | $142.87 for GPT-4 API calls |
| **Anthropic Spend** | $89.34 for Claude API calls |
| **Total Tokens** | 2,847,293 tokens processed |
| **Budget** | $300 monthly allocation |
| **Budget Used** | Percentage bar showing spend vs. budget (77.4%) |

Why this matters: Shows cost awareness. A real AI PM must track and optimize LLM costs.

### Source Ingestion Status

| Field | Description |
|-------|-------------|
| **Source** | Data source name |
| **Status** | healthy (green), degraded (yellow), down (red) |
| **Last Sync** | Timestamp of last successful data pull |
| **Items Today** | Count of items ingested today |
| **Error Rate** | Percentage of failed ingestion attempts |

Mock status:
- G2: healthy, 47 items, 0% error
- Capterra: healthy, 31 items, 0% error
- Support: degraded, 28 items, 9.7% error (some tickets failing to parse)
- NPS: healthy, 22 items, 0% error
- Gartner: healthy, 12 items, 0% error
- Reddit: down, 0 items, 100% error (API connection failed)

---

## THE DATA MODEL (For Technical Interviews)

### Entities

1. **Product** - id, name, company (marigold/competitor)
2. **FeedbackItem** - id, text, source, product_id, sentiment_score (0-1), sentiment_label (pos/neutral/neg), theme_ids[], created_at, rating (optional 1-5)
3. **Theme** - id, name, description, score (0-100), feedback_count, avg_sentiment, trend (up/stable/down), classification (pain_point/feature_request/praise/churn_risk), sentiment_history[], source_breakdown[]
4. **Alert** - id, severity (critical/warning/info), theme_id, title, description, created_at
5. **WeeklyBrief** - id, week_of, title, content (markdown), key_metrics{}
6. **PipelineRun** - id, status (success/partial/failed), started_at, completed_at, items_processed, errors, source
7. **EvalMetrics** - classification_accuracy, sentiment_accuracy, cluster_coherence, last_eval_date
8. **CostTracker** - month, openai_spend, anthropic_spend, total_tokens, budget

### Data Sources (6)
- **G2** - B2B software review platform (highest volume, 87 items)
- **Capterra** - Software review site owned by Gartner (52 items)
- **Gartner** - Analyst firm reviews, typically more enterprise-focused (22 items)
- **Support** - Internal support ticket system (68 items, 2nd highest)
- **NPS** - Net Promoter Score survey responses (44 items)
- **Reddit** - Developer and user community discussions (20 items)

### Products Tracked (6)
**Marigold (own products):**
- Sailthru - Email personalization and lifecycle marketing
- Cheetah Digital - Customer engagement and loyalty platform
- Selligent - Cross-channel marketing automation (European strength)

**Competitors:**
- Braze - Customer engagement platform (highest rated overall)
- Klaviyo - Ecommerce-focused email and SMS marketing
- Iterable - Cross-channel marketing automation

---

## HOW TO EXPLAIN THIS IN AN INTERVIEW

### The 30-Second Pitch
"I built a Customer Intelligence Engine that autonomously ingests customer feedback from 6 public and internal sources, classifies it using Claude and GPT into themes, and surfaces actionable intelligence through a real-time dashboard. It generates weekly executive briefs, competitive benchmarks, and proactive alerts when sentiment drops. The eval framework tracks classification accuracy at 92.4% against human-labeled ground truth."

### The Product Thinking Questions

**"Why did you build this?"**
"Product teams drown in unstructured feedback across G2, Capterra, support tickets, and surveys. By the time a PM manually reads through it, the signal is weeks old. This system processes feedback in real-time and surfaces what matters, before it becomes a crisis."

**"How does the AI work?"**
"Each feedback item goes through a classification pipeline: sentiment scoring (0-1 continuous), theme clustering (using embeddings + Claude), and severity classification (pain point, feature request, praise, churn risk). The pipeline runs 4x daily. I evaluate model performance using a human-labeled test set, benchmarking classification accuracy, sentiment accuracy, and cluster coherence."

**"What would you do differently in production?"**
"Three things: (1) Replace mock data with live Supabase backend connected to real API scrapers, (2) Add a feedback loop where PMs can correct misclassifications to improve the model, (3) Implement anomaly detection for sentiment spikes rather than simple threshold alerts."

**"How do you evaluate AI quality?"**
"I use the AMI cycle: Analyze outputs against ground truth, Measure accuracy/coherence/sentiment precision, Improve by retraining or adjusting prompts. Current benchmarks: 92.4% classification accuracy, 89.1% sentiment accuracy, 84.7% cluster coherence. The System Health page makes these metrics visible to stakeholders."

**"What's the business impact?"**
"For a company like Marigold with 40K+ customers and 3 product lines, this replaces 20+ hours per week of manual competitive analysis. It catches churn signals weeks earlier, as shown by the Pricing Concerns alert detecting customers actively evaluating competitors. And it turns unstructured feedback into structured product roadmap inputs."

---

## FRAMEWORKS USED (Aakash Gupta's AI PM Stack)

1. **Problem-First Design:** Started with the PM pain point (drowning in unstructured feedback), not the AI capability
2. **Level 2 Today, Level 3 Ready:** Current system classifies and summarizes (Level 2). Architecture supports autonomous action like auto-filing Jira tickets (Level 3)
3. **Invisible Intelligence:** The AI is invisible to the end user. They see themes, alerts, and briefs, not prompts and models
4. **First/Last 20% Rule:** AI handles the first 20% (ingestion, classification) and last 20% (brief generation, alerting). The PM handles the strategic middle
5. **AMI Eval Cycle:** Analyze-Measure-Improve cycle visible on the System Health page
6. **3 Gulfs Model:** Bridges the gulf between raw customer feedback and actionable product decisions
