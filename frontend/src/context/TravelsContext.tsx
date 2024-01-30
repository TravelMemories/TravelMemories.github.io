import React, { ReactNode, createContext, useContext, useState } from "react";
import { TravelData } from "../model/TravelData";
import ExampleTravels from "../examples/ExampleTravels";

interface TravelsContextProviderProps {
  children: ReactNode;
}
interface TravelsContextProps {
  travels: TravelData[];
  GetTravelByStageID: (stageID: number | undefined) => TravelData | undefined;
  AddTravel: (data: TravelData) => void;
  DeleteTravel: (id: number) => void;
  UpdateTravel: (newData: TravelData) => void;
  GetNewTravelID: () => number;
}
const TravelsContext = createContext({} as TravelsContextProps);

export function useTravelsContext() {
  return useContext(TravelsContext);
}

export function TravelsContextProvider({
  children,
}: TravelsContextProviderProps) {
  const [travels, setTravels] = useState<TravelData[]>(ExampleTravels);
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
  const AddTravel = (data: TravelData) => {
    setTravels((prev) => [...prev, data]);
  };
  const DeleteTravel = (id: number) => {
    setTravels((prev) => prev.filter((travel) => travel.id !== id));
  };
  const UpdateTravel = (newData: TravelData) => {
    setTravels((prev) =>
      prev.map((travel) => (travel.id === newData.id ? newData : travel))
    );
  };
  const GetNewTravelID = () => {
    return Math.max(...(travels.map((travel) => travel.id) as number[])) + 1;
  };
  return (
    <TravelsContext.Provider
      value={{
        travels,
        GetTravelByStageID,
        AddTravel,
        DeleteTravel,
        UpdateTravel,
        GetNewTravelID,
      }}
    >
      {children}
    </TravelsContext.Provider>
  );
}
