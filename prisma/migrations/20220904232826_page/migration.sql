-- AlterTable
ALTER TABLE "Household" ADD COLUMN "addressLine1" TEXT;
ALTER TABLE "Household" ADD COLUMN "addressLine2" TEXT;
ALTER TABLE "Household" ADD COLUMN "city" TEXT;
ALTER TABLE "Household" ADD COLUMN "state" TEXT;
ALTER TABLE "Household" ADD COLUMN "zipCode" TEXT;

-- AlterTable
ALTER TABLE "User" ADD COLUMN "displayName" TEXT;

-- CreateTable
CREATE TABLE "Image" (
    "itemId" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    CONSTRAINT "Image_itemId_fkey" FOREIGN KEY ("itemId") REFERENCES "Household" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Page" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "link" TEXT NOT NULL,
    "roles" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Image_url_key" ON "Image"("url");
