/*
  Warnings:

  - Added the required column `name` to the `ExerciseType` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_ExerciseType" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "loadingTypeId" TEXT NOT NULL,
    "categoryId" TEXT NOT NULL,
    "personalBest" TEXT NOT NULL,
    CONSTRAINT "ExerciseType_loadingTypeId_fkey" FOREIGN KEY ("loadingTypeId") REFERENCES "LoadType" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "ExerciseType_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_ExerciseType" ("categoryId", "id", "loadingTypeId", "personalBest") SELECT "categoryId", "id", "loadingTypeId", "personalBest" FROM "ExerciseType";
DROP TABLE "ExerciseType";
ALTER TABLE "new_ExerciseType" RENAME TO "ExerciseType";
CREATE UNIQUE INDEX "ExerciseType_name_key" ON "ExerciseType"("name");
PRAGMA foreign_key_check("ExerciseType");
PRAGMA foreign_keys=ON;
