/*
  Warnings:

  - You are about to drop the column `birthDate` on the `Medics` table. All the data in the column will be lost.
  - Made the column `middleName` on table `Medics` required. This step will fail if there are existing NULL values in that column.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Medics" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "clinicId" INTEGER NOT NULL,
    "profession" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "middleName" TEXT NOT NULL
);
INSERT INTO "new_Medics" ("clinicId", "firstName", "id", "lastName", "middleName", "profession") SELECT "clinicId", "firstName", "id", "lastName", "middleName", "profession" FROM "Medics";
DROP TABLE "Medics";
ALTER TABLE "new_Medics" RENAME TO "Medics";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
