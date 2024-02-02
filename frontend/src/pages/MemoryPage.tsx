import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useTravelsContext } from "../context/TravelsContext";
import { FormatDate } from "../helpers/helpers";
import BackButton from "../components/general-purpose/BackButton";
import CustomButton from "../components/general-purpose/CustomButton";
import { PhotoData } from "../model/PhotoData";
import LikesDisplay from "../components/public-memories/LikesDisplay";
import { useUserContext } from "../context/UserContext";
interface Props {
  discover?: boolean;
}
function MemoryPage({ discover }: Props) {
  const { travelID, stageID, memoryID } = useParams();
  const { GetPhoto, DeletePhoto, IsUserOwner } = useTravelsContext();
  const { userData } = useUserContext();
  const navigate = useNavigate();
  const [photoData, setPhotoData] = useState<PhotoData>();

  const [deleteWindow, setDeleteWindow] = useState(false);
  const [editWindow, setEditWindow] = useState(false);

  useEffect(() => {
    const photo = GetPhoto(Number(travelID), Number(stageID), Number(memoryID));

    if (photo === undefined) {
      navigate("/");
    } else {
      setPhotoData(photo);
    }
  }, []);

  const editPhotoData = (newData: PhotoData) => {
    setPhotoData(newData);
    setEditWindow(false);
  };

  if (photoData === undefined || !photoData.parentStage) {
    return <p>Photo is not available</p>;
  }
  return (
    <>
      {!editWindow ? (
        <div className="relative mt-20 flex flex-col items-center bg-background-50 w-[90%] mx-auto p-4 gap-8">
          <BackButton
            navigateTo={
              userData &&
              IsUserOwner(photoData.parentStage.parentTravel) &&
              discover === undefined
                ? `/stage/${photoData.parentStage?.parentTravel.id}/${photoData.parentStage?.id}`
                : "/public-memories"
            }
          />
          {userData && IsUserOwner(photoData.parentStage.parentTravel) && (
            <div className="absolute top-5 right-5 flex flex-col items-end gap-1 z-20">
              <CustomButton
                variant={"edit"}
                onClick={() => {
                  setEditWindow(true);
                }}
              ></CustomButton>
              <CustomButton
                variant={"delete"}
                onClick={() => {
                  setDeleteWindow(true);
                }}
              ></CustomButton>
            </div>
          )}
          {deleteWindow && (
            <div className="fixed z-30 inset-0 flex items-center justify-center">
              <div
                className="fixed inset-0 z-50 bg-black/50"
                onClick={(e) => {
                  e.stopPropagation();
                  setDeleteWindow(false);
                }}
              ></div>
              <div className="bg-primary-50 py-10 px-10 text-4xl flex flex-col items-center justify-center rounded-md z-50">
                <p>Do you want to delete this memory?</p>
                <p className="text-base">(This action cannot be reversed)</p>
                <div className="mt-2 flex w-full items-center justify-around">
                  <CustomButton
                    className="bg-red-400 hover:bg-red-500 w-60"
                    onClick={() => {
                      DeletePhoto(photoData);
                      navigate(`/stage/${photoData.parentStage?.id}`);
                    }}
                  >
                    Yes
                  </CustomButton>
                  <CustomButton
                    variant={"actionDark"}
                    className="w-60"
                    onClick={() => {
                      setDeleteWindow(false);
                    }}
                  >
                    No
                  </CustomButton>
                </div>
              </div>
            </div>
          )}
          <div className="flex items-start w-full mx-auto max-w-[80%] gap-10 h-full">
            <div className="flex w-[30rem] flex-col">
              <img
                src={photoData.imageSource}
                alt="You photo"
                className="object-cover aspect-square w-full rounded-md shadow-md mb-4"
              />
              <LikesDisplay photoData={photoData} className="text-5xl" />
            </div>
            <div className="flex flex-col items-start gap-2 h-full ">
              <p className="mt-1 -mb-3 text-background-500">Location:</p>
              <h1 className="text-6xl">{photoData?.location}</h1>
              <h2 className="text-4xl font-thin">
                {FormatDate(photoData?.date)}
              </h2>
              <p className="mt-1 -mb-3 text-background-500">Description:</p>
              <p className="text-4xl">{photoData?.description}</p>

              <div className="flex flex-col items-start gap-1 mt-auto">
                <p className="mt-1 -mb-3 text-background-500">Travel to:</p>
                <p className="text-2xl">
                  {photoData?.parentStage.parentTravel.location}
                </p>
                <p className=" -mb-3 text-background-500">Stage of travel:</p>
                <p className="text-2xl">{photoData?.parentStage.location}</p>
              </div>
            </div>
          </div>
        </div>
      ) : (
        // <NewMemoryPage
        //   editPage={{
        //     photoData: photoData,
        //     travelID: photoData.travelID,
        //     setphotoData: editphotoData,
        //     cancelEditing: () => {
        //       setEditWindow(false);
        //     },
        //   }}
        // />
        <></>
      )}
    </>
  );
}

export default MemoryPage;
