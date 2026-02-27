"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import type { ProjectStatus } from "@/generated/prisma/client";

export type ProjectFormState = {
  error?: string;
  success?: string;
};

export async function createProject(
  _prevState: ProjectFormState,
  formData: FormData
): Promise<ProjectFormState> {
  const clientId = formData.get("clientId") as string;
  const title = formData.get("title") as string;
  const totalContractValue = parseFloat(formData.get("totalContractValue") as string);
  const currency = formData.get("currency") as string;

  if (!clientId?.trim()) return { error: "Client is required" };
  if (!title?.trim()) return { error: "Project title is required" };
  if (isNaN(totalContractValue) || totalContractValue <= 0) {
    return { error: "Valid contract value is required" };
  }

  await prisma.project.create({
    data: {
      clientId,
      title: title.trim(),
      totalContractValue,
      currency: currency === "USD" ? "USD" : "PHP",
    },
  });

  revalidatePath("/dashboard/projects");
  redirect("/dashboard/projects");
}

export async function updateProjectStatus(
  id: string,
  status: ProjectStatus
) {
  await prisma.project.update({
    where: { id },
    data: { status },
  });

  revalidatePath(`/dashboard/projects/${id}`);
  revalidatePath("/dashboard/projects");
}

export async function deleteProject(id: string) {
  await prisma.project.delete({ where: { id } });
  revalidatePath("/dashboard/projects");
  redirect("/dashboard/projects");
}
