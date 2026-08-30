import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { AppShell, Breadcrumb, PageHeading } from "@/components/layout/app-shell";
import { AlertList } from "@/components/shared/alert-list";
import { Button } from "@/components/ui/button";
import { alerts } from "@/data/mock-data";
import type { Alert } from "@/types/agriculture";

export const Route = createFileRoute("/alerts")({ head: () => ({ meta: [{ title: "Alerts — Ceres Intelligence" }, { name: "description", content: "Review and filter operational crop health and irrigation alerts." }, { property: "og:title", content: "Alerts — Ceres Intelligence" }, { property: "og:description", content: "Review and filter operational crop health and irrigation alerts." }, { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" }] }), component: AlertsPage });

function AlertsPage() { const [filter, setFilter] = useState<"All" | Alert["severity"]>("All"); const filtered = useMemo(() => filter === "All" ? alerts : alerts.filter((alert) => alert.severity === filter), [filter]); return <AppShell title="Alerts"><Breadcrumb label="Alerts" /><PageHeading title="Alerts" description="Operational issues and field events that may need review." /><div className="panel overflow-hidden rounded-lg"><div className="flex flex-col gap-3 border-b border-border px-5 py-4 sm:flex-row sm:items-center sm:justify-between"><div><h3 className="font-medium">Alert register</h3><p className="mt-1 text-xs text-muted-foreground">{filtered.length} of {alerts.length} alerts shown</p></div><div className="flex flex-wrap gap-1 rounded-md bg-muted p-1">{(["All", "High", "Medium", "Resolved"] as const).map((item) => <Button key={item} variant={filter === item ? "outline" : "ghost"} size="sm" className="h-7 px-2.5 text-[11px]" onClick={() => setFilter(item)}>{item}</Button>)}</div></div><AlertList items={filtered} /></div></AppShell>; }