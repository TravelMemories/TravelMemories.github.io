import React from "react";
import { TravelData } from "../../model/TravelData";
import { motion } from "framer-motion";
import CustomButton from "../general-purpose/CustomButton";
interface Props {
  travelData: TravelData;
  onExit: () => void;
}
function Slideshow({ travelData, onExit }: Props) {
  return (
    <motion.div
      className="fixed w-[100vw] h-[100vh] top-0 z-50 flex items-center justify-center bg-primary-950"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, transition: { duration: 1, delay: 1 } }}
        className="absolute top-10 left-10 text-xl origin-center"
        whileHover={{ scale: 1.05 }}
      >
        <CustomButton
          className="px-6"
          disableScaleAnimation={true}
          onClick={onExit}
        >
          Exit
        </CustomButton>
      </motion.button>

      <div></div>
    </motion.div>
  );
}

export default Slideshow;
