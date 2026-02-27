-- AlterTable
ALTER TABLE "LineItem" ADD COLUMN     "name" TEXT NOT NULL DEFAULT '';

-- AlterTable
ALTER TABLE "Project" ADD COLUMN     "scopeDescription" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "showScopeOnInvoice" BOOLEAN NOT NULL DEFAULT true;
