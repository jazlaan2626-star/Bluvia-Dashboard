"use client";
import React, { useMemo } from "react";
import type { ApartmentRecord } from "@/types";
import { Skeleton } from "@/components/ui/skeleton";
import { LeadsByTowerChart } from "./LeadsByTowerChart";
import { NoDataByTowerChart } from "./NoDataByTowerChart";
import { LeadsByFloorChart } from "./LeadsByFloorChart";
import { BuildingDistributionChart } from "./BuildingDistributionChart";
import { VisitedVsNotVisitedChart } from "./VisitedVsNotVisitedChart";
import { DailyTrendChart } from "./DailyTrendChart";

interface ChartSectionProps {
  records: ApartmentRecord[];
  isLoading: boolean;
}

function aggregateBy(
  records: ApartmentRecord[],
  key: keyof ApartmentRecord,
): { name: string; callLater: number; noData: number; total: number }[] {
  const map = new Map<string, { callLater: number; noData: number }>();

  for (const r of records) {
    const k = String(r[key] || "Unknown");
    if (!map.has(k)) map.set(k, { callLater: 0, noData: 0 });
    const entry = map.get(k)!;
    if (r.uniqueApplicationCollected === "Call Later (Lead)") entry.callLater++;
    else entry.noData++;
  }

  return Array.from(map.entries())
    .map(([name, vals]) => ({ name, ...vals, total: vals.callLater + vals.noData }))
    .sort((a, b) => b.total - a.total)
    .slice(0, 20);
}

export function ChartSection({ records, isLoading }: ChartSectionProps) {
  const byTower = useMemo(() => aggregateBy(records, "tower"), [records]);
  const byFloor = useMemo(() => aggregateBy(records, "floor"), [records]);
  const byBuilding = useMemo(() => aggregateBy(records, "buildingType"), [records]);

  const visitData = useMemo(() => {
    const visited = records.filter((r) => r.searchStatus && r.searchStatus.toLowerCase() !== "not visited").length;
    const notVisited = records.length - visited;
    return [
      { name: "Visited", value: visited, color: "#3b82f6" },
      { name: "Not Visited", value: notVisited, color: "#f59e0b" },
    ];
  }, [records]);

  const dailyData = useMemo(() => {
    if (!records.some((r) => r.visitDate)) return [];

    const map = new Map<string, { callLater: number; noData: number }>();
    for (const r of records) {
      if (!r.visitDate) continue;
      const date = r.visitDate.split("T")[0].split(" ")[0];
      if (!date || date === "") continue;
      if (!map.has(date)) map.set(date, { callLater: 0, noData: 0 });
      const entry = map.get(date)!;
      if (r.uniqueApplicationCollected === "Call Later (Lead)") entry.callLater++;
      else entry.noData++;
    }

    return Array.from(map.entries())
      .map(([name, vals]) => ({ name, ...vals, total: vals.callLater + vals.noData }))
      .sort((a, b) => a.name.localeCompare(b.name))
      .slice(-30);
  }, [records]);

  const hasDailyData = dailyData.length > 0;

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        {Array.from({ length: 6 }).map((_, i) => (
          <Skeleton key={i} className="h-72 rounded-xl" />
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
      <LeadsByTowerChart data={byTower} />
      <NoDataByTowerChart data={byTower} />
      <LeadsByFloorChart data={byFloor} />
      <BuildingDistributionChart data={byBuilding} />
      <VisitedVsNotVisitedChart data={visitData} />
      {hasDailyData && <DailyTrendChart data={dailyData} />}
    </div>
  );
}
