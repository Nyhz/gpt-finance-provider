import express from "express"
import cors from "cors"
import path from "path"
import { downloadCSV } from "./services/googleDriveService"
import { parseCSV, filterAssets } from "./services/csvService"

const app = express()
app.use(cors())
const PORT = process.env.PORT || 3000

const FILE_ID = "1wtFfslKnFjo35fWJ35-_ATvBQ84WLYKm"
let jsonData: any = null

async function loadData() {
  const csvPath = await downloadCSV(FILE_ID)
  jsonData = parseCSV(csvPath)
}

app.get("/assets", async (req, res) => {
  if (!jsonData) {
    try {
      await loadData()
    } catch (err) {
      return res.status(500).json({
        error: "Failed to load data",
        details: err instanceof Error ? err.message : err,
      })
    }
  }
  res.json(filterAssets(jsonData))
})

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
