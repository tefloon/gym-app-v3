-- CreateTable
CREATE TABLE "Workout" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "date" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "ExerciseInstance" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "order" INTEGER NOT NULL,
    "exerciseTypeId" TEXT NOT NULL,
    "workoutId" TEXT,
    CONSTRAINT "ExerciseInstance_exerciseTypeId_fkey" FOREIGN KEY ("exerciseTypeId") REFERENCES "ExerciseType" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "ExerciseInstance_workoutId_fkey" FOREIGN KEY ("workoutId") REFERENCES "Workout" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "LoadType" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "areBothSignificant" BOOLEAN NOT NULL,
    "firstUnit" TEXT NOT NULL,
    "secondUnit" TEXT
);

-- CreateTable
CREATE TABLE "Category" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "ExerciseType" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "loadingTypeId" TEXT NOT NULL,
    "categoryId" TEXT NOT NULL,
    "personalBest" TEXT NOT NULL,
    CONSTRAINT "ExerciseType_loadingTypeId_fkey" FOREIGN KEY ("loadingTypeId") REFERENCES "LoadType" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "ExerciseType_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "ExerciseSet" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "order" INTEGER NOT NULL,
    "wasCompleted" BOOLEAN NOT NULL,
    "loadId" TEXT NOT NULL,
    "load" TEXT NOT NULL
);
