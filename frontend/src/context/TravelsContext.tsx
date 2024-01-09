import React, { ReactNode, createContext, useContext, useState } from "react";
import { TravelData } from "../model/TravelData";
import ExampleTravels from "../examples/ExampleTravels";

interface TravelsContextProviderProps {
  children: ReactNode;
}
interface TravelsContextProps {
  travels: TravelData[];
}
const TravelsContext = createContext({} as TravelsContextProps);

export function useTravelsContext() {
  return useContext(TravelsContext);
}

export function TravelsContextProvider({
  children,
}: TravelsContextProviderProps) {
  const [travels] = useState<TravelData[]>(ExampleTravels);
  return (
    <TravelsContext.Provider value={{ travels }}>
      {children}
    </TravelsContext.Provider>
  );
}
