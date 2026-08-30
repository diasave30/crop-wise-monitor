import { useState } from "react";
import { Button } from "@/components/ui/button";
import { zones } from "@/data/mock-data";
import { cn } from "@/lib/utils";
import type { Zone } from "@/types/agriculture";
import { StatusBadge } from "@/components/shared/status";

const fill: Record<Zone["status"], string> = { healthy: "bg-primary/15 text-primary ring-primary/15 hover:bg-primary/25", moderate: "bg-chart-2/15 text-chart-2 ring-chart-2/20 hover:bg-chart-2/25", stress: "bg-destructive/15 text-destructive ring-destructive/20 hover:bg-destructive/25" };

export function FarmZoneMap({ onSelect }: { onSelect?: (zone: Zone) => void }) {
  const [selected, setSelected] = useState("Z08");
  const [mode, setMode] = useState<"vegetation" | "moisture" | "thermal">("vegetation");
  const choose = (zone: Zone) => { setSelected(zone.id); onSelect?.(zone); };

  return <section className="panel overflow-hidden rounded-lg">
    <div className="flex flex-col gap-4 border-b border-border p-5 sm:flex-row sm:items-center sm:justify-between"><div><h3 className="font-medium">Farm zone status</h3><p className="mt-1 text-xs text-muted-foreground">North Valley Sector · 12 monitored zones</p></div><div className="flex items-center gap-1 rounded-md bg-muted p-1">{(["vegetation", "moisture", "thermal"] as const).map((item) => <Button key={item} variant={mode === item ? "outline" : "ghost"} size="sm" onClick={() => setMode(item)} className="h-7 px-2.5 text-[11px] capitalize">{item}</Button>)}</div></div>
    <div className="p-4 sm:p-6"><div className="grid aspect-[1.45/1] min-h-[260px] grid-cols-4 grid-rows-4 gap-2 rounded-md bg-muted p-2 sm:gap-3 sm:p-3">
      {zones.map((zone, index) => <button key={zone.id} onClick={() => choose(zone)} aria-label={`Select zone ${zone.id}`} className={cn("group relative flex min-h-0 flex-col items-start justify-between rounded-md p-2 text-left ring-1 transition-all sm:p-3", fill[zone.status], selected === zone.id && "z-10 ring-2 ring-primary ring-offset-2 ring-offset-muted", index === 7 && "col-span-2 row-span-2")}><span className="font-mono text-[10px] font-medium sm:text-xs">{zone.id}</span><span className="text-[9px] opacity-70 sm:text-[10px]">{mode === "vegetation" ? `${zone.healthScore} score` : mode === "moisture" ? `${zone.soilMoisture}% moisture` : zone.status === "stress" ? "High heat" : "Stable"}</span>{selected === zone.id ? <span className="absolute right-2 top-2 size-1.5 rounded-full bg-primary" /> : null}</button>)}
      <div className="col-span-4 flex items-center justify-center rounded-md border border-dashed border-border bg-card/60 text-[10px] font-medium uppercase tracking-[0.18em] text-muted-foreground">South pasture interface</div>
    </div><div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2 text-[11px] text-muted-foreground"><span className="flex items-center gap-2"><span className="status-dot bg-primary" />Healthy · 9</span><span className="flex items-center gap-2"><span className="status-dot bg-chart-2" />Moderate · 2</span><span className="flex items-center gap-2"><span className="status-dot bg-destructive" />High stress · 1</span><StatusBadge status={zones.find((zone) => zone.id === selected)?.status ?? "healthy"} /></div></div>
  </section>;
}