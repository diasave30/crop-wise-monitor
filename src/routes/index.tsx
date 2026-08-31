import { createFileRoute } from "@tanstack/react-router";
import {
  Activity,
  AlertTriangle,
  CheckCircle2,
  Droplets,
  HelpCircle,
  MapPinned,
  RefreshCw,
  Sparkles,
} from "lucide-react";
import { useEffect, useState } from "react";
import { AppShell, Breadcrumb } from "@/components/layout/app-shell";
import { FarmZoneMap } from "@/components/dashboard/farm-zone-map";
import { TrendChart } from "@/components/dashboard/trend-chart";
import { AlertPanel } from "@/components/shared/alert-list";
import { MetricCard } from "@/components/shared/metric-card";
import { ZoneDetailPanel } from "@/components/shared/zone-detail-panel";
import { CropIntelligenceSummary } from "@/components/shared/crop-intelligence-summary";
import { IntelligencePipeline } from "@/components/dashboard/intelligence-pipeline";
import { api } from "@/services/api";
import type { DashboardData, Farm, Zone } from "@/types/agriculture";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Dashboard — CropWise AI Agriculture" },
      {
        name: "description",
        content:
          "Convert agricultural and environmental datasets into zone-level, explainable irrigation decisions.",
      },
      { property: "og:title", content: "Dashboard — CropWise AI Agriculture" },
      {
        property: "og:description",
        content:
          "Convert agricultural and environmental datasets into zone-level, explainable irrigation decisions.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: DashboardPage,
});

function DashboardPage() {
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(null);
  const [farms, setFarms] = useState<Farm[]>([]);
  const [selectedFarm, setSelectedFarm] = useState<Farm | null>(null);
  const [zones, setZones] = useState<Zone[]>([]);
  const [selectedZone, setSelectedZone] = useState<Zone | null>(null);
  const [scheduled, setScheduled] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisCompleted, setAnalysisCompleted] = useState(false);

  // Load dashboard data through the service layer
  useEffect(() => {
    let isMounted = true;
    async function loadData() {
      const [dash, allFarms, allZones] = await Promise.all([
        api.getDashboardData(),
        api.getFarms(),
        api.getZones(),
      ]);
      if (!isMounted) return;
      setDashboardData(dash);
      setFarms(allFarms);
      setSelectedFarm(allFarms[0] ?? null);
      setZones(allZones);
      // Select the stressed zone or first zone by default
      const defaultSelected = allZones.find((z) => z.id === "Z08") ?? allZones[0] ?? null;
      setSelectedZone(defaultSelected);
    }
    loadData();
    return () => {
      isMounted = false;
    };
  }, []);

  const handleRunAnalysis = async () => {
    setIsAnalyzing(true);
    if (selectedZone) {
      await api.runIntelligencePipeline(selectedZone.id);
    }
    setTimeout(() => {
      setIsAnalyzing(false);
      setAnalysisCompleted(true);
      setTimeout(() => setAnalysisCompleted(false), 6000);
    }, 800);
  };

  const currentFarm = selectedFarm ?? dashboardData?.farm;

  return (
    <AppShell
      title="Crop Intelligence Dashboard"
      eyebrow={currentFarm?.name ?? "Agricultural Intelligence"}
    >
      <Breadcrumb label="Dashboard" />

      {/* Farm Switcher & Actions Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="flex items-center gap-2">
            <span className="flex size-6 items-center justify-center rounded-md bg-primary/10 text-primary">
              <Sparkles className="size-3.5" />
            </span>
            <h1 className="text-xl font-semibold tracking-tight text-foreground">
              {currentFarm?.name ?? "Green Valley Farm"}
            </h1>
          </div>
          <p className="mt-1 text-xs text-muted-foreground">
            {currentFarm?.cropType ?? "Winter wheat"} ·{" "}
            {currentFarm?.location ?? "Davis, California"} · Real-time AI Decision Support
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {/* Farm Switcher using service data */}
          {farms.length > 0 ? (
            <div className="flex items-center gap-1 rounded-lg border border-border bg-muted/50 p-1">
              {farms.map((f) => (
                <Button
                  key={f.id}
                  variant={currentFarm?.id === f.id ? "default" : "ghost"}
                  size="sm"
                  className="h-7 px-2.5 text-xs"
                  onClick={() => {
                    setSelectedFarm(f);
                    const matchingZone =
                      zones.find((z) => f.zoneIds.includes(z.id)) ?? zones[0] ?? null;
                    if (matchingZone) setSelectedZone(matchingZone);
                  }}
                >
                  {f.name.split(" ")[0]}
                </Button>
              ))}
            </div>
          ) : null}

          <Button
            variant="outline"
            size="sm"
            onClick={handleRunAnalysis}
            disabled={isAnalyzing}
            className="h-8 gap-1.5"
          >
            <RefreshCw className={isAnalyzing ? "size-3.5 animate-spin" : "size-3.5"} />
            {isAnalyzing ? "Analyzing Field Datasets..." : "Run AI Pipeline"}
          </Button>
        </div>
      </div>

      {analysisCompleted ? (
        <div
          role="status"
          className="mt-4 flex items-center justify-between gap-3 rounded-md border border-primary/30 bg-primary/10 px-4 py-2.5 text-xs font-medium text-primary animate-in fade-in duration-200"
        >
          <div className="flex items-center gap-2">
            <CheckCircle2 className="size-4 shrink-0" />
            <span>
              AI Decision Pipeline synchronized. Multi-spectral layers and stress thresholds
              re-calibrated.
            </span>
          </div>
          <Button
            variant="ghost"
            size="sm"
            className="h-6 px-2 text-[11px]"
            onClick={() => setAnalysisCompleted(false)}
          >
            Dismiss
          </Button>
        </div>
      ) : null}

      {/* 4 Core Metrics: Overall Crop Health, Zones Under Stress, High-Priority Irrigation Zones, Active Alerts */}
      <div className="my-6 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <MetricCard
          label="Overall Crop Health"
          value={dashboardData ? `${dashboardData.overallHealth}%` : "84%"}
          note={`${dashboardData?.totalZones ?? 12} monitored zones`}
          icon={Activity}
          tone="healthy"
        />
        <MetricCard
          label="Zones Under Stress"
          value={dashboardData ? `0${dashboardData.zonesUnderStress}` : "03"}
          note="Soil moisture deficit detected"
          icon={MapPinned}
          tone="attention"
        />
        <MetricCard
          label="High-Priority Irrigation"
          value={dashboardData ? `0${dashboardData.highPriorityIrrigationZones}` : "01"}
          note="Zone Z08 requires urgent cycle"
          icon={Droplets}
          tone="urgent"
        />
        <MetricCard
          label="Active Alerts"
          value={dashboardData ? `0${dashboardData.activeAlertsCount}` : "03"}
          note="Actionable operational alerts"
          icon={AlertTriangle}
          tone="urgent"
        />
      </div>

      {/* Primary CropIntelligenceSummary Section */}
      {dashboardData ? (
        <div className="panel mb-6 rounded-lg p-5">
          <div className="mb-4 flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-2">
              <span className="flex size-6 items-center justify-center rounded-md bg-emerald-700 text-white font-bold text-xs shadow-xs">
                AI
              </span>
              <h2 className="text-sm font-semibold text-foreground">
                Primary Field Crop Intelligence Summary
              </h2>
            </div>
            <span className="text-[11px] font-mono text-muted-foreground">
              Evaluated via Sentinel-2 L2A + IoT In-situ Probes
            </span>
          </div>

          <CropIntelligenceSummary
            data={dashboardData.primarySummary}
            showDetails={true}
            className="border-none bg-transparent p-0 shadow-none"
          />
        </div>
      ) : null}

      {scheduled ? (
        <div
          role="status"
          className="mb-6 flex items-center justify-between rounded-md border border-primary/20 bg-primary/10 px-4 py-3 text-xs font-medium text-primary"
        >
          <span>Zone {selectedZone?.id} has been added to the automated irrigation queue.</span>
          <Button variant="ghost" size="sm" onClick={() => setScheduled(false)}>
            Dismiss
          </Button>
        </div>
      ) : null}

      {/* Main Interactive Grid: Farm Zone Map + Selected Zone Details */}
      <div className="grid items-start gap-6 xl:grid-cols-[minmax(0,1.65fr)_minmax(320px,0.85fr)]">
        <FarmZoneMap
          zones={zones}
          selectedId={selectedZone?.id}
          onSelect={(zone) => setSelectedZone(zone)}
        />
        {selectedZone ? (
          <ZoneDetailPanel zone={selectedZone} onAction={() => setScheduled(true)} />
        ) : null}
      </div>

      {/* 8-Stage Explainable Decision Pipeline */}
      {selectedZone ? (
        <div className="mt-6">
          <IntelligencePipeline zone={selectedZone} />
        </div>
      ) : null}

      {/* Trend & Actionable Alerts Row */}
      <div className="mt-6 grid gap-6 xl:grid-cols-[minmax(0,1.35fr)_minmax(320px,1fr)]">
        <section className="panel rounded-lg p-5">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <h3 className="font-medium">Farm-wide crop health index</h3>
              <p className="mt-1 text-xs text-muted-foreground">
                30-day cumulative vegetation index across 12 sectors
              </p>
            </div>
            <span className="rounded bg-primary/10 px-2 py-1 text-[10px] font-semibold uppercase tracking-wider text-primary">
              {dashboardData?.overallHealth ?? 84}% Current
            </span>
          </div>
          <TrendChart data={dashboardData?.healthTrend} />
        </section>
        <AlertPanel alerts={dashboardData?.recentAlerts} />
      </div>

      {/* Architecture and Health Telemetry */}
      <div className="mt-6 flex flex-wrap items-center justify-between gap-4 border-t border-border/80 pt-4 text-[11px] text-muted-foreground">
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1.5">
            <span className="status-dot bg-primary" />
            Node.js Backend: Active (/api/health)
          </span>
          <span className="hidden sm:inline text-border">•</span>
          <span className="flex items-center gap-1.5">
            <span className="status-dot bg-primary" />
            FastAPI AI Service: Active (/health)
          </span>
        </div>
        <span>Data layer connected via Service Layer (src/services/api.ts)</span>
      </div>
    </AppShell>
  );
}
