"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import type { InvoiceStatus } from "@/generated/prisma/client";

export type InvoiceFormState = {
  error?: string;
  success?: string;
};

async function generateInvoiceNumber(): Promise<string> {
  const year = new Date().getFullYear();
  const prefix = `${year}-`;

  const lastInvoice = await prisma.invoice.findFirst({
    where: { invoiceNumber: { startsWith: prefix } },
    orderBy: { invoiceNumber: "desc" },
    select: { invoiceNumber: true },
  });

  let nextNum = 1;
  if (lastInvoice) {
    const lastNum = parseInt(lastInvoice.invoiceNumber.split("-")[1], 10);
    nextNum = lastNum + 1;
  }

  return `${year}-${String(nextNum).padStart(4, "0")}`;
}

export async function createInvoice(
  _prevState: InvoiceFormState,
  formData: FormData
): Promise<InvoiceFormState> {
  const projectId = formData.get("projectId") as string;
  const type = formData.get("type") as string;
  const issueDate = formData.get("issueDate") as string;
  const dueDate = formData.get("dueDate") as string;
  const lineItemsJson = formData.get("lineItems") as string;

  if (!issueDate) return { error: "Issue date is required" };
  if (!dueDate) return { error: "Due date is required" };

  let lineItems: { description: string; amount: number }[];
  try {
    lineItems = JSON.parse(lineItemsJson || "[]");
  } catch {
    return { error: "Invalid line items" };
  }

  if (lineItems.length === 0) {
    return { error: "At least one line item is required" };
  }

  const hasEmptyDesc = lineItems.some((li) => !li.description?.trim());
  if (hasEmptyDesc) return { error: "All line items need a description" };

  const totalAmount = lineItems.reduce((sum, li) => sum + (li.amount || 0), 0);
  if (totalAmount <= 0) return { error: "Total amount must be greater than zero" };

  const invoiceNumber = await generateInvoiceNumber();

  await prisma.invoice.create({
    data: {
      invoiceNumber,
      projectId: projectId || null,
      type: (type as "MOBILIZATION" | "MILESTONE" | "FINAL" | "ONE_OFF") || "ONE_OFF",
      issueDate: new Date(issueDate),
      dueDate: new Date(dueDate),
      totalAmount,
      lineItems: {
        create: lineItems.map((li) => ({
          description: li.description.trim(),
          amount: li.amount,
        })),
      },
    },
  });

  revalidatePath("/dashboard/invoices");
  if (projectId) revalidatePath(`/dashboard/projects/${projectId}`);
  redirect("/dashboard/invoices");
}

export async function updateInvoiceStatus(id: string, status: InvoiceStatus) {
  await prisma.invoice.update({
    where: { id },
    data: { status },
  });

  revalidatePath(`/dashboard/invoices/${id}`);
  revalidatePath("/dashboard/invoices");
}
