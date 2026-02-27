"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { randomUUID } from "crypto";

export async function toggleInvoiceShare(invoiceId: string) {
  const invoice = await prisma.invoice.findUnique({
    where: { id: invoiceId },
    select: { shareToken: true, isPublic: true },
  });

  if (!invoice) throw new Error("Invoice not found");

  if (!invoice.shareToken) {
    // First time sharing — generate token and enable
    await prisma.invoice.update({
      where: { id: invoiceId },
      data: { shareToken: randomUUID(), isPublic: true },
    });
  } else {
    // Toggle isPublic
    await prisma.invoice.update({
      where: { id: invoiceId },
      data: { isPublic: !invoice.isPublic },
    });
  }

  revalidatePath(`/dashboard/invoices/${invoiceId}`);
}
