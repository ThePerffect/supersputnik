/*
  Warnings:

  - Added the required column `phone` to the `Clinics` table without a default value. This is not possible if the table is not empty.
  - Added the required column `time` to the `Clinics` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Clinics" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "licens" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password_hash" TEXT NOT NULL,
    "cord_address" TEXT NOT NULL,
    "time" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "type" INTEGER NOT NULL
);
INSERT INTO "new_Clinics" ("address", "cord_address", "email", "id", "licens", "name", "password_hash", "type") SELECT "address", "cord_address", "email", "id", "licens", "name", "password_hash", "type" FROM "Clinics";
DROP TABLE "Clinics";
ALTER TABLE "new_Clinics" RENAME TO "Clinics";
CREATE UNIQUE INDEX "Clinics_licens_key" ON "Clinics"("licens");
CREATE UNIQUE INDEX "Clinics_email_key" ON "Clinics"("email");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
