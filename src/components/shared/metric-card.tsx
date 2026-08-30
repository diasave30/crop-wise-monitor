import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export function MetricCard({ label, value, note, icon: Icon, tone = "neutral" }: { label: string; value: string; note: string; icon?: LucideIcon; tone?: "neutral" | "healthy" | "attention" | "urgent" }) {
  const toneClass = { neutral: "text-foreground", healthy: "text-primary", attention: "text-chart-2", urgent: "text-destructive" }[tone];
  return <div className="panel rounded-lg p-5"><div className="flex items-start justify-between gap-3"><p className="text-[11px] font-medium uppercase tracking-[0.14em] text-muted-foreground">{label}</p>{Icon ? <Icon className="size-4 text-muted-foreground" strokeWidth={1.8} /> : null}</div><div className="mt-3 flex items-end justify-between gap-3"><span className={cn("text-3xl font-medium tracking-tight", toneClass)}>{value}</span><span className="text-right text-[11px] text-muted-foreground">{note}</span></div></div>;
}