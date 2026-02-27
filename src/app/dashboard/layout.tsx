import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { verifySession } from "@/features/auth/lib";
import { SidebarProvider, SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";
import { DashboardSidebar } from "@/features/dashboard/components/dashboard-sidebar";

export const metadata: Metadata = {
  robots: {
    index: false,
    follow: false,
  },
};

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await verifySession();
  if (!session) redirect("/login");

  const user = await prisma.user.findUnique({
    where: { id: session.userId },
    select: { displayName: true },
  });

  if (!user) redirect("/login");

  return (
    <SidebarProvider>
      <DashboardSidebar displayName={user.displayName} />
      <SidebarInset>
        <header className="flex items-center gap-2 border-b border-border px-6 py-4">
          <SidebarTrigger className="-ml-1" />
        </header>
        <main className="flex-1 px-6 py-6">{children}</main>
      </SidebarInset>
    </SidebarProvider>
  );
}
