import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { Button } from "@/components/ui/button";
import { ClientsTable } from "@/features/clients/components/clients-table";

export default async function ClientsPage() {
  const clients = await prisma.client.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="max-w-6xl animate-reveal reveal-delay-1">
      <div className="flex items-center justify-between mb-8">
        <div>
          <p className="text-sm tracking-[0.3em] uppercase text-muted-foreground mb-2">
            Manage
          </p>
          <h2 className="font-sans text-2xl font-700 tracking-tight">
            <span className="text-muted-foreground font-mono text-lg font-normal">
              &gt;_{" "}
            </span>
            clients
          </h2>
        </div>
        <Button asChild>
          <Link href="/dashboard/clients/new">New Client</Link>
        </Button>
      </div>

      <ClientsTable clients={clients} />
    </div>
  );
}
