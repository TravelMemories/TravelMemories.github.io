import React, { ReactNode, createContext, useContext, useState } from "react";
import { TravelData } from "../model/TravelData";
import ExampleTravels from "../examples/ExampleTravels";

interface TravelsContextProviderProps {
  children: ReactNode;
}
interface TravelsContextProps {
  travels: TravelData[];
  GetTravelByStageID: (stageID: number | undefined) => TravelData | undefined;
}
const TravelsContext = createContext({} as TravelsContextProps);

export function useTravelsContext() {
  return useContext(TravelsContext);
}

export function TravelsContextProvider({
  children,
}: TravelsContextProviderProps) {
  const [travels] = useState<TravelData[]>(ExampleTravels);

  const GetTravelByStageID = (stageID: number | undefined) => {
    if (stageID === undefined) return undefined;
    for (const travel of travels) {
      const foundStage = travel.stages.find((stage) => stage.id === stageID);
      if (foundStage) {
        return travel;
      }
    }
    return undefined;
  };
  return (
    <TravelsContext.Provider value={{ travels, GetTravelByStageID }}>
      {children}
    </TravelsContext.Provider>
  );
}
