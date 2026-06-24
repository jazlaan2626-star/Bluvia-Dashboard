/**
 * BLUVIA DASHBOARD — Google Apps Script
 * =======================================================
 * HOW TO DEPLOY
 * 1. Open your Google Sheet → Extensions → Apps Script
 * 2. Paste this entire file into the editor, replacing any existing code
 * 3. Click Deploy → New Deployment
 *    - Type: Web App
 *    - Execute as: Me
 *    - Who has access: Anyone
 * 4. Copy the Web App URL
 * 5. Paste it as VITE_SHEET_URL in your .env file:
 *    VITE_SHEET_URL=https://script.google.com/macros/s/YOUR_ID/exec
 * 6. Restart the dev server (npm run dev)
 *
 * REQUIRED SHEET TABS (exact tab names matter):
 * -------------------------------------------------------
 *   KPI           revenue | profit | orders
 *   Monthly       month | revenue | profit
 *   Quarterly     quarter | revenue | cost | profit
 *   Categories    name | units | value
 *   Products      name | category | units | revenue | cost | profit | stock | status
 *   Channels      name | revenue | orders | aov
 *   Customers     label | value
 *   CustomerDonut name | value
 *   Gauges        key | label | percent | value
 *   Marketing     label | value
 *   Campaigns     name | platform | budget | sales | roi | status
 *   Expenses      label | value | tone
 *   Inventory     label | value
 *   StockAlerts   name | stock | reorder | status
 */

function doGet(e) {
  try {
    var ss = SpreadsheetApp.getActiveSpreadsheet();

    var data = {
      kpi:           getRows(ss, 'KPI'),
      monthly:       getRows(ss, 'Monthly'),
      quarterly:     getRows(ss, 'Quarterly'),
      categories:    getRows(ss, 'Categories'),
      products:      getRows(ss, 'Products'),
      channels:      getRows(ss, 'Channels'),
      customers:     getRows(ss, 'Customers'),
      customerDonut: getRows(ss, 'CustomerDonut'),
      gauges:        getRows(ss, 'Gauges'),
      marketing:     getRows(ss, 'Marketing'),
      campaigns:     getRows(ss, 'Campaigns'),
      expenses:      getRows(ss, 'Expenses'),
      inventory:     getRows(ss, 'Inventory'),
      stockAlerts:   getRows(ss, 'StockAlerts'),
    };

    return ContentService
      .createTextOutput(JSON.stringify({ ok: true, data: data }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ ok: false, error: err.message }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function getRows(ss, sheetName) {
  var sheet = ss.getSheetByName(sheetName);
  if (!sheet) return [];

  var values = sheet.getDataRange().getValues();
  if (values.length < 2) return [];

  var headers = values[0].map(function(h) { return String(h).trim(); });
  var rows = values.slice(1);

  return rows
    .filter(function(r) { return r.some(function(v) { return v !== ''; }); })
    .map(function(r) {
      var obj = {};
      headers.forEach(function(h, i) { obj[h] = r[i]; });
      return obj;
    });
}
