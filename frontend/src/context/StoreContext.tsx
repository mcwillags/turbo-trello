import { createContext, PropsWithChildren, useContext } from "react";

import { RootStore } from "../store/Store.ts";

export const StoreContext = createContext<RootStore>({} as RootStore);

export function useStore() {
  return useContext(StoreContext);
}

export function StoreContextProvider({ children }: PropsWithChildren) {
  const rootStore = new RootStore();

  return <StoreContext.Provider value={rootStore}>{children}</StoreContext.Provider>;
}
