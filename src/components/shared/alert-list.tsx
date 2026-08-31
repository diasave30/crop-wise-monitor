import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { ChevronRight } from "lucide-react";
import { api } from "@/services/api";
import type { Alert } from "@/types/agriculture";
import { cn } from "@/lib/utils";

const severityClass: Record<Alert["severity"], string> = {
  High: "bg-rose-600 dark:bg-rose-400",
  Medium: "bg-amber-500 dark:bg-amber-400",
  Resolved: "bg-emerald-600 dark:bg-emerald-400",
};

export function AlertList({ limit, items }: { limit?: number; items?: Alert[] }) {
  const [alerts, setAlerts] = useState<Alert[]>(items ?? []);

  useEffect(() => {
    if (items) {
      setAlerts(items);
    } else {
      api.getAlerts().then(setAlerts);
    }
  }, [items]);

  const visible = limit ? alerts.slice(0, limit) : alerts;

  return (
    <div className="divide-y divide-border">
      {visible.map((alert) => (
        <div
          key={alert.id}
          className="flex items-start gap-3 px-5 py-4 transition-colors hover:bg-muted/20"
        >
          <span className={cn("status-dot mt-1.5", severityClass[alert.severity])} />
          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
              <p className="text-sm font-medium">{alert.title}</p>
              <span className="font-mono text-[10px] font-semibold text-muted-foreground">
                Zone {alert.zone}
              </span>
              <span
                className={cn(
                  "rounded px-2 py-0.5 text-[9px] font-bold uppercase",
                  alert.severity === "High" &&
                    "border border-rose-500/30 bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300",
                  alert.severity === "Medium" &&
                    "border border-amber-500/30 bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300",
                  alert.severity === "Resolved" &&
                    "border border-emerald-500/30 bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300",
                )}
              >
                {alert.severity}
              </span>
            </div>
            <p className="mt-1 text-xs text-muted-foreground">{alert.reason}</p>
            {alert.suggestedMitigation ? (
              <p className="mt-1 text-[11px] font-medium text-foreground/80">
                Action: {alert.suggestedMitigation}
              </p>
            ) : null}
          </div>
          <span className="shrink-0 font-mono text-[10px] text-muted-foreground">
            {alert.timestamp}
          </span>
        </div>
      ))}
    </div>
  );
}

export function AlertPanel({ alerts }: { alerts?: Alert[] }) {
  return (
    <section className="panel overflow-hidden rounded-lg">
      <div className="flex items-center justify-between border-b border-border px-5 py-4">
        <h3 className="font-medium">Actionable alerts</h3>
        <Link
          to="/alerts"
          className="flex items-center gap-1 text-xs font-medium text-primary hover:underline"
        >
          View all <ChevronRight className="size-3.5" />
        </Link>
      </div>
      <AlertList limit={3} items={alerts} />
    </section>
  );
}
