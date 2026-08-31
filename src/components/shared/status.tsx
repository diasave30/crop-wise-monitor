import { cn } from "@/lib/utils";
import type { Priority, ZoneStatus } from "@/types/agriculture";

const statusStyles: Record<ZoneStatus, string> = {
  healthy:
    "border border-emerald-500/30 bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 dark:border-emerald-800",
  moderate:
    "border border-amber-500/30 bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300 dark:border-amber-800",
  stress:
    "border border-rose-500/30 bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300 dark:border-rose-800",
};

const priorityStyles: Record<Priority, string> = {
  high: "border border-rose-500/40 bg-rose-100 font-bold text-rose-800 dark:bg-rose-950 dark:text-rose-300 dark:border-rose-800",
  medium:
    "border border-amber-500/30 bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300 dark:border-amber-800",
  low: "border border-emerald-500/30 bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 dark:border-emerald-800",
};

export function StatusBadge({ status }: { status: ZoneStatus }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider",
        statusStyles[status],
      )}
    >
      <span
        className={cn(
          "status-dot",
          status === "healthy"
            ? "bg-emerald-600 dark:bg-emerald-400"
            : status === "moderate"
              ? "bg-amber-500 dark:bg-amber-400"
              : "bg-rose-600 dark:bg-rose-400",
        )}
      />
      {status === "stress" ? "High stress" : status}
    </span>
  );
}

export function PriorityBadge({ priority }: { priority: Priority }) {
  return (
    <span
      className={cn(
        "inline-flex rounded px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider",
        priorityStyles[priority],
      )}
    >
      {priority} priority
    </span>
  );
}
