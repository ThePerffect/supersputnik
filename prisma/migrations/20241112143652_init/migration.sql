/*
  Warnings:

  - Added the required column `country` to the `Clinics` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Clinics" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "sity" TEXT NOT NULL,
    "country" TEXT NOT NULL,
    "full_adress" TEXT NOT NULL
);
INSERT INTO "new_Clinics" ("email", "full_adress", "id", "name", "sity") SELECT "email", "full_adress", "id", "name", "sity" FROM "Clinics";
DROP TABLE "Clinics";
ALTER TABLE "new_Clinics" RENAME TO "Clinics";
CREATE UNIQUE INDEX "Clinics_email_key" ON "Clinics"("email");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
