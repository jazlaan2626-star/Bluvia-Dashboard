"use client";
import React from "react";
import {
  PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Building } from "lucide-react";
import { CHART_COLORS_ARRAY } from "@/lib/constants";

interface Props {
  data: { name: string; callLater: number; noData: number; total: number }[];
}

const CustomTooltip = ({ active, payload }: any) => {
  if (!active || !payload?.length) return null;
  const d = payload[0].payload;
  const pct = ((d.total / (payload[0].payload._grandTotal || 1)) * 100).toFixed(1);
  return (
    <div className="rounded-lg border bg-background/95 p-3 shadow-lg backdrop-blur-sm text-xs">
      <p className="font-semibold mb-1">{d.name}</p>
      <p className="text-muted-foreground">Total: <span className="font-bold text-foreground">{d.total}</span></p>
      <p className="text-blue-500">Call Later: <span className="font-bold">{d.callLater}</span></p>
      <p className="text-amber-500">No Data: <span className="font-bold">{d.noData}</span></p>
    </div>
  );
};

export function BuildingDistributionChart({ data }: Props) {
  const grandTotal = data.reduce((sum, d) => sum + d.total, 0);
  const enriched = data.map((d) => ({ ...d, _grandTotal: grandTotal }));

  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex items-center gap-2">
          <div className="flex h-7 w-7 items-center justify-center rounded-md bg-emerald-50 dark:bg-emerald-950/50">
            <Building className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
          </div>
          <div>
            <CardTitle className="text-sm">Building Distribution</CardTitle>
            <CardDescription className="text-xs">Records by building type</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={240}>
          <PieChart>
            <Pie
              data={enriched}
              cx="50%"
              cy="50%"
              innerRadius={55}
              outerRadius={85}
              paddingAngle={3}
              dataKey="total"
              nameKey="name"
            >
              {enriched.map((_, index) => (
                <Cell
                  key={index}
                  fill={CHART_COLORS_ARRAY[index % CHART_COLORS_ARRAY.length]}
                  stroke="transparent"
                />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
            <Legend
              formatter={(value) => <span className="text-xs text-muted-foreground">{value}</span>}
              iconSize={8}
              iconType="circle"
            />
          </PieChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
