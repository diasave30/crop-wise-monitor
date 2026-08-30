import { Link, useRouterState } from "@tanstack/react-router";
import {
  Activity,
  Bell,
  ChartNoAxesCombined,
  ChevronRight,
  Droplets,
  LayoutDashboard,
  Map,
  Menu,
  Settings,
  Sprout,
  TriangleAlert,
  X,
} from "lucide-react";
import { useState, type ReactNode } from "react";
import { Button } from "@/components/ui/button";

const navigation = [
  { label: "Dashboard", to: "/", icon: LayoutDashboard },
  { label: "Farms", to: "/farms", icon: Map },
  { label: "Crop Health", to: "/crop-health", icon: Sprout },
  { label: "Irrigation", to: "/irrigation", icon: Droplets },
  { label: "Alerts", to: "/alerts", icon: TriangleAlert, count: 3 },
  { label: "Analytics", to: "/analytics", icon: ChartNoAxesCombined },
];

export function AppShell({ children, title, eyebrow = "Green Valley Farm" }: { children: ReactNode; title: string; eyebrow?: string }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = useRouterState({ select: (state) => state.location.pathname });
  const isActive = (to: string) => to === "/" ? pathname === "/" : pathname.startsWith(to);

  return (
    <div className="min-h-screen bg-background text-foreground lg:flex">
      <aside className={`fixed inset-y-0 left-0 z-40 flex w-64 flex-col border-r border-sidebar-border bg-sidebar transition-transform duration-200 lg:static lg:translate-x-0 ${mobileOpen ? "translate-x-0" : "-translate-x-full"}`}>
        <div className="flex h-16 items-center justify-between border-b border-sidebar-border px-5">
          <Link to="/" className="flex items-center gap-3" onClick={() => setMobileOpen(false)}>
            <span className="grid size-8 place-items-center rounded-md bg-primary text-primary-foreground">
              <Activity className="size-4" strokeWidth={2.25} />
            </span>
            <span className="text-sm font-semibold tracking-tight text-sidebar-foreground">Ceres Intelligence</span>
          </Link>
          <Button variant="ghost" size="icon" className="lg:hidden" aria-label="Close navigation" onClick={() => setMobileOpen(false)}><X /></Button>
        </div>

        <div className="px-4 pt-6">
          <p className="px-3 text-[10px] font-medium uppercase tracking-[0.18em] text-muted-foreground">Workspace</p>
          <nav className="mt-3 space-y-1">
            {navigation.map(({ label, to, icon: Icon, count }) => (
              <Link key={to} to={to} onClick={() => setMobileOpen(false)} activeOptions={{ exact: to === "/" }} className={`group flex items-center gap-3 rounded-md border-l-2 px-3 py-2.5 text-sm transition-colors ${isActive(to) ? "border-primary bg-sidebar-accent font-medium text-sidebar-accent-foreground" : "border-transparent text-muted-foreground hover:bg-muted hover:text-foreground"}`}>
                <Icon className="size-4 shrink-0" strokeWidth={1.8} />
                <span className="min-w-0 flex-1 truncate">{label}</span>
                {count ? <span className="grid size-5 shrink-0 place-items-center rounded-full bg-destructive/10 text-[10px] font-semibold text-destructive">{count}</span> : null}
              </Link>
            ))}
          </nav>
        </div>

        <div className="mt-auto border-t border-sidebar-border p-4">
          <Link to="/settings" onClick={() => setMobileOpen(false)} className={`flex items-center gap-3 rounded-md px-3 py-2.5 text-sm transition-colors ${pathname.startsWith("/settings") ? "bg-sidebar-accent text-sidebar-accent-foreground" : "text-muted-foreground hover:bg-muted hover:text-foreground"}`}>
            <Settings className="size-4" strokeWidth={1.8} /><span>Settings</span>
          </Link>
          <div className="mt-4 flex items-center gap-3 border-t border-sidebar-border px-3 pt-4">
            <span className="grid size-8 shrink-0 place-items-center rounded-full bg-accent text-xs font-semibold text-accent-foreground">MT</span>
            <div className="min-w-0"><p className="truncate text-xs font-medium">Morgan Taylor</p><p className="truncate text-[11px] text-muted-foreground">Farm operations</p></div>
          </div>
        </div>
      </aside>
      {mobileOpen ? <button aria-label="Close navigation overlay" className="fixed inset-0 z-30 bg-foreground/20 lg:hidden" onClick={() => setMobileOpen(false)} /> : null}

      <main className="min-w-0 flex-1">
        <header className="sticky top-0 z-20 flex min-h-16 items-center justify-between gap-4 border-b border-border bg-card/95 px-4 backdrop-blur-sm sm:px-6 lg:px-8">
          <div className="flex min-w-0 items-center gap-3">
            <Button variant="ghost" size="icon" className="lg:hidden" aria-label="Open navigation" onClick={() => setMobileOpen(true)}><Menu /></Button>
            <div className="min-w-0"><p className="truncate text-xs text-muted-foreground">{eyebrow}</p><h1 className="truncate text-base font-semibold tracking-tight sm:text-lg">{title}</h1></div>
          </div>
          <div className="flex shrink-0 items-center gap-2 sm:gap-4">
            <span className="hidden items-center gap-2 text-xs text-muted-foreground sm:flex"><span className="status-dot bg-primary" />Data synced 22 min ago</span>
            <Button variant="ghost" size="icon" aria-label="Notifications" className="relative"><Bell /><span className="absolute right-1.5 top-1.5 size-1.5 rounded-full bg-destructive" /></Button>
            <span className="hidden size-8 place-items-center rounded-full bg-accent text-xs font-semibold text-accent-foreground sm:grid">MT</span>
          </div>
        </header>
        <div className="mx-auto w-full max-w-[1440px] p-4 sm:p-6 lg:p-8">{children}</div>
      </main>
    </div>
  );
}

export function PageHeading({ title, description, action }: { title: string; description?: string; action?: ReactNode }) {
  return <div className="mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-end"><div><p className="mb-1 text-xs font-medium uppercase tracking-[0.16em] text-primary">Field intelligence</p><h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">{title}</h2>{description ? <p className="mt-2 max-w-2xl text-sm text-muted-foreground">{description}</p> : null}</div>{action ? <div className="shrink-0">{action}</div> : null}</div>;
}

export function Breadcrumb({ label }: { label: string }) { return <div className="mb-5 flex items-center gap-1.5 text-xs text-muted-foreground"><span>Workspace</span><ChevronRight className="size-3" /><span className="text-foreground">{label}</span></div>; }