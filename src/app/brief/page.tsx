"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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
  FileText,
  Lightbulb,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react";
import { weeklyBriefs } from "@/lib/mock-data";

export default function BriefPage() {
  const [selectedBriefId, setSelectedBriefId] = useState(weeklyBriefs[0].id);
  const brief = weeklyBriefs.find((b) => b.id === selectedBriefId) ?? weeklyBriefs[0];

  return (
    <div className="space-y-8">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Weekly Brief</h1>
          <p className="text-sm text-muted-foreground">
            AI-generated weekly intelligence summaries
          </p>
        </div>
        <Select value={selectedBriefId} onValueChange={setSelectedBriefId}>
          <SelectTrigger className="w-[240px]">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {weeklyBriefs.map((b) => (
              <SelectItem key={b.id} value={b.id}>
                {b.title}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="grid grid-cols-4 gap-6">
        {/* Main brief content */}
        <div className="col-span-3">
          <Card>
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10">
                  <FileText className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <CardTitle className="text-base">{brief.title}</CardTitle>
                  <p className="text-xs text-muted-foreground">
                    Generated on{" "}
                    {new Date(brief.week_of).toLocaleDateString("en-US", {
                      weekday: "long",
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </p>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="prose prose-sm prose-invert max-w-none">
                <BriefContent content={brief.content} />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar metrics */}
        <div className="space-y-6">
          {/* Top Themes */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-sm">
                <TrendingUp className="h-4 w-4 text-primary" />
                Top Themes
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {brief.key_metrics.top_themes.map((theme, i) => (
                  <div
                    key={theme}
                    className="flex items-center gap-2 rounded-md bg-muted/50 px-3 py-2"
                  >
                    <span className="text-xs font-bold text-muted-foreground">
                      {i + 1}
                    </span>
                    <span className="text-sm">{theme}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Emerging Signals */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-sm">
                <Lightbulb className="h-4 w-4 text-yellow-400" />
                Emerging Signals
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {brief.key_metrics.emerging_signals.map((signal) => (
                  <div
                    key={signal}
                    className="rounded-md border border-border px-3 py-2"
                  >
                    <span className="text-xs text-muted-foreground">{signal}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Sentiment Changes */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-sm">
                <TrendingDown className="h-4 w-4 text-red-400" />
                Sentiment Changes
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {brief.key_metrics.sentiment_changes.map((change) => (
                  <div
                    key={change.theme}
                    className="flex items-center justify-between rounded-md bg-muted/50 px-3 py-2"
                  >
                    <span className="text-xs">{change.theme}</span>
                    <span
                      className={`flex items-center gap-1 text-xs font-semibold ${
                        change.change > 0 ? "text-emerald-400" : "text-red-400"
                      }`}
                    >
                      {change.change > 0 ? (
                        <ArrowUpRight className="h-3 w-3" />
                      ) : (
                        <ArrowDownRight className="h-3 w-3" />
                      )}
                      {change.change > 0 ? "+" : ""}
                      {change.change}
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

function BriefContent({ content }: { content: string }) {
  // Simple markdown-to-JSX renderer for the brief content
  const lines = content.split("\n");
  const elements: React.ReactNode[] = [];
  let inTable = false;
  let tableRows: string[][] = [];
  let tableHeaders: string[] = [];

  function flushTable() {
    if (tableHeaders.length > 0) {
      elements.push(
        <div key={`table-${elements.length}`} className="my-4 overflow-hidden rounded-lg border border-border">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-muted/50">
                {tableHeaders.map((h, i) => (
                  <th key={i} className="px-3 py-2 text-left text-xs font-medium text-muted-foreground">
                    {h.trim()}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {tableRows.map((row, ri) => (
                <tr key={ri} className="border-b border-border last:border-0">
                  {row.map((cell, ci) => (
                    <td key={ci} className="px-3 py-2 text-xs text-foreground">
                      {cell.trim()}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    }
    tableHeaders = [];
    tableRows = [];
    inTable = false;
  }

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    // Table detection
    if (line.startsWith("|") && line.endsWith("|")) {
      const cells = line
        .split("|")
        .filter((c) => c.trim() !== "");

      // Check if next line is separator
      if (!inTable && i + 1 < lines.length && lines[i + 1].includes("---")) {
        inTable = true;
        tableHeaders = cells;
        i++; // skip separator
        continue;
      }

      if (inTable) {
        tableRows.push(cells);
        continue;
      }
    } else if (inTable) {
      flushTable();
    }

    if (line.startsWith("## ")) {
      elements.push(
        <h2 key={i} className="mb-3 mt-6 text-lg font-bold text-foreground first:mt-0">
          {line.replace("## ", "")}
        </h2>
      );
    } else if (line.startsWith("### ")) {
      elements.push(
        <h3 key={i} className="mb-2 mt-5 text-base font-semibold text-foreground">
          {line.replace("### ", "")}
        </h3>
      );
    } else if (line.startsWith("**") && line.endsWith("**")) {
      elements.push(
        <p key={i} className="mb-2 mt-4 text-sm font-semibold text-foreground">
          {line.replace(/\*\*/g, "")}
        </p>
      );
    } else if (line.startsWith("- ") || line.startsWith("* ")) {
      elements.push(
        <div key={i} className="flex gap-2 py-0.5 pl-4 text-sm text-muted-foreground">
          <span className="text-muted-foreground/50">-</span>
          <span>
            <InlineMarkdown text={line.slice(2)} />
          </span>
        </div>
      );
    } else if (line.startsWith("*") && line.endsWith("*") && !line.startsWith("**")) {
      elements.push(
        <p key={i} className="my-2 text-sm italic text-primary/80">
          {line.replace(/^\*|\*$/g, "")}
        </p>
      );
    } else if (line.trim() === "") {
      // skip empty lines
    } else {
      elements.push(
        <p key={i} className="mb-2 text-sm leading-relaxed text-muted-foreground">
          <InlineMarkdown text={line} />
        </p>
      );
    }
  }

  if (inTable) flushTable();

  return <>{elements}</>;
}

function InlineMarkdown({ text }: { text: string }) {
  // Handle **bold** and inline formatting
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return (
    <>
      {parts.map((part, i) => {
        if (part.startsWith("**") && part.endsWith("**")) {
          return (
            <span key={i} className="font-semibold text-foreground">
              {part.slice(2, -2)}
            </span>
          );
        }
        return <span key={i}>{part}</span>;
      })}
    </>
  );
}
