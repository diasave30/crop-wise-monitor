import { Link, createFileRoute } from "@tanstack/react-router";
import { ArrowUpRight, MapPin, Sparkles } from "lucide-react";
import { useEffect, useState } from "react";
import { AppShell, Breadcrumb, PageHeading } from "@/components/layout/app-shell";
import { StatusBadge } from "@/components/shared/status";
import { api } from "@/services/api";
import type { Farm } from "@/types/agriculture";

export const Route = createFileRoute("/farms")({
  head: () => ({
    meta: [
      { title: "Farms — CropWise AI" },
      { name: "description", content: "Monitor field health across every farm and zone network." },
      { property: "og:title", content: "Farms — CropWise AI" },
      {
        property: "og:description",
        content: "Monitor field health across every farm and zone network.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: FarmsPage,
});

function FarmsPage() {
  const [farms, setFarms] = useState<Farm[]>([]);

  useEffect(() => {
    let isMounted = true;
    api.getFarms().then((data) => {
      if (isMounted) setFarms(data);
    });
    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <AppShell title="Farms Directory">
      <Breadcrumb label="Farms" />
      <PageHeading
        title="Monitored Farms & Estates"
        description="Comprehensive field coverage, crop classifications, and real-time health distributions across all enterprise agricultural assets."
      />
      <div className="panel overflow-hidden rounded-lg">
        <div className="grid grid-cols-[minmax(0,1fr)_auto_auto] gap-4 border-b border-border bg-muted/45 px-5 py-3 text-[10px] font-medium uppercase tracking-[0.14em] text-muted-foreground">
          <span>Farm & Location</span>
          <span className="hidden sm:block">Coverage & Stress</span>
          <span>Health Index</span>
        </div>
        <div className="divide-y divide-border">
          {farms.map((farm) => (
            <Link
              key={farm.id}
              to="/farms/$farmId"
              params={{ farmId: farm.id }}
              className="grid grid-cols-[minmax(0,1fr)_auto_auto] items-center gap-4 px-5 py-5 transition-colors hover:bg-muted/35"
            >
              <div className="flex min-w-0 items-center gap-3">
                <span className="grid size-10 shrink-0 place-items-center rounded-lg bg-primary/10 text-primary">
                  <MapPin className="size-5" />
                </span>
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <p className="truncate text-sm font-semibold text-foreground">{farm.name}</p>
                    <span className="rounded bg-muted px-1.5 py-0.5 text-[10px] font-medium text-muted-foreground">
                      {farm.cropType}
                    </span>
                  </div>
                  <p className="mt-1 truncate text-xs text-muted-foreground">
                    {farm.location} · Analyzed {farm.lastAnalysis}
                  </p>
                </div>
              </div>

              <div className="hidden text-right sm:block">
                <p className="text-sm font-medium">{farm.zones} zones monitored</p>
                <p className="mt-1 text-xs text-muted-foreground">
                  {farm.attentionZones > 0 ? (
                    <span className="text-destructive font-medium">
                      {farm.attentionZones} zones need attention
                    </span>
                  ) : (
                    <span className="text-primary font-medium">All zones optimal</span>
                  )}
                </p>
              </div>

              <div className="flex items-center gap-3">
                <div className="text-right">
                  <span className="font-mono text-sm font-bold">{farm.overallHealth}%</span>
                </div>
                <StatusBadge status={farm.overallHealth >= 85 ? "healthy" : "moderate"} />
                <ArrowUpRight className="size-4 text-muted-foreground" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </AppShell>
  );
}
