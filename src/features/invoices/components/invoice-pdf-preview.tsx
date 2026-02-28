"use client";

import { useState, useCallback } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { InvoiceHtmlTemplate } from "./invoice-html-template";
import type { InvoiceOutputShape } from "../lib/invoice-output";

interface PaymentProtocolOption {
  id: string;
  label: string;
  bankName: string;
  accountName: string;
  accountNumber: string;
  isDefault: boolean;
}

interface InvoicePdfPreviewProps {
  invoiceData: InvoiceOutputShape;
  invoiceId: string;
  protocols: PaymentProtocolOption[];
}

export function InvoicePdfPreview({
  invoiceData,
  invoiceId,
  protocols,
}: InvoicePdfPreviewProps) {
  const defaultProtocol =
    protocols.find((p) => p.isDefault) ?? protocols[0] ?? null;
  const [selectedProtocolId, setSelectedProtocolId] = useState(
    defaultProtocol?.id ?? ""
  );
  const [downloading, setDownloading] = useState(false);

  const selectedProtocol = protocols.find((p) => p.id === selectedProtocolId);

  const currentData: InvoiceOutputShape = {
    ...invoiceData,
    payment_protocol: selectedProtocol
      ? {
          label: selectedProtocol.label,
          bank_name: selectedProtocol.bankName,
          account_name: selectedProtocol.accountName,
          account_number: selectedProtocol.accountNumber,
        }
      : null,
  };

  const handleDownload = useCallback(async () => {
    setDownloading(true);
    try {
      const params = new URLSearchParams();
      if (selectedProtocolId) params.set("protocolId", selectedProtocolId);

      const res = await fetch(`/api/invoices/${invoiceId}/pdf?${params}`);
      if (!res.ok) throw new Error("PDF generation failed");

      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `SOA-${invoiceData.soa_number}.pdf`;
      a.click();
      URL.revokeObjectURL(url);
    } catch (err) {
      console.error("PDF generation failed:", err);
    } finally {
      setDownloading(false);
    }
  }, [invoiceId, selectedProtocolId, invoiceData.soa_number]);

  return (
    <div className="space-y-6">
      {/* Toolbar */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Button variant="outline" asChild>
            <Link href={`/dashboard/invoices/${invoiceId}`}>Back</Link>
          </Button>
          <span className="text-sm text-muted-foreground font-mono">
            SOA-{invoiceData.soa_number}
          </span>
        </div>
        <div className="flex items-center gap-3">
          {protocols.length > 0 && (
            <div className="flex items-center gap-2">
              <span className="text-xs tracking-[0.15em] uppercase text-muted-foreground">
                Payment Protocol
              </span>
              <Select
                value={selectedProtocolId}
                onValueChange={setSelectedProtocolId}
              >
                <SelectTrigger className="w-[200px] bg-transparent">
                  <SelectValue placeholder="Select protocol" />
                </SelectTrigger>
                <SelectContent>
                  {protocols.map((p) => (
                    <SelectItem key={p.id} value={p.id}>
                      {p.label}
                      {p.isDefault ? " (Default)" : ""}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}
          <Button onClick={handleDownload} disabled={downloading}>
            {downloading ? "Generating..." : "Download PDF"}
          </Button>
        </div>
      </div>

      {/* Document viewer */}
      <div className="flex justify-center">
        <div
          className="bg-white shadow-xl border border-border"
          style={{ width: "960px" }}
        >
          <div style={{ borderTop: "8px solid #0a0a0a" }}>
            <InvoiceHtmlTemplate data={currentData} />
          </div>
        </div>
      </div>
    </div>
  );
}
