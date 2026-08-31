import { createFileRoute } from "@tanstack/react-router";
import { AlertCircle, AlertTriangle, CheckCircle2, Filter, Sparkles } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { AppShell, Breadcrumb, PageHeading } from "@/components/layout/app-shell";
import { Button } from "@/components/ui/button";
import { api } from "@/services/api";
import type { Alert } from "@/types/agriculture";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/alerts")({
  head: () => ({
    meta: [
      { title: "Actionable Alerts — CropWise AI" },
      {
        name: "description",
        content: "Review, filter, and resolve operational field alerts and agronomic anomalies.",
      },
      { property: "og:title", content: "Actionable Alerts — CropWise AI" },
      {
        property: "og:description",
        content: "Review, filter, and resolve operational field alerts and agronomic anomalies.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: AlertsPage,
});

function AlertsPage() {
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [filter, setFilter] = useState<"All" | Alert["severity"]>("All");
  const [resolvedIds, setResolvedIds] = useState<string[]>([]);

  useEffect(() => {
    let isMounted = true;
    api.getAlerts().then((data) => {
      if (isMounted) setAlerts(data);
    });
    return () => {
      isMounted = false;
    };
  }, []);

  const toggleResolved = (id: string) => {
    setResolvedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id],
    );
  };

  const filtered = useMemo(() => {
    if (filter === "All") return alerts;
    return alerts.filter((alert) => alert.severity === filter);
  }, [alerts, filter]);

  const highCount = alerts.filter((a) => a.severity === "High").length;
  const mediumCount = alerts.filter((a) => a.severity === "Medium").length;
  const resolvedCount = alerts.filter((a) => a.severity === "Resolved").length;

  return (
    <AppShell title="Actionable Alerts">
      <Breadcrumb label="Alerts" />
      <PageHeading
        title="Field & Sensor Operational Alerts"
        description="Prioritized, actionable agricultural alerts triggered by Sentinel-2 multi-spectral anomalies and in-situ IoT moisture sensor thresholds."
      />

      {/* Summary Chips */}
      <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div className="flex items-center justify-between rounded-lg border border-destructive/30 bg-destructive/5 p-4">
          <div className="flex items-center gap-3">
            <span className="flex size-9 items-center justify-center rounded-lg bg-destructive/15 text-destructive font-bold">
              🚨
            </span>
            <div>
              <p className="text-xs text-muted-foreground">Critical Stress</p>
              <p className="text-lg font-bold text-destructive">{highCount} Urgent</p>
            </div>
          </div>
          <span className="text-[11px] font-mono text-muted-foreground">Zone Z08</span>
        </div>

        <div className="flex items-center justify-between rounded-lg border border-chart-2/30 bg-chart-2/5 p-4">
          <div className="flex items-center gap-3">
            <span className="flex size-9 items-center justify-center rounded-lg bg-chart-2/15 text-chart-2 font-bold">
              ⚠️
            </span>
            <div>
              <p className="text-xs text-muted-foreground">Moderate Watch</p>
              <p className="text-lg font-bold text-chart-2">{mediumCount} Monitoring</p>
            </div>
          </div>
          <span className="text-[11px] font-mono text-muted-foreground">Z03, Z11</span>
        </div>

        <div className="flex items-center justify-between rounded-lg border border-primary/30 bg-primary/5 p-4">
          <div className="flex items-center gap-3">
            <span className="flex size-9 items-center justify-center rounded-lg bg-primary/15 text-primary font-bold">
              ✓
            </span>
            <div>
              <p className="text-xs text-muted-foreground">Resolved Events</p>
              <p className="text-lg font-bold text-primary">
                {resolvedCount + resolvedIds.length} Verified
              </p>
            </div>
          </div>
          <span className="text-[11px] font-mono text-muted-foreground">Auto-closed</span>
        </div>
      </div>

      {/* Alert Register Panel */}
      <div className="panel overflow-hidden rounded-lg">
        <div className="flex flex-col gap-3 border-b border-border px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h3 className="font-medium text-foreground">Actionable Alert Register</h3>
            <p className="mt-1 text-xs text-muted-foreground">
              Showing {filtered.length} of {alerts.length} registered field events
            </p>
          </div>
          <div className="flex flex-wrap gap-1 rounded-md bg-muted/60 p-1">
            {(["All", "High", "Medium", "Resolved"] as const).map((item) => (
              <Button
                key={item}
                variant={filter === item ? "default" : "ghost"}
                size="sm"
                className="h-7 px-3 text-xs"
                onClick={() => setFilter(item)}
              >
                {item}
              </Button>
            ))}
          </div>
        </div>

        <div className="divide-y divide-border">
          {filtered.map((alert) => {
            const isResolved = alert.severity === "Resolved" || resolvedIds.includes(alert.id);
            return (
              <div
                key={alert.id}
                className={cn(
                  "flex flex-col gap-4 px-5 py-4 transition-colors sm:flex-row sm:items-center sm:justify-between",
                  isResolved && "bg-muted/15 opacity-75",
                )}
              >
                <div className="flex items-start gap-3 min-w-0">
                  <span
                    className={cn(
                      "mt-1 size-2.5 shrink-0 rounded-full",
                      alert.severity === "High" && !isResolved
                        ? "bg-destructive ring-4 ring-destructive/20 animate-pulse"
                        : alert.severity === "Medium" && !isResolved
                          ? "bg-chart-2"
                          : "bg-primary",
                    )}
                  />
                  <div className="min-w-0 space-y-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <p className="text-sm font-semibold text-foreground">{alert.title}</p>
                      <span className="font-mono text-xs font-bold text-muted-foreground">
                        Zone {alert.zone}
                      </span>
                      <span
                        className={cn(
                          "rounded px-2 py-0.5 text-[10px] font-bold uppercase",
                          alert.severity === "High" &&
                            !isResolved &&
                            "bg-destructive/10 text-destructive border border-destructive/20",
                          alert.severity === "Medium" &&
                            !isResolved &&
                            "bg-chart-2/15 text-chart-2 border border-chart-2/30",
                          isResolved && "bg-primary/10 text-primary border border-primary/20",
                        )}
                      >
                        {isResolved ? "Resolved" : alert.severity}
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground">{alert.reason}</p>
                    {alert.suggestedMitigation ? (
                      <p className="text-xs font-medium text-foreground/90">
                        ⚡ Recommended Mitigation: {alert.suggestedMitigation}
                      </p>
                    ) : null}
                  </div>
                </div>

                <div className="flex items-center justify-between gap-3 sm:justify-end shrink-0">
                  <span className="font-mono text-xs text-muted-foreground">{alert.timestamp}</span>
                  <Button
                    variant={isResolved ? "outline" : "secondary"}
                    size="sm"
                    className="h-8 text-xs gap-1.5"
                    onClick={() => toggleResolved(alert.id)}
                  >
                    {isResolved ? (
                      <>
                        <CheckCircle2 className="size-3.5 text-primary" /> Resolved
                      </>
                    ) : (
                      "Mark as Addressed"
                    )}
                  </Button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </AppShell>
  );
}
