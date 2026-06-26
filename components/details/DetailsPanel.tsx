"use client";
import React from "react";
import { motion } from "framer-motion";
import {
  Building, Layers, Home, Phone, MessageSquare,
  BadgeCheck, Search, Hash, Building2,
} from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import type { ApartmentRecord } from "@/types";

interface DetailsPanelProps {
  record: ApartmentRecord | null;
  open: boolean;
  onClose: () => void;
}

interface DetailRowProps {
  icon: React.ReactNode;
  label: string;
  value: string | undefined | null;
  mono?: boolean;
}

function DetailRow({ icon, label, value, mono = false }: DetailRowProps) {
  if (!value) return null;
  return (
    <div className="flex items-start gap-3 py-3">
      <div className="mt-0.5 flex h-7 w-7 items-center justify-center rounded-md bg-muted/70 text-muted-foreground flex-shrink-0">
        {icon}
      </div>
      <div className="min-w-0 flex-1">
        <p className="text-[11px] font-medium uppercase tracking-wide text-muted-foreground mb-0.5">
          {label}
        </p>
        <p className={`text-sm font-medium break-words ${mono ? "font-mono" : ""}`}>
          {value || <span className="text-muted-foreground italic text-xs">—</span>}
        </p>
      </div>
    </div>
  );
}

export function DetailsPanel({ record, open, onClose }: DetailsPanelProps) {
  return (
    <Sheet open={open} onOpenChange={(o) => !o && onClose()}>
      <SheetContent className="w-full sm:max-w-md p-0 flex flex-col" side="right">
        {/* Header */}
        <SheetHeader className="px-6 py-5 border-b">
          <div className="flex items-start gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
              <Home className="h-5 w-5 text-primary" />
            </div>
            <div>
              <SheetTitle className="text-base">
                {record?.apartmentNumber
                  ? `Apartment ${record.apartmentNumber}`
                  : "Apartment Details"}
              </SheetTitle>
              <SheetDescription className="text-xs mt-0.5">
                {[record?.tower, record?.buildingType, `Floor ${record?.floor}`]
                  .filter(Boolean)
                  .join(" · ")}
              </SheetDescription>
            </div>
          </div>

          {record && (
            <div className="flex gap-2 mt-3">
              <Badge
                variant={
                  record.uniqueApplicationCollected === "Call Later (Lead)"
                    ? "info"
                    : "warning"
                }
              >
                {record.uniqueApplicationCollected === "Call Later (Lead)"
                  ? "Call Later (Lead)"
                  : "No Data"}
              </Badge>
              {record.searchStatus && (
                <Badge variant="outline" className="text-xs">
                  {record.searchStatus}
                </Badge>
              )}
            </div>
          )}
        </SheetHeader>

        {/* Content */}
        <ScrollArea className="flex-1 px-6">
          {!record ? (
            <div className="py-12 text-center text-muted-foreground text-sm">
              No record selected
            </div>
          ) : (
            <div>
              {/* Apartment Info */}
              <div className="py-2">
                <p className="py-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Apartment Information
                </p>
                <div className="divide-y divide-border/50">
                  <DetailRow icon={<Building2 className="h-4 w-4" />} label="Tower" value={record.tower} />
                  <DetailRow icon={<Building className="h-4 w-4" />} label="Building Type" value={record.buildingType} />
                  <DetailRow icon={<Layers className="h-4 w-4" />} label="Floor" value={record.floor} />
                  <DetailRow icon={<Home className="h-4 w-4" />} label="Apartment Number" value={record.apartmentNumber} />
                  <DetailRow icon={<Hash className="h-4 w-4" />} label="Tower Number" value={record.towerNumber} mono />
                </div>
              </div>

              <Separator />

              {/* Visit Info */}
              <div className="py-2">
                <p className="py-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Visit & Status
                </p>
                <div className="divide-y divide-border/50">
                  <DetailRow icon={<Search className="h-4 w-4" />} label="Search Status" value={record.searchStatus} />
                  <DetailRow icon={<BadgeCheck className="h-4 w-4" />} label="Application Status" value={record.uniqueApplicationCollected} />
                  {record.visitDate && (
                    <DetailRow icon={<BadgeCheck className="h-4 w-4" />} label="Visit Date" value={record.visitDate} />
                  )}
                </div>
              </div>

              <Separator />

              {/* Customer Info */}
              <div className="py-2">
                <p className="py-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Customer Information
                </p>
                <div className="divide-y divide-border/50">
                  <DetailRow icon={<Home className="h-4 w-4" />} label="Customer Name" value={record.customerName} />
                  <DetailRow icon={<Phone className="h-4 w-4" />} label="Phone Number" value={record.customerNumber} mono />
                </div>
              </div>

              {record.remarks && (
                <>
                  <Separator />
                  <div className="py-2">
                    <p className="py-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                      Remarks
                    </p>
                    <div className="flex gap-3 py-3">
                      <div className="flex h-7 w-7 items-center justify-center rounded-md bg-muted/70 text-muted-foreground flex-shrink-0 mt-0.5">
                        <MessageSquare className="h-4 w-4" />
                      </div>
                      <p className="text-sm text-muted-foreground leading-relaxed whitespace-pre-wrap">
                        {record.remarks}
                      </p>
                    </div>
                  </div>
                </>
              )}

              <div className="py-4">
                <p className="text-[10px] text-muted-foreground/50 text-center">
                  Row #{record.rowIndex} · ID: {record.id}
                </p>
              </div>
            </div>
          )}
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
}
