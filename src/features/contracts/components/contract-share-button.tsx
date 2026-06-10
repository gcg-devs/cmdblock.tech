"use client";

import { useState, useTransition } from "react";
import { Check, Copy, Link2Off, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { toggleContractShare } from "../share-actions";

interface ContractShareButtonProps {
  contractId: string;
  shareToken: string | null;
  isPublic: boolean;
}

export function ContractShareButton({
  contractId,
  shareToken,
  isPublic,
}: ContractShareButtonProps) {
  const [isPending, startTransition] = useTransition();
  const [copied, setCopied] = useState(false);

  const shareUrl =
    shareToken && isPublic
      ? `${typeof window !== "undefined" ? window.location.origin : ""}/share/contract/${shareToken}`
      : null;

  function handleToggle() {
    startTransition(async () => {
      await toggleContractShare(contractId);
    });
  }

  function handleCopy() {
    if (!shareUrl) return;
    navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant={isPublic ? "default" : "outline"}>
          <Share2 className="h-4 w-4 mr-2" />
          {isPublic ? "Shared" : "Share"}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80" align="end">
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium">Share Contract</p>
            {isPublic && (
              <Button
                variant="ghost"
                size="sm"
                onClick={handleToggle}
                disabled={isPending}
                className="text-muted-foreground h-auto py-1 px-2"
              >
                <Link2Off className="h-3 w-3 mr-1" />
                Revoke
              </Button>
            )}
          </div>

          {isPublic && shareUrl ? (
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <code className="flex-1 bg-muted px-2 py-1.5 text-xs font-mono truncate rounded">
                  {shareUrl}
                </code>
                <Button variant="outline" size="sm" onClick={handleCopy}>
                  {copied ? (
                    <Check className="h-3 w-3" />
                  ) : (
                    <Copy className="h-3 w-3" />
                  )}
                </Button>
              </div>
              <p className="text-xs text-muted-foreground">
                Anyone with this link can view and download this proposal.
              </p>
            </div>
          ) : (
            <div className="space-y-2">
              <p className="text-xs text-muted-foreground">
                Create a public proposal link that clients can view without
                logging in.
              </p>
              <Button
                onClick={handleToggle}
                disabled={isPending}
                className="w-full"
                size="sm"
              >
                {isPending ? "Creating..." : "Create Share Link"}
              </Button>
            </div>
          )}
        </div>
      </PopoverContent>
    </Popover>
  );
}
