import { createFileRoute } from "@tanstack/react-router";
import { Check, Droplets, Filter, Flame, Gauge, Leaf, Sparkles } from "lucide-react";
import { useEffect, useState } from "react";
import { AppShell, Breadcrumb, PageHeading } from "@/components/layout/app-shell";
import { RecommendationCard } from "@/components/dashboard/recommendation-card";
import { CropIntelligenceSummary } from "@/components/shared/crop-intelligence-summary";
import { api } from "@/services/api";
import type { Recommendation, Zone } from "@/types/agriculture";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/irrigation")({
  head: () => ({
    meta: [
      { title: "Irrigation Recommendations — CropWise AI" },
      {
        name: "description",
        content:
          "Ranked high, medium, and low priority zone irrigation decisions with explainable reasoning.",
      },
      { property: "og:title", content: "Irrigation Recommendations — CropWise AI" },
      {
        property: "og:description",
        content:
          "Ranked high, medium, and low priority zone irrigation decisions with explainable reasoning.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: IrrigationPage,
});

function IrrigationPage() {
  const [recommendations, setRecommendations] = useState<Recommendation[]>([]);
  const [targetZone, setTargetZone] = useState<Zone | null>(null);
  const [completed, setCompleted] = useState<string[]>([]);
  const [activeFilter, setActiveFilter] = useState<"all" | "high" | "medium" | "low">("all");

  useEffect(() => {
    let isMounted = true;
    async function loadData() {
      const [recs, zone] = await Promise.all([
        api.getRecommendations(),
        api.getZoneAnalysis("Z08"),
      ]);
      if (!isMounted) return;
      setRecommendations(recs);
      setTargetZone(zone);
    }
    loadData();
    return () => {
      isMounted = false;
    };
  }, []);

  const high = recommendations.filter((item) => item.priority === "high");
  const medium = recommendations.filter((item) => item.priority === "medium");
  const low = recommendations.filter((item) => item.priority === "low");

  const finish = (item: Recommendation) =>
    setCompleted((current) => (current.includes(item.id) ? current : [...current, item.id]));

  return (
    <AppShell title="Irrigation Decisions">
      <Breadcrumb label="Irrigation" />
      <PageHeading
        title="Ranked Irrigation Recommendations"
        description="Zone-level prescriptive irrigation schedules calculated from soil moisture thresholds, NDVI vegetation vigor, and daily ET0 evapotranspiration rates."
        action={
          <div className="flex items-center gap-2">
            <span className="flex items-center gap-1.5 rounded-md border border-border bg-card px-2.5 py-1 text-xs font-mono text-muted-foreground">
              <Gauge className="size-3.5 text-primary" /> ET0: 4.8 mm/day avg
            </span>
          </div>
        }
      />

      {/* Top Urgent Intelligence Highlight */}
      {targetZone ? (
        <div className="panel mb-6 rounded-lg p-5">
          <div className="mb-4 flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-2">
              <span className="flex size-6 items-center justify-center rounded-md bg-rose-600 text-white text-xs font-bold shadow-xs">
                🚨
              </span>
              <h2 className="text-sm font-bold text-foreground">
                Urgent Irrigation Target: Zone {targetZone.id} ({targetZone.name})
              </h2>
            </div>
            <span className="text-[11px] font-mono text-rose-700 dark:text-rose-400 font-semibold uppercase tracking-wider">
              Immediate Action Required
            </span>
          </div>
          <CropIntelligenceSummary
            data={{
              detectedCrop: targetZone.crop,
              healthScore: targetZone.healthScore,
              waterStress: targetZone.waterStress,
              irrigationPriority: targetZone.irrigationPriority,
              confidence: 0.948,
              reasoning:
                "Soil moisture depleted to 16% (critical limit: 35%). Immediate 90-minute pulsed drip cycle required to prevent permanent wilting point.",
              actionWhy: targetZone.recommendation,
            }}
            showDetails={true}
            className="border-none bg-transparent p-0 shadow-none"
          />
        </div>
      ) : null}

      {/* Filter Tabs */}
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3 border-b border-border pb-4">
        <div className="flex items-center gap-2">
          <Filter className="size-4 text-muted-foreground" />
          <span className="text-xs font-medium text-foreground">Filter by Priority:</span>
        </div>
        <div className="flex items-center gap-1.5 rounded-lg border border-border bg-muted/40 p-1">
          <Button
            variant={activeFilter === "all" ? "default" : "ghost"}
            size="sm"
            className="h-7 px-3 text-xs"
            onClick={() => setActiveFilter("all")}
          >
            All Ranked ({recommendations.length})
          </Button>
          <Button
            variant={activeFilter === "high" ? "default" : "ghost"}
            size="sm"
            className="h-7 px-2.5 text-xs text-destructive hover:text-destructive"
            onClick={() => setActiveFilter("high")}
          >
            🚨 High Priority ({high.length})
          </Button>
          <Button
            variant={activeFilter === "medium" ? "default" : "ghost"}
            size="sm"
            className="h-7 px-2.5 text-xs text-chart-2 hover:text-chart-2"
            onClick={() => setActiveFilter("medium")}
          >
            💧 Medium Priority ({medium.length})
          </Button>
          <Button
            variant={activeFilter === "low" ? "default" : "ghost"}
            size="sm"
            className="h-7 px-2.5 text-xs text-primary hover:text-primary"
            onClick={() => setActiveFilter("low")}
          >
            🌿 Low Priority ({low.length})
          </Button>
        </div>
      </div>

      <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_minmax(320px,0.75fr)]">
        {/* Ranked Recommendations Sections */}
        <div className="space-y-6">
          {/* 1. 🚨 High Priority */}
          {(activeFilter === "all" || activeFilter === "high") && high.length > 0 ? (
            <section className="panel rounded-lg p-5">
              <div className="mb-4 flex items-center justify-between border-b border-border/80 pb-3">
                <div className="flex items-center gap-2">
                  <span className="text-base">🚨</span>
                  <h3 className="font-semibold text-foreground">High Priority Actions</h3>
                </div>
                <span className="rounded-full bg-destructive/10 px-2 py-0.5 text-xs font-bold text-destructive">
                  {high.length} Zones
                </span>
              </div>
              <div className="grid gap-4">
                {high.map((item) => (
                  <RecommendationCard
                    key={item.id}
                    recommendation={item}
                    isCompleted={completed.includes(item.id)}
                    onAction={() => finish(item)}
                  />
                ))}
              </div>
            </section>
          ) : null}

          {/* 2. 💧 Medium Priority */}
          {(activeFilter === "all" || activeFilter === "medium") && medium.length > 0 ? (
            <section className="panel rounded-lg p-5">
              <div className="mb-4 flex items-center justify-between border-b border-border/80 pb-3">
                <div className="flex items-center gap-2">
                  <span className="text-base">💧</span>
                  <h3 className="font-semibold text-foreground">Medium Priority Adjustments</h3>
                </div>
                <span className="rounded-full bg-chart-2/15 px-2 py-0.5 text-xs font-bold text-chart-2">
                  {medium.length} Zones
                </span>
              </div>
              <div className="grid gap-4">
                {medium.map((item) => (
                  <RecommendationCard
                    key={item.id}
                    recommendation={item}
                    isCompleted={completed.includes(item.id)}
                    onAction={() => finish(item)}
                  />
                ))}
              </div>
            </section>
          ) : null}

          {/* 3. 🌿 Low Priority */}
          {(activeFilter === "all" || activeFilter === "low") && low.length > 0 ? (
            <section className="panel rounded-lg p-5">
              <div className="mb-4 flex items-center justify-between border-b border-border/80 pb-3">
                <div className="flex items-center gap-2">
                  <span className="text-base">🌿</span>
                  <h3 className="font-semibold text-foreground">Low Priority (Baseline Stable)</h3>
                </div>
                <span className="rounded-full bg-primary/10 px-2 py-0.5 text-xs font-bold text-primary">
                  {low.length} Zones
                </span>
              </div>
              <div className="grid gap-4">
                {low.map((item) => (
                  <RecommendationCard
                    key={item.id}
                    recommendation={item}
                    isCompleted={completed.includes(item.id)}
                    onAction={() => finish(item)}
                  />
                ))}
              </div>
            </section>
          ) : null}
        </div>

        {/* Priority Summary & Scheduling Sidebar */}
        <div className="space-y-6">
          <section className="panel rounded-lg p-5">
            <div className="mb-4">
              <h3 className="font-medium">Priority Distribution</h3>
              <p className="mt-1 text-xs text-muted-foreground">Current dispatch ranking summary</p>
            </div>
            <div className="space-y-3">
              <PriorityRow
                label="🚨 High Priority"
                value={`${high.length} zone`}
                detail="Immediate dispatch (< 2h)"
                barColor="bg-destructive"
                percentage={20}
              />
              <PriorityRow
                label="💧 Medium Priority"
                value={`${medium.length} zones`}
                detail="Next 24h window"
                barColor="bg-chart-2"
                percentage={40}
              />
              <PriorityRow
                label="🌿 Low Priority"
                value={`${low.length} zones`}
                detail="Maintain baseline cycle"
                barColor="bg-primary"
                percentage={40}
              />
            </div>
          </section>

          <section className="panel rounded-lg p-5">
            <h3 className="font-medium">Dispatch Operations</h3>
            <p className="mt-1 text-xs text-muted-foreground">
              {completed.length} of {recommendations.length} recommendations applied
            </p>
            <div className="mt-4 flex items-center gap-2 text-xs text-muted-foreground">
              <span className="status-dot bg-primary" />
              <span>Automated telemetry updates every 15 min</span>
            </div>
          </section>
        </div>
      </div>
    </AppShell>
  );
}

function PriorityRow({
  label,
  value,
  detail,
  barColor,
  percentage,
}: {
  label: string;
  value: string;
  detail: string;
  barColor: string;
  percentage: number;
}) {
  return (
    <div className="rounded-md border border-border/80 bg-muted/20 p-3">
      <div className="flex items-center justify-between text-xs">
        <span className="font-semibold text-foreground">{label}</span>
        <span className="font-mono font-medium text-foreground">{value}</span>
      </div>
      <p className="mt-0.5 text-[11px] text-muted-foreground">{detail}</p>
      <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-muted">
        <div className={`h-full ${barColor}`} style={{ width: `${percentage}%` }} />
      </div>
    </div>
  );
}
