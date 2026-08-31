import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { api } from "@/services/api";
import { cn } from "@/lib/utils";
import type { Zone } from "@/types/agriculture";
import { StatusBadge } from "@/components/shared/status";

const fill: Record<Zone["status"], string> = {
  healthy:
    "bg-emerald-500/15 text-emerald-800 dark:text-emerald-300 ring-emerald-500/25 hover:bg-emerald-500/25",
  moderate:
    "bg-amber-500/15 text-amber-800 dark:text-amber-300 ring-amber-500/25 hover:bg-amber-500/25",
  stress: "bg-rose-500/15 text-rose-800 dark:text-rose-300 ring-rose-500/25 hover:bg-rose-500/25",
};

export function FarmZoneMap({
  zones: propZones,
  selectedId: propSelectedId,
  onSelect,
}: {
  zones?: Zone[];
  selectedId?: string;
  onSelect?: (zone: Zone) => void;
}) {
  const [internalZones, setInternalZones] = useState<Zone[]>(propZones ?? []);
  const [selected, setSelected] = useState(propSelectedId ?? "Z08");
  const [mode, setMode] = useState<"vegetation" | "moisture" | "thermal">("vegetation");

  useEffect(() => {
    if (propZones && propZones.length > 0) {
      setInternalZones(propZones);
    } else {
      api.getZones().then(setInternalZones);
    }
  }, [propZones]);

  useEffect(() => {
    if (propSelectedId) {
      setSelected(propSelectedId);
    }
  }, [propSelectedId]);

  const choose = (zone: Zone) => {
    setSelected(zone.id);
    onSelect?.(zone);
  };

  const zonesToRender = internalZones.length > 0 ? internalZones : (propZones ?? []);
  const currentSelectedZone = zonesToRender.find((z) => z.id === selected) ?? zonesToRender[0];

  const healthyCount = zonesToRender.filter((z) => z.status === "healthy").length;
  const moderateCount = zonesToRender.filter((z) => z.status === "moderate").length;
  const stressCount = zonesToRender.filter((z) => z.status === "stress").length;

  return (
    <section className="panel overflow-hidden rounded-lg">
      <div className="flex flex-col gap-4 border-b border-border p-5 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h3 className="font-medium">Farm Zone Map & Health Distribution</h3>
          <p className="mt-1 text-xs text-muted-foreground">
            Interactive multi-spectral zone grid · Click any sector to inspect
          </p>
        </div>
        <div className="flex items-center gap-1 rounded-md bg-muted p-1">
          {(["vegetation", "moisture", "thermal"] as const).map((item) => (
            <Button
              key={item}
              variant={mode === item ? "outline" : "ghost"}
              size="sm"
              onClick={() => setMode(item)}
              className="h-7 px-2.5 text-[11px] capitalize"
            >
              {item === "vegetation"
                ? "NDVI Canopy"
                : item === "moisture"
                  ? "Soil Moisture"
                  : "Thermal Stress"}
            </Button>
          ))}
        </div>
      </div>

      <div className="p-4 sm:p-6">
        <div className="grid aspect-[1.45/1] min-h-[260px] grid-cols-4 grid-rows-4 gap-2 rounded-md bg-muted p-2 sm:gap-3 sm:p-3">
          {zonesToRender.map((zone, index) => (
            <button
              key={zone.id}
              onClick={() => choose(zone)}
              aria-label={`Select zone ${zone.id}`}
              className={cn(
                "group relative flex min-h-0 flex-col items-start justify-between rounded-md p-2 text-left ring-1 transition-all sm:p-3",
                fill[zone.status],
                selected === zone.id && "z-10 ring-2 ring-primary ring-offset-2 ring-offset-muted",
                index === 7 && "col-span-2 row-span-2",
              )}
            >
              <div className="flex w-full items-center justify-between">
                <span className="font-mono text-[10px] font-bold sm:text-xs">{zone.id}</span>
                {zone.waterStress === "High" ? (
                  <span className="rounded bg-destructive/20 px-1 py-0.5 text-[9px] font-bold uppercase text-destructive">
                    Stress
                  </span>
                ) : null}
              </div>

              <span className="text-[9px] font-medium opacity-80 sm:text-[10px]">
                {mode === "vegetation"
                  ? `NDVI ${zone.ndvi.toFixed(2)}`
                  : mode === "moisture"
                    ? `${zone.soilMoisture}% moisture`
                    : zone.status === "stress"
                      ? "High heat (+4°C)"
                      : "Thermal normal"}
              </span>

              {selected === zone.id ? (
                <span className="absolute right-2 top-2 size-2 rounded-full bg-primary ring-2 ring-background" />
              ) : null}
            </button>
          ))}
          <div className="col-span-4 flex items-center justify-center rounded-md border border-dashed border-border bg-card/60 text-[10px] font-medium uppercase tracking-[0.18em] text-muted-foreground">
            Sub-surface Infiltration Channel
          </div>
        </div>

        {/* Health Distribution Breakdown Bar */}
        <div className="mt-5 space-y-2 border-t border-border/80 pt-4">
          <div className="flex items-center justify-between text-xs">
            <span className="font-medium text-foreground">Health Distribution:</span>
            <span className="text-muted-foreground">
              {healthyCount} Healthy · {moderateCount} Moderate · {stressCount} Stressed
            </span>
          </div>

          <div className="flex h-2.5 w-full overflow-hidden rounded-full bg-muted">
            <div
              className="bg-emerald-500 transition-all duration-300"
              style={{ width: `${(healthyCount / (zonesToRender.length || 1)) * 100}%` }}
              title={`Healthy: ${healthyCount}`}
            />
            <div
              className="bg-amber-500 transition-all duration-300"
              style={{ width: `${(moderateCount / (zonesToRender.length || 1)) * 100}%` }}
              title={`Moderate: ${moderateCount}`}
            />
            <div
              className="bg-rose-500 transition-all duration-300"
              style={{ width: `${(stressCount / (zonesToRender.length || 1)) * 100}%` }}
              title={`Stress: ${stressCount}`}
            />
          </div>

          <div className="flex flex-wrap items-center justify-between gap-y-2 text-[11px] text-muted-foreground">
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1.5">
                <span className="status-dot bg-emerald-500" />
                Optimal ({healthyCount})
              </span>
              <span className="flex items-center gap-1.5">
                <span className="status-dot bg-amber-500" />
                Moderate Deficit ({moderateCount})
              </span>
              <span className="flex items-center gap-1.5">
                <span className="status-dot bg-rose-500" />
                Critical Stress ({stressCount})
              </span>
            </div>
            {currentSelectedZone ? (
              <span className="font-mono font-medium text-foreground">
                Selected: {currentSelectedZone.id} ({currentSelectedZone.name})
              </span>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
}
