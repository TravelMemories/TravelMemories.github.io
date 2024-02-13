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
  publicPhotos: PhotoData[];

  LoadUserTravels: (userData: UserData | undefined) => void;
  LoadPublicPhotosTravels: (userData: UserData | undefined) => void;

  AddTravel: (travelData: TravelData, userData: UserData) => void;
  DeleteTravel: (id: number, userData: UserData) => void;
  UpdateTravel: (travelData: TravelData, userData: UserData) => void;
  GetTravelByID: (id: number) => TravelData | undefined;

  AddStage: (stageData: StageData) => void;
  DeleteStage: (stageData: StageData) => void;
  UpdateStage: (stageData: StageData) => void;
  GetStageByID: (id: number) => StageData | undefined;
  AddPhoto: (data: PhotoData) => void;
  DeletePhoto: (data: PhotoData) => Promise<void>;
  UpdatePhoto: (newData: PhotoData) => void;
  GetPhoto: (
    discover: boolean,
    travelID: number,
    stageID: number,
    photoID: number
  ) => PhotoData | undefined;
  IsUserOwner: (travel: TravelData, userData: UserData | undefined) => boolean;

  LikeDislikePhoto: (
    userData: UserData,
    photoData: PhotoData
  ) => Promise<boolean>;
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
  const [publicPhotos, setPublicPhotos] = useState<PhotoData[]>([]);
  const UpdateTravelsFromJson = (
    jsonData: any,
    setTravels: React.Dispatch<React.SetStateAction<TravelData[]>>
  ): TravelData[] => {
    if (jsonData === undefined) {
      setTravels([]);
      return [];
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
      return ExampleTravels;
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
    return loadedTravels;
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
  const LoadPublicPhotosTravels = async (userData: UserData | undefined) => {
    try {
      const response = await api.get(`/travel/public-photos`);
      if (response && response.data) {
        const travels = UpdateTravelsFromJson(
          response.data,
          setPublicPhotoTravels
        );
        const loadedPhotos: PhotoData[] = [];
        travels.forEach((t) =>
          t.stages.forEach((s) =>
            s.photos.forEach((p) => {
              if (p.privacy === PrivacyData.Public) {
                loadedPhotos.push(p);
              }
            })
          )
        );
        setPublicPhotos(loadedPhotos);
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
        email: userData.email,
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
      .then((resp) => {
        console.log(resp);
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
  const AddPhoto = (photoData: PhotoData) => {
    if (photoData.parentStage === undefined) return;
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
    api
      .put(`/photo/add?stageId=${photoData.parentStage.id as number}`, formData)
      .then((resp: any) => {
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
      await api
        .delete(`/photo/delete?id=${photoData.id}`)
        .then((resp) => {
          setUserTravels((prev) =>
            prev.map((travel) =>
              travel.id !== photoData.parentStage?.parentTravel?.id
                ? travel
                : {
                    ...travel,
                    stages: travel.stages.map((s) =>
                      s.id === photoData.parentStage?.id
                        ? {
                            ...s,
                            photos: s.photos.filter(
                              (p) => p.id !== photoData.id
                            ),
                          }
                        : s
                    ),
                  }
            )
          );
        })
        .catch((err) => {
          throw err;
        });
    }
  };
  const UpdatePhoto = (photoData: PhotoData) => {
    if (photoData.parentStage === undefined) return;
    const formData = new FormData();
    formData.append("id", (photoData.id as number).toString());
    formData.append(
      "photoDate",
      new Date(photoData.date).toISOString().slice(0, 19).replace("T", " ")
    );
    formData.append("description", photoData.description);
    formData.append(
      "locationName",
      photoData.location ? photoData.location : ""
    );
    formData.append("latitude", photoData.lat.toString());
    formData.append("longitude", photoData.lng.toString());
    formData.append(
      "privacy",
      photoData.privacy === PrivacyData.Private ? "1" : "0"
    );
    api
      .put(`/photo/add?stageId=${photoData.parentStage.id as number}`, formData)
      .then((resp: any) => {
        setUserTravels((prev) =>
          prev.map((travel) =>
            travel.id !== photoData.parentStage?.parentTravel?.id
              ? travel
              : {
                  ...travel,
                  stages: travel.stages.map((s) =>
                    s.id === photoData.parentStage?.id
                      ? {
                          ...s,
                          photos: s.photos.map((p) =>
                            p.id === photoData.id ? photoData : p
                          ),
                        }
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
  const GetPhoto = (
    discover: boolean,
    travelID: number,
    stageID: number,
    photoID: number
  ): PhotoData | undefined => {
    if (discover) {
      const photo = publicPhotoTravels
        .find((t) => t.id === travelID)
        ?.stages.find((s) => s.id === stageID)
        ?.photos.find((p) => p.id === photoID);
      return photo;
    }
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
  const LikeDislikePhoto = async (
    userData: UserData,
    photoData: PhotoData
  ): Promise<boolean> => {
    try {
      const resp = await api.put(
        `/like/save?photoId=${photoData.id}&userId=${userData.id}`
      );
      setUserTravels((prev) =>
        prev.map((t) =>
          t.id !== photoData.parentStage?.parentTravel?.id
            ? t
            : {
                ...t,
                stages: t.stages.map((s) =>
                  s.id !== photoData.parentStage?.id
                    ? s
                    : {
                        ...s,
                        photos: s.photos.map((p) =>
                          p.id !== photoData.id
                            ? p
                            : {
                                ...p,
                                likes:
                                  resp.data === true
                                    ? [...p.likes, userData.id]
                                    : p.likes.filter((l) => l !== userData.id),
                              }
                        ),
                      }
                ),
              }
        )
      );
      setPublicPhotos((prev) =>
        prev.map((p) =>
          p.id !== photoData.id
            ? p
            : {
                ...p,
                likes:
                  resp.data === true
                    ? [...p.likes, userData.id]
                    : p.likes.filter((l) => l !== userData.id),
              }
        )
      );

      return resp.data;
    } catch (err) {
      console.log(err);
      throw err;
    }
  };
  return (
    <TravelsContext.Provider
      value={{
        userTravels,
        publicPhotoTravels,
        publicPhotos,
        LoadUserTravels,
        AddTravel,
        DeleteTravel,
        UpdateTravel,
        GetTravelByID,
        AddStage,
        DeleteStage,
        UpdateStage,
        GetStageByID,
        AddPhoto,
        DeletePhoto,
        UpdatePhoto,
        GetPhoto,
        IsUserOwner,
        LoadPublicPhotosTravels,
        LikeDislikePhoto,
      }}
    >
      {children}
    </TravelsContext.Provider>
  );
}
