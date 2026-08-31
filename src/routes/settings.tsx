import { createFileRoute } from "@tanstack/react-router";
import { Bell, Database, Moon, SlidersHorizontal, Sun } from "lucide-react";
import { AppShell, Breadcrumb, PageHeading } from "@/components/layout/app-shell";
import { useTheme } from "@/hooks/use-theme";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/settings")({
  head: () => ({
    meta: [
      { title: "Settings — Ceres Intelligence" },
      { name: "description", content: "Manage monitoring preferences and data settings." },
      { property: "og:title", content: "Settings — Ceres Intelligence" },
      { property: "og:description", content: "Manage monitoring preferences and data settings." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: SettingsPage,
});

function SettingsPage() {
  const { theme, toggleTheme } = useTheme();

  return (
    <AppShell title="Settings">
      <Breadcrumb label="Settings" />
      <PageHeading
        title="Settings"
        description="Manage how Ceres Intelligence monitors and reports on your fields."
      />
      <div className="grid max-w-4xl gap-4">
        {/* Theme Appearance Setting */}
        <div className="panel flex items-center gap-4 rounded-lg p-5">
          <span className="grid size-10 shrink-0 place-items-center rounded-md bg-accent text-accent-foreground">
            {theme === "dark" ? (
              <Moon className="size-4 text-blue-400" />
            ) : (
              <Sun className="size-4 text-amber-500" />
            )}
          </span>
          <div className="min-w-0 flex-1">
            <h3 className="text-sm font-medium">Interface Appearance</h3>
            <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
              Toggle between high-contrast light mode and deep obsidian slate dark mode.
            </p>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={toggleTheme}
            className="flex items-center gap-2 h-9 px-3 text-xs font-semibold capitalize"
          >
            {theme === "dark" ? (
              <>
                <Sun className="size-3.5 text-amber-400" /> Switch to Light
              </>
            ) : (
              <>
                <Moon className="size-3.5 text-slate-700" /> Switch to Dark
              </>
            )}
          </Button>
        </div>

        <SettingRow
          icon={Bell}
          title="Alert thresholds"
          description="Choose when crop health and moisture changes create an alert."
          value="Configured"
        />
        <SettingRow
          icon={SlidersHorizontal}
          title="Analysis preferences"
          description="Set the default measurement view for the zone status map."
          value="Vegetation"
        />
        <SettingRow
          icon={Database}
          title="Data connection"
          description="Your workspace is using the local demonstration data service."
          value="Demo data"
        />
      </div>
    </AppShell>
  );
}
function SettingRow({
  icon: Icon,
  title,
  description,
  value,
}: {
  icon: typeof Bell;
  title: string;
  description: string;
  value: string;
}) {
  return (
    <div className="panel flex items-center gap-4 rounded-lg p-5">
      <span className="grid size-10 shrink-0 place-items-center rounded-md bg-accent text-accent-foreground">
        <Icon className="size-4" />
      </span>
      <div className="min-w-0 flex-1">
        <h3 className="text-sm font-medium">{title}</h3>
        <p className="mt-1 text-xs leading-relaxed text-muted-foreground">{description}</p>
      </div>
      <span className="shrink-0 text-xs font-medium text-primary">{value}</span>
    </div>
  );
}
