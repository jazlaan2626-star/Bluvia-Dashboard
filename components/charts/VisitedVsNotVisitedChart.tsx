"use client";
import React from "react";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { CheckCircle } from "lucide-react";

interface DataPoint {
  name: string;
  value: number;
  color: string;
}

interface Props {
  data: DataPoint[];
}

const CustomTooltip = ({ active, payload }: any) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="rounded-lg border bg-background/95 p-3 shadow-lg backdrop-blur-sm text-xs">
      <p style={{ color: payload[0].payload.color }} className="font-semibold">
        {payload[0].name}
      </p>
      <p className="text-muted-foreground">Count: <span className="font-bold text-foreground">{payload[0].value}</span></p>
    </div>
  );
};

export function VisitedVsNotVisitedChart({ data }: Props) {
  const total = data.reduce((s, d) => s + d.value, 0);

  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex items-center gap-2">
          <div className="flex h-7 w-7 items-center justify-center rounded-md bg-cyan-50 dark:bg-cyan-950/50">
            <CheckCircle className="h-4 w-4 text-cyan-600 dark:text-cyan-400" />
          </div>
          <div>
            <CardTitle className="text-sm">Visited vs Not Visited</CardTitle>
            <CardDescription className="text-xs">Search status distribution</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-center gap-8">
          <ResponsiveContainer width="55%" height={220}>
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={88}
                paddingAngle={3}
                dataKey="value"
                startAngle={90}
                endAngle={-270}
              >
                {data.map((d, i) => (
                  <Cell key={i} fill={d.color} stroke="transparent" />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
            </PieChart>
          </ResponsiveContainer>

          <div className="flex flex-col gap-4">
            {data.map((d) => (
              <div key={d.name} className="flex items-center gap-3">
                <div className="h-3 w-3 rounded-full flex-shrink-0" style={{ backgroundColor: d.color }} />
                <div>
                  <p className="text-sm font-semibold">{d.value.toLocaleString()}</p>
                  <p className="text-xs text-muted-foreground">{d.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {total > 0 ? ((d.value / total) * 100).toFixed(1) : 0}%
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
