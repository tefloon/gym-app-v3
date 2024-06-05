import { PrismaClient, Prisma } from "@prisma/client";
import { DateTime } from "luxon";

export type WorkoutWithDetails = Prisma.WorkoutGetPayload<{
  include: {
    exerciseInstances: {
      include: {
        sets: true;
        exerciseType: {
          include: {
            category: true;
            loadingType: true;
          };
        };
      };
    };
  };
}>;

export type InstanceWithDetails = Prisma.ExerciseInstanceGetPayload<{
  include: {
    sets: true;
    exerciseType: {
      include: {
        category: true;
        loadingType: true;
      };
    };
  };
}>;
