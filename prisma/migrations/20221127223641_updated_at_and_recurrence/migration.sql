/*
  Warnings:

  - You are about to drop the column `byDate` on the `Task` table. All the data in the column will be lost.
  - You are about to drop the column `byDay` on the `Task` table. All the data in the column will be lost.
  - You are about to drop the column `duration` on the `Task` table. All the data in the column will be lost.
  - You are about to drop the column `endTime` on the `Task` table. All the data in the column will be lost.
  - You are about to drop the column `frequency` on the `Task` table. All the data in the column will be lost.
  - You are about to drop the column `interval` on the `Task` table. All the data in the column will be lost.
  - You are about to drop the column `isAllDay` on the `Task` table. All the data in the column will be lost.
  - You are about to drop the column `isRecurring` on the `Task` table. All the data in the column will be lost.
  - You are about to drop the column `lastCompletedDate` on the `Task` table. All the data in the column will be lost.
  - You are about to drop the column `recurrenceRule` on the `Task` table. All the data in the column will be lost.
  - You are about to drop the column `setAsBusy` on the `Task` table. All the data in the column will be lost.
  - You are about to drop the column `startTime` on the `Task` table. All the data in the column will be lost.

*/
-- CreateTable
CREATE TABLE "TaskRecurrence" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "recurrenceRule" TEXT,
    "frequency" TEXT NOT NULL,
    "interval" TEXT NOT NULL,
    "byDate" TEXT,
    "byDay" TEXT,
    "duration" TEXT,
    "startTime" DATETIME,
    "endTime" DATETIME,
    "setAsBusy" BOOLEAN NOT NULL DEFAULT false,
    "isAllDay" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_User" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT,
    "email" TEXT,
    "emailVerified" DATETIME,
    "image" TEXT,
    "displayName" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_User" ("displayName", "email", "emailVerified", "id", "image", "name") SELECT "displayName", "email", "emailVerified", "id", "image", "name" FROM "User";
DROP TABLE "User";
ALTER TABLE "new_User" RENAME TO "User";
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
CREATE TABLE "new_Task" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "householdId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "notes" TEXT,
    "priority" INTEGER NOT NULL DEFAULT 3,
    "dueDate" DATETIME,
    "completedDate" DATETIME,
    "assignedTo" TEXT,
    "recurrenceId" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Task_assignedTo_fkey" FOREIGN KEY ("assignedTo") REFERENCES "User" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Task_householdId_fkey" FOREIGN KEY ("householdId") REFERENCES "Household" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "Task_recurrenceId_fkey" FOREIGN KEY ("recurrenceId") REFERENCES "TaskRecurrence" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Task" ("assignedTo", "createdAt", "dueDate", "householdId", "id", "name", "notes", "priority", "updatedAt") SELECT "assignedTo", "createdAt", "dueDate", "householdId", "id", "name", "notes", "priority", "updatedAt" FROM "Task";
DROP TABLE "Task";
ALTER TABLE "new_Task" RENAME TO "Task";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
