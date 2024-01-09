import React from "react";
import { TravelData } from "../../model/TravelData";
import Placeholder from "../../images/placeholder.png";
import { motion } from "framer-motion";
interface TravelCardProps {
  data: TravelData | undefined;
}
function TravelCard({ data }: TravelCardProps) {
  return (
    <motion.button
      className="flex flex-col items-center p-4 shadow-md bg-background-100 w-fit gap-2"
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
        className="object-cover aspect-square w-40"
      />
      <h1 className="text-lg"> {data?.location}</h1>
      <p className="font-bold">{data?.date.toDateString()}</p>
    </motion.button>
  );
}

export default TravelCard;
