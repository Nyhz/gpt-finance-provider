import fs from "fs"
import { parse } from "csv-parse/sync"

export function parseCSV(csvPath: string): any[] {
  const csv = fs.readFileSync(csvPath, "utf8")
  if (
    csv.trim().startsWith("<!doctype html>") ||
    csv.trim().startsWith("<html")
  ) {
    throw new Error(
      'Downloaded file is HTML, not CSV. Check Google Drive sharing settings and ensure the file is a direct CSV export, not a Google Sheet. Set sharing to "Anyone with the link can view".'
    )
  }
  const records = parse(csv, { columns: true, skip_empty_lines: true })
  return records
}

export function filterAssets(data: any[]): any[] {
  return Array.isArray(data)
    ? data.filter(
        (item) =>
          item.Shares &&
          item.Shares.trim() !== "" &&
          item.Name &&
          item.Name.trim() !== "" &&
          item.Symbol &&
          item.Symbol.trim() !== "" &&
          item.Quote &&
          item.Quote.trim() !== "" &&
          item["Market Value"] &&
          item["Market Value"].trim() !== ""
      )
    : []
}
