import React, { ReactNode, createContext, useContext, useState } from "react";

interface TravelsContextProviderProps {
  children: ReactNode;
}
interface TravelsContextProps {}
const TravelsContext = createContext({} as TravelsContextProps);

export function useUserContext() {
  return useContext(TravelsContext);
}

export function TravelsContextProvider({
  children,
}: TravelsContextProviderProps) {
  return (
    <TravelsContext.Provider value={{}}>{children}</TravelsContext.Provider>
  );
}
