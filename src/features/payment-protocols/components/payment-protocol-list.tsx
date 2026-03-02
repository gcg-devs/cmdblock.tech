"use client";

import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { DeleteEntityDialog } from "@/components/delete-entity-dialog";
import { PaymentProtocolForm } from "./payment-protocol-form";
import { BrandedQr } from "./branded-qr";
import { deletePaymentProtocol, setDefaultPaymentProtocol } from "../actions";

interface Protocol {
  id: string;
  label: string;
  bankName: string;
  accountName: string;
  accountNumber: string;
  qrData: string | null;
  isDefault: boolean;
}

interface PaymentProtocolListProps {
  protocols: Protocol[];
}

export function PaymentProtocolList({ protocols }: PaymentProtocolListProps) {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [showNew, setShowNew] = useState(false);

  return (
    <div className="space-y-8">
      {showNew ? (
        <div>
          <h3 className="text-xs tracking-[0.15em] uppercase text-muted-foreground mb-4">
            New Payment Protocol
          </h3>
          <PaymentProtocolForm onDone={() => setShowNew(false)} />
        </div>
      ) : (
        <Button onClick={() => setShowNew(true)}>New Protocol</Button>
      )}

      {protocols.length === 0 ? (
        <p className="text-sm text-muted-foreground">
          No payment protocols yet. Create one above.
        </p>
      ) : (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Label</TableHead>
              <TableHead>Bank</TableHead>
              <TableHead>Account Name</TableHead>
              <TableHead>Account No.</TableHead>
              <TableHead>QR</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {protocols.map((p) => (
              <TableRow key={p.id}>
                {editingId === p.id ? (
                  <TableCell colSpan={6}>
                    <PaymentProtocolForm
                      protocol={p}
                      onDone={() => setEditingId(null)}
                    />
                  </TableCell>
                ) : (
                  <>
                    <TableCell className="font-medium">
                      {p.label}
                      {p.isDefault && (
                        <Badge variant="outline" className="ml-2">
                          Default
                        </Badge>
                      )}
                    </TableCell>
                    <TableCell>{p.bankName}</TableCell>
                    <TableCell>{p.accountName}</TableCell>
                    <TableCell className="font-mono">{p.accountNumber}</TableCell>
                    <TableCell>
                      {p.qrData ? (
                        <BrandedQr data={p.qrData} size={48} />
                      ) : (
                        <span className="text-xs text-muted-foreground">—</span>
                      )}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-2">
                        {!p.isDefault && (
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setDefaultPaymentProtocol(p.id)}
                          >
                            Set Default
                          </Button>
                        )}
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setEditingId(p.id)}
                        >
                          Edit
                        </Button>
                        <DeleteEntityDialog
                          entityName="Protocol"
                          onDelete={deletePaymentProtocol.bind(null, p.id)}
                        />
                      </div>
                    </TableCell>
                  </>
                )}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </div>
  );
}
