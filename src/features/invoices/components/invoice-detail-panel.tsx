"use client";

import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import { InvoiceStatusControl } from "./invoice-status-control";

interface LineItem {
  id: string;
  description: string;
  amount: number;
}

interface InvoiceDetail {
  id: string;
  invoiceNumber: string;
  type: string;
  status: "DRAFT" | "SENT" | "PAID" | "OVERDUE";
  issueDate: string;
  dueDate: string;
  totalAmount: number;
  lineItems: LineItem[];
  project: {
    id: string;
    title: string;
    currency: string;
    client: { name: string };
  } | null;
}

interface InvoiceDetailPanelProps {
  invoice: InvoiceDetail | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

function statusVariant(status: string) {
  switch (status) {
    case "PAID":
      return "default" as const;
    case "OVERDUE":
      return "destructive" as const;
    default:
      return "outline" as const;
  }
}

export function InvoiceDetailPanel({
  invoice,
  open,
  onOpenChange,
}: InvoiceDetailPanelProps) {
  if (!invoice) return null;

  const currencySymbol = invoice.project?.currency === "USD" ? "$" : "₱";

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="sm:max-w-lg overflow-y-auto">
        <SheetHeader className="pb-0">
          <div className="flex items-center justify-between pr-6">
            <div>
              <SheetDescription className="text-xs tracking-[0.3em] uppercase mb-1">
                Invoice
              </SheetDescription>
              <SheetTitle className="font-mono text-xl tracking-tight">
                {invoice.invoiceNumber}
              </SheetTitle>
            </div>
            <InvoiceStatusControl
              invoiceId={invoice.id}
              currentStatus={invoice.status}
            />
          </div>
        </SheetHeader>

        <div className="px-6 pb-6 space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-xs tracking-[0.15em] uppercase text-muted-foreground mb-1">
                Status
              </p>
              <Badge variant={statusVariant(invoice.status)}>
                {invoice.status}
              </Badge>
            </div>
            <div>
              <p className="text-xs tracking-[0.15em] uppercase text-muted-foreground mb-1">
                Type
              </p>
              <p className="text-sm">{invoice.type}</p>
            </div>
            <div>
              <p className="text-xs tracking-[0.15em] uppercase text-muted-foreground mb-1">
                Issue Date
              </p>
              <p className="font-mono text-sm">
                {new Date(invoice.issueDate).toLocaleDateString()}
              </p>
            </div>
            <div>
              <p className="text-xs tracking-[0.15em] uppercase text-muted-foreground mb-1">
                Due Date
              </p>
              <p className="font-mono text-sm">
                {new Date(invoice.dueDate).toLocaleDateString()}
              </p>
            </div>
          </div>

          {invoice.project && (
            <>
              <Separator />
              <div>
                <p className="text-xs tracking-[0.15em] uppercase text-muted-foreground mb-2">
                  Project
                </p>
                <p className="text-sm">
                  <Link
                    href={`/dashboard/projects/${invoice.project.id}`}
                    className="hover:underline"
                  >
                    {invoice.project.title}
                  </Link>
                  <span className="text-muted-foreground">
                    {" "}— {invoice.project.client.name}
                  </span>
                </p>
              </div>
            </>
          )}

          <Separator />

          <div>
            <p className="text-xs tracking-[0.15em] uppercase text-muted-foreground mb-3">
              Line Items
            </p>
            <div className="space-y-2">
              {invoice.lineItems.map((item) => (
                <div key={item.id} className="flex justify-between text-sm">
                  <span className="text-muted-foreground">
                    {item.description}
                  </span>
                  <span className="font-mono">
                    {currencySymbol}
                    {item.amount.toLocaleString()}
                  </span>
                </div>
              ))}
            </div>
            <Separator className="my-3" />
            <div className="flex justify-between text-sm font-bold">
              <span>Total</span>
              <span className="font-mono">
                {currencySymbol}
                {invoice.totalAmount.toLocaleString()}
              </span>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
