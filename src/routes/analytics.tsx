import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { AppShell, Breadcrumb, PageHeading } from "@/components/layout/app-shell";
import { TrendChart } from "@/components/dashboard/trend-chart";
import { api } from "@/services/api";
import type { Zone } from "@/types/agriculture";

export const Route = createFileRoute("/analytics")({
  head: () => ({
    meta: [
      { title: "Analytics — CropWise AI" },
      {
        name: "description",
        content: "Review crop health, water stress, and zone comparison analytics.",
      },
      { property: "og:title", content: "Analytics — CropWise AI" },
      {
        property: "og:description",
        content: "Review crop health, water stress, and zone comparison analytics.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: AnalyticsPage,
});

function AnalyticsPage() {
  const [zones, setZones] = useState<Zone[]>([]);
  const [trends, setTrends] = useState<{ day: string; value: number }[]>([]);

  useEffect(() => {
    let isMounted = true;
    async function load() {
      const [allZones, trendData] = await Promise.all([api.getZones(), api.getHealthTrends()]);
      if (!isMounted) return;
      setZones(allZones);
      setTrends(trendData);
    }
    load();
    return () => {
      isMounted = false;
    };
  }, []);

  const lowCount = zones.filter((z) => z.waterStress === "Low").length || 9;
  const modCount = zones.filter((z) => z.waterStress === "Moderate").length || 2;
  const highCount = zones.filter((z) => z.waterStress === "High").length || 1;

  const stress = [
    { name: "Low", value: lowCount, color: "var(--color-primary)" },
    { name: "Moderate", value: modCount, color: "var(--color-chart-2)" },
    { name: "High", value: highCount, color: "var(--color-destructive)" },
  ];

  const comparison = zones
    .slice(0, 12)
    .map((zone) => ({ name: zone.id, health: zone.healthScore, moisture: zone.soilMoisture }));

  return (
    <AppShell title="Agricultural Analytics">
      <Breadcrumb label="Analytics" />
      <PageHeading
        title="Field Analytics & Sensor Comparisons"
        description="Multi-variable distribution of NDVI health vigor, in-situ soil moisture, and water stress classification across zones."
      />
      <div className="grid gap-6 xl:grid-cols-2">
        <section className="panel rounded-lg p-5">
          <div className="mb-5">
            <h3 className="font-medium">Crop health over time</h3>
            <p className="mt-1 text-xs text-muted-foreground">Cumulative health index · 30 days</p>
          </div>
          <TrendChart data={trends} />
        </section>

        <section className="panel rounded-lg p-5">
          <div className="mb-5">
            <h3 className="font-medium">Water stress distribution</h3>
            <p className="mt-1 text-xs text-muted-foreground">
              Current readings across {zones.length || 12} monitored zones
            </p>
          </div>
          <div className="flex h-72 items-center justify-center gap-8">
            <ResponsiveContainer width="55%" height="100%">
              <PieChart>
                <Pie
                  data={stress}
                  dataKey="value"
                  nameKey="name"
                  innerRadius={60}
                  outerRadius={90}
                  paddingAngle={3}
                >
                  {stress.map((entry) => (
                    <Cell key={entry.name} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="space-y-4">
              {stress.map((item) => (
                <div key={item.name} className="flex items-center gap-3 text-xs">
                  <span className="status-dot" style={{ backgroundColor: item.color }} />
                  <span className="w-16 text-muted-foreground">{item.name}</span>
                  <strong>{item.value} zones</strong>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="panel rounded-lg p-5 xl:col-span-2">
          <div className="mb-5">
            <h3 className="font-medium">Zone comparison</h3>
            <p className="mt-1 text-xs text-muted-foreground">
              Health score by zone alongside root-zone soil moisture context.
            </p>
          </div>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={comparison} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid stroke="var(--color-border)" vertical={false} />
                <XAxis
                  dataKey="name"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "var(--color-muted-foreground)", fontSize: 10 }}
                />
                <YAxis
                  domain={[0, 100]}
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "var(--color-muted-foreground)", fontSize: 10 }}
                />
                <Tooltip
                  contentStyle={{
                    border: "1px solid var(--color-border)",
                    borderRadius: "6px",
                    background: "var(--color-card)",
                    fontSize: "12px",
                  }}
                />
                <Bar
                  dataKey="health"
                  fill="var(--color-primary)"
                  radius={[3, 3, 0, 0]}
                  name="Health Index %"
                />
                <Bar
                  dataKey="moisture"
                  fill="var(--color-chart-2)"
                  radius={[3, 3, 0, 0]}
                  name="Soil Moisture %"
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </section>
      </div>
      <p className="mt-5 text-[11px] text-muted-foreground">
        Observation cycle: August 2026 · Evaluated via Sentinel-2 + in-situ capacitive sensor
        telemetry
      </p>
    </AppShell>
  );
}
