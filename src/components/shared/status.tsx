import { cn } from "@/lib/utils";
import type { Priority, ZoneStatus } from "@/types/agriculture";

const statusStyles: Record<ZoneStatus, string> = { healthy: "bg-primary/10 text-primary", moderate: "bg-chart-2/15 text-chart-2", stress: "bg-destructive/10 text-destructive" };
const priorityStyles: Record<Priority, string> = { high: "bg-destructive/10 text-destructive", medium: "bg-chart-2/15 text-chart-2", low: "bg-primary/10 text-primary" };

export function StatusBadge({ status }: { status: ZoneStatus }) { return <span className={cn("inline-flex items-center gap-1.5 rounded px-2 py-1 text-[10px] font-semibold uppercase tracking-wider", statusStyles[status])}><span className={cn("status-dot", status === "healthy" ? "bg-primary" : status === "moderate" ? "bg-chart-2" : "bg-destructive")} />{status === "stress" ? "High stress" : status}</span>; }
export function PriorityBadge({ priority }: { priority: Priority }) { return <span className={cn("inline-flex rounded px-2 py-1 text-[10px] font-semibold uppercase tracking-wider", priorityStyles[priority])}>{priority} priority</span>; }