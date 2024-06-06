import { Prisma } from "@prisma/client";

const translateError = (error: Prisma.PrismaClientKnownRequestError) => {
  let message = "";

  switch (error.code) {
    case "P2002":
      message = `Duplicate ${
        error.meta ? `of ${error.meta.modelName}` : ""
      } found.`;
      break;

    case "P2003":
      message = `Foreign key constraint ${
        error.meta ? `on the ${error.meta.modelName} field` : ""
      } failed.\nIn other words you try to delete a record that has records from other tables depend on it.`;
      break;

    default:
      message = `Something went wrong: \n${error.code} ${error.message}`;
      break;
  }

  return message;
};

export { translateError };
