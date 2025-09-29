# Finance Service

This project provides an Express API to serve filtered asset data from a Portfolio Performance CSV file stored in Google Drive.

## Features

- Downloads and parses your Portfolio Performance CSV from Google Drive
- Filters out incomplete asset data
- Serves data via a `/assets` endpoint
- Ready for GPT Actions integration (OpenAPI spec included)
- Docker-ready for easy deployment

## Setup

1. **Clone the repository**
2. **Install dependencies**
   ```bash
   npm install
   ```
3. **Add your Google service account credentials**
   - Place `credentials.json` securely (do not commit to version control)
   - Share your CSV file with the service account email
4. **Configure the file ID**
   - Update `FILE_ID` in `src/server.ts` with your Google Drive CSV file ID

## Running Locally

```bash
npm run dev
```

## Running with Docker

```bash
docker build -t finance-service .
docker run -p 3000:3000 -v /path/to/credentials.json:/app/credentials.json finance-service
```

## API Endpoint

- `GET /assets` — Returns filtered asset data as JSON

## Security Notes

- Do not expose `credentials.json` publicly
- Use HTTPS and authentication for production deployments

## OpenAPI Spec

See `openapi.yaml` for GPT Action integration.

---

GitHub Copilot

# Finance Service

Servicio para descargar y parsear archivos de Portfolio Performance desde Google Drive, convirtiéndolos a JSON para uso con custom GPT.

## Configuración

1. **Exportar datos de Portfolio Performance**:

   - Abre Portfolio Performance.
   - Ve a Archivo > Exportar > XML (elige exportar el portfolio completo).
   - Guarda el archivo XML.

2. **Subir a Google Drive**:

   - Sube el XML a Google Drive.
   - Comparte con la Service Account: `finance-service@finance-tracker-465623.iam.gserviceaccount.com` (Lector).
   - Obtén el File ID de la URL: `https://drive.google.com/file/d/FILE_ID/view`.
   - Reemplaza `'13Cl0n4fEMQtjLmdM7RDvue9upFbpSwWi'` en `src/server.ts` con el nuevo ID.

3. **Google Cloud Console** (ya hecho):

   - Proyecto creado, API habilitada, Service Account configurada.

4. **Instalación y ejecución**:

   - `npm install`
   - `npm run build`
   - `npm start`

5. **Docker**:
   - `docker build -t finance-service .`
   - `docker run -p 3000:3000 finance-service`

## Uso

- Endpoint: `GET /finanzas`
- Devuelve el JSON parseado del XML.

## Notas

- El archivo .portfolio es binario; exporta como XML plano para simplicidad.
- Asegúrate de que el XML esté en UTF-8.
