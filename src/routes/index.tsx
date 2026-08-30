import { createFileRoute } from "@tanstack/react-router";
import { Activity, AlertTriangle, Droplets, MapPinned, RefreshCw } from "lucide-react";
import { useState } from "react";
import { AppShell, Breadcrumb, PageHeading } from "@/components/layout/app-shell";
import { FarmZoneMap } from "@/components/dashboard/farm-zone-map";
import { RecommendationCard } from "@/components/dashboard/recommendation-card";
import { TrendChart } from "@/components/dashboard/trend-chart";
import { AlertPanel } from "@/components/shared/alert-list";
import { MetricCard } from "@/components/shared/metric-card";
import { ZoneDetailPanel } from "@/components/shared/zone-detail-panel";
import { defaultZone, getZone, recommendations, zones } from "@/data/mock-data";
import type { Zone } from "@/types/agriculture";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Dashboard — Ceres Intelligence" },
      { name: "description", content: "Monitor crop health, farm zones, water stress, and irrigation priorities." },
      { property: "og:title", content: "Dashboard — Ceres Intelligence" },
      { property: "og:description", content: "Monitor crop health, farm zones, water stress, and irrigation priorities." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: DashboardPage,
});

function DashboardPage() {
  const [selected, setSelected] = useState<Zone>(defaultZone);
  const [scheduled, setScheduled] = useState(false);

  return <AppShell title="Overview">
    <Breadcrumb label="Dashboard" />
    <PageHeading title="North Valley Sector" description="A current view of crop health and irrigation conditions across your monitored zones." action={<Button variant="outline" size="sm"><RefreshCw />Run analysis</Button>} />
    <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
      <MetricCard label="Overall health" value="84%" note="12 monitored zones" icon={Activity} tone="healthy" />
      <MetricCard label="Stressed zones" value="03" note="2 moderate · 1 high" icon={MapPinned} tone="attention" />
      <MetricCard label="Irrigation priority" value="01" note="Requires action" icon={Droplets} tone="urgent" />
      <MetricCard label="Active alerts" value="03" note="Last 24 hours" icon={AlertTriangle} tone="urgent" />
    </div>
    {scheduled ? <div role="status" className="mb-6 flex items-center justify-between gap-3 rounded-md border border-primary/20 bg-primary/10 px-4 py-3 text-sm text-primary"><span>Zone {selected.id} has been added to the next irrigation cycle.</span><Button variant="ghost" size="sm" onClick={() => setScheduled(false)}>Dismiss</Button></div> : null}
    <div className="grid items-start gap-6 xl:grid-cols-[minmax(0,1.7fr)_minmax(300px,0.8fr)]">
      <FarmZoneMap onSelect={setSelected} />
      <div className="space-y-6"><section className="panel rounded-lg p-5"><div className="mb-5 flex items-center justify-between"><div><h3 className="font-medium">Priority actions</h3><p className="mt-1 text-xs text-muted-foreground">Decisions needing attention</p></div><AlertTriangle className="size-4 text-chart-2" /></div>{recommendations.slice(0, 2).map((recommendation) => <RecommendationCard key={recommendation.id} recommendation={recommendation} onAction={() => { setSelected(getZone(recommendation.zone)); setScheduled(recommendation.priority === "high"); }} />)}</section><ZoneDetailPanel zone={selected} onAction={() => setScheduled(true)} /></div>
    </div>
    <div className="mt-6 grid gap-6 xl:grid-cols-[minmax(0,1.35fr)_minmax(320px,1fr)]"><section className="panel rounded-lg p-5"><div className="mb-4 flex items-center justify-between"><div><h3 className="font-medium">Crop health trend</h3><p className="mt-1 text-xs text-muted-foreground">Cumulative health index · last 30 days</p></div><span className="rounded bg-primary/10 px-2 py-1 text-[10px] font-medium uppercase tracking-wider text-primary">84% current</span></div><TrendChart /></section><AlertPanel /></div>
    <p className="mt-5 flex items-center gap-2 text-[11px] text-muted-foreground"><span className="status-dot bg-primary" />Last full analysis completed today at 09:42 AM</p>
  </AppShell>;
}
