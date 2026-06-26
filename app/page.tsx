"use client";
import React, { useState, useMemo, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import {
  AlertCircle, RefreshCw, WifiOff, ChevronDown, ChevronUp,
  BarChart3, TableIcon, Settings2,
} from "lucide-react";
import { NavBar } from "@/components/layout/NavBar";
import { FilterPanel } from "@/components/layout/FilterPanel";
import { KPICards } from "@/components/kpi/KPICards";
import { ChartSection } from "@/components/charts/ChartSection";
import { DataTable } from "@/components/table/DataTable";
import { DetailsPanel } from "@/components/details/DetailsPanel";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { useExcelData } from "@/hooks/useExcelData";
import { useFilters } from "@/hooks/useFilters";
import { getUniqueValues } from "@/services/excelService";
import type { ApartmentRecord, KPIData } from "@/types";

export default function DashboardPage() {
  const { records, lastUpdated, status, error, isLoading, refresh, worksheetName } = useExcelData();
  const {
    filters,
    filteredRecords,
    filterOptions,
    setMultiFilter,
    setTextFilter,
    clearFilters,
    activeFilterCount,
  } = useFilters(records);

  const [selectedRecord, setSelectedRecord] = useState<ApartmentRecord | null>(null);
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [showCharts, setShowCharts] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const kpiData: KPIData = useMemo(() => ({
    totalCallLaterLeads: filteredRecords.filter(
      (r) => r.uniqueApplicationCollected === "Call Later (Lead)",
    ).length,
    totalNoDataApartments: filteredRecords.filter(
      (r) => r.uniqueApplicationCollected === "No Data",
    ).length,
    totalTowers: new Set(filteredRecords.map((r) => r.tower).filter(Boolean)).size,
    totalBuildings: new Set(filteredRecords.map((r) => r.buildingType).filter(Boolean)).size,
    totalFloors: new Set(filteredRecords.map((r) => r.floor).filter(Boolean)).size,
    totalApartments: filteredRecords.length,
  }), [filteredRecords]);

  const handleRefresh = useCallback(async () => {
    setIsRefreshing(true);
    try {
      await refresh();
      toast.success("Data refreshed successfully", {
        description: `${records.length.toLocaleString()} records loaded`,
      });
    } catch {
      toast.error("Failed to refresh data", {
        description: "Will retry automatically in 60 seconds",
      });
    } finally {
      setIsRefreshing(false);
    }
  }, [refresh, records.length]);

  const handleRowClick = useCallback((record: ApartmentRecord) => {
    setSelectedRecord(record);
    setDetailsOpen(true);
  }, []);

  const filterOptionsMapped = useMemo(() => ({
    buildingType: filterOptions.buildingType,
    searchStatus: filterOptions.searchStatus,
    towerNumber: filterOptions.towerNumber,
    floor: filterOptions.floor,
    apartmentNumber: filterOptions.apartmentNumber,
  }), [filterOptions]);

  return (
    <div className="flex min-h-screen flex-col bg-background">
      {/* Navigation */}
      <NavBar
        lastUpdated={lastUpdated}
        status={status}
        isRefreshing={isRefreshing}
        onRefresh={handleRefresh}
        worksheetName={worksheetName}
      />

      {/* Error Banner */}
      <AnimatePresence>
        {error && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
          >
            <div
              className={`border-b px-4 py-2.5 ${
                status === "offline"
                  ? "bg-amber-50 border-amber-200 dark:bg-amber-950/30 dark:border-amber-900"
                  : "bg-red-50 border-red-200 dark:bg-red-950/30 dark:border-red-900"
              }`}
            >
              <div className="flex items-center gap-3 max-w-screen-2xl mx-auto">
                {status === "offline" ? (
                  <WifiOff className="h-4 w-4 text-amber-600 dark:text-amber-400 flex-shrink-0" />
                ) : (
                  <AlertCircle className="h-4 w-4 text-red-600 dark:text-red-400 flex-shrink-0" />
                )}
                <p className="text-sm text-foreground flex-1">{error}</p>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleRefresh}
                  disabled={isRefreshing}
                  className="h-7 px-3 text-xs gap-1.5"
                >
                  <RefreshCw className={`h-3 w-3 ${isRefreshing ? "animate-spin" : ""}`} />
                  Retry
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <main className="flex-1 px-4 py-5 md:px-6 md:py-6 max-w-screen-2xl mx-auto w-full space-y-5">

        {/* KPI Cards */}
        <section>
          <KPICards data={kpiData} isLoading={isLoading} />
        </section>

        {/* Filters */}
        <section>
          <Card>
            <CardContent className="pt-5 pb-4">
              <FilterPanel
                filters={filters}
                options={filterOptionsMapped}
                activeFilterCount={activeFilterCount}
                onMultiFilter={setMultiFilter}
                onTextFilter={setTextFilter}
                onClearFilters={clearFilters}
                totalFiltered={filteredRecords.length}
                totalAll={records.length}
              />
            </CardContent>
          </Card>
        </section>

        {/* Charts */}
        <section>
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <BarChart3 className="h-4 w-4 text-muted-foreground" />
              <h2 className="text-sm font-semibold">Analytics</h2>
              {filteredRecords.length > 0 && (
                <Badge variant="outline" className="h-5 text-[10px]">
                  {filteredRecords.length.toLocaleString()} records
                </Badge>
              )}
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowCharts((v) => !v)}
              className="h-7 px-2 gap-1 text-xs text-muted-foreground"
            >
              {showCharts ? (
                <>
                  <ChevronUp className="h-3.5 w-3.5" /> Hide
                </>
              ) : (
                <>
                  <ChevronDown className="h-3.5 w-3.5" /> Show
                </>
              )}
            </Button>
          </div>

          <AnimatePresence initial={false}>
            {showCharts && (
              <motion.div
                key="charts"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.25 }}
              >
                <ChartSection records={filteredRecords} isLoading={isLoading} />
              </motion.div>
            )}
          </AnimatePresence>
        </section>

        <Separator />

        {/* Data Table */}
        <section className="pb-8">
          <div className="flex items-center gap-2 mb-3">
            <TableIcon className="h-4 w-4 text-muted-foreground" />
            <h2 className="text-sm font-semibold">Records</h2>
            <Badge variant="outline" className="h-5 text-[10px]">
              {filteredRecords.length.toLocaleString()}
            </Badge>
          </div>
          <DataTable
            records={filteredRecords}
            isLoading={isLoading}
            onRowClick={handleRowClick}
          />
        </section>
      </main>

      {/* Details Panel */}
      <DetailsPanel
        record={selectedRecord}
        open={detailsOpen}
        onClose={() => setDetailsOpen(false)}
      />
    </div>
  );
}
