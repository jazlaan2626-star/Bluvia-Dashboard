import type { ApartmentRecord, WorksheetData, UniqueApplicationStatus } from "@/types";
import { ALLOWED_STATUSES, COLUMN_HEADERS } from "@/lib/constants";
import { normalizeString } from "@/lib/utils";

function findColumnIndex(
  headers: string[],
  ...candidates: string[]
): number {
  for (const candidate of candidates) {
    const idx = headers.findIndex(
      (h) => h.toUpperCase().trim() === candidate.toUpperCase().trim(),
    );
    if (idx !== -1) return idx;
  }
  return -1;
}

export function parseWorksheetData(data: WorksheetData): ApartmentRecord[] {
  const { values } = data;
  if (!values || values.length < 2) return [];

  const rawHeaders = values[0].map((h) =>
    normalizeString(h).toUpperCase().trim(),
  );

  const colMap = {
    tower: findColumnIndex(rawHeaders, COLUMN_HEADERS.TOWER, "TOWER"),
    buildingType: findColumnIndex(rawHeaders, COLUMN_HEADERS.BUILDING_TYPE, "BUILDING TYPE", "BUILDING"),
    floor: findColumnIndex(rawHeaders, COLUMN_HEADERS.FLOOR, "FLOOR NO", "FLOOR NUMBER"),
    apartmentNumber: findColumnIndex(rawHeaders, COLUMN_HEADERS.APARTMENT_NUMBER, "APT NUMBER", "APT NO", "UNIT NUMBER", "UNIT NO"),
    towerNumber: findColumnIndex(rawHeaders, COLUMN_HEADERS.TOWER_NUMBER, "TOWER NO", "TOWER NUM"),
    searchStatus: findColumnIndex(rawHeaders, COLUMN_HEADERS.SEARCH_STATUS, "STATUS"),
    uniqueApplicationCollected: findColumnIndex(
      rawHeaders,
      COLUMN_HEADERS.UNIQUE_APPLICATION_COLLECTED,
      "UNIQUE APP COLLECTED",
      "APPLICATION STATUS",
      "APP COLLECTED",
    ),
    customerName: findColumnIndex(rawHeaders, COLUMN_HEADERS.CUSTOMER_NAME, "CUSTOMER", "NAME", "OWNER NAME"),
    customerNumber: findColumnIndex(rawHeaders, COLUMN_HEADERS.CUSTOMER_NUMBER, "PHONE", "MOBILE", "CONTACT", "PHONE NUMBER"),
    remarks: findColumnIndex(rawHeaders, COLUMN_HEADERS.REMARKS, "COMMENT", "NOTE", "NOTES"),
    visitDate: findColumnIndex(rawHeaders, COLUMN_HEADERS.VISIT_DATE, "VISIT DATE", "DATE VISITED", "SUBMISSION DATE"),
  };

  const records: ApartmentRecord[] = [];

  for (let i = 1; i < values.length; i++) {
    const row = values[i];
    if (!row || row.length === 0) continue;

    const uac = normalizeString(
      colMap.uniqueApplicationCollected !== -1
        ? row[colMap.uniqueApplicationCollected]
        : "",
    );

    if (!(ALLOWED_STATUSES as readonly string[]).includes(uac)) continue;

    records.push({
      id: `row-${i}`,
      rowIndex: i,
      tower: colMap.tower !== -1 ? normalizeString(row[colMap.tower]) : "",
      buildingType: colMap.buildingType !== -1 ? normalizeString(row[colMap.buildingType]) : "",
      floor: colMap.floor !== -1 ? normalizeString(row[colMap.floor]) : "",
      apartmentNumber: colMap.apartmentNumber !== -1 ? normalizeString(row[colMap.apartmentNumber]) : "",
      towerNumber: colMap.towerNumber !== -1 ? normalizeString(row[colMap.towerNumber]) : "",
      searchStatus: colMap.searchStatus !== -1 ? normalizeString(row[colMap.searchStatus]) : "",
      uniqueApplicationCollected: uac as UniqueApplicationStatus,
      customerName: colMap.customerName !== -1 ? normalizeString(row[colMap.customerName]) : "",
      customerNumber: colMap.customerNumber !== -1 ? normalizeString(row[colMap.customerNumber]) : "",
      remarks: colMap.remarks !== -1 ? normalizeString(row[colMap.remarks]) : "",
      visitDate: colMap.visitDate !== -1 ? normalizeString(row[colMap.visitDate]) : undefined,
    });
  }

  return records;
}

export function getUniqueValues<K extends keyof ApartmentRecord>(
  records: ApartmentRecord[],
  key: K,
): string[] {
  const set = new Set<string>();
  for (const r of records) {
    const v = normalizeString(r[key] as string);
    if (v) set.add(v);
  }
  return Array.from(set).sort((a, b) =>
    a.localeCompare(b, undefined, { numeric: true }),
  );
}
