"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  MessageSquare,
  Shield,
  TrendingUp,
  TrendingDown,
  Minus,
  BarChart3,
  AlertTriangle,
  AlertCircle,
  Info,
  Target,
} from "lucide-react";
import {
  sentimentHistory,
  themes,
  sourceDistribution,
  alerts,
  quickStats,
  products,
} from "@/lib/mock-data";
import {
  AreaChart,
  Area,
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

function getSentimentColor(score: number) {
  if (score >= 0.6) return "text-emerald-400";
  if (score >= 0.4) return "text-yellow-400";
  return "text-red-400";
}

function TrendIcon({ trend }: { trend: "up" | "stable" | "down" }) {
  if (trend === "up") return <TrendingUp className="h-3.5 w-3.5 text-emerald-400" />;
  if (trend === "down") return <TrendingDown className="h-3.5 w-3.5 text-red-400" />;
  return <Minus className="h-3.5 w-3.5 text-yellow-400" />;
}

function SeverityIcon({ severity }: { severity: string }) {
  if (severity === "critical") return <AlertTriangle className="h-4 w-4 text-red-400" />;
  if (severity === "warning") return <AlertCircle className="h-4 w-4 text-yellow-400" />;
  return <Info className="h-4 w-4 text-blue-400" />;
}

function severityBadgeVariant(severity: string) {
  if (severity === "critical") return "destructive" as const;
  if (severity === "warning") return "outline" as const;
  return "secondary" as const;
}

export default function DashboardPage() {
  const currentSentiment = sentimentHistory[sentimentHistory.length - 1].score;
  const prevSentiment = sentimentHistory[sentimentHistory.length - 2].score;
  const sentimentChange = currentSentiment - prevSentiment;
  const top5Themes = themes.slice(0, 5);

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-sm text-muted-foreground">
          AI Customer Intelligence Engine overview and key metrics
        </p>
      </div>

      {/* Quick Stats Row */}
      <div className="grid grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-500/10">
                <MessageSquare className="h-5 w-5 text-blue-400" />
              </div>
              <div>
                <p className="text-2xl font-bold">{quickStats.total_feedback}</p>
                <p className="text-xs text-muted-foreground">Total Feedback</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-500/10">
                <Shield className="h-5 w-5 text-emerald-400" />
              </div>
              <div>
                <p className="text-2xl font-bold">{quickStats.coverage_pct}%</p>
                <p className="text-xs text-muted-foreground">Coverage</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-yellow-500/10">
                <BarChart3 className="h-5 w-5 text-yellow-400" />
              </div>
              <div>
                <p className="text-2xl font-bold">{(quickStats.avg_sentiment * 100).toFixed(0)}</p>
                <p className="text-xs text-muted-foreground">Avg Sentiment</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-purple-500/10">
                <Target className="h-5 w-5 text-purple-400" />
              </div>
              <div>
                <p className="text-2xl font-bold">{quickStats.active_themes}</p>
                <p className="text-xs text-muted-foreground">Active Themes</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-3 gap-6">
        {/* Sentiment Overview - spans 2 cols */}
        <Card className="col-span-2">
          <CardHeader>
            <CardTitle className="text-base">Sentiment Overview</CardTitle>
            <CardDescription>Overall sentiment score with 8-week trend</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-start gap-8">
              <div className="flex flex-col items-center gap-1">
                <span className="text-5xl font-bold text-foreground">
                  {currentSentiment}
                </span>
                <span className="text-xs text-muted-foreground">out of 100</span>
                <span
                  className={`mt-1 flex items-center gap-1 text-xs font-medium ${
                    sentimentChange >= 0 ? "text-emerald-400" : "text-red-400"
                  }`}
                >
                  {sentimentChange >= 0 ? (
                    <TrendingUp className="h-3 w-3" />
                  ) : (
                    <TrendingDown className="h-3 w-3" />
                  )}
                  {sentimentChange >= 0 ? "+" : ""}
                  {sentimentChange} from last week
                </span>
              </div>
              <div className="flex-1" style={{ height: 120 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={sentimentHistory}>
                    <defs>
                      <linearGradient id="sentimentGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                        <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <XAxis
                      dataKey="week"
                      tick={{ fontSize: 10, fill: "#64748b" }}
                      axisLine={false}
                      tickLine={false}
                    />
                    <YAxis
                      domain={[55, 75]}
                      tick={{ fontSize: 10, fill: "#64748b" }}
                      axisLine={false}
                      tickLine={false}
                      width={30}
                    />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "hsl(224, 71%, 4%)",
                        border: "1px solid hsl(216, 34%, 17%)",
                        borderRadius: "8px",
                        fontSize: 12,
                      }}
                    />
                    <Area
                      type="monotone"
                      dataKey="score"
                      stroke="#3b82f6"
                      strokeWidth={2}
                      fill="url(#sentimentGradient)"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Source Distribution */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Source Distribution</CardTitle>
            <CardDescription>Feedback by source</CardDescription>
          </CardHeader>
          <CardContent>
            <div style={{ height: 160 }}>
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={sourceDistribution}
                    cx="50%"
                    cy="50%"
                    innerRadius={45}
                    outerRadius={70}
                    dataKey="count"
                    nameKey="source"
                    strokeWidth={2}
                    stroke="hsl(224, 71%, 4%)"
                  >
                    {sourceDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(224, 71%, 4%)",
                      border: "1px solid hsl(216, 34%, 17%)",
                      borderRadius: "8px",
                      fontSize: 12,
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-2 grid grid-cols-2 gap-x-4 gap-y-1">
              {sourceDistribution.map((s) => (
                <div key={s.source} className="flex items-center gap-2 text-xs">
                  <span
                    className="inline-block h-2 w-2 rounded-full"
                    style={{ backgroundColor: s.color }}
                  />
                  <span className="text-muted-foreground">{s.source}</span>
                  <span className="ml-auto font-medium">{s.count}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Second Row */}
      <div className="grid grid-cols-3 gap-6">
        {/* Top 5 Themes */}
        <Card className="col-span-2">
          <CardHeader>
            <CardTitle className="text-base">Top Themes</CardTitle>
            <CardDescription>Ranked by relevance score</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {top5Themes.map((theme, idx) => {
                const product = products.find((p) => p.id === theme.top_product_id);
                return (
                  <div
                    key={theme.id}
                    className="flex items-center gap-4 rounded-lg border border-border bg-card p-3"
                  >
                    <span className="flex h-7 w-7 items-center justify-center rounded-md bg-muted text-xs font-bold text-muted-foreground">
                      {idx + 1}
                    </span>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium">{theme.name}</span>
                        <TrendIcon trend={theme.trend} />
                        <Badge variant="outline" className="ml-auto text-[10px]">
                          {product?.name}
                        </Badge>
                      </div>
                      <div className="mt-1.5 flex items-center gap-3">
                        <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-muted">
                          <div
                            className="h-full rounded-full bg-primary transition-all"
                            style={{ width: `${theme.score}%` }}
                          />
                        </div>
                        <span className="w-8 text-right text-xs font-medium tabular-nums">
                          {theme.score}
                        </span>
                      </div>
                    </div>
                    <div className="flex flex-col items-end gap-0.5">
                      <span
                        className={`text-xs font-medium ${getSentimentColor(
                          theme.avg_sentiment
                        )}`}
                      >
                        {(theme.avg_sentiment * 100).toFixed(0)}%
                      </span>
                      <span className="text-[10px] text-muted-foreground">
                        {theme.feedback_count} items
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Recent Alerts */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Recent Alerts</CardTitle>
            <CardDescription>Latest intelligence alerts</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {alerts.map((alert) => (
                <div key={alert.id} className="space-y-2">
                  <div className="flex items-start gap-2">
                    <SeverityIcon severity={alert.severity} />
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium leading-tight">
                          {alert.title}
                        </span>
                      </div>
                      <p className="mt-1 text-xs leading-relaxed text-muted-foreground line-clamp-2">
                        {alert.description}
                      </p>
                      <div className="mt-1.5 flex items-center gap-2">
                        <Badge
                          variant={severityBadgeVariant(alert.severity)}
                          className="text-[10px] capitalize"
                        >
                          {alert.severity}
                        </Badge>
                        <span className="text-[10px] text-muted-foreground">
                          {new Date(alert.created_at).toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric",
                            hour: "numeric",
                            minute: "2-digit",
                          })}
                        </span>
                      </div>
                    </div>
                  </div>
                  {alert.id !== alerts[alerts.length - 1].id && (
                    <div className="border-b border-border" />
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
