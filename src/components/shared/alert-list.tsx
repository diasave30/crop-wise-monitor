import { Link } from "@tanstack/react-router";
import { ChevronRight } from "lucide-react";
import { alerts } from "@/data/mock-data";
import type { Alert } from "@/types/agriculture";
import { cn } from "@/lib/utils";

const severityClass: Record<Alert["severity"], string> = { High: "bg-destructive", Medium: "bg-chart-2", Resolved: "bg-primary" };

export function AlertList({ limit, items = alerts }: { limit?: number; items?: Alert[] }) {
  const visible = limit ? items.slice(0, limit) : items;
  return <div className="divide-y divide-border">{visible.map((alert) => <div key={alert.id} className="flex items-start gap-3 px-5 py-4"><span className={cn("status-dot mt-1.5", severityClass[alert.severity])} /><div className="min-w-0 flex-1"><div className="flex flex-wrap items-center gap-x-2 gap-y-1"><p className="text-sm font-medium">{alert.title}</p><span className="font-mono text-[10px] text-muted-foreground">{alert.zone}</span></div><p className="mt-1 text-xs text-muted-foreground">{alert.reason}</p></div><span className="shrink-0 text-[10px] text-muted-foreground">{alert.timestamp}</span></div>)}</div>;
}

export function AlertPanel() { return <section className="panel overflow-hidden rounded-lg"><div className="flex items-center justify-between border-b border-border px-5 py-4"><h3 className="font-medium">Recent alerts</h3><Link to="/alerts" className="flex items-center gap-1 text-xs font-medium text-primary hover:underline">View all <ChevronRight className="size-3.5" /></Link></div><AlertList limit={3} /></section>; }