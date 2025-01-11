/*
  Warnings:

  - Added the required column `proffession` to the `Invites` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Invites" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "uuid" TEXT NOT NULL,
    "clinic" INTEGER NOT NULL,
    "proffession" TEXT NOT NULL
);
INSERT INTO "new_Invites" ("clinic", "id", "uuid") SELECT "clinic", "id", "uuid" FROM "Invites";
DROP TABLE "Invites";
ALTER TABLE "new_Invites" RENAME TO "Invites";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
