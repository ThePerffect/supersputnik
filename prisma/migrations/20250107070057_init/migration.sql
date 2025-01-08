/*
  Warnings:

  - You are about to drop the column `uuid` on the `User` table. All the data in the column will be lost.
  - Added the required column `unique_code` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_User" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "middleName" TEXT,
    "birthDate" DATETIME NOT NULL,
    "email" TEXT NOT NULL,
    "password_hash" TEXT NOT NULL,
    "access_level" INTEGER NOT NULL,
    "unique_code" TEXT NOT NULL
);
INSERT INTO "new_User" ("access_level", "birthDate", "email", "firstName", "id", "lastName", "middleName", "password_hash") SELECT "access_level", "birthDate", "email", "firstName", "id", "lastName", "middleName", "password_hash" FROM "User";
DROP TABLE "User";
ALTER TABLE "new_User" RENAME TO "User";
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
CREATE UNIQUE INDEX "User_unique_code_key" ON "User"("unique_code");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
