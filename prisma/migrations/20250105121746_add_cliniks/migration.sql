/*
  Warnings:

  - You are about to drop the column `city` on the `Clinics` table. All the data in the column will be lost.
  - You are about to drop the column `country` on the `Clinics` table. All the data in the column will be lost.
  - You are about to drop the column `email` on the `Clinics` table. All the data in the column will be lost.
  - You are about to drop the column `full_adress` on the `Clinics` table. All the data in the column will be lost.
  - Added the required column `address` to the `Clinics` table without a default value. This is not possible if the table is not empty.
  - Added the required column `cord_address` to the `Clinics` table without a default value. This is not possible if the table is not empty.
  - Added the required column `licens` to the `Clinics` table without a default value. This is not possible if the table is not empty.
  - Added the required column `password_hash` to the `Clinics` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Clinics" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "licens" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "password_hash" TEXT NOT NULL,
    "cord_address" TEXT NOT NULL,
    "type" INTEGER NOT NULL
);
INSERT INTO "new_Clinics" ("id", "name", "type") SELECT "id", "name", "type" FROM "Clinics";
DROP TABLE "Clinics";
ALTER TABLE "new_Clinics" RENAME TO "Clinics";
CREATE UNIQUE INDEX "Clinics_licens_key" ON "Clinics"("licens");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
