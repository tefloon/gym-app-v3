import { InstanceWithDetails } from "@/lib/prismaTypes";
import React from "react";
import SetDetails from "./setDetails";
import { useAtom } from "jotai";
import {
  instanceWithDetailsAtom,
  modalOpenAtom,
  modalModeAtom,
} from "@/jotai/atoms";

export default function InstanceDetails(instance: InstanceWithDetails) {
  const [, setIsModalOpen] = useAtom(modalOpenAtom);
  const [, setSelectedInstance] = useAtom(instanceWithDetailsAtom);
  const [, setModalMode] = useAtom(modalModeAtom);

  const handleSelectInstance = () => {
    setSelectedInstance(instance);
    setModalMode("update");
    setIsModalOpen(true);
  };

  if (instance.sets.length === 0 || !instance.sets) {
    return <div>No sets to show...</div>;
  }

  // [ ]: Maybe add a cogwheel icon or something for changing the instance
  return (
    <div
      className="flex flex-col items-center w-full bg-slate-800 rounded-xl px-4 py-4 hover:bg-slate-900 cursor-pointer dont-close"
      onClick={handleSelectInstance}
    >
      <div>
        <h3 className="text-xl font-bold mb-4 text-center">
          {instance.exerciseType.name}
        </h3>
      </div>
      <div className="flex flex-col gap-2 w-full">
        {instance.sets
          .sort((a, b) => a.order - b.order)
          .map((set, id) => (
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
