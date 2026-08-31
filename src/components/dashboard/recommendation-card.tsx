import { ArrowRight, Check, Droplets, Flame, HelpCircle, Leaf, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PriorityBadge } from "@/components/shared/status";
import type { Recommendation } from "@/types/agriculture";
import { cn } from "@/lib/utils";

export function RecommendationCard({
  recommendation,
  onAction,
  isCompleted = false,
}: {
  recommendation: Recommendation;
  onAction?: () => void;
  isCompleted?: boolean;
}) {
  const priorityIcon =
    recommendation.priority === "high" ? "🚨" : recommendation.priority === "medium" ? "💧" : "🌿";

  return (
    <div
      className={cn(
        "rounded-lg border p-4.5 transition-all",
        recommendation.priority === "high"
          ? "border-rose-500/30 bg-rose-50/40 dark:border-rose-900/40 dark:bg-rose-950/20"
          : recommendation.priority === "medium"
            ? "border-amber-500/30 bg-amber-50/40 dark:border-amber-900/40 dark:bg-amber-950/20"
            : "border-emerald-500/30 bg-emerald-50/30 dark:border-emerald-900/40 dark:bg-emerald-950/20",
        isCompleted && "opacity-60 bg-muted/30 border-border",
      )}
    >
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <span className="text-sm">{priorityIcon}</span>
          <span className="font-mono text-xs font-bold text-foreground">
            Zone {recommendation.zone}
          </span>
          <PriorityBadge priority={recommendation.priority} />
        </div>
        <span className="font-mono text-[10px] text-muted-foreground">
          {recommendation.updated}
        </span>
      </div>

      {/* Recommended Action */}
      <div className="mt-3">
        <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
          Recommended Action:
        </p>
        <h4 className="mt-0.5 text-sm font-semibold text-foreground">{recommendation.action}</h4>
      </div>

      {/* Short Reason */}
      <div className="mt-2">
        <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
          Trigger Reason:
        </p>
        <p className="mt-0.5 text-xs text-foreground/80">{recommendation.reason}</p>
      </div>

      {/* Moisture Telemetry & Why */}
      {recommendation.whyExplanation ? (
        <div className="mt-3 flex items-start gap-1.5 rounded-md bg-muted/40 p-2 text-[11px] text-muted-foreground border border-border/60">
          <HelpCircle className="size-3.5 shrink-0 text-emerald-600 dark:text-emerald-400 mt-0.5" />
          <span>{recommendation.whyExplanation}</span>
        </div>
      ) : null}

      {recommendation.soilMoistureCurrent !== undefined ? (
        <div className="mt-3 flex items-center justify-between border-t border-border/60 pt-2.5 text-xs">
          <span className="text-muted-foreground">Moisture Level:</span>
          <span className="font-mono font-medium">
            <span
              className={cn(
                recommendation.priority === "high"
                  ? "text-rose-600 dark:text-rose-400 font-bold"
                  : "text-amber-600 dark:text-amber-400 font-semibold",
              )}
            >
              {recommendation.soilMoistureCurrent}%
            </span>{" "}
            → Target: {recommendation.soilMoistureTarget ?? 55}%
          </span>
        </div>
      ) : null}

      <Button
        variant={
          isCompleted ? "outline" : recommendation.priority === "high" ? "default" : "secondary"
        }
        size="sm"
        disabled={isCompleted}
        className={cn("mt-4 w-full gap-2", isCompleted && "text-muted-foreground")}
        onClick={onAction}
      >
        {isCompleted ? (
          <>
            <Check className="size-3.5 text-primary" />
            Applied to Schedule
          </>
        ) : recommendation.priority === "high" ? (
          <>
            <Droplets className="size-3.5" />
            Dispatch Urgent Irrigation
          </>
        ) : (
          <>
            Apply Recommendation
            <ArrowRight className="size-3.5" />
          </>
        )}
      </Button>
    </div>
  );
}
