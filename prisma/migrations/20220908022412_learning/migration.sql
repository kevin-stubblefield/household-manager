/*
  Warnings:

  - You are about to drop the `Page` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `inviteAccepted` to the `HouseholdsOnUsers` table without a default value. This is not possible if the table is not empty.
  - Added the required column `invitedById` to the `HouseholdsOnUsers` table without a default value. This is not possible if the table is not empty.
  - Added the required column `isOwner` to the `HouseholdsOnUsers` table without a default value. This is not possible if the table is not empty.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Page";
PRAGMA foreign_keys=on;

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_HouseholdsOnUsers" (
    "householdId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "invitedById" TEXT NOT NULL,
    "inviteAccepted" BOOLEAN NOT NULL,
    "isOwner" BOOLEAN NOT NULL,
    "createdBy" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,

    PRIMARY KEY ("householdId", "userId"),
    CONSTRAINT "HouseholdsOnUsers_householdId_fkey" FOREIGN KEY ("householdId") REFERENCES "Household" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "HouseholdsOnUsers_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "HouseholdsOnUsers_invitedById_fkey" FOREIGN KEY ("invitedById") REFERENCES "User" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_HouseholdsOnUsers" ("createdAt", "createdBy", "householdId", "updatedAt", "userId") SELECT "createdAt", "createdBy", "householdId", "updatedAt", "userId" FROM "HouseholdsOnUsers";
DROP TABLE "HouseholdsOnUsers";
ALTER TABLE "new_HouseholdsOnUsers" RENAME TO "HouseholdsOnUsers";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
