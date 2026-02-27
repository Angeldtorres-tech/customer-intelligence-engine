# Task: Wire CIE Dashboard to Supabase + Seed Marigold Data

## Supabase Credentials
- Project URL: https://zjelaarjsxxoegnjqiaa.supabase.co
- Anon Key: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpqZWxhYXJqc3h4b2VnbmpxaWFhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzIxMTY4ODEsImV4cCI6MjA4NzY5Mjg4MX0.APa5QTLhZRssG1sUCZW8NInMAxHdBqpB0uvizvyLNCE

## Database Schema
Tables already created in Supabase (see supabase/schema.sql):
- company_configs, products, themes, feedback_items, feedback_themes
- alerts, weekly_briefs, pipeline_runs, eval_metrics, cost_tracking
- Views: theme_stats, source_distribution
- All tables have RLS with public read policies

## What To Do

### Step 1: Install Supabase client
```
npm install @supabase/supabase-js
```

### Step 2: Create Supabase client lib
Create `src/lib/supabase.ts` with the client initialization using env vars:
- NEXT_PUBLIC_SUPABASE_URL
- NEXT_PUBLIC_SUPABASE_ANON_KEY

Create `.env.local` with:
```
NEXT_PUBLIC_SUPABASE_URL=https://zjelaarjsxxoegnjqiaa.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpqZWxhYXJqc3h4b2VnbmpxaWFhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzIxMTY4ODEsImV4cCI6MjA4NzY5Mjg4MX0.APa5QTLhZRssG1sUCZW8NInMAxHdBqpB0uvizvyLNCE
```

### Step 3: Create data fetching layer
Create `src/lib/data.ts` that exports async functions to fetch from Supabase:
- getActiveConfig() - gets the active company_config
- getProducts(configId) - gets products for a config
- getThemes(configId) - gets themes with stats (use theme_stats view)
- getFeedbackItems(configId, options?) - gets feedback items with filtering
- getAlerts(configId) - gets alerts
- getWeeklyBriefs(configId) - gets briefs
- getPipelineRuns(configId) - gets pipeline runs
- getEvalMetrics(configId) - gets latest eval metrics
- getCostTracking(configId) - gets cost data
- getSourceDistribution(configId) - uses source_distribution view

Each function should have a fallback to mock-data.ts if Supabase returns empty/errors, so the dashboard always works.

### Step 4: Create seed script
Create `supabase/seed.ts` (a Node script) that:
1. Reads the existing mock-data.ts data
2. Creates a "Marigold" company_config (set is_active=true)
3. Inserts all products from marigold.json
4. Inserts all themes
5. Inserts all feedback_items with their theme relationships
6. Inserts alerts
7. Inserts weekly briefs
8. Inserts pipeline_runs, eval_metrics, cost_tracking
9. Uses the Supabase JS client to insert

Make it runnable via: `npx tsx supabase/seed.ts`

### Step 5: Update dashboard pages to use Supabase data
Update each page to fetch from Supabase (with mock data fallback):
- src/app/page.tsx (Dashboard Home)
- src/app/themes/page.tsx (Theme Explorer)
- src/app/brief/page.tsx (Weekly Brief)
- src/app/competitive/page.tsx (Competitive View)
- src/app/health/page.tsx (System Health)

Since these are server components by default in Next.js 14 App Router, you can fetch directly in the component. For any client components (charts), pass data as props.

### Step 6: Verify build
Run `npm run build` and fix any errors.

### Step 7: Add env vars to Vercel
After build succeeds, note that Vercel deployment will need env vars set in the Vercel dashboard.

## Important
- DO NOT hardcode the Supabase credentials in source code (use .env.local)
- Make sure .env.local is in .gitignore
- Keep mock-data.ts as fallback (don't delete it)
- The dashboard must still work with mock data if Supabase is unreachable

When completely finished, run this command to notify me:
openclaw system event --text "Done: CIE Dashboard wired to Supabase with seed script ready" --mode now
