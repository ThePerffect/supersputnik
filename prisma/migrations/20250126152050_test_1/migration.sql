-- CreateTable
CREATE TABLE "User" (
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

-- CreateTable
CREATE TABLE "Medics" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "cid" INTEGER NOT NULL,
    "prof" TEXT NOT NULL,
    "MfirstName" TEXT NOT NULL,
    "MlastName" TEXT NOT NULL,
    "MmiddleName" TEXT NOT NULL,
    "MbirthDate" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "Schedule" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "medicId" INTEGER NOT NULL,
    "workStartTime" TEXT NOT NULL,
    "workEndTime" TEXT NOT NULL,
    "days" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Hospital" (
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

-- CreateTable
CREATE TABLE "Appointment" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "middleName" TEXT,
    "medicId" INTEGER NOT NULL,
    "day" TEXT NOT NULL,
    "time" TEXT NOT NULL,
    "medic" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "Records" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "mid" INTEGER NOT NULL,
    "uid" INTEGER NOT NULL,
    "time" TEXT NOT NULL,
    "date" DATETIME NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_unique_code_key" ON "User"("unique_code");

-- CreateIndex
CREATE UNIQUE INDEX "Hospital_licens_key" ON "Hospital"("licens");

-- CreateIndex
CREATE UNIQUE INDEX "Hospital_email_key" ON "Hospital"("email");
