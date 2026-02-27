import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { verifySession } from "@/features/auth/lib";
import { DashboardHeader } from "@/features/dashboard/components/dashboard-header";

export const metadata: Metadata = {
  title: "Dashboard — cmdblock.tech",
};

export default async function DashboardPage() {
  const session = await verifySession();
  if (!session) redirect("/login");

  const user = await prisma.user.findUnique({
    where: { id: session.userId },
    select: { displayName: true },
  });

  if (!user) redirect("/login");

  return (
    <div className="min-h-screen">
      <DashboardHeader displayName={user.displayName} />

      <main className="px-6 md:px-16 lg:px-24 py-16">
        <div className="max-w-4xl">
          <p className="text-sm tracking-[0.3em] uppercase text-muted-foreground mb-6">
            Welcome back
          </p>
          <h2 className="font-sans text-3xl sm:text-4xl font-700 tracking-tight mb-4">
            {user.displayName}
          </h2>
          <p className="text-muted-foreground text-sm">
            You&apos;re logged in to the cmdblock.tech internal dashboard.
          </p>
        </div>
      </main>
    </div>
  );
}
