import { Link, useRouterState } from "@tanstack/react-router";
import {
  Activity,
  Bell,
  ChartNoAxesCombined,
  ChevronDown,
  ChevronRight,
  Droplets,
  Layers,
  LayoutDashboard,
  Map,
  Menu,
  Moon,
  Settings,
  ShieldCheck,
  Sprout,
  Sun,
  TriangleAlert,
  X,
} from "lucide-react";
import { useState, type ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/hooks/use-theme";

interface NavItem {
  label: string;
  to: string;
  icon: typeof LayoutDashboard;
  count?: number;
  badge?: string;
}

const mainNav: NavItem[] = [
  { label: "Dashboard", to: "/", icon: LayoutDashboard },
  { label: "Farms & Fields", to: "/farms", icon: Map },
  { label: "Crop Health", to: "/crop-health", icon: Sprout },
  { label: "Irrigation AI", to: "/irrigation", icon: Droplets },
];

const operationsNav: NavItem[] = [
  { label: "Alerts & Actions", to: "/alerts", icon: TriangleAlert, count: 3 },
  { label: "Agronomic Analytics", to: "/analytics", icon: ChartNoAxesCombined },
  { label: "System Settings", to: "/settings", icon: Settings },
];

export function AppShell({
  children,
  title,
  eyebrow = "Green Valley Farm",
}: {
  children: ReactNode;
  title: string;
  eyebrow?: string;
}) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const pathname = useRouterState({ select: (state) => state.location.pathname });
  const isActive = (to: string) => (to === "/" ? pathname === "/" : pathname.startsWith(to));

  const renderNavGroup = (items: NavItem[], onNavClick?: () => void) => (
    <nav className="space-y-1">
      {items.map(({ label, to, icon: Icon, count, badge }) => {
        const active = isActive(to);
        return (
          <Link
            key={to}
            to={to}
            onClick={onNavClick}
            activeOptions={{ exact: to === "/" }}
            className={`group flex items-center gap-3 rounded-lg px-3 py-2 text-xs font-medium transition-all ${
              active
                ? "bg-emerald-500/12 text-emerald-800 dark:bg-blue-600/25 dark:text-blue-300 font-semibold shadow-xs"
                : "text-muted-foreground hover:bg-muted/70 hover:text-foreground"
            }`}
          >
            <Icon
              className={`size-4 shrink-0 transition-colors ${
                active
                  ? "text-emerald-700 dark:text-blue-400"
                  : "text-muted-foreground group-hover:text-foreground"
              }`}
              strokeWidth={active ? 2.2 : 1.8}
            />
            <span className="min-w-0 flex-1 truncate">{label}</span>
            {count ? (
              <span className="grid size-5 shrink-0 place-items-center rounded-full bg-rose-500/15 text-[10px] font-bold text-rose-700 dark:text-rose-400">
                {count}
              </span>
            ) : null}
            {badge ? (
              <span className="rounded bg-muted px-1.5 py-0.5 text-[9px] font-mono text-muted-foreground">
                {badge}
              </span>
            ) : null}
          </Link>
        );
      })}
    </nav>
  );

  return (
    <div className="min-h-screen bg-background text-foreground flex">
      {/* Desktop Permanent Professional Sidebar */}
      <aside className="hidden md:flex md:w-64 md:shrink-0 md:flex-col border-r border-sidebar-border bg-sidebar h-screen sticky top-0 overflow-y-auto">
        {/* Brand Header */}
        <div className="flex h-16 shrink-0 items-center justify-between border-b border-sidebar-border px-4.5">
          <Link to="/" className="flex items-center gap-3">
            <span className="grid size-8 place-items-center rounded-lg bg-emerald-600 dark:bg-blue-600 text-white shadow-xs">
              <Activity className="size-4.5" strokeWidth={2.25} />
            </span>
            <div className="flex flex-col">
              <span className="text-sm font-bold tracking-tight text-sidebar-foreground">
                Ceres Intelligence
              </span>
              <span className="text-[10px] font-mono text-emerald-700 dark:text-blue-400 font-semibold">
                AI Precision Ag v2.4
              </span>
            </div>
          </Link>
        </div>

        {/* Active Farm Switcher Card */}
        <div className="p-3">
          <div className="flex items-center justify-between rounded-lg border border-sidebar-border/80 bg-background/60 dark:bg-sidebar-accent/50 p-2.5 shadow-2xs">
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="grid size-7 shrink-0 place-items-center rounded-md bg-emerald-500/15 text-emerald-700 dark:bg-blue-600/20 dark:text-blue-300">
                <Layers className="size-3.5" />
              </div>
              <div className="min-w-0">
                <p className="truncate text-xs font-semibold text-foreground">Green Valley Farm</p>
                <p className="truncate text-[10px] text-muted-foreground flex items-center gap-1">
                  <span className="size-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  12 Active Zones
                </p>
              </div>
            </div>
            <ChevronDown className="size-3.5 text-muted-foreground shrink-0" />
          </div>
        </div>

        {/* Navigation Groups */}
        <div className="flex-1 px-3 space-y-4 pt-1">
          <div>
            <p className="px-3 pb-1.5 text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
              Core Workspace
            </p>
            {renderNavGroup(mainNav)}
          </div>

          <div>
            <p className="px-3 pb-1.5 text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
              Monitoring & Operations
            </p>
            {renderNavGroup(operationsNav)}
          </div>
        </div>

        {/* Sidebar Footer */}
        <div className="shrink-0 border-t border-sidebar-border p-3 bg-sidebar">
          {/* User Profile */}
          <div className="flex items-center gap-2.5 rounded-lg p-2 hover:bg-muted/50 transition-colors">
            <span className="grid size-8 shrink-0 place-items-center rounded-full bg-emerald-600/10 text-emerald-800 dark:bg-blue-600/20 dark:text-blue-300 text-xs font-bold ring-1 ring-emerald-500/20">
              MT
            </span>
            <div className="min-w-0 flex-1">
              <p className="truncate text-xs font-semibold text-foreground">Morgan Taylor</p>
              <p className="truncate text-[10px] text-muted-foreground flex items-center gap-1">
                <ShieldCheck className="size-3 text-emerald-600 dark:text-blue-400" />
                Farm Operations
              </p>
            </div>
          </div>
        </div>
      </aside>

      {/* Mobile Drawer (Instant Clean Modal - No Sliding Animation) */}
      {mobileOpen ? (
        <div className="fixed inset-0 z-50 flex md:hidden">
          <button
            type="button"
            aria-label="Close navigation overlay"
            className="fixed inset-0 bg-black/60 backdrop-blur-xs"
            onClick={() => setMobileOpen(false)}
          />
          <aside className="relative z-10 flex w-72 flex-col border-r border-sidebar-border bg-sidebar p-0 shadow-2xl h-full overflow-y-auto">
            <div className="flex h-16 items-center justify-between border-b border-sidebar-border px-5">
              <Link to="/" className="flex items-center gap-3" onClick={() => setMobileOpen(false)}>
                <span className="grid size-8 place-items-center rounded-md bg-emerald-600 dark:bg-blue-600 text-white">
                  <Activity className="size-4" strokeWidth={2.25} />
                </span>
                <span className="text-sm font-semibold tracking-tight text-sidebar-foreground">
                  Ceres Intelligence
                </span>
              </Link>
              <Button
                variant="ghost"
                size="icon"
                aria-label="Close navigation"
                onClick={() => setMobileOpen(false)}
              >
                <X className="size-5" />
              </Button>
            </div>

            <div className="p-4 space-y-4">
              <div>
                <p className="px-3 pb-1 text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                  Core Workspace
                </p>
                {renderNavGroup(mainNav, () => setMobileOpen(false))}
              </div>

              <div>
                <p className="px-3 pb-1 text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                  Monitoring & Tools
                </p>
                {renderNavGroup(operationsNav, () => setMobileOpen(false))}
              </div>
            </div>

            <div className="mt-auto border-t border-sidebar-border p-4 space-y-3">
              <button
                type="button"
                onClick={toggleTheme}
                className="flex w-full items-center justify-between rounded-md border border-border/80 bg-card px-3 py-2 text-xs font-medium text-foreground"
              >
                <span className="flex items-center gap-2">
                  {theme === "dark" ? (
                    <Moon className="size-4 text-blue-400" />
                  ) : (
                    <Sun className="size-4 text-amber-500" />
                  )}
                  <span>{theme === "dark" ? "Dark Slate" : "Light Mode"}</span>
                </span>
                <span className="text-[10px] font-mono uppercase text-muted-foreground">
                  Toggle
                </span>
              </button>
            </div>
          </aside>
        </div>
      ) : null}

      {/* Main Content Area */}
      <main className="min-w-0 flex-1 overflow-x-hidden">
        <header className="sticky top-0 z-20 flex min-h-16 items-center justify-between gap-4 border-b border-border bg-card/95 px-4 backdrop-blur-sm sm:px-6 lg:px-8">
          <div className="flex min-w-0 items-center gap-3">
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              aria-label="Open navigation"
              onClick={() => setMobileOpen(true)}
            >
              <Menu className="size-5" />
            </Button>
            <div className="min-w-0">
              <p className="truncate text-xs text-muted-foreground">{eyebrow}</p>
              <h1 className="truncate text-base font-semibold tracking-tight sm:text-lg text-foreground">
                {title}
              </h1>
            </div>
          </div>
          <div className="flex shrink-0 items-center gap-2 sm:gap-3">
            <span className="hidden items-center gap-2 text-xs text-muted-foreground lg:flex">
              <span className="status-dot bg-emerald-500" />
              Data synced 22 min ago
            </span>

            {/* Prominent Theme Toggle Button */}
            <Button
              variant="outline"
              size="sm"
              onClick={toggleTheme}
              className="flex items-center gap-1.5 h-8 px-2.5 text-xs font-medium border-border hover:bg-muted"
              title={`Switch to ${theme === "dark" ? "light" : "dark"} theme`}
              aria-label="Toggle dark/light theme"
            >
              {theme === "dark" ? (
                <>
                  <Sun className="size-3.5 text-amber-400" />
                  <span className="hidden sm:inline">Light</span>
                </>
              ) : (
                <>
                  <Moon className="size-3.5 text-slate-700" />
                  <span className="hidden sm:inline">Dark</span>
                </>
              )}
            </Button>

            <Button
              variant="ghost"
              size="icon"
              aria-label="Notifications"
              className="relative size-8"
            >
              <Bell className="size-4" />
              <span className="absolute right-1.5 top-1.5 size-2 rounded-full bg-rose-600" />
            </Button>

            <span className="hidden size-8 place-items-center rounded-full bg-emerald-600/10 text-emerald-800 dark:bg-blue-600/20 dark:text-blue-300 text-xs font-bold sm:grid">
              MT
            </span>
          </div>
        </header>
        <div className="mx-auto w-full max-w-[1440px] p-4 sm:p-6 lg:p-8">{children}</div>
      </main>
    </div>
  );
}

export function PageHeading({
  title,
  description,
  action,
}: {
  title: string;
  description?: string;
  action?: ReactNode;
}) {
  return (
    <div className="mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
      <div>
        <p className="mb-1 text-xs font-semibold uppercase tracking-wider text-emerald-700 dark:text-blue-400">
          Field intelligence
        </p>
        <h2 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">{title}</h2>
        {description ? (
          <p className="mt-1.5 max-w-2xl text-xs sm:text-sm text-muted-foreground">{description}</p>
        ) : null}
      </div>
      {action ? <div className="shrink-0">{action}</div> : null}
    </div>
  );
}

export function Breadcrumb({ label }: { label: string }) {
  return (
    <div className="mb-5 flex items-center gap-1.5 text-xs text-muted-foreground">
      <span>Workspace</span>
      <ChevronRight className="size-3" />
      <span className="text-foreground font-medium">{label}</span>
    </div>
  );
}
