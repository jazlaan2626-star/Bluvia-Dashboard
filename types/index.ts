export type UniqueApplicationStatus = "Call Later (Lead)" | "No Data";

export interface ApartmentRecord {
  id: string;
  tower: string;
  buildingType: string;
  floor: string;
  apartmentNumber: string;
  towerNumber: string;
  searchStatus: string;
  uniqueApplicationCollected: UniqueApplicationStatus;
  customerName: string;
  customerNumber: string;
  remarks: string;
  visitDate?: string;
  rowIndex: number;
}

export interface FilterState {
  buildingType: string[];
  searchStatus: string[];
  towerNumber: string[];
  floor: string[];
  apartmentNumber: string[];
  customerName: string;
  customerNumber: string;
  globalSearch: string;
  statusFilter: UniqueApplicationStatus[];
}

export interface KPIData {
  totalCallLaterLeads: number;
  totalNoDataApartments: number;
  totalTowers: number;
  totalBuildings: number;
  totalFloors: number;
  totalApartments: number;
}

export interface ChartDataPoint {
  name: string;
  callLater: number;
  noData: number;
  total: number;
}

export interface FilterOption {
  value: string;
  label: string;
  count: number;
}

export interface DataResponse {
  records: ApartmentRecord[];
  lastUpdated: string;
  totalRows: number;
  worksheetName: string;
  error?: string;
}

export interface GraphTokenResponse {
  access_token: string;
  expires_in: number;
  token_type: string;
}

export interface WorksheetData {
  values: (string | number | boolean | null)[][];
}

export type SortDirection = "asc" | "desc" | false;

export interface TableColumn {
  id: string;
  label: string;
  visible: boolean;
  sortable: boolean;
}

export type ConnectionStatus = "connected" | "error" | "loading" | "offline";
