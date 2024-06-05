import { Prisma } from "@prisma/client";

const translateError = (error: Prisma.PrismaClientKnownRequestError) => {
  let message = "";

  switch (error.code) {
    case "P2002":
      message = `Duplicate ${
        error.meta ? `of ${error.meta.modelName}` : ""
      } found.`;
      break;

    default:
      message = `Something went wrong: \n${error.code} ${error.message}`;
      break;
  }

  return message;
};

export { translateError };
