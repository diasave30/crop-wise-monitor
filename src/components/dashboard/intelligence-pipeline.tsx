import { useState } from "react";
import {
  Activity,
  ArrowRight,
  BrainCircuit,
  CheckCircle2,
  Cpu,
  Database,
  Droplets,
  Flame,
  HelpCircle,
  Leaf,
  Layers,
  Sparkles,
  Wheat,
} from "lucide-react";
import { cn } from "@/lib/utils";
import type { Zone } from "@/types/agriculture";

export interface IntelligencePipelineProps {
  zone: Zone;
  className?: string;
}

export function IntelligencePipeline({ zone, className }: IntelligencePipelineProps) {
  const [activeStep, setActiveStep] = useState<number | null>(null);

  // Compute live pipeline step outputs based on the current zone
  const pipelineSteps = [
    {
      id: "dataset",
      num: 1,
      title: "Agricultural Datasets",
      icon: Database,
      summary: "Multispectral satellite + IoT telemetry",
      detail: `Aggregated 10m Sentinel-2 bands, local soil moisture probes at 15cm/30cm depth, and last 7-day evapotranspiration (ET₀) for zone ${zone.id}.`,
      value: "Sentinel-2 & Probes",
    },
    {
      id: "processing",
      num: 2,
      title: "Data Processing",
      icon: Cpu,
      summary: "Atmospheric & spatial normalization",
      detail:
        "Applied radiometric calibration, cloud-shadow mask, and spatial interpolation across polygon boundaries.",
      value: "Calibrated 100%",
    },
    {
      id: "detection",
      num: 3,
      title: "Crop Detection",
      icon: Wheat,
      summary: `Identified: ${zone.crop}`,
      detail: `Spectral signature matches ${zone.crop} phenological signature with 94.8% classification confidence.`,
      value: zone.crop,
      highlight: true,
    },
    {
      id: "health",
      num: 4,
      title: "Crop Health Analysis",
      icon: Leaf,
      summary: `Health Score: ${zone.healthScore}% (NDVI: ${zone.ndvi.toFixed(2)})`,
      detail: `Canopy vigor index derived from red and near-infrared reflectance. Health score evaluated against regional baseline.`,
      value: `${zone.healthScore}%`,
      status: zone.status,
    },
    {
      id: "water_stress",
      num: 5,
      title: "Water-Stress Detection",
      icon: Droplets,
      summary: `Stress: ${zone.waterStress} (Moisture: ${zone.soilMoisture}%)`,
      detail: `Soil volumetric water content is ${zone.soilMoisture}%. Surface moisture deficit indicates ${zone.waterStress.toLowerCase()} water stress level.`,
      value: zone.waterStress,
      status: zone.status,
    },
    {
      id: "ai_decision",
      num: 6,
      title: "AI Decision",
      icon: BrainCircuit,
      summary: "Agronomic stress inference model",
      detail: `Multi-variable agronomic model combined crop type (${zone.crop}), moisture deficit (${100 - zone.soilMoisture}%), and NDVI trend.`,
      value: "Inference Complete",
    },
    {
      id: "priority",
      num: 7,
      title: "Irrigation Priority",
      icon: Flame,
      summary: `Assigned: ${zone.irrigationPriority.toUpperCase()} Priority`,
      detail: `Urgency rank computed based on yield loss vulnerability and soil moisture threshold depletion.`,
      value: `${zone.irrigationPriority.toUpperCase()}`,
      priority: zone.irrigationPriority,
    },
    {
      id: "explainable_action",
      num: 8,
      title: "Explainable Action",
      icon: HelpCircle,
      summary: zone.recommendation,
      detail:
        zone.reasoning ??
        `Action is justified because soil moisture (${zone.soilMoisture}%) is below optimal threshold and water stress is ${zone.waterStress.toLowerCase()}.`,
      value: "Action Ready",
    },
  ];

  return (
    <section className={cn("panel rounded-lg p-5", className)}>
      <div className="flex flex-col gap-2 border-b border-border pb-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="flex items-center gap-2">
            <span className="flex size-6 items-center justify-center rounded-md bg-primary/10 text-primary">
              <Sparkles className="size-3.5" />
            </span>
            <h3 className="font-medium text-foreground">Explainable Intelligence Pipeline</h3>
          </div>
          <p className="mt-1 text-xs text-muted-foreground">
            End-to-end data transformation from raw agricultural datasets to prioritized decision
            for{" "}
            <span className="font-semibold text-foreground">
              {zone.name} ({zone.id})
            </span>
          </p>
        </div>
        <div className="flex items-center gap-1.5 text-[11px] font-mono text-muted-foreground">
          <span className="size-2 rounded-full bg-primary animate-pulse" />
          <span>Pipeline Active · 8 Stages Verified</span>
        </div>
      </div>

      {/* Pipeline Flow Stepper */}
      <div className="mt-5 grid grid-cols-1 gap-2.5 sm:grid-cols-2 lg:grid-cols-4">
        {pipelineSteps.map((step, idx) => {
          const Icon = step.icon;
          const isSelected = activeStep === idx;
          return (
            <button
              key={step.id}
              onClick={() => setActiveStep(isSelected ? null : idx)}
              className={cn(
                "group relative flex flex-col justify-between rounded-md border p-3 text-left transition-all",
                isSelected
                  ? "border-primary bg-primary/5 ring-1 ring-primary shadow-xs"
                  : "border-border bg-card hover:bg-muted/40 hover:border-border/80",
              )}
            >
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-center gap-1.5">
                  <span className="grid size-5 place-items-center rounded-full bg-muted text-[10px] font-bold text-muted-foreground">
                    {step.num}
                  </span>
                  <span className="text-[11px] font-medium text-foreground">{step.title}</span>
                </div>
                <Icon
                  className={cn(
                    "size-3.5 shrink-0",
                    step.id === "detection" && "text-amber-600 dark:text-amber-400",
                    step.id === "health" && "text-emerald-600 dark:text-emerald-400",
                    step.id === "water_stress" && "text-sky-600 dark:text-sky-400",
                    step.id === "priority" && "text-rose-600 dark:text-rose-400",
                    !["detection", "health", "water_stress", "priority"].includes(step.id) &&
                      "text-primary",
                  )}
                />
              </div>

              <div className="mt-2.5">
                <p className="line-clamp-1 text-[11px] font-semibold text-foreground">
                  {step.summary}
                </p>
                <p className="mt-1 line-clamp-2 text-[10px] leading-relaxed text-muted-foreground">
                  {step.detail}
                </p>
              </div>

              <div className="mt-2.5 flex items-center justify-between border-t border-border/60 pt-2 text-[10px]">
                <span className="font-mono text-muted-foreground">Output:</span>
                <span
                  className={cn(
                    "font-semibold",
                    step.id === "detection" && "text-amber-700 dark:text-amber-300",
                    step.id === "health" && "text-emerald-600 dark:text-emerald-400",
                    step.id === "water_stress" && "text-sky-600 dark:text-sky-400",
                    step.id === "priority" && "text-rose-600 dark:text-rose-400",
                    step.priority === "high" && "text-rose-600 dark:text-rose-400",
                    step.priority === "medium" && "text-amber-600 dark:text-amber-400",
                    step.priority === "low" && "text-emerald-600 dark:text-emerald-400",
                  )}
                >
                  {step.value}
                </span>
              </div>
            </button>
          );
        })}
      </div>

      {/* Selected Step Explanation Detail Drawer */}
      {activeStep !== null && (
        <div className="mt-4 rounded-md border border-primary/20 bg-primary/5 p-4 text-xs leading-relaxed text-foreground animate-in fade-in-50 duration-200">
          <div className="flex items-center justify-between gap-2 border-b border-primary/10 pb-2">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="size-4 text-primary" />
              <span className="font-semibold">
                Stage {pipelineSteps[activeStep]?.num}: {pipelineSteps[activeStep]?.title} Details
              </span>
            </div>
            <button
              onClick={() => setActiveStep(null)}
              className="text-[11px] text-muted-foreground hover:text-foreground"
            >
              Close
            </button>
          </div>
          <p className="mt-2 text-muted-foreground">{pipelineSteps[activeStep]?.detail}</p>
        </div>
      )}
    </section>
  );
}
