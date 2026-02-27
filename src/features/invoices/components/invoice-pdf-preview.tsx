"use client";

import { useState, useRef, useCallback } from "react";
import Link from "next/link";
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { InvoiceHtmlTemplate } from "./invoice-html-template";
import { buildInvoiceOutput, type InvoiceOutputShape } from "../lib/invoice-output";

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
  const templateRef = useRef<HTMLDivElement>(null);

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
    if (!templateRef.current) return;
    setDownloading(true);

    try {
      const canvas = await html2canvas(templateRef.current, {
        scale: 2,
        useCORS: true,
        backgroundColor: "#ffffff",
      });

      const imgWidth = 210; // A4 width in mm
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      const pdf = new jsPDF("p", "mm", "a4");

      // Handle multi-page if content is tall
      const pageHeight = 297; // A4 height in mm
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
          <div
            ref={templateRef}
            style={{ borderTop: "8px solid #0a0a0a" }}
          >
            <InvoiceHtmlTemplate data={currentData} />
          </div>
        </div>
      </div>
    </div>
  );
}
