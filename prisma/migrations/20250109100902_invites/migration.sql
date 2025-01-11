-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Invites" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "uuid" TEXT NOT NULL,
    "clinic" TEXT NOT NULL,
    "proffession" TEXT NOT NULL
);
INSERT INTO "new_Invites" ("clinic", "id", "proffession", "uuid") SELECT "clinic", "id", "proffession", "uuid" FROM "Invites";
DROP TABLE "Invites";
ALTER TABLE "new_Invites" RENAME TO "Invites";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
