import type { Metadata } from "next";

export const metadata: Metadata = {
  robots: "noindex, nofollow",
};

export default function ShareLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border px-6 py-4">
        <div className="font-mono text-sm tracking-tight">
          <span className="text-muted-foreground">&gt;_</span>{" "}
          <span className="font-semibold">cmdblock</span>
          <span className="text-muted-foreground">.tech</span>
        </div>
      </header>
      <main className="flex-1">{children}</main>
    </div>
  );
}
