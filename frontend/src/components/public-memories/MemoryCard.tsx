import React from "react";
import { PhotoData } from "../../model/PhotoData";
import { TiLocation } from "react-icons/ti";
import { motion } from "framer-motion";
import LikesDisplay from "./LikesDisplay";
import { useNavigate } from "react-router-dom";
interface MemoryCardProps {
  data: PhotoData;
  isUserLogged: boolean;
  publicMemoriesPage?: any;
}
function MemoryCard({
  data,
  isUserLogged,
  publicMemoriesPage,
}: MemoryCardProps) {
  const navigate = useNavigate();
  if (data === undefined) {
    return <div>No photo data</div>;
  }
  return (
    <motion.button
      className="max-w-[20rem] p-4 h-fit shadow-md bg-background-50 flex flex-col"
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      whileHover={{ scale: 1.008 }}
      transition={{ type: "spring", duration: 0.2 }}
      onClick={(e) => {
        e.stopPropagation();
        e.preventDefault();
        navigate(
          `/memory/${data.parentStage?.parentTravel?.id}/${
            data.parentStage?.id
          }/${data.id}${publicMemoriesPage !== undefined ? "/discover" : ""}`
        );
      }}
    >
      <img
        src={data.imageSource}
        alt={"Travel memory"}
        className="object-cover aspect-square w-full"
      />
      <LikesDisplay photoData={data} />
      <div className="flex items-center text-center text-lg font-bold max-w-full">
        <TiLocation />
        <h1 className="truncate max-w-full">{data.location}</h1>
      </div>
    </motion.button>
  );
}

export default MemoryCard;
