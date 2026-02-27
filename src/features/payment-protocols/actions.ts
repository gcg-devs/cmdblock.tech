"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";

export type PaymentProtocolFormState = {
  error?: string;
  success?: string;
};

export async function createPaymentProtocol(
  _prevState: PaymentProtocolFormState,
  formData: FormData
): Promise<PaymentProtocolFormState> {
  const label = (formData.get("label") as string)?.trim();
  const bankName = (formData.get("bankName") as string)?.trim();
  const accountName = (formData.get("accountName") as string)?.trim();
  const accountNumber = (formData.get("accountNumber") as string)?.trim();

  if (!label) return { error: "Label is required" };
  if (!bankName) return { error: "Bank name is required" };
  if (!accountName) return { error: "Account name is required" };
  if (!accountNumber) return { error: "Account number is required" };

  const count = await prisma.paymentProtocol.count();
  const isDefault = count === 0;

  await prisma.paymentProtocol.create({
    data: { label, bankName, accountName, accountNumber, isDefault },
  });

  revalidatePath("/dashboard/payment-protocols");
  return { success: "Payment protocol created" };
}

export async function updatePaymentProtocol(
  id: string,
  _prevState: PaymentProtocolFormState,
  formData: FormData
): Promise<PaymentProtocolFormState> {
  const label = (formData.get("label") as string)?.trim();
  const bankName = (formData.get("bankName") as string)?.trim();
  const accountName = (formData.get("accountName") as string)?.trim();
  const accountNumber = (formData.get("accountNumber") as string)?.trim();

  if (!label) return { error: "Label is required" };
  if (!bankName) return { error: "Bank name is required" };
  if (!accountName) return { error: "Account name is required" };
  if (!accountNumber) return { error: "Account number is required" };

  await prisma.paymentProtocol.update({
    where: { id },
    data: { label, bankName, accountName, accountNumber },
  });

  revalidatePath("/dashboard/payment-protocols");
  return { success: "Payment protocol updated" };
}

export async function deletePaymentProtocol(id: string) {
  const protocol = await prisma.paymentProtocol.findUnique({ where: { id } });
  await prisma.paymentProtocol.delete({ where: { id } });

  if (protocol?.isDefault) {
    const next = await prisma.paymentProtocol.findFirst({
      orderBy: { createdAt: "asc" },
    });
    if (next) {
      await prisma.paymentProtocol.update({
        where: { id: next.id },
        data: { isDefault: true },
      });
    }
  }

  revalidatePath("/dashboard/payment-protocols");
}

export async function setDefaultPaymentProtocol(id: string) {
  await prisma.$transaction([
    prisma.paymentProtocol.updateMany({
      data: { isDefault: false },
    }),
    prisma.paymentProtocol.update({
      where: { id },
      data: { isDefault: true },
    }),
  ]);

  revalidatePath("/dashboard/payment-protocols");
}
