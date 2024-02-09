import React from "react";
import { TravelData } from "../../model/TravelData";
import Placeholder from "../../images/placeholder.png";
import { motion } from "framer-motion";
import { FormatDate } from "../../helpers/helpers";
import { NavLink } from "react-router-dom";
import { StageData } from "../../model/StageData";
import { PhotoData } from "../../model/PhotoData";
interface Props<T = any> {
  travel?: TravelData;
  stage?: StageData;
  photo?: PhotoData;
  newPhotoOnSelect?: (data: T) => void;
}
function HorizontalDisplayCard({
  travel,
  stage,
  photo,
  newPhotoOnSelect,
}: Props) {
  if (travel === undefined && stage === undefined && photo === undefined) {
    return <p className="mt-40">No content to display</p>;
  }
  return (
    <NavLink
      to={
        travel
          ? `/travel/${travel.id}`
          : stage
          ? `/stage/${stage.parentTravel?.id}/${stage.id}`
          : photo
          ? `/memory/${photo.parentStage?.parentTravel?.id}/${photo.parentStage?.id}/${photo.id}`
          : "/"
      }
      onClick={(e) => {
        if (newPhotoOnSelect !== undefined) {
          e.stopPropagation();
          e.preventDefault();
        }
      }}
    >
      <motion.button
        className={`flex flex-col items-center p-3 shadow-md max-w-full ${
          travel !== undefined && newPhotoOnSelect === undefined
            ? "bg-background-100 w-80"
            : "bg-background-50 w-52"
        } `}
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        whileHover={{ scale: 1.02 }}
        onClick={() => {
          if (newPhotoOnSelect !== undefined) {
            newPhotoOnSelect(
              travel !== undefined
                ? travel
                : stage !== undefined
                ? stage
                : (photo as PhotoData)
            );
          }
        }}
      >
        <img
          src={
            travel
              ? travel?.stages.length === 0 ||
                travel?.stages[0].photos.length === 0
                ? Placeholder
                : travel?.stages[0].photos[0].imageSource
              : stage
              ? stage.photos.length === 0
                ? Placeholder
                : stage.photos[0].imageSource
              : photo?.imageSource
          }
          alt=""
          className="object-cover aspect-square w-full mb-4"
        />
        <h1 className="text-lg truncate max-w-full">
          {" "}
          {travel
            ? travel.location
            : stage
            ? stage.location
            : photo
            ? photo.location
            : ""}
        </h1>
        <p className="text-sm truncate">
          {FormatDate(
            travel
              ? travel.date
              : stage
              ? stage.date
              : photo
              ? photo.date
              : new Date()
          )}
        </p>
      </motion.button>
    </NavLink>
  );
}

export default HorizontalDisplayCard;
