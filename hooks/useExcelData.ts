"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import type { ApartmentRecord, ConnectionStatus, DataResponse } from "@/types";
import { REFRESH_INTERVAL } from "@/lib/constants";

interface UseExcelDataResult {
  records: ApartmentRecord[];
  lastUpdated: string | null;
  status: ConnectionStatus;
  error: string | null;
  isLoading: boolean;
  refresh: () => Promise<void>;
  worksheetName: string;
}

export function useExcelData(): UseExcelDataResult {
  const [records, setRecords] = useState<ApartmentRecord[]>([]);
  const [lastUpdated, setLastUpdated] = useState<string | null>(null);
  const [status, setStatus] = useState<ConnectionStatus>("loading");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [worksheetName, setWorksheetName] = useState("Sheet1");
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const abortRef = useRef<AbortController | null>(null);

  const fetchData = useCallback(async (showLoading = false) => {
    if (abortRef.current) {
      abortRef.current.abort();
    }
    abortRef.current = new AbortController();

    if (showLoading) setIsLoading(true);

    try {
      const res = await fetch("/api/excel-data", {
        signal: abortRef.current.signal,
        cache: "no-store",
      });

      const data: DataResponse = await res.json();

      if (data.error) {
        setError(data.error);
        setStatus("error");
        if (data.records.length > 0) {
          setRecords(data.records);
          setLastUpdated(data.lastUpdated);
          setWorksheetName(data.worksheetName);
        }
      } else {
        setRecords(data.records);
        setLastUpdated(data.lastUpdated);
        setWorksheetName(data.worksheetName);
        setError(null);
        setStatus("connected");
      }
    } catch (err) {
      if ((err as Error).name === "AbortError") return;

      const isOffline = !navigator.onLine;
      setStatus(isOffline ? "offline" : "error");
      setError(
        isOffline
          ? "You appear to be offline. Showing cached data."
          : "Failed to fetch data. Will retry automatically.",
      );
    } finally {
      setIsLoading(false);
    }
  }, []);

  const refresh = useCallback(async () => {
    await fetchData(false);
  }, [fetchData]);

  useEffect(() => {
    fetchData(true);

    intervalRef.current = setInterval(() => {
      fetchData(false);
    }, REFRESH_INTERVAL);

    const handleOnline = () => fetchData(false);
    const handleOffline = () => setStatus("offline");

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      if (abortRef.current) abortRef.current.abort();
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, [fetchData]);

  return { records, lastUpdated, status, error, isLoading, refresh, worksheetName };
}
