import { Button } from "@/components/ui/button";
import { logout } from "@/features/auth/actions";

interface DashboardHeaderProps {
  displayName: string;
}

export function DashboardHeader({ displayName }: DashboardHeaderProps) {
  return (
    <header className="border-b border-border px-6 md:px-16 lg:px-24 py-6 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <h1 className="font-sans text-xl font-700 tracking-tight">
          <span className="text-muted-foreground font-mono text-base font-normal">
            &gt;_{" "}
          </span>
          dashboard
        </h1>
      </div>

      <div className="flex items-center gap-4">
        <span className="text-sm text-muted-foreground">{displayName}</span>
        <form action={logout}>
          <Button variant="ghost" size="sm" type="submit">
            Logout
          </Button>
        </form>
      </div>
    </header>
  );
}
