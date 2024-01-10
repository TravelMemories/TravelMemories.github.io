import React, { useState } from "react";
import { PhotoData } from "../../model/PhotoData";
import homeImage1 from "../../images/homeImage1.jpg";
import ExampleTravels from "../../examples/ExampleTravels";
import { TiLocation } from "react-icons/ti";
import { IoIosHeartEmpty } from "react-icons/io";
import { IoMdHeart } from "react-icons/io";
import { motion } from "framer-motion";
interface MemoryCardProps {
  data: PhotoData;
}
function MemoryCard({ data }: MemoryCardProps) {
  const [likes, setLikes] = useState(0);
  const [liked, setLiked] = useState(false);
  return (
    <div className="w-80 p-4 shadow-md bg-background-100 flex flex-col">
      <img
        src={homeImage1}
        alt={"beach"}
        className="object-cover aspect-square w-full"
      />
      <div className="flex items-center text-4xl">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 1.01 }}
          onClick={() => {
            if (liked) {
              setLikes((prev) => prev - 1);
              setLiked(false);
            } else {
              setLikes((prev) => prev + 1);
              setLiked(true);
            }
          }}
        >
          {liked ? <IoMdHeart /> : <IoIosHeartEmpty />}
        </motion.button>
        <p>{likes}</p>
      </div>

      <div className="flex items-center text-center text-lg font-bold">
        <TiLocation />
        <h1>{ExampleTravels[0].location}</h1>
      </div>
      <p className="text-sm">{ExampleTravels[0].date.toDateString()}</p>
      <p className="">{ExampleTravels[0].description}</p>
    </div>
  );
}

export default MemoryCard;
