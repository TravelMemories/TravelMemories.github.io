import React from "react";
import { TravelData } from "../../model/TravelData";
import Placeholder from "../../images/placeholder.png";
import { motion } from "framer-motion";
import { FormatDate } from "../../helpers/helpers";
import { NavLink } from "react-router-dom";
import { StageData } from "../../model/StageData";
interface TravelCardProps {
  data: TravelData | undefined;
  onTravelSelect?: (travel: TravelData) => void;
}
function TravelCard({ data, onTravelSelect }: TravelCardProps) {
  return (
    <NavLink
      to={`/travel/${data?.id}`}
      onClick={(e) => {
        if (onTravelSelect !== undefined) {
          e.stopPropagation();
          e.preventDefault();
        }
      }}
    >
      <motion.button
        className="flex flex-col items-center p-3 shadow-md bg-background-100 w-80"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        whileHover={{ scale: 1.02 }}
        onClick={() => {
          if (onTravelSelect !== undefined) {
            onTravelSelect(data as TravelData);
          }
        }}
      >
        <img
          src={
            data?.stages.length === 0 || data?.stages[0].photos.length === 0
              ? Placeholder
              : data?.stages[0].photos[0].photoData
          }
          alt=""
          className="object-cover aspect-square w-full mb-4"
        />
        <h1 className="text-2xl truncate"> {data?.location}</h1>
        <p className="text-lg truncate">{FormatDate(data?.date)}</p>
      </motion.button>
    </NavLink>
  );
}

export default TravelCard;
