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
  DollarSign,
} from "lucide-react";
import { getDashboardData } from "@/lib/data";
import { DashboardCharts } from "./dashboard-charts";

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

export default async function DashboardPage() {
  const { products, themes, alerts, sourceDistribution, sentimentHistory, quickStats } =
    await getDashboardData();

  const currentSentiment = sentimentHistory[sentimentHistory.length - 1].score;
  const prevSentiment = sentimentHistory[sentimentHistory.length - 2].score;
  const sentimentChange = currentSentiment - prevSentiment;
  const top5Themes = [...themes].sort((a, b) => b.arr_impact - a.arr_impact).slice(0, 5);
  const totalArrAtRisk = themes
    .filter((t) => t.classification === "pain_point" || t.classification === "churn_risk")
    .reduce((sum, t) => sum + t.arr_impact, 0);

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
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-red-500/10">
                <DollarSign className="h-5 w-5 text-red-400" />
              </div>
              <div>
                <p className="text-2xl font-bold">${(totalArrAtRisk / 1000000).toFixed(1)}M</p>
                <p className="text-xs text-muted-foreground">ARR at Risk</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts (client component for recharts) */}
      <DashboardCharts
        sentimentHistory={sentimentHistory}
        currentSentiment={currentSentiment}
        sentimentChange={sentimentChange}
        sourceDistribution={sourceDistribution}
      />

      {/* Second Row */}
      <div className="grid grid-cols-3 gap-6">
        {/* Top 5 Themes */}
        <Card className="col-span-2">
          <CardHeader>
            <CardTitle className="text-base">Top Themes by ARR Impact</CardTitle>
            <CardDescription>Ranked by revenue at risk, not volume</CardDescription>
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
                      <span className="text-xs font-bold text-amber-400">
                        ${(theme.arr_impact / 1000000).toFixed(1)}M
                      </span>
                      <span className="text-[10px] text-muted-foreground">
                        {theme.affected_accounts} accounts · {theme.feedback_count} items
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
