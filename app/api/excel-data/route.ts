import { NextResponse } from "next/server";
import { getWorksheetData } from "@/lib/graph";
import { parseWorksheetData } from "@/services/excelService";
import type { DataResponse } from "@/types";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export async function GET() {
  try {
    const worksheetData = await getWorksheetData();
    const records = parseWorksheetData(worksheetData);

    const response: DataResponse = {
      records,
      lastUpdated: new Date().toISOString(),
      totalRows: worksheetData.values?.length ?? 0,
      worksheetName: process.env.WORKSHEET_NAME || "Sheet1",
    };

    return NextResponse.json(response, {
      headers: {
        "Cache-Control": "no-store, max-age=0",
      },
    });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Unknown error occurred";

    const isMissingConfig =
      message.includes("Missing Azure credentials") ||
      message.includes("Missing ONEDRIVE");

    const response: DataResponse = {
      records: [],
      lastUpdated: new Date().toISOString(),
      totalRows: 0,
      worksheetName: process.env.WORKSHEET_NAME || "Sheet1",
      error: message,
    };

    return NextResponse.json(response, {
      status: isMissingConfig ? 503 : 500,
      headers: { "Cache-Control": "no-store" },
    });
  }
}
