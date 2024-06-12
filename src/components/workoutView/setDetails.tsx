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
      className="flex flex-row justify-between items-center rounded bg-slate-600 text-slate-300 p-2 cursor-default"
    >
      <span className="px-4">{set.order}</span>
      <span className="text-center grow font-semibold">{loadString}</span>
      {/* <span className="pl-4 text-2xl text-green-500 cursor-pointer">
        {set.wasCompleted ? "🗹" : "☐"}
      </span> */}
      <span>
        <input type="checkbox" checked={set.wasCompleted} name="wasCompleted" id="" />
      </span>
    </div>
  );
}
