"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";

export type TeamProfileFormState = {
  error?: string;
  success?: string;
};

export async function upsertTeamProfile(
  _prevState: TeamProfileFormState,
  formData: FormData
): Promise<TeamProfileFormState> {
  const companyName = (formData.get("companyName") as string)?.trim() ?? "";
  const tagline = (formData.get("tagline") as string)?.trim() ?? "";
  const name = (formData.get("name") as string)?.trim() ?? "";
  const address = (formData.get("address") as string)?.trim() ?? "";
  const email = (formData.get("email") as string)?.trim() ?? "";
  const phone = (formData.get("phone") as string)?.trim() ?? "";

  if (!name) return { error: "Contact name is required" };

  const existing = await prisma.teamProfile.findFirst();

  if (existing) {
    await prisma.teamProfile.update({
      where: { id: existing.id },
      data: { companyName, tagline, name, address, email, phone },
    });
  } else {
    await prisma.teamProfile.create({
      data: { companyName, tagline, name, address, email, phone },
    });
  }

  revalidatePath("/dashboard/team-profile");
  return { success: "Team profile updated" };
}
