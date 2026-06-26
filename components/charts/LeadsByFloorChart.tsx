"use client";
import React from "react";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, Legend,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Layers } from "lucide-react";
import { CHART_COLORS } from "@/lib/constants";

interface Props {
  data: { name: string; callLater: number; noData: number; total: number }[];
}

const CustomTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="rounded-lg border bg-background/95 p-3 shadow-lg backdrop-blur-sm text-xs">
      <p className="font-semibold mb-1.5">Floor {label}</p>
      {payload.map((p: any) => (
        <p key={p.name} style={{ color: p.color }}>
          {p.name === "callLater" ? "Call Later" : "No Data"}: <span className="font-bold">{p.value}</span>
        </p>
      ))}
    </div>
  );
};

export function LeadsByFloorChart({ data }: Props) {
  const sorted = [...data]
    .sort((a, b) => a.name.localeCompare(b.name, undefined, { numeric: true }))
    .slice(0, 20);

  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex items-center gap-2">
          <div className="flex h-7 w-7 items-center justify-center rounded-md bg-purple-50 dark:bg-purple-950/50">
            <Layers className="h-4 w-4 text-purple-600 dark:text-purple-400" />
          </div>
          <div>
            <CardTitle className="text-sm">Leads by Floor</CardTitle>
            <CardDescription className="text-xs">Call Later vs No Data per floor</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={240}>
          <BarChart data={sorted} margin={{ top: 5, right: 10, left: -20, bottom: 5 }} barGap={2}>
            <CartesianGrid strokeDasharray="3 3" className="stroke-border/50" vertical={false} />
            <XAxis
              dataKey="name"
              tick={{ fontSize: 10, fill: "hsl(var(--muted-foreground))" }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }}
              axisLine={false}
              tickLine={false}
              allowDecimals={false}
            />
            <Tooltip content={<CustomTooltip />} cursor={{ fill: "hsl(var(--accent))", opacity: 0.5 }} />
            <Legend
              formatter={(value) => (
                <span className="text-xs text-muted-foreground">
                  {value === "callLater" ? "Call Later" : "No Data"}
                </span>
              )}
              iconSize={10}
              iconType="circle"
            />
            <Bar dataKey="callLater" fill={CHART_COLORS.callLater} radius={[3, 3, 0, 0]} maxBarSize={24} />
            <Bar dataKey="noData" fill={CHART_COLORS.noData} radius={[3, 3, 0, 0]} maxBarSize={24} />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
