/*
  Warnings:

  - You are about to drop the column `householdId` on the `InventoryItem` table. All the data in the column will be lost.
  - Added the required column `userId` to the `InventoryItem` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_InventoryItem" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,
    "unit" TEXT NOT NULL,
    "serialNo" TEXT,
    "modelNo" TEXT,
    "purchaseDate" DATETIME,
    "purchasePrice" DECIMAL,
    "wholeItemId" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "InventoryItem_wholeItemId_fkey" FOREIGN KEY ("wholeItemId") REFERENCES "InventoryItem" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "InventoryItem_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_InventoryItem" ("createdAt", "id", "modelNo", "name", "purchaseDate", "purchasePrice", "quantity", "serialNo", "unit", "updatedAt", "wholeItemId") SELECT "createdAt", "id", "modelNo", "name", "purchaseDate", "purchasePrice", "quantity", "serialNo", "unit", "updatedAt", "wholeItemId" FROM "InventoryItem";
DROP TABLE "InventoryItem";
ALTER TABLE "new_InventoryItem" RENAME TO "InventoryItem";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
