import React, {
  ReactNode,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { TravelData } from "../model/TravelData";
import ExampleTravels from "../examples/ExampleTravels";
import { StageData } from "../model/StageData";
import { PhotoData } from "../model/PhotoData";
import { PrivacyData } from "../model/PrivacyData";
import { useUserContext } from "./UserContext";

interface TravelsContextProviderProps {
  children: ReactNode;
}
interface TravelsContextProps {
  travels: TravelData[];
  GetUserTravels: () => TravelData[];
  LoadTravels: () => void;

  AddTravel: (data: TravelData) => void;
  DeleteTravel: (id: number) => void;
  UpdateTravel: (newData: TravelData) => void;
  GetNewTravelID: () => number;
  GetTravelByID: (id: number) => TravelData | undefined;
  GetUserTravelByID: (id: number) => TravelData | undefined;

  AddStage: (data: StageData, travelId: number) => void;
  DeleteStage: (id: number) => void;
  UpdateStage: (newData: StageData) => void;
  GetNewStageID: () => number;
  GetStageByID: (id: number) => StageData | undefined;

  GetPublicPhotos: () => PhotoData[];
  DidUserLikePhoto: (userEmail: string, photoID: number) => boolean;
  LikeDislikePhoto: (userEmail: string, photoID: number) => void;

  AddPhoto: (data: PhotoData) => void;
  DeletePhoto: (data: PhotoData) => void;
  UpdatePhoto: (newData: PhotoData) => void;
  GetNewPhotoID: () => number;
  GetPhoto: (
    travelID: number,
    stageID: number,
    photoID: number
  ) => PhotoData | undefined;
  IsUserOwner: (travel: TravelData) => boolean;
}
const TravelsContext = createContext({} as TravelsContextProps);

export function useTravelsContext() {
  return useContext(TravelsContext);
}

export function TravelsContextProvider({
  children,
}: TravelsContextProviderProps) {
  const [travels, setTravels] = useState<TravelData[]>(ExampleTravels);
  const { userData } = useUserContext();

  const GetUserTravels = () => {
    return travels.filter((t) => t.userEmail === userData?.email);
  };

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
  const GetUserTravelByID = (id: number) => {
    return GetUserTravels().find((travel) => travel.id === id);
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
      const stage = t.stages.find((s) => s.id === id);
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
  const AddPhoto = (data: PhotoData) => {
    if (data === undefined) {
      return;
    }
    data.parentStage?.photos.push(data);
  };
  const DeletePhoto = (data: PhotoData) => {
    if (!data || !data.parentStage) {
      return;
    }
    data.parentStage.photos.filter((p) => p.id !== data.id);
  };
  const UpdatePhoto = (newData: PhotoData) => {
    if (!newData || !newData.parentStage) {
      return;
    }
    newData.parentStage.photos = newData.parentStage.photos.map((p) =>
      p.id === newData.id ? newData : p
    );
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
  const GetPhoto = (travelID: number, stageID: number, photoID: number) => {
    const photo = travels
      .find((t) => t.id === travelID)
      ?.stages.find((s) => s.id === stageID)
      ?.photos.find((p) => p.id === photoID);
    return photo;
  };
  const IsUserOwner = (travel: TravelData) => {
    return travel.userEmail === userData?.email;
  };
  const LoadTravels = useCallback(() => {
    //call api to load all travels
  }, []);
  useEffect(() => {
    LoadTravels();
  }, [LoadTravels]);
  return (
    <TravelsContext.Provider
      value={{
        travels,
        GetUserTravels,
        AddTravel,
        DeleteTravel,
        UpdateTravel,
        GetNewTravelID,
        GetTravelByID,
        GetUserTravelByID,
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
        GetPhoto,
        IsUserOwner,
        LoadTravels,
      }}
    >
      {children}
    </TravelsContext.Provider>
  );
}
