"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Clock,
  Cpu,
  DollarSign,
  Database,
  Activity,
  Zap,
} from "lucide-react";
import {
  pipelineRuns,
  evalMetrics,
  costTracker,
  ingestionStatus,
} from "@/lib/mock-data";

function statusIcon(status: string) {
  if (status === "success" || status === "healthy")
    return <CheckCircle2 className="h-4 w-4 text-emerald-400" />;
  if (status === "partial" || status === "degraded")
    return <AlertTriangle className="h-4 w-4 text-yellow-400" />;
  return <XCircle className="h-4 w-4 text-red-400" />;
}

function statusBadge(status: string) {
  if (status === "success" || status === "healthy")
    return (
      <Badge variant="outline" className="bg-emerald-400/10 text-emerald-400 border-emerald-400/20 text-[10px]">
        {status}
      </Badge>
    );
  if (status === "partial" || status === "degraded")
    return (
      <Badge variant="outline" className="bg-yellow-400/10 text-yellow-400 border-yellow-400/20 text-[10px]">
        {status}
      </Badge>
    );
  return (
    <Badge variant="outline" className="bg-red-400/10 text-red-400 border-red-400/20 text-[10px]">
      {status}
    </Badge>
  );
}

function metricColor(value: number, thresholds: [number, number]) {
  if (value >= thresholds[0]) return "text-emerald-400";
  if (value >= thresholds[1]) return "text-yellow-400";
  return "text-red-400";
}

function formatDuration(start: string, end: string) {
  const ms = new Date(end).getTime() - new Date(start).getTime();
  const seconds = Math.floor(ms / 1000);
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  if (minutes > 0) return `${minutes}m ${remainingSeconds}s`;
  return `${remainingSeconds}s`;
}

export default function HealthPage() {
  const totalProcessed = pipelineRuns.reduce(
    (sum, r) => sum + r.items_processed,
    0
  );
  const totalErrors = pipelineRuns.reduce((sum, r) => sum + r.errors, 0);
  const costPct =
    ((costTracker.openai_spend + costTracker.anthropic_spend) /
      costTracker.budget) *
    100;

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">System Health</h1>
        <p className="text-sm text-muted-foreground">
          Pipeline status, evaluation metrics, and operational costs
        </p>
      </div>

      {/* Quick Status Cards */}
      <div className="grid grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-500/10">
                <Activity className="h-5 w-5 text-emerald-400" />
              </div>
              <div>
                <p className="text-2xl font-bold tabular-nums">{totalProcessed}</p>
                <p className="text-xs text-muted-foreground">Items Processed</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-red-500/10">
                <AlertTriangle className="h-5 w-5 text-red-400" />
              </div>
              <div>
                <p className="text-2xl font-bold tabular-nums">{totalErrors}</p>
                <p className="text-xs text-muted-foreground">Errors Today</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-500/10">
                <Cpu className="h-5 w-5 text-blue-400" />
              </div>
              <div>
                <p className="text-2xl font-bold tabular-nums">
                  {(evalMetrics.classification_accuracy * 100).toFixed(1)}%
                </p>
                <p className="text-xs text-muted-foreground">Classification Acc.</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-purple-500/10">
                <DollarSign className="h-5 w-5 text-purple-400" />
              </div>
              <div>
                <p className="text-2xl font-bold tabular-nums">
                  ${(costTracker.openai_spend + costTracker.anthropic_spend).toFixed(0)}
                </p>
                <p className="text-xs text-muted-foreground">API Spend (MTD)</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-2 gap-6">
        {/* Pipeline Runs */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Pipeline Runs</CardTitle>
            <CardDescription>Latest ingestion pipeline executions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {pipelineRuns.map((run) => (
                <div
                  key={run.id}
                  className="flex items-center gap-3 rounded-lg border border-border p-3"
                >
                  {statusIcon(run.status)}
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium">{run.source}</span>
                      {statusBadge(run.status)}
                    </div>
                    <div className="mt-1 flex items-center gap-4 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Database className="h-3 w-3" />
                        {run.items_processed} items
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {formatDuration(run.started_at, run.completed_at)}
                      </span>
                      {run.errors > 0 && (
                        <span className="text-red-400">
                          {run.errors} error{run.errors !== 1 && "s"}
                        </span>
                      )}
                    </div>
                  </div>
                  <span className="text-[10px] text-muted-foreground">
                    {new Date(run.completed_at).toLocaleTimeString("en-US", {
                      hour: "numeric",
                      minute: "2-digit",
                    })}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Eval Metrics + Cost */}
        <div className="space-y-6">
          {/* Eval Metrics */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Evaluation Metrics</CardTitle>
              <CardDescription>
                Last evaluated on{" "}
                {new Date(evalMetrics.last_eval_date).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                })}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Classification Accuracy</span>
                    <span
                      className={`font-semibold tabular-nums ${metricColor(
                        evalMetrics.classification_accuracy,
                        [0.9, 0.8]
                      )}`}
                    >
                      {(evalMetrics.classification_accuracy * 100).toFixed(1)}%
                    </span>
                  </div>
                  <Progress
                    value={evalMetrics.classification_accuracy * 100}
                    className="mt-2 h-2"
                  />
                </div>
                <div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Sentiment Accuracy</span>
                    <span
                      className={`font-semibold tabular-nums ${metricColor(
                        evalMetrics.sentiment_accuracy,
                        [0.9, 0.8]
                      )}`}
                    >
                      {(evalMetrics.sentiment_accuracy * 100).toFixed(1)}%
                    </span>
                  </div>
                  <Progress
                    value={evalMetrics.sentiment_accuracy * 100}
                    className="mt-2 h-2"
                  />
                </div>
                <div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Cluster Coherence</span>
                    <span
                      className={`font-semibold tabular-nums ${metricColor(
                        evalMetrics.cluster_coherence,
                        [0.85, 0.75]
                      )}`}
                    >
                      {(evalMetrics.cluster_coherence * 100).toFixed(1)}%
                    </span>
                  </div>
                  <Progress
                    value={evalMetrics.cluster_coherence * 100}
                    className="mt-2 h-2"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Cost Tracker */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Cost Tracker</CardTitle>
              <CardDescription>{costTracker.month}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Budget Used</span>
                    <span className="font-semibold tabular-nums">
                      ${(costTracker.openai_spend + costTracker.anthropic_spend).toFixed(2)}{" "}
                      <span className="text-muted-foreground font-normal">
                        / ${costTracker.budget}
                      </span>
                    </span>
                  </div>
                  <Progress
                    value={costPct}
                    className="mt-2 h-2"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="rounded-lg border border-border p-3">
                    <p className="text-xs text-muted-foreground">OpenAI</p>
                    <p className="mt-1 text-lg font-semibold tabular-nums">
                      ${costTracker.openai_spend.toFixed(2)}
                    </p>
                  </div>
                  <div className="rounded-lg border border-border p-3">
                    <p className="text-xs text-muted-foreground">Anthropic</p>
                    <p className="mt-1 text-lg font-semibold tabular-nums">
                      ${costTracker.anthropic_spend.toFixed(2)}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2 rounded-lg bg-muted/50 px-3 py-2 text-xs text-muted-foreground">
                  <Zap className="h-3.5 w-3.5" />
                  {(costTracker.total_tokens / 1_000_000).toFixed(2)}M tokens processed
                  this month
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Ingestion Status */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Ingestion Status by Source</CardTitle>
          <CardDescription>Real-time health of each data source connector</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-3 gap-4">
            {ingestionStatus.map((source) => (
              <div
                key={source.source}
                className="flex items-center gap-3 rounded-lg border border-border p-4"
              >
                {statusIcon(source.status)}
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium">{source.source}</span>
                    {statusBadge(source.status)}
                  </div>
                  <div className="mt-1.5 flex items-center gap-4 text-xs text-muted-foreground">
                    <span>{source.items_today} items today</span>
                    {source.error_rate > 0 && (
                      <span className="text-red-400">
                        {(source.error_rate * 100).toFixed(1)}% errors
                      </span>
                    )}
                  </div>
                  <p className="mt-0.5 text-[10px] text-muted-foreground/60">
                    Last sync:{" "}
                    {new Date(source.last_sync).toLocaleTimeString("en-US", {
                      hour: "numeric",
                      minute: "2-digit",
                    })}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
