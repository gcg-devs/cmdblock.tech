import { ContractForm } from "@/features/contracts/components/contract-form";

export default function NewContractPage() {
  return (
    <div className="max-w-6xl animate-reveal reveal-delay-1">
      <div className="mb-8">
        <p className="text-sm tracking-[0.3em] uppercase text-muted-foreground mb-2">
          Contracts
        </p>
        <h2 className="font-sans text-2xl font-700 tracking-tight">
          <span className="text-muted-foreground font-mono text-lg font-normal">
            &gt;_{" "}
          </span>
          new_contract
        </h2>
      </div>

      <ContractForm />
    </div>
  );
}
