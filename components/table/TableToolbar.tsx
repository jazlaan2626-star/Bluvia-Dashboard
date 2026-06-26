"use client";
import React from "react";
import { Search, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface TableToolbarProps {
  globalFilter: string;
  onGlobalFilterChange: (value: string) => void;
  onClear: () => void;
}

export function TableToolbar({ globalFilter, onGlobalFilterChange, onClear }: TableToolbarProps) {
  return (
    <div className="flex items-center gap-2">
      <div className="relative flex-1 max-w-xs">
        <Search className="absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Search table..."
          value={globalFilter}
          onChange={(e) => onGlobalFilterChange(e.target.value)}
          className="pl-8 h-8 text-sm"
        />
        {globalFilter && (
          <button
            onClick={() => onGlobalFilterChange("")}
            className="absolute right-2.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
          >
            <X className="h-3.5 w-3.5" />
          </button>
        )}
      </div>
      {globalFilter && (
        <Button variant="ghost" size="sm" onClick={onClear} className="h-8 text-xs">
          Clear
        </Button>
      )}
    </div>
  );
}
