import React, { useState } from "react";
import { PhotoData } from "../../model/PhotoData";
import { IoIosHeartEmpty } from "react-icons/io";
import { IoMdHeart } from "react-icons/io";
import { motion } from "framer-motion";
import { useUserContext } from "../../context/UserContext";
import { useTravelsContext } from "../../context/TravelsContext";
import { cn } from "../../helpers/helpers";
interface Props {
  photoData: PhotoData;
  className?: string;
}
function LikesDisplay({ photoData, className }: Props) {
  const { isLoggedIn, userData } = useUserContext();
  const { LikeDislikePhoto, DidUserLikePhoto } = useTravelsContext();
  const [likes, setLikes] = useState(photoData.likes.length);
  if (photoData === undefined) {
    return <div>No photo data</div>;
  }
  return (
    <div className={cn("flex items-center text-4xl", className)}>
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 1.01 }}
        onClick={(e) => {
          e.stopPropagation();
          if (!isLoggedIn) return;
          LikeDislikePhoto(
            userData === undefined ? "" : userData?.email,
            photoData.id as number
          );
          setLikes(photoData.likes.length);
        }}
      >
        {userData &&
        DidUserLikePhoto(
          userData === undefined ? "" : userData?.email,
          photoData.id as number
        ) ? (
          <IoMdHeart />
        ) : (
          <IoIosHeartEmpty />
        )}
      </motion.button>
      <p>{likes}</p>
    </div>
  );
}

export default LikesDisplay;
