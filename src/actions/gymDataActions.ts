"use server";

import prisma from "@/lib/prisma";
import { Prisma } from "@prisma/client";
import { DateTime } from "luxon";
import { createId } from "@paralleldrive/cuid2";

import { revalidatePath } from "next/cache";
import { translateError } from "./prismaErrorHandler";

type CreateCategoryProps = {
  name: string;
  id?: string;
};

// Workout handlers
// =================
export const handleCreateWorkout = async (date: DateTime) => {
  const workout: Prisma.WorkoutCreateInput = {
    date: date.setZone("Europe/Warsaw").toUTC().toJSDate(),
  };
};

export const handleReturnWorkouts = async () => {
  const workouts = await prisma.workout.findMany({});

  return workouts;
};

export const handleReturnWorkoutByDate = async (inputDate: Date) => {
  const dateInLocal = DateTime.fromJSDate(inputDate).setZone("Europe/Warsaw");

  if (!dateInLocal.isValid) {
    return new Error("Invalid date");
  }

  const dayStart = dateInLocal.startOf("day").toUTC();
  const dayEnd = dateInLocal.endOf("day").toUTC();

  const workout = await prisma.workout.findFirst({
    where: {
      date: {
        gte: dayStart.toJSDate(),
        lte: dayEnd.toJSDate(),
      },
    },
    include: {
      exerciseInstances: {
        include: {
          sets: true,
          exerciseType: {
            include: {
              category: true,
              loadingType: true,
            },
          },
        },
      },
    },
  });

  return workout;
};

// Category handlers
// =================
export const handleCreateCategory = async ({
  name,
  id,
}: CreateCategoryProps) => {
  const categoryId = id ? id : createId();
  // const categoryId = createId();

  try {
    const createCategory = await prisma.category.create({
      data: {
        id: categoryId,
        name: name,
      },
    });

    return {
      status: 200,
      message: "OK",
    };
  } catch (e) {
    revalidatePath("/categories");
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      return {
        status: 400,
        message: translateError(e),
      };
    }
    throw e;
  }
};

export const handleReturnCategories = async () => {
  const categories = await prisma.category.findMany();
  return categories;
};

export const handleDeleteCategoryById = async (id: string) => {
  // Check if the category is empty

  const exercisesWithCategory = await prisma.exerciseType.findMany({
    where: {
      categoryId: id,
    },
  });

  // TODO: Delete the related ExerciseTypes and ExerciseInstances upon confirmation
  if (exercisesWithCategory) {
    console.log("Category not empty. Aborting!");
    return {
      status: 400,
      message: "Category not empty. Aborting!",
    };
  }

  try {
    const categories = await prisma.category.delete({
      where: {
        id: id,
      },
    });
    return {
      status: 200,
      message: "OK",
    };
  } catch (e) {
    revalidatePath("/categories");
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      return {
        status: 400,
        message: translateError(e),
      };
    }
    throw e;
  }
};

// Create one of everything
// =========================
export const handleCreateEverything = async () => {
  try {
    // Define Exercise Sets
    const exerciseSets: Prisma.ExerciseSetCreateWithoutExerciseInstanceInput[] =
      [
        {
          id: createId(),
          load: "20x20",
          order: 1,
          wasCompleted: true,
        },
        {
          id: createId(),
          load: "20x20",
          order: 2,
          wasCompleted: false,
        },
      ];

    // Define Exercise Instance with nested Exercise Sets and Exercise Type
    const exerciseInstance: Prisma.ExerciseInstanceCreateWithoutWorkoutInput = {
      id: createId(),
      order: 1,
      sets: {
        create: exerciseSets,
      },
      exerciseType: {
        create: {
          id: createId(),
          personalBest: "0",
          category: {
            create: {
              id: createId(),
              name: `TestCategory_${Math.floor(
                Math.random() * 1000
              ).toString()}`,
            },
          },
          loadingType: {
            create: {
              id: createId(),
              areBothSignificant: true,
              firstUnit: "kg",
              secondUnit: "reps",
            },
          },
        },
      },
    };

    // Define Workout with nested Exercise Instance
    const workout: Prisma.WorkoutCreateInput = {
      date: new Date(),
      exerciseInstances: {
        create: [exerciseInstance],
      },
    };

    // Execute the nested create operation
    const createdWorkout = await prisma.workout.create({
      data: workout,
    });

    console.log(
      "Successfully created instances of all models:",
      createdWorkout
    );
  } catch (error) {
    console.error("Error creating instances:", error);
  } finally {
    await prisma.$disconnect();
  }
};
