import { Droplets, Flame, HelpCircle, Leaf, Sparkles, Wheat } from "lucide-react";
import { cn } from "@/lib/utils";
import type { CropIntelligenceSummaryData } from "@/types/agriculture";

export interface CropIntelligenceSummaryProps {
  data: CropIntelligenceSummaryData;
  className?: string;
  compact?: boolean;
  showDetails?: boolean;
}

export function CropIntelligenceSummary({
  data,
  className,
  compact = false,
  showDetails = false,
}: CropIntelligenceSummaryProps) {
  // Normalize water stress and priority formatting
  const waterStressNormalized: "Low" | "Medium" | "High" =
    data.waterStress === "Moderate" ? "Medium" : (data.waterStress as "Low" | "Medium" | "High");

  const priorityNormalized: "High" | "Medium" | "Low" =
    typeof data.irrigationPriority === "string"
      ? ((data.irrigationPriority.charAt(0).toUpperCase() +
          data.irrigationPriority.slice(1).toLowerCase()) as "High" | "Medium" | "Low")
      : "Medium";

  return (
    <div
      className={cn(
        "rounded-lg border border-border bg-card shadow-sm",
        compact ? "p-3.5 space-y-2.5" : "p-4 space-y-3",
        className,
      )}
    >
      <div className="flex items-center justify-between border-b border-border/80 pb-2.5">
        <div className="flex items-center gap-2">
          <span className="flex size-6 items-center justify-center rounded-md bg-amber-500/15 text-amber-700 dark:text-amber-400">
            <Wheat className="size-3.5" />
          </span>
          <span className="text-[11px] font-bold tracking-wider uppercase text-foreground">
            Crop Intelligence Summary
          </span>
        </div>
        {data.confidence ? (
          <span className="rounded-full bg-muted px-2 py-0.5 text-[11px] font-mono font-medium text-muted-foreground">
            {Math.round(data.confidence * 100)}% confidence
          </span>
        ) : null}
      </div>

      <div className="grid gap-2 text-xs">
        {/* 1. Detected Crop - Golden theme */}
        <div className="flex items-center justify-between gap-3 rounded-lg border border-amber-500/30 bg-amber-50/70 p-2.5 dark:bg-amber-950/30 dark:border-amber-700/40 shadow-2xs">
          <div className="flex items-center gap-2.5">
            <span className="flex size-7 items-center justify-center rounded-md bg-amber-500/20 text-amber-700 dark:text-amber-300">
              <Wheat className="size-4" strokeWidth={2} />
            </span>
            <span className="font-medium text-foreground">Detected Crop</span>
          </div>
          <span className="inline-flex items-center rounded-md bg-amber-100/90 border border-amber-400/40 px-2.5 py-1 text-xs font-semibold text-amber-900 dark:bg-amber-900/40 dark:text-amber-200 dark:border-amber-700/50">
            {data.detectedCrop}
          </span>
        </div>

        {/* 2. Health Score - Green theme */}
        <div className="flex flex-col gap-2 rounded-lg border border-emerald-500/30 bg-emerald-50/70 p-2.5 dark:bg-emerald-950/30 dark:border-emerald-700/40 shadow-2xs">
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-2.5">
              <span className="flex size-7 items-center justify-center rounded-md bg-emerald-500/20 text-emerald-700 dark:text-emerald-300">
                <Leaf className="size-4" strokeWidth={2} />
              </span>
              <span className="font-medium text-foreground">Health Score</span>
            </div>
            <span className="font-mono text-sm font-bold text-emerald-700 dark:text-emerald-400">
              {data.healthScore}%
            </span>
          </div>

          {/* Green Health Score Progress Bar */}
          <div className="h-2 w-full overflow-hidden rounded-full bg-emerald-950/10 dark:bg-emerald-100/10">
            <div
              className="h-full rounded-full bg-emerald-600 dark:bg-emerald-500 transition-all duration-300"
              style={{ width: `${Math.min(100, Math.max(0, data.healthScore))}%` }}
            />
          </div>
        </div>

        {/* 3. Water Stress - Blue theme */}
        <div className="flex items-center justify-between gap-3 rounded-lg border border-sky-500/30 bg-sky-50/70 p-2.5 dark:bg-sky-950/30 dark:border-sky-700/40 shadow-2xs">
          <div className="flex items-center gap-2.5">
            <span className="flex size-7 items-center justify-center rounded-md bg-sky-500/20 text-sky-700 dark:text-sky-300">
              <Droplets className="size-4" strokeWidth={2} />
            </span>
            <span className="font-medium text-foreground">Water Stress</span>
          </div>
          <span
            className={cn(
              "inline-flex items-center gap-1.5 rounded-md px-2.5 py-1 text-xs font-semibold",
              waterStressNormalized === "Low" &&
                "border border-sky-500/30 bg-sky-100 text-sky-800 dark:bg-sky-950 dark:text-sky-300",
              waterStressNormalized === "Medium" &&
                "border border-amber-500/30 bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300",
              waterStressNormalized === "High" &&
                "border border-rose-400/40 bg-rose-100/90 text-rose-800 dark:bg-rose-950/80 dark:text-rose-300",
            )}
          >
            <span
              className={cn(
                "size-2 rounded-full",
                waterStressNormalized === "Low" && "bg-sky-500",
                waterStressNormalized === "Medium" && "bg-amber-500",
                waterStressNormalized === "High" && "bg-rose-500",
              )}
            />
            {waterStressNormalized}
          </span>
        </div>

        {/* 4. Irrigation Priority - Priority Red theme */}
        <div className="flex items-center justify-between gap-3 rounded-lg border border-rose-500/30 bg-rose-50/70 p-2.5 dark:bg-rose-950/30 dark:border-rose-700/40 shadow-2xs">
          <div className="flex items-center gap-2.5">
            <span className="flex size-7 items-center justify-center rounded-md bg-rose-500/20 text-rose-700 dark:text-rose-300">
              <Flame className="size-4" strokeWidth={2} />
            </span>
            <span className="font-medium text-foreground">Irrigation Priority</span>
          </div>
          <span
            className={cn(
              "inline-flex items-center rounded-md px-3 py-1 text-xs font-bold tracking-wider uppercase shadow-xs",
              priorityNormalized === "Low" &&
                "border border-emerald-500/30 bg-emerald-600 text-white",
              priorityNormalized === "Medium" &&
                "border border-amber-500/30 bg-amber-600 text-white",
              priorityNormalized === "High" &&
                "border border-rose-600 bg-rose-600 text-white dark:bg-rose-600",
            )}
          >
            {priorityNormalized}
          </span>
        </div>
      </div>

      {/* Optional explainable reasoning box */}
      {showDetails || data.actionWhy || data.reasoning ? (
        <div className="mt-2.5 rounded-md border border-border/80 bg-muted/40 p-3 text-xs leading-relaxed text-muted-foreground">
          <div className="mb-1 flex items-center gap-1.5 font-medium text-foreground">
            <HelpCircle className="size-3.5 text-emerald-600 dark:text-emerald-400" />
            <span>Why this recommendation:</span>
          </div>
          <p className="text-foreground/90">{data.actionWhy || data.reasoning}</p>
        </div>
      ) : null}
    </div>
  );
}
