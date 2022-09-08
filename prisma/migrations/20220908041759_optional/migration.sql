-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_HouseholdsOnUsers" (
    "householdId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "invitedById" TEXT,
    "inviteAccepted" BOOLEAN,
    "isOwner" BOOLEAN NOT NULL,
    "createdBy" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,

    PRIMARY KEY ("householdId", "userId"),
    CONSTRAINT "HouseholdsOnUsers_householdId_fkey" FOREIGN KEY ("householdId") REFERENCES "Household" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "HouseholdsOnUsers_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "HouseholdsOnUsers_invitedById_fkey" FOREIGN KEY ("invitedById") REFERENCES "User" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_HouseholdsOnUsers" ("createdAt", "createdBy", "householdId", "inviteAccepted", "invitedById", "isOwner", "updatedAt", "userId") SELECT "createdAt", "createdBy", "householdId", "inviteAccepted", "invitedById", "isOwner", "updatedAt", "userId" FROM "HouseholdsOnUsers";
DROP TABLE "HouseholdsOnUsers";
ALTER TABLE "new_HouseholdsOnUsers" RENAME TO "HouseholdsOnUsers";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
