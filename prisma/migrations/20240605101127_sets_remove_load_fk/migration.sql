/*
  Warnings:

  - You are about to drop the column `loadId` on the `ExerciseSet` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_ExerciseSet" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "order" INTEGER NOT NULL,
    "wasCompleted" BOOLEAN NOT NULL,
    "load" TEXT NOT NULL,
    "exerciseInstanceId" TEXT NOT NULL,
    CONSTRAINT "ExerciseSet_exerciseInstanceId_fkey" FOREIGN KEY ("exerciseInstanceId") REFERENCES "ExerciseInstance" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_ExerciseSet" ("exerciseInstanceId", "id", "load", "order", "wasCompleted") SELECT "exerciseInstanceId", "id", "load", "order", "wasCompleted" FROM "ExerciseSet";
DROP TABLE "ExerciseSet";
ALTER TABLE "new_ExerciseSet" RENAME TO "ExerciseSet";
PRAGMA foreign_key_check("ExerciseSet");
PRAGMA foreign_keys=ON;
