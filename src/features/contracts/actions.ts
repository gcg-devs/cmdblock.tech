"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";

export type ContractFormState = {
  error?: string;
  success?: string;
};

type ContractLineItemInput = {
  name: string;
  description: string;
  amount: number;
};

type ContractData = {
  title: string;
  clientName: string;
  preparedBy: string;
  issueDate: Date;
  validUntil: Date | null;
  currency: "PHP" | "USD";
  overview: string;
  recommendedScope: string;
  integrationNotes: string;
  timeline: string;
  paymentTerms: string;
  changeRequests: string;
  warranty: string;
  exclusions: string;
  maintenance: string;
  legalNote: string;
  totalAmount: number;
  lineItems: ContractLineItemInput[];
};

async function generateContractNumber(): Promise<string> {
  const year = new Date().getFullYear();
  const prefix = `CP-${year}-`;

  const lastContract = await prisma.contractProposal.findFirst({
    where: { contractNumber: { startsWith: prefix } },
    orderBy: { contractNumber: "desc" },
    select: { contractNumber: true },
  });

  let nextNum = 1;
  if (lastContract) {
    const lastNum = parseInt(lastContract.contractNumber.split("-")[2], 10);
    nextNum = lastNum + 1;
  }

  return `${prefix}${String(nextNum).padStart(4, "0")}`;
}

function getText(formData: FormData, key: string): string {
  return ((formData.get(key) as string) || "").trim();
}

function parseLineItems(
  lineItemsJson: string
): ContractLineItemInput[] | { error: string } {
  let lineItems: ContractLineItemInput[];

  try {
    lineItems = JSON.parse(lineItemsJson || "[]");
  } catch {
    return { error: "Invalid deliverables" };
  }

  if (lineItems.length === 0) {
    return { error: "At least one deliverable is required" };
  }

  const hasInvalidItem = lineItems.some(
    (item) => !item.name?.trim() || Number.isNaN(Number(item.amount))
  );
  if (hasInvalidItem) {
    return { error: "Each deliverable needs a name and valid amount" };
  }

  return lineItems.map((item) => ({
    name: item.name.trim(),
    description: (item.description || "").trim(),
    amount: Number(item.amount) || 0,
  }));
}

function buildContractData(formData: FormData): ContractData | { error: string } {
  const title = getText(formData, "title");
  const clientName = getText(formData, "clientName");
  const preparedBy = getText(formData, "preparedBy");
  const issueDate = getText(formData, "issueDate");
  const validUntil = getText(formData, "validUntil");
  const currency = getText(formData, "currency") || "PHP";
  const lineItems = parseLineItems(getText(formData, "lineItems"));

  if (!title) return { error: "Title is required" };
  if (!clientName) return { error: "Client name is required" };
  if (!preparedBy) return { error: "Prepared by is required" };
  if (!issueDate) return { error: "Issue date is required" };
  if ("error" in lineItems) return lineItems;

  const totalAmount = lineItems.reduce((sum, item) => sum + item.amount, 0);
  if (totalAmount <= 0) {
    return { error: "Total amount must be greater than zero" };
  }

  return {
    title,
    clientName,
    preparedBy,
    issueDate: new Date(issueDate),
    validUntil: validUntil ? new Date(validUntil) : null,
    currency: currency as "PHP" | "USD",
    overview: getText(formData, "overview"),
    recommendedScope: getText(formData, "recommendedScope"),
    integrationNotes: getText(formData, "integrationNotes"),
    timeline: getText(formData, "timeline"),
    paymentTerms: getText(formData, "paymentTerms"),
    changeRequests: getText(formData, "changeRequests"),
    warranty: getText(formData, "warranty"),
    exclusions: getText(formData, "exclusions"),
    maintenance: getText(formData, "maintenance"),
    legalNote: getText(formData, "legalNote"),
    totalAmount,
    lineItems,
  };
}

export async function createContract(
  _prevState: ContractFormState,
  formData: FormData
): Promise<ContractFormState> {
  const data = buildContractData(formData);
  if ("error" in data) return data;

  const contractNumber = await generateContractNumber();
  const contract = await prisma.contractProposal.create({
    data: {
      contractNumber,
      title: data.title,
      clientName: data.clientName,
      preparedBy: data.preparedBy,
      issueDate: data.issueDate,
      validUntil: data.validUntil,
      currency: data.currency,
      overview: data.overview,
      recommendedScope: data.recommendedScope,
      integrationNotes: data.integrationNotes,
      timeline: data.timeline,
      paymentTerms: data.paymentTerms,
      changeRequests: data.changeRequests,
      warranty: data.warranty,
      exclusions: data.exclusions,
      maintenance: data.maintenance,
      legalNote: data.legalNote,
      totalAmount: data.totalAmount,
      lineItems: {
        create: data.lineItems.map((item, index) => ({
          name: item.name,
          description: item.description,
          amount: item.amount,
          sortOrder: index,
        })),
      },
    },
    select: { id: true },
  });

  revalidatePath("/dashboard/contracts");
  redirect(`/dashboard/contracts/${contract.id}`);
}

export async function updateContract(
  id: string,
  _prevState: ContractFormState,
  formData: FormData
): Promise<ContractFormState> {
  const data = buildContractData(formData);
  if ("error" in data) return data;

  await prisma.contractProposal.update({
    where: { id },
    data: {
      title: data.title,
      clientName: data.clientName,
      preparedBy: data.preparedBy,
      issueDate: data.issueDate,
      validUntil: data.validUntil,
      currency: data.currency,
      overview: data.overview,
      recommendedScope: data.recommendedScope,
      integrationNotes: data.integrationNotes,
      timeline: data.timeline,
      paymentTerms: data.paymentTerms,
      changeRequests: data.changeRequests,
      warranty: data.warranty,
      exclusions: data.exclusions,
      maintenance: data.maintenance,
      legalNote: data.legalNote,
      totalAmount: data.totalAmount,
      lineItems: {
        deleteMany: {},
        create: data.lineItems.map((item, index) => ({
          name: item.name,
          description: item.description,
          amount: item.amount,
          sortOrder: index,
        })),
      },
    },
  });

  revalidatePath(`/dashboard/contracts/${id}`);
  revalidatePath("/dashboard/contracts");
  redirect(`/dashboard/contracts/${id}`);
}

export async function deleteContract(id: string) {
  await prisma.contractProposal.delete({ where: { id } });
  revalidatePath("/dashboard/contracts");
  redirect("/dashboard/contracts");
}
