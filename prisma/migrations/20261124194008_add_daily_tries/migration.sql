-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_User" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "username" TEXT NOT NULL,
    "password" TEXT,
    "email" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "tries" INTEGER NOT NULL DEFAULT 0,
    "found" INTEGER NOT NULL DEFAULT 0,
    "last_found" DATETIME NOT NULL,
    "streak" INTEGER NOT NULL DEFAULT 0,
    "max_streak" INTEGER NOT NULL DEFAULT 0,
    "daily_mob_guesses" TEXT NOT NULL DEFAULT '{}',
    "daily_item_guesses" TEXT NOT NULL DEFAULT '{}',
    "daily_block_guesses" TEXT NOT NULL DEFAULT '{}',
    "daily_tries" INTEGER NOT NULL DEFAULT 0,
    "daily_tries_date" DATETIME,
    "unlocked" TEXT NOT NULL DEFAULT '[]',
    "provider" TEXT NOT NULL DEFAULT '[]'
);
INSERT INTO "new_User" ("createdAt", "daily_block_guesses", "daily_item_guesses", "daily_mob_guesses", "email", "found", "id", "last_found", "max_streak", "password", "provider", "streak", "tries", "unlocked", "username") SELECT "createdAt", "daily_block_guesses", "daily_item_guesses", "daily_mob_guesses", "email", "found", "id", "last_found", "max_streak", "password", "provider", "streak", "tries", "unlocked", "username" FROM "User";
DROP TABLE "User";
ALTER TABLE "new_User" RENAME TO "User";
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
