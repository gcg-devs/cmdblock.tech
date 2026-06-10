"use client";

import { useCallback, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ContractHtmlTemplate } from "./contract-html-template";
import type { ContractOutputShape } from "../lib/contract-output";

interface ContractPdfPreviewProps {
  contractData: ContractOutputShape;
  contractId: string;
}

export function ContractPdfPreview({
  contractData,
  contractId,
}: ContractPdfPreviewProps) {
  const [downloading, setDownloading] = useState(false);

  const handleDownload = useCallback(async () => {
    setDownloading(true);
    try {
      const res = await fetch(`/api/contracts/${contractId}/pdf`);
      if (!res.ok) throw new Error("PDF generation failed");

      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `Proposal-${contractData.contract_number}.pdf`;
      a.click();
      URL.revokeObjectURL(url);
    } finally {
      setDownloading(false);
    }
  }, [contractId, contractData.contract_number]);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Button variant="outline" asChild>
            <Link href={`/dashboard/contracts/${contractId}`}>Back</Link>
          </Button>
          <span className="text-sm text-muted-foreground font-mono">
            Proposal-{contractData.contract_number}
          </span>
        </div>
        <Button onClick={handleDownload} disabled={downloading}>
          {downloading ? "Generating..." : "Download PDF"}
        </Button>
      </div>

      <div className="flex justify-center">
        <div
          className="bg-white shadow-xl border border-border"
          style={{ width: "960px" }}
        >
          <div style={{ borderTop: "8px solid #0a0a0a" }}>
            <ContractHtmlTemplate data={contractData} />
          </div>
        </div>
      </div>
    </div>
  );
}
