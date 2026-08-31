import "./lib/error-capture";

import { consumeLastCapturedError } from "./lib/error-capture";
import { renderErrorPage } from "./lib/error-page";
import { farms, zones, alerts, recommendations } from "./data/mock-data";

type ServerEntry = {
  fetch: (request: Request, env: unknown, ctx: unknown) => Promise<Response> | Response;
};

let serverEntryPromise: Promise<ServerEntry> | undefined;

async function getServerEntry(): Promise<ServerEntry> {
  if (!serverEntryPromise) {
    serverEntryPromise = import("@tanstack/react-start/server-entry").then(
      (m) => (m.default ?? m) as ServerEntry,
    );
  }
  return serverEntryPromise;
}

// h3 swallows in-handler throws into a normal 500 Response with body
// {"unhandled":true,"message":"HTTPError"} — try/catch alone never fires for those.
async function normalizeCatastrophicSsrResponse(response: Response): Promise<Response> {
  if (response.status < 500) return response;
  const contentType = response.headers.get("content-type") ?? "";
  if (!contentType.includes("application/json")) return response;

  const body = await response.clone().text();
  if (!isH3SwallowedErrorBody(body)) return response;

  console.error(consumeLastCapturedError() ?? new Error(`h3 swallowed SSR error: ${body}`));
  return new Response(renderErrorPage(), {
    status: 500,
    headers: { "content-type": "text/html; charset=utf-8" },
  });
}

function isH3SwallowedErrorBody(body: string): boolean {
  try {
    const payload = JSON.parse(body) as { unhandled?: unknown; message?: unknown };
    return payload.unhandled === true && payload.message === "HTTPError";
  } catch {
    return false;
  }
}

export default {
  async fetch(request: Request, env: unknown, ctx: unknown) {
    try {
      const url = new URL(request.url);

      // Node.js Backend Health Check: GET /api/health
      if (url.pathname === "/api/health") {
        return new Response(
          JSON.stringify({
            status: "healthy",
            timestamp: new Date().toISOString(),
            service: "cropwise-node-backend",
            version: "1.0.0",
            pipeline: "operational",
            components: {
              cropDetection: "active",
              cropHealthAnalysis: "active",
              waterStressDetection: "active",
              irrigationPrioritizer: "active",
              explainableEngine: "active",
            },
          }),
          {
            headers: {
              "content-type": "application/json",
              "access-control-allow-origin": "*",
            },
          },
        );
      }

      // AI and Analytics Service Health Check: GET /health
      if (url.pathname === "/health") {
        return new Response(
          JSON.stringify({
            status: "healthy",
            service: "cropwise-ai-fastapi-service",
            version: "1.2.0",
            model: "RandomForest-CropClassifier-v1",
            waterStressModel: "ET0-Moisture-Inference-v2",
            timestamp: new Date().toISOString(),
          }),
          {
            headers: {
              "content-type": "application/json",
              "access-control-allow-origin": "*",
            },
          },
        );
      }

      // API: GET /api/farms
      if (url.pathname === "/api/farms") {
        return new Response(JSON.stringify(farms), {
          headers: { "content-type": "application/json" },
        });
      }

      // API: GET /api/zones
      if (url.pathname === "/api/zones") {
        return new Response(JSON.stringify(zones), {
          headers: { "content-type": "application/json" },
        });
      }

      // API: GET /api/recommendations
      if (url.pathname === "/api/recommendations") {
        return new Response(JSON.stringify(recommendations), {
          headers: { "content-type": "application/json" },
        });
      }

      // API: POST /api/pipeline/analyze
      if (url.pathname === "/api/pipeline/analyze" && request.method === "POST") {
        let body: { zoneId?: string } = {};
        try {
          body = await request.json();
        } catch {
          body = {};
        }

        const targetZone =
          zones.find((z) => z.id === body.zoneId) ?? zones.find((z) => z.id === "Z08") ?? zones[0]!;

        // 8-step pipeline execution output
        const result = {
          zoneId: targetZone.id,
          zoneName: targetZone.name,
          timestamp: new Date().toISOString(),
          pipelineSteps: [
            {
              step: 1,
              name: "Agricultural Datasets",
              status: "completed",
              result: "Sentinel-2 L2A + IoT probes ingested",
            },
            {
              step: 2,
              name: "Data Processing",
              status: "completed",
              result: "Atmospheric & spatial corrections applied",
            },
            {
              step: 3,
              name: "Crop Detection",
              status: "completed",
              result: `Detected: ${targetZone.crop} (94.8% confidence)`,
            },
            {
              step: 4,
              name: "Crop Health Analysis",
              status: "completed",
              result: `Health Score: ${targetZone.healthScore}% | NDVI: ${targetZone.ndvi}`,
            },
            {
              step: 5,
              name: "Water-Stress Detection",
              status: "completed",
              result: `Stress Level: ${targetZone.waterStress} (Moisture: ${targetZone.soilMoisture}%)`,
            },
            {
              step: 6,
              name: "AI Decision",
              status: "completed",
              result: "Agronomic stress threshold evaluated",
            },
            {
              step: 7,
              name: "Irrigation Priority",
              status: "completed",
              result: `Priority: ${targetZone.irrigationPriority.toUpperCase()}`,
            },
            {
              step: 8,
              name: "Explainable Action",
              status: "completed",
              result: targetZone.recommendation,
            },
          ],
          intelligenceSummary: {
            detectedCrop: targetZone.crop,
            healthScore: targetZone.healthScore,
            waterStress: targetZone.waterStress,
            irrigationPriority: targetZone.irrigationPriority.toUpperCase(),
            confidence: 0.948,
            reasoning: `Zone ${targetZone.id} demonstrates ${targetZone.soilMoisture}% soil moisture with NDVI ${targetZone.ndvi}, indicating ${targetZone.waterStress.toLowerCase()} water stress requiring ${targetZone.irrigationPriority} priority irrigation.`,
            action: targetZone.recommendation,
          },
        };

        return new Response(JSON.stringify(result), {
          headers: { "content-type": "application/json" },
        });
      }

      const handler = await getServerEntry();
      const response = await handler.fetch(request, env, ctx);
      return await normalizeCatastrophicSsrResponse(response);
    } catch (error) {
      console.error(error);
      return new Response(renderErrorPage(), {
        status: 500,
        headers: { "content-type": "text/html; charset=utf-8" },
      });
    }
  },
};
