import { createFileRoute } from "@tanstack/react-router";
import { Activity, ArrowDownRight, ArrowUpRight, Sparkles } from "lucide-react";
import { useEffect, useState } from "react";
import { AppShell, Breadcrumb, PageHeading } from "@/components/layout/app-shell";
import { TrendChart } from "@/components/dashboard/trend-chart";
import { MetricCard } from "@/components/shared/metric-card";
import { ZoneTable } from "@/components/shared/zone-table";
import { CropIntelligenceSummary } from "@/components/shared/crop-intelligence-summary";
import { api } from "@/services/api";
import type { DashboardData, Zone } from "@/types/agriculture";

export const Route = createFileRoute("/crop-health")({
  head: () => ({
    meta: [
      { title: "Crop Health — CropWise AI" },
      {
        name: "description",
        content: "Understand crop health trends and identify declining zones with explainable AI.",
      },
      { property: "og:title", content: "Crop Health — CropWise AI" },
      {
        property: "og:description",
        content: "Understand crop health trends and identify declining zones with explainable AI.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: CropHealthPage,
});

function CropHealthPage() {
  const [zones, setZones] = useState<Zone[]>([]);
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(null);

  useEffect(() => {
    let isMounted = true;
    async function load() {
      const [allZones, dash] = await Promise.all([api.getZones(), api.getDashboardData()]);
      if (!isMounted) return;
      setZones(allZones);
      setDashboardData(dash);
    }
    load();
    return () => {
      isMounted = false;
    };
  }, []);

  const attention = zones.filter((zone) => zone.status !== "healthy");
  const healthyCount = zones.filter((zone) => zone.status === "healthy").length;
  const moderateCount = zones.filter((zone) => zone.status === "moderate").length;
  const stressCount = zones.filter((zone) => zone.status === "stress").length;

  return (
    <AppShell title="Crop Health Intelligence">
      <Breadcrumb label="Crop health" />
      <PageHeading
        title="Field-wide Crop Health Intelligence"
        description="Track the vegetation health index (NDVI) over time and focus agronomic attention where field conditions are declining."
      />
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <MetricCard
          label="Overall Vitality Score"
          value={dashboardData ? `${dashboardData.overallHealth}%` : "84%"}
          note="Across all 12 zones"
          icon={Activity}
          tone="healthy"
        />
        <MetricCard
          label="7-day Movement"
          value="+2.4%"
          note="Compared with prior week"
          icon={ArrowUpRight}
          tone="healthy"
        />
        <MetricCard
          label="Zones Requiring Attention"
          value={attention.length > 0 ? `0${attention.length}` : "03"}
          note="Requires review"
          icon={ArrowDownRight}
          tone="attention"
        />
      </div>

      {/* Intelligence Summary Banner */}
      <div className="mt-6">
        <CropIntelligenceSummary
          data={{
            detectedCrop: "Winter wheat",
            healthScore: dashboardData?.overallHealth ?? 84,
            waterStress: "Low",
            irrigationPriority: "low",
            confidence: 0.96,
            reasoning:
              "Field-wide canopy analysis reveals healthy vegetative density across 9 of 12 sectors with isolated stress localized to West Zone Z08.",
            actionWhy:
              "Maintain baseline schedule for 75% of field; prioritize focused irrigation in West Sector.",
          }}
          showDetails={true}
        />
      </div>

      <div className="mt-6 grid gap-6 xl:grid-cols-[minmax(0,1.25fr)_minmax(300px,0.75fr)]">
        <section className="panel rounded-lg p-5">
          <div className="mb-5">
            <h3 className="font-medium">Health trend</h3>
            <p className="mt-1 text-xs text-muted-foreground">
              Cumulative health index · last 30 days
            </p>
          </div>
          <TrendChart data={dashboardData?.healthTrend} />
        </section>

        <section className="panel rounded-lg p-5">
          <h3 className="font-medium">Health distribution</h3>
          <p className="mt-1 text-xs text-muted-foreground">
            Current status across {zones.length || 12} monitored zones
          </p>
          <div className="mt-8 space-y-5">
            <HealthBar
              label="Healthy"
              count={healthyCount}
              total={zones.length || 12}
              color="bg-emerald-500"
            />
            <HealthBar
              label="Moderate"
              count={moderateCount}
              total={zones.length || 12}
              color="bg-amber-500"
            />
            <HealthBar
              label="High stress"
              count={stressCount}
              total={zones.length || 12}
              color="bg-rose-500"
            />
          </div>
          <div className="mt-8 border-t border-border pt-4 text-xs text-muted-foreground">
            Most recent change: Z08 declined 14% over the last 48 hours due to soil moisture
            depletion.
          </div>
        </section>
      </div>

      <section className="panel mt-6 overflow-hidden rounded-lg">
        <div className="border-b border-border px-5 py-4">
          <h3 className="font-medium">Zones requiring attention</h3>
          <p className="mt-1 text-xs text-muted-foreground">
            Prioritized by health score and recent sensor deficit movement.
          </p>
        </div>
        <ZoneTable zones={attention} />
      </section>
    </AppShell>
  );
}

function HealthBar({
  label,
  count,
  total,
  color,
}: {
  label: string;
  count: number;
  total: number;
  color: string;
}) {
  return (
    <div>
      <div className="mb-2 flex justify-between text-xs">
        <span>{label}</span>
        <span className="font-medium">{count} zones</span>
      </div>
      <div className="h-2 rounded-full bg-muted">
        <div
          className={`h-full rounded-full ${color}`}
          style={{ width: `${(count / (total || 1)) * 100}%` }}
        />
      </div>
    </div>
  );
}
