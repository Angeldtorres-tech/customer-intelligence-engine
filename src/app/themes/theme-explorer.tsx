"use client";

import { useState, useMemo } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  TrendingUp,
  TrendingDown,
  Minus,
  ChevronDown,
  ChevronRight,
  Filter,
} from "lucide-react";
import type { Theme, FeedbackSource, Product, FeedbackItem } from "@/lib/mock-data";
import {
  AreaChart,
  Area,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
  BarChart,
  Bar,
} from "recharts";

function getSentimentColor(score: number) {
  if (score >= 0.6) return "text-emerald-400";
  if (score >= 0.4) return "text-yellow-400";
  return "text-red-400";
}

function getSentimentDot(score: number) {
  if (score >= 0.6) return "bg-emerald-400";
  if (score >= 0.4) return "bg-yellow-400";
  return "bg-red-400";
}

function TrendIcon({ trend }: { trend: "up" | "stable" | "down" }) {
  if (trend === "up") return <TrendingUp className="h-3.5 w-3.5 text-emerald-400" />;
  if (trend === "down") return <TrendingDown className="h-3.5 w-3.5 text-red-400" />;
  return <Minus className="h-3.5 w-3.5 text-yellow-400" />;
}

function classificationLabel(c: string) {
  const map: Record<string, string> = {
    feature_request: "Feature Request",
    pain_point: "Pain Point",
    praise: "Praise",
    churn_risk: "Churn Risk",
  };
  return map[c] || c;
}

function classificationColor(c: string) {
  const map: Record<string, string> = {
    feature_request: "bg-blue-400/10 text-blue-400 border-blue-400/20",
    pain_point: "bg-red-400/10 text-red-400 border-red-400/20",
    praise: "bg-emerald-400/10 text-emerald-400 border-emerald-400/20",
    churn_risk: "bg-orange-400/10 text-orange-400 border-orange-400/20",
  };
  return map[c] || "";
}

type SortKey = "score" | "feedback_count" | "avg_sentiment" | "name";
type SortDir = "asc" | "desc";

interface ThemeExplorerProps {
  themes: Theme[];
  products: Product[];
  feedbackItems: FeedbackItem[];
}

export function ThemeExplorer({ themes, products, feedbackItems }: ThemeExplorerProps) {
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [sortKey, setSortKey] = useState<SortKey>("score");
  const [sortDir, setSortDir] = useState<SortDir>("desc");
  const [filterProduct, setFilterProduct] = useState<string>("all");
  const [filterSource, setFilterSource] = useState<string>("all");
  const [filterClassification, setFilterClassification] = useState<string>("all");

  const filteredThemes = useMemo(() => {
    let result = [...themes];

    if (filterProduct !== "all") {
      result = result.filter((t) => t.top_product_id === filterProduct);
    }

    if (filterSource !== "all") {
      result = result.filter((t) =>
        t.source_breakdown.some((s) => s.source === filterSource)
      );
    }

    if (filterClassification !== "all") {
      result = result.filter((t) => t.classification === filterClassification);
    }

    result.sort((a, b) => {
      const aVal = a[sortKey];
      const bVal = b[sortKey];
      if (typeof aVal === "string" && typeof bVal === "string") {
        return sortDir === "asc"
          ? aVal.localeCompare(bVal)
          : bVal.localeCompare(aVal);
      }
      return sortDir === "asc"
        ? (aVal as number) - (bVal as number)
        : (bVal as number) - (aVal as number);
    });

    return result;
  }, [themes, filterProduct, filterSource, filterClassification, sortKey, sortDir]);

  function handleSort(key: SortKey) {
    if (sortKey === key) {
      setSortDir(sortDir === "asc" ? "desc" : "asc");
    } else {
      setSortKey(key);
      setSortDir("desc");
    }
  }

  function SortIndicator({ column }: { column: SortKey }) {
    if (sortKey !== column) return null;
    return <span className="ml-1 text-primary">{sortDir === "asc" ? "↑" : "↓"}</span>;
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Theme Explorer</h1>
        <p className="text-sm text-muted-foreground">
          Browse, filter, and analyze all detected feedback themes
        </p>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Filter className="h-4 w-4" />
              Filters
            </div>
            <Select value={filterProduct} onValueChange={setFilterProduct}>
              <SelectTrigger className="w-[160px]">
                <SelectValue placeholder="Product" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Products</SelectItem>
                {products
                  .filter((p) => p.company === "marigold")
                  .map((p) => (
                    <SelectItem key={p.id} value={p.id}>
                      {p.name}
                    </SelectItem>
                  ))}
              </SelectContent>
            </Select>
            <Select value={filterSource} onValueChange={setFilterSource}>
              <SelectTrigger className="w-[140px]">
                <SelectValue placeholder="Source" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Sources</SelectItem>
                {(["G2", "Capterra", "Gartner", "Support", "NPS", "Reddit"] as FeedbackSource[]).map(
                  (s) => (
                    <SelectItem key={s} value={s}>
                      {s}
                    </SelectItem>
                  )
                )}
              </SelectContent>
            </Select>
            <Select value={filterClassification} onValueChange={setFilterClassification}>
              <SelectTrigger className="w-[160px]">
                <SelectValue placeholder="Classification" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="feature_request">Feature Request</SelectItem>
                <SelectItem value="pain_point">Pain Point</SelectItem>
                <SelectItem value="praise">Praise</SelectItem>
                <SelectItem value="churn_risk">Churn Risk</SelectItem>
              </SelectContent>
            </Select>
            <span className="ml-auto text-xs text-muted-foreground">
              {filteredThemes.length} theme{filteredThemes.length !== 1 && "s"}
            </span>
          </div>
        </CardContent>
      </Card>

      {/* Table */}
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-8" />
                <TableHead
                  className="cursor-pointer select-none"
                  onClick={() => handleSort("name")}
                >
                  Theme <SortIndicator column="name" />
                </TableHead>
                <TableHead
                  className="cursor-pointer select-none text-right"
                  onClick={() => handleSort("score")}
                >
                  Score <SortIndicator column="score" />
                </TableHead>
                <TableHead
                  className="cursor-pointer select-none text-right"
                  onClick={() => handleSort("feedback_count")}
                >
                  Feedback <SortIndicator column="feedback_count" />
                </TableHead>
                <TableHead
                  className="cursor-pointer select-none text-right"
                  onClick={() => handleSort("avg_sentiment")}
                >
                  Sentiment <SortIndicator column="avg_sentiment" />
                </TableHead>
                <TableHead>Trend</TableHead>
                <TableHead>Top Product</TableHead>
                <TableHead>Type</TableHead>
                <TableHead className="text-right">Updated</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredThemes.map((theme) => (
                <ThemeRow
                  key={theme.id}
                  theme={theme}
                  products={products}
                  feedbackItems={feedbackItems}
                  expanded={expandedId === theme.id}
                  onToggle={() =>
                    setExpandedId(expandedId === theme.id ? null : theme.id)
                  }
                />
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}

function ThemeRow({
  theme,
  products,
  feedbackItems,
  expanded,
  onToggle,
}: {
  theme: Theme;
  products: Product[];
  feedbackItems: FeedbackItem[];
  expanded: boolean;
  onToggle: () => void;
}) {
  const product = products.find((p) => p.id === theme.top_product_id);
  const sampleFeedback = feedbackItems
    .filter((f) => f.theme_ids.includes(theme.id))
    .slice(0, 4);

  const sourceChartData = theme.source_breakdown.map((s) => ({
    source: s.source,
    count: s.count,
  }));

  return (
    <>
      <TableRow
        className="cursor-pointer hover:bg-muted/50"
        onClick={onToggle}
      >
        <TableCell>
          {expanded ? (
            <ChevronDown className="h-4 w-4 text-muted-foreground" />
          ) : (
            <ChevronRight className="h-4 w-4 text-muted-foreground" />
          )}
        </TableCell>
        <TableCell className="font-medium">{theme.name}</TableCell>
        <TableCell className="text-right tabular-nums">{theme.score}</TableCell>
        <TableCell className="text-right tabular-nums">
          {theme.feedback_count}
        </TableCell>
        <TableCell className="text-right">
          <div className="flex items-center justify-end gap-2">
            <span
              className={`inline-block h-2 w-2 rounded-full ${getSentimentDot(
                theme.avg_sentiment
              )}`}
            />
            <span className={`tabular-nums ${getSentimentColor(theme.avg_sentiment)}`}>
              {(theme.avg_sentiment * 100).toFixed(0)}%
            </span>
          </div>
        </TableCell>
        <TableCell>
          <TrendIcon trend={theme.trend} />
        </TableCell>
        <TableCell>
          <span className="text-sm text-muted-foreground">{product?.name}</span>
        </TableCell>
        <TableCell>
          <Badge
            variant="outline"
            className={`text-[10px] ${classificationColor(theme.classification)}`}
          >
            {classificationLabel(theme.classification)}
          </Badge>
        </TableCell>
        <TableCell className="text-right text-muted-foreground">
          {new Date(theme.last_updated).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
          })}
        </TableCell>
      </TableRow>

      {expanded && (
        <TableRow>
          <TableCell colSpan={9} className="bg-muted/30 p-0">
            <div className="p-6">
              <p className="mb-4 text-sm text-muted-foreground">
                {theme.description}
              </p>
              <div className="grid grid-cols-3 gap-6">
                {/* Sentiment over time */}
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-xs font-medium text-muted-foreground">
                      Sentiment Trend
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div style={{ height: 100 }}>
                      <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={theme.sentiment_history}>
                          <defs>
                            <linearGradient
                              id={`grad-${theme.id}`}
                              x1="0"
                              y1="0"
                              x2="0"
                              y2="1"
                            >
                              <stop
                                offset="5%"
                                stopColor="#3b82f6"
                                stopOpacity={0.3}
                              />
                              <stop
                                offset="95%"
                                stopColor="#3b82f6"
                                stopOpacity={0}
                              />
                            </linearGradient>
                          </defs>
                          <XAxis
                            dataKey="week"
                            tick={{ fontSize: 9, fill: "#64748b" }}
                            axisLine={false}
                            tickLine={false}
                          />
                          <YAxis
                            domain={[0, 1]}
                            tick={{ fontSize: 9, fill: "#64748b" }}
                            axisLine={false}
                            tickLine={false}
                            width={25}
                            tickFormatter={(v: number) => `${(v * 100).toFixed(0)}%`}
                          />
                          <Tooltip
                            contentStyle={{
                              backgroundColor: "hsl(224, 71%, 4%)",
                              border: "1px solid hsl(216, 34%, 17%)",
                              borderRadius: "8px",
                              fontSize: 11,
                            }}
                            // eslint-disable-next-line @typescript-eslint/no-explicit-any
                            formatter={(value: any) => [
                              `${(Number(value) * 100).toFixed(0)}%`,
                              "Sentiment",
                            ]}
                          />
                          <Area
                            type="monotone"
                            dataKey="score"
                            stroke="#3b82f6"
                            strokeWidth={2}
                            fill={`url(#grad-${theme.id})`}
                          />
                        </AreaChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>

                {/* Source Breakdown */}
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-xs font-medium text-muted-foreground">
                      Source Breakdown
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div style={{ height: 100 }}>
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={sourceChartData} layout="vertical">
                          <XAxis type="number" hide />
                          <YAxis
                            dataKey="source"
                            type="category"
                            tick={{ fontSize: 10, fill: "#64748b" }}
                            axisLine={false}
                            tickLine={false}
                            width={55}
                          />
                          <Tooltip
                            contentStyle={{
                              backgroundColor: "hsl(224, 71%, 4%)",
                              border: "1px solid hsl(216, 34%, 17%)",
                              borderRadius: "8px",
                              fontSize: 11,
                            }}
                          />
                          <Bar
                            dataKey="count"
                            fill="#3b82f6"
                            radius={[0, 4, 4, 0]}
                            barSize={12}
                          />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>

                {/* Sample Feedback */}
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-xs font-medium text-muted-foreground">
                      Sample Feedback
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2 max-h-[120px] overflow-y-auto">
                      {sampleFeedback.map((f) => (
                        <div
                          key={f.id}
                          className="rounded border border-border p-2 text-xs text-muted-foreground"
                        >
                          <p className="line-clamp-2">{f.text}</p>
                          <div className="mt-1 flex items-center gap-2">
                            <Badge variant="outline" className="text-[9px]">
                              {f.source}
                            </Badge>
                            <span
                              className={`text-[9px] font-medium ${getSentimentColor(
                                f.sentiment_score
                              )}`}
                            >
                              {(f.sentiment_score * 100).toFixed(0)}%
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TableCell>
        </TableRow>
      )}
    </>
  );
}
