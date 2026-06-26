"use client";

import { useState, useMemo, useCallback } from "react";
import type { ApartmentRecord, FilterState, UniqueApplicationStatus } from "@/types";
import { ALLOWED_STATUSES } from "@/lib/constants";
import { normalizeString } from "@/lib/utils";

const DEFAULT_FILTERS: FilterState = {
  buildingType: [],
  searchStatus: [],
  towerNumber: [],
  floor: [],
  apartmentNumber: [],
  customerName: "",
  customerNumber: "",
  globalSearch: "",
  statusFilter: [...ALLOWED_STATUSES],
};

export function useFilters(records: ApartmentRecord[]) {
  const [filters, setFilters] = useState<FilterState>(DEFAULT_FILTERS);

  const filteredRecords = useMemo(() => {
    return records.filter((r) => {
      if (
        filters.statusFilter.length > 0 &&
        !filters.statusFilter.includes(r.uniqueApplicationCollected)
      )
        return false;

      if (filters.buildingType.length > 0 && !filters.buildingType.includes(r.buildingType))
        return false;

      if (filters.searchStatus.length > 0 && !filters.searchStatus.includes(r.searchStatus))
        return false;

      if (filters.towerNumber.length > 0 && !filters.towerNumber.includes(r.towerNumber))
        return false;

      if (filters.floor.length > 0 && !filters.floor.includes(r.floor))
        return false;

      if (filters.apartmentNumber.length > 0 && !filters.apartmentNumber.includes(r.apartmentNumber))
        return false;

      if (filters.customerName) {
        const search = filters.customerName.toLowerCase();
        if (!r.customerName.toLowerCase().includes(search)) return false;
      }

      if (filters.customerNumber) {
        if (!r.customerNumber.includes(filters.customerNumber)) return false;
      }

      if (filters.globalSearch) {
        const q = filters.globalSearch.toLowerCase();
        const haystack = [
          r.tower,
          r.buildingType,
          r.floor,
          r.apartmentNumber,
          r.towerNumber,
          r.searchStatus,
          r.uniqueApplicationCollected,
          r.customerName,
          r.customerNumber,
          r.remarks,
        ]
          .join(" ")
          .toLowerCase();
        if (!haystack.includes(q)) return false;
      }

      return true;
    });
  }, [records, filters]);

  const filterOptions = useMemo(() => {
    const opts = {
      buildingType: new Map<string, number>(),
      searchStatus: new Map<string, number>(),
      towerNumber: new Map<string, number>(),
      floor: new Map<string, number>(),
      apartmentNumber: new Map<string, number>(),
    };

    for (const r of records) {
      if (r.buildingType) opts.buildingType.set(r.buildingType, (opts.buildingType.get(r.buildingType) ?? 0) + 1);
      if (r.searchStatus) opts.searchStatus.set(r.searchStatus, (opts.searchStatus.get(r.searchStatus) ?? 0) + 1);
      if (r.towerNumber) opts.towerNumber.set(r.towerNumber, (opts.towerNumber.get(r.towerNumber) ?? 0) + 1);
      if (r.floor) opts.floor.set(r.floor, (opts.floor.get(r.floor) ?? 0) + 1);
      if (r.apartmentNumber) opts.apartmentNumber.set(r.apartmentNumber, (opts.apartmentNumber.get(r.apartmentNumber) ?? 0) + 1);
    }

    const toSorted = (m: Map<string, number>) =>
      Array.from(m.entries())
        .sort(([a], [b]) => a.localeCompare(b, undefined, { numeric: true }))
        .map(([value, count]) => ({ value, label: value, count }));

    return {
      buildingType: toSorted(opts.buildingType),
      searchStatus: toSorted(opts.searchStatus),
      towerNumber: toSorted(opts.towerNumber),
      floor: toSorted(opts.floor),
      apartmentNumber: toSorted(opts.apartmentNumber),
    };
  }, [records]);

  const setMultiFilter = useCallback(
    (key: keyof Pick<FilterState, "buildingType" | "searchStatus" | "towerNumber" | "floor" | "apartmentNumber">) =>
      (values: string[]) => {
        setFilters((prev) => ({ ...prev, [key]: values }));
      },
    [],
  );

  const setTextFilter = useCallback(
    (key: keyof Pick<FilterState, "customerName" | "customerNumber" | "globalSearch">) =>
      (value: string) => {
        setFilters((prev) => ({ ...prev, [key]: value }));
      },
    [],
  );

  const setStatusFilter = useCallback((values: UniqueApplicationStatus[]) => {
    setFilters((prev) => ({ ...prev, statusFilter: values }));
  }, []);

  const clearFilters = useCallback(() => {
    setFilters(DEFAULT_FILTERS);
  }, []);

  const activeFilterCount = useMemo(() => {
    let count = 0;
    if (filters.buildingType.length) count++;
    if (filters.searchStatus.length) count++;
    if (filters.towerNumber.length) count++;
    if (filters.floor.length) count++;
    if (filters.apartmentNumber.length) count++;
    if (filters.customerName) count++;
    if (filters.customerNumber) count++;
    if (filters.globalSearch) count++;
    if (filters.statusFilter.length !== ALLOWED_STATUSES.length) count++;
    return count;
  }, [filters]);

  return {
    filters,
    filteredRecords,
    filterOptions,
    setMultiFilter,
    setTextFilter,
    setStatusFilter,
    clearFilters,
    activeFilterCount,
  };
}
