/*
  Warnings:

  - You are about to drop the column `clinicId` on the `Medics` table. All the data in the column will be lost.
  - You are about to drop the column `firstName` on the `Medics` table. All the data in the column will be lost.
  - You are about to drop the column `lastName` on the `Medics` table. All the data in the column will be lost.
  - You are about to drop the column `middleName` on the `Medics` table. All the data in the column will be lost.
  - You are about to drop the column `profession` on the `Medics` table. All the data in the column will be lost.
  - Added the required column `MfirstName` to the `Medics` table without a default value. This is not possible if the table is not empty.
  - Added the required column `MlastName` to the `Medics` table without a default value. This is not possible if the table is not empty.
  - Added the required column `MmiddleName` to the `Medics` table without a default value. This is not possible if the table is not empty.
  - Added the required column `cid` to the `Medics` table without a default value. This is not possible if the table is not empty.
  - Added the required column `prof` to the `Medics` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Medics" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "cid" INTEGER NOT NULL,
    "prof" TEXT NOT NULL,
    "MfirstName" TEXT NOT NULL,
    "MlastName" TEXT NOT NULL,
    "MmiddleName" TEXT NOT NULL
);
INSERT INTO "new_Medics" ("id") SELECT "id" FROM "Medics";
DROP TABLE "Medics";
ALTER TABLE "new_Medics" RENAME TO "Medics";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
