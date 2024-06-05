import { atom } from "jotai";
import { Workout as PrismaWorkout } from "@prisma/client";

export const selectedWorkoutAtom = atom({
  isSelected: false,
  id: "",
});

export const modalAtom = atom({
  isOpen: false,
});

// const rowsAtom = atom({
//   isSelected: false,
//   selectedRow: "",
// });

// const selectedRowAtom = atom(
//   (get) => get(rowsAtom),
//   (get, set, newSelectedRow: string) => {
//     const currentRows = get(rowsAtom);
//     if (newSelectedRow === currentRows.selectedRow && currentRows.isSelected) {
//       set(rowsAtom, { isSelected: false, selectedRow: "" });
//     } else set(rowsAtom, { isSelected: true, selectedRow: newSelectedRow });
//   }
// );

// const selectedSessionAtom = atom({
//   isSelected: false,
//   selectedSessionId: "",
// });

// const workoutAtom = atom({
//   id: "abc",
//   date: "",
// });

// const currentUserAtom = atom({
//   id: "",
//   name: "",
//   email: "",
// });
