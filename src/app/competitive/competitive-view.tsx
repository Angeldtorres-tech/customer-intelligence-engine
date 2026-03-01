"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  Legend,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
} from "recharts";

const tooltipStyle = {
  backgroundColor: "hsl(224, 71%, 4%)",
  border: "1px solid hsl(216, 34%, 17%)",
  borderRadius: "8px",
  fontSize: 12,
};

function getSentimentColor(score: number) {
  if (score >= 0.6) return "text-emerald-400";
  if (score >= 0.4) return "text-yellow-400";
  return "text-red-400";
}

interface CompetitiveViewProps {
  competitiveRatings: { product: string; avg_rating: number; sentiment: number; color: string }[];
  competitiveSentimentTrend: Record<string, unknown>[];
  competitiveThemeComparison: Record<string, unknown>[];
}

export function CompetitiveView({
  competitiveRatings,
  competitiveSentimentTrend,
  competitiveThemeComparison,
}: CompetitiveViewProps) {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Competitive View</h1>
        <p className="text-sm text-muted-foreground">
          Side-by-side comparison of Marigold products vs. competitors
        </p>
      </div>

      {/* Product Cards */}
      <div className="grid grid-cols-6 gap-3">
        {competitiveRatings.map((p) => (
          <Card key={p.product} className="relative overflow-hidden">
            <div
              className="absolute left-0 top-0 h-1 w-full"
              style={{ backgroundColor: p.color }}
            />
            <CardContent className="pt-5">
              <p className="text-sm font-semibold">{p.product}</p>
              <div className="mt-2 flex items-end justify-between">
                <div>
                  <p className="text-2xl font-bold tabular-nums">{p.avg_rating}</p>
                  <p className="text-[10px] text-muted-foreground">Avg Rating</p>
                </div>
                <div className="text-right">
                  <p className={`text-lg font-semibold tabular-nums ${getSentimentColor(p.sentiment)}`}>
                    {(p.sentiment * 100).toFixed(0)}%
                  </p>
                  <p className="text-[10px] text-muted-foreground">Sentiment</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts Row 1 */}
      <div className="grid grid-cols-2 gap-6">
        {/* Average Rating Bar Chart */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Average Rating by Product</CardTitle>
            <CardDescription>Based on review platform scores</CardDescription>
          </CardHeader>
          <CardContent>
            <div style={{ height: 300 }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={competitiveRatings} layout="vertical">
                  <XAxis
                    type="number"
                    domain={[0, 5]}
                    tick={{ fontSize: 10, fill: "#64748b" }}
                    axisLine={false}
                    tickLine={false}
                  />
                  <YAxis
                    dataKey="product"
                    type="category"
                    tick={{ fontSize: 11, fill: "#94a3b8" }}
                    axisLine={false}
                    tickLine={false}
                    width={110}
                  />
                  <Tooltip contentStyle={tooltipStyle} />
                  <Bar dataKey="avg_rating" radius={[0, 6, 6, 0]} barSize={20}>
                    {competitiveRatings.map((entry, index) => (
                      <rect key={index} fill={entry.color} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Sentiment Trend Lines */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Sentiment Trend</CardTitle>
            <CardDescription>4-week sentiment trajectory by product</CardDescription>
          </CardHeader>
          <CardContent>
            <div style={{ height: 300 }}>
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={competitiveSentimentTrend}>
                  <XAxis
                    dataKey="week"
                    tick={{ fontSize: 10, fill: "#64748b" }}
                    axisLine={false}
                    tickLine={false}
                  />
                  <YAxis
                    domain={[0.2, 0.9]}
                    tick={{ fontSize: 10, fill: "#64748b" }}
                    axisLine={false}
                    tickLine={false}
                    width={35}
                    tickFormatter={(v: number) => `${(v * 100).toFixed(0)}%`}
                  />
                  <Tooltip
                    contentStyle={tooltipStyle}
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    formatter={(value: any) => [`${(Number(value) * 100).toFixed(0)}%`]}
                  />
                  <Legend
                    wrapperStyle={{ fontSize: 11 }}
                    iconType="plainline"
                  />
                  <Line type="monotone" dataKey="sailthru" name="Sailthru" stroke="#3b82f6" strokeWidth={2} dot={false} />
                  <Line type="monotone" dataKey="cheetah" name="Cheetah" stroke="#6366f1" strokeWidth={2} dot={false} />
                  <Line type="monotone" dataKey="selligent" name="Selligent" stroke="#8b5cf6" strokeWidth={2} dot={false} />
                  <Line type="monotone" dataKey="braze" name="Braze" stroke="#22c55e" strokeWidth={2} dot={false} />
                  <Line type="monotone" dataKey="klaviyo" name="Klaviyo" stroke="#14b8a6" strokeWidth={2} dot={false} />
                  <Line type="monotone" dataKey="iterable" name="Iterable" stroke="#f59e0b" strokeWidth={2} dot={false} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Theme Comparison */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Theme Comparison</CardTitle>
          <CardDescription>
            How each product performs across key feedback themes (sentiment score)
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-6">
            {/* Radar Chart */}
            <div style={{ height: 350 }}>
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart data={competitiveThemeComparison}>
                  <PolarGrid stroke="hsl(216, 34%, 17%)" />
                  <PolarAngleAxis
                    dataKey="theme"
                    tick={{ fontSize: 10, fill: "#94a3b8" }}
                  />
                  <PolarRadiusAxis
                    angle={30}
                    domain={[0, 1]}
                    tick={{ fontSize: 9, fill: "#64748b" }}
                    tickFormatter={(v: number) => `${(v * 100).toFixed(0)}%`}
                  />
                  <Radar name="Sailthru" dataKey="sailthru" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.1} strokeWidth={2} />
                  <Radar name="Braze" dataKey="braze" stroke="#22c55e" fill="#22c55e" fillOpacity={0.1} strokeWidth={2} />
                  <Radar name="Klaviyo" dataKey="klaviyo" stroke="#14b8a6" fill="#14b8a6" fillOpacity={0.1} strokeWidth={2} />
                  <Legend wrapperStyle={{ fontSize: 11 }} />
                  <Tooltip
                    contentStyle={tooltipStyle}
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    formatter={(value: any) => [`${(Number(value) * 100).toFixed(0)}%`]}
                  />
                </RadarChart>
              </ResponsiveContainer>
            </div>

            {/* Theme table */}
            <div>
              <div className="overflow-hidden rounded-lg border border-border">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border bg-muted/50">
                      <th className="px-3 py-2.5 text-left text-xs font-medium text-muted-foreground">
                        Theme
                      </th>
                      {["Sailthru", "Cheetah", "Selligent", "Braze", "Klaviyo", "Iterable"].map(
                        (name) => (
                          <th
                            key={name}
                            className="px-2 py-2.5 text-center text-[10px] font-medium text-muted-foreground"
                          >
                            {name}
                          </th>
                        )
                      )}
                    </tr>
                  </thead>
                  <tbody>
                    {competitiveThemeComparison.map((row) => (
                      <tr
                        key={row.theme as string}
                        className="border-b border-border last:border-0"
                      >
                        <td className="px-3 py-2 text-xs font-medium">
                          {row.theme as string}
                        </td>
                        {(
                          [
                            row.sailthru,
                            row.cheetah,
                            row.selligent,
                            row.braze,
                            row.klaviyo,
                            row.iterable,
                          ] as number[]
                        ).map((val, i) => (
                          <td key={i} className="px-2 py-2 text-center">
                            <span
                              className={`text-xs font-medium tabular-nums ${getSentimentColor(
                                val
                              )}`}
                            >
                              {(val * 100).toFixed(0)}%
                            </span>
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
