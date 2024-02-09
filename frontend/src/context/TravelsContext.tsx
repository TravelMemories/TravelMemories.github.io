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
import api from "../api/api";
import { UserData } from "../model/UserData";
import Placeholder from "../images/placeholder.png";

interface TravelsContextProviderProps {
  children: ReactNode;
}
interface TravelsContextProps {
  userTravels: TravelData[];
  publicPhotoTravels: TravelData[];

  LoadUserTravels: (userData: UserData | undefined) => void;
  LoadPublicPhotosTravels: () => void;

  AddTravel: (travelData: TravelData, userData: UserData) => void;
  DeleteTravel: (id: number, userData: UserData) => void;
  UpdateTravel: (travelData: TravelData, userData: UserData) => void;
  GetTravelByID: (id: number) => TravelData | undefined;

  AddStage: (stageData: StageData) => void;
  DeleteStage: (stageData: StageData) => void;
  UpdateStage: (stageData: StageData) => void;
  GetStageByID: (id: number) => StageData | undefined;

  DidUserLikePhoto: (
    userData: UserData | undefined,
    photo: PhotoData
  ) => boolean;
  LikeDislikePhoto: (
    userData: UserData | undefined,
    photo: PhotoData
  ) => boolean;
  GetLikes: (photo: PhotoData) => number;

  AddPhoto: (data: PhotoData) => void;
  DeletePhoto: (data: PhotoData) => Promise<void>;
  UpdatePhoto: (newData: PhotoData) => void;
  GetPhoto: (
    travelID: number,
    stageID: number,
    photoID: number
  ) => PhotoData | undefined;
  IsUserOwner: (travel: TravelData, userData: UserData | undefined) => boolean;
}
const TravelsContext = createContext({} as TravelsContextProps);

export function useTravelsContext() {
  return useContext(TravelsContext);
}

export function TravelsContextProvider({
  children,
}: TravelsContextProviderProps) {
  const [userTravels, setUserTravels] = useState<TravelData[]>([]);
  const [publicPhotoTravels, setPublicPhotoTravels] = useState<TravelData[]>(
    []
  );
  const UpdateTravelsFromJson = (
    jsonData: any,
    setTravels: React.Dispatch<React.SetStateAction<TravelData[]>>
  ) => {
    if (jsonData === undefined) {
      setTravels([]);
      return;
    }
    let loadedTravels: TravelData[] = [];
    try {
      loadedTravels = (jsonData as any[]).map((travel) => {
        const newTravel: TravelData = {
          id: travel.id,
          location: travel.locationName,
          lat: travel.latitude,
          lng: travel.longitude,
          description: travel.description,
          date: new Date(travel.travelDate),
          userID: travel.user.id,
          stages: travel.stages.map((stage: any) => {
            const newStage: StageData = {
              id: stage.id,
              location: stage.locationName,
              lat: stage.latitude,
              lng: stage.longitude,
              description: stage.description,
              date: stage.stageDate,
              parentTravel: undefined,
              photos: stage.photos.map((photo: any) => {
                let imageSource = "";
                try {
                  imageSource = `data:image/jpeg;base64,${photo.photoData}`;
                } catch (err) {}
                const newPhoto: PhotoData = {
                  id: photo.id,
                  description: photo.description,
                  privacy:
                    photo.privacy === 0
                      ? PrivacyData.Public
                      : PrivacyData.Private,
                  date: photo.photoDate,
                  location: photo.locationName,
                  lat: photo.latitude,
                  lng: photo.longitude,
                  parentStage: undefined,
                  photoData: photo.photoData,
                  imageSource: imageSource === "" ? Placeholder : imageSource,
                  likes: photo.likes.map(
                    (like: any) => like.userId as number
                  ) as number[],
                };

                return newPhoto;
              }),
            };
            return newStage;
          }),
        };
        return newTravel;
      });
    } catch (error) {
      console.log(error);
      loadedTravels = ExampleTravels;
    }

    loadedTravels.forEach((travel) => {
      travel.stages.forEach((stage) => {
        stage.parentTravel = travel;
        if (stage.photos === undefined) {
          stage.photos = [];
        } else {
          stage.photos.forEach((photo) => {
            photo.parentStage = stage;
            if (photo.likes === undefined) {
              photo.likes = [];
            } else if (
              photo.location === undefined ||
              photo.location === "" ||
              photo.location === null
            ) {
              photo.location = photo.parentStage.location;
            }
          });
        }
        if (
          stage.location === undefined ||
          stage.location === "" ||
          stage.location === null
        ) {
          stage.location = stage.parentTravel.location;
        }
      });
    });

    setTravels(loadedTravels);
  };
  const LoadUserTravels = async (userData: UserData | undefined) => {
    if (!userData) {
      setUserTravels([]);
      return;
    }
    try {
      const response = await api.get(`/travel?userId=${userData.id}`);
      if (response && response.data.content) {
        UpdateTravelsFromJson(response.data.content, setUserTravels);
      }
    } catch (err) {
      console.log(err);
    }
  };
  const LoadPublicPhotosTravels = async () => {
    try {
      const response = await api.get(`/travel/public-photos`);
      if (response && response.data) {
        UpdateTravelsFromJson(response.data, setPublicPhotoTravels);
      }
    } catch (err) {
      console.log(err);
    }
  };
  const DeleteTravel = async (id: number, userData: UserData) => {
    await api
      .delete(`/travel/delete?id=${id}&userId=${userData.id}`)

      .then((response) => {
        setUserTravels((prev) => prev.filter((t) => t.id !== id));
      })
      .catch((err) => {
        console.log(
          "Cannot remove travel:" + id + " user ID: " + userData.id + err
        );
      });
  };
  const AddTravel = async (travelData: TravelData, userData: UserData) => {
    const newTravel = {
      user: {
        id: userData.id,
      },
      travelDate: travelData.date.toISOString().slice(0, 19).replace("T", " "),
      locationName: travelData.location,
      latitude: travelData.lat,
      longitude: travelData.lng,
      description: travelData.description,
      attraction: null,
      attractionLink: null,
      stages: [],
    };
    api
      .put(`/travel/add`, newTravel)
      .catch((err) => {
        console.log(err);
      })
      .then((resp: any) => {
        travelData.id = resp.data.id;
        setUserTravels((prev) => [...prev, travelData]);
      });
  };
  const UpdateTravel = (travelData: TravelData, userData: UserData) => {
    const newTravel = {
      id: travelData.id,
      user: {
        id: userData.id,
      },
      travelDate: travelData.date.toISOString().slice(0, 19).replace("T", " "),
      locationName: travelData.location,
      latitude: travelData.lat,
      longitude: travelData.lng,
      description: travelData.description,
      attraction: null,
      attractionLink: null,
      stages: travelData.stages,
    };
    api
      .put(`/travel/add`, newTravel)
      .catch((err) => {
        console.log(err);
      })
      .then((resp) => {
        setUserTravels((prev) =>
          prev.map((travel) =>
            travel.id === travelData.id ? travelData : travel
          )
        );
      });
  };
  const GetTravelByID = (id: number) => {
    return userTravels.find((travel) => travel.id === id);
  };
  const AddStage = async (stageData: StageData) => {
    if (stageData.parentTravel === undefined) return;
    const newStage = {
      stageDate: stageData.date.toISOString().slice(0, 19).replace("T", " "),
      description: stageData.description,
      locationName: stageData.location,
      latitude: stageData.lat,
      longitude: stageData.lng,
      attraction: null,
      attractionLink: null,
      photos: [],
    };
    api
      .put(
        `/stage/add?travelId=${stageData.parentTravel.id as number}`,
        newStage
      )
      .catch((err) => {
        console.log(err);
      })
      .then((resp: any) => {
        stageData.id = resp.data.id;
        setUserTravels((prev) =>
          prev.map((travel) =>
            travel.id !== stageData.parentTravel?.id
              ? travel
              : { ...travel, stages: [...travel.stages, stageData] }
          )
        );
      });
  };
  const DeleteStage = async (stageData: StageData) => {
    api
      .delete(`/stage/delete?id=${stageData.id}`)
      .then((resp) => {
        setUserTravels((prev) =>
          prev.map((travel) =>
            travel.id !== stageData.parentTravel?.id
              ? travel
              : {
                  ...travel,
                  stages: travel.stages.filter((s) => s.id !== stageData.id),
                }
          )
        );
      })
      .catch((err) => {
        throw err;
      });
  };
  const UpdateStage = (stageData: StageData) => {
    if (stageData.parentTravel === undefined) return;
    const newStage = {
      id: stageData.id,
      stageDate: new Date(stageData.date)
        .toISOString()
        .slice(0, 19)
        .replace("T", " "),
      description: stageData.description,
      locationName: stageData.location,
      latitude: stageData.lat,
      longitude: stageData.lng,
      attraction: null,
      attractionLink: null,
      photos: stageData.photos,
    };
    api
      .put(
        `/stage/add?travelId=${stageData.parentTravel.id as number}`,
        newStage
      )
      .catch((err) => {
        console.log(err);
      })
      .then((resp: any) => {
        stageData.id = resp.data.id;
        setUserTravels((prev) =>
          prev.map((travel) =>
            travel.id !== stageData.parentTravel?.id
              ? travel
              : {
                  ...travel,
                  stages: travel.stages.map((s) =>
                    s.id === stageData.id ? stageData : s
                  ),
                }
          )
        );
      });
  };
  const GetStageByID = (id: number): StageData | undefined => {
    userTravels.forEach((t) => {
      const stage = t.stages.find((s) => s.id === id);
      if (stage !== undefined) {
        return stage;
      }
    });
    return undefined;
  };
  const DidUserLikePhoto = (
    userData: UserData | undefined,
    photo: PhotoData
  ) => {
    if (photo === undefined || !userData) {
      return false;
    }
    return photo.likes.find((like) => like === userData.id) !== undefined;
  };
  const LikeDislikePhoto = (
    userData: UserData | undefined,
    photo: PhotoData
  ) => {
    if (photo === undefined || !userData) {
      return false;
    }
    if (DidUserLikePhoto(userData, photo)) {
      photo.likes = photo.likes.filter((like) => like !== userData.id);
      return false;
    } else {
      photo.likes.push(userData.id);
      return true;
    }
  };
  const GetLikes = (photo: PhotoData) => {
    return photo.likes.length;
  };
  const AddPhoto = (photoData: PhotoData) => {
    if (photoData.parentStage === undefined) return;
    // const newPhoto = {
    //   photoDate: photoData.date.toISOString().slice(0, 19).replace("T", " "),
    //   description: photoData.description,
    //   locationName: photoData.location,
    //   latitude: photoData.lat,
    //   longitude: photoData.lng,
    //   //photoData: photoData.photoData,
    //   privacy: photoData.privacy === PrivacyData.Private ? 1 : 0,
    //   likes: [],
    // };
    const formData = new FormData();
    formData.append(
      "photoDate",
      photoData.date.toISOString().slice(0, 19).replace("T", " ")
    );
    formData.append("description", photoData.description);
    formData.append(
      "locationName",
      photoData.location ? photoData.location : ""
    );
    formData.append("latitude", photoData.lat.toString());
    formData.append("longitude", photoData.lng.toString());
    formData.append("photoData", photoData.photoData);
    formData.append(
      "privacy",
      photoData.privacy === PrivacyData.Private ? "1" : "0"
    );
    if (photoData.likes.length > 0) {
      formData.append("likes", JSON.stringify(photoData.likes));
    }

    api
      .put(`/photo/add?stageId=${photoData.parentStage.id as number}`, formData)
      .then((resp: any) => {
        console.log(resp);
        photoData.id = resp.data.id;
        setUserTravels((prev) =>
          prev.map((travel) =>
            travel.id !== photoData.parentStage?.parentTravel?.id
              ? travel
              : {
                  ...travel,
                  stages: travel.stages.map((s) =>
                    s.id === photoData.parentStage?.id
                      ? { ...s, photos: [...s.photos, photoData] }
                      : s
                  ),
                }
          )
        );
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const DeletePhoto = async (photoData: PhotoData): Promise<void> => {
    if (photoData) {
      await api.delete(`/photo/delete?id=${photoData.id}`).catch((err) => {
        throw err;
      });
    }
    // if (!data || !data.parentStage) {
    //   return;
    // }
    // data.parentStage.photos = data.parentStage.photos.filter(
    //   (p) => p.id !== data.id
    // );
  };
  const UpdatePhoto = (newData: PhotoData) => {
    if (!newData || !newData.parentStage) {
      return;
    }
    newData.parentStage.photos = newData.parentStage.photos.map((p) =>
      p.id === newData.id ? newData : p
    );
  };
  const GetPhoto = (travelID: number, stageID: number, photoID: number) => {
    const photo = userTravels
      .find((t) => t.id === travelID)
      ?.stages.find((s) => s.id === stageID)
      ?.photos.find((p) => p.id === photoID);
    return photo;
  };
  const IsUserOwner = (travel: TravelData, userData: UserData | undefined) => {
    if (!userData) {
      return false;
    }
    return travel.userID === userData.id;
  };

  return (
    <TravelsContext.Provider
      value={{
        userTravels,
        publicPhotoTravels,
        LoadUserTravels,
        AddTravel,
        DeleteTravel,
        UpdateTravel,
        GetTravelByID,
        AddStage,
        DeleteStage,
        UpdateStage,
        GetStageByID,
        DidUserLikePhoto,
        LikeDislikePhoto,
        GetLikes,
        AddPhoto,
        DeletePhoto,
        UpdatePhoto,
        GetPhoto,
        IsUserOwner,
        LoadPublicPhotosTravels,
      }}
    >
      {children}
    </TravelsContext.Provider>
  );
}
