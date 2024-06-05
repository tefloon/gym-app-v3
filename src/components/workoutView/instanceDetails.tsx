import { InstanceWithDetails } from "@/lib/prismaTypes";
import React from "react";
import SetDetails from "./setDetails";

export default function InstanceDetails(instance: InstanceWithDetails) {
  if (instance.sets.length === 0 || !instance.sets) {
    return <div>No sets to show...</div>;
  }

  return (
    <div className="flex flex-col items-center w-full">
      <div>
        <h3 className="text-2xl p-4">{instance.exerciseType.name}</h3>
      </div>
      <div className="flex flex-col gap-2 w-full">
        {instance.sets.map((set, id) => (
          <SetDetails
            key={set.id}
            set={set}
            loadType={instance.exerciseType.loadingType}
          />
        ))}
      </div>
    </div>
  );
}
