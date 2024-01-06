import React from "react";
import { BackgroundImageProps } from "./BackgroundImageProps";
import { motion } from "framer-motion";

function BgImage({ img, location }: BackgroundImageProps) {
  return (
    <motion.div
      className="bg-white px-2 pt-4 pb-16 sm:px-4 sm:pt-8 sm:pb-24 shadow-lg rounded-lg font-backgroundImage flex flex-col items-center overflow-hidden
    gap-4  text-xl sm:text-2xl text-primary-900 min-w-fit"
    >
      <img
        src={img}
        alt=""
        className="object-cover w-32 h-24 sm:w-52 sm:h-44 shadow-md"
      />
      <p>{location}</p>
    </motion.div>
  );
}

export default BgImage;
