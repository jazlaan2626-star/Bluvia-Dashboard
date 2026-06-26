"use client";
import React from "react";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, Cell, LabelList,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Phone } from "lucide-react";
import { CHART_COLORS } from "@/lib/constants";

interface Props {
  data: { name: string; callLater: number; noData: number; total: number }[];
}

const CustomTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="rounded-lg border bg-background/95 p-3 shadow-lg backdrop-blur-sm text-xs">
      <p className="font-semibold mb-1.5">{label}</p>
      <p className="text-blue-500">Call Later: <span className="font-bold">{payload[0]?.value ?? 0}</span></p>
    </div>
  );
};

export function LeadsByTowerChart({ data }: Props) {
  const sorted = [...data].sort((a, b) => b.callLater - a.callLater).slice(0, 12);

  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex items-center gap-2">
          <div className="flex h-7 w-7 items-center justify-center rounded-md bg-blue-50 dark:bg-blue-950/50">
            <Phone className="h-4 w-4 text-blue-600 dark:text-blue-400" />
          </div>
          <div>
            <CardTitle className="text-sm">Call Later Leads by Tower</CardTitle>
            <CardDescription className="text-xs">Top towers with pending follow-ups</CardDescription>
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
            <Bar dataKey="callLater" fill={CHART_COLORS.callLater} radius={[4, 4, 0, 0]} maxBarSize={40}>
              {sorted.map((entry, index) => (
                <Cell key={index} fill={CHART_COLORS.callLater} fillOpacity={0.85 - index * 0.03} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
