import fs from "fs"
import path from "path"
import { google } from "googleapis"

const CREDENTIALS_PATH = path.join(__dirname, "../../credentials.json")
const CSV_PATH = path.join(__dirname, "../../portfolio.csv")

export async function downloadCSV(fileId: string): Promise<string> {
  const credentials = JSON.parse(fs.readFileSync(CREDENTIALS_PATH, "utf8"))
  const auth = new google.auth.GoogleAuth({
    credentials,
    scopes: ["https://www.googleapis.com/auth/drive.readonly"],
  })
  const drive = google.drive({ version: "v3", auth })
  const res = await drive.files.get(
    {
      fileId,
      alt: "media",
    },
    { responseType: "arraybuffer" }
  )
  fs.writeFileSync(CSV_PATH, Buffer.from(res.data as ArrayBuffer))
  return CSV_PATH
}
