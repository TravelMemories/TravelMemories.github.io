import React from "react";
import { StageData } from "../../model/StageData";
import StageCard from "./StageCard";
import { motion } from "framer-motion";
import { IoAddCircleOutline } from "react-icons/io5";
import { NavLink } from "react-router-dom";
interface Props {
  stages: StageData[] | undefined;
  travelID: number;
  onStageSelect?: (stage: StageData) => void;
}
function StagesDisplay({ stages, travelID, onStageSelect }: Props) {
  return (
    <div
      className={`${
        onStageSelect !== undefined
          ? "fixed top-[50%] translate-y-[-50%] left-[50%] translate-x-[-50%] w-[90vw] z-10"
          : "w-full"
      } sm:h-auto mx-auto bg-background-50 p-8 gap-4 flex sm:flex-row flex-col items-center overflow-x-scroll`}
    >
      <NavLink to={`/new-stage/${travelID}`}>
        <motion.button
          className="flex items-center justify-center bg-action-200 text-xl px-2 py-1 h-full text-primary-950 shadow-md hover:bg-action-300 transition-colors rounded-lg aspect-square"
          whileHover={{ scale: 1.02 }}
        >
          <IoAddCircleOutline className="text-2xl " />
          <p className="whitespace-nowrap">New Stage</p>
        </motion.button>
      </NavLink>

      {stages === undefined || stages?.length === 0 ? (
        <p className="text-xl">You don't have any stages yet.</p>
      ) : (
        stages?.map((stage) => <StageCard data={stage} />)
      )}
    </div>
  );
}

export default StagesDisplay;
