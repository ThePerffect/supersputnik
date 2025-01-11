/*
  Warnings:

  - Added the required column `MbirthDate` to the `Medics` table without a default value. This is not possible if the table is not empty.

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
    "MmiddleName" TEXT NOT NULL,
    "MbirthDate" DATETIME NOT NULL
);
INSERT INTO "new_Medics" ("MfirstName", "MlastName", "MmiddleName", "cid", "id", "prof") SELECT "MfirstName", "MlastName", "MmiddleName", "cid", "id", "prof" FROM "Medics";
DROP TABLE "Medics";
ALTER TABLE "new_Medics" RENAME TO "Medics";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
