import React, { useEffect, useState } from "react";
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
  const { publicPhotoTravels, LikeDislikePhoto } = useTravelsContext();
  const [likes, setLikes] = useState(photoData.likes.length);
  const [liked, setLiked] = useState(false);

  const handleLikeClick = async () => {
    if (!userData) return;
    try {
      const gaveLike = await LikeDislikePhoto(userData, photoData);
      if (gaveLike) {
        setLikes((prev) => prev + 1);
        setLiked(true);
      } else {
        setLikes((prev) => prev - 1);
        setLiked(false);
      }
    } catch (err) {
      return;
    }
  };
  useEffect(() => {
    setLikes(photoData.likes.length);
    setLiked(
      !userData
        ? false
        : photoData.likes.find((like) => like === userData.id) !== undefined
    );
  }, [userData]);

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
          handleLikeClick();
        }}
      >
        {userData && liked ? <IoMdHeart /> : <IoIosHeartEmpty />}
      </motion.button>
      <p>{likes}</p>
    </div>
  );
}

export default LikesDisplay;
