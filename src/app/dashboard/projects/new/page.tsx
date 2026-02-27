import { prisma } from "@/lib/prisma";
import { ProjectForm } from "@/features/projects/components/project-form";

export default async function NewProjectPage() {
  const clients = await prisma.client.findMany({
    orderBy: { name: "asc" },
    select: { id: true, name: true },
  });

  return (
    <div className="max-w-6xl animate-reveal reveal-delay-1">
      <div className="mb-8">
        <p className="text-sm tracking-[0.3em] uppercase text-muted-foreground mb-2">
          Create
        </p>
        <h2 className="font-sans text-2xl font-700 tracking-tight">
          <span className="text-muted-foreground font-mono text-lg font-normal">
            &gt;_{" "}
          </span>
          new project
        </h2>
      </div>

      {clients.length === 0 ? (
        <p className="text-sm text-muted-foreground">
          Create a client first before adding a project.
        </p>
      ) : (
        <ProjectForm clients={clients} />
      )}
    </div>
  );
}
