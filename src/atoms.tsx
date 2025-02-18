import { atom, selector } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist();
export interface IToDoState {
  [key: string]: string[];
}
export const toDoState = atom<IToDoState>({
  key: "toDo",
  default: {
    "To Do": ["a", "b", "c"],
    Doing: ["d", "e"],
    Done: ["f"],
  },
  effects_UNSTABLE: [persistAtom],
});
