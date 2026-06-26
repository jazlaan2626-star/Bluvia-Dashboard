"use client";
import React from "react";
import { Search, X, SlidersHorizontal } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { MultiSelect } from "@/components/ui/multi-select";
import { Separator } from "@/components/ui/separator";
import type { FilterState, FilterOption } from "@/types";

interface FilterPanelProps {
  filters: FilterState;
  options: {
    buildingType: FilterOption[];
    searchStatus: FilterOption[];
    towerNumber: FilterOption[];
    floor: FilterOption[];
    apartmentNumber: FilterOption[];
  };
  activeFilterCount: number;
  onMultiFilter: (key: keyof Pick<FilterState, "buildingType" | "searchStatus" | "towerNumber" | "floor" | "apartmentNumber">) => (val: string[]) => void;
  onTextFilter: (key: keyof Pick<FilterState, "customerName" | "customerNumber" | "globalSearch">) => (val: string) => void;
  onClearFilters: () => void;
  totalFiltered: number;
  totalAll: number;
}

export function FilterPanel({
  filters,
  options,
  activeFilterCount,
  onMultiFilter,
  onTextFilter,
  onClearFilters,
  totalFiltered,
  totalAll,
}: FilterPanelProps) {
  return (
    <div className="space-y-4">
      {/* Header row */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <SlidersHorizontal className="h-4 w-4 text-muted-foreground" />
          <span className="text-sm font-medium">Filters</span>
          {activeFilterCount > 0 && (
            <Badge variant="secondary" className="h-5 rounded-full px-1.5 text-xs">
              {activeFilterCount}
            </Badge>
          )}
        </div>
        <div className="flex items-center gap-3">
          <span className="text-xs text-muted-foreground">
            <span className="font-medium text-foreground">{totalFiltered.toLocaleString()}</span>
            {" "}of {totalAll.toLocaleString()} records
          </span>
          {activeFilterCount > 0 && (
            <Button variant="ghost" size="sm" onClick={onClearFilters} className="h-7 px-2 text-xs gap-1">
              <X className="h-3 w-3" /> Clear filters
            </Button>
          )}
        </div>
      </div>

      {/* Global Search */}
      <div className="relative">
        <Search className="absolute left-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Search everything..."
          value={filters.globalSearch}
          onChange={(e) => onTextFilter("globalSearch")(e.target.value)}
          className="pl-9 h-9"
        />
        {filters.globalSearch && (
          <button
            onClick={() => onTextFilter("globalSearch")("")}
            className="absolute right-2.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
          >
            <X className="h-3.5 w-3.5" />
          </button>
        )}
      </div>

      <Separator />

      {/* Filter Grid */}
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 2xl:grid-cols-6">
        <div className="space-y-1.5">
          <Label className="text-xs text-muted-foreground">Building Type</Label>
          <MultiSelect
            options={options.buildingType}
            value={filters.buildingType}
            onChange={onMultiFilter("buildingType")}
            placeholder="All types"
            searchPlaceholder="Search types..."
          />
        </div>

        <div className="space-y-1.5">
          <Label className="text-xs text-muted-foreground">Search Status</Label>
          <MultiSelect
            options={options.searchStatus}
            value={filters.searchStatus}
            onChange={onMultiFilter("searchStatus")}
            placeholder="All statuses"
            searchPlaceholder="Search status..."
          />
        </div>

        <div className="space-y-1.5">
          <Label className="text-xs text-muted-foreground">Tower Number</Label>
          <MultiSelect
            options={options.towerNumber}
            value={filters.towerNumber}
            onChange={onMultiFilter("towerNumber")}
            placeholder="All towers"
            searchPlaceholder="Search towers..."
          />
        </div>

        <div className="space-y-1.5">
          <Label className="text-xs text-muted-foreground">Floor</Label>
          <MultiSelect
            options={options.floor}
            value={filters.floor}
            onChange={onMultiFilter("floor")}
            placeholder="All floors"
            searchPlaceholder="Search floors..."
          />
        </div>

        <div className="space-y-1.5">
          <Label className="text-xs text-muted-foreground">Apartment No.</Label>
          <MultiSelect
            options={options.apartmentNumber}
            value={filters.apartmentNumber}
            onChange={onMultiFilter("apartmentNumber")}
            placeholder="All apartments"
            searchPlaceholder="Search apartments..."
          />
        </div>

        <div className="space-y-1.5">
          <Label className="text-xs text-muted-foreground">Customer Name</Label>
          <div className="relative">
            <Input
              placeholder="Search name..."
              value={filters.customerName}
              onChange={(e) => onTextFilter("customerName")(e.target.value)}
              className="h-9"
            />
            {filters.customerName && (
              <button
                onClick={() => onTextFilter("customerName")("")}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            )}
          </div>
        </div>

        <div className="space-y-1.5">
          <Label className="text-xs text-muted-foreground">Customer Number</Label>
          <div className="relative">
            <Input
              placeholder="Search number..."
              value={filters.customerNumber}
              onChange={(e) => onTextFilter("customerNumber")(e.target.value)}
              className="h-9"
            />
            {filters.customerNumber && (
              <button
                onClick={() => onTextFilter("customerNumber")("")}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Active Filter Chips */}
      <AnimatePresence>
        {activeFilterCount > 0 && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="flex flex-wrap gap-1.5 pt-1"
          >
            {filters.buildingType.map((v) => (
              <FilterChip key={`bt-${v}`} label={`Type: ${v}`} onRemove={() => onMultiFilter("buildingType")(filters.buildingType.filter((x) => x !== v))} />
            ))}
            {filters.searchStatus.map((v) => (
              <FilterChip key={`ss-${v}`} label={`Status: ${v}`} onRemove={() => onMultiFilter("searchStatus")(filters.searchStatus.filter((x) => x !== v))} />
            ))}
            {filters.towerNumber.map((v) => (
              <FilterChip key={`tn-${v}`} label={`Tower: ${v}`} onRemove={() => onMultiFilter("towerNumber")(filters.towerNumber.filter((x) => x !== v))} />
            ))}
            {filters.floor.map((v) => (
              <FilterChip key={`fl-${v}`} label={`Floor: ${v}`} onRemove={() => onMultiFilter("floor")(filters.floor.filter((x) => x !== v))} />
            ))}
            {filters.apartmentNumber.map((v) => (
              <FilterChip key={`an-${v}`} label={`Apt: ${v}`} onRemove={() => onMultiFilter("apartmentNumber")(filters.apartmentNumber.filter((x) => x !== v))} />
            ))}
            {filters.customerName && (
              <FilterChip label={`Name: ${filters.customerName}`} onRemove={() => onTextFilter("customerName")("")} />
            )}
            {filters.customerNumber && (
              <FilterChip label={`Phone: ${filters.customerNumber}`} onRemove={() => onTextFilter("customerNumber")("")} />
            )}
            {filters.globalSearch && (
              <FilterChip label={`Search: "${filters.globalSearch}"`} onRemove={() => onTextFilter("globalSearch")("")} />
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function FilterChip({ label, onRemove }: { label: string; onRemove: () => void }) {
  return (
    <motion.span
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0.8, opacity: 0 }}
      className="inline-flex items-center gap-1 rounded-full border bg-accent/50 px-2.5 py-0.5 text-xs font-medium text-accent-foreground"
    >
      {label}
      <button onClick={onRemove} className="ml-0.5 rounded-full hover:text-foreground">
        <X className="h-3 w-3" />
      </button>
    </motion.span>
  );
}
