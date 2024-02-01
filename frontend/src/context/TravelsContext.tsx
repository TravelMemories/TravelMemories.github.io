import React, { ReactNode, createContext, useContext, useState } from "react";
import { TravelData } from "../model/TravelData";
import ExampleTravels from "../examples/ExampleTravels";
import { StageData } from "../model/StageData";
import { PhotoData } from "../model/PhotoData";
import { PrivacyData } from "../model/PrivacyData";

interface TravelsContextProviderProps {
  children: ReactNode;
}
interface TravelsContextProps {
  travels: TravelData[];
  GetTravelByStageID: (stageID: number) => TravelData | undefined;
  AddTravel: (data: TravelData) => void;
  DeleteTravel: (id: number) => void;
  UpdateTravel: (newData: TravelData) => void;
  GetNewTravelID: () => number;
  GetTravelByID: (id: number) => TravelData | undefined;

  AddStage: (data: StageData, travelId: number) => void;
  DeleteStage: (id: number) => void;
  UpdateStage: (newData: StageData) => void;
  GetNewStageID: () => number;

  GetPublicPhotos: () => PhotoData[];
}
const TravelsContext = createContext({} as TravelsContextProps);

export function useTravelsContext() {
  return useContext(TravelsContext);
}

export function TravelsContextProvider({
  children,
}: TravelsContextProviderProps) {
  const [travels, setTravels] = useState<TravelData[]>(ExampleTravels);

  const GetTravelByStageID = (stageID: number) => {
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
  const GetTravelByID = (id: number) => {
    return travels.find((travel) => travel.id === id);
  };
  const AddStage = (data: StageData, travelId: number) => {
    const travel = GetTravelByID(travelId);
    if (travel === undefined) {
      return;
    }
    travel.stages.push(data);
  };
  const DeleteStage = (id: number) => {
    const travel = GetTravelByStageID(id);
    if (travel === undefined) {
      return;
    }
    travel.stages.filter((stage) => stage.id !== id);
  };
  const UpdateStage = (newData: StageData) => {
    const travel = GetTravelByStageID(newData.id);
    if (travel === undefined) {
      return;
    }
    travel.stages = travel.stages.map((stage) =>
      stage.id === newData.id ? newData : stage
    );
  };
  const GetNewStageID = () => {
    const allStages: StageData[] = [];
    travels.forEach((travel) => {
      travel.stages.forEach((stage) => {
        allStages.push(stage);
      });
    });
    return Math.max(...(allStages.map((stage) => stage.id) as number[])) + 1;
  };
  const GetPublicPhotos = () => {
    const photos: PhotoData[] = [];
    travels.forEach((t) => {
      t.stages.forEach((s) => {
        s.photos.forEach((p) => {
          if (p.privacy === PrivacyData.Public) photos.push(p);
        });
      });
    });
    return photos;
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
        GetTravelByID,
        AddStage,
        DeleteStage,
        UpdateStage,
        GetNewStageID,
        GetPublicPhotos,
      }}
    >
      {children}
    </TravelsContext.Provider>
  );
}
