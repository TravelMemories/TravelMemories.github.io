import React from "react";
import { TravelData } from "../../model/TravelData";
import Placeholder from "../../images/placeholder.png";
import { motion } from "framer-motion";
import dayjs from "dayjs";
import { NavLink } from "react-router-dom";
interface TravelCardProps {
  data: TravelData | undefined;
}
function TravelCard({ data }: TravelCardProps) {
  return (
    <NavLink to={`/travel/${data?.id}`}>
      <motion.button
        className="flex flex-col items-center p-3 shadow-md bg-background-100 w-fit"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        whileHover={{ scale: 1.02 }}
      >
        <img
          src={
            data?.stages.length === 0 || data?.stages[0].photos.length === 0
              ? Placeholder
              : data?.stages[0].photos[0].photoData
          }
          alt=""
          className="object-cover aspect-square w-80 mb-4"
        />
        <h1 className="text-2xl"> {data?.location}</h1>
        <p className="text-lg">{dayjs(data?.date).format("MM/DD/YYYY")}</p>
      </motion.button>
    </NavLink>
  );
}

export default TravelCard;
