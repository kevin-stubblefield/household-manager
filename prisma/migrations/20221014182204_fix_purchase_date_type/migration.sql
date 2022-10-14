/*
  Warnings:

  - You are about to alter the column `purchaseDate` on the `InventoryItem` table. The data in that column could be lost. The data in that column will be cast from `String` to `DateTime`.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_InventoryItem" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "householdId" TEXT NOT NULL,
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
    CONSTRAINT "InventoryItem_householdId_fkey" FOREIGN KEY ("householdId") REFERENCES "Household" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_InventoryItem" ("createdAt", "householdId", "id", "modelNo", "name", "purchaseDate", "purchasePrice", "quantity", "serialNo", "unit", "updatedAt", "wholeItemId") SELECT "createdAt", "householdId", "id", "modelNo", "name", "purchaseDate", "purchasePrice", "quantity", "serialNo", "unit", "updatedAt", "wholeItemId" FROM "InventoryItem";
DROP TABLE "InventoryItem";
ALTER TABLE "new_InventoryItem" RENAME TO "InventoryItem";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
