import { Link, createFileRoute } from "@tanstack/react-router";
import { ArrowLeft, MapPin, Sparkles, Sprout } from "lucide-react";
import { useEffect, useState } from "react";
import { AppShell, Breadcrumb, PageHeading } from "@/components/layout/app-shell";
import { FarmZoneMap } from "@/components/dashboard/farm-zone-map";
import { ZoneDetailPanel } from "@/components/shared/zone-detail-panel";
import { ZoneTable } from "@/components/shared/zone-table";
import { IntelligencePipeline } from "@/components/dashboard/intelligence-pipeline";
import { api } from "@/services/api";
import type { Farm, Zone } from "@/types/agriculture";

export const Route = createFileRoute("/farms/$farmId")({
  head: ({ params }) => ({
    meta: [
      { title: `Farm Analysis — CropWise AI` },
      {
        name: "description",
        content: `Detailed zone-level NDVI, soil moisture, and health distribution for ${params.farmId}.`,
      },
      { property: "og:title", content: `Farm Analysis — CropWise AI` },
      {
        property: "og:description",
        content: `Detailed zone-level NDVI, soil moisture, and health distribution for ${params.farmId}.`,
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: FarmDetailPage,
});

function FarmDetailPage() {
  const { farmId } = Route.useParams();
  const [farm, setFarm] = useState<Farm | null>(null);
  const [zones, setZones] = useState<Zone[]>([]);
  const [selectedZone, setSelectedZone] = useState<Zone | null>(null);
  const [scheduled, setScheduled] = useState(false);

  useEffect(() => {
    let isMounted = true;
    async function loadFarmData() {
      const [f, allZones] = await Promise.all([api.getFarmById(farmId), api.getZones(farmId)]);
      if (!isMounted) return;
      setFarm(f);
      setZones(allZones);
      const initialZone = allZones.find((z) => z.id === "Z08") ?? allZones[0] ?? null;
      setSelectedZone(initialZone);
    }
    loadFarmData();
    return () => {
      isMounted = false;
    };
  }, [farmId]);

  return (
    <AppShell title={farm?.name ?? "Farm Analysis"} eyebrow={farm?.cropType ?? "Crop Intelligence"}>
      <Breadcrumb label="Farm analysis" />

      {/* Screen 2: Farm Analysis Header */}
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="flex items-center gap-2">
            <span className="flex size-7 items-center justify-center rounded-lg bg-primary/10 text-primary">
              <Sprout className="size-4" />
            </span>
            <h1 className="text-xl font-bold tracking-tight text-foreground">
              {farm?.name ?? "Green Valley Farm"}
            </h1>
          </div>
          <div className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-muted-foreground">
            <span className="flex items-center gap-1 font-medium text-foreground">
              🌾 Crop Type: <span className="text-primary">{farm?.cropType ?? "Winter wheat"}</span>
            </span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <MapPin className="size-3" /> {farm?.location ?? "Davis, California"}
            </span>
            <span>•</span>
            <span>{farm?.zones ?? 12} Monitored Zones</span>
            <span>•</span>
            <span>Overall Vitality: {farm?.overallHealth ?? 84}%</span>
          </div>
        </div>

        <Link
          to="/farms"
          className="inline-flex h-8 items-center gap-1.5 rounded-md border border-border bg-card px-3 text-xs font-medium text-muted-foreground hover:bg-muted hover:text-foreground"
        >
          <ArrowLeft className="size-3.5" /> Back to farms
        </Link>
      </div>

      {scheduled ? (
        <div
          role="status"
          className="mb-6 flex items-center justify-between rounded-md border border-primary/20 bg-primary/10 px-4 py-3 text-xs font-medium text-primary"
        >
          <span>Zone {selectedZone?.id} scheduled for automated irrigation dispatch.</span>
          <button type="button" className="text-xs underline" onClick={() => setScheduled(false)}>
            Dismiss
          </button>
        </div>
      ) : null}

      {/* Interactive Zone Visualization (Main Feature) + Zone Details */}
      <div className="grid gap-6 xl:grid-cols-[minmax(0,1.65fr)_minmax(320px,0.85fr)]">
        <FarmZoneMap
          zones={zones}
          selectedId={selectedZone?.id}
          onSelect={(zone) => setSelectedZone(zone)}
        />
        {selectedZone ? (
          <ZoneDetailPanel zone={selectedZone} onAction={() => setScheduled(true)} />
        ) : null}
      </div>

      {/* 8-Step Explainable Decision Pipeline */}
      {selectedZone ? (
        <div className="mt-6">
          <IntelligencePipeline zone={selectedZone} />
        </div>
      ) : null}

      {/* Zone Data Table */}
      <section className="panel mt-6 overflow-hidden rounded-lg">
        <div className="border-b border-border px-5 py-4">
          <h3 className="font-medium">Zone Analysis & Health Matrix</h3>
          <p className="mt-1 text-xs text-muted-foreground">
            Individual sensor readings, NDVI indices, and automated irrigation priority scores
          </p>
        </div>
        <ZoneTable zones={zones} />
      </section>
    </AppShell>
  );
}
