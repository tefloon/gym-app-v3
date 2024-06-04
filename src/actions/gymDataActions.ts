"use server";

import prisma from "@/lib/prisma";
import { Prisma } from "@prisma/client";
import { DateTime } from "luxon";
import { createId } from "@paralleldrive/cuid2";

import { revalidatePath } from "next/cache";

const translateError = (error: Prisma.PrismaClientKnownRequestError) => {
  let message = "";

  switch (error.code) {
    case "P2002":
      message = `Duplicate ${
        error.meta ? `of ${error.meta.modelName}` : ""
      } found.`;
      break;

    default:
      message = `Something went wrong.`;
      break;
  }

  return message;
};

type CreateCategoryProps = {
  name: string;
  id?: string;
};

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
