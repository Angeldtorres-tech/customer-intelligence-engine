# Customer Intelligence Engine (CIE) Dashboard

An AI-powered customer feedback intelligence system that autonomously ingests, classifies, and surfaces actionable product insights from multiple data sources.

Built as a portfolio demonstration of AI Product Management capabilities: system design, AI evaluation frameworks, competitive intelligence, and autonomous operations.

## What It Does

The CIE ingests customer feedback from 6 sources (G2, Capterra, Gartner, Support Tickets, NPS Surveys, Reddit), runs it through an AI classification pipeline, and surfaces intelligence through a real-time dashboard.

**5 Dashboard Pages:**

- **Dashboard Home** - Executive overview with KPI cards, sentiment trends, source distribution, top themes, and severity-coded alerts
- **Theme Explorer** - Deep-dive into AI-classified feedback themes (pain points, feature requests, praise, churn risks) with filtering, sentiment history, and source breakdowns
- **Weekly Brief** - Auto-generated executive intelligence reports with findings, recommendations, competitive landscape, and emerging signals
- **Competitive View** - Head-to-head product comparison with ratings, sentiment trend lines, radar charts, and theme-by-theme analysis
- **System Health** - Pipeline monitoring, AI model evaluation metrics (classification accuracy, sentiment accuracy, cluster coherence), cost tracking, and source ingestion status

## AI Evaluation Metrics

The system tracks three key AI quality metrics benchmarked against human-labeled ground truth:

| Metric | Score | What It Measures |
|--------|-------|------------------|
| Classification Accuracy | 92.4% | Correct theme assignment |
| Sentiment Accuracy | 89.1% | Sentiment score vs. human labels |
| Cluster Coherence | 84.7% | Semantic similarity within clusters |

## Tech Stack

- **Frontend:** Next.js 14, TypeScript, Tailwind CSS, shadcn/ui, Recharts
- **AI Pipeline:** Claude API + GPT-4 for classification and summarization
- **Workflow Automation:** n8n (4x daily ingestion runs)
- **Data Layer:** Designed for Supabase (PostgreSQL + real-time subscriptions)

## Architecture

```
[6 Data Sources] -> [n8n Workflow] -> [AI Classification Pipeline] -> [Supabase] -> [Dashboard UI]
     G2                 4x daily        Claude/GPT-4                   PostgreSQL    Next.js 14
     Capterra                           Sentiment scoring              Real-time     5 pages
     Gartner                            Theme clustering               subscriptions Dark mode
     Support                            Severity classification
     NPS
     Reddit
```

## Portfolio Context

This is Use Case 1 of 5 in an AI Product Management portfolio demonstrating:

1. **Customer Intelligence Engine** (this repo) - AI PM
2. Product Signal Monitor - AI PM
3. Project Health Monitor & Risk Detector - AI Project Management
4. Change Management Engine - AI Project Management
5. Stakeholder Communication Engine - AI Project Management

Each use case includes 12 portfolio artifacts (PRD, strategy brief, architecture diagram, eval framework, governance/risk assessment, roadmap, competitive analysis, user stories, stakeholder deck, metrics dashboard, GTM brief, retrospective), a working n8n workflow, and a UI dashboard.

## Frameworks Applied

- **Aakash Gupta's AI PM Stack** (6 phases: Strategy, Specification, Build, Evaluate, Ship, Operate)
- **Problem-First Design** - Started with the PM pain point, not the AI capability
- **AMI Eval Cycle** (Analyze-Measure-Improve) - Visible on System Health page
- **First/Last 20% Rule** - AI handles ingestion and alerting; PM handles strategic decisions
- **Level 2 Today, Level 3 Ready** - Classifies and summarizes now; architecture supports autonomous action

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## Author

**Angel Torres** - AI Product Management  
[LinkedIn](https://linkedin.com/in/angel-torres-4122281) | [GitHub](https://github.com/Angeldtorres-tech)
