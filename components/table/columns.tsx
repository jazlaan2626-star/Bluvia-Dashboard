"use client";
import React from "react";
import { type ColumnDef, type Row } from "@tanstack/react-table";
import { ArrowUpDown, ArrowUp, ArrowDown, Copy, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import type { ApartmentRecord } from "@/types";
import { cn, truncate } from "@/lib/utils";
import { copyRowToClipboard } from "@/utils/export";

function SortHeader({
  column,
  children,
}: {
  column: any;
  children: React.ReactNode;
}) {
  const sorted = column.getIsSorted();
  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={() => column.toggleSorting(sorted === "asc")}
      className="-ml-3 h-8 gap-1 font-medium text-xs"
    >
      {children}
      {sorted === "asc" ? (
        <ArrowUp className="h-3 w-3" />
      ) : sorted === "desc" ? (
        <ArrowDown className="h-3 w-3" />
      ) : (
        <ArrowUpDown className="h-3 w-3 opacity-40" />
      )}
    </Button>
  );
}

const UACBadge = ({ value }: { value: string }) => (
  <Badge
    variant={value === "Call Later (Lead)" ? "info" : "warning"}
    className="whitespace-nowrap text-[11px]"
  >
    {value === "Call Later (Lead)" ? "Call Later" : "No Data"}
  </Badge>
);

export function getColumns(
  onRowClick: (row: ApartmentRecord) => void,
): ColumnDef<ApartmentRecord>[] {
  return [
    {
      id: "select",
      header: ({ table }) => (
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && "indeterminate")
          }
          onCheckedChange={(v) => table.toggleAllPageRowsSelected(!!v)}
          aria-label="Select all"
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(v) => row.toggleSelected(!!v)}
          aria-label="Select row"
          onClick={(e) => e.stopPropagation()}
        />
      ),
      enableSorting: false,
      enableHiding: false,
      size: 36,
    },
    {
      accessorKey: "tower",
      header: ({ column }) => <SortHeader column={column}>Tower</SortHeader>,
      cell: ({ getValue }) => (
        <span className="font-medium text-sm">{String(getValue() ?? "")}</span>
      ),
      size: 90,
    },
    {
      accessorKey: "buildingType",
      header: ({ column }) => <SortHeader column={column}>Building</SortHeader>,
      cell: ({ getValue }) => (
        <span className="text-sm text-muted-foreground">{String(getValue() ?? "")}</span>
      ),
      size: 110,
    },
    {
      accessorKey: "floor",
      header: ({ column }) => <SortHeader column={column}>Floor</SortHeader>,
      cell: ({ getValue }) => (
        <span className="tabular-nums text-sm">{String(getValue() ?? "")}</span>
      ),
      size: 70,
    },
    {
      accessorKey: "apartmentNumber",
      header: ({ column }) => <SortHeader column={column}>Apt #</SortHeader>,
      cell: ({ getValue }) => (
        <span className="font-mono text-xs">{String(getValue() ?? "")}</span>
      ),
      size: 90,
    },
    {
      accessorKey: "towerNumber",
      header: ({ column }) => <SortHeader column={column}>Tower #</SortHeader>,
      cell: ({ getValue }) => (
        <span className="tabular-nums text-sm">{String(getValue() ?? "")}</span>
      ),
      size: 80,
    },
    {
      accessorKey: "searchStatus",
      header: ({ column }) => <SortHeader column={column}>Search Status</SortHeader>,
      cell: ({ getValue }) => {
        const v = String(getValue() ?? "");
        return (
          <span className={cn(
            "text-xs font-medium",
            v.toLowerCase().includes("visited") && !v.toLowerCase().includes("not")
              ? "text-emerald-600 dark:text-emerald-400"
              : "text-muted-foreground",
          )}>
            {v}
          </span>
        );
      },
      size: 130,
    },
    {
      accessorKey: "uniqueApplicationCollected",
      header: ({ column }) => <SortHeader column={column}>UAC Status</SortHeader>,
      cell: ({ getValue }) => <UACBadge value={String(getValue() ?? "")} />,
      size: 130,
    },
    {
      accessorKey: "customerName",
      header: ({ column }) => <SortHeader column={column}>Customer</SortHeader>,
      cell: ({ getValue }) => {
        const v = String(getValue() ?? "");
        return v ? (
          <span className="text-sm font-medium">{truncate(v, 22)}</span>
        ) : (
          <span className="text-xs text-muted-foreground italic">—</span>
        );
      },
      size: 150,
    },
    {
      accessorKey: "customerNumber",
      header: ({ column }) => <SortHeader column={column}>Phone</SortHeader>,
      cell: ({ getValue }) => {
        const v = String(getValue() ?? "");
        return v ? (
          <span className="font-mono text-xs">{v}</span>
        ) : (
          <span className="text-xs text-muted-foreground">—</span>
        );
      },
      size: 120,
    },
    {
      accessorKey: "remarks",
      header: "Remarks",
      cell: ({ getValue }) => {
        const v = String(getValue() ?? "");
        return v ? (
          <span className="text-xs text-muted-foreground" title={v}>
            {truncate(v, 40)}
          </span>
        ) : null;
      },
      enableSorting: false,
      size: 200,
    },
    {
      id: "actions",
      header: "",
      cell: ({ row }) => (
        <div className="flex items-center gap-1 opacity-0 group-hover/row:opacity-100 transition-opacity">
          <Button
            variant="ghost"
            size="icon"
            className="h-7 w-7"
            onClick={(e) => {
              e.stopPropagation();
              copyRowToClipboard(row.original);
            }}
            title="Copy row"
          >
            <Copy className="h-3.5 w-3.5" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="h-7 w-7"
            onClick={(e) => {
              e.stopPropagation();
              onRowClick(row.original);
            }}
            title="View details"
          >
            <ExternalLink className="h-3.5 w-3.5" />
          </Button>
        </div>
      ),
      enableSorting: false,
      enableHiding: false,
      size: 70,
    },
  ];
}
