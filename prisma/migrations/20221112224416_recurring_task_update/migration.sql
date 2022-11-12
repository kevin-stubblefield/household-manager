/*
  Warnings:

  - You are about to drop the column `scheduledDay` on the `Task` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Task" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "householdId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "notes" TEXT,
    "isRecurring" BOOLEAN NOT NULL DEFAULT false,
    "recurrenceRule" TEXT,
    "frequency" TEXT,
    "interval" TEXT,
    "startTime" DATETIME,
    "endTime" DATETIME,
    "byDate" TEXT,
    "byDay" TEXT,
    "duration" TEXT,
    "priority" INTEGER NOT NULL DEFAULT 3,
    "dueDate" DATETIME,
    "lastCompletedDate" DATETIME,
    "assignedTo" TEXT,
    "setAsBusy" BOOLEAN NOT NULL DEFAULT false,
    "isAllDay" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Task_assignedTo_fkey" FOREIGN KEY ("assignedTo") REFERENCES "User" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Task_householdId_fkey" FOREIGN KEY ("householdId") REFERENCES "Household" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Task" ("assignedTo", "createdAt", "dueDate", "frequency", "householdId", "id", "lastCompletedDate", "name", "priority", "updatedAt") SELECT "assignedTo", "createdAt", "dueDate", "frequency", "householdId", "id", "lastCompletedDate", "name", "priority", "updatedAt" FROM "Task";
DROP TABLE "Task";
ALTER TABLE "new_Task" RENAME TO "Task";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
