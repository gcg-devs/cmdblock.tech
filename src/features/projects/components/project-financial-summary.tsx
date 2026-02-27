import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface ProjectFinancialSummaryProps {
  totalContractValue: number;
  amountBilled: number;
  amountCollected: number;
  currency: string;
}

function currencySymbol(c: string) {
  return c === "PHP" ? "₱" : "$";
}

function fmt(amount: number, currency: string) {
  return `${currencySymbol(currency)}${amount.toLocaleString()}`;
}

export function ProjectFinancialSummary({
  totalContractValue,
  amountBilled,
  amountCollected,
  currency,
}: ProjectFinancialSummaryProps) {
  const remaining = totalContractValue - amountCollected;
  const progressPct =
    totalContractValue > 0
      ? Math.round((amountCollected / totalContractValue) * 100)
      : 0;

  const items = [
    { label: "Contract Value", value: fmt(totalContractValue, currency) },
    { label: "Billed", value: fmt(amountBilled, currency) },
    { label: "Collected", value: fmt(amountCollected, currency) },
    { label: "Remaining", value: fmt(remaining, currency) },
  ];

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {items.map((item) => (
          <Card key={item.label}>
            <CardHeader className="pb-2">
              <CardTitle className="text-xs tracking-[0.15em] uppercase text-muted-foreground font-mono font-normal">
                {item.label}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="font-mono text-lg font-bold">{item.value}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Progress bar */}
      <div className="space-y-1">
        <div className="flex justify-between text-xs text-muted-foreground">
          <span>Collection Progress</span>
          <span>{progressPct}%</span>
        </div>
        <div className="h-2 bg-secondary w-full">
          <div
            className="h-full bg-foreground transition-all duration-500"
            style={{ width: `${progressPct}%` }}
          />
        </div>
      </div>
    </div>
  );
}
