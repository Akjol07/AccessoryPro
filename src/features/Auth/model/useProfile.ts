import { create } from "zustand";

interface Store {
  isAuth: boolean | null;
  setIsAuth: (value: boolean) => void;
}

export const useProfile = create<Store>()((set) => ({
  isAuth: null,
  setIsAuth: (value: boolean) => set(() => ({ isAuth: value })),
}));
