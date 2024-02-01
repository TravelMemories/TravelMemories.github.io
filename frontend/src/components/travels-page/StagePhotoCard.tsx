import React from "react";
import { PhotoData } from "../../model/PhotoData";
import { NavLink } from "react-router-dom";
import { motion } from "framer-motion";
type Props = {
  data: PhotoData;
};

function StagePhotoCard({ data }: Props) {
  return (
    <NavLink to={`/stage/${data?.id}`}>
      <motion.button
        className="flex flex-col items-center p-2 shadow-md bg-background-50 w-fit text-primary-950"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        whileHover={{ scale: 1.02 }}
      >
        <img
          src={data.imageSource}
          alt=""
          className="object-cover aspect-square w-40"
        />
        <p className="text-lg">{data?.description}</p>
      </motion.button>
    </NavLink>
  );
}

export default StagePhotoCard;
