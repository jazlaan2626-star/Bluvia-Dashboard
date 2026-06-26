export const ALLOWED_STATUSES = ["Call Later (Lead)", "No Data"] as const;

export const REFRESH_INTERVAL = parseInt(
  process.env.NEXT_PUBLIC_REFRESH_INTERVAL || "60000",
  10,
);

export const APP_NAME = process.env.NEXT_PUBLIC_APP_NAME || "Field Sales Dashboard";

export const COLUMN_HEADERS = {
  TOWER: "TOWER",
  BUILDING_TYPE: "BUILDING TYPE",
  FLOOR: "FLOOR",
  APARTMENT_NUMBER: "APARTMENT NUMBER",
  TOWER_NUMBER: "TOWER NUMBER",
  SEARCH_STATUS: "SEARCH STATUS",
  UNIQUE_APPLICATION_COLLECTED: "UNIQUE APPLICATION COLLECTED",
  CUSTOMER_NAME: "CUSTOMER NAME",
  CUSTOMER_NUMBER: "CUSTOMER NUMBER",
  REMARKS: "REMARKS",
  VISIT_DATE: "DATE",
} as const;

export const CHART_COLORS = {
  callLater: "#3b82f6",
  noData: "#f59e0b",
  primary: "#6366f1",
  secondary: "#8b5cf6",
  success: "#22c55e",
  warning: "#f59e0b",
  danger: "#ef4444",
  muted: "#94a3b8",
};

export const CHART_COLORS_ARRAY = [
  "#3b82f6",
  "#8b5cf6",
  "#22c55e",
  "#f59e0b",
  "#ef4444",
  "#06b6d4",
  "#ec4899",
  "#10b981",
  "#f97316",
  "#a855f7",
];

export const DEFAULT_PAGE_SIZE = 25;
export const PAGE_SIZE_OPTIONS = [10, 25, 50, 100];

export const GRAPH_API_BASE = "https://graph.microsoft.com/v1.0";
export const GRAPH_TOKEN_URL = (tenantId: string) =>
  `https://login.microsoftonline.com/${tenantId}/oauth2/v2.0/token`;
export const GRAPH_SCOPE = "https://graph.microsoft.com/.default";
