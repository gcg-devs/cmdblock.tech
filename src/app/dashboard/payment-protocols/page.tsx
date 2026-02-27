import { prisma } from "@/lib/prisma";
import { PaymentProtocolList } from "@/features/payment-protocols/components/payment-protocol-list";

export default async function PaymentProtocolsPage() {
  const protocols = await prisma.paymentProtocol.findMany({
    orderBy: [{ isDefault: "desc" }, { createdAt: "asc" }],
  });

  return (
    <div className="max-w-6xl animate-reveal reveal-delay-1">
      <div className="flex items-center justify-between mb-8">
        <div>
          <p className="text-sm tracking-[0.3em] uppercase text-muted-foreground mb-2">
            Settings
          </p>
          <h2 className="font-sans text-2xl font-700 tracking-tight">
            <span className="text-muted-foreground font-mono text-lg font-normal">
              &gt;_{" "}
            </span>
            payment_protocols
          </h2>
        </div>
      </div>

      <PaymentProtocolList protocols={protocols} />
    </div>
  );
}
