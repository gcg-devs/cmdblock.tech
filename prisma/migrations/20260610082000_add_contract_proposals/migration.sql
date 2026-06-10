-- CreateEnum
CREATE TYPE "ContractStatus" AS ENUM ('DRAFT', 'SENT', 'ACCEPTED', 'EXPIRED');

-- CreateTable
CREATE TABLE "ContractProposal" (
    "id" TEXT NOT NULL,
    "contractNumber" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "clientName" TEXT NOT NULL,
    "preparedBy" TEXT NOT NULL,
    "issueDate" TIMESTAMP(3) NOT NULL,
    "validUntil" TIMESTAMP(3),
    "currency" "Currency" NOT NULL DEFAULT 'PHP',
    "status" "ContractStatus" NOT NULL DEFAULT 'DRAFT',
    "overview" TEXT NOT NULL DEFAULT '',
    "recommendedScope" TEXT NOT NULL DEFAULT '',
    "integrationNotes" TEXT NOT NULL DEFAULT '',
    "timeline" TEXT NOT NULL DEFAULT '',
    "paymentTerms" TEXT NOT NULL DEFAULT '',
    "changeRequests" TEXT NOT NULL DEFAULT '',
    "warranty" TEXT NOT NULL DEFAULT '',
    "exclusions" TEXT NOT NULL DEFAULT '',
    "maintenance" TEXT NOT NULL DEFAULT '',
    "legalNote" TEXT NOT NULL DEFAULT '',
    "totalAmount" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "shareToken" TEXT,
    "isPublic" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ContractProposal_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ContractLineItem" (
    "id" TEXT NOT NULL,
    "contractId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL DEFAULT '',
    "amount" DOUBLE PRECISION NOT NULL,
    "sortOrder" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "ContractLineItem_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ContractProposal_contractNumber_key" ON "ContractProposal"("contractNumber");

-- CreateIndex
CREATE UNIQUE INDEX "ContractProposal_shareToken_key" ON "ContractProposal"("shareToken");

-- AddForeignKey
ALTER TABLE "ContractLineItem" ADD CONSTRAINT "ContractLineItem_contractId_fkey" FOREIGN KEY ("contractId") REFERENCES "ContractProposal"("id") ON DELETE CASCADE ON UPDATE CASCADE;
