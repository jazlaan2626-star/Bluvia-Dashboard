import type { ApartmentRecord } from "@/types";
import { downloadBlob } from "@/lib/utils";

export async function exportToExcel(
  records: ApartmentRecord[],
  filename = "field-sales-data.xlsx",
): Promise<void> {
  const { utils, writeFile } = await import("xlsx");

  const rows = records.map((r) => ({
    Tower: r.tower,
    "Building Type": r.buildingType,
    Floor: r.floor,
    "Apartment Number": r.apartmentNumber,
    "Tower Number": r.towerNumber,
    "Search Status": r.searchStatus,
    "Unique Application Collected": r.uniqueApplicationCollected,
    "Customer Name": r.customerName,
    "Customer Number": r.customerNumber,
    Remarks: r.remarks,
    "Visit Date": r.visitDate ?? "",
  }));

  const ws = utils.json_to_sheet(rows);
  const wb = utils.book_new();
  utils.book_append_sheet(wb, ws, "Dashboard Export");

  const colWidths = [
    { wch: 12 }, { wch: 16 }, { wch: 8 }, { wch: 18 }, { wch: 14 },
    { wch: 16 }, { wch: 24 }, { wch: 20 }, { wch: 16 }, { wch: 30 }, { wch: 14 },
  ];
  ws["!cols"] = colWidths;

  writeFile(wb, filename);
}

export async function exportToPDF(
  records: ApartmentRecord[],
  filename = "field-sales-data.pdf",
): Promise<void> {
  const { default: jsPDF } = await import("jspdf");
  const { default: autoTable } = await import("jspdf-autotable");

  const doc = new jsPDF({ orientation: "landscape", unit: "mm", format: "a4" });

  doc.setFontSize(14);
  doc.setFont("helvetica", "bold");
  doc.text("Field Sales Dashboard — Export", 14, 15);

  doc.setFontSize(9);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(100);
  doc.text(`Generated: ${new Date().toLocaleString()}  |  Records: ${records.length}`, 14, 22);
  doc.setTextColor(0);

  autoTable(doc, {
    startY: 28,
    head: [["Tower", "Building", "Floor", "Apt #", "Tower #", "Status", "UAC", "Customer", "Phone", "Remarks"]],
    body: records.map((r) => [
      r.tower,
      r.buildingType,
      r.floor,
      r.apartmentNumber,
      r.towerNumber,
      r.searchStatus,
      r.uniqueApplicationCollected,
      r.customerName,
      r.customerNumber,
      r.remarks,
    ]),
    styles: { fontSize: 7, cellPadding: 2 },
    headStyles: {
      fillColor: [99, 102, 241],
      textColor: 255,
      fontStyle: "bold",
      fontSize: 7.5,
    },
    alternateRowStyles: { fillColor: [248, 250, 252] },
    columnStyles: { 9: { cellWidth: 40 } },
    margin: { top: 28, left: 10, right: 10 },
  });

  doc.save(filename);
}

export function copyRowToClipboard(record: ApartmentRecord): void {
  const text = [
    `Tower: ${record.tower}`,
    `Building: ${record.buildingType}`,
    `Floor: ${record.floor}`,
    `Apartment: ${record.apartmentNumber}`,
    `Tower #: ${record.towerNumber}`,
    `Search Status: ${record.searchStatus}`,
    `UAC: ${record.uniqueApplicationCollected}`,
    `Customer: ${record.customerName}`,
    `Phone: ${record.customerNumber}`,
    `Remarks: ${record.remarks}`,
  ].join("\n");

  navigator.clipboard.writeText(text).catch(() => {
    const el = document.createElement("textarea");
    el.value = text;
    document.body.appendChild(el);
    el.select();
    document.execCommand("copy");
    document.body.removeChild(el);
  });
}
