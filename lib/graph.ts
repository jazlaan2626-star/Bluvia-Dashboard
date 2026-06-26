import {
  GRAPH_API_BASE,
  GRAPH_TOKEN_URL,
  GRAPH_SCOPE,
} from "./constants";
import type { GraphTokenResponse, WorksheetData } from "@/types";

let cachedToken: { token: string; expiresAt: number } | null = null;

export async function getGraphAccessToken(): Promise<string> {
  if (cachedToken && Date.now() < cachedToken.expiresAt - 60_000) {
    return cachedToken.token;
  }

  const tenantId = process.env.AZURE_TENANT_ID;
  const clientId = process.env.AZURE_CLIENT_ID;
  const clientSecret = process.env.AZURE_CLIENT_SECRET;

  if (!tenantId || !clientId || !clientSecret) {
    throw new Error(
      "Missing Azure credentials. Set AZURE_TENANT_ID, AZURE_CLIENT_ID, AZURE_CLIENT_SECRET in environment variables.",
    );
  }

  const params = new URLSearchParams({
    grant_type: "client_credentials",
    client_id: clientId,
    client_secret: clientSecret,
    scope: GRAPH_SCOPE,
  });

  const res = await fetch(GRAPH_TOKEN_URL(tenantId), {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: params.toString(),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Failed to acquire Graph token: ${res.status} ${text}`);
  }

  const data: GraphTokenResponse = await res.json();
  cachedToken = {
    token: data.access_token,
    expiresAt: Date.now() + data.expires_in * 1000,
  };

  return data.access_token;
}

async function graphFetch<T>(path: string): Promise<T> {
  const token = await getGraphAccessToken();

  const res = await fetch(`${GRAPH_API_BASE}${path}`, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    next: { revalidate: 0 },
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Graph API error ${res.status}: ${text}`);
  }

  return res.json() as Promise<T>;
}

export async function getWorksheetData(): Promise<WorksheetData> {
  const driveId = process.env.ONEDRIVE_DRIVE_ID;
  const itemId = process.env.ONEDRIVE_ITEM_ID;
  const worksheetName = process.env.WORKSHEET_NAME || "Sheet1";
  const userUpn = process.env.ONEDRIVE_USER_UPN;

  if (!itemId) {
    throw new Error(
      "Missing ONEDRIVE_ITEM_ID environment variable.",
    );
  }

  let basePath: string;
  if (driveId) {
    basePath = `/drives/${driveId}/items/${itemId}`;
  } else if (userUpn) {
    basePath = `/users/${encodeURIComponent(userUpn)}/drive/items/${itemId}`;
  } else {
    basePath = `/me/drive/items/${itemId}`;
  }

  const encodedSheet = encodeURIComponent(worksheetName);
  const path = `${basePath}/workbook/worksheets/${encodedSheet}/usedRange?$select=values`;

  return graphFetch<WorksheetData>(path);
}
