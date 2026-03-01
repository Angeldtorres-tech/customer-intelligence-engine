"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { TrendingUp, TrendingDown } from "lucide-react";
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

interface DashboardChartsProps {
  sentimentHistory: { week: string; score: number }[];
  currentSentiment: number;
  sentimentChange: number;
  sourceDistribution: { source: string; count: number; color: string }[];
}

export function DashboardCharts({
  sentimentHistory,
  currentSentiment,
  sentimentChange,
  sourceDistribution,
}: DashboardChartsProps) {
  return (
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
  );
}
