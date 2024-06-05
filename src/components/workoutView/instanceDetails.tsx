import { InstanceWithDetails } from "@/lib/prismaTypes";
import React from "react";
import SetDetails from "./setDetails";

export default function InstanceDetails(instance: InstanceWithDetails) {
  if (instance.sets.length === 0 || !instance.sets) {
    return <div>No sets to show...</div>;
  }

  return (
    <div className="flex flex-col gap-2 ">
      {instance.sets.map((set, id) => (
        <SetDetails
          key={set.id}
          set={set}
          loadType={instance.exerciseType.loadingType}
        />
      ))}
    </div>
  );
}
