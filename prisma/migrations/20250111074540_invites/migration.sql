/*
  Warnings:

  - You are about to drop the `Invites` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the column `about` on the `Medics` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `Medics` table. All the data in the column will be lost.
  - Added the required column `firstName` to the `Medics` table without a default value. This is not possible if the table is not empty.
  - Added the required column `lastName` to the `Medics` table without a default value. This is not possible if the table is not empty.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Invites";
PRAGMA foreign_keys=on;

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Medics" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "clinicId" INTEGER NOT NULL,
    "profession" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "middleName" TEXT
);
INSERT INTO "new_Medics" ("clinicId", "id", "profession") SELECT "clinicId", "id", "profession" FROM "Medics";
DROP TABLE "Medics";
ALTER TABLE "new_Medics" RENAME TO "Medics";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
