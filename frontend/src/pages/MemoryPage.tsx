import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useTravelsContext } from "../context/TravelsContext";
import { TravelData } from "../model/TravelData";
import { FormatDate } from "../helpers/helpers";
import StagesDisplay from "../components/travels-page/StagesDisplay";
import { StageData } from "../model/StageData";
import { motion } from "framer-motion";
import TravelMap from "../components/travels-page/TravelMap";
import BackButton from "../components/general-purpose/BackButton";
import CustomButton from "../components/general-purpose/CustomButton";
import NewTravelPage from "./NewTravelPage";
import StagePhotosDisplay from "../components/travels-page/StagePhotosDisplay";
import { PhotoData } from "../model/PhotoData";
import NewStagePage from "./NewStagePage";
import HorizontalDisplay from "../components/general-purpose/HorizontalDisplay";
import NewMemoryPage from "./NewMemoryPage";

function MemoryPage() {
  const { travelID, stageID, memoryID } = useParams();
  const { GetPhoto, GetStageByID, DeletePhoto, UpdatePhoto } =
    useTravelsContext();
  const navigate = useNavigate();
  const [photoData, setPhotoData] = useState<PhotoData>();
  const [parentStage, setParentStage] = useState<StageData>();

  const [deleteWindow, setDeleteWindow] = useState(false);
  const [editWindow, setEditWindow] = useState(false);

  useEffect(() => {
    const photo = GetPhoto(Number(travelID), Number(stageID), Number(memoryID));

    if (photo === undefined) {
      navigate("/");
    } else {
      const stage = GetStageByID(photo.stageId as number);
      if (stage === undefined) {
        navigate("/");
      } else {
        setPhotoData(photo);
        setParentStage(stage);
      }
    }
  }, []);

  const editPhotoData = (newData: PhotoData) => {
    setPhotoData(newData);
    setEditWindow(false);
  };

  if (photoData === undefined || parentStage === undefined) {
    return <p>Photo is not available</p>;
  }
  return (
    <>
      {!editWindow ? (
        <div className="relative mt-20 flex flex-col items-center bg-background-50 w-[90%] mx-auto p-2 gap-8">
          <h1 className="text-3xl text-background-300">
            Memory of stage: <b>{parentStage.location}</b>
          </h1>
          <BackButton navigateTo={`/stage/${parentStage.id}`} />
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
                      navigate(`/stage/${parentStage.id}`);
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
          <div className="flex gap-10 items-start w-full mx-auto max-w-[60%]">
            {photoData !== undefined && (
              <TravelMap
                lat={photoData?.lat as number}
                lng={photoData?.lng as number}
              />
            )}
            <div className="flex flex-col items-start gap-2">
              <h1 className="text-6xl">{photoData?.location}</h1>
              <h2 className="text-4xl font-thin">
                {FormatDate(photoData?.date)}
              </h2>
              <p className="mt-1 -mb-3 text-background-500">Description:</p>
              <p className="text-4xl">{photoData?.description}</p>
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
