"use client";
import React from "react";
import { useTheme } from "next-themes";
import { motion, AnimatePresence } from "framer-motion";
import {
  RefreshCw, Moon, Sun, Wifi, WifiOff, AlertCircle, Clock, Building2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Badge } from "@/components/ui/badge";
import { formatRelativeTime } from "@/lib/utils";
import { APP_NAME } from "@/lib/constants";
import type { ConnectionStatus } from "@/types";

interface NavBarProps {
  lastUpdated: string | null;
  status: ConnectionStatus;
  isRefreshing: boolean;
  onRefresh: () => void;
  worksheetName: string;
}

const statusConfig: Record<ConnectionStatus, { icon: React.ReactNode; label: string; color: string }> = {
  connected: {
    icon: <Wifi className="h-3.5 w-3.5" />,
    label: "Connected",
    color: "text-emerald-600 dark:text-emerald-400",
  },
  error: {
    icon: <AlertCircle className="h-3.5 w-3.5" />,
    label: "Error",
    color: "text-red-500 dark:text-red-400",
  },
  loading: {
    icon: <RefreshCw className="h-3.5 w-3.5 animate-spin" />,
    label: "Loading",
    color: "text-blue-500 dark:text-blue-400",
  },
  offline: {
    icon: <WifiOff className="h-3.5 w-3.5" />,
    label: "Offline",
    color: "text-amber-500 dark:text-amber-400",
  },
};

export function NavBar({ lastUpdated, status, isRefreshing, onRefresh, worksheetName }: NavBarProps) {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => setMounted(true), []);

  const cfg = statusConfig[status];

  return (
    <TooltipProvider delayDuration={200}>
      <header className="sticky top-0 z-40 w-full border-b border-border/50 bg-background/80 backdrop-blur-xl supports-[backdrop-filter]:bg-background/60">
        <div className="flex h-14 items-center justify-between px-4 md:px-6">
          {/* Left */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2.5">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10">
                <Building2 className="h-4 w-4 text-primary" />
              </div>
              <div>
                <h1 className="text-sm font-semibold leading-none tracking-tight">{APP_NAME}</h1>
                <p className="mt-0.5 text-xs text-muted-foreground hidden sm:block">
                  Field Sales Operations
                </p>
              </div>
            </div>
            <Badge variant="outline" className="hidden md:flex text-[10px] h-5 gap-1 px-1.5">
              <span className="opacity-60">Source:</span>
              <span className="font-medium">{worksheetName}</span>
            </Badge>
          </div>

          {/* Right */}
          <div className="flex items-center gap-2">
            {/* Connection Status */}
            <Tooltip>
              <TooltipTrigger asChild>
                <div className={`flex items-center gap-1.5 text-xs font-medium ${cfg.color}`}>
                  <span className="relative flex h-2 w-2">
                    {status === "connected" && (
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                    )}
                    <span className={`relative inline-flex h-2 w-2 rounded-full ${
                      status === "connected" ? "bg-emerald-500" :
                      status === "error" ? "bg-red-500" :
                      status === "offline" ? "bg-amber-500" : "bg-blue-500"
                    }`} />
                  </span>
                  <span className="hidden sm:inline">{cfg.label}</span>
                </div>
              </TooltipTrigger>
              <TooltipContent side="bottom">
                <p>{cfg.label} to Microsoft Graph API</p>
              </TooltipContent>
            </Tooltip>

            {/* Last Synced */}
            {lastUpdated && (
              <Tooltip>
                <TooltipTrigger asChild>
                  <div className="hidden md:flex items-center gap-1.5 text-xs text-muted-foreground">
                    <Clock className="h-3 w-3" />
                    <span>{formatRelativeTime(lastUpdated)}</span>
                  </div>
                </TooltipTrigger>
                <TooltipContent side="bottom">
                  <p>Last synced: {new Date(lastUpdated).toLocaleString()}</p>
                  <p className="text-muted-foreground text-xs mt-0.5">Auto-refreshes every 60 seconds</p>
                </TooltipContent>
              </Tooltip>
            )}

            {/* Refresh Button */}
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={onRefresh}
                  disabled={isRefreshing}
                  className="h-8 w-8"
                >
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={isRefreshing ? "spinning" : "idle"}
                      initial={{ rotate: 0 }}
                      animate={isRefreshing ? { rotate: 360 } : { rotate: 0 }}
                      transition={isRefreshing ? { duration: 1, repeat: Infinity, ease: "linear" } : { duration: 0.2 }}
                    >
                      <RefreshCw className="h-4 w-4" />
                    </motion.div>
                  </AnimatePresence>
                  <span className="sr-only">Refresh data</span>
                </Button>
              </TooltipTrigger>
              <TooltipContent side="bottom">Refresh data</TooltipContent>
            </Tooltip>

            {/* Theme Toggle */}
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                  className="h-8 w-8"
                >
                  {mounted && (
                    <AnimatePresence mode="wait" initial={false}>
                      <motion.div
                        key={theme}
                        initial={{ scale: 0, rotate: -90 }}
                        animate={{ scale: 1, rotate: 0 }}
                        exit={{ scale: 0, rotate: 90 }}
                        transition={{ duration: 0.15 }}
                      >
                        {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
                      </motion.div>
                    </AnimatePresence>
                  )}
                  <span className="sr-only">Toggle theme</span>
                </Button>
              </TooltipTrigger>
              <TooltipContent side="bottom">Toggle theme</TooltipContent>
            </Tooltip>
          </div>
        </div>
      </header>
    </TooltipProvider>
  );
}
