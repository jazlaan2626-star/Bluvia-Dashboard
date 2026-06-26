"use client";
import React from "react";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, Cell,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Database } from "lucide-react";
import { CHART_COLORS } from "@/lib/constants";

interface Props {
  data: { name: string; callLater: number; noData: number; total: number }[];
}

const CustomTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="rounded-lg border bg-background/95 p-3 shadow-lg backdrop-blur-sm text-xs">
      <p className="font-semibold mb-1.5">{label}</p>
      <p className="text-amber-500">No Data: <span className="font-bold">{payload[0]?.value ?? 0}</span></p>
    </div>
  );
};

export function NoDataByTowerChart({ data }: Props) {
  const sorted = [...data].sort((a, b) => b.noData - a.noData).slice(0, 12);

  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex items-center gap-2">
          <div className="flex h-7 w-7 items-center justify-center rounded-md bg-amber-50 dark:bg-amber-950/50">
            <Database className="h-4 w-4 text-amber-600 dark:text-amber-400" />
          </div>
          <div>
            <CardTitle className="text-sm">No Data by Tower</CardTitle>
            <CardDescription className="text-xs">Towers with uncontacted apartments</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={240}>
          <BarChart data={sorted} margin={{ top: 5, right: 10, left: -20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" className="stroke-border/50" vertical={false} />
            <XAxis
              dataKey="name"
              tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }}
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
            <Bar dataKey="noData" fill={CHART_COLORS.noData} radius={[4, 4, 0, 0]} maxBarSize={40}>
              {sorted.map((entry, index) => (
                <Cell key={index} fill={CHART_COLORS.noData} fillOpacity={0.85 - index * 0.03} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
