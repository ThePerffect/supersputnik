/*
  Warnings:

  - You are about to drop the column `country` on the `Clinics` table. All the data in the column will be lost.
  - You are about to drop the column `email` on the `Clinics` table. All the data in the column will be lost.
  - You are about to drop the column `full_adress` on the `Clinics` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `Clinics` table. All the data in the column will be lost.
  - You are about to drop the column `sity` on the `Clinics` table. All the data in the column will be lost.
  - You are about to drop the column `access_level` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `email` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `password_hash` on the `User` table. All the data in the column will be lost.
  - Added the required column `Country` to the `Clinics` table without a default value. This is not possible if the table is not empty.
  - Added the required column `Email` to the `Clinics` table without a default value. This is not possible if the table is not empty.
  - Added the required column `Full_adress` to the `Clinics` table without a default value. This is not possible if the table is not empty.
  - Added the required column `Name` to the `Clinics` table without a default value. This is not possible if the table is not empty.
  - Added the required column `Sity` to the `Clinics` table without a default value. This is not possible if the table is not empty.
  - Added the required column `Type` to the `Clinics` table without a default value. This is not possible if the table is not empty.
  - Added the required column `Access_level` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `Avatar` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `Email` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `Name` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `Password_hash` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- CreateTable
CREATE TABLE "Medics" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "UserId" INTEGER NOT NULL,
    "ClinicId" INTEGER NOT NULL,
    "Profession" TEXT NOT NULL,
    "About" TEXT NOT NULL
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Clinics" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "Name" TEXT NOT NULL,
    "Email" TEXT NOT NULL,
    "Sity" TEXT NOT NULL,
    "Country" TEXT NOT NULL,
    "Full_adress" TEXT NOT NULL,
    "Type" INTEGER NOT NULL
);
INSERT INTO "new_Clinics" ("id") SELECT "id" FROM "Clinics";
DROP TABLE "Clinics";
ALTER TABLE "new_Clinics" RENAME TO "Clinics";
CREATE UNIQUE INDEX "Clinics_Email_key" ON "Clinics"("Email");
CREATE TABLE "new_User" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "Name" TEXT NOT NULL,
    "Avatar" TEXT NOT NULL,
    "Email" TEXT NOT NULL,
    "Password_hash" TEXT NOT NULL,
    "Access_level" INTEGER NOT NULL
);
INSERT INTO "new_User" ("id") SELECT "id" FROM "User";
DROP TABLE "User";
ALTER TABLE "new_User" RENAME TO "User";
CREATE UNIQUE INDEX "User_Email_key" ON "User"("Email");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

-- CreateIndex
CREATE UNIQUE INDEX "Medics_UserId_key" ON "Medics"("UserId");
