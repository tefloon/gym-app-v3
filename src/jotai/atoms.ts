import { atom } from "jotai";
import {
  Workout as PrismaWorkout,
  ExerciseSet as PrismaSet,
} from "@prisma/client";
import { InstanceWithDetails, WorkoutWithDetails } from "@/lib/prismaTypes";

export const modalOpenAtom = atom<boolean>(false);
export const modalModeAtom = atom<"add" | "update">("add");

export const workoutWithDetailsAtom = atom<WorkoutWithDetails | null>(null);
export const instanceWithDetailsAtom = atom<InstanceWithDetails | null>(null);
export const buttonRefAtom = atom<React.RefObject<HTMLDivElement> | null>(null);
export const selectedSetAtom = atom<PrismaSet | null>(null);

export const dateAtom = atom<Date>(new Date());
