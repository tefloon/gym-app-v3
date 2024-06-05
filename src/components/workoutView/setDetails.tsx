import React from "react";
import {
  ExerciseSet as PrismaSet,
  LoadType as PrismaLoadType,
} from "@prisma/client";

type SetDetailsProps = {
  set: PrismaSet;
  loadType: PrismaLoadType;
};

export default function SetDetails({ set, loadType }: SetDetailsProps) {
  const loadValues = set.load.split("x");
  let loadString = `${loadValues[0]} ${loadType.firstUnit}`;

  if (loadType.areBothSignificant) {
    loadString += ` x ${loadValues[1]} ${loadType.secondUnit}`;
  }

  return (
    <div
      key={set.id}
      className="flex flex-row justify-between rounded bg-slate-600 text-slate-300 p-4"
    >
      <span>{set.order}</span>
      <span className="px-24">{loadString}</span>
      <span>{set.wasCompleted ? "✔" : "❌"}</span>
    </div>
  );
}
