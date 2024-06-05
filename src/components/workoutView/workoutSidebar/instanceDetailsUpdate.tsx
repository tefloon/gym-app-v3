import { InstanceWithDetails } from "@/lib/prismaTypes";
import React from "react";
import SetDetails from "@/components/workoutView/setDetails";
import { useAtom } from "jotai";
import {
  instanceWithDetailsAtom,
  modalOpenAtom,
  modalModeAtom,
} from "@/jotai/atoms";

export default function InstanceDetailsUpdate(instance: InstanceWithDetails) {
  const handleSelectInstance = () => {
    console.log("Selo!");
    // setSelectedInstance(instance);
    // setModalMode("update");
    // setIsModalOpen(true);
  };

  if (instance.sets.length === 0 || !instance.sets) {
    return <div>No sets to show...</div>;
  }

  return (
    <div
      className="flex flex-col items-center w-full bg-slate-800 rounded-xl px-4 pb-4 hover:bg-slate-900 cursor-pointer"
      onClick={handleSelectInstance}
    >
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
