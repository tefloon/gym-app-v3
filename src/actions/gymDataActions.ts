"use server";

import prisma from "@/lib/prisma";
import { Prisma } from "@prisma/client";
import { DateTime } from "luxon";
import { createId } from "@paralleldrive/cuid2";

import {
  Workout as PrismaWorkout,
  Category as PrismaCategory,
  LoadType as PrismaLoadType,
  ExerciseType as PrismaExerciseType,
  ExerciseSet as PrismaExerciseSet,
  ExerciseInstance as PrismaExerciseInstance,
} from "@prisma/client";
import { revalidatePath } from "next/cache";

export const handleCreateCategory = async (categoryName: string) => {
  const categoryId = createId();

  try {
    const createCategory = await prisma.category.create({
      data: {
        id: categoryId,
        name: categoryName,
      },
    });

    revalidatePath("/");
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      return e.message;
    }
    throw e;
  }
};

export const handleReturnCategories = async () => {
  const categories = await prisma.category.findMany();
  revalidatePath("/");
  return categories;
};

export const handleDeleteCategoryById = async (id: string) => {
  const categories = await prisma.category.delete({
    where: {
      id: id,
    },
  });
  revalidatePath("/");
  return categories;
};
