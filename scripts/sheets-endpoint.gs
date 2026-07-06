/**
 * Google Apps Script — MultiBranch Template Sheets Endpoint
 *
 * DEPLOYMENT:
 *   1. Open Google Sheets with tabs: Cars, Locations, Testimonials, Pricing, FAQ, Settings
 *   2. Extensions > Apps Script > paste this file
 *   3. Deploy > New deployment > Web app (execute as: me, access: anyone)
 *   4. Copy the Web App URL into your .env.local as NEXT_PUBLIC_SHEET_JSON_URL
 *
 * SHEET COLUMNS:
 *
 *   Cars:
 *     id | slug | brand | model | year | category | transmission | fuelType
 *     | seats | doors | luggage | pricePerDay | pricePerWeek | pricePerMonth
 *     | deposit | description | features (JSON array) | images (JSON array)
 *     | status | branch (must match Locations.slug)
 *
 *   Locations:
 *     id | slug | name | nameAr | address | addressAr | city | cityAr
 *     | phone | whatsapp | email | hours | hoursAr | lat | lng | image | order
 *
 *   Testimonials:
 *     id | name | title | avatar | rating | text | branch (optional)
 *
 *   Pricing:
 *     id | category | daily | weekly | monthly | mileage | deposit
 *
 *   FAQ:
 *     id | question | answer
 *
 *   Settings:
 *     ownerName | ownerWhatsApp | businessEmail | businessPhone
 *     | businessHours | socialLinks (JSON)
 */

function getSheetData_(sheetName) {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName(sheetName);
  if (!sheet) return [];
  var rows = sheet.getDataRange().getValues();
  if (rows.length < 2) return [];
  var headers = rows[0].map(function (h) {
    return h.toString().trim();
  });
  var result = [];
  for (var r = 1; r < rows.length; r++) {
    var row = rows[r];
    var obj = {};
    for (var c = 0; c < headers.length; c++) {
      var val = row[c];
      // Try parsing JSON for string columns that look like arrays/objects
      if (
        typeof val === "string" &&
        (val.startsWith("[") || val.startsWith("{"))
      ) {
        try {
          val = JSON.parse(val);
        } catch (e) {}
      }
      obj[headers[c]] = val;
    }
    result.push(obj);
  }
  return result;
}

function doGet() {
  var data = {
    cars: getSheetData_("Cars"),
    locations: getSheetData_("Locations"),
    testimonials: getSheetData_("Testimonials"),
    pricing: getSheetData_("Pricing"),
    faq: getSheetData_("FAQ"),
    settings: getSheetData_("Settings"),
  };

  // Settings is a single row — return object directly
  if (Array.isArray(data.settings) && data.settings.length > 0) {
    data.settings = data.settings[0];
  }

  return ContentService.createTextOutput(
    JSON.stringify(data)
  ).setMimeType(ContentService.MimeType.JSON);
}
