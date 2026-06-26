"use client";
import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Phone, Database, Building2, Building, Layers, Home } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import type { KPIData } from "@/types";
import { formatNumber } from "@/lib/utils";

interface KPICardsProps {
  data: KPIData;
  isLoading: boolean;
}

interface KPICardConfig {
  key: keyof KPIData;
  label: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  bgColor: string;
}

const cards: KPICardConfig[] = [
  {
    key: "totalCallLaterLeads",
    label: "Call Later Leads",
    description: "Apartments requiring follow-up",
    icon: <Phone className="h-5 w-5" />,
    color: "text-blue-600 dark:text-blue-400",
    bgColor: "bg-blue-50 dark:bg-blue-950/50",
  },
  {
    key: "totalNoDataApartments",
    label: "No Data Apartments",
    description: "Apartments with no information",
    icon: <Database className="h-5 w-5" />,
    color: "text-amber-600 dark:text-amber-400",
    bgColor: "bg-amber-50 dark:bg-amber-950/50",
  },
  {
    key: "totalTowers",
    label: "Total Towers",
    description: "Unique towers in filter",
    icon: <Building2 className="h-5 w-5" />,
    color: "text-purple-600 dark:text-purple-400",
    bgColor: "bg-purple-50 dark:bg-purple-950/50",
  },
  {
    key: "totalBuildings",
    label: "Building Types",
    description: "Unique building categories",
    icon: <Building className="h-5 w-5" />,
    color: "text-emerald-600 dark:text-emerald-400",
    bgColor: "bg-emerald-50 dark:bg-emerald-950/50",
  },
  {
    key: "totalFloors",
    label: "Total Floors",
    description: "Unique floors in filter",
    icon: <Layers className="h-5 w-5" />,
    color: "text-rose-600 dark:text-rose-400",
    bgColor: "bg-rose-50 dark:bg-rose-950/50",
  },
  {
    key: "totalApartments",
    label: "Filtered Records",
    description: "Total matching apartments",
    icon: <Home className="h-5 w-5" />,
    color: "text-cyan-600 dark:text-cyan-400",
    bgColor: "bg-cyan-50 dark:bg-cyan-950/50",
  },
];

function AnimatedNumber({ value }: { value: number }) {
  const prevRef = useRef(value);
  const changed = prevRef.current !== value;

  useEffect(() => {
    prevRef.current = value;
  }, [value]);

  return (
    <motion.span
      key={value}
      initial={changed ? { opacity: 0, y: 10 } : false}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
    >
      {formatNumber(value)}
    </motion.span>
  );
}

export function KPICards({ data, isLoading }: KPICardsProps) {
  if (isLoading) {
    return (
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
        {Array.from({ length: 6 }).map((_, i) => (
          <Card key={i} className="overflow-hidden">
            <CardContent className="p-5">
              <Skeleton className="h-8 w-8 rounded-lg mb-3" />
              <Skeleton className="h-7 w-16 mb-1.5" />
              <Skeleton className="h-4 w-24" />
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
      {cards.map((card, idx) => (
        <motion.div
          key={card.key}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: idx * 0.05 }}
        >
          <Card className="group relative overflow-hidden transition-all duration-200 hover:shadow-md hover:-translate-y-0.5">
            <div className="absolute inset-0 bg-gradient-to-br from-transparent to-transparent group-hover:from-primary/3 transition-all duration-300" />
            <CardContent className="p-5">
              <div className={`mb-3 inline-flex rounded-lg p-2 ${card.bgColor}`}>
                <span className={card.color}>{card.icon}</span>
              </div>
              <div className={`text-2xl font-bold tracking-tight ${card.color}`}>
                <AnimatedNumber value={data[card.key]} />
              </div>
              <p className="mt-1 text-xs font-medium text-foreground/80 leading-tight">
                {card.label}
              </p>
              <p className="mt-0.5 text-[11px] text-muted-foreground leading-tight">
                {card.description}
              </p>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </div>
  );
}
