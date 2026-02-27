import { ClientForm } from "@/features/clients/components/client-form";

export default function NewClientPage() {
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
          new client
        </h2>
      </div>

      <ClientForm />
    </div>
  );
}
