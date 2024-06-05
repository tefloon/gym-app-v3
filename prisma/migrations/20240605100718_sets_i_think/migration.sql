/*
  Warnings:

  - Added the required column `exerciseInstanceId` to the `ExerciseSet` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_ExerciseSet" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "order" INTEGER NOT NULL,
    "wasCompleted" BOOLEAN NOT NULL,
    "loadId" TEXT NOT NULL,
    "load" TEXT NOT NULL,
    "exerciseInstanceId" TEXT NOT NULL,
    CONSTRAINT "ExerciseSet_exerciseInstanceId_fkey" FOREIGN KEY ("exerciseInstanceId") REFERENCES "ExerciseInstance" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_ExerciseSet" ("id", "load", "loadId", "order", "wasCompleted") SELECT "id", "load", "loadId", "order", "wasCompleted" FROM "ExerciseSet";
DROP TABLE "ExerciseSet";
ALTER TABLE "new_ExerciseSet" RENAME TO "ExerciseSet";
PRAGMA foreign_key_check("ExerciseSet");
PRAGMA foreign_keys=ON;
