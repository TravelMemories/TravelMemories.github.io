import React, { useState } from "react";
import { PhotoData } from "../../model/PhotoData";
import { TiLocation } from "react-icons/ti";
import { IoIosHeartEmpty } from "react-icons/io";
import { IoMdHeart } from "react-icons/io";
import { motion } from "framer-motion";
import { useUserContext } from "../../context/UserContext";
import { useTravelsContext } from "../../context/TravelsContext";
import { UserData } from "../../model/UserData";
interface MemoryCardProps {
  data: PhotoData;
}
function MemoryCard({ data }: MemoryCardProps) {
  const { isLoggedIn, userData } = useUserContext();
  const { LikeDislikePhoto, DidUserLikePhoto } = useTravelsContext();
  const [likes, setLikes] = useState(data.likes.length);
  if (data === undefined) {
    return <div>No photo data</div>;
  }
  return (
    <motion.button
      className="max-w-[20rem] p-4 h-fit shadow-md bg-background-50 flex flex-col"
      whileHover={{ scale: 1.008 }}
      transition={{ type: "spring", duration: 0.2 }}
    >
      <img
        src={data.imageSource}
        alt={"Travel photo"}
        className="object-cover aspect-square w-full"
      />
      <div className="flex items-center text-4xl">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 1.01 }}
          onClick={() => {
            if (!isLoggedIn) return;
            LikeDislikePhoto(
              userData === undefined ? "" : userData?.email,
              data.id as number
            );
            setLikes(data.likes.length);
          }}
        >
          {DidUserLikePhoto(
            userData === undefined ? "" : userData?.email,
            data.id as number
          ) ? (
            <IoMdHeart />
          ) : (
            <IoIosHeartEmpty />
          )}
        </motion.button>
        <p>{likes}</p>
      </div>

      <div className="flex items-center text-center text-lg font-bold truncate">
        <TiLocation />
        <h1>{data.location}</h1>
      </div>
    </motion.button>
  );
}

export default MemoryCard;
