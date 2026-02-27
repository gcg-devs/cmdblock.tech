"use client";

import { useState, useRef, useCallback } from "react";
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";
import { Download } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { InvoiceHtmlTemplate } from "./invoice-html-template";
import type { InvoiceOutputShape } from "../lib/invoice-output";

interface SharedInvoiceViewProps {
  invoiceData: InvoiceOutputShape;
}

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

function formatAmount(amount: number, currency: string): string {
  const symbol = currency === "USD" ? "$" : "₱";
  return `${symbol} ${amount.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

export function SharedInvoiceView({ invoiceData }: SharedInvoiceViewProps) {
  const [downloading, setDownloading] = useState(false);
  const templateRef = useRef<HTMLDivElement>(null);

  const handleDownload = useCallback(async () => {
    if (!templateRef.current) return;
    setDownloading(true);

    try {
      const canvas = await html2canvas(templateRef.current, {
        scale: 2,
        useCORS: true,
        backgroundColor: "#ffffff",
      });

      const imgWidth = 210;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      const pdf = new jsPDF("p", "mm", "a4");
      const pageHeight = 297;
      let remainingHeight = imgHeight;
      let yOffset = 0;

      while (remainingHeight > 0) {
        if (yOffset > 0) pdf.addPage();
        pdf.addImage(
          canvas.toDataURL("image/png"),
          "PNG",
          0,
          -yOffset,
          imgWidth,
          imgHeight
        );
        remainingHeight -= pageHeight;
        yOffset += pageHeight;
      }

      pdf.save(`SOA-${invoiceData.soa_number}.pdf`);
    } catch (err) {
      console.error("PDF generation failed:", err);
    } finally {
      setDownloading(false);
    }
  }, [invoiceData.soa_number]);

  const statusVariant =
    invoiceData.status === "PAID"
      ? "default"
      : invoiceData.status === "OVERDUE"
        ? "destructive"
        : "outline";

  return (
    <div className="flex gap-6 p-6 max-w-[1200px] mx-auto">
      {/* Main: Invoice Preview */}
      <div className="flex-1 min-w-0">
        <div
          className="bg-white shadow-lg border border-border mx-auto"
          style={{ maxWidth: "960px" }}
        >
          <div ref={templateRef} style={{ borderTop: "8px solid #0a0a0a" }}>
            <InvoiceHtmlTemplate data={invoiceData} />
          </div>
        </div>
      </div>

      {/* Sidebar: Details */}
      <div className="w-72 shrink-0 space-y-4">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-xs tracking-[0.15em] uppercase text-muted-foreground font-mono font-normal">
              Invoice Details
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <p className="text-xs text-muted-foreground mb-1">SOA Number</p>
              <p className="font-mono text-sm font-medium">
                {invoiceData.soa_number}
              </p>
            </div>

            <div>
              <p className="text-xs text-muted-foreground mb-1">Status</p>
              <Badge variant={statusVariant}>{invoiceData.status}</Badge>
            </div>

            <div>
              <p className="text-xs text-muted-foreground mb-1">Due Date</p>
              <p className="font-mono text-sm">
                {formatDate(invoiceData.due_date)}
              </p>
            </div>

            <div>
              <p className="text-xs text-muted-foreground mb-1">Amount Due</p>
              <p className="font-mono text-lg font-bold">
                {formatAmount(invoiceData.total_amount, invoiceData.currency)}
              </p>
            </div>

            {invoiceData.client_name && (
              <div>
                <p className="text-xs text-muted-foreground mb-1">Billed To</p>
                <p className="text-sm">{invoiceData.client_name}</p>
              </div>
            )}

            {invoiceData.project_title && (
              <div>
                <p className="text-xs text-muted-foreground mb-1">Project</p>
                <p className="text-sm">{invoiceData.project_title}</p>
              </div>
            )}
          </CardContent>
        </Card>

        <Button
          onClick={handleDownload}
          disabled={downloading}
          className="w-full"
          size="lg"
        >
          <Download className="h-4 w-4 mr-2" />
          {downloading ? "Generating..." : "Download PDF"}
        </Button>
      </div>
    </div>
  );
}
