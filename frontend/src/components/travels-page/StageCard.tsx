import React from "react";
import Placeholder from "../../images/placeholder.png";
import { motion } from "framer-motion";
import { NavLink } from "react-router-dom";
import { StageData } from "../../model/StageData";
interface TravelCardProps {
  data: StageData | undefined;
}
function StageCard({ data }: TravelCardProps) {
  return (
    <NavLink to={`/stage/${data?.id}`}>
      <motion.button
        className="flex flex-col items-center p-2 shadow-md bg-background-50 w-52 text-primary-950"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        whileHover={{ scale: 1.02 }}
      >
        <img
          src={
            data?.photos.length === 0 ? Placeholder : data?.photos[0].photoData
          }
          alt=""
          className="object-cover aspect-square w-full"
        />
        <p className="text-base w-full truncate">{data?.description}</p>
      </motion.button>
    </NavLink>
  );
}

export default StageCard;
