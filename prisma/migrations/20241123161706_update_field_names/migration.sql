/*
  Warnings:

  - You are about to drop the column `Country` on the `Clinics` table. All the data in the column will be lost.
  - You are about to drop the column `Email` on the `Clinics` table. All the data in the column will be lost.
  - You are about to drop the column `Full_adress` on the `Clinics` table. All the data in the column will be lost.
  - You are about to drop the column `Name` on the `Clinics` table. All the data in the column will be lost.
  - You are about to drop the column `Sity` on the `Clinics` table. All the data in the column will be lost.
  - You are about to drop the column `Type` on the `Clinics` table. All the data in the column will be lost.
  - You are about to drop the column `About` on the `Medics` table. All the data in the column will be lost.
  - You are about to drop the column `ClinicId` on the `Medics` table. All the data in the column will be lost.
  - You are about to drop the column `Profession` on the `Medics` table. All the data in the column will be lost.
  - You are about to drop the column `UserId` on the `Medics` table. All the data in the column will be lost.
  - You are about to drop the column `Access_level` on the `Users` table. All the data in the column will be lost.
  - You are about to drop the column `Avatar` on the `Users` table. All the data in the column will be lost.
  - You are about to drop the column `Email` on the `Users` table. All the data in the column will be lost.
  - You are about to drop the column `Name` on the `Users` table. All the data in the column will be lost.
  - You are about to drop the column `Password_hash` on the `Users` table. All the data in the column will be lost.
  - Added the required column `city` to the `Clinics` table without a default value. This is not possible if the table is not empty.
  - Added the required column `country` to the `Clinics` table without a default value. This is not possible if the table is not empty.
  - Added the required column `email` to the `Clinics` table without a default value. This is not possible if the table is not empty.
  - Added the required column `full_adress` to the `Clinics` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `Clinics` table without a default value. This is not possible if the table is not empty.
  - Added the required column `type` to the `Clinics` table without a default value. This is not possible if the table is not empty.
  - Added the required column `about` to the `Medics` table without a default value. This is not possible if the table is not empty.
  - Added the required column `clinicId` to the `Medics` table without a default value. This is not possible if the table is not empty.
  - Added the required column `profession` to the `Medics` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `Medics` table without a default value. This is not possible if the table is not empty.
  - Added the required column `access_level` to the `Users` table without a default value. This is not possible if the table is not empty.
  - Added the required column `avatar` to the `Users` table without a default value. This is not possible if the table is not empty.
  - Added the required column `email` to the `Users` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `Users` table without a default value. This is not possible if the table is not empty.
  - Added the required column `password_hash` to the `Users` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Clinics" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "country" TEXT NOT NULL,
    "full_adress" TEXT NOT NULL,
    "type" INTEGER NOT NULL
);
INSERT INTO "new_Clinics" ("id") SELECT "id" FROM "Clinics";
DROP TABLE "Clinics";
ALTER TABLE "new_Clinics" RENAME TO "Clinics";
CREATE UNIQUE INDEX "Clinics_email_key" ON "Clinics"("email");
CREATE TABLE "new_Medics" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "userId" INTEGER NOT NULL,
    "clinicId" INTEGER NOT NULL,
    "profession" TEXT NOT NULL,
    "about" TEXT NOT NULL
);
INSERT INTO "new_Medics" ("id") SELECT "id" FROM "Medics";
DROP TABLE "Medics";
ALTER TABLE "new_Medics" RENAME TO "Medics";
CREATE UNIQUE INDEX "Medics_userId_key" ON "Medics"("userId");
CREATE TABLE "new_Users" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "avatar" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password_hash" TEXT NOT NULL,
    "access_level" INTEGER NOT NULL
);
INSERT INTO "new_Users" ("id") SELECT "id" FROM "Users";
DROP TABLE "Users";
ALTER TABLE "new_Users" RENAME TO "Users";
CREATE UNIQUE INDEX "Users_email_key" ON "Users"("email");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
