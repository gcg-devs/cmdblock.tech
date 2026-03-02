"use client";

import { useEffect, useActionState, useState, useRef } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { decodeQrFromImage } from "../lib/decode-qr-from-image";
import {
  createPaymentProtocol,
  updatePaymentProtocol,
  type PaymentProtocolFormState,
} from "../actions";

interface PaymentProtocolFormProps {
  protocol?: {
    id: string;
    label: string;
    bankName: string;
    accountName: string;
    accountNumber: string;
    qrData: string | null;
  };
  onDone?: () => void;
}

const initialState: PaymentProtocolFormState = {};

export function PaymentProtocolForm({ protocol, onDone }: PaymentProtocolFormProps) {
  const action = protocol
    ? updatePaymentProtocol.bind(null, protocol.id)
    : createPaymentProtocol;
  const [state, formAction, pending] = useActionState(action, initialState);
  const [qrData, setQrData] = useState(protocol?.qrData ?? "");
  const [qrDecoding, setQrDecoding] = useState(false);
  const [qrError, setQrError] = useState("");
  const [showManual, setShowManual] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (state.error) toast.error(state.error);
    if (state.success) {
      toast.success(state.success);
      onDone?.();
    }
  }, [state, onDone]);

  async function handleQrUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    setQrDecoding(true);
    setQrError("");
    try {
      const decoded = await decodeQrFromImage(file);
      if (decoded) {
        setQrData(decoded);
        setShowManual(false);
        toast.success("QR code decoded successfully");
      } else {
        setQrError("Could not decode QR from image. Try a clearer image or enter data manually.");
        setShowManual(true);
      }
    } catch {
      setQrError("Failed to process image. Try a different file.");
      setShowManual(true);
    } finally {
      setQrDecoding(false);
    }
  }

  return (
    <form action={formAction} className="space-y-4 max-w-md">
      <input type="hidden" name="qrData" value={qrData} />

      <div className="space-y-2">
        <Label className="text-xs tracking-[0.15em] uppercase">Label</Label>
        <Input
          name="label"
          defaultValue={protocol?.label}
          placeholder="e.g. UnionBank"
          required
        />
      </div>

      <div className="space-y-2">
        <Label className="text-xs tracking-[0.15em] uppercase">Bank Name</Label>
        <Input
          name="bankName"
          defaultValue={protocol?.bankName}
          placeholder="e.g. UnionBank of the Philippines"
          required
        />
      </div>

      <div className="space-y-2">
        <Label className="text-xs tracking-[0.15em] uppercase">Account Name</Label>
        <Input
          name="accountName"
          defaultValue={protocol?.accountName}
          placeholder="e.g. Ghegi Jimenez"
          required
        />
      </div>

      <div className="space-y-2">
        <Label className="text-xs tracking-[0.15em] uppercase">Account Number</Label>
        <Input
          name="accountNumber"
          defaultValue={protocol?.accountNumber}
          placeholder="e.g. 1094 5678 9012"
          required
        />
      </div>

      {/* QR Code Section */}
      <div className="space-y-2 rounded-md border border-dashed border-muted-foreground/30 p-4">
        <Label className="text-xs tracking-[0.15em] uppercase">
          QR Code <span className="text-muted-foreground">(Optional)</span>
        </Label>

        <div className="space-y-3">
          <div>
            <input
              ref={fileRef}
              type="file"
              accept="image/*"
              onChange={handleQrUpload}
              className="hidden"
            />
            <Button
              type="button"
              variant="outline"
              size="sm"
              disabled={qrDecoding}
              onClick={() => fileRef.current?.click()}
            >
              {qrDecoding ? "Decoding..." : "Upload QR Image"}
            </Button>
          </div>

          {qrError && (
            <p className="text-xs text-destructive">{qrError}</p>
          )}

          {qrData && (
            <div className="space-y-1">
              <p className="text-xs text-muted-foreground">Decoded QR data:</p>
              <pre className="text-xs bg-muted p-2 rounded overflow-auto max-h-20 whitespace-pre-wrap break-all">
                {qrData}
              </pre>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="text-xs h-7"
                onClick={() => { setQrData(""); if (fileRef.current) fileRef.current.value = ""; }}
              >
                Clear QR
              </Button>
            </div>
          )}

          {(showManual || (!qrData && !qrDecoding)) && (
            <div className="space-y-1">
              <button
                type="button"
                className="text-xs text-muted-foreground underline"
                onClick={() => setShowManual(!showManual)}
              >
                {showManual ? "Hide manual entry" : "Or enter QR data manually"}
              </button>
              {showManual && (
                <Textarea
                  value={qrData}
                  onChange={(e) => setQrData(e.target.value)}
                  placeholder="Paste EMVCo QR data string here..."
                  className="text-xs font-mono h-20"
                />
              )}
            </div>
          )}
        </div>
      </div>

      <div className="flex items-center gap-3">
        <Button type="submit" disabled={pending}>
          {pending ? "Saving..." : protocol ? "Update" : "Create"}
        </Button>
        {onDone && (
          <Button type="button" variant="outline" onClick={onDone}>
            Cancel
          </Button>
        )}
      </div>
    </form>
  );
}
