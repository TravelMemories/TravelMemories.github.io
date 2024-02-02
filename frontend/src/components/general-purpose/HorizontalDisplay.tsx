import React, { Dispatch } from "react";
import { useTravelsContext } from "../../context/TravelsContext";
import { NavLink } from "react-router-dom";
import { motion } from "framer-motion";
import { IoAddCircleOutline } from "react-icons/io5";
import { StageData } from "../../model/StageData";
import { TravelData } from "../../model/TravelData";
import { PhotoData } from "../../model/PhotoData";
import HorizontalDisplayCard from "./HorizontalDisplayCard";
import CustomButton from "./CustomButton";

interface Props<T = any> {
  travels?: TravelData[];
  parentTravel?: TravelData;
  stages?: StageData[];
  parentStage?: StageData;
  photos?: PhotoData[];
  newPhotoOnSelect?: (data: T) => void;
  newPhotoCreatingNew?: React.Dispatch<React.SetStateAction<boolean>>;
  newPhotoBackButton?: () => void;
}
function HorizontalDisplay({
  travels,
  stages,
  photos,
  parentTravel,
  parentStage,
  newPhotoOnSelect,
  newPhotoCreatingNew,
  newPhotoBackButton,
}: Props) {
  if (travels === undefined && stages === undefined && photos === undefined) {
    return <p className="mt-40">No content to display</p>;
  }
  return (
    <div
      className={`${
        newPhotoOnSelect !== undefined
          ? "fixed top-[50%] translate-y-[-50%] left-[50%] translate-x-[-50%] w-[90vw] z-10"
          : "w-full"
      } sm:h-auto mx-auto ${
        travels !== undefined && newPhotoOnSelect === undefined
          ? "bg-background-50"
          : "bg-background-100"
      } p-8 gap-4 flex sm:flex-row flex-col items-center overflow-x-scroll text-primary-950`}
    >
      {newPhotoBackButton && (
        <CustomButton
          className="-ml-6 bg-secondary-400 hover:bg-secondary-500"
          onClick={newPhotoBackButton}
        >
          Back
        </CustomButton>
      )}
      <NavLink
        to={
          travels
            ? "/new-travel"
            : stages && parentTravel
            ? `/new-stage/${parentTravel.id}`
            : photos && parentStage
            ? `/new-memory/${parentStage.id}`
            : "/"
        }
        onClick={(e) => {
          if (newPhotoCreatingNew !== undefined) {
            e.stopPropagation();
            e.preventDefault();
          }
        }}
      >
        <motion.button
          className="flex items-center justify-center bg-action-200 text-2xl px-4 py-2 w-fit text-primary-950 shadow-md hover:bg-action-300 transition-colors rounded-lg aspect-square"
          whileHover={{ scale: 1.02 }}
          onClick={() => {
            if (newPhotoCreatingNew !== undefined) {
              newPhotoCreatingNew(true);
            }
          }}
        >
          <IoAddCircleOutline className="text-3xl " />
          <p className="whitespace-nowrap">
            {travels !== undefined
              ? "New Travel"
              : stages !== undefined
              ? "New Stage"
              : "New Photo"}
          </p>
        </motion.button>
      </NavLink>
      {travels !== undefined && (
        <>
          {travels.length === 0 ? (
            <p className="text-3xl">You don't have any travels yet.</p>
          ) : (
            travels.map((travel) => (
              <HorizontalDisplayCard
                travel={travel}
                newPhotoOnSelect={newPhotoOnSelect}
              />
            ))
          )}
        </>
      )}
      {stages !== undefined && (
        <>
          {stages.length === 0 ? (
            <p className="text-3xl">You don't have any stages yet.</p>
          ) : (
            stages.map((stage) => (
              <HorizontalDisplayCard
                stage={stage}
                newPhotoOnSelect={newPhotoOnSelect}
              />
            ))
          )}
        </>
      )}
      {photos !== undefined && (
        <>
          {photos.length === 0 ? (
            <p className="text-3xl">You don't have any photos yet.</p>
          ) : (
            photos.map((photo) => (
              <HorizontalDisplayCard
                photo={photo}
                newPhotoOnSelect={newPhotoOnSelect}
              />
            ))
          )}
        </>
      )}
    </div>
  );
}

export default HorizontalDisplay;
