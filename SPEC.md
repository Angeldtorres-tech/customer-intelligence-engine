# CIE Dashboard - Build Spec

## What to Build
A Next.js dashboard for the AI Customer Intelligence Engine. This is a portfolio piece that demonstrates AI product management skills. It should look polished and professional.

## Tech Stack
- Next.js 14+ (App Router)
- TypeScript
- Tailwind CSS
- shadcn/ui components
- Recharts for charts
- Supabase client (for future live data)

## Pages

### 1. Dashboard Home (`/`)
- **Sentiment Overview**: Large card showing overall sentiment score (0-100) with trend sparkline (last 8 weeks)
- **Top 5 Themes**: Ranked list with score bars, sentiment indicator (green/yellow/red), trend arrow (up/stable/down), feedback count
- **Source Distribution**: Donut chart showing feedback by source (G2, Capterra, Support, etc.)
- **Recent Alerts**: Last 3 alerts with severity badge, theme name, timestamp
- **Quick Stats Row**: Total feedback analyzed, Coverage %, Avg sentiment, Active themes

### 2. Theme Explorer (`/themes`)
- Sortable/filterable table of all themes
- Columns: Theme name, Score, Feedback count, Avg sentiment, Trend, Top product, Last updated
- Click row to expand: see sample feedback items, sentiment over time mini-chart, source breakdown
- Filter by: product, source, classification, date range

### 3. Weekly Brief (`/brief`)
- Rendered markdown of the latest weekly intelligence brief
- Previous briefs in a sidebar/dropdown
- Key metrics highlighted: top themes, emerging signals, sentiment changes

### 4. Competitive View (`/competitive`)
- Side-by-side sentiment comparison: Marigold products vs competitors (Braze, Klaviyo, Iterable)
- Bar chart: average rating by product
- Theme comparison: what competitors are praised/criticized for
- Trend lines: sentiment over time per product

### 5. System Health (`/health`)
- Pipeline status: last run, items processed, errors
- Eval metrics: classification accuracy, sentiment accuracy, cluster coherence
- Cost tracker: API spend this month
- Ingestion status per source

## Design Requirements
- Dark mode by default (professional, modern)
- Color scheme: slate/zinc background, blue accent, green/yellow/red for sentiment
- Responsive but optimized for desktop (this is a demo tool)
- Clean typography, generous spacing
- NO em dashes anywhere in the UI text

## Data
- For now, use realistic mock data that matches the PRD schema
- Structure data loading so it's easy to swap mock for Supabase later
- Mock data should include:
  - 6 products (Sailthru, Cheetah Digital, Selligent, Braze, Klaviyo, Iterable)
  - 200+ feedback items across all sources
  - 8-10 themes with scores
  - 4 weeks of historical data
  - 3 sample alerts
  - 2 weekly briefs

## Mock Data File
Create a `lib/mock-data.ts` that exports all mock data. Make it realistic:
- Real-sounding review text about marketing automation features
- Realistic sentiment scores (not all 0.5)
- Proper date distribution
- Mix of positive and negative
- Competitive mentions

## Important
- This is a PORTFOLIO PIECE. It needs to look impressive.
- A hiring manager will see this. Every pixel matters.
- Include a header with "AI Customer Intelligence Engine" branding
- Include a footer: "Built by Angel Torres | AI PM Portfolio"
- Make the sidebar navigation clean and intuitive
- Loading states and empty states should look polished
