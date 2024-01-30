import React from "react";
import { TravelStageData } from "../../model/TravelStageData";
import StageCard from "./StageCard";
import { motion } from "framer-motion";
import { IoAddCircleOutline } from "react-icons/io5";
interface Props {
  stages: TravelStageData[] | undefined;
}
function StagesDisplay({ stages }: Props) {
  return (
    <div className="w-full sm:h-auto mx-auto p-2 gap-4 flex sm:flex-row flex-col items-center overflow-x-scroll">
      <motion.button
        className="flex items-center justify-center bg-action-200 text-xl px-2 py-1 h-full text-primary-950 shadow-md hover:bg-action-300 transition-colors rounded-lg aspect-square"
        whileHover={{ scale: 1.02 }}
      >
        <IoAddCircleOutline className="text-2xl " />
        <p className="whitespace-nowrap">New Stage</p>
      </motion.button>

      {stages === undefined || stages?.length === 0 ? (
        <p className="text-xl">You don't have any stages yet.</p>
      ) : (
        stages?.map((stage) => <StageCard data={stage} />)
      )}
    </div>
  );
}

export default StagesDisplay;
