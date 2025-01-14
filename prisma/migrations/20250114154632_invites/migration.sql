/*
  Warnings:

  - Added the required column `htime` to the `Hospital` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Hospital" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "licens" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password_hash" TEXT NOT NULL,
    "cord_address" TEXT NOT NULL,
    "type" INTEGER NOT NULL,
    "time" TEXT NOT NULL,
    "htime" TEXT NOT NULL,
    "phone" TEXT NOT NULL
);
INSERT INTO "new_Hospital" ("address", "cord_address", "email", "id", "licens", "name", "password_hash", "phone", "time", "type") SELECT "address", "cord_address", "email", "id", "licens", "name", "password_hash", "phone", "time", "type" FROM "Hospital";
DROP TABLE "Hospital";
ALTER TABLE "new_Hospital" RENAME TO "Hospital";
CREATE UNIQUE INDEX "Hospital_licens_key" ON "Hospital"("licens");
CREATE UNIQUE INDEX "Hospital_email_key" ON "Hospital"("email");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
