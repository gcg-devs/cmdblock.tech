import type { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const metadata: Metadata = {
  title: "Dashboard — cmdblock.tech",
};

export default async function DashboardPage() {
  const [clientCount, projectCount, invoiceCount] = await Promise.all([
    prisma.client.count(),
    prisma.project.count(),
    prisma.invoice.count(),
  ]);

  const stats = [
    { label: "Clients", value: clientCount },
    { label: "Projects", value: projectCount },
    { label: "Invoices", value: invoiceCount },
  ];

  return (
    <div className="max-w-6xl">
      <div className="mb-8">
        <p className="text-sm tracking-[0.3em] uppercase text-muted-foreground mb-2">
          Overview
        </p>
        <h2 className="font-sans text-3xl font-700 tracking-tight">
          <span className="text-muted-foreground font-mono text-xl font-normal">
            &gt;_{" "}
          </span>
          dashboard
        </h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {stats.map((stat) => (
          <Card key={stat.label}>
            <CardHeader className="pb-2">
              <CardTitle className="text-xs tracking-[0.15em] uppercase text-muted-foreground font-mono font-normal">
                {stat.label}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="font-sans text-3xl font-700">{stat.value}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
