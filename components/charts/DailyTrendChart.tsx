"use client";
import React from "react";
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, Legend,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { TrendingUp } from "lucide-react";
import { CHART_COLORS } from "@/lib/constants";

interface Props {
  data: { name: string; callLater: number; noData: number; total: number }[];
}

const CustomTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="rounded-lg border bg-background/95 p-3 shadow-lg backdrop-blur-sm text-xs">
      <p className="font-semibold mb-1.5">{label}</p>
      {payload.map((p: any) => (
        <p key={p.dataKey} style={{ color: p.color }}>
          {p.name}: <span className="font-bold">{p.value}</span>
        </p>
      ))}
    </div>
  );
};

export function DailyTrendChart({ data }: Props) {
  return (
    <Card className="lg:col-span-2">
      <CardHeader className="pb-3">
        <div className="flex items-center gap-2">
          <div className="flex h-7 w-7 items-center justify-center rounded-md bg-rose-50 dark:bg-rose-950/50">
            <TrendingUp className="h-4 w-4 text-rose-600 dark:text-rose-400" />
          </div>
          <div>
            <CardTitle className="text-sm">Daily Follow-up Trend</CardTitle>
            <CardDescription className="text-xs">Leads and no-data over time (last 30 days)</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={240}>
          <AreaChart data={data} margin={{ top: 5, right: 10, left: -20, bottom: 5 }}>
            <defs>
              <linearGradient id="callLaterGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={CHART_COLORS.callLater} stopOpacity={0.3} />
                <stop offset="95%" stopColor={CHART_COLORS.callLater} stopOpacity={0} />
              </linearGradient>
              <linearGradient id="noDataGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={CHART_COLORS.noData} stopOpacity={0.3} />
                <stop offset="95%" stopColor={CHART_COLORS.noData} stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" className="stroke-border/50" vertical={false} />
            <XAxis
              dataKey="name"
              tick={{ fontSize: 10, fill: "hsl(var(--muted-foreground))" }}
              axisLine={false}
              tickLine={false}
              interval="preserveStartEnd"
            />
            <YAxis
              tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }}
              axisLine={false}
              tickLine={false}
              allowDecimals={false}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend
              formatter={(value) => (
                <span className="text-xs text-muted-foreground">
                  {value === "callLater" ? "Call Later" : "No Data"}
                </span>
              )}
              iconSize={10}
              iconType="circle"
            />
            <Area
              type="monotone"
              dataKey="callLater"
              name="Call Later"
              stroke={CHART_COLORS.callLater}
              strokeWidth={2}
              fill="url(#callLaterGrad)"
              dot={false}
            />
            <Area
              type="monotone"
              dataKey="noData"
              name="No Data"
              stroke={CHART_COLORS.noData}
              strokeWidth={2}
              fill="url(#noDataGrad)"
              dot={false}
            />
          </AreaChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
