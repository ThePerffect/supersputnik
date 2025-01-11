/*
  Warnings:

  - Added the required column `birthDate` to the `Medics` table without a default value. This is not possible if the table is not empty.

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
    "middleName" TEXT,
    "birthDate" DATETIME NOT NULL
);
INSERT INTO "new_Medics" ("clinicId", "firstName", "id", "lastName", "middleName", "profession") SELECT "clinicId", "firstName", "id", "lastName", "middleName", "profession" FROM "Medics";
DROP TABLE "Medics";
ALTER TABLE "new_Medics" RENAME TO "Medics";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
