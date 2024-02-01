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
  GetStageByID: (id: number) => StageData | undefined;

  GetPublicPhotos: () => PhotoData[];
  DidUserLikePhoto: (userEmail: string, photoID: number) => boolean;
  LikeDislikePhoto: (userEmail: string, photoID: number) => void;

  AddPhoto: (data: PhotoData, stageData: StageData) => void;
  DeletePhoto: (data: PhotoData) => void;
  UpdatePhoto: (newData: PhotoData) => void;
  GetNewPhotoID: () => number;
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
    return travels.length === 0
      ? 0
      : Math.max(...(travels.map((travel) => travel.id) as number[])) + 1;
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
    travel.stages = travel.stages.filter((stage) => stage.id !== id);
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
    return allStages.length === 0
      ? 0
      : Math.max(...(allStages.map((stage) => stage.id) as number[])) + 1;
  };
  const GetStageByID = (id: number): StageData | undefined => {
    travels.forEach((t) => {
      const stage: StageData | undefined = t.stages.find((s) => s.id === id);
      if (stage !== undefined) {
        return stage;
      }
    });
    return undefined;
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
  const DidUserLikePhoto = (userEmail: string, photoID: number) => {
    const photo = GetPublicPhotos().find((p) => p.id === photoID);
    if (photo === undefined) {
      return false;
    }
    return photo.likes.find((like) => like === userEmail) !== undefined;
  };
  const LikeDislikePhoto = (userEmail: string, photoID: number) => {
    const photo = GetPublicPhotos().find((p) => p.id === photoID);
    if (photo === undefined) {
      return;
    }
    if (DidUserLikePhoto(userEmail, photoID)) {
      photo.likes = photo.likes.filter((like) => like !== userEmail);
    } else {
      photo.likes.push(userEmail);
    }
  };
  const AddPhoto = (data: PhotoData, stageData: StageData) => {
    if (stageData === undefined || data === undefined) {
      return;
    }
    stageData.photos.push(data);
  };
  const DeletePhoto = (data: PhotoData) => {
    if (data === undefined || data?.stageId === undefined) {
      return;
    }
    const stage: StageData | undefined = GetStageByID(data.stageId);
    if (stage === undefined) {
      return;
    }
    stage.photos.filter((p) => p.id !== data.id);
  };
  const UpdatePhoto = (newData: PhotoData) => {
    if (newData === undefined || newData?.stageId === undefined) {
      return;
    }
    const stage: StageData | undefined = GetStageByID(newData.stageId);
    if (stage === undefined) {
      return;
    }
    stage.photos = stage.photos.map((p) => (p.id === newData.id ? newData : p));
  };
  const GetNewPhotoID = () => {
    const allStages: StageData[] = [];
    travels.forEach((travel) => {
      travel.stages.forEach((stage) => {
        allStages.push(stage);
      });
    });
    return allStages.length === 0
      ? 0
      : Math.max(...(allStages.map((stage) => stage.id) as number[])) + 1;
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
        GetStageByID,
        GetPublicPhotos,
        DidUserLikePhoto,
        LikeDislikePhoto,
        AddPhoto,
        DeletePhoto,
        UpdatePhoto,
        GetNewPhotoID,
      }}
    >
      {children}
    </TravelsContext.Provider>
  );
}
