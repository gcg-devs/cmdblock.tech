"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";

export type ClientFormState = {
  error?: string;
  success?: string;
};

export async function createClient(
  _prevState: ClientFormState,
  formData: FormData
): Promise<ClientFormState> {
  const name = formData.get("name") as string;
  const pocName = formData.get("pocName") as string;
  const pocEmail = formData.get("pocEmail") as string;
  const billingAddress = formData.get("billingAddress") as string;

  if (!name?.trim()) {
    return { error: "Client name is required" };
  }
  if (!pocName?.trim()) {
    return { error: "Point of contact name is required" };
  }
  if (!pocEmail?.trim()) {
    return { error: "Point of contact email is required" };
  }

  await prisma.client.create({
    data: {
      name: name.trim(),
      pocName: pocName.trim(),
      pocEmail: pocEmail.trim(),
      billingAddress: billingAddress?.trim() ?? "",
    },
  });

  revalidatePath("/dashboard/clients");
  redirect("/dashboard/clients");
}

export async function updateClient(
  id: string,
  _prevState: ClientFormState,
  formData: FormData
): Promise<ClientFormState> {
  const name = formData.get("name") as string;
  const pocName = formData.get("pocName") as string;
  const pocEmail = formData.get("pocEmail") as string;
  const billingAddress = formData.get("billingAddress") as string;

  if (!name?.trim()) {
    return { error: "Client name is required" };
  }

  await prisma.client.update({
    where: { id },
    data: {
      name: name.trim(),
      pocName: pocName.trim(),
      pocEmail: pocEmail.trim(),
      billingAddress: billingAddress?.trim() ?? "",
    },
  });

  revalidatePath(`/dashboard/clients/${id}`);
  revalidatePath("/dashboard/clients");
  redirect(`/dashboard/clients/${id}`);
}
